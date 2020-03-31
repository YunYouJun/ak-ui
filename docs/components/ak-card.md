# ak-card 卡片

## outline 描边卡片

::: demo

<div class="ak-card ak-card--outline"></div>
:::

```html
<div class="ak-card ak-card--outline"></div>
```

## stripe 条纹卡片

::: demo-dark

<div class="ak-card ak-card--stripe"></div>
:::

```html
<div class="ak-card ak-card--stripe"></div>
```

## place 人物放置卡片

如果想要保持 `focus` 状态，请增加 `tabindex` 属性。

::: demo-color

<div class="ak-card ak-card--place"></div>
<div class="ak-card ak-card--place" style="--ak-card-place-color: var(--ak-color-yellow);"></div>
<div tabindex="0" class="ak-card ak-card--place" style="--ak-card-place-color: var(--ak-color-advanced);"></div>
:::

> 值为 0 、非法值、或者没有 tabindex 值的元素应该放置在 tabindex 值为正值的元素后面。  
> [tabindex - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex)

```html
<div class="ak-card ak-card--place"></div>
<div
  class="ak-card ak-card--place"
  style="--ak-card-place-color: var(--ak-color-yellow);"
></div>
<div
  tabindex="0"
  class="ak-card ak-card--place"
  style="--ak-card-place-color: var(--ak-color-advanced);"
></div>
```
