<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import AkNotFound from './components/AkNotFound.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #not-found><AkNotFound /></template>
  </DefaultTheme.Layout>
</template>
