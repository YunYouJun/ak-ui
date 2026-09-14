---
title: Reka UI 适配示例
description: 保留 Reka UI 行为和无障碍能力，并使用 ak-ui Token 完成视觉适配
---

# Reka UI 适配示例

将 Reka UI 作为 Vue 的行为与无障碍基础，不把它作为 ak-ui 的依赖或视觉来源。项目已有基础组件库时，优先复用现有库。

Reka UI 部件接受类名，通过 `data-state` 等属性暴露状态，并可能将浮层内容传送到 `body`。保留这些行为，对渲染出的部件应用样式。

## 对话框结构

```vue
<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

import '@yunyoujun/ak-ui/tokens.css'
</script>

<template>
  <DialogRoot>
    <DialogTrigger class="ops-trigger" data-ak-ui="system">
      打开任务简报
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="ops-dialog__overlay" data-ak-ui="system" />
      <DialogContent class="ops-dialog" data-ak-ui="system">
        <span class="ops-dialog__eyebrow">MISSION / 04</span>
        <DialogTitle class="ops-dialog__title">确认部署</DialogTitle>
        <DialogDescription class="ops-dialog__description">
          继续前请检查编队和资源。
        </DialogDescription>

        <div class="ops-dialog__actions">
          <DialogClose class="ops-dialog__cancel">取消</DialogClose>
          <button class="ops-dialog__confirm" type="button">部署</button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
```

标题与说明仍使用 Reka 部件，使屏幕阅读器能够获取对话框名称和上下文。`DialogPortal`、焦点约束、Escape 处理与焦点返回仍由 Reka UI 负责。

## 使用 Token 编写样式

```css
.ops-dialog__overlay {
  position: fixed;
  z-index: 40;
  inset: 0;
  background: rgb(7 9 10 / 72%);
  backdrop-filter: blur(2px);
}

.ops-dialog {
  position: fixed;
  z-index: 41;
  top: 50%;
  left: 50%;
  width: min(32rem, calc(100vw - 2 * var(--ak-space-4)));
  padding: var(--ak-space-6);
  border-left: var(--ak-line-strong) solid var(--ak-signal-action);
  color: var(--ak-text-primary);
  background: var(--ak-surface-raised);
  box-shadow: var(--ak-shadow-panel);
  clip-path: polygon(
    0 0,
    calc(100% - var(--ak-cut-lg)) 0,
    100% var(--ak-cut-lg),
    100% 100%,
    0 100%
  );
  transform: translate(-50%, -50%);
}

.ops-dialog__eyebrow {
  color: var(--ak-signal-info);
  font: 700 var(--ak-type-label-size) / 1 var(--ak-font-mono);
  letter-spacing: var(--ak-type-wide);
}

.ops-dialog__title {
  margin: var(--ak-space-2) 0;
  font: 900 var(--ak-type-title-size) / 1.08 var(--ak-font-command);
  letter-spacing: var(--ak-type-tight);
}

.ops-dialog__description {
  color: var(--ak-text-secondary);
  font-family: var(--ak-font-sans);
}

.ops-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--ak-space-2);
  margin-top: var(--ak-space-5);
}

.ops-dialog__cancel,
.ops-dialog__confirm,
.ops-trigger {
  min-height: var(--ak-density-control-height);
  padding-inline: var(--ak-space-4);
  border: var(--ak-line-hairline) solid currentcolor;
  font: 700 var(--ak-type-data-size) / 1 var(--ak-font-sans);
}

.ops-dialog__confirm {
  border-color: var(--ak-signal-action);
  color: var(--ak-text-inverse);
  background: var(--ak-signal-action);
}

.ops-dialog[data-state='open'],
.ops-dialog__overlay[data-state='open'] {
  animation: ak-adapter-enter var(--ak-motion-base) var(--ak-ease-emphasized);
}

.ops-dialog :focus-visible,
.ops-trigger:focus-visible {
  outline: var(--ak-focus-width) solid var(--ak-focus-color);
  outline-offset: var(--ak-focus-offset);
}

@keyframes ak-adapter-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .ops-dialog,
  .ops-dialog__overlay {
    animation: none;
  }
}
```

传送部件的样式可以放入全局样式表、使用 Vue `:deep()`，或直接选择传送部件自身的类名。不要依赖传送后已不在祖先链中的局部作用域容器。

## 其他基础组件的映射

- Tabs：将 `TabsTrigger[data-state='active']` 映射到选中线条／填充，并保留方向键行为。
- Select：分别为触发器、Portal 内容、视口、选项和指示器编写样式；保留键入匹配与焦点移动行为。
- Tooltip／Popover：添加装饰箭头或切角表面前，先验证边界碰撞时的位置调整。
- Checkbox／Switch：为 `data-state='checked' | 'unchecked' | 'indeterminate'` 设置样式，并保留非颜色的状态标记。
- Accordion：基础组件暴露相应 CSS 变量时，使用测量后的内容高度制作动画，并提供减少动态效果的降级方案。

依赖可选属性或库专属 CSS 变量前，请检查已安装的 Reka UI 版本或最新官方文档。
