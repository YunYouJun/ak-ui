# ak-ui 重启宣传草稿

用于正式发布或 Preview 上线后的 X 宣传。发布前需要根据实际 npm 版本和线上地址完成文末检查。

## 单条版本

六年前做的 ak-ui，被我重新捡起来了。

这次没有简单升级依赖：VuePress → VitePress、重做明日方舟风格作品站、统一 HTML 示例与 Playwright、接入 Cloudflare Pages，并用 shadcn-vue Registry 提供可复制的 Vue Adapter。

CSS Core 仍然零运行时。

https://ak-ui.yyj.moe

## Thread 版本

### 1 / 6

六年前做的 ak-ui，被我重新捡起来了。

它最初只是一些明日方舟风格的 SCSS 练习。2026 年重新打开仓库时，视觉还在，但文档、部署和使用方式已经停在上一代生态。

所以我决定让它真正“复活”。

配图：新首页桌面全景，优先使用深色模式。

### 2 / 6

第一步不是继续堆组件，而是重做项目的反馈循环：

- VuePress → VitePress
- ak-ui 专属明暗主题
- Cloudflare Pages Git 部署
- GitHub Actions 只负责 lint / build / test

现在每次修改都能被稳定预览和验证。

配图：首页亮色与暗色对比。

### 3 / 6

所有示例现在都是框架无关的 `examples/*.html`。

同一份文件同时用于：

1. 文档中的真实渲染
2. 页面上的源码展示
3. Playwright 截图与交互测试

不再维护三套容易漂移的 Demo。

配图：DemoPreview 的预览与源码区域。

### 4 / 6

CSS Core 继续保持零运行时；Vue 用户则可以通过 shadcn-vue Registry 把 Adapter 源码直接复制进项目。

按钮、卡片、Input Number，以及新的 Status、Progress、Notice、Tabs 都有可编辑 Vue 源码。

配图：Vue Registry 交互区域。

### 5 / 6

这轮还补了一组更偏“终端状态”的视觉语汇：

- Status / Tag
- Progress / Gauge
- Notice / Alert
- Tabs / Segmented

下一步会继续做 Operation Card、Stage Node 和 Operator Card，而不是变成另一套普通通用组件库。

配图：四个新组件拼图。

### 6 / 6

这是一次非官方的界面研究，也是一份关于“如何重启休眠项目”的实践记录。

网站：https://ak-ui.yyj.moe
源码：https://github.com/YunYouJun/ak-ui

如果你也有一个沉睡多年的个人项目，希望这次复活过程能给你一点继续做下去的动力。

## 发布前检查

- [ ] npm 新版本已经发布，README 与站点安装命令可用。
- [ ] `https://ak-ui.pages.dev` 与 `https://ak-ui.yyj.moe` 均返回 200。
- [ ] `/registry/` 以及 7 个 `/r/*.json` 均已在线。
- [ ] GitHub Actions 最新一次 CI 全绿。
- [ ] 使用 CI Artifact 中的截图制作四图拼图，不把宣传图提交进仓库。
- [ ] 核对首页模块数量、Registry 条目数量和宣传文案一致。
- [ ] 保留“非官方项目”说明，避免产生授权误解。
