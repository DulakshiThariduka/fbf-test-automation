import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/login.page';
import { ManagementPage } from '../pages/projectmanagement.page';
// import 'dotenv/config';

test('login + create customer/project/process flow', async ({ page }) => {
  
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  if (!email || !password) {
    throw new Error('Missing USER_EMAIL or USER_PASSWORD in .env');
  }

  const customerName = faker.company.name();
  const projectName = faker.commerce.productName();
  const processName = `${faker.word.noun()}-${faker.number.int(999)}`;

  const login = new LoginPage(page);
  const app = new ManagementPage(page);

  await login.open();                   // uses baseURL from config
  await login.signIn(email, password);  // pass env creds

  await app.createCustomer(customerName, 'Sample Desc');
  await app.goToProjectsTab();
  await app.createProject(projectName, customerName);
  await app.filterByProject(projectName);
  await app.goToProcessesTab();
  await app.createProcess(processName);
  await app.selectProcessInProject(processName);
  await app.expectSidebarHas(projectName, processName);
  await app.openFrameAssignmentAndExpect();
});
