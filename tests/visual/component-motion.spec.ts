import { expect, test } from '@playwright/test'

for (const [route, selector, modifier] of [
  ['/components/ak-media', '[data-demo-id="media/album"] .ak-media--album', 'ak-media--enter'],
  ['/components/ak-notice', '[data-demo-id="notice/basic"] .ak-notice', 'ak-notice--enter'],
]) {
  test(`${modifier} finishes visibly and respects reduced motion`, async ({ page }) => {
    await page.goto(route)
    const component = page.locator(selector).first()
    await expect(component).toBeVisible()
    // Settle intrinsic image dimensions and font metrics before comparing layout.
    await component.evaluate(async (el) => {
      await document.fonts.ready
      await Promise.all(Array.from(el.querySelectorAll('img'), image => image.decode()))
    })
    await component.evaluate((el, className) => el.classList.add(className), modifier)
    await expect.poll(() => component.evaluate(el => el.getAnimations().length)).toBeGreaterThan(0)
    await component.evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished)))
    await expect(component).toHaveCSS('opacity', '1')
    const settled = await component.evaluate(el => el.getBoundingClientRect().toJSON())
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect.poll(() => component.evaluate(el => el.getAnimations().length)).toBe(0)
    await expect(component).toHaveCSS('opacity', '1')
    const reduced = await component.evaluate(el => el.getBoundingClientRect().toJSON())
    expect(reduced.width).toBeCloseTo(settled.width, 1)
    expect(reduced.height).toBeCloseTo(settled.height, 1)
  })
}
