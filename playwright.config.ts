import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  globalSetup: './setup/global-setup.ts',
  
  use: {
    baseURL: process.env.BASE_URL,
    storageState: 'playwright/.auth/user.json',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Add other browsers if needed
  ],
  
  timeout: 30000,
  
  expect: {
    timeout: 5000,
  },
});