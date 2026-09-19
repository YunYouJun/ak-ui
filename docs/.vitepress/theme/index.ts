import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'

import SiteShowcase from './components/site/SiteShowcase.vue'
import EffectsPlayground from './components/EffectsPlayground.vue'
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
    app.component('SiteShowcase', SiteShowcase)
    app.component('EffectsPlayground', EffectsPlayground)
    app.component('AkHome', AkHome)
    app.component('AkShowcase', AkShowcase)
    app.component('DemoPreview', DemoPreview)
    app.component('VisualFixtures', VisualFixtures)
  },
} satisfies Theme
