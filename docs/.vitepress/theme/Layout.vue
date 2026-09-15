<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import AkDocHeader from './components/AkDocHeader.vue'
import AkNotFound from './components/AkNotFound.vue'

const { page } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before><AkDocHeader :key="page.relativePath" :path="page.relativePath" /></template>
    <template #not-found><AkNotFound /></template>
  </DefaultTheme.Layout>
</template>
