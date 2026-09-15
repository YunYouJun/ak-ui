# ak-media 媒体

## album 相册

::: demo media/album
:::

使用 `--ak-media-album-bgcolor` 和 `--ak-media-album-height` 调整背板。

## 旋转入场与叠层

相册使用独立的平面层叠上下文：背板位于图片后方，前景白边由单独的覆盖层绘制，避免背板压住白边；覆盖层不会拦截点击。相册不依赖负 Z 深度；多个相册重叠时，可在每个相册上明确设置 `z-index`。添加 `ak-media--enter` 可旋转滑入，减少动态效果偏好下直接显示。

```html
<div class="ak-media--album ak-media--enter" style="z-index: 2; --ak-media-enter-delay: 120ms">
  <img src="/portrait.png" alt="角色立绘">
</div>
```

使用 `--ak-media-enter-duration`（默认 650ms）和 `--ak-media-enter-delay`（默认 0ms）调整节奏。动画会占用相册的 `transform`；若需额外运镜，请在外层容器上实现。


## 双图分层弧线入场

::: demo media/layered
:::

为相册添加 `.ak-media--layered`，用两个 `.ak-media__sheet` 分别包裹图片，再添加 `.ak-media--split-enter` 播放动画。前图从左下旋入，背图从右下旋入，各自轻微越过终点后归位。轨迹由多段 `translate + rotate` 关键帧近似弧线，不依赖 JavaScript 动画库。

- `.ak-media__sheet--front`：前图与白边一起运动，负责容器尺寸。
- `.ak-media__sheet--back`：背图与白边一起运动，始终位于前图后方。
- 不加 `.ak-media--split-enter` 时静态叠放；与旧 `.ak-media--enter` 同时使用时，分层动画优先。
- 示例复用同一张现有图片，背图灰度处理。可以替换成不同图片；背图按前图尺寸裁切。
- 示例背图仅作装饰，因此使用空 `alt` 和 `aria-hidden`。背图有独立信息时，去掉 `aria-hidden` 并填写对应描述。

| 局部变量 | 默认值 | 用途 |
| --- | --- | --- |
| `--ak-media-front-duration` | `760ms` | 前图时长 |
| `--ak-media-front-delay` | `120ms` | 前图延迟 |
| `--ak-media-back-duration` | `900ms` | 背图时长 |
| `--ak-media-back-delay` | `0ms` | 背图延迟 |
| `--ak-media-arc-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | 每段运动的缓动曲线 |
| `--ak-media-sheet-frame` | `--ak-color-white` | 两张照片的白边颜色 |

```html
<div class="ak-media--album ak-media--layered ak-media--split-enter"
     style="width: 240px; --ak-media-front-delay: 240ms; --ak-media-back-duration: 1100ms">
  <div class="ak-media__sheet ak-media__sheet--back" aria-hidden="true">
    <img src="/back.jpg" alt="">
  </div>
  <div class="ak-media__sheet ak-media__sheet--front">
    <img src="/front.jpg" alt="相册照片">
  </div>
</div>
```

动画只改变透明度和变换，不影响文档排版；外层应留出运动空间，避免裁切。减少动态效果偏好下立即显示最终位置，不保留入场延迟。重播按钮只用于演示，CSS Core 不会自动循环播放。
