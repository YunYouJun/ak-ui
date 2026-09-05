import type { LocaleSpecificConfig, DefaultTheme } from 'vitepress'

export const en: LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link: string } = {
  label: 'English',
  lang: 'en',
  link: '/en/',
  description: 'An Arknights-inspired design language, tokens and framework-agnostic CSS primitives.',
  themeConfig: {
    nav: [
      { text: 'Get started', link: '/en/guide/' },
      { text: 'Components', link: '/en/components/' },
      { text: 'Vue Registry', link: '/en/registry/' },
      { text: 'A2UI experiment', link: '/en/guide/a2ui' },
    ],
    sidebar: [{ text: 'Documentation', items: [
      { text: 'Get started', link: '/en/guide/' },
      { text: 'Components', link: '/en/components/' },
      { text: 'Vue Registry', link: '/en/registry/' },
      { text: 'A2UI experiment', link: '/en/guide/a2ui' },
      { text: '1.0 compatibility and migration', link: '/en/guide/stability' },
    ] }],
    outline: { level: [2, 3], label: 'On this page' },
    docFooter: { prev: 'Previous page', next: 'Next page' },
    editLink: { pattern: 'https://github.com/YunYouJun/ak-ui/edit/master/docs/:path', text: 'Edit this page' },
    lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },
    returnToTopLabel: 'Back to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    langMenuLabel: 'Change language',
  },
}
