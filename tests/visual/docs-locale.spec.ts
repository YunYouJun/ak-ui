import { expect, test } from '@playwright/test'

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
