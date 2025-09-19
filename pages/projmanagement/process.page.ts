import { expect, Page } from '@playwright/test';

export class ProcessPage {
  constructor(private readonly page: Page) {}

async goToProcessesTab() {
    await this.page.getByRole('tab', { name: 'Processes' }).click();
  }

  async createProcess(processName: string) {
    await this.page.getByRole('button', { name: 'add_circle_outline Create' }).click();
    await this.page.getByRole('textbox', { name: 'Process Name' }).fill(processName);
    await this.page.getByTestId('stBaseButton-primary').click();
  }

  async selectProcessInProject(processName: string) {
    await this.page.locator('div').filter({ hasText: /^Choose an option$/ }).first().click();
    const combo = this.page.getByRole('combobox', { name: 'Select Process' });
    await combo.fill(processName);

    const dropdown = this.page.getByTestId('stSelectboxVirtualDropdown');
    await expect(dropdown).toBeVisible();
    await dropdown.getByRole('option', { name: processName, exact: true }).click();
    await expect(dropdown).toBeHidden();
  }

  async expectSidebarHas(projectName: string, processName: string) {
    const userContent = this.page.getByTestId('stSidebarUserContent');
    await expect(userContent).toContainText(projectName);
    await expect(userContent).toContainText(processName);
    await expect(userContent).toContainText(`Project: ${projectName}`);
    await expect(userContent).toContainText(`Process: ${processName}`);
  }

  async openFrameAssignmentAndExpect() {
    await this.page.getByRole('link', { name: 'Frame Assignment' }).click();
    await expect(this.page.locator('#frame-assignment')).toContainText('Frame Assignment');
  }

}