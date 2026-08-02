# 设计规范

## Color 色彩

色彩层级参考游戏中的道具稀有度，并同时导出为 `--ak-color-*` CSS variables。

::: demo foundation/colors
:::

| Variable | Value |
| --- | --- |
| `--ak-color-low` | `#9c9c9c` |
| `--ak-color-basic` | `#d8dd5a` |
| `--ak-color-primary` | `#4aabea` |
| `--ak-color-secondary` | `#cfc2d1` |
| `--ak-color-advanced` | `#f1c644` |

## Typography 字体

标题与正文分别提供衬线和无衬线辅助类。

::: demo foundation/typography
:::

```css
.ak-font-serif {
  font-family: "Noto Serif SC", serif;
}

.ak-font-sans-serif {
  font-family: "Noto Sans SC", Roboto, Arial, sans-serif;
}
```

## 道具色彩参考

<div class="ak-item-palette" role="list" aria-label="道具稀有度色彩参考">
  <figure role="listitem">
    <img src="/img/game/foreign-iron-fragments.webp" alt="异铁碎片">
    <figcaption>LOW / 低阶</figcaption>
  </figure>
  <figure role="listitem">
    <img src="/img/game/basic-combat-record.webp" alt="基础作战记录">
    <figcaption>BASIC / 基础</figcaption>
  </figure>
  <figure role="listitem">
    <img src="/img/game/primary-combat-record.webp" alt="初级作战记录">
    <figcaption>PRIMARY / 初级</figcaption>
  </figure>
  <figure role="listitem">
    <img src="/img/game/intermediate-combat-record.webp" alt="中级作战记录">
    <figcaption>SECONDARY / 中级</figcaption>
  </figure>
  <figure role="listitem">
    <img src="/img/game/advanced-combat-record.webp" alt="高级作战记录">
    <figcaption>ADVANCED / 高级</figcaption>
  </figure>
</div>
