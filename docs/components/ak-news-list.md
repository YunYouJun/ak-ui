---
title: 新闻列表
---

# ak-news-list 新闻列表

用于更新记录、公告列表和文章入口。每条内容是一个完整链接，按分类、标题和时间组织。它与用于即时系统反馈的 [ak-notice](./ak-notice) 分工不同。

<div class="vp-raw">

::: demo news-list/basic
:::

</div>

## 空状态

空列表不渲染虚假的条目；改用容器和简短说明。异步更新需要播报时，由调用方将状态文字放在合适的 `role="status"` 区域。

<div class="vp-raw">

::: demo news-list/empty
:::

</div>

## 部件

| Class | 用途 |
| --- | --- |
| `.ak-news-list` | `ul` 列表容器；显式 `role="list"` 保留无项目符号列表的辅助技术语义 |
| `.ak-news-list__item` | `li` 条目 |
| `.ak-news-list__link` | 包含全部内容的原生 `a`，提供真实 `href` |
| `.ak-news-list__category` | 分类标签 |
| `.ak-news-list__title` | 完整标题，允许多行和长词换行 |
| `.ak-news-list__time` | 带机器可读 `datetime` 的原生 `time` |
| `.ak-news-list__empty` | 空状态说明 |

保持 DOM 顺序为分类 → 标题 → 时间。容器宽度达到 `34rem` 时显示三列；较窄的容器自然堆叠，不依赖整个窗口的宽度。没有固定最大高度或自动截断，文字放大后条目随内容增高。不支持容器查询的环境保留单列布局。

## 组件 Token

| Token | 默认回退 |
| --- | --- |
| `--ak-news-list-signal` | `--ak-signal-info` |
| `--ak-news-list-surface` | `--ak-surface-canvas` |
| `--ak-news-list-divider` | 主要文字色 30% 与透明色混合 |
| `--ak-news-list-row-min-height` | `4.5rem`，同时保留至少 44px 的交互目标 |

实例上覆盖局部变量；公开基础 token 的默认值保持不变。

```css
.release-notes {
  --ak-news-list-row-min-height: 5rem;
  --ak-news-list-signal: var(--brand-primary, #4aabea);
}
```

Tab 和 Enter 沿用原生链接行为。悬停同时改变背景与标题下划线，按压加强填充，键盘焦点使用内侧轮廓，减少动态效果偏好下取消过渡。链接中不要嵌套按钮或其他链接。

“更多内容”可在列表后组合现有 [ak-button](./ak-button)，筛选面板可以组合 [ak-tabs](./ak-tabs)，不重复实现这两类组件。

通过 CSS Core 的 `@yunyoujun/ak-ui/style.css` 引入。该组件不提供数据请求、排序或筛选行为，纯展示无需 Vue Registry 包装。
