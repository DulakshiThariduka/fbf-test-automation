import { expect, Page } from '@playwright/test';

export class Projectpage {
  constructor(private readonly page: Page) {}

async goToProjectsTab() {
    await this.page.getByRole('tab', { name: 'Projects' }).click();
  }

  async createProject(projectName: string, customerName: string) {
    await this.page.getByRole('button', { name: 'add_circle_outline Create' }).click();
    await this.page.getByRole('textbox', { name: 'Project Name' }).fill(projectName);

    // Customer combobox (leave locators exactly as provided)
    await this.page.locator('div').filter({ hasText: /^Hanae Parrish$/ }).first().click();
    await this.page.getByRole('combobox', { name: 'Selected Hanae Parrish.' }).fill(customerName);
    await this.page.getByTestId('stSelectboxVirtualDropdown').getByText(customerName).click();

    await this.page.getByTestId('stBaseButton-primary').click();
  }

  async filterByProject(projectName: string) {
    await this.page.getByLabel('Projects').getByTestId('stSelectbox').first().click();
    await this.page.getByRole('combobox').fill(projectName);
    await this.page.getByTestId('stSelectboxVirtualDropdown').getByText(projectName).click();
  }

}