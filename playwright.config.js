import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60000,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5187',
    viewport: { width: 390, height: 844 },
    channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: [{
    command: 'npm run dev -- --host 127.0.0.1 --port 5187 --strictPort',
    url: 'http://127.0.0.1:5187',
    env: { VITE_API_URL: process.env.GALAE_TEST_API_URL || 'http://127.0.0.1:8080/api/v1' },
    reuseExistingServer: false,
  }, ...(process.env.GALAE_MAIN_REFERENCE_DIR ? [{
    command: 'npm run dev -- --host 127.0.0.1 --port 5188 --strictPort',
    cwd: process.env.GALAE_MAIN_REFERENCE_DIR,
    url: 'http://127.0.0.1:5188',
    reuseExistingServer: false,
  }] : [])],
});
