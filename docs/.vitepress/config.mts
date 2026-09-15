import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import markdownItContainer from 'markdown-it-container'
import { defineConfig } from 'vitepress'

import { createEn } from './en.ts'

import { exampleById } from '../../examples/index.ts'

const projectRoot = fileURLToPath(new URL('../..', import.meta.url))
const { version: packageVersion } = JSON.parse(
  readFileSync(resolve(projectRoot, 'package.json'), 'utf8'),
) as { version: string }
const en = createEn(packageVersion)

const versionMenu = {
  text: `v${packageVersion}`,
  items: [
    { text: 'npm 包', link: `https://www.npmjs.com/package/@yunyoujun/ak-ui/v/${packageVersion}` },
    { text: 'GitHub Release Notes', link: `https://github.com/YunYouJun/ak-ui/releases/tag/v${packageVersion}` },
  ],
}

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
        `<DemoPreview id="${example.id}" title="${example.title}" surface="${example.surface}" :height="${example.height}" :source-open="${example.sourceOpen !== false}" encoded="${encoded}">`,
        `<template #code>${highlighted}</template>`,
      ].join('\n')
    },
  })
}

// Share the same entries between the top navigation and documentation sidebars.
const integrationGroup = {
  text: '接入方式',
  items: [
    { text: 'AI Skill（推荐）', link: '/guide/ai-skill' },
    { text: 'CSS Core', link: '/guide/' },
    { text: 'Vue Registry', link: '/registry/' },
    { text: 'A2UI（实验）', link: '/guide/a2ui' },
  ],
}

const designGroup = {
  text: '设计与开发',
  items: [
    { text: 'ak-ui 设计语言', link: '/guide/design-language' },
    { text: '设计 Token', link: '/guide/tokens' },
    { text: '官网 UI 研究', link: '/guide/official-site-study' },
    { text: 'Headless 适配', link: '/guide/headless' },
    { text: '质量检查清单', link: '/guide/quality' },
    { text: '1.0 稳定性与发布检查', link: '/guide/stability' },
  ],
}

const projectGroup = {
  text: '项目记录',
  items: [{ text: '复活记录', link: '/guide/revival' }, { text: '已发布视频', link: '/guide/videos' }],
}

const showcaseGroup = {
  text: '完整演示',
  items: [
    { text: '主界面演示', link: '/showcase/' },
    { text: '全屏终端', link: '/showcase/fullscreen' },
    { text: '全屏加载演示', link: '/showcase/loading' },
    { text: '素材说明', link: '/showcase/artwork' },
  ],
}

const gettingStartedSidebar = [integrationGroup, designGroup, projectGroup]

export default defineConfig({
  vite: {
    optimizeDeps: {
      // Prebundle the lazy experiment before parallel browser tests navigate.
      // Discovering these dependencies on demand can trigger a full-page reload.
      include: ['@a2ui/web_core/v0_9', 'zod'],
    },
  },
  title: 'ak-ui',
  titleTemplate: ':title · ak-ui',
  description: 'An Arknights-inspired design language, token foundation, and framework-agnostic CSS primitive library.',
  lang: 'zh-CN',
  locales: { root: { label: '简体中文', lang: 'zh-CN', link: '/' }, en },
  transformPageData(pageData) {
    const relativePage = pageData.relativePath.replace(/^en\//, '')
    pageData.frontmatter.localeLinks = Object.fromEntries(
      [['root', ''], ['en', 'en/']].map(([locale, prefix]) => {
        const counterpart = `${prefix}${relativePage}`
        const link = existsSync(resolve(projectRoot, 'docs', counterpart))
          ? `/${counterpart.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')}`
          : `/${prefix}`
        return [locale, link]
      }),
    )
  },
  appearance: 'dark',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://ak-ui.yyj.moe',
  },
  head: [
    ['link', { rel: 'icon', href: '/ak-ui-app-icon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#111315' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['link', { rel: 'apple-touch-icon', href: '/ak-ui-app-icon-512.png' }],
    ['link', { rel: 'mask-icon', href: '/ak-ui-mark-mono.svg', color: '#e89016' }],
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
    logo: {
      light: '/ak-ui-mark.svg',
      dark: '/ak-ui-mark-dark.svg',
      alt: 'ak-ui',
    },
    siteTitle: 'AK / UI',
    // Page data contains only existing counterparts. Translated headings may use
    // different anchors, so language switching intentionally opens the page top.
    i18nRouting: (_data, route, targetLocale) =>
      route.data.frontmatter.localeLinks?.[targetLocale]
      ?? (targetLocale === 'root' ? '/' : `/${targetLocale}/`),
    langMenuLabel: '切换语言',
    nav: [
      {
        ...integrationGroup,
        activeMatch: '^/(guide/(ai-skill|a2ui)(\\.html)?$|guide/$|registry/)',
      },
      { text: '组件与演示', link: '/components/', activeMatch: '^/(components|showcase)/' },
      {
        text: designGroup.text,
        activeMatch: '^/guide/(design-language|tokens|official-site-study|headless|reka-ui|style|quality|stability|migration-v1|revival|videos)(\\.html)?$',
        items: [designGroup, projectGroup],
      },
      versionMenu,
    ],
    sidebar: {
      '/guide/': gettingStartedSidebar,
      '/components/': [
        {
          text: '基础规范',
          items: [
            { text: '组件索引与规范', link: '/components/' },
            { text: '辅助类', link: '/components/ak-helper' },
            { text: '图标', link: '/components/ak-icon' },
          ],
        },
        {
          text: '操作与导航',
          items: [
            { text: '按钮', link: '/components/ak-button' },
            { text: '按钮组', link: '/components/ak-button-group' },
            { text: '链接导航', link: '/components/ak-nav' },
            { text: '表单', link: '/components/ak-form' },
            { text: '终端导航', link: '/components/ak-tabs' },
            { text: '分页', link: '/components/ak-pagination' },
          ],
        },
        {
          text: '布局与容器',
          items: [
            { text: '卡片', link: '/components/ak-card' },
            { text: '面板', link: '/components/ak-panel' },
            { text: '分割线', link: '/components/ak-divider' },
          ],
        },
        {
          text: '数据与状态',
          items: [
            { text: '计数器', link: '/components/ak-counter' },
            { text: '新闻列表', link: '/components/ak-news-list' },
            { text: '进度与仪表', link: '/components/ak-progress' },
            { text: '理智', link: '/components/ak-san' },
            { text: '状态标记', link: '/components/ak-status' },
            { text: '关卡', link: '/components/ak-level' },
          ],
        },
        {
          text: '反馈与浮层',
          items: [
            { text: '对话框', link: '/components/ak-dialog' },
            { text: '浮层与提示', link: '/components/ak-popover' },
            { text: '战术通知', link: '/components/ak-notice' },
            { text: '加载', link: '/components/ak-loading' },
          ],
        },
        {
          text: '视觉与媒体',
          items: [
            { text: '图像与视频', link: '/components/ak-media' },
            { text: '效果', link: '/components/ak-fx' },
            { text: '物体', link: '/components/ak-object' },
          ],
        },
        showcaseGroup,
      ],
      '/showcase/': [showcaseGroup],
      '/registry/': gettingStartedSidebar,
    },
    search: {
      provider: 'local',
      options: {
        locales: { en: { translations: { button: { buttonText: 'Search docs', buttonAriaLabel: 'Search docs' }, modal: { noResultsText: 'No results found', resetButtonTitle: 'Reset search', footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' } } } } },
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
      text: '修订作战记录',
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
      message: 'Unofficial ak-ui design language study.',
      copyright: 'MIT Licensed · YunYouJun',
    },
  },
})
