import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'

for (const width of [1280, 390]) {
  test(`news rows preserve content and native navigation at ${width}px`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/components/ak-news-list')
    const list = page.locator('[data-demo-id="news-list/basic"] .ak-news-list')
    const link = list.getByRole('link').first()
    await expect(list.getByRole('link')).toHaveCount(3)
    await expect(link).toHaveCSS('text-decoration-line', 'none')
    await expect(list.locator('time').first()).toHaveAttribute('datetime', '2026-09-15')
    // Exercise a narrow parent even on a wide viewport, with enlarged text and
    // an unbroken title: it must grow vertically instead of clipping content.
    await list.evaluate(el => {
      el.style.width = '260px'
      el.style.maxWidth = '100%'
      el.style.setProperty('--ak-type-data-size', '2rem')
      el.querySelector('.ak-news-list__title')!.textContent = 'LongUnbrokenReleaseTitle'.repeat(5)
    })
    const bounds = await link.evaluate(el => {
      const row = el.getBoundingClientRect()
      const title = el.querySelector('.ak-news-list__title')!.getBoundingClientRect()
      const time = el.querySelector('time')!.getBoundingClientRect()
      return { overflow: el.scrollWidth - el.clientWidth, height: row.height, ordered: time.top >= title.bottom, contained: title.right <= row.right }
    })
    expect(bounds.overflow).toBeLessThanOrEqual(1)
    expect(bounds.height).toBeGreaterThanOrEqual(44)
    expect(bounds.ordered).toBe(true)
    expect(bounds.contained).toBe(true)
    await link.focus()
    // macOS WebKit uses Option+Tab to include links in keyboard traversal.
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
    const second = list.getByRole('link').nth(1)
    await expect(second).toBeFocused()
    await expect(second).toHaveCSS('outline-style', 'solid')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(second).toHaveCSS('transition-duration', '0s')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/guide\/official-site-study/)
  })

  test(`navigation wraps and exposes current state at ${width}px`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/components/ak-nav')
    const nav = page.locator('[data-demo-id="nav/basic"] nav')
    const current = nav.getByRole('link').first()
    await expect(current).toHaveAttribute('aria-current', 'page')
    await expect(current).toHaveCSS('text-decoration-line', 'none')
    const state = await current.evaluate(el => {
      const s = getComputedStyle(el)
      return { marker: s.borderBottomColor, width: parseFloat(s.borderBottomWidth) }
    })
    expect(state.marker).not.toBe('rgba(0, 0, 0, 0)')
    expect(state.width).toBeGreaterThan(0)
    for (const item of await nav.getByRole('link').all()) {
      const size = await item.boundingBox()
      expect(size!.height).toBeGreaterThanOrEqual(44)
      expect(size!.width).toBeGreaterThanOrEqual(44)
    }
    expect(await nav.evaluate(el => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1)
    await current.focus()
    // macOS WebKit uses Option+Tab to include links in keyboard traversal.
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
    const next = nav.getByRole('link').nth(1)
    await expect(next).toBeFocused()
    await expect(next).toHaveCSS('outline-style', 'solid')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(next).toHaveCSS('transition-duration', '0s')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/components\/ak-news-list/)
  })
}


test('standalone CSS switches columns by container width and disables its own motion', async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 900 })
  await page.setContent(await readFile('examples/news-list/basic.html', 'utf8'))
  await page.addStyleTag({ content: await readFile('dist/ak-ui.css', 'utf8') })
  const list = page.locator('.ak-news-list')
  const link = list.getByRole('link').first()
  await expect(link).toHaveCSS('transition-duration', '0.2s')
  const inline = await link.evaluate(el => {
    const category = el.querySelector('.ak-news-list__category')!.getBoundingClientRect()
    const title = el.querySelector('.ak-news-list__title')!.getBoundingClientRect()
    return title.left > category.right
  })
  expect(inline).toBe(true)
  await list.evaluate(el => { el.style.width = '260px' })
  const stacked = await link.evaluate(el => {
    const category = el.querySelector('.ak-news-list__category')!.getBoundingClientRect()
    const title = el.querySelector('.ak-news-list__title')!.getBoundingClientRect()
    return title.top >= category.bottom
  })
  expect(stacked).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(link).toHaveCSS('transition-duration', '0s')
})
