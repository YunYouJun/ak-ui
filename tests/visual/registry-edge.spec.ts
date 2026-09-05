import { expect, test } from '@playwright/test'

test('normalizes nonfinite values, decimal steps and invalid ranges', async ({ page }) => {
  await page.goto('/__visual/registry')
  const numeric = page.getByRole('region', { name: 'Numeric edges' })
  const input = numeric.getByRole('spinbutton')
  await expect(input).toHaveValue('0')
  for (let count = 0; count < 3; count++)
    await numeric.getByRole('button', { name: '增加' }).click()
  await expect(input).toHaveValue('0.3')
  await expect(numeric.getByLabel('Model value')).toHaveText('0.3')
  await expect(numeric.getByRole('progressbar', { name: 'Progress edges' })).toHaveAttribute('aria-valuenow', '0')
  await numeric.getByRole('button', { name: 'Invert bounds' }).click()
  await expect(input).toHaveValue('10')
  for (const bar of await numeric.getByRole('progressbar').all()) {
    await expect(bar).toHaveAttribute('aria-valuemin', '10')
    await expect(bar).toHaveAttribute('aria-valuemax', '10')
    await expect(bar).toHaveAttribute('aria-valuenow', '10')
    expect(await bar.getAttribute('style')).not.toContain('NaN')
  }
  await numeric.getByRole('button', { name: 'Toggle disabled' }).click()
  await expect(input).toBeDisabled()
  await expect(numeric.getByRole('button', { name: '增加' })).toBeDisabled()
})

test('recovers selection after item removal and keeps panels keyboard reachable', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/__visual/registry')
  const tabs = page.getByRole('region', { name: 'Dynamic tabs' })
  await expect(tabs.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true')
  await tabs.getByRole('button', { name: 'Remove Beta' }).click()
  const alpha = tabs.getByRole('tab', { name: 'Alpha' })
  await expect(alpha).toHaveAttribute('aria-selected', 'true')
  await alpha.press('End')
  await expect(tabs.getByRole('tab', { name: 'Gamma' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(tabs.getByRole('tabpanel', { name: 'Gamma' })).toBeFocused()
  await tabs.getByRole('button', { name: 'Remove all' }).click()
  await expect(tabs.getByRole('tab')).toHaveCount(0)
  expect(errors).toEqual([])
})
