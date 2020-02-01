# ak-card 卡片

## stripe 条纹卡片

<div class="ak-card ak-card--stripe"></div>

```html
<div class="ak-card ak-card--stripe"></div>
```

## place 人物放置卡片

如果想要保持 `focus` 状态，请增加 `tabindex` 属性。

<div class="ak-card ak-card--place"></div>
<div class="ak-card ak-card--place" style="--ak-card-place-color: var(--ak-color-yellow);"></div>
<div tabindex="0" class="ak-card ak-card--place" style="--ak-card-place-color: var(--ak-color-advanced);"></div>

```html
<div class="ak-card ak-card--place"></div>
<div class="ak-card ak-card--place ak-card--place__rare"></div>
<div tabindex="0" class="ak-card ak-card--place ak-card--place__rare"></div>
```
