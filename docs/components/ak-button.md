# ak-button 按钮

明日方舟按钮样式

## base 普通按钮

::: demo-dark
<button class="ak-button ak-font-serif">开始唤醒</button>
<button class="ak-button ak-button--outline">开始唤醒</button>
<button class="ak-button ak-button--action">开始行动</button>
:::

```html
<button class="ak-button">开始唤醒</button>
<button class="ak-button ak-button--outline">开始唤醒</button>
<button class="ak-button ak-button--action">开始行动</button>
```

## block 块状按钮

::: demo-dark
<button class="ak-button ak-button--block">放弃行动</button>
:::

```html
<button class="ak-button ak-button--block">放弃行动</button>
```

### icon 带图标的按钮

::: demo-dark
<button class="ak-button">
<svg class="ak-button__icon" aria-hidden="true">
<use xlink:href="#icon-finger-click"></use>
</svg>
<span class="ak-button__label">接管作战</span>
</button>
:::

```html
<button class="ak-button">
  <i class="ak-button__icon">
    <img src="/img/icon/finger-click.svg" />
  </i>
  <span class="ak-button__label">接管作战</span>
</button>
```

## fab 浮动动作按钮

::: demo-dark
<button class="ak-button ak-button--fab">
<svg class="ak-button__icon ak-icon" aria-hidden="true">
<use xlink:href="#icon-pause"></use>
</svg>
</button>

:::

```html
<button class="ak-button ak-button--fab">
  <svg class="ak-button__icon ak-icon" aria-hidden="true">
    <use xlink:href="#icon-pause"></use>
  </svg>
</button>
```

> 如果你想实现明日方舟中按钮的斜切效果，你可以为其加上 `ak-fx--skew-left` or `ak-fx--skew-right`。  
> 可参考 [ak-fx 斜切效果](/components/ak-fx.html#skew-倾斜效果)

## start 开始按钮

::: demo-dark

<div class="ak-button--start">
  <div class="icon triangle-right"></div>
  <div class="label">START</div>
</div>
:::

```html
<div class="ak-button--start">
  <div class="icon triangle-right"></div>
  <div class="label">START</div>
</div>
```

> 如想要添加更多效果参见 [ak-fx](/components/ak-fx)。

## group 按钮组

没有合成玉图标，所以随便找个图标代替了。

::: demo-color
<demo-button-group></demo-button-group>
:::

<<< @/docs/.vuepress/components/demo/button-group.vue
