import { expect, test } from '@playwright/test'

import packageJson from '../../package.json' with { type: 'json' }

for (const locale of ['zh', 'en']) {
  for (const appearance of ['light', 'dark']) {
    test(`${locale} docs and 404 support ${appearance} appearance`, async ({ page }) => {
      await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ contentType: 'text/css', body: '' }))
      await page.addInitScript(value => localStorage.setItem('vitepress-theme-appearance', value), appearance)
      await page.setViewportSize({ width: 390, height: 844 })
      const base = locale === 'en' ? '/en/' : '/'
      await page.goto(base)
      await expect(page.locator('html')).toHaveAttribute('lang', locale === 'en' ? 'en' : 'zh-CN')
      await expect(page.locator('.ak-home')).toHaveCSS('background-color', appearance === 'dark' ? 'rgb(17, 19, 21)' : 'rgb(233, 235, 231)')
      await expect(page.locator('.ak-home')).toHaveCSS('color', appearance === 'dark' ? 'rgb(243, 244, 239)' : 'rgb(23, 26, 29)')
      await expect(page.getByRole('link', { name: locale === 'en' ? /^Get started/ : /^使用 AI Skill/ })).toBeVisible()
      await expect(page.locator('.ak-home')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)

      await page.goto(`${base}guide/`)
      await expect(page.locator('h1').filter({ hasText: locale === 'en' ? 'Get started' : '手动接入 ak-ui' })).toBeVisible()
      await expect(page.locator('html')).toHaveClass(appearance === 'dark' ? /dark/ : /^(?!.*dark)/)
      await page.goto(`${base}missing-rc-page`)
      await expect(page.getByRole('heading', { name: locale === 'en' ? 'Page not found' : '没有找到这个页面' })).toBeVisible()
      await expect(page.locator('.ak-not-found')).toHaveCSS('color', appearance === 'dark' ? 'rgb(243, 244, 239)' : 'rgb(23, 26, 29)')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      const home = page.getByRole('link', { name: locale === 'en' ? 'Back to home' : '返回首页', exact: true })
      await expect(home).toHaveAttribute('href', base)
      await home.click()
      await expect(page.locator('.ak-home')).toBeVisible()
    })
  }
}

test('language switching from untranslated content uses an existing locale home', async ({ page }) => {
  await page.goto('/components/ak-card')
  await page.locator('.VPNavBarTranslations button').hover()
  await page.locator('.VPNavBarTranslations').getByRole('link', { name: 'English' }).click()
  await expect(page).toHaveURL(/\/en\/$/)
  await expect(page.locator('.ak-home')).toBeVisible()
  await page.locator('.VPNavBarTranslations button').hover()
  await page.locator('.VPNavBarTranslations').getByRole('link', { name: '简体中文' }).click()
  await expect(page).toHaveURL(/:\d+\/$/)
  await expect(page.locator('.ak-home')).toBeVisible()
})

for (const [slug, chinese, english] of [
  ['design-language', 'ak-ui 设计语言', 'ak-ui design language'],
  ['tokens', 'ak-ui Token 契约', 'ak-ui token contract'],
  ['headless', 'Headless 适配协议', 'Adapting headless components'],
  ['reka-ui', 'Reka UI 适配示例', 'Reka UI adapter example'],
  ['quality', 'ak-ui 质量检查清单', 'ak-ui quality checklist'],
]) {
  test(`${slug} switches between corresponding translated pages`, async ({ page }) => {
    await page.goto(`/guide/${slug}`)
    await expect(page.locator('h1')).toHaveText(chinese)
    const translations = page.locator('.VPNavBarTranslations')
    await translations.locator('button').hover()
    await translations.getByRole('link', { name: 'English', exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/en/guide/${slug}\\.html$`))
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('h1')).toHaveText(english)
    await expect(page.locator('.VPNavBarMenuGroup.active')).toContainText('Design & dev')
    await expect(page.locator('.VPSidebar').getByRole('link', { name: 'A2UI (experimental)', exact: true })).toBeVisible()
    await translations.locator('button').hover()
    await translations.getByRole('link', { name: '简体中文', exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/guide/${slug}\\.html$`))
    await expect(page.locator('h1')).toHaveText(chinese)
  })
}

test('mobile language menu opens the translated guide without a stale anchor', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/guide/design-language#品牌融合')
  await page.getByRole('button', { name: 'mobile navigation', exact: true }).click()
  await page.locator('.VPNavScreen').getByRole('button', { name: '简体中文', exact: true }).click()
  await page.locator('.VPNavScreen').getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveURL(/\/en\/guide\/design-language\.html$/)
  await expect(page.locator('h1')).toHaveText('ak-ui design language')
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  await expect(page.locator('.VPSidebar').getByRole('link', { name: 'Headless adapters', exact: true })).toBeVisible()
})


test('English navigation fits tablet widths and keeps its menus usable', async ({ page }) => {
  await page.goto('/en/guide/design-language')
  for (const width of [768, 1024]) {
    await page.setViewportSize({ width, height: 1000 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const nav = page.locator('.VPNavBarMenu')
    const bounds = await nav.boundingBox()
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width)
    await nav.getByRole('button', { name: 'Integration', exact: true }).click()
    await expect(nav.getByRole('link', { name: 'AI Skill (recommended)', exact: true })).toBeVisible()
    await nav.getByRole('button', { name: 'Integration', exact: true }).click()
  }
})

for (const [prefix, npmLabel, releaseLabel] of [
  ['', 'npm 包', 'GitHub Release Notes'],
  ['en/', 'npm package', 'GitHub release notes'],
]) {
  test(`${prefix || 'zh'} navigation exposes package version links`, async ({ page }) => {
    const npmUrl = `https://www.npmjs.com/package/@yunyoujun/ak-ui/v/${packageJson.version}`
    const releaseUrl = `https://github.com/YunYouJun/ak-ui/releases/tag/v${packageJson.version}`
    await page.goto(`/${prefix}guide/`)
    const nav = page.locator('.VPNavBarMenu')
    await nav.getByRole('button', { name: `v${packageJson.version}`, exact: true }).click()
    await expect(nav.locator(`a[href="${npmUrl}"]`)).toContainText(npmLabel)
    await expect(nav.locator(`a[href="${releaseUrl}"]`)).toContainText(releaseLabel)

    await page.setViewportSize({ width: 390, height: 844 })
    await page.getByRole('button', { name: 'mobile navigation', exact: true }).click()
    const mobileNav = page.locator('.VPNavScreen')
    await mobileNav.getByRole('button', { name: `v${packageJson.version}`, exact: true }).click()
    await expect(mobileNav.locator(`a[href="${npmUrl}"]`)).toContainText(npmLabel)
    await expect(mobileNav.locator(`a[href="${releaseUrl}"]`)).toContainText(releaseLabel)
  })
}


for (const [prefix, registryAnchor, navName, heading] of [
  ['', 'vue-实际渲染', '组件与演示', '组件与 Playground'],
  ['en/', 'live-vue-rendering', 'Components & demos', 'Components & Playground'],
]) {
  test(`${prefix || 'zh'} components and Playground are reachable from desktop and mobile navigation`, async ({ page }) => {
    await page.goto(`/${prefix}guide/`)
    await page.locator('.VPNavBarMenu').getByRole('link', { name: navName, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/${prefix}components/$`))
    await expect(page.locator('h1')).toHaveText(heading)
    await expect(page.locator('main a[href="/showcase/"]')).toBeVisible()
    await expect(page.locator(`main a[href="/${prefix}registry/#${registryAnchor}"]`)).toBeVisible()
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/${prefix}guide/`)
    await page.getByRole('button', { name: 'mobile navigation', exact: true }).click()
    await page.locator('.VPNavScreen').getByRole('link', { name: navName, exact: true }).click()
    await expect(page.locator('h1')).toHaveText(heading)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}
