window.__ModuleLoader__.load({
  id: '@local/dsh-automation-console',
  factory(require) {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const {
      useCallback,
      useEffect,
      useId,
      useMemo,
      useRef,
      useState,
      useSyncExternalStore,
    } = React;
    const h = React.createElement;

    const NS = 'automation.console';
    const PANEL_ID = 'schedules';
    const inject = ['slots', 'locale', 'connection', 'remote', 'sessions', 'workspaces', 'uiWorkspace'];

    const EN = {
      'panel': 'Automation tasks',
      'title': 'Automation tasks',
      'new': 'New',
      'refresh': 'Refresh',
      'search.placeholder': 'Search automation tasks',
      'filter.all': 'All',
      'filter.active': 'Active',
      'filter.inactive': 'Inactive',
      'select.all': 'Select all',
      'select.none': 'Clear selection',
      'selected': '{count} selected',
      'delete.selected': 'Delete selected',
      'list.empty': 'No tasks yet',
      'list.emptyHint': 'Create a task without starting a conversation.',
      'list.noMatches': 'No matching tasks',
      'list.loading': 'Loading tasks…',
      'list.error': 'Could not load tasks',
      'retry': 'Retry',
      'status.active': 'Active',
      'status.inactive': 'Inactive',
      'action.openSession': 'Open conversation',
      'action.delete': 'Delete task',
      'unlinked': 'Unknown conversation',
      'archived': 'Archived',
      'frequency.onceAt': 'Once at {time}',
      'frequency.after': 'In {value}',
      'frequency.every': 'Every {value}',
      'frequency.daily': 'Daily at {time}',
      'frequency.weekly': 'Weekly on {days} at {time}',
      'frequency.cron': 'Cron {expression}',
      'unit.minutes': '{count} min',
      'unit.hours': '{count} h',
      'unit.seconds': '{count} s',
      'weekday.1': 'Mon',
      'weekday.2': 'Tue',
      'weekday.3': 'Wed',
      'weekday.4': 'Thu',
      'weekday.5': 'Fri',
      'weekday.6': 'Sat',
      'weekday.7': 'Sun',
      'weekday.separator': ', ',
      'next': 'Next {time}',
      'noNext': 'No next run',
      'lastDelivery': 'Last delivered {time}',
      'form.title': 'New automation task',
      'form.subtitle': 'Create one task for each selected conversation. Creating tasks starts no chat.',
      'form.name': 'Task name',
      'form.namePlaceholder': 'e.g. Daily build check',
      'form.prompt': 'Instruction',
      'form.promptPlaceholder': 'What should the conversation receive when the task runs?',
      'form.session': 'Target conversations',
      'form.sessionSearch': 'Search conversations',
      'form.sessionEmpty': 'No eligible conversation. Send a message in a conversation first.',
      'form.sessionHint': 'One task is created per selected conversation. No new chat is started.',
      'form.sessionMore': '{count} more conversations — refine the search to narrow the list.',
      'form.sessionSelectAll': 'Select all',
      'form.sessionDeselectAll': 'Deselect all',
      'form.sessionClear': 'Clear',
      'form.sessionCount': '{count} selected',
      'form.timing': 'Schedule',
      'form.repeat.every': 'Interval',
      'form.repeat.once': 'Once',
      'form.repeat.daily': 'Daily',
      'form.repeat.weekly': 'Weekly',
      'form.repeat.cron': 'Cron',
      'form.repeat': 'Repeat',
      'form.date': 'Date',
      'form.time': 'Time',
      'form.interval': 'Interval',
      'form.intervalValue': 'Amount',
      'form.intervalUnit': 'Unit',
      'form.unit.minutes': 'minutes',
      'form.unit.hours': 'hours',
      'form.unit.seconds': 'seconds',
      'form.delayHint': 'At least 1 second. Runs once after the delay.',
      'form.intervalHint': 'At least 1 minute. Repeats at this interval.',
      'form.autoClean': 'Auto-delete history',
      'form.autoCleanHint': 'After a run, delete its saved history; a one-shot task deletes itself.',
      'form.weekdays': 'Weekdays',
      'form.cron': 'Cron expression',
      'form.cronHint': 'Five fields: minute hour day month weekday',
      'form.preview': 'Preview',
      'form.cancel': 'Cancel',
      'form.create': 'Create task',
      'form.createMany': 'Create {count} tasks',
      'form.creating': 'Creating…',
      'form.creatingProgress': 'Creating {done}/{total}…',
      'form.error.title': 'Enter a task name.',
      'form.error.titleLong': 'Task name must be at most 120 characters.',
      'form.error.prompt': 'Enter an instruction.',
      'form.error.session': 'Choose at least one target conversation.',
      'form.error.time': 'Choose a complete date and time.',
      'form.error.interval': 'Repeating interval must be at least 60 seconds.',
      'form.error.delay': 'Delay must be at least 1 second.',
      'form.error.weekdays': 'Choose at least one weekday.',
      'form.error.cron': 'Enter a five-field cron expression.',
      'form.error.create': 'Could not create the task: {message}',
      'countdown.due': 'Runs now',
      'countdown.seconds': 'in {count}s',
      'countdown.minutes': 'in {minutes}m {seconds}s',
      'countdown.hours': 'in {hours}h {minutes}m {seconds}s',
      'notice.createdMany': 'Created {count} task(s).',
      'notice.createdPartial': 'Created {done}; {failed} failed.',
      'notice.loadError': 'Could not load tasks: {message}',
      'notice.deleteError': 'Could not delete: {message}',
      'notice.deleted': 'Deleted {done} task(s).',
      'notice.deletedPartial': 'Deleted {done}; {failed} failed.',
      'notice.transport': 'The Host did not answer. Check the connection and retry.',
      'confirm.titleOne': 'Delete this task?',
      'confirm.titleMany': 'Delete {count} tasks?',
      'confirm.body': 'The tasks stop immediately and are deleted together with their saved delivery records. Original conversations and queued messages are unaffected.',
      'confirm.cancel': 'Cancel',
      'confirm.delete': 'Delete',
      'confirm.pending': 'Deleting…',
      'confirm.progress': 'Deleting {done}/{total}…',
      'confirm.more': 'and {count} more',
      'detail.rule': 'Rules',
      'detail.records': 'Records',
      'detail.close': 'Close details',
      'detail.status': 'Status',
      'detail.frequency': 'Frequency',
      'detail.next': 'Next run',
      'detail.id': 'Task ID',
      'detail.session': 'Linked conversation',
      'detail.instruction': 'Instruction',
      'detail.noHistory': 'No delivery record available',
      'detail.historyLoading': 'Loading records…',
      'detail.historyError': 'Could not load records.',
      'detail.delivery': 'Delivered {time}',
      'detail.unsaved': 'Unsaved changes',
      'detail.save': 'Save changes',
      'detail.saving': 'Saving…',
      'detail.cancel': 'Cancel',
      'detail.saved': 'Task updated.',
      'detail.readonly': 'Ended tasks are read-only.',
      'detail.error.conflict': 'This task changed while you were editing. Your draft is kept; refresh and try again.',
      'detail.error.ended': 'This task has ended and can no longer be edited.',
      'detail.error.notFound': 'This task is no longer available.',
      'detail.error.save': 'Could not save: {message}',
      'detail.error.invalid': 'Enter a valid task name and instruction.',
      'error.unavailable': 'Automation management is unavailable in this window.',
      'aria.checkbox': 'Select task {title}',
      'aria.close': 'Close',
      'aria.openSession': 'Open the linked conversation',
      'aria.deleteTask': 'Delete task {title}',
    };

    const ZH = {
      'panel': '自动化任务',
      'title': '自动化任务',
      'new': '新建',
      'refresh': '刷新',
      'search.placeholder': '搜索自动化任务',
      'filter.all': '全部',
      'filter.active': '已开启',
      'filter.inactive': '已结束',
      'select.all': '全选',
      'select.none': '取消选择',
      'selected': '已选择 {count} 项',
      'delete.selected': '删除所选',
      'list.empty': '还没有自动化任务',
      'list.emptyHint': '无需先进入对话，即可创建自动化任务。',
      'list.noMatches': '没有匹配的自动化任务',
      'list.loading': '正在加载任务…',
      'list.error': '无法加载任务',
      'retry': '重试',
      'status.active': '已开启',
      'status.inactive': '已结束',
      'action.openSession': '打开会话',
      'action.delete': '删除任务',
      'unlinked': '未知会话',
      'archived': '已归档',
      'frequency.onceAt': '单次 · {time}',
      'frequency.after': '{value}后',
      'frequency.every': '每 {value}',
      'frequency.daily': '每天 {time}',
      'frequency.weekly': '每周 {days} {time}',
      'frequency.cron': 'Cron {expression}',
      'unit.minutes': '{count} 分钟',
      'unit.hours': '{count} 小时',
      'unit.seconds': '{count} 秒',
      'weekday.1': '一',
      'weekday.2': '二',
      'weekday.3': '三',
      'weekday.4': '四',
      'weekday.5': '五',
      'weekday.6': '六',
      'weekday.7': '日',
      'weekday.separator': '、',
      'next': '下次 {time}',
      'noNext': '无后续运行',
      'lastDelivery': '上次投递 {time}',
      'form.title': '新建自动化任务',
      'form.subtitle': '多选会话则各创建一个任务，创建过程不会发起对话。',
      'form.name': '任务名称',
      'form.namePlaceholder': '',
      'form.prompt': '任务内容',
      'form.promptPlaceholder': '',
      'form.session': '目标会话',
      'form.sessionSearch': '搜索会话',
      'form.sessionEmpty': '没有可绑定的会话。请先创建对话。',
      'form.sessionHint': '每个选中的会话会各创建一个任务，不会创建新对话。',
      'form.sessionMore': '还有 {count} 个会话，请用搜索缩小范围。',
      'form.sessionSelectAll': '全选',
      'form.sessionDeselectAll': '取消全选',
      'form.sessionClear': '清空',
      'form.sessionCount': '已选择 {count} 个',
      'form.timing': '运行时间',
      'form.repeat.every': '间隔',
      'form.repeat.once': '单次',
      'form.repeat.daily': '每天',
      'form.repeat.weekly': '每周',
      'form.repeat.cron': 'Cron',
      'form.repeat': '重复',
      'form.date': '日期',
      'form.time': '时间',
      'form.interval': '间隔',
      'form.intervalValue': '数值',
      'form.intervalUnit': '单位',
      'form.unit.minutes': '分钟',
      'form.unit.hours': '小时',
      'form.unit.seconds': '秒',
      'form.delayHint': '至少 1 秒。延迟后执行一次。',
      'form.intervalHint': '至少 1 分钟。按该间隔重复执行。',
      'form.autoClean': '自动删除历史记录',
      'form.autoCleanHint': '任务执行后删除运行记录；单次任务执行后直接删除任务自身。',
      'form.weekdays': '星期',
      'form.cron': 'Cron 表达式',
      'form.cronHint': '5 个字段：分 时 日 月 周',
      'form.preview': '预览',
      'form.cancel': '取消',
      'form.create': '创建任务',
      'form.createMany': '创建 {count} 个任务',
      'form.creating': '正在创建…',
      'form.creatingProgress': '正在创建 {done}/{total}…',
      'form.error.title': '请输入任务名称。',
      'form.error.titleLong': '任务名称不能超过 120 个字符。',
      'form.error.prompt': '请输入任务内容。',
      'form.error.session': '请至少选择一个目标会话。',
      'form.error.time': '请选择完整的日期和时间。',
      'form.error.interval': '重复间隔至少为 60 秒。',
      'form.error.delay': '延迟时间至少为 1 秒。',
      'form.error.weekdays': '请至少选择一个星期。',
      'form.error.cron': '请输入 5 个字段的 Cron 表达式。',
      'form.error.create': '创建失败：{message}',
      'countdown.due': '即将执行',
      'countdown.seconds': '{count} 秒后',
      'countdown.minutes': '{minutes} 分 {seconds} 秒后',
      'countdown.hours': '{hours} 小时 {minutes} 分 {seconds} 秒后',
      'notice.createdMany': '已创建 {count} 个任务。',
      'notice.createdPartial': '已创建 {done} 个，{failed} 个失败。',
      'notice.loadError': '读取任务失败：{message}',
      'notice.deleteError': '删除失败：{message}',
      'notice.deleted': '已删除 {done} 个任务。',
      'notice.deletedPartial': '已删除 {done} 个，{failed} 个失败。',
      'notice.transport': 'Host 没有响应，请检查连接后重试。',
      'confirm.titleOne': '删除此任务？',
      'confirm.titleMany': '删除 {count} 个任务？',
      'confirm.body': '任务会立即停止，并连同已保存的运行记录一起删除。原会话及其消息不受影响，已排队的消息不会被撤回。',
      'confirm.cancel': '取消',
      'confirm.delete': '确认删除',
      'confirm.pending': '正在删除…',
      'confirm.progress': '正在删除 {done}/{total}…',
      'confirm.more': '以及另外 {count} 个任务',
      'detail.rule': '规则',
      'detail.records': '运行记录',
      'detail.close': '关闭详情',
      'detail.status': '状态',
      'detail.frequency': '提醒频率',
      'detail.next': '下次计划时间',
      'detail.id': '任务 ID',
      'detail.session': '关联会话',
      'detail.instruction': '任务内容',
      'detail.noHistory': '暂无任务运行记录',
      'detail.historyLoading': '正在加载任务运行记录…',
      'detail.historyError': '无法加载任务运行记录',
      'detail.delivery': '投递于 {time}',
      'detail.unsaved': '有未保存的修改',
      'detail.save': '保存修改',
      'detail.saving': '保存中…',
      'detail.cancel': '取消',
      'detail.saved': '任务已更新。',
      'detail.readonly': '已结束的任务为只读。',
      'detail.error.conflict': '编辑期间任务已变化，草稿已保留，请刷新后重试。',
      'detail.error.ended': '任务已结束，无法再编辑。',
      'detail.error.notFound': '任务已不存在。',
      'detail.error.save': '保存失败：{message}',
      'detail.error.invalid': '请输入有效的任务名称和任务内容。',
      'error.unavailable': '当前窗口无法使用自动化任务管理。',
      'aria.checkbox': '选择任务 {title}',
      'aria.close': '关闭',
      'aria.openSession': '打开关联会话',
      'aria.deleteTask': '删除任务“{title}”',
    };

    const SYSTEM_ZONE = (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      } catch {
        return 'UTC';
      }
    })();

    const DATE_TIME = new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const WEEKDAYS = [1, 2, 3, 4, 5, 6, 7];

    function pad(value) {
      return String(value).padStart(2, '0');
    }

    function localDate(date) {
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    function localTime(date) {
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }

    function defaultForm() {
      return {
        title: '',
        prompt: '',
        sessionIds: [],
        kind: 'every',
        date: localDate(new Date(Date.now() + 60 * 60 * 1000)),
        time: '09:00:00',
        everyValue: '30',
        everyUnit: 'minutes',
        repeat: false,
        autoClean: false,
        weekdays: [1, 2, 3, 4, 5],
        cron: '0 9 * * 1-5',
      };
    }

    function formatDateTime(value) {
      if (typeof value !== 'string' || value.trim() === '') return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return DATE_TIME.format(date);
    }

    function countdownText(scheduledAt, now, t) {
      const target = Date.parse(scheduledAt);
      if (!Number.isFinite(target)) return t('next', { time: formatDateTime(scheduledAt) });
      const remaining = target - now;
      if (remaining <= 0) return t('countdown.due');
      const total = Math.ceil(remaining / 1000);
      const hours = Math.floor(total / 3600);
      const minutes = Math.floor((total % 3600) / 60);
      const seconds = total % 60;
      if (hours > 0) {
        return t('countdown.hours', {
          hours: String(hours),
          minutes: String(minutes),
          seconds: String(seconds),
        });
      }
      if (minutes > 0) {
        return t('countdown.minutes', {
          minutes: String(minutes),
          seconds: String(seconds),
        });
      }
      return t('countdown.seconds', { count: String(seconds) });
    }

    function nextRunText(record, now, t) {
      if (record.status !== 'active') return t('noNext');
      if (record.kind === 'after') return countdownText(record.scheduledAt, now, t);
      return t('next', { time: formatDateTime(record.scheduledAt) });
    }

    function formatInterval(seconds, t) {
      const value = Number(seconds);
      if (!Number.isFinite(value) || value <= 0) return t('unit.seconds', { count: '0' });
      if (value % 3600 === 0) return t('unit.hours', { count: String(value / 3600) });
      if (value % 60 === 0) return t('unit.minutes', { count: String(value / 60) });
      return t('unit.seconds', { count: String(value) });
    }

    function normalizeTime(value) {
      const pieces = String(value || '').split(':');
      const hour = Number(pieces[0]);
      const minute = Number(pieces[1] ?? 0);
      const second = Number(pieces[2] ?? 0);
      if (![hour, minute, second].every(Number.isFinite)) return '09:00:00';
      return `${pad(Math.min(23, Math.max(0, hour)))}:${pad(Math.min(59, Math.max(0, minute)))}:${pad(Math.min(59, Math.max(0, second)))}`;
    }

    function frequencyText(record, t) {
      switch (record.kind) {
        case 'after':
          return t('frequency.after', { value: formatInterval(record.afterSeconds, t) });
        case 'every':
          return t('frequency.every', { value: formatInterval(record.everySeconds, t) });
        case 'daily':
          return t('frequency.daily', { time: record.time });
        case 'weekly': {
          const days = (record.weekdays || [])
            .map((day) => t(`weekday.${day}`))
            .join(t('weekday.separator'));
          return t('frequency.weekly', { days, time: record.time });
        }
        case 'cron':
          return t('frequency.cron', { expression: record.expression });
        case 'at':
        default:
          return t('frequency.onceAt', { time: formatDateTime(record.scheduledAt) });
      }
    }

    function previewText(form, t) {
      switch (form.kind) {
        case 'once':
          return t('frequency.onceAt', { time: `${form.date} ${normalizeTime(form.time)}` });
        case 'every':
          return form.repeat
            ? t('frequency.every', { value: formatInterval(intervalSeconds(form), t) })
            : t('frequency.after', { value: formatInterval(intervalSeconds(form), t) });
        case 'daily':
          return t('frequency.daily', { time: normalizeTime(form.time) });
        case 'weekly': {
          const days = form.weekdays
            .map((day) => t(`weekday.${day}`))
            .join(t('weekday.separator'));
          return t('frequency.weekly', { days, time: normalizeTime(form.time) });
        }
        case 'cron':
          return t('frequency.cron', { expression: form.cron.trim() || '…' });
        default:
          return '';
      }
    }

    function intervalSeconds(form) {
      const amount = Number(form.everyValue);
      if (!Number.isFinite(amount) || amount <= 0) return 0;
      const factor = form.everyUnit === 'hours'
        ? 3600
        : form.everyUnit === 'seconds'
          ? 1
          : 60;
      return Math.round(amount * factor);
    }

    function buildRequest(form) {
      const base = { title: form.title.trim(), prompt: form.prompt.trim() };
      switch (form.kind) {
        case 'once':
          return {
            ...base,
            at: {
              date: form.date,
              time: normalizeTime(form.time),
              time_zone: SYSTEM_ZONE,
            },
          };
        case 'every':
          return form.repeat
            ? { ...base, every_seconds: intervalSeconds(form) }
            : { ...base, after_seconds: intervalSeconds(form) };
        case 'daily':
          return {
            ...base,
            daily: { time: normalizeTime(form.time), time_zone: SYSTEM_ZONE },
          };
        case 'weekly':
          return {
            ...base,
            weekly: {
              time: normalizeTime(form.time),
              time_zone: SYSTEM_ZONE,
              weekdays: [...form.weekdays].sort((left, right) => left - right),
            },
          };
        case 'cron':
          return {
            ...base,
            cron: { expression: form.cron.trim(), time_zone: SYSTEM_ZONE },
          };
        default:
          return base;
      }
    }

    function validateForm(form) {
      if (form.title.trim() === '') return 'form.error.title';
      if (form.title.trim().length > 120) return 'form.error.titleLong';
      if (form.prompt.trim() === '') return 'form.error.prompt';
      if (!Array.isArray(form.sessionIds) || form.sessionIds.length === 0) return 'form.error.session';
      if (form.kind === 'once' && (form.date === '' || form.time === '')) return 'form.error.time';
      if (form.kind === 'every') {
        const seconds = intervalSeconds(form);
        if (form.repeat && seconds < 60) return 'form.error.interval';
        if (!form.repeat && seconds < 1) return 'form.error.delay';
      }
      if ((form.kind === 'daily' || form.kind === 'weekly') && form.time === '') return 'form.error.time';
      if (form.kind === 'weekly' && form.weekdays.length === 0) return 'form.error.weekdays';
      if (form.kind === 'cron' && form.cron.trim().split(/\s+/).filter(Boolean).length !== 5) {
        return 'form.error.cron';
      }
      return null;
    }

    function everyParts(seconds) {
      const value = Number(seconds);
      if (!Number.isFinite(value) || value <= 0) {
        return { everyValue: '30', everyUnit: 'minutes' };
      }
      if (value % 3600 === 0) return { everyValue: String(value / 3600), everyUnit: 'hours' };
      if (value % 60 === 0) return { everyValue: String(value / 60), everyUnit: 'minutes' };
      return { everyValue: String(value), everyUnit: 'seconds' };
    }

    function editStateFromRecord(record) {
      const base = {
        title: record.title?.trim() || taskName(record),
        prompt: record.prompt || '',
        autoClean: record.autoClean === true,
      };
      switch (record.kind) {
        case 'every':
          return { ...base, kind: 'every', repeat: true, ...everyParts(record.everySeconds) };
        case 'after':
          return { ...base, kind: 'every', repeat: false, ...everyParts(record.afterSeconds) };
        case 'daily':
          return { ...base, kind: 'daily', time: record.time || '09:00:00' };
        case 'weekly':
          return {
            ...base,
            kind: 'weekly',
            time: record.time || '09:00:00',
            weekdays: [...(record.weekdays || [1, 2, 3, 4, 5])],
          };
        case 'cron':
          return { ...base, kind: 'cron', cron: record.expression || '' };
        case 'at':
        default: {
          const date = new Date(record.scheduledAt);
          const target = Number.isNaN(date.getTime()) ? new Date(Date.now() + 60 * 60 * 1000) : date;
          return {
            ...base,
            kind: 'once',
            date: localDate(target),
            time: localTime(target),
          };
        }
      }
    }

    function timingKey(form) {
      switch (form.kind) {
        case 'once':
          return `once|${form.date}|${normalizeTime(form.time)}`;
        case 'every':
          return `every|${form.repeat === true ? 'repeat' : 'once'}|${intervalSeconds(form)}`;
        case 'daily':
          return `daily|${normalizeTime(form.time)}`;
        case 'weekly':
          return `weekly|${normalizeTime(form.time)}|${[...form.weekdays].sort((left, right) => left - right).join(',')}`;
        case 'cron':
          return `cron|${form.cron.trim().replace(/\s+/g, ' ')}`;
        default:
          return '';
      }
    }

    function timingChange(form) {
      switch (form.kind) {
        case 'once':
          return {
            kind: 'at',
            at: {
              date: form.date,
              time: normalizeTime(form.time),
              time_zone: SYSTEM_ZONE,
            },
          };
        case 'every':
          if (form.repeat === true) return { kind: 'every', every_seconds: intervalSeconds(form) };
          return {
            kind: 'at',
            at: new Date(Date.now() + intervalSeconds(form) * 1000).toISOString(),
          };
        case 'daily':
          return {
            kind: 'daily',
            daily: { time: normalizeTime(form.time), time_zone: SYSTEM_ZONE },
          };
        case 'weekly':
          return {
            kind: 'weekly',
            weekly: {
              time: normalizeTime(form.time),
              time_zone: SYSTEM_ZONE,
              weekdays: [...form.weekdays].sort((left, right) => left - right),
            },
          };
        case 'cron':
          return {
            kind: 'cron',
            cron: { expression: form.cron.trim(), time_zone: SYSTEM_ZONE },
          };
        default:
          return undefined;
      }
    }

    function validateEdit(form) {
      if (form.title.trim() === '') return 'form.error.title';
      if (form.title.trim().length > 120) return 'form.error.titleLong';
      if (form.prompt.trim() === '') return 'form.error.prompt';
      if (form.kind === 'once' && (form.date === '' || form.time === '')) return 'form.error.time';
      if (form.kind === 'every') {
        const seconds = intervalSeconds(form);
        if (form.repeat && seconds < 60) return 'form.error.interval';
        if (!form.repeat && seconds < 1) return 'form.error.delay';
      }
      if ((form.kind === 'daily' || form.kind === 'weekly') && form.time === '') return 'form.error.time';
      if (form.kind === 'weekly' && form.weekdays.length === 0) return 'form.error.weekdays';
      if (form.kind === 'cron' && form.cron.trim().split(/\s+/).filter(Boolean).length !== 5) {
        return 'form.error.cron';
      }
      return null;
    }

    function sessionLabel(id, sessions, workspaces) {
      const row = sessions?.byId?.[id];
      const title = row?.title?.trim() || row?.displayTitle || id;
      const archived = (workspaces?.archivedSessionIds || []).includes(id);
      const listed = (sessions?.ids || []).includes(id);
      return {
        title,
        archived,
        available: listed && !archived,
      };
    }

    function taskName(record) {
      const title = typeof record.title === 'string' ? record.title.trim() : '';
      if (title !== '') return title;
      const firstLine = String(record.prompt || '').split('\n').find((line) => line.trim() !== '');
      return firstLine?.trim() || record.id;
    }

    function taskMatches(record, query, sessions) {
      if (query === '') return true;
      const linked = sessions?.byId?.[record.sessionId];
      const haystack = [
        record.title,
        record.prompt,
        record.sessionId,
        linked?.title,
        linked?.displayTitle,
      ]
        .filter((value) => typeof value === 'string')
        .join('\n')
        .toLowerCase();
      return haystack.includes(query);
    }

    function friendlyError(error, t) {
      if (error === undefined || error === null) return t('notice.transport');
      if (typeof error === 'string') return error;
      return error.message || error.code || t('notice.transport');
    }

    function cls(...values) {
      return values.filter(Boolean).join(' ');
    }

    function Icon({ path, size = 16, viewBox = '0 0 24 24', ...rest }) {
      return h(
        'svg',
        {
          viewBox,
          width: size,
          height: size,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.7,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: false,
          ...rest,
        },
        path,
      );
    }

    const IconPlus = (props) => Icon({
      ...props,
      path: h(React.Fragment, null, h('path', { d: 'M12 5v14' }), h('path', { d: 'M5 12h14' })),
    });

    const IconRefresh = (props) => Icon({
      ...props,
      path: h(React.Fragment, null,
        h('path', { d: 'M20 11a8 8 0 1 0-2.3 5.7' }),
        h('path', { d: 'M20 4v7h-7' }),
      ),
    });

    const IconTrash = (props) => Icon({
      ...props,
      path: h(React.Fragment, null,
        h('path', { d: 'M4 7h16' }),
        h('path', { d: 'M9 7V5h6v2' }),
        h('path', { d: 'M6 7l1 13h10l1-13' }),
        h('path', { d: 'M10 11v5M14 11v5' }),
      ),
    });

    const IconOpen = (props) => Icon({
      ...props,
      path: h(React.Fragment, null,
        h('path', { d: 'M14 5h5v5' }),
        h('path', { d: 'M19 5l-8 8' }),
        h('path', { d: 'M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5' }),
      ),
    });

    const IconClose = (props) => Icon({
      ...props,
      path: h(React.Fragment, null, h('path', { d: 'M6 6l12 12' }), h('path', { d: 'M18 6L6 18' })),
    });

    const IconSearch = (props) => Icon({
      ...props,
      path: h(React.Fragment, null,
        h('circle', { cx: 11, cy: 11, r: 6.5 }),
        h('path', { d: 'M16 16l4.5 4.5' }),
      ),
    });

    const IconCheck = (props) => Icon({
      ...props,
      path: h('path', { d: 'M5 12.5l4.2 4.2L19 7' }),
    });

    const IconAlert = (props) => Icon({
      ...props,
      path: h(React.Fragment, null,
        h('path', { d: 'M12 4l9 16H3z' }),
        h('path', { d: 'M12 9v5' }),
        h('path', { d: 'M12 17.5h.01' }),
      ),
    });

    const IconClock = (props) => Icon({
      ...props,
      path: h(React.Fragment, null,
        h('circle', { cx: 12, cy: 12, r: 8 }),
        h('path', { d: 'M12 8v5l3 2' }),
      ),
    });

    function ClockMark({ size = 16, className }) {
      return h(IconClock, { size, className });
    }

    function Button({ variant = 'secondary', size = 'md', icon, children, className, ...rest }) {
      return h(
        'button',
        {
          type: 'button',
          className: cls('ac-btn', `ac-btn-${variant}`, `ac-btn-${size}`, className),
          ...rest,
        },
        icon || null,
        children ? h('span', { className: 'ac-btn-label' }, children) : null,
      );
    }

    function IconButton({ label, danger, children, className, ...rest }) {
      return h(
        'button',
        {
          type: 'button',
          className: cls('ac-icon-btn', danger && 'ac-icon-btn-danger', className),
          title: label,
          'aria-label': label,
          ...rest,
        },
        children,
      );
    }

    function Field({ label, hint, children }) {
      return h(
        'div',
        { className: 'ac-field' },
        h('span', { className: 'ac-field-label' }, label),
        children,
        hint ? h('span', { className: 'ac-field-hint' }, hint) : null,
      );
    }

    function Modal({ title, description, onClose, children, footer, width = 720, closeLabel = 'Close' }) {
      const dialogRef = useRef(null);
      const closeRef = useRef(onClose);
      closeRef.current = onClose;
      const titleId = useId();

      useEffect(() => {
        const previous = document.activeElement;
        const timer = setTimeout(() => {
          const root = dialogRef.current;
          if (root === null) return;
          const target = root.querySelector('[data-autofocus]')
            ?? root.querySelector('input, textarea, select, button');
          target?.focus?.();
        }, 0);
        const onKeyDown = (event) => {
          if (event.key !== 'Escape' || event.defaultPrevented) return;
          event.preventDefault();
          closeRef.current();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
          clearTimeout(timer);
          document.removeEventListener('keydown', onKeyDown);
          if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true });
        };
      }, []);

      return ReactDOM.createPortal(
        h(
          'div',
          {
            className: 'ac-modal-backdrop',
            onMouseDown: (event) => {
              if (event.target === event.currentTarget) closeRef.current();
            },
          },
          h(
            'div',
            {
              ref: dialogRef,
              className: 'ac-modal',
              role: 'dialog',
              'aria-modal': 'true',
              'aria-labelledby': titleId,
              style: { maxWidth: `${width}px` },
            },
            h(
              'div',
              { className: 'ac-modal-head' },
              h(
                'div',
                { className: 'ac-modal-copy' },
                h('h2', { id: titleId, className: 'ac-modal-title' }, title),
                description ? h('p', { className: 'ac-modal-desc' }, description) : null,
              ),
              h(
                IconButton,
                { label: closeLabel, onClick: onClose, className: 'ac-modal-close' },
                h(IconClose, { size: 18 }),
              ),
            ),
            h('div', { className: 'ac-modal-body' }, children),
            footer ? h('div', { className: 'ac-modal-foot' }, footer) : null,
          ),
        ),
        document.body,
      );
    }

    function FormError({ children }) {
      return h(
        'div',
        { className: 'ac-form-error', role: 'alert' },
        h(IconAlert, { size: 15 }),
        h('span', null, children),
      );
    }

    function Spinner() {
      return h('span', { className: 'ac-spinner', 'aria-hidden': true });
    }

    function NewTaskDialog({ t, sessionsStore, workspacesStore, onSubmit, onClose, onCreated }) {
      const sessions = useSyncExternalStore(
        (listener) => sessionsStore.subscribe(listener),
        () => sessionsStore.getSnapshot(),
      );
      const workspaces = useSyncExternalStore(
        (listener) => workspacesStore.subscribe(listener),
        () => workspacesStore.getSnapshot(),
      );
      const [form, setForm] = useState(defaultForm);
      const [sessionQuery, setSessionQuery] = useState('');
      const [error, setError] = useState('');
      const [submitting, setSubmitting] = useState(false);
      const [progress, setProgress] = useState(null);
      const autoSelected = useRef(false);

      const candidates = useMemo(() => {
        const ids = sessions?.ids || Object.keys(sessions?.byId || {});
        const archived = new Set(workspaces?.archivedSessionIds || []);
        return ids
          .map((id) => sessions?.byId?.[id])
          .filter((row) => row !== undefined)
          .filter((row) => row.origin !== 'subagent' && row.blank !== true && !archived.has(row.id))
          .sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
      }, [sessions, workspaces]);

      useEffect(() => {
        if (autoSelected.current) return;
        if (form.sessionIds.length > 0) {
          autoSelected.current = true;
          return;
        }
        const first = candidates[0];
        if (first === undefined) return;
        autoSelected.current = true;
        setForm((current) => ({ ...current, sessionIds: [first.id] }));
      }, [candidates, form.sessionIds.length]);

      const shownCandidates = useMemo(() => {
        const query = sessionQuery.trim().toLowerCase();
        const matching = query === ''
          ? candidates
          : candidates.filter((row) => [
            row.title,
            row.displayTitle,
            row.id,
            row.cwd,
          ].filter((value) => typeof value === 'string').join('\n').toLowerCase().includes(query));
        return { matching, visible: matching.slice(0, 60) };
      }, [candidates, sessionQuery]);

      const patch = (next) => {
        setForm((current) => ({ ...current, ...next }));
      };

      const chooseKind = (kind) => {
        if (kind === 'once') {
          const soon = new Date(Date.now() + 60 * 60 * 1000);
          patch({ kind, date: localDate(soon), time: localTime(soon) });
          return;
        }
        patch({ kind });
      };

      const toggleSession = (id) => {
        setForm((current) => {
          const has = current.sessionIds.includes(id);
          return {
            ...current,
            sessionIds: has
              ? current.sessionIds.filter((value) => value !== id)
              : [...current.sessionIds, id],
          };
        });
      };

      const toggleAllShown = () => {
        const ids = shownCandidates.visible.map((row) => row.id);
        setForm((current) => {
          const all = ids.length > 0 && ids.every((id) => current.sessionIds.includes(id));
          return {
            ...current,
            sessionIds: all
              ? current.sessionIds.filter((id) => !ids.includes(id))
              : [...new Set([...current.sessionIds, ...ids])],
          };
        });
      };

      const toggleWeekday = (day) => {
        setForm((current) => {
          const has = current.weekdays.includes(day);
          return {
            ...current,
            weekdays: has
              ? current.weekdays.filter((value) => value !== day)
              : [...current.weekdays, day].sort((left, right) => left - right),
          };
        });
      };

      const close = () => {
        if (!submitting) onClose();
      };

      const submit = async () => {
        const invalid = validateForm(form);
        if (invalid !== null) {
          setError(t(invalid));
          return;
        }
        setError('');
        setSubmitting(true);
        const request = buildRequest(form);
        const ids = [...form.sessionIds];
        let done = 0;
        let failed = 0;
        let lastError = null;
        let first = null;
        for (let index = 0; index < ids.length; index += 1) {
          setProgress({ done: String(index), total: String(ids.length) });
          const outcome = await onSubmit({ sessionId: ids[index], request, autoClean: form.autoClean === true });
          if (outcome.ok) {
            done += 1;
            if (first === null) first = outcome.value;
          } else {
            failed += 1;
            lastError = outcome.error;
          }
          setProgress({ done: String(index + 1), total: String(ids.length) });
        }
        setSubmitting(false);
        setProgress(null);
        if (done === 0) {
          setError(t('form.error.create', { message: friendlyError(lastError, t) }));
          return;
        }
        onCreated({ done, failed, total: ids.length, first });
      };

      const timingControls = (() => {
        if (form.kind === 'every') {
          return h(
            'div',
            { className: 'ac-form-grid' },
            h(
              Field,
              {
                label: t('form.interval'),
                hint: form.repeat ? t('form.intervalHint') : t('form.delayHint'),
              },
              h(
                'div',
                { className: 'ac-inline' },
                h('input', {
                  className: 'ac-input ac-input-compact',
                  type: 'number',
                  min: 1,
                  step: 1,
                  value: form.everyValue,
                  onChange: (event) => patch({ everyValue: event.target.value }),
                }),
                h(
                  'select',
                  {
                    className: 'ac-input ac-select ac-input-compact',
                    value: form.everyUnit,
                    onChange: (event) => patch({ everyUnit: event.target.value }),
                    'aria-label': t('form.intervalUnit'),
                  },
                  h('option', { value: 'minutes' }, t('form.unit.minutes')),
                  h('option', { value: 'hours' }, t('form.unit.hours')),
                  h('option', { value: 'seconds' }, t('form.unit.seconds')),
                ),
                h(
                  'label',
                  { className: 'ac-check-row' },
                  h('input', {
                    type: 'checkbox',
                    checked: form.repeat === true,
                    onChange: (event) => patch({ repeat: event.target.checked }),
                  }),
                  h('span', null, t('form.repeat')),
                ),
              ),
            ),
          );
        }

        if (form.kind === 'once') {
          return h(
            'div',
            { className: 'ac-form-grid' },
            h(
              Field,
              { label: t('form.date') },
              h('input', {
                className: 'ac-input',
                type: 'date',
                value: form.date,
                onChange: (event) => patch({ date: event.target.value }),
              }),
            ),
            h(
              Field,
              { label: t('form.time') },
              h('input', {
                className: 'ac-input',
                type: 'time',
                step: 1,
                value: form.time,
                onChange: (event) => patch({ time: event.target.value }),
              }),
            ),
          );
        }

        if (form.kind === 'daily') {
          return h(
            'div',
            { className: 'ac-form-grid' },
            h(
              Field,
              { label: t('form.time') },
              h('input', {
                className: 'ac-input',
                type: 'time',
                step: 1,
                value: form.time,
                onChange: (event) => patch({ time: event.target.value }),
              }),
            ),
          );
        }

        if (form.kind === 'weekly') {
          return h(
            React.Fragment,
            null,
            h(
              Field,
              { label: t('form.weekdays') },
              h(
                'div',
                { className: 'ac-weekdays' },
                WEEKDAYS.map((day) => h(
                  'button',
                  {
                    key: day,
                    type: 'button',
                    className: cls('ac-weekday', form.weekdays.includes(day) && 'is-selected'),
                    'aria-pressed': form.weekdays.includes(day),
                    onClick: () => toggleWeekday(day),
                  },
                  t(`weekday.${day}`),
                )),
              ),
            ),
            h(
              'div',
              { className: 'ac-form-grid' },
              h(
                Field,
                { label: t('form.time') },
                h('input', {
                  className: 'ac-input',
                  type: 'time',
                  step: 1,
                  value: form.time,
                  onChange: (event) => patch({ time: event.target.value }),
                }),
              ),
            ),
          );
        }

        return h(
          'div',
          { className: 'ac-form-grid' },
          h(
            Field,
            { label: t('form.cron'), hint: t('form.cronHint') },
            h('input', {
              className: 'ac-input ac-input-mono',
              value: form.cron,
              onChange: (event) => patch({ cron: event.target.value }),
              spellCheck: false,
            }),
          ),
        );
      })();

      const selectedCount = form.sessionIds.length;

      return h(
        Modal,
        {
          title: t('form.title'),
          description: t('form.subtitle'),
          closeLabel: t('aria.close'),
          onClose: close,
          width: 760,
          footer: h(
            React.Fragment,
            null,
            h(
              'div',
              { className: 'ac-preview' },
              h('span', { className: 'ac-preview-label' }, t('form.preview')),
              h('span', null, previewText(form, t)),
            ),
            h(
              'div',
              { className: 'ac-modal-actions' },
              h(Button, { size: 'sm', onClick: close, disabled: submitting }, t('form.cancel')),
              h(
                Button,
                {
                  variant: 'primary',
                  size: 'sm',
                  onClick: submit,
                  disabled: submitting || selectedCount === 0,
                },
                submitting ? Spinner() : h(IconPlus, { size: 15 }),
                submitting
                  ? (progress === null
                    ? t('form.creating')
                    : t('form.creatingProgress', progress))
                  : (selectedCount > 1
                    ? t('form.createMany', { count: String(selectedCount) })
                    : t('form.create')),
              ),
            ),
          ),
        },
        error ? h(FormError, null, error) : null,
        h(
          'div',
          { className: 'ac-form-stack' },
          h(
            Field,
            { label: t('form.name') },
            h('input', {
              className: 'ac-input',
              value: form.title,
              maxLength: 120,
              placeholder: t('form.namePlaceholder'),
              'data-autofocus': true,
              onChange: (event) => patch({ title: event.target.value }),
            }),
          ),
          h(
            Field,
            { label: t('form.prompt') },
            h('textarea', {
              className: 'ac-input ac-textarea',
              rows: 3,
              value: form.prompt,
              placeholder: t('form.promptPlaceholder'),
              onChange: (event) => patch({ prompt: event.target.value }),
            }),
          ),
        ),
        h(
          'div',
          { className: 'ac-form-section' },
          h(
            'div',
            { className: 'ac-form-section-head' },
            h('h3', { className: 'ac-form-section-title' }, t('form.session')),
            h('span', { className: 'ac-selected-count' }, t('form.sessionCount', { count: String(selectedCount) })),
          ),
          h(
            'div',
            { className: 'ac-session-toolbar' },
            h(
              'div',
              { className: 'ac-session-search' },
              h(IconSearch, { size: 14 }),
              h('input', {
                className: 'ac-input ac-session-search-input',
                value: sessionQuery,
                placeholder: t('form.sessionSearch'),
                onChange: (event) => setSessionQuery(event.target.value),
              }),
            ),
            h(
              Button,
              { size: 'sm', variant: 'ghost', onClick: toggleAllShown, disabled: shownCandidates.visible.length === 0 },
              shownCandidates.visible.length > 0
                && shownCandidates.visible.every((row) => form.sessionIds.includes(row.id))
                ? t('form.sessionDeselectAll')
                : t('form.sessionSelectAll'),
            ),
            h(
              Button,
              { size: 'sm', variant: 'ghost', onClick: () => patch({ sessionIds: [] }), disabled: selectedCount === 0 },
              t('form.sessionClear'),
            ),
          ),
          h(
            'div',
            { className: 'ac-session-list', role: 'listbox', 'aria-label': t('form.session'), 'aria-multiselectable': 'true' },
            shownCandidates.visible.length === 0
              ? h('div', { className: 'ac-session-empty' }, t('form.sessionEmpty'))
              : shownCandidates.visible.map((row) => h(
                'label',
                {
                  key: row.id,
                  className: cls('ac-session-option', form.sessionIds.includes(row.id) && 'is-selected'),
                },
                h('input', {
                  type: 'checkbox',
                  className: 'ac-session-check',
                  checked: form.sessionIds.includes(row.id),
                  onChange: () => toggleSession(row.id),
                }),
                h(
                  'span',
                  { className: 'ac-session-option-copy' },
                  h('span', { className: 'ac-session-option-title' }, row.title?.trim() || row.displayTitle || row.id),
                  row.cwd ? h('span', { className: 'ac-session-option-cwd ac-mono' }, row.cwd) : null,
                ),
              )),
            shownCandidates.matching.length > shownCandidates.visible.length
              ? h(
                'div',
                { className: 'ac-session-more' },
                t('form.sessionMore', {
                  count: String(shownCandidates.matching.length - shownCandidates.visible.length),
                }),
              )
              : null,
          ),
          h('p', { className: 'ac-field-hint' }, t('form.sessionHint')),
        ),
        h(
          'div',
          { className: 'ac-form-section' },
          h('h3', { className: 'ac-form-section-title' }, t('form.timing')),
          h(
            'div',
            { className: 'ac-choice-row', role: 'group', 'aria-label': t('form.timing') },
            [
              ['every', t('form.repeat.every')],
              ['once', t('form.repeat.once')],
              ['daily', t('form.repeat.daily')],
              ['weekly', t('form.repeat.weekly')],
              ['cron', t('form.repeat.cron')],
            ].map(([value, label]) => h(
              'button',
              {
                key: value,
                type: 'button',
                className: cls('ac-choice', form.kind === value && 'is-selected'),
                'aria-pressed': form.kind === value,
                onClick: () => chooseKind(value),
              },
              label,
            )),
          ),
          h('div', { className: 'ac-timing-fields' }, timingControls),
        ),
        h(
          'div',
          { className: 'ac-form-section' },
          h(
            'label',
            { className: 'ac-auto-clean' },
            h('input', {
              type: 'checkbox',
              checked: form.autoClean === true,
              onChange: (event) => patch({ autoClean: event.target.checked }),
            }),
            h(
              'span',
              { className: 'ac-auto-clean-copy' },
              h('strong', null, t('form.autoClean')),
              h('span', { className: 'ac-field-hint' }, t('form.autoCleanHint')),
            ),
          ),
        ),
      );
    }

    function ConfirmDeleteDialog({ t, targets, sessions, workspaces, busy, progress, onCancel, onConfirm }) {
      const first = targets.slice(0, 5);
      const remaining = targets.length - first.length;
      return h(
        Modal,
        {
          title: targets.length === 1 ? t('confirm.titleOne') : t('confirm.titleMany', { count: String(targets.length) }),
          description: t('confirm.body'),
          closeLabel: t('aria.close'),
          onClose: busy ? () => {} : onCancel,
          width: 540,
          footer: h(
            React.Fragment,
            null,
            h('div', { className: 'ac-confirm-progress' }, busy && progress !== null
              ? h(React.Fragment, null, Spinner(), t('confirm.progress', progress))
              : null),
            h(
              'div',
              { className: 'ac-modal-actions' },
              h(Button, { size: 'sm', onClick: onCancel, disabled: busy }, t('confirm.cancel')),
              h(
                Button,
                { variant: 'danger', size: 'sm', onClick: onConfirm, disabled: busy, 'data-autofocus': true },
                busy ? Spinner() : h(IconTrash, { size: 15 }),
                busy ? t('confirm.pending') : t('confirm.delete'),
              ),
            ),
          ),
        },
        h(
          'ul',
          { className: 'ac-confirm-list' },
          first.map((record) => h(
            'li',
            { key: record.id },
            h('strong', null, taskName(record)),
            h(
              'span',
              { className: 'ac-confirm-session' },
              sessionLabel(record.sessionId, sessions, workspaces).title,
            ),
          )),
          remaining > 0
            ? h('li', { className: 'ac-confirm-more' }, t('confirm.more', { count: String(remaining) }))
            : null,
        ),
      );
    }

    function LegacyTaskDetailPane({ record, t, rpc, sessions, workspaces, onClose, onDelete, onOpenSession }) {
      const [tab, setTab] = useState('rule');
      const [history, setHistory] = useState(null);
      const [historyState, setHistoryState] = useState('idle');
      const [historyError, setHistoryError] = useState(null);

      useEffect(() => {
        if (tab !== 'records' || historyState !== 'idle') return;
        setHistoryState('loading');
        rpc('schedule/history', {
          request: {
            sessionId: record.sessionId,
            id: record.id,
            limit: 20,
          },
        }).then((result) => {
          if (result.ok && Array.isArray(result.value?.records)) {
            setHistory(result.value.records);
            setHistoryState('ready');
          } else {
            setHistoryError(result.ok ? null : result.error);
            setHistoryState('error');
          }
        }).catch((error) => {
          setHistoryError({ code: 'transport', message: error instanceof Error ? error.message : String(error) });
          setHistoryState('error');
        });
      }, [tab, historyState, record.sessionId, record.id, rpc]);

      const linked = sessionLabel(record.sessionId, sessions, workspaces);
      const status = record.status === 'active' ? t('status.active') : t('status.inactive');
      const next = record.status === 'active'
        ? t('next', { time: formatDateTime(record.scheduledAt) })
        : t('noNext');

      const ruleRows = [
        [t('detail.status'), status],
        [t('detail.frequency'), frequencyText(record, t)],
        [t('detail.next'), next],
        [t('detail.session'), linked.title],
        [t('detail.id'), record.id],
      ];

      return h(
        'aside',
        { className: 'ac-detail', 'aria-label': t('detail.rule') },
        h(
          'div',
          { className: 'ac-detail-tabs-bar' },
          h(
            'div',
            { className: 'ac-detail-tabs', role: 'tablist' },
            h(
              'button',
              {
                type: 'button',
                role: 'tab',
                className: 'ac-detail-tab',
                'aria-selected': tab === 'rule',
                onClick: () => setTab('rule'),
              },
              t('detail.rule'),
            ),
            h(
              'button',
              {
                type: 'button',
                role: 'tab',
                className: 'ac-detail-tab',
                'aria-selected': tab === 'records',
                onClick: () => setTab('records'),
              },
              t('detail.records'),
            ),
          ),
          h(
            'div',
            { className: 'ac-detail-actions' },
            h(
              IconButton,
              {
                label: t('aria.openSession'),
                disabled: !linked.available,
                onClick: () => onOpenSession(record.sessionId),
              },
              h(IconOpen, { size: 16 }),
            ),
            h(
              IconButton,
              {
                label: t('aria.deleteTask', { title: taskName(record) }),
                danger: true,
                onClick: () => onDelete(record),
              },
              h(IconTrash, { size: 16 }),
            ),
            h(
              IconButton,
              { label: t('detail.close'), onClick: onClose },
              h(IconClose, { size: 16 }),
            ),
          ),
        ),
        h(
          'div',
          { className: 'ac-detail-scroll' },
          h('h2', { className: 'ac-detail-name' }, taskName(record)),
          h('p', { className: 'ac-detail-next' }, record.status === 'active'
            ? t('next', { time: formatDateTime(record.scheduledAt) })
            : `${status} · ${t('noNext')}`),
          tab === 'rule'
            ? h(
              React.Fragment,
              null,
              h(
                'div',
                { className: 'ac-rule-card' },
                h('h3', null, t('detail.rule')),
                h(
                  'div',
                  { className: 'ac-rule-rows' },
                  ruleRows.map(([label, value], index) => h(
                    'div',
                    { className: 'ac-rule-row', key: `${label}-${index}` },
                    h('span', { className: 'ac-rule-label' }, label),
                    index === 3
                      ? h(
                        'button',
                        {
                          type: 'button',
                          className: cls('ac-rule-value', 'ac-rule-link'),
                          disabled: !linked.available,
                          onClick: () => onOpenSession(record.sessionId),
                          title: linked.available ? t('action.openSession') : undefined,
                        },
                        linked.archived ? `${value} (${t('archived')})` : value,
                        linked.available ? h(IconOpen, { size: 13 }) : null,
                      )
                      : h('span', { className: cls('ac-rule-value', index === 4 && 'ac-mono') }, value),
                  )),
                ),
              ),
              h(
                'div',
                { className: 'ac-instruction' },
                h('h3', null, t('detail.instruction')),
                h('p', null, record.prompt || ''),
              ),
            )
            : h(
              'div',
              { className: 'ac-history' },
              historyState === 'loading'
                ? h(
                  'div',
                  { className: 'ac-empty' },
                  h(Spinner),
                  h('span', null, t('detail.historyLoading')),
                )
                : historyState === 'error'
                  ? h(
                    'div',
                    { className: 'ac-empty' },
                    h(IconAlert, { size: 28, className: 'ac-empty-glyph' }),
                    h('h2', null, t('detail.historyError')),
                    historyError ? h('p', null, friendlyError(historyError, t)) : null,
                    h(Button, {
                      size: 'sm',
                      onClick: () => {
                        setHistoryState('idle');
                        setHistoryError(null);
                      },
                    }, t('retry')),
                  )
                  : history === null || history.length === 0
                    ? h('div', { className: 'ac-empty' }, t('detail.noHistory'))
                    : h(
                      'ul',
                      { className: 'ac-history-list' },
                      history.map((delivery) => h(
                        'li',
                        { key: delivery.messageId || `${delivery.deliveredAt}-${delivery.scheduledAt}`, className: 'ac-history-item' },
                        h('div', { className: 'ac-history-time' }, t('detail.delivery', { time: formatDateTime(delivery.deliveredAt) })),
                        delivery.prompt ? h('p', { className: 'ac-history-prompt' }, delivery.prompt) : null,
                      )),
                    ),
            ),
        ),
      );
    }

    function TaskDetailPane({
      record,
      t,
      rpc,
      sessions,
      workspaces,
      now,
      onClose,
      onDelete,
      onOpenSession,
      onRefresh,
      onNotify,
    }) {
      const [tab, setTab] = useState('rule');
      const [history, setHistory] = useState(null);
      const [historyState, setHistoryState] = useState('idle');
      const [historyError, setHistoryError] = useState(null);
      const [draft, setDraft] = useState(null);
      const [saveError, setSaveError] = useState('');
      const [saving, setSaving] = useState(false);
      const scrollRef = useRef(null);

      const active = record.status === 'active';
      const base = useMemo(() => editStateFromRecord(record), [record]);
      const form = draft === null ? base : draft;
      const titleChanged = form.title.trim() !== base.title.trim();
      const promptChanged = form.prompt.trim() !== (base.prompt || '').trim();
      const timingDirty = timingKey(form) !== timingKey(base);
      const autoCleanDirty = form.autoClean !== base.autoClean;
      const contentDirty = titleChanged || promptChanged || timingDirty;
      const dirty = active && (contentDirty || autoCleanDirty);

      useEffect(() => {
        if (scrollRef.current !== null) scrollRef.current.scrollTop = 0;
      }, [tab, record.id]);

      useEffect(() => {
        setHistory(null);
        setHistoryState('idle');
        setHistoryError(null);
      }, [record.id, record.status, record.lastDelivery?.messageId]);

      useEffect(() => {
        if (tab !== 'records' || historyState !== 'idle') return;
        setHistoryState('loading');
        rpc('schedule/history', {
          request: {
            sessionId: record.sessionId,
            id: record.id,
            limit: 20,
          },
        }).then((result) => {
          if (result.ok && Array.isArray(result.value?.records)) {
            setHistory(result.value.records);
            setHistoryState('ready');
          } else {
            setHistoryError(result.ok ? null : result.error);
            setHistoryState('error');
          }
        }).catch((error) => {
          setHistoryError({ code: 'transport', message: error instanceof Error ? error.message : String(error) });
          setHistoryState('error');
        });
      }, [tab, historyState, record.sessionId, record.id, rpc]);

      const patch = (next) => {
        setDraft({ ...form, ...next });
      };

      const chooseKind = (kind) => {
        if (kind === 'once') {
          const soon = new Date(Date.now() + 60 * 60 * 1000);
          patch({ kind, date: localDate(soon), time: localTime(soon) });
          return;
        }
        if (kind === 'every') {
          patch({
            kind,
            everyValue: form.everyValue ?? '30',
            everyUnit: form.everyUnit ?? 'minutes',
            repeat: form.repeat === true,
          });
          return;
        }
        if (kind === 'weekly') {
          patch({ kind, weekdays: form.weekdays ?? [1, 2, 3, 4, 5] });
          return;
        }
        if (kind === 'cron') {
          patch({ kind, cron: form.cron ?? '0 9 * * 1-5' });
          return;
        }
        patch({ kind });
      };

      const toggleWeekday = (day) => {
        const weekdays = form.weekdays ?? [];
        const has = weekdays.includes(day);
        patch({
          weekdays: has
            ? weekdays.filter((value) => value !== day)
            : [...weekdays, day].sort((left, right) => left - right),
        });
      };

      const save = async () => {
        if (!dirty || saving) return;
        const invalid = validateEdit(form);
        if (invalid !== null) {
          setSaveError(t(invalid));
          return;
        }
        const request = {
          sessionId: record.sessionId,
          id: record.id,
          expected: record,
        };
        if (titleChanged) request.title = form.title.trim();
        if (promptChanged) request.prompt = form.prompt.trim();
        if (timingDirty) request.change = timingChange(form);
        setSaving(true);
        setSaveError('');
        try {
          if (contentDirty) {
            const result = await rpc('schedule/update', { request });
            if (!result.ok) {
              setSaveError(t('detail.error.save', { message: friendlyError(result.error, t) }));
              return;
            }
            const value = result.value;
            if (value?.updated !== true) {
              if (value?.code === 'schedule_conflict') {
                setSaveError(t('detail.error.conflict'));
                await onRefresh?.();
                return;
              }
              if (value?.code === 'schedule_ended') {
                setDraft(null);
                setSaveError(t('detail.error.ended'));
                await onRefresh?.();
                return;
              }
              if (value?.code === 'schedule_not_found') {
                setDraft(null);
                setSaveError(t('detail.error.notFound'));
                await onRefresh?.();
                return;
              }
              setSaveError(t('detail.error.save', { message: friendlyError(value, t) }));
              return;
            }
          }
          if (autoCleanDirty) {
            const flag = await rpc('schedule/setAutoClean', {
              request: {
                sessionId: record.sessionId,
                id: record.id,
                autoClean: form.autoClean === true,
              },
            });
            if (!flag.ok || flag.value?.updated !== true) {
              setDraft(null);
              setSaveError(t('detail.error.save', {
                message: friendlyError(flag.ok ? flag.value : flag.error, t),
              }));
              await onRefresh?.();
              return;
            }
          }
          setDraft(null);
          onNotify?.({ tone: 'success', text: t('detail.saved') });
          await onRefresh?.();
        } catch (error) {
          setSaveError(t('detail.error.save', {
            message: error instanceof Error ? error.message : String(error),
          }));
        } finally {
          setSaving(false);
        }
      };

      const linked = sessionLabel(record.sessionId, sessions, workspaces);
      const status = active ? t('status.active') : t('status.inactive');
      const next = nextRunText(record, now, t);
      const disabled = !active || saving;

      const timingFields = (() => {
        if (form.kind === 'every') {
          return h(
            'div',
            { className: 'ac-edit-grid' },
            h(
              Field,
              {
                label: t('form.interval'),
                hint: form.repeat ? t('form.intervalHint') : t('form.delayHint'),
              },
              h(
                'div',
                { className: 'ac-inline' },
                h('input', {
                  className: 'ac-input ac-input-compact',
                  type: 'number',
                  min: 1,
                  step: 1,
                  value: form.everyValue,
                  disabled,
                  onChange: (event) => patch({ everyValue: event.target.value }),
                }),
                h(
                  'select',
                  {
                    className: 'ac-input ac-select ac-input-compact',
                    value: form.everyUnit,
                    disabled,
                    onChange: (event) => patch({ everyUnit: event.target.value }),
                    'aria-label': t('form.intervalUnit'),
                  },
                  h('option', { value: 'minutes' }, t('form.unit.minutes')),
                  h('option', { value: 'hours' }, t('form.unit.hours')),
                  h('option', { value: 'seconds' }, t('form.unit.seconds')),
                ),
                h(
                  'label',
                  { className: 'ac-check-row' },
                  h('input', {
                    type: 'checkbox',
                    checked: form.repeat === true,
                    disabled,
                    onChange: (event) => patch({ repeat: event.target.checked }),
                  }),
                  h('span', null, t('form.repeat')),
                ),
              ),
            ),
          );
        }

        if (form.kind === 'once') {
          return h(
            'div',
            { className: 'ac-edit-grid' },
            h(
              Field,
              { label: t('form.date') },
              h('input', {
                className: 'ac-input',
                type: 'date',
                value: form.date,
                disabled,
                onChange: (event) => patch({ date: event.target.value }),
              }),
            ),
            h(
              Field,
              { label: t('form.time') },
              h('input', {
                className: 'ac-input',
                type: 'time',
                step: 1,
                value: form.time,
                disabled,
                onChange: (event) => patch({ time: event.target.value }),
              }),
            ),
          );
        }

        if (form.kind === 'daily') {
          return h(
            'div',
            { className: 'ac-edit-grid' },
            h(
              Field,
              { label: t('form.time') },
              h('input', {
                className: 'ac-input',
                type: 'time',
                step: 1,
                value: form.time,
                disabled,
                onChange: (event) => patch({ time: event.target.value }),
              }),
            ),
          );
        }

        if (form.kind === 'weekly') {
          return h(
            React.Fragment,
            null,
            h(
              Field,
              { label: t('form.weekdays') },
              h(
                'div',
                { className: 'ac-weekdays' },
                WEEKDAYS.map((day) => h(
                  'button',
                  {
                    key: day,
                    type: 'button',
                    className: cls('ac-weekday', (form.weekdays || []).includes(day) && 'is-selected'),
                    'aria-pressed': (form.weekdays || []).includes(day),
                    disabled,
                    onClick: () => toggleWeekday(day),
                  },
                  t(`weekday.${day}`),
                )),
              ),
            ),
            h(
              'div',
              { className: 'ac-edit-grid' },
              h(
                Field,
                { label: t('form.time') },
                h('input', {
                  className: 'ac-input',
                  type: 'time',
                  step: 1,
                  value: form.time,
                  disabled,
                  onChange: (event) => patch({ time: event.target.value }),
                }),
              ),
            ),
          );
        }

        return h(
          'div',
          { className: 'ac-edit-grid' },
          h(
            Field,
            { label: t('form.cron'), hint: t('form.cronHint') },
            h('input', {
              className: 'ac-input ac-input-mono',
              value: form.cron,
              disabled,
              spellCheck: false,
              onChange: (event) => patch({ cron: event.target.value }),
            }),
          ),
        );
      })();

      const metaRows = [
        [t('detail.status'), status],
        [t('detail.next'), next],
        [t('detail.session'), linked.title],
        [t('detail.id'), record.id],
      ];

      const saveBar = saveError !== '' || (active && (dirty || saving))
        ? h(
          'div',
          { className: 'ac-save-bar' },
          saveError ? h('div', { className: 'ac-save-error', role: 'alert' }, saveError) : null,
          h(
            'div',
            { className: 'ac-save-line' },
            h('span', { className: 'ac-save-state' }, dirty ? t('detail.unsaved') : ''),
            h(
              'div',
              { className: 'ac-save-actions' },
              h(
                Button,
                {
                  size: 'sm',
                  disabled: saving,
                  onClick: () => {
                    setDraft(null);
                    setSaveError('');
                  },
                },
                t('detail.cancel'),
              ),
              h(
                Button,
                {
                  variant: 'primary',
                  size: 'sm',
                  disabled: saving || !dirty,
                  onClick: save,
                },
                saving ? Spinner() : h(IconCheck, { size: 15 }),
                saving ? t('detail.saving') : t('detail.save'),
              ),
            ),
          ),
        )
        : null;

      return h(
        'aside',
        { className: 'ac-detail', 'aria-label': t('detail.rule') },
        h(
          'div',
          { className: 'ac-detail-tabs-bar' },
          h(
            'div',
            { className: 'ac-detail-tabs', role: 'tablist' },
            h(
              'button',
              {
                type: 'button',
                role: 'tab',
                className: 'ac-detail-tab',
                'aria-selected': tab === 'rule',
                onClick: () => setTab('rule'),
              },
              t('detail.rule'),
            ),
            h(
              'button',
              {
                type: 'button',
                role: 'tab',
                className: 'ac-detail-tab',
                'aria-selected': tab === 'records',
                onClick: () => setTab('records'),
              },
              t('detail.records'),
            ),
          ),
          h(
            'div',
            { className: 'ac-detail-actions' },
            h(
              IconButton,
              {
                label: t('aria.openSession'),
                disabled: !linked.available,
                onClick: () => onOpenSession(record.sessionId),
              },
              h(IconOpen, { size: 16 }),
            ),
            h(
              IconButton,
              {
                label: t('aria.deleteTask', { title: taskName(record) }),
                danger: true,
                onClick: () => onDelete(record),
              },
              h(IconTrash, { size: 16 }),
            ),
            h(
              IconButton,
              { label: t('detail.close'), onClick: onClose },
              h(IconClose, { size: 16 }),
            ),
          ),
        ),
        h(
          'div',
          { ref: scrollRef, className: 'ac-detail-scroll' },
          active
            ? h('input', {
              className: 'ac-detail-name-input',
              value: form.title,
              maxLength: 120,
              disabled: saving,
              'aria-label': t('form.name'),
              onChange: (event) => patch({ title: event.target.value }),
            })
            : h('h2', { className: 'ac-detail-name' }, form.title),
          h('p', { className: 'ac-detail-next' }, active
            ? next
            : `${status} · ${next}`),
          tab === 'rule'
            ? h(
              React.Fragment,
              null,
              active
                ? h(
                  'div',
                  { className: 'ac-edit-section' },
                  h('h3', null, t('form.timing')),
                  h(
                    'div',
                    { className: 'ac-choice-row' },
                    [
                      ['every', t('form.repeat.every')],
                      ['once', t('form.repeat.once')],
                      ['daily', t('form.repeat.daily')],
                      ['weekly', t('form.repeat.weekly')],
                      ['cron', t('form.repeat.cron')],
                    ].map(([value, label]) => h(
                      'button',
                      {
                        key: value,
                        type: 'button',
                        className: cls('ac-choice', form.kind === value && 'is-selected'),
                        'aria-pressed': form.kind === value,
                        disabled,
                        onClick: () => chooseKind(value),
                      },
                      label,
                    )),
                  ),
                  h('div', { className: 'ac-timing-edit' }, timingFields),
                )
                : h(
                  'div',
                  { className: 'ac-rule-card' },
                  h('h3', null, t('detail.rule')),
                  h(
                    'div',
                    { className: 'ac-rule-rows' },
                    [
                      [t('detail.status'), status],
                      [t('detail.frequency'), frequencyText(record, t)],
                      [t('detail.next'), next],
                    ].map(([label, value], index) => h(
                      'div',
                      { className: 'ac-rule-row', key: `${label}-${index}` },
                      h('span', { className: 'ac-rule-label' }, label),
                      h('span', { className: 'ac-rule-value' }, value),
                    )),
                  ),
                  h('p', { className: 'ac-readonly-note' }, t('detail.readonly')),
                ),
              active
                ? h(
                  'div',
                  { className: 'ac-edit-section' },
                  h(
                    'label',
                    { className: 'ac-auto-clean' },
                    h('input', {
                      type: 'checkbox',
                      checked: form.autoClean === true,
                      disabled: saving,
                      onChange: (event) => patch({ autoClean: event.target.checked }),
                    }),
                    h(
                      'span',
                      { className: 'ac-auto-clean-copy' },
                      h('strong', null, t('form.autoClean')),
                      h('span', { className: 'ac-field-hint' }, t('form.autoCleanHint')),
                    ),
                  ),
                )
                : null,
              h(
                'div',
                { className: 'ac-instruction' },
                h('h3', null, t('detail.instruction')),
                active
                  ? h('textarea', {
                    className: 'ac-input ac-textarea ac-instruction-edit',
                    rows: 4,
                    value: form.prompt,
                    disabled: saving,
                    'aria-label': t('form.prompt'),
                    onChange: (event) => patch({ prompt: event.target.value }),
                  })
                  : h('p', null, form.prompt),
              ),
              h(
                'div',
                { className: 'ac-detail-meta' },
                metaRows.map(([label, value], index) => h(
                  'div',
                  { className: 'ac-meta-row', key: `${label}-${index}` },
                  h('span', { className: 'ac-meta-label' }, label),
                  index === 2
                    ? h(
                      'button',
                      {
                        type: 'button',
                        className: cls('ac-meta-value', 'ac-rule-link'),
                        disabled: !linked.available,
                        onClick: () => onOpenSession(record.sessionId),
                      },
                      linked.archived ? `${value} (${t('archived')})` : value,
                      linked.available ? h(IconOpen, { size: 13 }) : null,
                    )
                    : h('span', { className: cls('ac-meta-value', index === 3 && 'ac-mono') }, value),
                )),
              ),
            )
            : h(
              'div',
              { className: 'ac-history' },
              historyState === 'idle' || historyState === 'loading'
                ? h(
                  'div',
                  { className: 'ac-empty' },
                  h(Spinner),
                  h('span', null, t('detail.historyLoading')),
                )
                : historyState === 'error'
                  ? h(
                    'div',
                    { className: 'ac-empty' },
                    h(IconAlert, { size: 28, className: 'ac-empty-glyph' }),
                    h('h2', null, t('detail.historyError')),
                    historyError ? h('p', null, friendlyError(historyError, t)) : null,
                    h(Button, {
                      size: 'sm',
                      onClick: () => {
                        setHistoryState('idle');
                        setHistoryError(null);
                      },
                    }, t('retry')),
                  )
                  : history === null || history.length === 0
                    ? h('div', { className: 'ac-empty' }, t('detail.noHistory'))
                    : h(
                      'ul',
                      { className: 'ac-history-list' },
                      history.map((delivery) => h(
                        'li',
                        { key: delivery.messageId || `${delivery.deliveredAt}-${delivery.scheduledAt}`, className: 'ac-history-item' },
                        h('div', { className: 'ac-history-time' }, t('detail.delivery', { time: formatDateTime(delivery.deliveredAt) })),
                        delivery.prompt ? h('p', { className: 'ac-history-prompt' }, delivery.prompt) : null,
                      )),
                    ),
            ),
        ),
        saveBar,
      );
    }

    function TaskRow({ record, selected, t, sessions, workspaces, now, onToggle, onOpen }) {
      const linked = sessionLabel(record.sessionId, sessions, workspaces);
      const status = record.status === 'active' ? t('status.active') : t('status.inactive');
      const next = nextRunText(record, now, t);
      return h(
        'li',
        { className: cls('ac-row', selected && 'ac-row-selected', record.status === 'inactive' && 'ac-row-ended') },
        h('input', {
          type: 'checkbox',
          className: 'ac-row-check',
          checked: selected,
          'aria-label': t('aria.checkbox', { title: taskName(record) }),
          onChange: onToggle,
        }),
        h(
          'button',
          {
            type: 'button',
            className: 'ac-row-open',
            onClick: onOpen,
          },
          h('span', { className: 'ac-row-glyph' }, h(ClockMark, { size: 16 })),
          h(
            'span',
            { className: 'ac-row-content' },
            h('span', { className: 'ac-row-title' }, taskName(record)),
            h(
              'span',
              { className: 'ac-row-summary' },
              h('span', { className: 'ac-row-meta' }, status),
              h('span', { className: 'ac-row-meta' }, frequencyText(record, t)),
              h('span', { className: 'ac-row-meta' }, next),
              h('span', { className: 'ac-row-meta ac-row-meta-session' }, linked.title),
            ),
          ),
        ),
      );
    }

    function EmptyState({ title, hint, action }) {
      return h(
        'div',
        { className: 'ac-empty' },
        h(ClockMark, { size: 32, className: 'ac-empty-glyph' }),
        h('h2', null, title),
        hint ? h('p', null, hint) : null,
        action || null,
      );
    }

    function ScheduleManagerPage(props) {
      const {
        t,
        rpc,
        createTask,
        openSession,
        sessionsStore,
        workspacesStore,
        subscribeChanged,
      } = props;
      const sessions = useSyncExternalStore(
        (listener) => sessionsStore.subscribe(listener),
        () => sessionsStore.getSnapshot(),
      );
      const workspaces = useSyncExternalStore(
        (listener) => workspacesStore.subscribe(listener),
        () => workspacesStore.getSnapshot(),
      );
      const [records, setRecords] = useState([]);
      const [loadState, setLoadState] = useState('loading');
      const [loadError, setLoadError] = useState(null);
      const [search, setSearch] = useState('');
      const [filter, setFilter] = useState('all');
      const [selected, setSelected] = useState(() => new Set());
      const [selectedTaskId, setSelectedTaskId] = useState(null);
      const [confirm, setConfirm] = useState(null);
      const [deleting, setDeleting] = useState(false);
      const [progress, setProgress] = useState(null);
      const [notice, setNotice] = useState(null);
      const [newOpen, setNewOpen] = useState(false);
      const [now, setNow] = useState(() => Date.now());
      const generation = useRef(0);

      const loadCatalog = useCallback(async () => {
        const request = ++generation.current;
        setLoadState((current) => (current === 'ready' ? 'refreshing' : 'loading'));
        setLoadError(null);
        try {
          const result = await rpc('schedule/managedCatalog', {});
          if (request !== generation.current) return;
          if (!result.ok) {
            setLoadError(result.error);
            setLoadState('error');
            return;
          }
          setRecords(Array.isArray(result.value) ? result.value : []);
          setLoadState('ready');
        } catch (error) {
          if (request !== generation.current) return;
          setLoadError({ code: 'transport', message: error instanceof Error ? error.message : String(error) });
          setLoadState('error');
        }
      }, [rpc]);

      const refresh = useCallback(() => {
        setNow(Date.now());
        void loadCatalog();
      }, [loadCatalog]);

      useEffect(() => {
        void loadCatalog();
      }, [loadCatalog]);

      useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
      }, []);

      useEffect(() => {
        if (subscribeChanged === undefined) return;
        const dispose = subscribeChanged(() => refresh());
        return () => dispose?.();
      }, [subscribeChanged, refresh]);

      useEffect(() => {
        if (notice === null) return;
        const timer = setTimeout(() => setNotice(null), 7000);
        return () => clearTimeout(timer);
      }, [notice]);

      useEffect(() => {
        const ids = new Set(records.map((record) => record.id));
        setSelected((current) => {
          const next = new Set([...current].filter((id) => ids.has(id)));
          return next.size === current.size ? current : next;
        });
        if (selectedTaskId !== null && !ids.has(selectedTaskId)) setSelectedTaskId(null);
      }, [records, selectedTaskId]);

      const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        return records
          .filter((record) => filter === 'all' || record.status === filter)
          .filter((record) => taskMatches(record, query, sessions))
          .sort((left, right) => {
            const byTime = Date.parse(left.scheduledAt) - Date.parse(right.scheduledAt);
            if (Number.isFinite(byTime) && byTime !== 0) return byTime;
            return taskName(left).localeCompare(taskName(right));
          });
      }, [records, filter, search, sessions]);

      const selectedRecords = useMemo(
        () => records.filter((record) => selected.has(record.id)),
        [records, selected],
      );
      const selectedTask = selectedTaskId === null
        ? undefined
        : records.find((record) => record.id === selectedTaskId);
      const selectedVisible = filtered.filter((record) => selected.has(record.id)).length;
      const allVisibleSelected = filtered.length > 0 && selectedVisible === filtered.length;
      const counts = useMemo(() => ({
        all: records.length,
        active: records.filter((record) => record.status === 'active').length,
        inactive: records.filter((record) => record.status === 'inactive').length,
      }), [records]);

      const toggleSelected = useCallback((id) => {
        setSelected((current) => {
          const next = new Set(current);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      }, []);

      const toggleAll = useCallback(() => {
        setSelected((current) => {
          const next = new Set(current);
          if (allVisibleSelected) {
            for (const record of filtered) next.delete(record.id);
          } else {
            for (const record of filtered) next.add(record.id);
          }
          return next;
        });
      }, [allVisibleSelected, filtered]);

      const clearSelection = useCallback(() => setSelected(new Set()), []);

      const requestDelete = useCallback((record) => {
        setConfirm({ targets: [record] });
      }, []);

      const requestDeleteSelected = useCallback(() => {
        if (selectedRecords.length === 0) return;
        setConfirm({ targets: selectedRecords });
      }, [selectedRecords]);

      const performDelete = useCallback(async () => {
        if (confirm === null || deleting) return;
        const targets = confirm.targets;
        setDeleting(true);
        let done = 0;
        let failed = 0;
        let lastError = null;
        const failedIds = new Set();
        for (const record of targets) {
          setProgress({ done: String(done + failed), total: String(targets.length) });
          try {
            const result = await rpc('schedule/delete', {
              request: { sessionId: record.sessionId, id: record.id },
            });
            if (!result.ok) {
              failed += 1;
              failedIds.add(record.id);
              lastError = result.error;
            } else if (result.value?.deleted === true || result.value?.code === 'schedule_not_found') {
              done += 1;
            } else {
              failed += 1;
              failedIds.add(record.id);
            }
          } catch (error) {
            failed += 1;
            failedIds.add(record.id);
            lastError = error;
          }
          setProgress({ done: String(done + failed), total: String(targets.length) });
        }
        setDeleting(false);
        setProgress(null);
        setConfirm(null);
        setSelected(failedIds);
        await loadCatalog();
        if (failed === 0) {
          setNotice({ tone: 'success', text: t('notice.deleted', { done: String(done) }) });
        } else if (done > 0) {
          setNotice({
            tone: 'warning',
            text: t('notice.deletedPartial', { done: String(done), failed: String(failed) }),
          });
        } else {
          setNotice({
            tone: 'error',
            text: t('notice.deleteError', { message: friendlyError(lastError, t) }),
          });
        }
      }, [confirm, deleting, rpc, loadCatalog, t]);

      const closeConfirm = useCallback(() => {
        if (!deleting) setConfirm(null);
      }, [deleting]);

      const onCreated = useCallback((summary) => {
        setNewOpen(false);
        if (summary.done > 0) {
          setNotice({
            tone: summary.failed > 0 ? 'warning' : 'success',
            text: summary.failed > 0
              ? t('notice.createdPartial', {
                done: String(summary.done),
                failed: String(summary.failed),
              })
              : t('notice.createdMany', { count: String(summary.done) }),
          });
        }
        void loadCatalog();
      }, [loadCatalog, t]);

      if (sessionsStore === undefined || workspacesStore === undefined) {
        return h('section', { className: 'ac-page' }, h('div', { className: 'ac-page-content' }, h(FormError, null, t('error.unavailable'))));
      }

      const busy = loadState === 'loading' || loadState === 'refreshing';

      return h(
        'section',
        { className: 'ac-page', 'aria-label': t('title') },
        h('style', null, STYLES),
        h(
          'div',
          { className: 'ac-list-pane' },
          h(
            'div',
            { className: 'ac-page-scroll' },
            h(
              'div',
              { className: 'ac-page-content' },
              h(
                'header',
                { className: 'ac-page-heading' },
                h(
                  'div',
                  { className: 'ac-heading-lead' },
                  h('h1', null, t('title')),
                  notice
                    ? h(
                      'div',
                      { className: cls('ac-notice', 'ac-notice-inline', `ac-notice-${notice.tone}`), role: 'status' },
                      notice.tone === 'success' ? h(IconCheck, { size: 14 }) : h(IconAlert, { size: 14 }),
                      h('p', { title: notice.text }, notice.text),
                      h(
                        IconButton,
                        { label: t('aria.close'), onClick: () => setNotice(null), className: 'ac-notice-close' },
                        h(IconClose, { size: 13 }),
                      ),
                    )
                    : null,
                ),
                h(
                  'div',
                  { className: 'ac-heading-actions' },
                  h(
                    Button,
                    {
                      variant: 'ghost',
                      size: 'sm',
                      onClick: refresh,
                      disabled: busy,
                      icon: busy ? Spinner() : h(IconRefresh, { size: 15 }),
                    },
                    t('refresh'),
                  ),
                  h(
                    Button,
                    {
                      variant: 'primary',
                      size: 'sm',
                      onClick: () => setNewOpen(true),
                      icon: h(IconPlus, { size: 15 }),
                    },
                    t('new'),
                  ),
                ),
              ),
              h(
                'div',
                { className: 'ac-filters' },
                h(
                  'div',
                  { className: 'ac-filter-tabs' },
                  [
                    ['all', t('filter.all')],
                    ['active', t('filter.active')],
                    ['inactive', t('filter.inactive')],
                  ].map(([value, label]) => h(
                    'button',
                    {
                      key: value,
                      type: 'button',
                      className: cls('ac-filter-tab', filter === value && 'is-selected'),
                      'aria-pressed': filter === value,
                      onClick: () => setFilter(value),
                    },
                    label,
                    ' ',
                    h(
                      'span',
                      {
                        className: cls(
                          'ac-filter-count',
                          value === 'active' && 'ac-filter-count-active',
                          value === 'inactive' && 'ac-filter-count-inactive',
                        ),
                      },
                      String(counts[value]),
                    ),
                  )),
                ),
                h('div', { className: 'ac-filter-spacer' }),
                h(
                  Button,
                  { size: 'sm', variant: 'ghost', onClick: toggleAll, disabled: filtered.length === 0 },
                  allVisibleSelected ? t('select.none') : t('select.all'),
                ),
              ),
              h(
                'div',
                { className: 'ac-search-field' },
                h(IconSearch, { size: 14 }),
                h('input', {
                  value: search,
                  placeholder: t('search.placeholder'),
                  'aria-label': t('search.placeholder'),
                  onChange: (event) => setSearch(event.target.value),
                }),
                search
                  ? h(
                    IconButton,
                    { label: t('select.none'), onClick: () => setSearch(''), className: 'ac-search-clear' },
                    h(IconClose, { size: 14 }),
                  )
                  : null,
              ),
              h(
                'div',
                { className: 'ac-list' },
                filtered.length === 0
                  ? loadState === 'loading'
                    ? h(EmptyState, { title: t('list.loading') })
                    : loadState === 'error'
                      ? h(EmptyState, {
                        title: t('list.error'),
                        hint: loadError ? friendlyError(loadError, t) : undefined,
                        action: h(Button, { size: 'sm', onClick: refresh }, t('retry')),
                      })
                      : records.length === 0
                        ? h(EmptyState, {
                          title: t('list.empty'),
                          hint: t('list.emptyHint'),
                          action: h(
                            Button,
                            {
                              variant: 'primary',
                              size: 'sm',
                              onClick: () => setNewOpen(true),
                              icon: h(IconPlus, { size: 15 }),
                            },
                            t('new'),
                          ),
                        })
                        : h(EmptyState, { title: t('list.noMatches') })
                  : h(
                    'ul',
                    { className: 'ac-list-rows' },
                    filtered.map((record) => h(TaskRow, {
                      key: record.id,
                      record,
                      selected: selected.has(record.id),
                      t,
                      sessions,
                      workspaces,
                      now,
                      onToggle: () => toggleSelected(record.id),
                      onOpen: () => setSelectedTaskId(record.id),
                    })),
                  ),
              ),
            ),
          ),
          selectedRecords.length > 0
            ? h(
              'div',
              { className: 'ac-batch-bar' },
              h('span', { className: 'ac-batch-count' }, t('selected', { count: String(selectedRecords.length) })),
              h(Button, { size: 'sm', variant: 'ghost', onClick: clearSelection }, t('select.none')),
              h('div', { className: 'ac-filter-spacer' }),
              h(
                Button,
                {
                  size: 'sm',
                  variant: 'danger',
                  onClick: requestDeleteSelected,
                  icon: h(IconTrash, { size: 15 }),
                },
                t('delete.selected'),
              ),
            )
            : null,
        ),
        selectedTask
          ? h(TaskDetailPane, {
            key: selectedTask.id,
            record: selectedTask,
            t,
            rpc,
            sessions,
            workspaces,
            now,
            onClose: () => setSelectedTaskId(null),
            onDelete: requestDelete,
            onOpenSession: openSession,
            onRefresh: loadCatalog,
            onNotify: setNotice,
          })
          : null,
        confirm
          ? h(ConfirmDeleteDialog, {
            t,
            targets: confirm.targets,
            sessions,
            workspaces,
            busy: deleting,
            progress,
            onCancel: closeConfirm,
            onConfirm: () => void performDelete(),
          })
          : null,
        newOpen
          ? h(NewTaskDialog, {
            t,
            sessionsStore,
            workspacesStore,
            onSubmit: createTask,
            onClose: () => setNewOpen(false),
            onCreated,
          })
          : null,
      );
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { en: EN, zh: ZH }), 'automation-console: dictionaries');
      const t = ctx.locale.bind(NS);

      const rpc = async (endpoint, args) => {
        try {
          return await ctx.connection.rpc.call('/api', endpoint, { args });
        } catch (error) {
          return {
            ok: false,
            error: {
              code: 'transport',
              message: error instanceof Error ? error.message : String(error),
              details: {},
            },
          };
        }
      };

      const createTask = async (payload) => {
        const result = await rpc('schedule/createManaged', payload);
        return result.ok
          ? { ok: true, value: result.value }
          : { ok: false, error: result.error };
      };

      const subscribeChanged = (listener) => {
        try {
          return ctx.remote?.$on('schedule/changed', listener) ?? (() => {});
        } catch (error) {
          console.warn('[automation-console] could not subscribe to schedule changes:', error);
          return () => {};
        }
      };

      if (ctx.sessions === undefined || ctx.workspaces === undefined || ctx.uiWorkspace === undefined) {
        console.warn('[automation-console] one or more Client services are unavailable');
      }

      // The bundle patch normally disables the shipped ui-schedule row. The
      // delayed install is a second safety net: it also avoids registering
      // the original `schedules` key while any remaining Web-boot activation
      // is still in progress.
      let disposers = [];
      let installTimer;

      const installPanel = () => {
        if (disposers.length > 0) return;
        let mainDispose;
        let sidebarDispose;
        try {
          mainDispose = ctx.slots.inject('main', () => ctx.slots.register({
            name: 'main',
            key: PANEL_ID,
            locale: NS,
            inject: () => ({
              t,
              rpc,
              createTask,
              openSession: (sessionId) => ctx.uiWorkspace.openSession(sessionId),
              sessionsStore: ctx.sessions.list,
              workspacesStore: ctx.workspaces.list,
              subscribeChanged,
            }),
          }, ScheduleManagerPage));
          sidebarDispose = ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
            name: 'sidebar.panellist',
            id: PANEL_ID,
            order: 10,
            locale: NS,
            label: () => t('panel'),
          }, ({ size }) => h(ClockMark, { size: size || 18 })));
          disposers = [mainDispose, sidebarDispose];
        } catch (error) {
          mainDispose?.();
          sidebarDispose?.();
          disposers = [];
          console.error('[automation-console] could not install the page:', error);
        }
      };

      const scheduleInstall = () => {
        if (disposers.length > 0) return;
        if (installTimer !== undefined) clearTimeout(installTimer);
        installTimer = setTimeout(() => {
          installTimer = undefined;
          installPanel();
        }, 100);
      };

      const offReset = ctx.on('connection/reset', scheduleInstall);
      installTimer = setTimeout(installPanel, 100);

      ctx.effect(() => () => {
        offReset();
        if (installTimer !== undefined) clearTimeout(installTimer);
        for (const dispose of disposers.reverse()) dispose?.();
        disposers = [];
      }, 'automation-console: deferred page');
    }

    const STYLES = `
      .ac-page{width:100%;min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-size:14px;line-height:1.6;display:flex;overflow:hidden;position:relative}
      .ac-list-pane{flex-direction:column;flex:1;min-width:0;min-height:0;display:flex}
      .ac-page-scroll{scrollbar-gutter:stable;--dsh-scrollbar-width:9px;--dsh-scrollbar-thumb-border:2px;flex:1;min-height:0;overflow:auto}
      .ac-page-content{max-width:960px;margin:0 auto;padding:0 clamp(24px,4vw,48px) 48px}
      .ac-page-heading{flex-wrap:nowrap;justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px;padding-top:28px;display:flex}
      [data-platform=darwin] .ac-page-heading{padding-top:calc(28px + var(--dsh-frame-top-clearance,0px))}
      .ac-heading-lead{flex:1 1 auto;min-width:0;align-items:center;gap:12px;display:flex}
      .ac-page-heading h1{flex:0 auto;min-width:0;max-width:100%;margin:0;font-size:20px;font-weight:500;line-height:28px}
      .ac-heading-actions{white-space:nowrap;flex:none;align-items:center;gap:4px;display:flex}
      .ac-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;font:inherit;cursor:pointer;border:0;background:0 0;color:var(--dsw-alias-label-primary);border-radius:16px;transition:background .15s,color .15s,opacity .15s}
      .ac-btn:disabled{opacity:.4;cursor:default}
      .ac-btn-sm{height:32px;padding:0 12px;font-size:13px;line-height:20px}
      .ac-btn-primary{background:var(--dsw-alias-state-business-primary,var(--dsw-alias-brand-primary));color:#fff}
      .ac-btn-primary:hover:not(:disabled){opacity:.9}
      .ac-btn-ghost{color:var(--dsw-alias-label-tertiary)}
      .ac-btn-ghost:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
      .ac-btn-danger{background:var(--dsw-alias-state-error-primary);color:#fff}
      .ac-btn-danger:hover:not(:disabled){opacity:.9}
      .ac-icon-btn{width:28px;height:28px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:8px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}
      .ac-icon-btn:hover:not(:disabled){color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover)}
      .ac-icon-btn:disabled{opacity:.35;cursor:default}
      .ac-icon-btn-danger:hover:not(:disabled){color:var(--dsw-alias-state-error-primary)}
      .ac-filters{flex-wrap:wrap;align-items:center;gap:8px 12px;margin-bottom:14px;display:flex}
      .ac-filter-tabs{flex-wrap:wrap;align-items:center;gap:8px 12px;display:flex}
      .ac-filter-tab{height:28px;color:var(--dsw-alias-label-tertiary);font:inherit;white-space:nowrap;cursor:pointer;background:0 0;border:0;border-radius:14px;flex:none;align-items:center;padding:0 10px;font-size:14px;line-height:22px;display:inline-flex}
      .ac-filter-tab:hover{background:var(--dsw-alias-interactive-bg-hover)}
      .ac-filter-tab.is-selected{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
      .ac-filter-count{font-variant-numeric:tabular-nums}
      .ac-filter-count-active{color:var(--dsw-alias-state-business-primary)}
      .ac-filter-count-inactive{color:var(--dsw-alias-state-error-primary)}
      .ac-filter-spacer{flex:1}
      .ac-search-field{border:.5px solid var(--dsw-alias-border-l3);height:36px;color:var(--dsw-alias-label-tertiary);border-radius:12px;align-items:center;margin:0 0 16px;padding:0 10px;transition:border-color .15s;display:flex;gap:8px}
      .ac-search-field:hover{border-color:var(--dsw-alias-border-l2)}
      .ac-search-field:focus-within{border-color:var(--dsw-alias-state-business-primary)}
      .ac-search-field input{border:0;background:0 0;color:var(--dsw-alias-label-primary);flex:1;min-width:0;height:100%;padding:0;font:inherit;outline:none}
      .ac-search-field input::placeholder{color:var(--dsw-alias-label-caption)}
      .ac-search-clear{width:24px;height:24px;margin-right:-4px}
      .ac-list{display:block}
      .ac-list-rows{flex-direction:column;gap:2px;margin:0;padding:0;list-style:none;display:flex}
      .ac-row{border-radius:12px;align-items:flex-start;gap:8px;width:100%;padding:8px;display:flex}
      .ac-row:hover{background:var(--dsw-alias-interactive-bg-hover)}
      .ac-row-selected{background:var(--dsw-alias-interactive-bg-hover)}
      .ac-row-check{width:16px;height:16px;margin:7px 0 0;accent-color:var(--dsw-alias-state-business-primary);flex:none;cursor:pointer}
      .ac-row-open{border:0;background:0 0;color:inherit;text-align:left;white-space:normal;cursor:pointer;flex:1;min-width:0;align-items:flex-start;gap:12px;padding:0;font:inherit;display:flex}
      .ac-row-glyph{width:16px;height:20px;color:var(--dsw-alias-label-tertiary);flex:none;margin-top:2px;display:inline-flex;align-items:center}
      .ac-row-content{flex-direction:column;flex:1;min-width:0;display:flex}
      .ac-row-title{text-overflow:ellipsis;white-space:nowrap;font-weight:500;line-height:23px;overflow:hidden}
      .ac-row-summary{color:var(--dsw-alias-label-tertiary);overflow-wrap:anywhere;margin-top:2px;font-size:13px;line-height:21px;display:block}
      .ac-row-meta{display:inline}
      .ac-row-meta+.ac-row-meta:before{content:" · ";padding:0 2px}
      .ac-row-meta-session{overflow-wrap:anywhere}
      .ac-row-status{color:var(--dsw-alias-label-tertiary);flex:none;margin-top:1px;font-size:13px;line-height:23px}
      .ac-row-ended .ac-row-title,.ac-row-ended .ac-row-status{color:var(--dsw-alias-label-tertiary)}
      .ac-row-ended .ac-row-summary{color:var(--dsw-alias-label-caption)}
      .ac-notice{background:var(--dsw-specific-sidebar-fill);color:var(--dsw-alias-label-secondary);border-radius:10px;flex-wrap:wrap;align-items:flex-start;gap:9px;margin:0 0 20px;padding:12px 14px;font-size:12px;line-height:20px;display:flex}
      .ac-notice p{flex:1;margin:0;min-width:0;overflow-wrap:anywhere}
      .ac-notice-close{width:24px;height:24px;margin:-2px -4px 0 0;color:inherit}
      .ac-notice-inline{flex:0 1 auto;min-width:0;max-width:100%;height:28px;margin:0;padding:0 3px 0 10px;border-radius:14px;flex-wrap:nowrap;align-items:center;gap:7px}
      .ac-notice-inline p{flex:0 1 auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:20px}
      .ac-notice-inline .ac-notice-close{width:22px;height:22px;margin:0;flex:none}
      .ac-notice-success{color:var(--dsw-alias-state-success-primary)}
      .ac-notice-warning{color:var(--dsw-alias-state-warn-primary)}
      .ac-notice-error{color:var(--dsw-alias-state-error-primary)}
      .ac-empty{text-align:center;color:var(--dsw-alias-label-tertiary);flex-direction:column;align-items:center;padding:48px 20px;font-size:14px;display:flex}
      .ac-empty h2{margin:0 0 8px;color:var(--dsw-alias-label-tertiary);font-size:14px;font-weight:400;line-height:1.6}
      .ac-empty p{margin:0 0 16px;line-height:1.6}
      .ac-empty .ac-btn{margin-top:2px}
      .ac-empty-glyph{color:var(--dsw-alias-label-caption);margin-bottom:12px}
      .ac-batch-bar{display:flex;align-items:center;gap:8px;padding:10px clamp(24px,4vw,48px);border-top:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);flex:none}
      .ac-batch-count{font-size:13px;font-weight:500}
      .ac-detail{--detail-gutter:24px;border-left:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-base);flex-direction:column;flex:0 0 47%;min-width:0;min-height:0;display:flex;position:relative}
      .ac-detail:focus-visible{outline:none}
      .ac-detail-tabs-bar{height:44px;min-height:44px;padding:0 var(--detail-gutter);border-bottom:.5px solid var(--dsw-alias-border-l3);flex-shrink:0;justify-content:space-between;align-items:center;gap:20px;display:flex}
      .ac-detail-tabs{scrollbar-width:none;flex:auto;align-self:flex-end;gap:36px;min-width:0;margin-bottom:-1px;padding-bottom:1px;display:flex;overflow-x:auto}
      .ac-detail-tabs::-webkit-scrollbar{display:none}
      .ac-detail-tab{color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;flex:none;padding:0 0 13px;font-size:13px;font-weight:500;line-height:16px;position:relative}
      .ac-detail-tab:after{content:"";background:0 0;border-radius:2px;height:2px;position:absolute;bottom:-1px;left:0;right:0}
      .ac-detail-tab[aria-selected=true]{color:var(--dsw-alias-state-business-primary)}
      .ac-detail-tab[aria-selected=true]:after{background:var(--dsw-alias-state-business-primary)}
      .ac-detail-actions{flex:none;align-items:center;gap:0;display:flex}
      .ac-detail-scroll{min-height:0;padding:24px var(--detail-gutter) 28px;scrollbar-gutter:stable;--dsh-scrollbar-width:9px;--dsh-scrollbar-thumb-border:2px;flex:1;overflow:auto}
      .ac-detail-name{overflow-wrap:anywhere;margin:0;font-size:20px;font-weight:500;line-height:28px}
      .ac-detail-name-input{box-sizing:border-box;width:100%;min-height:36px;margin:0;padding:2px 0;border:0;border-bottom:.5px solid transparent;background:0 0;color:var(--dsw-alias-label-primary);font:inherit;font-size:20px;font-weight:500;line-height:28px;outline:none}
      .ac-detail-name-input:hover:not(:disabled){border-bottom-color:var(--dsw-alias-border-l3)}
      .ac-detail-name-input:focus{border-bottom-color:var(--dsw-alias-state-business-primary)}
      .ac-detail-name-input:disabled{color:var(--dsw-alias-label-tertiary)}
      .ac-edit-section{margin-top:18px}
      .ac-edit-section h3{color:var(--dsw-alias-label-tertiary);margin:0 0 8px 10px;font-size:13px;font-weight:400;line-height:20px}
      .ac-edit-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:10px}
      .ac-timing-edit{margin-top:2px}
      .ac-readonly-note{color:var(--dsw-alias-label-tertiary);margin:10px 10px 0;font-size:12px;line-height:1.5}
      .ac-detail-meta{display:flex;flex-direction:column;margin-top:20px;border:.5px solid var(--dsw-alias-border-l3);border-radius:16px;padding:0 12px}
      .ac-meta-row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:44px;border-bottom:.5px solid var(--dsw-alias-border-l3)}
      .ac-detail-meta>.ac-meta-row:last-child{border-bottom:0}
      .ac-meta-label{color:var(--dsw-alias-label-secondary);flex:none;font-size:13px}
      .ac-meta-value{color:var(--dsw-alias-label-primary);text-align:right;overflow-wrap:anywhere;font-size:13px}
      .ac-meta-value.ac-mono{color:var(--dsw-alias-label-tertiary);font-size:11px;overflow:hidden;text-overflow:ellipsis}
      .ac-instruction-edit{margin-top:2px;background:var(--dsw-alias-bg-base)}
      .ac-detail-next{color:var(--dsw-alias-label-tertiary);align-items:center;gap:6px;margin:4px 0 20px;font-size:13px;line-height:20px;display:flex}
      .ac-rule-card{margin-top:20px}
      .ac-rule-card h3,.ac-instruction h3{color:var(--dsw-alias-label-tertiary);margin:0 0 8px 10px;font-size:13px;font-weight:400;line-height:20px}
      .ac-rule-rows{border:.5px solid var(--dsw-alias-border-l3);border-radius:16px;flex-direction:column;padding:0 12px;display:flex}
      .ac-rule-row{border-bottom:.5px solid var(--dsw-alias-border-l3);min-height:48px;justify-content:space-between;align-items:center;gap:12px;display:flex}
      .ac-rule-rows>:last-child{border-bottom:0}
      .ac-rule-label{color:var(--dsw-alias-label-primary);flex:none;font-size:14px;line-height:1.6}
      .ac-rule-value{color:var(--dsw-alias-label-primary);text-align:right;overflow-wrap:anywhere;font-size:14px;line-height:1.6}
      .ac-rule-value.ac-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;color:var(--dsw-alias-label-tertiary);overflow:hidden;text-overflow:ellipsis}
      .ac-rule-link{border:0;background:0 0;font:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:4px;padding:4px 0}
      .ac-rule-link:hover:not(:disabled){color:var(--dsw-alias-state-business-primary)}
      .ac-rule-link:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}
      .ac-instruction{margin-top:22px}
      .ac-instruction p{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;font-size:14px;line-height:1.65}
      .ac-save-bar{flex:none;padding:10px var(--detail-gutter);border-top:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1)}
      .ac-save-error{color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:1.5;margin-bottom:8px;overflow-wrap:anywhere}
      .ac-save-line{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
      .ac-save-state{color:var(--dsw-alias-label-tertiary);font-size:12px}
      .ac-save-actions{display:flex;align-items:center;gap:8px;margin-left:auto}
      .ac-history{display:flex;flex-direction:column;gap:10px;min-height:150px}
      .ac-history-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
      .ac-history-item{border:.5px solid var(--dsw-alias-border-l3);border-radius:12px;padding:10px 12px}
      .ac-history-time{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
      .ac-history-prompt{white-space:pre-wrap;overflow-wrap:anywhere;margin:6px 0 0;font-size:13px;line-height:1.5}
      .ac-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
      .ac-spinner{width:14px;height:14px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;display:inline-block;flex:none;animation:ac-spin .8s linear infinite}
      @keyframes ac-spin{to{transform:rotate(360deg)}}
      .ac-modal-backdrop{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.38)}
      .ac-modal{width:100%;max-height:min(88vh,900px);display:flex;flex-direction:column;border:.5px solid var(--dsw-alias-border-l2);border-radius:16px;background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);box-shadow:0 24px 80px rgba(0,0,0,.35);overflow:hidden}
      .ac-modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding:20px 22px 14px;border-bottom:.5px solid var(--dsw-alias-border-l3)}
      .ac-modal-copy{min-width:0}
      .ac-modal-title{margin:0;font-size:18px;line-height:1.35;font-weight:500}
      .ac-modal-desc{margin:5px 0 0;color:var(--dsw-alias-label-tertiary);line-height:1.5;font-size:13px}
      .ac-modal-close{flex:none}
      .ac-modal-body{padding:16px 22px 20px;overflow:auto;min-height:0}
      .ac-modal-foot{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 22px;border-top:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-1);flex-wrap:wrap}
      .ac-modal-actions{display:flex;align-items:center;gap:8px;margin-left:auto}
      .ac-form-stack{display:flex;flex-direction:column;gap:12px;margin-bottom:18px}
      .ac-form-section{border-top:.5px solid var(--dsw-alias-border-l3);padding-top:16px;margin-top:16px}
      .ac-form-section-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
      .ac-form-section-title{margin:0 0 8px;font-size:14px;font-weight:500}
      .ac-selected-count{color:var(--dsw-alias-label-tertiary);font-size:12px}
      .ac-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      .ac-field{display:flex;flex-direction:column;gap:5px;min-width:0}
      .ac-field-label{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500}
      .ac-field-hint{color:var(--dsw-alias-label-tertiary);font-size:11.5px;line-height:1.45;margin:7px 0 0}
      .ac-input{box-sizing:border-box;width:100%;min-height:36px;padding:7px 10px;border:.5px solid var(--dsw-alias-border-l3);border-radius:10px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;outline:none}
      .ac-input:focus{border-color:var(--dsw-alias-state-business-primary)}
      .ac-input::placeholder{color:var(--dsw-alias-label-caption)}
      .ac-input-compact{width:auto;flex:1;min-width:80px}
      .ac-select{width:auto}
      .ac-textarea{resize:vertical;min-height:76px;line-height:1.5}
      .ac-input-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
      .ac-inline{display:flex;gap:7px;align-items:center;flex-wrap:wrap}
      .ac-check-row{display:inline-flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary);font-size:12px;white-space:nowrap;cursor:pointer}
      .ac-check-row input{width:15px;height:15px;margin:0;accent-color:var(--dsw-alias-state-business-primary);cursor:pointer}
      .ac-auto-clean{display:flex;align-items:flex-start;gap:8px;cursor:pointer;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.5}
      .ac-auto-clean input{width:15px;height:15px;margin:3px 0 0;accent-color:var(--dsw-alias-state-business-primary);flex:none;cursor:pointer}
      .ac-auto-clean-copy{display:flex;flex-direction:column;gap:2px;min-width:0}
      .ac-auto-clean-copy strong{color:var(--dsw-alias-label-primary);font-weight:500}
      .ac-auto-clean-copy .ac-field-hint{margin:0}
      .ac-choice-row{display:flex;flex-wrap:wrap;gap:4px 8px;margin:2px 0 4px}
      .ac-choice{height:28px;color:var(--dsw-alias-label-tertiary);font:inherit;white-space:nowrap;cursor:pointer;background:0 0;border:0;border-radius:14px;flex:none;align-items:center;padding:0 10px;font-size:14px;line-height:22px;display:inline-flex}
      .ac-choice:hover{background:var(--dsw-alias-interactive-bg-hover)}
      .ac-choice.is-selected{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
      .ac-timing-fields{margin-top:11px}
      .ac-weekdays{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px}
      .ac-weekday{min-width:34px;height:32px;border:.5px solid var(--dsw-alias-border-l3);border-radius:16px;background:0 0;color:var(--dsw-alias-label-tertiary);font:inherit;font-size:12px;cursor:pointer}
      .ac-weekday.is-selected{border-color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-state-business-primary);font-weight:500}
      .ac-session-toolbar{display:flex;align-items:center;gap:4px;margin:2px 0 8px;flex-wrap:wrap}
      .ac-session-search{display:flex;align-items:center;gap:7px;flex:1;min-width:180px;border:.5px solid var(--dsw-alias-border-l3);border-radius:10px;padding:0 8px;height:32px;color:var(--dsw-alias-label-tertiary)}
      .ac-session-search-input{border:0;background:0 0;color:var(--dsw-alias-label-primary);flex:1;min-width:0;height:100%;padding:0;font:inherit;outline:none}
      .ac-session-search-input::placeholder{color:var(--dsw-alias-label-caption)}
      .ac-session-list{max-height:212px;overflow:auto;border:.5px solid var(--dsw-alias-border-l3);border-radius:12px;background:var(--dsw-alias-bg-base)}
      .ac-session-option{display:flex;align-items:flex-start;gap:8px;width:100%;padding:8px 10px;border-bottom:.5px solid var(--dsw-alias-border-l3);cursor:pointer}
      .ac-session-option:last-child{border-bottom:0}
      .ac-session-option:hover{background:var(--dsw-alias-interactive-bg-hover)}
      .ac-session-option.is-selected{background:var(--dsw-alias-interactive-bg-hover)}
      .ac-session-check{width:15px;height:15px;margin:4px 0 0;accent-color:var(--dsw-alias-state-business-primary);flex:none}
      .ac-session-option-copy{display:flex;flex-direction:column;gap:1px;min-width:0}
      .ac-session-option-title{font-size:13px;line-height:20px;overflow-wrap:anywhere}
      .ac-session-option-cwd{font-size:10.5px;color:var(--dsw-alias-label-tertiary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .ac-session-empty{padding:16px 12px;color:var(--dsw-alias-label-tertiary);line-height:1.5;font-size:12px;text-align:center}
      .ac-session-more{padding:8px 10px;color:var(--dsw-alias-label-tertiary);font-size:11.5px;line-height:1.4;border-top:.5px solid var(--dsw-alias-border-l3)}
      .ac-preview{display:flex;align-items:baseline;gap:8px;min-width:0;color:var(--dsw-alias-label-tertiary);font-size:12px}
      .ac-preview-label{flex:none;font-weight:500;text-transform:uppercase;letter-spacing:.04em;font-size:10px}
      .ac-form-error{display:flex;align-items:flex-start;gap:7px;margin-bottom:13px;padding:9px 10px;border:.5px solid var(--dsw-alias-state-error-primary);border-radius:10px;color:var(--dsw-alias-state-error-primary);background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent);line-height:1.45}
      .ac-confirm-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
      .ac-confirm-list li{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:8px 2px;border-bottom:.5px solid var(--dsw-alias-border-l3);line-height:1.4}
      .ac-confirm-list li:last-child{border-bottom:0}
      .ac-confirm-session{color:var(--dsw-alias-label-tertiary);font-size:12px;text-align:right;overflow-wrap:anywhere}
      .ac-confirm-more{color:var(--dsw-alias-label-tertiary);font-size:12px}
      .ac-confirm-progress{display:flex;align-items:center;gap:7px;color:var(--dsw-alias-label-tertiary);font-size:12px}
      @media (max-width:900px){
        .ac-detail{position:absolute;inset:0;z-index:2;flex-basis:auto;border-left:0}
        .ac-page-content{padding:0 20px 40px}
        .ac-form-grid{grid-template-columns:1fr}
        .ac-edit-grid{grid-template-columns:1fr}
      }
      @media (max-width:620px){
        .ac-page-content{padding:0 14px 32px}
        .ac-page-heading{flex-wrap:wrap;padding-top:18px}
        .ac-heading-lead{flex:1 1 100%}
        .ac-heading-actions{width:100%;justify-content:flex-end}
        .ac-batch-bar{padding-left:14px;padding-right:14px}
        .ac-modal-backdrop{padding:10px}
        .ac-modal{max-height:94vh}
        .ac-modal-head,.ac-modal-body,.ac-modal-foot{padding-left:15px;padding-right:15px}
        .ac-preview{width:100%}
        .ac-detail{--detail-gutter:16px}
      }
    `;

    return { inject, apply };
  },
});
