import { mkdir } from 'node:fs/promises'

import { expect, test } from '@playwright/test'
import type { Page, TestInfo } from '@playwright/test'

import { examples } from '../../examples/index'

async function waitForFonts(page: Page) {
  await page.evaluate(() => document.fonts?.ready)
}

async function waitForHomepageDemo(page: Page) {
  const demo = page.locator('[data-demo-id="home/button-base"]')
  await expect(demo.locator('.ak-demo-preview__canvas .ak-button')).toHaveCount(3)
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

test('keeps the light theme coordinated and legible', async ({ page }) => {
  await page.goto('/')
  await page.locator('.VPSwitchAppearance').first().click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)

  const homepagePalette = await page.locator('.ak-home').evaluate((home) => {
    const body = getComputedStyle(document.body)
    const surface = getComputedStyle(home)
    const bounds = home.getBoundingClientRect()

    return {
      bodyBackground: body.backgroundColor,
      homeBackground: surface.backgroundColor,
      viewportWidth: document.documentElement.clientWidth,
      width: Math.round(bounds.width),
    }
  })

  expect(homepagePalette.homeBackground).toBe(homepagePalette.bodyBackground)
  expect(homepagePalette.width).toBe(homepagePalette.viewportWidth)

  await page.goto('/components/ak-form.html')
  const formControls = page.locator('[data-demo-id="form/input-number"] .ak-input-number button')
  await expect(formControls).toHaveCount(4)

  for (const control of await formControls.all())
    await expect(control).toHaveCSS('color', 'rgb(211, 211, 211)')
})

test('groups CSS and Vue onboarding into one navigation system', async ({ page }) => {
  await page.goto('/guide/')

  await expect(page.locator('.VPNavBarTitle a')).toHaveAttribute('href', '/')
  await expect(page.locator('.VPNavBarMenuLink').filter({ hasText: '概览' })).toHaveCount(0)
  await expect(page.locator('.VPNavBarMenuGroup').filter({ hasText: '开始使用' })).toHaveCount(1)
  await expect(page.locator('.VPSidebar').getByRole('link', { name: 'CSS Core' })).toBeVisible()
  await expect(page.locator('.VPSidebar').getByRole('link', { name: 'Vue Registry' })).toBeVisible()
  await expect(page.locator('.ak-entry-card')).toHaveCount(2)

  await page.locator('.ak-entry-card--vue').click()
  await expect(page).toHaveURL(/\/registry\/$/)
  await expect(page.locator('.VPSidebar').getByRole('link', { name: 'CSS Core' })).toBeVisible()
  await expect(page.locator('.VPSidebar').getByRole('link', { name: 'Vue Registry' })).toBeVisible()
})

test('centers divider content vertically', async ({ page }) => {
  await page.goto('/components/ak-divider.html')

  const alignment = await page.locator('[data-demo-id="divider/basic"]').evaluate((demo) => {
    const canvas = demo.querySelector<HTMLElement>('.ak-demo-preview__canvas')!
    const divider = demo.querySelector<HTMLElement>('.ak-divider')!
    const icon = divider.querySelector<SVGElement>('.ak-icon')!
    const label = Array.from(divider.querySelector('span')!.childNodes)
      .find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())!
    const labelRange = document.createRange()
    labelRange.selectNodeContents(label)

    const center = (rect: DOMRect) => rect.top + rect.height / 2

    return {
      contentDelta: Math.abs(center(icon.getBoundingClientRect()) - center(labelRange.getBoundingClientRect())),
      surfaceDelta: Math.abs(center(divider.getBoundingClientRect()) - center(canvas.getBoundingClientRect())),
    }
  })

  expect(alignment.surfaceDelta).toBeLessThanOrEqual(1)
  expect(alignment.contentDelta).toBeLessThanOrEqual(1)
})

test('shows source alongside component previews', async ({ page }) => {
  await page.goto('/components/ak-button.html')

  const demo = page.locator('[data-demo-id="button/base"]')
  const source = demo.locator('.ak-demo-preview__source')

  await expect(demo.locator('iframe')).toHaveCount(0)
  await expect(demo.locator('.ak-demo-preview__loading')).toHaveCount(0)
  await expect(demo.locator('.ak-demo-preview__canvas .ak-button')).toHaveCount(3)
  await expect(source).toHaveAttribute('open', '')
  await expect(source.locator('pre')).toBeVisible()
  await expect(source.locator('pre')).toContainText('class="ak-button')
})

test('executes scripts from directly rendered HTML examples', async ({ page }) => {
  await page.goto('/components/ak-object.html')

  const demo = page.locator('[data-demo-id="object/cube"]')

  await expect(demo.locator('.ak-demo-preview__canvas #tactical-map .ak-cube')).toHaveCount(30)
})

test('supports keyboard and pointer interaction in terminal navigation', async ({ page }) => {
  await page.goto('/components/ak-tabs.html')

  const demo = page.locator('[data-demo-id="tabs/basic"]')
  const tabs = demo.getByRole('tab')
  const squadTab = demo.getByRole('tab', { name: '编队' })
  const rewardTab = demo.getByRole('tab', { name: '报酬' })

  await squadTab.click()
  await expect(squadTab).toHaveAttribute('aria-selected', 'true')
  await expect(demo.getByRole('tabpanel', { name: '编队' })).toBeVisible()

  await squadTab.press('ArrowRight')
  await expect(rewardTab).toBeFocused()
  await expect(rewardTab).toHaveAttribute('aria-selected', 'true')
  await expect(tabs).toHaveCount(3)

  const autoMode = demo.getByRole('button', { name: '代理' })
  await autoMode.click()
  await expect(autoMode).toHaveAttribute('aria-pressed', 'true')
})

test('renders interactive Vue registry adapters', async ({ page }, testInfo: TestInfo) => {
  await page.goto('/registry/')

  const demo = page.locator('[data-registry-demo]')
  const launchButton = demo.getByRole('button', { name: '开始行动' })
  const input = demo.getByRole('spinbutton', { name: '部署单位' })

  await expect(demo.locator('iframe')).toHaveCount(0)
  await launchButton.click()
  await expect(demo.getByRole('button', { name: '行动已接管' })).toBeVisible()
  await demo.getByRole('button', { name: '增加' }).click()
  await expect(input).toHaveValue('4')
  await input.fill('-5')
  await expect(input).toHaveValue('0')
  await demo.getByRole('button', { name: '最多' }).click()
  await expect(input).toHaveValue('12')
  await expect(demo.locator('[data-deployment-count]')).toHaveText('12')

  const capturesDir = testInfo.outputPath('component-captures')
  await mkdir(capturesDir, { recursive: true })
  const capture = await demo.screenshot({
    animations: 'disabled',
    path: `${capturesDir}/vue--registry.webp`,
    type: 'webp',
  })

  expect(capture.byteLength).toBeGreaterThan(1_000)
})

test('renders extended Vue registry adapters', async ({ page }) => {
  await page.goto('/registry/')

  const demo = page.locator('[data-registry-extended]')
  const tabs = demo.getByRole('tab')
  const progress = demo.getByRole('progressbar', { name: 'Deployment' })

  await expect(demo.locator('[data-slot="ak-tag"]')).toHaveCount(2)
  await expect(demo.locator('[data-slot="ak-status"]')).toHaveCount(1)
  await expect(progress).toHaveAttribute('aria-valuenow', '3')
  await expect(tabs).toHaveCount(3)

  await demo.getByRole('tab', { name: '编队' }).click()
  await expect(demo.getByRole('tabpanel', { name: '编队' })).toBeVisible()

  const autoMode = demo.getByRole('button', { name: '代理' })
  await autoMode.click()
  await expect(autoMode).toHaveAttribute('aria-pressed', 'true')
})

test('captures every framework-agnostic HTML example', async ({ page }, testInfo: TestInfo) => {
  await page.goto('/__visual/')

  const capturesDir = testInfo.outputPath('component-captures')
  await mkdir(capturesDir, { recursive: true })

  for (const example of examples) {
    const demo = page.locator(`[data-demo-id="${example.id}"]`)
    await demo.scrollIntoViewIfNeeded()
    const canvas = demo.locator('.ak-demo-preview__canvas')
    await expect(canvas).toBeVisible()
    await waitForFonts(page)

    const captureName = `${example.id.replaceAll('/', '--')}.webp`
    const capture = await canvas.screenshot({
      animations: 'disabled',
      path: `${capturesDir}/${captureName}`,
      type: 'webp',
    })

    expect(capture.byteLength).toBeGreaterThan(1_000)
  }
})
