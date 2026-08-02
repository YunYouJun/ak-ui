# 接口与命名

ak-ui 把 CSS 类名和 `--ak-*` variables 视为公开接口。框架 Adapter 只负责属性、事件与状态映射，不复制另一套视觉系统。

## 类名结构

组件以 `.ak-{component}` 作为根类名，内部元素使用 `__`，状态与外观使用 `--`：

```html
<button class="ak-button ak-button--action">开始行动</button>

<div class="ak-input-number">
  <input class="ak-input-number__inner">
</div>
```

这套命名接近 BEM，但不会为了形式制造没有语义的层级。调用方应依赖公开类名，不要依赖示例页面的布局容器。

## 视觉变量

需要换色、尺寸或背景时，优先覆盖组件公开的 `--ak-*` variables：

```css
.deployment-panel {
  --ak-card-place-color: var(--ak-color-advanced);
  --ak-loading-color: var(--ak-color-primary);
}
```

通用色彩变量与字体辅助类参见[设计规范](/components/)。组件专属变量记录在各自页面中。

## Adapter 边界

- CSS Core 是视觉与稳定类名的唯一来源。
- Vue Adapter 可以封装属性、插槽、事件与键盘交互。
- 修改视觉时先覆盖 variables；需要改变结构或行为时，再编辑复制到项目中的 Adapter 源码。
