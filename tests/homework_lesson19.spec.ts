import { test, expect } from '@playwright/test';

test.describe('Unauthorised user', () => {
    test('should see BUY A TICKET in hero block', async ({ page }) => {
      await page.goto('');

      await expect(page.locator('#main__anchor').getByRole('link', { name: 'Купить билет' })).toBeVisible(); 
    });
    
      test('should NOT see BUY A TICKET in hero menu -> more', async ({ page }) => {
        await page.goto('');
        await page.getByLabel('Еще').click();
        await expect(page.getByLabel('Основная').getByRole('link', { name: 'Купить билет' })).toBeVisible();
      });
  });

//   test.describe('Authorised user', () => {
//     test('should see SCHEDULE in hero block', async ({ page }) => {
//       // ...
//     });
  
//     test('should NOT see BUY A TICKET in hero block', async ({ page }) => {
//       // ...
//     });

//     test('should NOT see BUY A TICKET in hero menu', async ({ page }) => {
//         // ...
//       });

//     test('should see BUY A TICKET in hero menu -> more', async ({ page }) => {
//         // ...
//       });
//   });