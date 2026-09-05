---
title: A2UI 实验
description: 使用官方 A2UI web_core 将 Agent 消息渲染为 ak-ui 界面
---

<script setup>
import A2uiDemo from '../.vitepress/theme/components/a2ui/A2uiDemo.vue'
</script>

# A2UI 实验

这个实验探索运行时生成界面：Agent 输出组件与数据，客户端用 ak-ui 渲染，并将用户操作回传。现有 [AI Skill](/guide/ai-skill) 继续负责开发时生成和审查代码。

<ClientOnly><A2uiDemo /></ClientOnly>

修改指挥代号，再点击「执行部署」：输入通过数据绑定写回客户端模型，按钮回传当前代号，本地模拟 Agent 返回进度、状态和按钮文字更新。也可以清空界面，逐条接收三条初始化消息，观察增量渲染。

## 实验边界

- 协议固定为 **A2UI v0.9.1**，使用 `@a2ui/web_core@0.10.7` 的 `v0_9` 入口。SDK 版本与协议版本不同。
- 这是本地确定性模拟，不连接模型、不需要 API Key，也不执行真实部署。
- 自定义目录标识为 `https://ak-ui.yyj.moe/a2ui/experimental/v1`，它是标识符，不是可下载的目录地址。不要向 Agent 宣称支持完整 basic catalog。
- 支持 `Column`、`Row`、`Card`、纯文本 `Text`、单行 `TextField`、`Button` 和自定义 `AkProgress`。属性以 `examples/a2ui/catalog.mjs` 为准；不接受任意 HTML、CSS、脚本或函数调用。
- 官方 `MessageProcessor`、`NodeResolver` 处理消息、组件树和数据绑定；Vue 映射层消费已解析节点。错误显示在实验区，未知组件不执行。
- 此实验不承诺完整协议一致性，不包含网络传输、认证、持久化、复杂表单和跨框架 renderer；不纳入 ak-ui 1.0 稳定接口。
- 所有新增依赖仅供开发和文档使用，npm CSS 包继续没有运行时依赖。实验只在本页面加载。

## 源码与下一步

`examples/a2ui/` 包含目录、消息样例和独立会话；文档主题的 `components/a2ui/` 提供 Vue 渲染和演示控制。消费项目应先交换 `session.processor.getClientCapabilities({ includeInlineCatalogs: true })`，让 Agent 只生成实际支持的组件。

真实接入时，用 Agent 的消息替换本地 `respondToAction`：传输层逐条解析消息并交给 `session.receive`，将 `onAction` 回传后端。当前输入只回传 action 中显式声明的 context。生产接入还需明确消息大小和数量限制、断线恢复、取消及服务端操作授权，并补充对应测试。

先用这个闭环验证真实需求；有实际消费项目后，再决定是否抽出可选适配包。

参考：[A2UI 版本与概念](https://a2ui.org/)、[官方 Renderer 指南](https://a2ui.org/guides/renderer-development/)。
