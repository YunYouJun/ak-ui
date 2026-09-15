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

test('photo sheets enter independently, replay, and settle in reduced motion', async ({ page }) => {
  await page.goto('/components/ak-media')
  const demo = page.locator('[data-demo-id="media/layered"]')
  const album = demo.locator('.ak-media--layered')
  await album.evaluate(async el => {
    await Promise.all(Array.from(el.querySelectorAll('img'), image => image.decode()))
  })
  await demo.getByRole('button', { name: '重播动画' }).click()
  const timelines = await album.evaluate(el => {
    const front = el.querySelector('.ak-media__sheet--front')!
    const back = el.querySelector('.ak-media__sheet--back')!
    const a = front.getAnimations()[0]
    const b = back.getAnimations()[0]
    a.pause(); b.pause()
    a.currentTime = 400; b.currentTime = 400
    return {
      front: getComputedStyle(front).transform,
      back: getComputedStyle(back).transform,
      frontDelay: a.effect!.getTiming().delay,
      backDelay: b.effect!.getTiming().delay,
      frontZ: getComputedStyle(front).zIndex,
      backZ: getComputedStyle(back).zIndex,
    }
  })
  expect(timelines.front).not.toBe(timelines.back)
  expect(timelines.frontDelay).toBe(120)
  expect(timelines.backDelay).toBe(0)
  expect(Number(timelines.frontZ)).toBeGreaterThan(Number(timelines.backZ))
  const settled = await album.evaluate(el => {
    el.getAnimations({ subtree: true }).forEach(a => a.finish())
    return Array.from(el.querySelectorAll('.ak-media__sheet'), sheet => sheet.getBoundingClientRect().toJSON())
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await demo.getByRole('button', { name: '重播动画' }).click()
  expect(await album.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0)
  const reduced = await album.evaluate(el => Array.from(el.querySelectorAll('.ak-media__sheet'), sheet => sheet.getBoundingClientRect().toJSON()))
  for (let i = 0; i < settled.length; i++) {
    expect(reduced[i].width).toBeCloseTo(settled[i].width, 1)
    expect(reduced[i].height).toBeCloseTo(settled[i].height, 1)
  }
})
