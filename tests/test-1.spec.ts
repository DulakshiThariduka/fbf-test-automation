import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('test', async ({ page }) => {
  const customerName = faker.company.name();      // Random company name
  const projectName = faker.commerce.productName(); // Random product name
  const processName = faker.word.noun() + '-' + faker.number.int(999); // Random process name

  await page.goto('https://fbf-frame-management-dev.innerspace.at/');
  await page.getByTestId('stBaseButton-secondary').click();
  await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).click();
  await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('sample@example.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for qa.' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for qa.' }).fill('samplePassword123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'add_circle_outline Create' }).click();
  await page.getByRole('textbox', { name: 'Customer Name' }).click();
  await page.getByRole('textbox', { name: 'Customer Name' }).fill(customerName);
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Sample Desc');
  await page.getByTestId('stBaseButton-primary').click();
  await page.getByRole('tab', { name: 'Projects' }).click();
  await page.getByRole('button', { name: 'add_circle_outline Create' }).click();
  await page.getByRole('textbox', { name: 'Project Name' }).fill(projectName);
  await page.locator('div').filter({ hasText: /^Hanae Parrish$/ }).first().click();
  await page.getByRole('combobox', { name: 'Selected Hanae Parrish.' }).fill(customerName);
  await page.getByTestId('stSelectboxVirtualDropdown').getByText(customerName).click();
  await page.getByTestId('stBaseButton-primary').click();
  await page.getByLabel('Projects').getByTestId('stSelectbox').first().click();
  await page.getByRole('combobox').fill(projectName);
  await page.getByTestId('stSelectboxVirtualDropdown').getByText(projectName).click();
  await page.getByRole('tab', { name: 'Processes' }).click();
  await page.getByRole('button', { name: 'add_circle_outline Create' }).click();
  await page.getByRole('textbox', { name: 'Process Name' }).fill(processName);
  await page.getByTestId('stBaseButton-primary').click();
  await page.locator('div').filter({ hasText: /^Choose an option$/ }).first().click();
  const combo = page.getByRole('combobox', { name: 'Select Process' });
  await combo.fill(processName);
  const dropdown = page.getByTestId('stSelectboxVirtualDropdown');
  await expect(dropdown).toBeVisible();
  await dropdown.getByRole('option', { name: processName, exact: true }).click();
  await expect(dropdown).toBeHidden();
  await expect(page.getByTestId('stSidebarUserContent')).toContainText(projectName);
  await expect(page.getByTestId('stSidebarUserContent')).toContainText(processName);
  await page.getByRole('link', { name: 'Frame Assignment' }).click();
  await expect(page.locator('#frame-assignment')).toContainText('Frame Assignment');
});