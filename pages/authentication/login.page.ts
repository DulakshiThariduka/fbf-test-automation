import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  // relative path; Playwright prepends use.baseURL
  async open() {
    await this.page.goto('/'); // or '/login' if your app has a login route
  }

  async signIn(email: string, password: string) {
    await this.page.getByTestId('stBaseButton-secondary').click();
    await this.page.getByRole('textbox', { name: 'Enter your email, phone, or' }).click();
    await this.page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill(email);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('textbox', { name: 'Enter the password for qa.' }).click();
    await this.page.getByRole('textbox', { name: 'Enter the password for qa.' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }
}
