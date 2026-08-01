<script setup lang="ts">
import DemoPreview from './DemoPreview.vue'
import { examples } from '../../../../examples/index'

const files = import.meta.glob('../../../../examples/**/*.html', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

const fixtures = examples.map((example) => {
  const suffix = `/examples/${example.id}.html`
  const entry = Object.entries(files).find(([path]) => path.endsWith(suffix))

  if (!entry) {
    throw new Error(`Missing visual fixture: ${example.id}`)
  }

  return {
    ...example,
    encoded: encodeURIComponent(entry[1]),
  }
})
</script>

<template>
  <main class="ak-visual-fixtures">
    <h1>Visual fixtures</h1>
    <DemoPreview
      v-for="fixture in fixtures"
      :id="fixture.id"
      :key="fixture.id"
      :data-visual-id="fixture.id"
      :encoded="fixture.encoded"
      :height="fixture.height"
      :show-code="false"
      :surface="fixture.surface"
      :title="fixture.title"
    />
  </main>
</template>
