import { mkdir } from 'node:fs/promises'

import { expect, test } from '@playwright/test'
import type { Page, TestInfo } from '@playwright/test'

import { examples } from '../../examples/index'

async function waitForFonts(page: Page) {
  await page.evaluate(() => document.fonts?.ready)
}

async function waitForHomepageDemo(page: Page) {
  const demo = page.locator('[data-demo-id="home/button-base"]')
  await expect(demo).toHaveClass(/is-loaded/)
  const frame = page.frameLocator('iframe[title="Operation controls preview"]')
  await frame.locator('body').waitFor()
  await frame.locator('body').evaluate(() => document.fonts?.ready)
  await demo.scrollIntoViewIfNeeded()
}

test('renders the visual homepage', async ({ page }) => {
  await page.goto('/')
  await waitForFonts(page)
  await waitForHomepageDemo(page)
  await expect(page).toHaveScreenshot('home-desktop.webp', { fullPage: true })
})

test('renders the mobile homepage', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await waitForFonts(page)
  await waitForHomepageDemo(page)
  await expect(page).toHaveScreenshot('home-mobile.webp', { fullPage: true })
})

test('shows source alongside component previews', async ({ page }) => {
  await page.goto('/components/ak-button.html')

  const demo = page.locator('[data-demo-id="button/base"]')
  const source = demo.locator('.ak-demo-preview__source')

  await expect(source).toHaveAttribute('open', '')
  await expect(source.locator('pre')).toBeVisible()
  await expect(source.locator('pre')).toContainText('class="ak-button')
})

test('captures every framework-agnostic HTML example', async ({ page }, testInfo: TestInfo) => {
  await page.goto('/__visual/')

  const capturesDir = testInfo.outputPath('component-captures')
  await mkdir(capturesDir, { recursive: true })

  for (const example of examples) {
    const demo = page.locator(`[data-demo-id="${example.id}"]`)
    await demo.scrollIntoViewIfNeeded()
    await expect(demo).toHaveClass(/is-loaded/)

    const frame = page.frameLocator(`iframe[title="${example.title} preview"]`)
    await frame.locator('body').waitFor()
    await frame.locator('body').evaluate(() => document.fonts?.ready)

    const captureName = `${example.id.replaceAll('/', '--')}.webp`
    const capture = await demo.locator('.ak-demo-preview__stage').screenshot({
      animations: 'disabled',
      path: `${capturesDir}/${captureName}`,
      type: 'webp',
    })

    expect(capture.byteLength).toBeGreaterThan(1_000)
  }
})
