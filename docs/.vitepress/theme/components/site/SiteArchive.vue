<script setup lang="ts">
import { AkMediaGallery } from '../../../../../registry/ak/ui/site'

defineProps<{ media?: boolean }>()
const archive = [
  { id: 'signal', title: '信标计划', description: 'SIGNAL / 将每一次微弱的回应，连接成清晰的坐标。档案、说明与视觉在同一索引中切换。', image: '/examples/site/signal.svg', alt: '青色等高线与白色三角形信标示意图' },
  { id: 'terrain', title: '地形观测', description: 'TERRAIN / 地形与边界持续变化。保存观察，记录差异，在下一次探索之前重新校准。', image: '/examples/site/terrain.svg', alt: '等高线穿过几何山峰的地形示意图' },
  { id: 'orbit', title: '轨道档案', description: 'ORBIT / 从静态坐标到连续轨迹，信息始终可以被定位、阅读与回看。', image: '/examples/site/orbit.svg', alt: '圆形轨道与三角结构的抽象档案图' },
]
</script>

<template>
  <AkMediaGallery :items="media ? [...archive].reverse() : archive" :label="media ? '媒体画廊' : '计划档案'" previous-label="上一项" next-label="下一项" expand-label="查看大图" close-label="关闭大图" empty-label="暂无内容" />
</template>
