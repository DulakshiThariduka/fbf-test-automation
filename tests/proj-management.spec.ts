import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage, CustomerPage, ProjectPage, ProcessPage } from '../pages'; 

test.describe.configure({ mode: 'serial' });

const customerName = faker.company.name();
const projectName  = faker.commerce.productName();
const processName  = `${faker.word.noun()}-${faker.number.int(999)}`;

test('Login and Navigate', async ({ page }) => {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  if (!email || !password) {
    throw new Error('Missing USER_EMAIL or USER_PASSWORD in .env');
  }
  const login = new LoginPage(page);
  await login.open();
  await login.signIn(email, password);
  //await login.expectLoggedIn();
});

test('Create Customer', async ({ page }) => {
  const customerPage = new CustomerPage(page);
  await customerPage.goToCustomersTab();
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