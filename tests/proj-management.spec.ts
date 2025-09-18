import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerPage, ProjectPage, ProcessPage } from '../pages'; 

test.describe.configure({ mode: 'serial' });

const customerName = faker.company.name();
const projectName  = faker.commerce.productName();
const processName  = `${faker.word.noun()}-${faker.number.int(999)}`;

test.beforeEach(async ({ page }) => {
  console.log('Current URL:', page.url());
  const cookies = await page.context().cookies();
  console.log('Number of cookies:', cookies.length);
  await page.goto('/');
});

test('Create Customer', async ({ page }) => {
  const customerPage = new CustomerPage(page);
  await customerPage.createCustomer(customerName, 'Sample Desc');
});

test('Create Project', async ({ page }) => {
  const projectPage = new ProjectPage(page);
  await projectPage.goToProjectsTab();
  await projectPage.createProject(projectName, customerName);
});

test('Select Project', async ({ page }) => {
  const projectPage = new ProjectPage(page);
  await projectPage.filterByProject(projectName);
});

test('Create Process', async ({ page }) => {
  const processPage = new ProcessPage(page);
  await processPage.goToProcessesTab();
  await processPage.createProcess(processName);
});

test('Select Process', async ({ page }) => {
  const processPage = new ProcessPage(page);
  await processPage.selectProcessInProject(processName);
});

test('Verify Created Process and Project', async ({ page }) => {
  const processPage = new ProcessPage(page);
  await processPage.expectSidebarHas(projectName, processName);
  await processPage.openFrameAssignmentAndExpect();
});








