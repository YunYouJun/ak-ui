import { mkdir } from 'node:fs/promises'

import { expect, test } from '@playwright/test'
import type { Page, TestInfo } from '@playwright/test'

import { examples } from '../../examples/index'

async function waitForFonts(page: Page) {
  await page.evaluate(async () => {
    if (!document.fonts)
      return

    await Promise.all([
      document.fonts.load('700 16px Syncopate', 'AKUI'),
      document.fonts.load('900 16px "Noto Sans SC"', '界面模块'),
      document.fonts.load('900 16px "Noto Serif SC"', '作战'),
    ])
    await document.fonts.ready
  })
}

async function waitForHomepageDemo(page: Page) {
  const demo = page.locator('[data-demo-id="home/button-base"]')
  await expect(demo.locator('.ak-demo-preview__canvas .ak-button')).toHaveCount(3)
  await demo.scrollIntoViewIfNeeded()
}

test('renders the visual homepage', async ({ page }) => {
  await page.goto('/')
  await waitForHomepageDemo(page)
  await waitForFonts(page)
  await expect(page).toHaveScreenshot('home-desktop.webp', { fullPage: true })
})

test('renders the mobile homepage', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await waitForHomepageDemo(page)
  await waitForFonts(page)
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

test('keeps foundation color and type specimens compact and legible', async ({ page }) => {
  await page.goto('/components/')
  await waitForFonts(page)

  const colors = page.locator('[data-demo-id="foundation/colors"]')
  const typography = page.locator('[data-demo-id="foundation/typography"]')

  await expect(colors.locator('.ak-color-swatch')).toHaveCount(5)
  await expect(colors.locator('.ak-color-swatch code').first()).toHaveCSS('color', 'rgb(17, 19, 21)')
  await expect(colors.locator('.ak-demo-preview__source')).not.toHaveAttribute('open', '')
  await expect(typography.locator('.ak-demo-preview__source')).not.toHaveAttribute('open', '')

  const rhythm = await typography.evaluate((demo) => {
    const serifTitle = demo.querySelector<HTMLElement>('.ak-font-serif.ak-text--title')!
    const serifDescription = demo.querySelector<HTMLElement>('.ak-font-serif:not(.ak-text--title)')!
    const sansTitle = demo.querySelector<HTMLElement>('.ak-font-sans-serif.ak-text--title')!
    const sansDescription = demo.querySelector<HTMLElement>('.ak-font-sans-serif:not(.ak-text--title)')!

    return {
      serifDescriptionGap: Math.round(serifDescription.getBoundingClientRect().top - serifTitle.getBoundingClientRect().bottom),
      sampleGap: Math.round(sansTitle.getBoundingClientRect().top - serifDescription.getBoundingClientRect().bottom),
      sansDescriptionGap: Math.round(sansDescription.getBoundingClientRect().top - sansTitle.getBoundingClientRect().bottom),
    }
  })

  expect(rhythm).toEqual({
    serifDescriptionGap: 6,
    sampleGap: 24,
    sansDescriptionGap: 6,
  })

  const referenceItems = page.locator('.ak-item-palette figure')
  await expect(referenceItems).toHaveCount(5)

  const referenceRows = await referenceItems.evaluateAll(items => items.map(item => Math.round(item.getBoundingClientRect().top)))
  expect(new Set(referenceRows).size).toBe(1)

  await page.setViewportSize({ width: 390, height: 844 })

  const mobileLayout = await page.evaluate(() => {
    const colorCanvas = document.querySelector<HTMLElement>('[data-demo-id="foundation/colors"] .ak-demo-preview__canvas')!
    const paletteItems = Array.from(document.querySelectorAll<HTMLElement>('.ak-item-palette figure'))
    const lastItem = paletteItems.at(-1)!.getBoundingClientRect()
    const palette = document.querySelector<HTMLElement>('.ak-item-palette')!.getBoundingClientRect()

    return {
      colorCanvasHeight: colorCanvas.clientHeight,
      colorCanvasScrollHeight: colorCanvas.scrollHeight,
      lastItemCenterDelta: Math.round(Math.abs(lastItem.left + lastItem.width / 2 - (palette.left + palette.width / 2))),
    }
  })

  expect(mobileLayout.colorCanvasScrollHeight).toBeLessThanOrEqual(mobileLayout.colorCanvasHeight)
  expect(mobileLayout.lastItemCenterDelta).toBeLessThanOrEqual(1)
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

test('supports native form fields and choice controls', async ({ page }) => {
  await page.goto('/components/ak-form.html')

  const textDemo = page.locator('[data-demo-id="form/text"]')
  const choiceDemo = page.locator('[data-demo-id="form/choice"]')
  const selectDemo = page.locator('[data-demo-id="form/select"]')
  const callsign = textDemo.getByRole('textbox', { name: '干员代号' })
  const notes = textDemo.getByRole('textbox', { name: '行动备注' })

  await callsign.fill('Amiya')
  await notes.fill('Proceed to the command room.')
  await expect(callsign).toHaveValue('Amiya')
  await expect(notes).toHaveValue('Proceed to the command room.')
  await callsign.focus()
  await expect(callsign).toHaveCSS('border-color', 'rgb(0, 152, 220)')

  const support = choiceDemo.getByRole('checkbox', { name: '携带支援单位' })
  const betaSquad = choiceDemo.getByRole('radio', { name: 'Beta 编队' })
  const auto = choiceDemo.getByRole('switch', { name: '自动部署' })
  const operation = selectDemo.getByRole('combobox', { name: '选择行动' })

  await support.check()
  await betaSquad.check()
  await auto.check()
  await operation.selectOption('4-10')
  await expect(support).toBeChecked()
  await expect(betaSquad).toBeChecked()
  await expect(auto).toBeChecked()
  await expect(operation).toHaveValue('4-10')
})

test('uses the native dialog lifecycle', async ({ page }) => {
  await page.goto('/components/ak-dialog.html')

  const dialog = page.getByRole('dialog', { name: '行动简报' })
  await page.getByRole('button', { name: '打开行动简报' }).click()
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAttribute('open', '')

  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
})

test('uses native popover state for tactical details and hints', async ({ page }) => {
  await page.goto('/components/ak-popover.html')

  const popover = page.locator('#deployment-popover')
  const tooltip = page.getByRole('tooltip')
  const tooltipTrigger = page.getByRole('button', { name: '查看部署费用说明' })

  await page.getByRole('button', { name: '查看部署情报' }).click()
  await expect(popover).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(popover).not.toBeVisible()

  await tooltipTrigger.hover()
  await expect(tooltip).toBeVisible()
  await page.mouse.move(0, 0)
  await expect(tooltip).not.toBeVisible()
  await tooltipTrigger.focus()
  await expect(tooltip).toBeVisible()
})

test('operates the complete Rhodes Island terminal dashboard', async ({ page }) => {
  await page.goto('/showcase/')

  const demo = page.locator('[data-demo-id="showcase/main"]')
  const dashboard = demo.locator('.ak-dashboard')
  const commands = demo.locator('.ak-dashboard__right-menu .ak-command')

  await expect(dashboard).toBeVisible()
  await expect(demo.locator('[data-loading-screen]')).toHaveCount(0)
  await expect(demo.locator('.ak-dashboard__layer')).toHaveCount(5)
  await expect(commands).toHaveCount(9)
  await expect(demo.locator('.ak-counter')).toHaveCount(3)
  await expect(demo.locator('.ak-san-container--terminal')).toContainText('132')
  await expect(demo.locator('.ak-san-container--terminal')).toContainText('理智/135')
  await expect(demo.locator('.ak-san-container--terminal')).toContainText('急转直下')
  await expect(demo.locator('.ak-dashboard__news')).toContainText('新章开启')

  const commandInset = await commands.first().evaluate((command) => {
    const label = command.querySelector<HTMLElement>('.ak-command__label')!

    return Math.round(label.getBoundingClientRect().left - command.getBoundingClientRect().left)
  })
  expect(commandInset).toBeGreaterThanOrEqual(10)

  await demo.getByRole('button', { name: '任务' }).click()
  await expect(page.getByRole('dialog', { name: '今日任务' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: '今日任务' })).not.toBeVisible()

  await demo.getByRole('button', { name: '查看资源详情' }).click()
  await expect(page.locator('#resource-overview')).toBeVisible()
  await page.keyboard.press('Escape')

  const motionBefore = await demo.locator('.ak-dashboard__right-layer').evaluate(layer => getComputedStyle(layer).getPropertyValue('--ak-layer-x'))
  await dashboard.scrollIntoViewIfNeeded()
  const dashboardBounds = await dashboard.boundingBox()
  expect(dashboardBounds).not.toBeNull()
  await page.mouse.move(
    dashboardBounds!.x + dashboardBounds!.width * 0.9,
    dashboardBounds!.y + dashboardBounds!.height * 0.5,
  )
  await expect.poll(() => demo.locator('.ak-dashboard__right-layer').evaluate(layer => getComputedStyle(layer).getPropertyValue('--ak-layer-x'))).not.toBe(motionBefore)
})

test('renders the reusable terminal loading state separately', async ({ page }) => {
  await page.goto('/showcase/loading.html')

  const loading = page.locator('[data-loading-screen]')
  const track = loading.locator('.ak-loading-track')
  const runner = loading.locator('.ak-loading-track__runner')

  await expect(loading).toBeVisible()
  await expect(loading).toHaveAttribute('data-state', 'loading')
  await expect(loading.locator('.ak-loading-screen__backdrop')).toHaveAttribute('src', '/img/bg/loading-terminal-v2.png')
  await expect(track).toBeVisible()
  await expect(runner).toHaveCSS('animation-name', 'ak-loading-track-move')
})

test('asks portrait screens to rotate the terminal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/showcase/')

  const dashboard = page.locator('[data-demo-id="showcase/main"] .ak-dashboard')

  await expect(dashboard.locator('.ak-dashboard__rotate')).toBeVisible()
  await expect(dashboard.locator('.ak-dashboard__rotate')).toContainText('请使用横屏浏览')
  await expect(dashboard.locator('.ak-dashboard__scene')).not.toBeVisible()
})

test('renders interactive Vue registry adapters', async ({ page }, testInfo: TestInfo) => {
  await page.goto('/registry/')

  const demo = page.locator('[data-registry-demo]')
  const launchButton = demo.getByRole('button', { name: '开始行动' })
  const input = demo.getByRole('spinbutton', { name: '部署单位' })
  const cardHeader = demo.locator('[data-slot="ak-card-header"]')
  const cardTitle = demo.locator('[data-slot="ak-card-title"]')

  await expect(demo.locator('iframe')).toHaveCount(0)
  await expect(cardHeader).toHaveCSS('display', 'grid')
  await expect(cardTitle).toHaveCSS('font-size', '18px')
  await expect(input).toHaveCSS('box-sizing', 'border-box')
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
