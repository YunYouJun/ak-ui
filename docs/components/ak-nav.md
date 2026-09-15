---
title: 链接导航
---

# ak-nav 链接导航

用于页面跳转、同页章节和内容目录。使用原生链接，不接管路由、焦点或滚动；切换同一页面中的面板请继续使用 [ak-tabs](./ak-tabs)。

<div class="vp-raw">

::: demo nav/basic
:::

</div>

## 竖排内容目录

使用可选的 `.ak-nav--vertical`，无需另建目录组件。主副标签都可使用中文；副标签可省略。

<div class="vp-raw">

::: demo nav/vertical
:::

</div>

## 部件与状态

| Class / 属性 | 用途 |
| --- | --- |
| `.ak-nav` | 带 `aria-label` 的原生 `nav`，默认横排并自动换行 |
| `.ak-nav__link` | 带真实 `href` 的原生 `a` |
| `.ak-nav__label` | 主要标签，遵循产品主要语言 |
| `.ak-nav__description` | 可选的补充说明或第二语言 |
| `.ak-nav--vertical` | 竖排列表和分隔线 |
| `aria-current="page"` | 当前页面，以文字色和底线／侧线同时提示 |
| `aria-current="location"` | 同页当前章节，由调用方同步 |

Tab 移动焦点，Enter 打开链接。悬停和按压改变填充，可见焦点保留轮廓。没有新增键盘控制逻辑或自动高亮逻辑；不要将链接标为 `role="tab"`。没有目标时省略链接，不用只有 `aria-disabled` 的可点击链接模拟禁用。

## 组件 Token

| Token | 默认回退 |
| --- | --- |
| `--ak-nav-signal` | `--ak-signal-info` |
| `--ak-nav-surface` | `--ak-surface-canvas` |
| `--ak-nav-divider` | 主要文字色 30% 与透明色混合 |

在 `.ak-nav` 实例上覆盖变量。窄容器自动换行，长词允许折行，链接至少 44px 高和宽。减少动态效果偏好下取消过渡。

```css
.product-navigation {
  --ak-nav-signal: var(--brand-primary, #4aabea);
}
```

通过 CSS Core 的 `@yunyoujun/ak-ui/style.css` 引入；不需要安装 Vue Registry 包装组件。该组件的选择器独立，不修改 Tabs 或现有按钮的默认样式。
