# 设计规范

## Color 色彩

参考自道具色彩分级

<style>
.ak-color-box {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.ak-color-item {
  font-family: sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
}
.ak-color-item:hover {
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
}
.ak-ref img {
  width: 64px;
}
</style>
<div class="ak-color-box" style="background">
  <div class="ak-color-item bg-low">Low color: #9c9c9c</div>
  <div class="ak-color-item bg-basic">Basic color: #d8dd5a</div>
  <div class="ak-color-item bg-primary">Primary color: #4aabea</div>
  <div class="ak-color-item bg-secondary">Secondary color: #cfc2d1</div>
  <div class="ak-color-item bg-advanced">Advanced color: #f1c644</div>
</div>

<div class="ak-ref">

> ![异铁碎片](/img/game/foreign-iron-fragments.webp)
> ![基础作战记录](/img/game/basic-combat-record.webp)
> ![初级作战记录](/img/game/primary-combat-record.webp)
> ![中级作战记录](/img/game/intermediate-combat-record.webp)
> ![高级作战记录](/img/game/advanced-combat-record.webp)

</div>

## Typography 字体

### 衬线字体

```css
font-family: Noto Serif SC, serif;
```

<div class="ak-font-serif ak-text--title">明日方舟</div>
<p class="ak-font-serif">明日方舟</p>

```html
<div class="ak-font-serif ak-text--title">明日方舟</div>
<p class="ak-font-serif">明日方舟</p>
```

### 无衬线字体

```css
font-family: Roboto, Noto Sans, Arial, sans-serif;
```

<div class="ak-font-sans-serif ak-text--title">明日方舟</div>
<p class="ak-font-sans-serif">明日方舟</p>

```html
<div class="ak-font-sans-serif ak-text--title">明日方舟</div>
<p class="ak-font-sans-serif">明日方舟</p>
```
