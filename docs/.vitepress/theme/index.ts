import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'

import AkHome from './components/AkHome.vue'
import AkShowcase from './components/AkShowcase.vue'
import DemoPreview from './components/DemoPreview.vue'
import VisualFixtures from './components/VisualFixtures.vue'

import '../../../src/scss/ak-ui.scss'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('AkHome', AkHome)
    app.component('AkShowcase', AkShowcase)
    app.component('DemoPreview', DemoPreview)
    app.component('VisualFixtures', VisualFixtures)
  },
} satisfies Theme
