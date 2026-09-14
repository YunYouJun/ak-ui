import type { LocaleSpecificConfig, DefaultTheme } from 'vitepress'

const integrationGroup = {
  text: 'Integration',
  items: [
    { text: 'AI Skill (recommended)', link: '/en/guide/ai-skill' },
    { text: 'CSS Core', link: '/en/guide/' },
    { text: 'Vue Registry', link: '/en/registry/' },
    { text: 'Vue Registry API', link: '/en/registry/api' },
    { text: 'A2UI (experimental)', link: '/en/guide/a2ui' },
  ],
}

const designGroup = {
  text: 'Design & development',
  items: [
    { text: 'ak-ui design language', link: '/en/guide/design-language' },
    { text: 'Design tokens', link: '/en/guide/tokens' },
    { text: 'Headless adapters', link: '/en/guide/headless' },
    { text: 'Reka UI example', link: '/en/guide/reka-ui' },
    { text: 'Interfaces & naming', link: '/en/guide/style' },
    { text: 'Quality checklist', link: '/en/guide/quality' },
    { text: '1.0 stability & release checks', link: '/en/guide/stability' },
    { text: 'Upgrade to 1.0', link: '/en/guide/migration-v1' },
  ],
}

const projectGroup = {
  text: 'Project history',
  items: [{ text: 'Reviving ak-ui', link: '/en/guide/revival' }],
}

const showcaseGroup = {
  text: 'Showcase (中文)',
  items: [
    { text: 'Main interface (中文)', link: '/showcase/' },
    { text: 'Fullscreen terminal (中文)', link: '/showcase/fullscreen' },
    { text: 'Fullscreen loading (中文)', link: '/showcase/loading' },
    { text: 'Artwork provenance', link: '/showcase/artwork' },
  ],
}

const guideSidebar = [integrationGroup, designGroup, projectGroup]

export const en: LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link: string } = {
  label: 'English',
  lang: 'en',
  link: '/en/',
  description: 'An Arknights-inspired design language, tokens and framework-agnostic CSS primitives.',
  themeConfig: {
    nav: [
      { ...integrationGroup, activeMatch: '^/en/(guide/(ai-skill|a2ui)(\\.html)?$|guide/$|registry/)' },
      { text: 'Components', link: '/en/components/', activeMatch: '^/en/components/' },
      {
        text: 'Design & dev',
        activeMatch: '^/en/guide/(design-language|tokens|headless|reka-ui|style|quality|stability|migration-v1|revival)(\\.html)?$',
        items: [designGroup, projectGroup],
      },
      { text: 'Playground', link: '/en/playground/', activeMatch: '^/en/playground/' },
    ],
    sidebar: {
      '/en/playground/': [{ text: 'Playground', items: [{ text: 'Interactive demos', link: '/en/playground/' }] }, showcaseGroup],
      '/en/guide/': guideSidebar,
      '/en/registry/': guideSidebar,
      '/en/components/': [
        { text: 'Components', items: [{ text: 'Component index', link: '/en/components/' }] },
        integrationGroup,
        showcaseGroup,
      ],
    },
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
    footer: {
      message: 'Unofficial ak-ui design language study.',
      copyright: 'MIT Licensed · YunYouJun',
    },
  },
}
