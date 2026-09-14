import { mkdir } from 'node:fs/promises'

import { expect, test } from '@playwright/test'
import type { Page, TestInfo } from '@playwright/test'

import { examples } from '../../examples/index'

async function waitForFonts(page: Page) {
  await page.evaluate(async () => {
    if (document.fonts)
      await document.fonts.ready
  })

  let previousHeight = -1
  let stableSamples = 0

  for (let sample = 0; sample < 20; sample++) {
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    stableSamples = height === previousHeight ? stableSamples + 1 : 0

    if (stableSamples >= 3)
      return

    previousHeight = height
    await page.waitForTimeout(100)
  }

  throw new Error('Page layout did not stabilize after documentation fonts loaded')
}

async function useSnapshotFonts(page: Page) {
  // Pin visual baselines to the Linux image's fallback fonts. A remote stylesheet
  // can arrive after document.fonts.ready and change line wraps during capture.
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({
    contentType: 'text/css',
    body: '',
  }))
}

async function waitForHomepageDemo(page: Page) {
  const demo = page.locator('[data-demo-id="home/button-base"]')
  await expect(demo.locator('.ak-demo-preview__canvas .ak-button')).toHaveCount(3)
  await demo.scrollIntoViewIfNeeded()
}

test('renders the visual homepage', async ({ page, browserName }) => {
  await useSnapshotFonts(page)
  await page.goto('/')
  await waitForHomepageDemo(page)
  await waitForFonts(page)

  await expect(page.getByRole('link', { name: /^浏览组件/ })).toHaveAttribute('href', '/components/')
  await expect(page.getByRole('link', { name: '查看完整演示 →', exact: true })).toHaveAttribute('href', '/showcase/')
  await expect(page.locator('[data-demo-id="home/button-base"]')).toHaveAttribute('inert', '')

  if (browserName === 'chromium')
    await expect(page.locator('.ak-home')).toHaveScreenshot('home-desktop.webp')
  else
    await expect(page.locator('.ak-home')).toBeVisible()
})

test('renders the mobile homepage', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await useSnapshotFonts(page)
  await page.goto('/')
  await waitForHomepageDemo(page)
  await waitForFonts(page)
  if (browserName === 'chromium')
    await expect(page.locator('.ak-home')).toHaveScreenshot('home-mobile.webp')
  else
    await expect(page.locator('.ak-home')).toBeVisible()
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

test('groups AI, CSS, and Vue onboarding into one navigation system', async ({ page }) => {
  await page.goto('/guide/')

  await expect(page.locator('.VPNavBarTitle a')).toHaveAttribute('href', '/')
  await expect(page.locator('.VPNavBarMenuLink').filter({ hasText: '概览' })).toHaveCount(0)
  await expect(page.locator('.VPNavBarMenuGroup').filter({ hasText: '接入方式' })).toHaveCount(1)
  await expect(page.locator('.VPSidebar').getByRole('link', { name: /AI Skill/ })).toBeVisible()
  await expect(page.locator('.VPSidebar').getByRole('link', { name: 'CSS Core' })).toBeVisible()
  await expect(page.locator('.VPSidebar').getByRole('link', { name: 'Vue Registry', exact: true })).toBeVisible()
  await expect(page.locator('.ak-entry-card')).toHaveCount(3)

  await page.locator('.ak-entry-card--ai').click()
  await expect(page).toHaveURL(/\/guide\/ai-skill(?:\.html)?$/)

  await page.goto('/guide/')
  await page.locator('.ak-entry-card--vue').click()
  await expect(page).toHaveURL(/\/registry\/$/)
  await expect(page.locator('.VPSidebar').getByRole('link', { name: 'CSS Core' })).toBeVisible()
  await expect(page.locator('.VPSidebar').getByRole('link', { name: 'Vue Registry', exact: true })).toBeVisible()
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

test('aligns sanity card decorations with its background', async ({ page }) => {
  await page.goto('/components/ak-san.html')

  const card = page.locator('[data-demo-id="san/basic"] .ak-san-container')
  await expect(card).toBeVisible()

  const desktopGeometry = await card.evaluate((element) => {
    const cardBounds = element.getBoundingClientRect()
    const border = getComputedStyle(element, '::before')
    const iconBounds = element.querySelector<SVGElement>(':scope > .info .ak-icon')!.getBoundingClientRect()

    return {
      borderRight: Math.round(Number.parseFloat(border.right)),
      cardWidth: Math.round(cardBounds.width),
      iconRightInset: Math.round(cardBounds.right - iconBounds.right),
    }
  })

  expect(desktopGeometry).toEqual({
    borderRight: 0,
    cardWidth: 528,
    iconRightInset: 40,
  })

  await page.setViewportSize({ width: 390, height: 844 })

  const mobileGeometry = await card.evaluate((element) => {
    const cardBounds = element.getBoundingClientRect()
    const border = getComputedStyle(element, '::before')
    const iconBounds = element.querySelector<SVGElement>(':scope > .info .ak-icon')!.getBoundingClientRect()

    return {
      borderRight: Math.round(Number.parseFloat(border.right)),
      cardRightOverflow: Math.max(0, Math.round(cardBounds.right - document.documentElement.clientWidth)),
      iconRightInset: Math.round(cardBounds.right - iconBounds.right),
    }
  })

  expect(mobileGeometry).toEqual({
    borderRight: 0,
    cardRightOverflow: 0,
    iconRightInset: 40,
  })
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

test('gives buttons visual feedback on hover', async ({ page }) => {
  await page.goto('/components/ak-button.html')

  const button = page.locator('[data-demo-id="button/base"] .ak-button').first()

  await button.hover()
  await expect(button).toHaveCSS('filter', 'brightness(1.08)')
  await expect(button).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, -2)')
})

test('executes scripts from directly rendered HTML examples', async ({ page }) => {
  await page.goto('/components/ak-object.html')

  const demo = page.locator('[data-demo-id="object/cube"]')

  await expect(demo.locator('.ak-demo-preview__canvas #tactical-map .ak-cube')).toHaveCount(30)
})

test('rotates a single cube and keeps face decorations centered', async ({ page }) => {
  await page.goto('/components/ak-object.html')
  const preview = page.locator('#cube-preview')
  const cube = preview.locator('.ak-cube')
  await expect(cube).toHaveCount(1)

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 })
    await preview.getByRole('button', { name: '正面', exact: true }).click()
    const geometry = await preview.locator('.front').evaluate(face => {
      const icon = face.querySelector('svg')!.getBoundingClientRect()
      const rect = face.getBoundingClientRect()
      const lines = face.querySelector<HTMLElement>('.ak-face__lines')!
      return {
        dx: icon.x + icon.width / 2 - rect.x - rect.width / 2,
        dy: icon.y + icon.height / 2 - rect.y - rect.height / 2,
        lines: [lines.offsetLeft, lines.offsetTop, lines.offsetWidth, lines.offsetHeight],
        content: [0, 0, face.clientWidth, face.clientHeight],
      }
    })
    expect(Math.abs(geometry.dx)).toBeLessThan(0.1)
    expect(Math.abs(geometry.dy)).toBeLessThan(0.1)
    expect(geometry.lines).toEqual(geometry.content)

    await preview.getByRole('slider', { name: 'X 轴旋转' }).focus()
    await page.keyboard.press('ArrowRight')
    await expect(preview.getByRole('slider', { name: 'X 轴旋转' })).toHaveValue('1')
    await expect(cube).toHaveAttribute('style', /rotateX\(1deg\)/)
    await preview.getByRole('button', { name: '背面', exact: true }).click()
    await expect(preview.getByRole('slider', { name: 'Y 轴旋转' })).toHaveValue('180')
    await preview.getByRole('button', { name: '重置', exact: true }).click()
    await expect(preview.getByRole('slider', { name: 'X 轴旋转' })).toHaveValue('-20')
    await expect(preview.getByRole('slider', { name: 'Y 轴旋转' })).toHaveValue('30')
    await expect(preview.getByRole('slider', { name: 'Z 轴旋转' })).toHaveValue('0')
  }
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
  await expect(demo.locator('.ak-dashboard__layer')).toHaveCount(6)
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
  await expect.poll(async () => {
    const box = await page.getByRole('dialog', { name: '今日任务' }).boundingBox()
    const viewport = page.viewportSize()!
    return box ? Math.max(
      Math.abs(box.x + box.width / 2 - viewport.width / 2),
      Math.abs(box.y + box.height / 2 - viewport.height / 2),
    ) : Infinity
  }).toBeLessThan(2)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: '今日任务' })).not.toBeVisible()

  await demo.getByRole('button', { name: '查看资源详情' }).click()
  await expect(page.locator('#resource-overview')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#resource-overview')).not.toBeVisible()

  // Linux WebKit can close the page while Playwright waits for this animated
  // dashboard to be stable. Scroll directly, then verify the pointer target.
  await dashboard.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
  const dashboardBounds = await dashboard.boundingBox()
  expect(dashboardBounds).not.toBeNull()
  const targetX = dashboardBounds!.x + dashboardBounds!.width * 0.9
  const targetY = dashboardBounds!.y + dashboardBounds!.height * 0.5
  expect(targetX).toBeGreaterThan(0)
  expect(targetX).toBeLessThan(page.viewportSize()!.width)
  expect(targetY).toBeGreaterThan(0)
  expect(targetY).toBeLessThan(page.viewportSize()!.height)
  await page.mouse.move(0, 0)
  const rightLayer = demo.locator('.ak-dashboard__right-layer')
  await expect.poll(() => rightLayer.evaluate(layer => Number.parseFloat(getComputedStyle(layer).getPropertyValue('--ak-layer-x')))).toBe(0)
  const motionBefore = await rightLayer.evaluate(layer => getComputedStyle(layer).getPropertyValue('--ak-layer-x'))
  await page.mouse.move(targetX, targetY)
  await expect.poll(() => demo.locator('.ak-dashboard__right-layer').evaluate(layer => getComputedStyle(layer).getPropertyValue('--ak-layer-x'))).not.toBe(motionBefore)

  const depths = await demo.locator('.ak-dashboard__background-layer, .ak-dashboard__character-layer, .ak-dashboard__right-layer').evaluateAll(layers => layers.map(layer => Math.abs(Number.parseFloat(getComputedStyle(layer).getPropertyValue('--ak-layer-x')))))
  expect(depths[0]).toBeGreaterThan(0)
  expect(depths[1]).toBeGreaterThan(depths[0])
  expect(depths[2]).toBeGreaterThan(depths[1])
  await expect.poll(() => demo.locator('.ak-dashboard__character').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(demo.locator('.ak-dashboard__character-layer')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
  await expect(demo.locator('.ak-dashboard__mote').first()).toHaveCSS('animation-name', 'none')
  await expect.poll(() => demo.locator('.ak-dashboard__right-layer').evaluate(layer => Number.parseFloat(getComputedStyle(layer).getPropertyValue('--ak-layer-x')))).toBe(0)
})

test('renders the reusable terminal loading state separately', async ({ page }) => {
  await page.goto('/showcase/loading.html')

  const loading = page.locator('[data-loading-screen]')
  const track = loading.locator('.ak-loading-track')
  const runner = loading.locator('.ak-loading-track__runner')

  await expect(loading).toBeVisible()
  await expect(loading).toHaveAttribute('data-state', 'loading')
  await expect(loading.locator('.ak-loading-screen__backdrop')).toHaveAttribute('src', 'https://assets.yunyoujun.cn/ak-ui/assets/img/bg/loading-terminal-v2-201dae3c90d5.webp')
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
  // This is one batch over the whole catalog, not a single interaction.
  // Linux WebKit can spend over two minutes scrolling and encoding all captures.
  test.setTimeout(300_000)
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
