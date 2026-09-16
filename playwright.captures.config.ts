import { defineConfig } from '@playwright/test'
import config from './playwright.config'

export default defineConfig(config, {
  testDir: './tests/captures',
  outputDir: './test-results/captures',
  reporter: [
    [process.env.CI ? 'github' : 'list'],
    ['html', { outputFolder: 'playwright-report/captures', open: 'never' }],
  ],
})
