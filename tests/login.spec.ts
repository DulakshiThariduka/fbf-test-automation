import 'dotenv/config';
import { test } from '@playwright/test';
import { LoginPage } from '../pages';

test('user can log in', async ({ page }) => {
  const baseURL = process.env.BASE_URL;
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  if (!email || !password) throw new Error('Missing USER_EMAIL or USER_PASSWORD in .env');

  const login = new LoginPage(page);
  await login.open();                 // uses baseURL from config
  await login.signIn(email, password);
  //await expect(page.getByTestId('stText').locator('div')).toContainText(email);
});
