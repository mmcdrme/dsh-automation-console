/**
 * Host half of the Automation Console bundle.
 *
 * The shipped Schedule service exposes the management surface but not the
 * non-activating create entry point, and it has no per-task auto-clean flag.
 * This plugin contributes the create path, a tiny sidecar store for the flag,
 * and a reconciler that removes delivered one-shot tasks or clears a recurring
 * task's saved delivery history after a delivery.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REMOTE_METHOD_DESCRIPTOR = '@deepseek-ai/dsh-typert-protocol/remote-methods';
const TASK_METHODS = ['createManaged', 'setAutoClean', 'managedCatalog'];

/** The Schedule service must be live before the wire methods can be added. */
export const inject = ['schedule'];

function profileDirectory() {
  if (process.env.DSH_PROFILE_DIR) return process.env.DSH_PROFILE_DIR;
  return path.join(
    os.homedir(),
    '.dsh',
    'profiles',
    process.env.DSH_PROFILE || 'desktop',
  );
}

/**
 * Add the console's Remote methods and auto-clean reconciler to the active
 * Schedule service.
 * @param {import('@deepseek-ai/cordis').Context} ctx - owning Host context.
 */
export function apply(ctx) {
  const service = ctx.schedule;
  const prototype = Object.getPrototypeOf(service);
  const stateFile = path.join(profileDirectory(), 'automation-console.json');
  let state = { version: 1, autoClean: {} };

  try {
    const parsed = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    if (parsed !== null && typeof parsed === 'object' && parsed.autoClean !== null && typeof parsed.autoClean === 'object') {
      state = { version: 1, autoClean: parsed.autoClean };
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      ctx.logger?.warn(`automation-console: could not read ${stateFile}: ${String(error)}`);
    }
  }

  const saveState = () => {
    try {
      fs.mkdirSync(path.dirname(stateFile), { recursive: true });
      fs.writeFileSync(stateFile, JSON.stringify(state), 'utf8');
    } catch (error) {
      ctx.logger?.warn(`automation-console: could not write ${stateFile}: ${String(error)}`);
    }
  };

  const clearHistoryInQueue = async (id) => {
    await service.serialize(async () => {
      const domain = await service.getDomain();
      const tasks = domain.table('tasks');
      const current = tasks.get(id);
      if (current === undefined) return;
      if (current.status === 'inactive') {
        await tasks.delete(id);
      } else {
        if (current.lastDelivery === undefined && current.deliveryHistory === undefined) return;
        const { lastDelivery, deliveryHistory, ...rest } = current;
        await tasks.put(id, rest);
      }
      service.emitChanged();
    });
  };

  let reconciling = false;
  const reconcile = async () => {
    if (reconciling) return;
    reconciling = true;
    try {
      const entries = Object.entries(state.autoClean);
      if (entries.length === 0) return;
      const tasks = await service.catalog();
      const byId = new Map(tasks.map((task) => [task.id, task]));
      let changed = false;
      for (const [id, option] of entries) {
        const task = byId.get(id);
        if (task === undefined || task.sessionId !== option?.sessionId) {
          delete state.autoClean[id];
          changed = true;
          continue;
        }
        if (task.lastDelivery === undefined) continue;
        if (task.status === 'inactive') {
          await service.delete({ sessionId: task.sessionId, id });
          delete state.autoClean[id];
          changed = true;
          continue;
        }
        await clearHistoryInQueue(id);
      }
      if (changed) saveState();
    } catch (error) {
      ctx.logger?.warn(`automation-console: auto-clean reconcile failed: ${String(error)}`);
    } finally {
      reconciling = false;
    }
  };

  /**
   * Create one task and persist its auto-clean choice.
   * @param {string} sessionId - target Session.
   * @param {object} request - ScheduleCreateRequest.
   * @param {boolean} autoClean - remove history/self after delivery.
   * @param {AbortSignal} [signal] - caller lifetime.
   * @returns {Promise<object>} the created record.
   */
  const createManaged = async function (sessionId, request, autoClean, signal) {
    const record = await this.create(sessionId, request, signal);
    if (autoClean === true) state.autoClean[record.id] = { sessionId };
    else delete state.autoClean[record.id];
    saveState();
    if (autoClean === true) void reconcile();
    return record;
  };

  /**
   * Set or clear one task's auto-clean choice.
   * @param {{sessionId: string, id: string, autoClean: boolean}} request - binding and choice.
   * @returns {Promise<object>} applied result or a missing-task miss.
   */
  const setAutoClean = async function (request) {
    const tasks = await this.catalog();
    const task = tasks.find((candidate) => candidate.id === request.id);
    if (task === undefined || task.sessionId !== request.sessionId) {
      delete state.autoClean[request.id];
      saveState();
      return { id: request.id, updated: false, code: 'schedule_not_found' };
    }
    if (request.autoClean === true) state.autoClean[request.id] = { sessionId: request.sessionId };
    else delete state.autoClean[request.id];
    saveState();
    if (request.autoClean === true) void reconcile();
    return { id: request.id, updated: true, autoClean: request.autoClean === true };
  };

  /**
   * Catalog with each task's auto-clean flag attached.
   * @returns {Promise<object[]>} active and inactive tasks.
   */
  const managedCatalog = async function () {
    const tasks = await this.catalog();
    return tasks.map((task) => ({
      ...task,
      autoClean: state.autoClean[task.id] !== undefined,
    }));
  };

  const previous = Object.getOwnPropertyDescriptor(prototype, REMOTE_METHOD_DESCRIPTOR);
  const methods = previous?.value?.methods ?? [];
  const marker = (method) => Object.freeze({
    method,
    invocation: Object.freeze({ kind: 'direct' }),
  });

  const addedMethods = [];
  const restoreMethods = [];
  for (const [name, value] of [
    ['createManaged', createManaged],
    ['setAutoClean', setAutoClean],
    ['managedCatalog', managedCatalog],
  ]) {
    const existing = Object.getOwnPropertyDescriptor(prototype, name);
    if (existing !== undefined) continue;
    Object.defineProperty(prototype, name, {
      configurable: true,
      writable: true,
      value,
    });
    addedMethods.push(name);
    restoreMethods.push([name, existing]);
  }

  const markers = ['create', ...TASK_METHODS]
    .filter((method) => !methods.some((candidate) => (candidate.exportName ?? candidate.method) === method))
    .map(marker);

  if (markers.length > 0) {
    Object.defineProperty(prototype, REMOTE_METHOD_DESCRIPTOR, {
      configurable: true,
      value: Object.freeze({
        version: 1,
        methods: Object.freeze([...methods, ...markers]),
      }),
    });
  }

  const offChanged = ctx.on('schedule/changed', () => {
    void reconcile();
  });

  // The service is initialized lazily; catalog() waits for that initialization
  // and then lets the startup reconciler handle tasks that delivered while the
  // previous process was shutting down.
  void service.catalog().then(() => reconcile()).catch((error) => {
    ctx.logger?.warn(`automation-console: startup reconcile failed: ${String(error)}`);
  });

  ctx.effect(() => () => {
    offChanged();
    for (const [name] of restoreMethods) {
      try {
        delete prototype[name];
      } catch {
        // A non-configurable method can only belong to another owner.
      }
    }
    const current = Object.getOwnPropertyDescriptor(prototype, REMOTE_METHOD_DESCRIPTOR);
    const currentMethods = current?.value?.methods;
    if (!Array.isArray(currentMethods)) return;
    Object.defineProperty(prototype, REMOTE_METHOD_DESCRIPTOR, {
      configurable: true,
      value: Object.freeze({
        version: 1,
        methods: Object.freeze(currentMethods.filter((candidate) => !markers.includes(candidate))),
      }),
    });
  }, 'automation-console: schedule management and auto-clean');
}
