# ak-fx 效果

## glow 辉光效果

> 更多色彩参见 [色彩](/components/#color-色彩)。

### glow 辉光按钮

::: demo
<button class="ak-button ak-fx--glow">放弃行动</button>
<button class="ak-button ak-button--action ak-fx--glow" style="--ak-fx-glow-color: var(--ak-color-primary);">开始行动</button>
:::

```html
<button class="ak-button ak-fx--glow">放弃行动</button>
<button
  class="ak-button ak-button--action ak-fx--glow"
  style="--ak-fx-glow-color: var(--ak-color-primary);"
>
  开始行动
</button>
```

## radio 辐射按钮

::: demo
<button class="ak-button ak-fx--radio">放弃行动</button>
:::

## outline 轮廓效果

此处没有使用上文类似设置变量方法，主要是因为颜色变量采用的都是 16 进制代码，而边框消失的动画效果使用了 rgba 的 alpha 数值变化来实现。
rgba 不支持十六进制代码，暂时没有想到更好的方法。

:::demo
<button class="ak-button ak-fx--outline">放弃行动</button>
<button class="ak-button ak-fx--outline" style="--ak-outline-color: purple">放弃行动</button>
<button class="ak-button ak-fx--outline" style="--ak-outline-color: var(--ak-color-primary)">放弃行动</button>
:::

```html
<button class="ak-button ak-fx--outline">放弃行动</button>
<button class="ak-button ak-fx--outline" style="--ak-outline-color: purple">
  放弃行动
</button>
<button
  class="ak-button ak-fx--outline"
  style="--ak-outline-color: var(--ak-color-primary)"
>
  放弃行动
</button>
```
