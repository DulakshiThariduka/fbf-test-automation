/*
import 'dotenv/config';
import { test } from '@playwright/test';
import { LoginPage } from '../pages';

test('user can log in', async ({ page }) => {
  const baseURL = process.env.BASE_URL;
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  if (!email || !password || !baseURL) throw new Error('Missing USER_EMAIL or USER_PASSWORD or BASE_URL in .env');

  const login = new LoginPage(page);
  await login.open();                 // uses baseURL from config
  await login.signIn(email, password);
  //await expect(page.getByTestId('stText').locator('div')).toContainText(email);
});*/

// example.spec.ts
import { test, expect } from '@playwright/test';

test('test with authenticated user', async ({ page }) => {
  // You're already logged in from global setup!
  await page.goto('/');
  
  // Your test assertions here
  await expect(page).toHaveURL('/');
  // Add your specific test logic
});
