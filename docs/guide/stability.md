---
title: 1.0 稳定性与发布检查
description: ak-ui 1.0 的稳定接口范围、兼容性规则和正式发布前的检查项
---

# 1.0 稳定性与发布检查

ak-ui 的 1.0 目标是可长期消费的 CSS 与设计 Token 基础。版本号代表接口兼容性承诺，不要求覆盖所有框架、所有组件或完整 A2UI 协议。本页对应 **1.0.0** 正式版。

## 1.x 稳定接口

| 接口 | 兼容性承诺 |
| --- | --- |
| `package.json` 中的 CSS、Token、Sass 导出路径 | 1.x 保留路径与用途；Sass 支持公开入口，内部 partial 文件不作直接导入承诺 |
| 文档记录的 `.ak-*` 类名与所需 HTML 结构 | 1.x 保留名称、用途和状态语义；以组件文档为准，不依赖示例页面私有布局 |
| `tokens.css` 的全部 `--ak-*` Token 与组件文档记录的变量 | 保留名称、取值类型和语义；Token-only 不添加元素重置或组件规则 |
| `@yunyoujun/ak-ui/depth` | 保留声明的函数、选项、返回控制器及清理行为 |
| 已发布的 Vue Registry 条目 | 保留条目名和文档声明的属性、插槽、事件；复制到消费项目的源码由消费方维护，升级不会自动覆盖 |

移除或改名、改变变量类型/含义、使现有文档示例失效的结构调整属于 major。向后兼容的新组件/Token 属于 minor；缺陷、无障碍和对比度修复属于 patch。视觉修复可能改变像素，应在发布说明中明确影响；不承诺截图永远一致。

Skill 保持公开安装入口，但提示词与建议随工作流改进，不承诺模型输出完全一致。文档主题、演示素材、内部脚本及 [A2UI 实验](/guide/a2ui) 不属于上述稳定接口。A2UI 的协议/目录独立版本化，实验变动无需把 CSS Core 升至 2.0。

## 浏览器与无障碍边界

构建目标使用仓库的 Browserslist 配置。自动化测试覆盖 Chromium、Firefox 和 Playwright WebKit，包括桌面/移动布局、原生 Dialog、Popover、焦点和键盘交互。仅 Chromium 做首页像素基准比较。WebKit 引擎验证不能等同于 Safari 应用、真机 iOS 或所有系统版本的验证；不支持 IE。CSS Anchor Positioning 是渐进增强，不支持时使用居中降级。

CSS 提供视觉状态；原生元素、Registry 或消费项目的 headless primitives 负责语义与行为。1.0 不宣称全库通过 WCAG 认证。消费方需保留标签、焦点可见性、禁用状态、降低动效和可操作目标尺寸。

## 发布前收尾

- [x] 明确稳定接口范围；以 218 个 CSS 类名、63 个 Token、导出路径和 Registry 条目建立兼容性基准，核对文档变量。
- [x] 完整运行 `pnpm test`，依赖审计、文档构建、Token 契约、npm 包消费、Registry、A2UI 和 Linux 视觉回归全部通过。
- [x] 将跨引擎页面与键盘验收纳入持续测试；如消费方目标包含真机 iOS，需追加设备验收。
- [x] 增加实际 tarball 安装、Sass 编译、导出消费和 Registry 安装后类型检查；真实业务项目反馈通过 RC 收集。
- [x] 审查现有品牌图标、主题与明暗界面；首页像素基准固定使用 Linux 本地回退字体，避免远程字体造成随机换行。
- [x] 将包版本和 Registry 固定依赖同步为 1.0.0。
- [x] 更新中英文 README、CHANGELOG、Registry API 与 [0.2.x → 1.0 迁移指南](/guide/migration-v1)。
- [ ] 将最终改动合入 master，确认将要打 tag 的同一 commit 已通过远程 CI。
- [ ] 确认正式发布后创建对应 tag；由现有工作流完成 npm Trusted Publishing 和 GitHub Release。

1.0.0 正式版发布到 npm 的 `latest` 标签，`next` 保留给预发布版本。公开 Registry 站点与 npm 包需要协调发布：**不得把候选 Registry 部署到正式站点后长期等待 npm 发布**。现有站点会跟随 master 部署，发布操作者应在合入前安排部署暂停/发布窗口，或将候选文档保留在预览站；包发布成功后再启用对应 Registry。此处不自动修改外部部署设置。

## 自动验证范围

`typecheck` 检查 Vue Registry、边界用例和 A2UI Vue 层的类型；`tokens:verify` 检查 Token-only 隔离性和 63 个 Token；`api:verify` 检查 218 个类名、导出、Registry 版本及文档变量；`runtime:verify` 检查 depth 生命周期；`package:verify` 验证实际 tarball 的导出、Sass、SSR 导入和零运行时依赖；`registry:verify` 检查独立消费项目安装和类型。A2UI 测试验证本地模拟闭环，不替代真实 Agent / 网络集成测试。

## 候选验收记录

2026-09-06 完整 `pnpm test` 通过：依赖审计零已知漏洞，样式检查、Vue 与文档主题类型、文档构建、63 个 Token、218 个类名、包导出与实际 tarball 消费、8 个 Registry 条目及 16 份适配器源码安装检查均通过。depth 2 项与 A2UI 3 项单元测试通过；固定 Playwright 1.62.1 Linux 环境的 Chromium、Firefox、WebKit 共 87 项浏览器测试通过，其中 15 项覆盖中英文、明暗配色、语言切换与 404 返回入口。

首页像素比较使用固定 Linux 镜像的本地回退字体，不依赖 Google Fonts 网络可用性；桌面和移动端各三次采集得到一致文件后更新基准。站点仍保留原有网络字体配置，其他交互测试不拦截字体。此记录是本地候选验收，不能替代最终提交的远程 CI 与真实消费项目反馈。

当次验收构建的 50 个 HTML 页面共 2,384 个本地链接、资源与锚点检查通过。Cloudflare 预览站的新增页面返回 200；中英文不存在的地址返回 404，并提供对应语言的恢复入口。当时英文文档覆盖首页与核心接入，详细组件和 API 参考仍以中文为准。


## 版本迁移

旧项目接入请先查看[升级到 1.0](./migration-v1)，发布检查与升级步骤分别维护。
