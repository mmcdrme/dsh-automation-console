# 自动化任务(原版增强) / Automation Console

一个 DSH（DeepSeek Harness）Web 客户端插件：在原版「自动化任务」页面上做增强，加入**免对话创建**、**多会话绑定**和**批量删除**。

> A DSH web client plugin that enhances the built-in Automation tasks page with in-place creation (no chat required), multi-conversation binding, and bulk deletion.

## 功能

- **免对话创建**：不用先进入一段对话，直接在面板里新建自动化任务。
- **多会话绑定**：一个任务可绑定多个会话。
- **批量删除**：多选后一次删除。
- **搜索与空态引导**：任务列表支持搜索，无任务时给出创建提示。
- 中英双语界面（`locale/zh.json`、`locale/en.json`）。

## 结构

```
index.js           插件服务端入口
client.js          Web 客户端面板实现（`main/schedules` 页面）
cordis.patch.yml   捆绑补丁：禁用原版 ui-schedule，插入本插件
locale/{zh,en}.json 文案
icon.svg           侧栏图标
```

## 安装

1. 把本目录放进某个 DSH profile 的 `node_modules`，包名为 `@local/dsh-automation-console`（或在 profile 的 `package.json` 里作为本地依赖引用）。
2. 在 profile 的 `cordis.patch.yml` 里应用 `cordis.patch.yml` 中的两条补丁：先禁用原版 `ui-schedule`，再插入本插件（两者注册的都是 `main/schedules`，不能同时启用）。
3. 刷新 Web 界面。

## 说明

- `package.json` 中 `"private": true`，本包不发布到 npm，仅作本地插件使用。
- 插件依赖 DSH 的客户端注入项：connection、locale、ui-layout、ui-sidebar、ui-workspace、api-session-controller、api-workspace-controller。
