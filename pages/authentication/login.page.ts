import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto("/");
  }

  async signIn(email: string, password: string) {
    await this.page.getByTestId('stBaseButton-secondary').click();
    await this.page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill(email);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('textbox', { name: /Enter the password/i }).waitFor();
    await this.page.getByRole('textbox', { name: /Enter the password/i }).fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();
  }
}