import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import AkHome from './components/AkHome.vue'
import DemoPreview from './components/DemoPreview.vue'
import VisualFixtures from './components/VisualFixtures.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AkHome', AkHome)
    app.component('DemoPreview', DemoPreview)
    app.component('VisualFixtures', VisualFixtures)
  },
} satisfies Theme
