import { expect, test } from '@playwright/test'

for (const width of [1440, 390]) {
  test(`A2UI local agent round trip at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/guide/a2ui')
    await expect(page).toHaveTitle(/A2UI 实验/)
    const demo = page.getByRole('region', { name: 'A2UI 实验终端' })
    await expect(demo.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '25')
    await demo.getByLabel('指挥代号').fill('阿米娅')
    const deploy = demo.getByRole('button', { name: '执行部署', exact: true })
    await deploy.focus()
    await page.keyboard.press('Enter')
    await expect(demo.getByText('阿米娅，部署完成', { exact: true })).toBeVisible()
    await expect(demo.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
    await expect(demo.getByRole('button', { name: '再次部署' })).toBeVisible()
    await demo.getByText('查看消息与操作回传', { exact: true }).click()
    await expect(demo.locator('pre').filter({ hasText: '客户端 → 模拟 Agent' })).toContainText('阿米娅')
    await demo.getByRole('button', { name: '清空界面' }).click()
    await expect(demo.getByRole('progressbar')).toHaveCount(0)
    for (let step = 0; step < 3; step++)
      await demo.getByRole('button', { name: `下一条消息（${step}/3）` }).click()
    await expect(demo.getByLabel('指挥代号')).toHaveValue('博士')
    await expect(demo.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '25')
    await expect(demo.getByRole('alert')).toHaveCount(0)
    expect(await page.locator('vite-error-overlay').count()).toBe(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    expect(errors).toEqual([])
    await page.screenshot({ path: `/tmp/ak-ui-a2ui-${width}.png`, fullPage: false })
  })
}
