# ak-object 物体

明日方舟地图通常为 10 \* 6

## Cube 立方体

::: demo

<div class="perspective">
  <template v-for="num in 30">
  <div class="ak-cube" style="--cube-size:65px; --cube-border-widtth:10px">
    <div class="ak-face front">
      <svg class="ak-icon" aria-hidden="true">
        <use xlink:href="#icon-warning"></use>
      </svg>
      <div class="ak-face__lines">
        <div class="ak-face__line--tl"></div>
        <div class="ak-face__line--tr"></div>
        <div class="ak-face__line--bl"></div>
        <div class="ak-face__line--br"></div>
      </div>
    </div>
    <div class="ak-face back"></div>
    <div class="ak-face right"></div>
    <div class="ak-face left"></div>
    <div class="ak-face top"></div>
    <div class="ak-face bottom"></div>
  </div>
  </template>
  <template v-for="num in 30">
  <div class="ak-cube" style="--cube-color: rgba(255,0,0,0.4); --cube-size:65px; --cube-border-widtth:10px">
    <div class="ak-face front">
      <svg class="ak-icon" aria-hidden="true">
        <use xlink:href="#icon-warning"></use>
      </svg>
      <div class="ak-face__lines">
        <div class="ak-face__line--tl"></div>
        <div class="ak-face__line--tr"></div>
        <div class="ak-face__line--bl"></div>
        <div class="ak-face__line--br"></div>
      </div>
    </div>
    <div class="ak-face back"></div>
    <div class="ak-face right"></div>
    <div class="ak-face left"></div>
    <div class="ak-face top"></div>
    <div class="ak-face bottom"></div>
  </div>
  </template>
</div>
:::

### Todo

- 四条线

| Var                 | Description                    |
| ------------------- | ------------------------------ |
| --cube-color        | 立方体颜色                     |
| --cube-size         | 立方体尺寸大小（宽高始终一致） |
| --cube-border-width | 立方体边宽度                   |
