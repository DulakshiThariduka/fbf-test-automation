/*
import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage, CustomerPage} from '../../pages'; 
// import 'dotenv/config';

test('login + create customer flow', async ({ page }) => {
  
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  if (!email || !password) {
    throw new Error('Missing USER_EMAIL or USER_PASSWORD in .env');
  }

  const customerName = faker.company.name();
  const login = new LoginPage(page);
  const customerPage = new CustomerPage(page);

  await login.open();                   // uses baseURL from config
  await login.signIn(email, password);  // pass env creds

  await customerPage.createCustomer(customerName, 'Sample Desc');
});
*/
