import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '../pages/authentication/login.page';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  
  if (!baseURL) {
    throw new Error('Base URL is not configured in playwright.config.ts');
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  
  if (!email || !password) {
    throw new Error('Missing USER_EMAIL or USER_PASSWORD in environment variables');
  }

  const loginPage = new LoginPage(page);
  
  try {
    await page.goto(baseURL as string);
    await page.waitForLoadState('networkidle');
    await loginPage.signIn(email, password);
    await page.waitForTimeout(3000);
    await context.storageState({ path: storageState as string });
    
    console.log('Authentication successful. Storage state saved.');
  } catch (error) {
    console.error('Authentication failed:', error);
    await page.screenshot({ path: 'setup-auth-failure.png', fullPage: true });
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;