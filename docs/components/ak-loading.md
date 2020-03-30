# ak-loading 加载

::: demo-dark

<div class="ak-loading"></div>
<div class="ak-loading" style="--ak-loading-color: black;"></div>
<div class="ak-loading" style="--ak-loading-color: var(--ak-color-advanced);"></div>
:::

```html
<div class="ak-loading"></div>
<!-- 自定义颜色 -->
<div class="ak-loading" style="--ak-loading-color: black;"></div>
<div
  class="ak-loading"
  style="--ak-loading-color: var(--ak-color-advanced);"
></div>

<!-- 或者定义全局变量 -->
<style>
  :root {
    --ak-loading-color: black;
    /* 使用已有的变量 */
    /* --ak-loading-color: var(--ak-color-advanced); */
  }
</style>
```
