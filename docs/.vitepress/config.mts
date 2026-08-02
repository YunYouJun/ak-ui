import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import markdownItContainer from 'markdown-it-container'
import { defineConfig } from 'vitepress'

import { exampleById } from '../../examples/index'

const projectRoot = fileURLToPath(new URL('../..', import.meta.url))

function demoContainer(md: any) {
  md.use(markdownItContainer, 'demo', {
    validate(info: string) {
      return /^demo\s+[a-z0-9][a-z0-9-/]*\s*$/i.test(info.trim())
    },
    render(tokens: any[], index: number, _options: unknown, env: unknown) {
      if (tokens[index].nesting === -1) {
        return '</DemoPreview>\n'
      }

      const id = tokens[index].info.trim().replace(/^demo\s+/, '')
      const example = exampleById.get(id)

      if (!example) {
        throw new Error(`Unknown demo "${id}"`)
      }

      const file = resolve(projectRoot, 'examples', `${id}.html`)
      const source = readFileSync(file, 'utf8').trim()
      const encoded = encodeURIComponent(source)
      const highlighted = md.render(`\`\`\`html\n${source}\n\`\`\``, env)

      return [
        `<DemoPreview id="${example.id}" title="${example.title}" surface="${example.surface}" :height="${example.height}" encoded="${encoded}">`,
        `<template #code>${highlighted}</template>`,
      ].join('\n')
    },
  })
}

const gettingStartedSidebar = [
  {
    text: '接入方式',
    items: [
      { text: 'CSS Core', link: '/guide/' },
      { text: 'Vue Registry', link: '/registry/' },
    ],
  },
  {
    text: '开发约定',
    items: [
      { text: '接口与命名', link: '/guide/style' },
      { text: '色彩与字体', link: '/components/' },
    ],
  },
  {
    text: '项目记录',
    items: [
      { text: '复活记录', link: '/guide/revival' },
    ],
  },
]

export default defineConfig({
  title: 'ak-ui',
  titleTemplate: ':title · ak-ui',
  description: 'A framework-agnostic Arknights-inspired CSS interface library.',
  lang: 'zh-CN',
  appearance: 'dark',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://ak-ui.yyj.moe',
  },
  head: [
    ['link', { rel: 'icon', href: '/ak.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#111315' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['link', { rel: 'apple-touch-icon', href: '/ak.png' }],
    ['link', { rel: 'mask-icon', href: '/ak.svg', color: '#ffd802' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@700;900&family=Syncopate:wght@700&display=swap',
    }],
    ['script', { async: '', src: 'https://at.alicdn.com/t/font_1623879_1wzsjomrpmm.js' }],
  ],
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    config: demoContainer,
  },
  themeConfig: {
    logo: '/ak.svg',
    siteTitle: 'AK / UI',
    nav: [
      {
        text: '开始使用',
        items: [
          { text: 'CSS Core', link: '/guide/' },
          { text: 'Vue Registry', link: '/registry/' },
          { text: '接口与命名', link: '/guide/style' },
          { text: '复活记录', link: '/guide/revival' },
        ],
      },
      { text: '组件', link: '/components/' },
    ],
    sidebar: {
      '/guide/': gettingStartedSidebar,
      '/components/': [
        {
          text: '基础规范',
          items: [
            { text: '色彩与字体', link: '/components/' },
            { text: '辅助类', link: '/components/ak-helper' },
            { text: '图标', link: '/components/ak-icon' },
          ],
        },
        {
          text: '界面模块',
          items: [
            { text: '按钮', link: '/components/ak-button' },
            { text: '按钮组', link: '/components/ak-button-group' },
            { text: '卡片', link: '/components/ak-card' },
            { text: '计数器', link: '/components/ak-counter' },
            { text: '分割线', link: '/components/ak-divider' },
            { text: '效果', link: '/components/ak-fx' },
            { text: '表单', link: '/components/ak-form' },
            { text: '关卡', link: '/components/ak-level' },
            { text: '加载', link: '/components/ak-loading' },
            { text: '媒体', link: '/components/ak-media' },
            { text: '战术通知', link: '/components/ak-notice' },
            { text: '物体', link: '/components/ak-object' },
            { text: '面板', link: '/components/ak-panel' },
            { text: '分页', link: '/components/ak-pagination' },
            { text: '进度与仪表', link: '/components/ak-progress' },
            { text: '理智', link: '/components/ak-san' },
            { text: '状态标记', link: '/components/ak-status' },
            { text: '终端导航', link: '/components/ak-tabs' },
          ],
        },
      ],
      '/registry/': gettingStartedSidebar,
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索终端',
            buttonAriaLabel: '搜索终端',
          },
          modal: {
            noResultsText: '没有匹配的记录',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YunYouJun/ak-ui' },
    ],
    editLink: {
      pattern: 'https://github.com/YunYouJun/ak-ui/edit/master/docs/:path',
      text: '修订此记录',
    },
    lastUpdated: {
      text: '记录更新于',
      formatOptions: { dateStyle: 'medium' },
    },
    outline: {
      level: [2, 3],
      label: '本页记录',
    },
    docFooter: {
      prev: '上一记录',
      next: '下一记录',
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '界面模式',
    lightModeSwitchTitle: '切换至明亮界面',
    darkModeSwitchTitle: '切换至暗色界面',
    footer: {
      message: 'Unofficial Arknights-inspired interface study.',
      copyright: 'MIT Licensed · YunYouJun',
    },
  },
})
