import { test, expect } from '@playwright/test';

test.describe.skip('Unauthorised user', () => {
    test('should see BUY A TICKET in hero block', async ({ page }) => {
      await page.goto('');

      await expect(page.locator('#main__anchor').getByRole('link', { name: 'Купить билет' })).toBeVisible(); 
    });
    
      test('should see BUY A TICKET in hero menu', async ({ page }) => {
        await page.goto('');
        await expect(page.getByLabel('Важные разделы').getByRole('link', { name: 'Купить билет' })).toBeVisible();
      });

      // page.getByLabel('Важные разделы').getByRole('link', { name: 'Купить билет' })
  });

  test.describe('Authorised user with ticket', () => {
    test('should NOT see BUY A TICKET in hero block', async ({ browser }) => {
      const withTIcketContext = await browser.newContext({ storageState: 'playwright/.auth/hasTicket.json' });
      const withTicketPage = await withTIcketContext.newPage();
      await withTicketPage.goto('');

      await expect(withTicketPage.locator('#main__anchor').getByRole('link', { name: 'Купить билет' })).not.toBeVisible(); 
      await withTIcketContext.close();
  
    });
    // });

//     test('should NOT see BUY A TICKET in hero menu', async ({ page }) => {
//         // ...
//       });

//     test('should see BUY A TICKET in hero menu -> more', async ({ page }) => {
//         // ...
//       });
  });

  test.describe('Authorised user without ticket', () => {
    test('should see BUY A TICKET in hero block', async ({ browser }) => {
      const withTIcketContext = await browser.newContext({ storageState: 'playwright/.auth/noTicket.json' });
      const withTicketPage = await withTIcketContext.newPage();
      await withTicketPage.goto('');

      await expect(withTicketPage.locator('#main__anchor').getByRole('link', { name: 'Купить билет' })).toBeVisible(); 
      await withTIcketContext.close();
  
    });
  });