import { test as setup, expect } from '@playwright/test';
import { users } from '../fixtures/.authData';

 // User with ticket
const hasTicketFile = 'playwright/.auth/hasTicket.json';

setup('authenticate with ticket', async ({ page }) => {

  await page.goto('');

  await page.getByRole('link', { name: 'Войти' }).click();

  await page.locator('#login-email').fill(`${users[0].login}`);
  await page.locator('#login-password').fill(`${users[0].password}`);
  await page.getByRole('button', { name: 'Войти' }).click();
  
  //Wait until the page reaches a state where all cookies are set.
  await expect(page.locator('#__next')).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: hasTicketFile });

});

 // User without ticket
 const noTicketFile = 'playwright/.auth/noTicket.json';

 setup('authenticate without ticket', async ({ page }) => {
 
   await page.goto('');
 
   await page.getByRole('link', { name: 'Войти' }).click();
 
   await page.locator('#login-email').fill(`${users[1].login}`);
   await page.locator('#login-password').fill(`${users[1].password}`);
   await page.getByRole('button', { name: 'Войти' }).click();
   
   //Wait until the page reaches a state where all cookies are set.
   await expect(page.locator('#__next')).toBeVisible();
 
   // End of authentication steps.
   await page.context().storageState({ path: noTicketFile });
 
 });