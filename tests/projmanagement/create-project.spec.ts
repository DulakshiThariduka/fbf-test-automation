/*
import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage, CustomerPage, Projectpage} from '../../pages'; 
// import 'dotenv/config';

test('login + create project flow', async ({ page }) => {
  
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  if (!email || !password) {
    throw new Error('Missing USER_EMAIL or USER_PASSWORD in .env');
  }

  const customerName = faker.company.name();
  const projectName = faker.commerce.productName();
  const processName = `${faker.word.noun()}-${faker.number.int(999)}`;

  const login = new LoginPage(page);
  const customerPage = new CustomerPage(page);
  const projectPage = new Projectpage(page);

  await login.open();                   // uses baseURL from config
  await login.signIn(email, password);  // pass env creds

  await projectPage.goToProjectsTab();
  await projectPage.createProject(projectName, customerName);
  await projectPage.filterByProject(projectName);
});
*/