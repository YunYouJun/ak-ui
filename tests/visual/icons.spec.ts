import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`icon examples work offline at ${width}px`, async ({ page, browserName }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.route('https://at.alicdn.com/**', route => route.abort())
    await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ contentType: 'text/css', body: '' }))
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/components/ak-icon.html')
    const base = page.locator('[data-demo-id="icon/basic"] .ak-demo-preview__canvas')
    await expect(base.locator('svg')).toHaveCount(6)
    await expect(base.locator('svg').first()).toHaveCSS('width', '28px')
    await expect(base.locator('svg').first()).toHaveCSS('fill', 'none')
    const materials = page.locator('[data-demo-id="icon/stuff"] .ak-demo-preview__canvas')
    await expect(materials.locator('figure')).toHaveCount(4)
    expect(await materials.locator('svg').evaluateAll(icons => icons.every(icon => {
      const graphic = (icon as SVGSVGElement).getBBox()
      const box = icon.getBoundingClientRect()
      return graphic.width > 0 && graphic.height > 0 && graphic.x >= 0 && graphic.y >= 0
        && graphic.x + graphic.width <= 24 && graphic.y + graphic.height <= 24 && box.width < 50
    }))).toBe(true)
    // Existing consumers can keep the original border variable.
    const badge = materials.locator('.ak-icon--stuff').first()
    await badge.evaluate(element => element.setAttribute('style', '--icon-border-color: rgb(10, 120, 180)'))
    await expect(badge).toHaveCSS('border-top-color', 'rgb(10, 120, 180)')
    const actions = page.locator('[data-demo-id="icon/actions"] .ak-demo-preview__canvas')
    const toggle = actions.locator('[data-target-toggle]')
    await expect(toggle).toHaveAccessibleName('锁定目标')
    await toggle.focus()
    await page.keyboard.press('Space')
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await expect(actions.locator('output')).toHaveText('目标已锁定')
    const reset = actions.getByRole('button', { name: '重置目标' })
    // macOS WebKit skips buttons in the Tab order unless full keyboard access is enabled.
    if (browserName === 'webkit') await reset.focus()
    else await page.keyboard.press('Tab')
    await expect(reset).toBeFocused()
    await expect(reset).toHaveCSS('outline-width', '2px')
    await page.keyboard.press('Enter')
    await expect(actions.locator('output')).toHaveText('尚未锁定目标')
    for (const canvas of [base, materials, actions]) {
      expect(await canvas.evaluate(el => el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight)).toBe(true)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.evaluate(() => localStorage.setItem('vitepress-theme-appearance', 'light'))
    await page.reload()
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    await expect(base).toHaveCSS('color', 'rgb(17, 19, 21)')
    await expect(materials.locator('svg')).toHaveCount(4)
    expect(errors).toEqual([])
  })
}
