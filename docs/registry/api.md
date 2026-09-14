---
title: Vue Registry API
description: 1.x 的 Vue 组件属性、插槽、模型与边界行为
---

# Vue Registry API

Registry 为 Vue 3.5+ 提供可复制源码。下表描述 1.x 的公开接口；各组件根元素继续透传原生属性与事件，例如按钮的 `disabled`、`type`、`@click`。组件内部使用同一份 CSS Core，不重复定义样式。

## 基础组件

| 组件 | 属性（默认值） | 插槽 |
| --- | --- | --- |
| `AkButton` | `block: boolean`（false）；`variant`（default）：default / outline / action / advanced / light | default、icon |
| `AkCard` | `as: string`（div）；`variant`（default）：default / outline / stripe / place | default |
| `AkCardHeader`、`AkCardContent`、`AkCardFooter` | 无专用属性 | default |
| `AkCardTitle`、`AkCardDescription` | 无专用属性 | default |
| `AkTag` | `variant`（default）：default / advanced / danger / neutral | default |
| `AkStatus` | `label: string`（Online）；`detail: string`（空）；`variant`（default）：default / warning / critical / offline | label、default（detail） |
| `AkNotice` | `code`（RI / INFO）、`title`（空）；`variant`（info）：info / warning / danger / success；`role`：alert / status | code、title、default（正文） |

`AkNotice` 未指定 role 时，danger 使用 alert，其余使用 status。纯装饰或持续展示内容是否需要 live region，应由消费方按场景选择。

## 数值组件

`AkInputNumber` 使用 `v-model<number>`（默认 0），通过 `update:modelValue` 回传数值。

| 属性 | 默认值 |
| --- | --- |
| `min` / `max` / `step` | 0 / 99 / 1 |
| `disabled` | false |
| `label` | 数值 |
| `minLabel` / `maxLabel` | 最少 / 最多 |

负步长取绝对值；零或非有限步长回退到 1。组件将数值限制在有效区间，非有限 model 回退到下界；非有限 min/max 回退为默认边界，max 小于 min 时区间收敛到 min。小数步进去除常见浮点尾差，最多保留 12 位小数；不适合任意精度计算。禁用时所有内部控件均禁用。

| 组件 | 属性（默认值） | 插槽 |
| --- | --- | --- |
| `AkProgress` | `min`（0）、`max`（100）、`value`（0）、`label`（Progress）、`valueLabel`（空）；`variant`（default）：default / warning / danger | label、value |
| `AkGauge` | `min`（0）、`max`（100）、`value`（0）、`label`（Deploy）、`unit`（percent）；`variant`（default）：default / warning | label、unit、default（数值） |

进度组件只读，数值归一化不会改变父组件数据。非有限值显示下界；无效边界按默认值回退，反向区间收敛到 min；零长度区间的百分比为 0。ARIA 数值始终使用同一有效区间。

## 导航组件

`AkTabs`：`items: AkTabsItem[]` 必填，`ariaLabel` 默认 Tabs，`v-model<string>` 可选。条目包含 `value`、`label`、`title`，可选 `eyebrow` 与 `description`。插槽 `panel-${value}` 接收 `{ item }`。

`AkSegmented`：`options: AkSegmentedOption[]` 必填，`ariaLabel` 默认 Options，`v-model<string>` 可选。条目包含 `value` 与 `label`。这是按钮组，以 `aria-pressed` 表达选中状态。

value 必须唯一。未设置 model 或选中值不在列表中时，视觉与键盘入口回退到第一项；不会仅因回退而修改父模型。用户激活项目时发出 `update:modelValue`。空列表不渲染选项。

Tabs 使用自动激活：左右方向键、Home、End 移动焦点并激活；Tab 可进入可见面板。切换时隐藏面板仍保持挂载，以保留内容状态。

## 景深控制

`createDashboardDepth(root, options?)` 从 `@yunyoujun/ak-ui/depth` 导入。root 必须是有 document/window 的 DOM Element。选项：`layerSelector`（`[data-depth]`）、`maxX`（130）、`maxY`（70）、`respectReducedMotion`（true）、`pointerEnabled`（true）。数值选项应为有限数值。

`pointerEnabled: false` 不注册指针监听，适合由外部时间轴调用 `render()`；手动渲染仍尊重减少动态效果偏好。

返回 `render(clientX, clientY)`、`reset()`、`destroy()`。reset 取消待执行动画并归零；destroy 归零、清理事件和动画，可重复调用，销毁后的控制器不再移动元素。默认响应系统“减少动态效果”，偏好实时开启时归零；设置 false 可由消费方自行控制。

Vue 的 `useDashboardDepth(target, options?)` 接受 `MaybeRefOrGetter<Element | null | undefined>`，在 mounted 时绑定当时的目标，在作用域销毁时清理，返回 `{ reset }`。目标应在 mounted 时存在；它不会跟踪后续替换的 DOM。
