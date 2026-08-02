<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useSlots, watch } from 'vue'
import type { ExampleSurface } from '../../../../examples/index'

const props = withDefaults(defineProps<{
  encoded: string
  height?: number
  id?: string
  showCode?: boolean
  sourceOpen?: boolean
  surface?: ExampleSurface
  title?: string
}>(), {
  height: 240,
  id: 'demo',
  showCode: true,
  sourceOpen: true,
  surface: 'plain',
  title: 'Example',
})

const slots = useSlots()
const copied = ref(false)
const canvas = ref<HTMLElement>()
const source = computed(() => decodeURIComponent(props.encoded))

interface ExampleScript {
  attributes: string
  code: string
}

// Sources are repository-owned examples. Rendering and running them here keeps
// the live preview, displayed source, and Playwright capture on one input.
const parsedSource = computed(() => {
  const scripts: ExampleScript[] = []
  const scriptPattern = new RegExp('<script\\b([^>]*)>([\\s\\S]*?)<\\/script>', 'gi')
  const html = source.value.replace(scriptPattern, (_match, attributes: string, code: string) => {
    scripts.push({ attributes, code })
    return ''
  })

  return { html, scripts }
})

function executeExampleScripts() {
  if (!canvas.value)
    return

  for (const block of parsedSource.value.scripts) {
    const attributesTemplate = document.createElement('template')
    attributesTemplate.innerHTML = `<script${block.attributes}><\/script>`
    const inertScript = attributesTemplate.content.querySelector('script')
    const script = document.createElement('script')

    for (const attribute of Array.from(inertScript?.attributes ?? []))
      script.setAttribute(attribute.name, attribute.value)

    if (!script.src && script.type !== 'module')
      script.textContent = `(() => {\n${block.code}\n})()`
    else
      script.textContent = block.code

    canvas.value.append(script)
    if (!script.src)
      script.remove()
  }
}

onMounted(executeExampleScripts)

watch(source, async () => {
  await nextTick()
  executeExampleScripts()
})

async function copySource() {
  await navigator.clipboard.writeText(source.value)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1600)
}
</script>

<template>
  <section
    class="ak-demo-preview"
    :class="`is-${surface}`"
    :data-demo-id="id"
  >
    <header class="ak-demo-preview__header">
      <span class="ak-demo-preview__signal" aria-hidden="true"></span>
      <span class="ak-demo-preview__index">PREVIEW / {{ id.toUpperCase() }}</span>
      <span class="ak-demo-preview__title">{{ title }}</span>
    </header>

    <div class="ak-demo-preview__stage" :style="{ height: `${height}px` }">
      <div
        ref="canvas"
        class="ak-demo-preview__canvas"
        role="group"
        :aria-label="`${title} preview`"
        v-html="parsedSource.html"
      ></div>
    </div>

    <details v-if="showCode && slots.code" class="ak-demo-preview__source" :open="sourceOpen">
      <summary>
        <span>SOURCE / HTML</span>
        <button type="button" @click.prevent="copySource">
          {{ copied ? 'COPIED' : 'COPY' }}
        </button>
      </summary>
      <div class="ak-demo-preview__code"><slot name="code" /></div>
    </details>
  </section>
</template>
