// setup/global-setup.ts
import { chromium } from '@playwright/test';
import { LoginPage } from '../pages';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export default async function globalSetup() {
  const baseURL = process.env.BASE_URL!;
  const email = process.env.USER_EMAIL!;
  const password = process.env.USER_PASSWORD!;

  if (!baseURL || !email || !password) {
    throw new Error('Missing BASE_URL / USER_EMAIL / USER_PASSWORD in .env');
  }

  const browser = await chromium.launch(); // set { headless: false } if you want to see it
  const context = await browser.newContext();
  const page = await context.newPage();

  // ⬇️ Use absolute URL here
  await page.goto(baseURL);

  const login = new LoginPage(page);
  await login.signIn(email, password);

  const statePath = path.resolve(process.cwd(), 'storageState.json');
  await context.storageState({ path: statePath });
  console.log('✅ storageState.json written to', statePath);

  await browser.close();
}
