<script setup lang="ts">
import { AkSlider } from '../../../../registry/ak/ui/slider'
import type { DepthSettings } from './useShowcaseDepth'

const settings = defineModel<DepthSettings>({ required: true })
defineProps<{ reducedMotion: boolean }>()
const emit = defineEmits<{ reset: [], preview: [direction: number] }>()

type NumericSetting = Exclude<keyof DepthSettings, 'enabled'>
const controls: { key: NumericSetting, label: string, min: number, max: number, step: number, unit: string }[] = [
  { key: 'maxX', label: '水平幅度', min: 0, max: 200, step: 5, unit: 'px' },
  { key: 'maxY', label: '垂直幅度', min: 0, max: 120, step: 5, unit: 'px' },
  { key: 'background', label: '背景层强度', min: 0, max: 0.05, step: 0.005, unit: '' },
  { key: 'character', label: '人物层强度', min: 0, max: 0.15, step: 0.005, unit: '' },
  { key: 'interface', label: '界面层强度', min: 0, max: 0.2, step: 0.005, unit: '' },
  { key: 'perspective', label: '透视距离', min: 16, max: 80, step: 1, unit: 'em' },
  { key: 'tilt', label: '菜单倾角', min: 0, max: 18, step: 1, unit: '°' },
]

function update(key: NumericSetting, value: number) {
  settings.value = { ...settings.value, [key]: value }
}
</script>

<template>
  <details class="depth-controls">
    <summary class="depth-controls__summary">景深调节 <span>实时预览</span></summary>
    <div class="depth-controls__body">
      <div class="depth-controls__toolbar">
        <label class="depth-controls__toggle">
          <input type="checkbox" :checked="settings.enabled" @change="settings = { ...settings, enabled: ($event.target as HTMLInputElement).checked }">
          启用指针景深
        </label>
        <button type="button" @click="emit('reset')">恢复默认参数</button>
      </div>
      <p class="depth-controls__hint">移动下方终端内的指针观察效果；也可固定预览方向后拖动滑块。位移由横纵幅度与各层强度共同决定。</p>
      <p v-if="reducedMotion" class="depth-controls__hint" role="status">系统已开启减少动态效果，指针位移保持关闭；透视距离和菜单倾角仍可调整。</p>
      <div class="depth-controls__grid">
        <label v-for="control in controls" :key="control.key" class="depth-controls__field">
          <span>{{ control.label }} <output>{{ settings[control.key] }}{{ control.unit }}</output></span>
          <AkSlider
            :label="control.label"
            :min="control.min"
            :max="control.max"
            :step="control.step"
            :model-value="settings[control.key]"
            @update:model-value="update(control.key, $event)"
          />
        </label>
      </div>
      <div class="depth-controls__preview" role="group" aria-label="景深预览方向">
        <button type="button" @click="emit('preview', -1)">预览左上</button>
        <button type="button" @click="emit('preview', 0)">回到中心</button>
        <button type="button" @click="emit('preview', 1)">预览右下</button>
      </div>
    </div>
  </details>
</template>

<style scoped>
.depth-controls {
  margin-top: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.depth-controls__summary {
  padding: 14px 20px;
  font-weight: 600;
  cursor: pointer;
}

.depth-controls__summary span {
  margin-left: 12px;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 400;
}

.depth-controls__body { padding: 0 20px 20px; }

.depth-controls__toolbar, .depth-controls__preview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.depth-controls__toolbar { justify-content: space-between; }
.depth-controls__toggle { display: flex; align-items: center; gap: 8px; }
.depth-controls__hint { color: var(--vp-c-text-2); font-size: 13px; }

.depth-controls__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px 28px;
  margin: 20px 0;
}

.depth-controls__field { display: grid; gap: 10px; font-size: 13px; }
.depth-controls__field span { display: flex; justify-content: space-between; gap: 8px; }
.depth-controls__field output { font-variant-numeric: tabular-nums; }

.depth-controls button {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  font-size: 12px;
  cursor: pointer;
}

.depth-controls button:focus-visible, .depth-controls input:focus-visible, .depth-controls__summary:focus-visible {
  outline: 2px solid #55cfff;
  outline-offset: 3px;
}
</style>
