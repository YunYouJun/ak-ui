<script setup lang="ts">
import { shallowRef, useTemplateRef } from 'vue'
import { AkEntrance, AkCountUp } from '../../../../registry/ak/ui/effects'
import { AkSlider } from '../../../../registry/ak/ui/slider'
const entrance = useTemplateRef('entrance')
const count = useTemplateRef('count')
const value = shallowRef(1000)
const duration = shallowRef(1000)
const direction = shallowRef<'up' | 'down' | 'left' | 'right' | 'fade'>('right')
</script>

<template>
  <section class="effects-playground">
    <div class="effects-playground__controls">
      <label>入场方向 <select v-model="direction"><option v-for="item in ['up', 'down', 'left', 'right', 'fade']" :key="item" :value="item">{{ item }}</option></select></label>
      <label>目标数值 <input v-model.number="value" type="number" step="0.01"></label>
      <label>动画时长 {{ duration }} ms <AkSlider v-model="duration" label="效果动画时长" :min="0" :max="3000" :step="100" /></label>
      <button class="ak-button" @click="entrance?.replay()">重播区块</button>
      <button class="ak-button" @click="count?.replay()">重播数字</button>
    </div>
    <AkEntrance ref="entrance" :direction="direction" :duration="duration">
      <div class="effects-playground__card">
        <span>RESOURCE / 龙门币</span>
        <AkCountUp ref="count" :value="value" :duration="duration" :decimals="2" />
      </div>
    </AkEntrance>
  </section>
</template>

<style scoped>
.effects-playground { padding: 24px; background: #151b21; color: #f7f7f4; }
.effects-playground__controls { display: grid; gap: 12px; margin-bottom: 24px; }
.effects-playground__controls input[type="number"], .effects-playground__controls select { border: 1px solid #75808b; padding: 4px 8px; }
.effects-playground__controls .ak-button { width: auto; padding: 8px 16px; }
.effects-playground__card { display: grid; gap: 12px; padding: 24px; border-left: 4px solid #4aabea; background: #25313a; }
.effects-playground__card :deep(.ak-count-up) { font-size: 40px; }
</style>
