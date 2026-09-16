import { expect, test } from '@playwright/test'
import { examples } from '../../examples/index'

// Separate from the default suite: these attachments are for human review.
for (const example of examples) {
  test(`${example.id} — ${example.title}`, async ({ page }, testInfo) => {
    await page.goto('/__visual/')
    const canvas = page.locator(`[data-demo-id="${example.id}"] .ak-demo-preview__canvas`)
    await expect(canvas).toBeVisible()
    await canvas.scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready.then(() => {}))
    await testInfo.attach(example.id, {
      body: await canvas.screenshot({ animations: 'disabled', type: 'webp' }),
      contentType: 'image/webp',
    })
  })
}

test('vue/registry — Interactive Vue adapters', async ({ page }, testInfo) => {
  await page.goto('/registry/')
  const demo = page.locator('[data-registry-demo]')
  await expect(demo.getByRole('button', { name: '开始行动' })).toBeVisible()
  await page.evaluate(() => document.fonts.ready.then(() => {}))
  await testInfo.attach('vue/registry', {
    body: await demo.screenshot({ animations: 'disabled', type: 'webp' }),
    contentType: 'image/webp',
  })
})
