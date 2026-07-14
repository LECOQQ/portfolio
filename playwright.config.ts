import { defineConfig, devices } from '@playwright/test'

const devPort = process.env.DEV_PORT ?? '3008'

/**
 * Playwright end-to-end test configuration.
 * Tests live in tests/e2e/. Run with: pnpm test:e2e
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 1 } : {}),
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: `http://localhost:${devPort}`,
    trace: 'on-first-retry',
    headless: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `pnpm dev --port ${devPort}`,
    url: `http://localhost:${devPort}`,
    reuseExistingServer: !process.env.CI,
  },
})
