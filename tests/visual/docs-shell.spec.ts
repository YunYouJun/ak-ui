import { expect, test } from '@playwright/test'

for (const width of [1280, 390]) {
  test(`document category follows navigation and honors reduced motion at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/components/ak-news-list')
    const strip = page.locator('.ak-doc-header')
    await expect(strip).toContainText('组件参考')
    await strip.evaluate(async el => {
      await Promise.all(el.getAnimations().map(animation => animation.finished))
    })
    await expect(strip).toHaveCSS('opacity', '1')
    await page.locator('[data-demo-id="news-list/basic"] a').nth(1).click()
    await expect(page).toHaveURL(/\/guide\/official-site-study/)
    await expect(strip).toContainText('使用指南')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(strip).toHaveCSS('animation-name', 'none')
    expect(await strip.evaluate(el => getComputedStyle(el, '::after').animationName)).toBe('none')
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1)
    await page.goto('/en/guide/tokens')
    await expect(strip).toContainText('Guide')
    await expect(page.locator('h1')).toBeVisible()
    expect(errors).toEqual([])
  })
}
