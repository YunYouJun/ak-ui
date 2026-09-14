# ak-media 媒体

## album 相册

::: demo media/album
:::

使用 `--ak-media-album-bgcolor` 和 `--ak-media-album-height` 调整背板。

## 旋转入场与叠层

相册背板使用独立的平面层叠上下文，不依赖负 Z 深度；多个相册重叠时，可在每个相册上明确设置 `z-index`。添加 `ak-media--enter` 可旋转滑入，减少动态效果偏好下直接显示。

```html
<div class="ak-media--album ak-media--enter" style="z-index: 2; --ak-media-enter-delay: 120ms">
  <img src="/portrait.png" alt="角色立绘">
</div>
```

使用 `--ak-media-enter-duration`（默认 650ms）和 `--ak-media-enter-delay`（默认 0ms）调整节奏。动画会占用相册的 `transform`；若需额外运镜，请在外层容器上实现。
