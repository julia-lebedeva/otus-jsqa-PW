import { test, expect } from '@playwright/test';
import { users } from '../fixtures/.authData';
import { beforeEach } from 'node:test';

test.describe('Check BUY A TICKET button on main page', () => {
    test.beforeEach(async ({ page } ) => {
        await page.goto('');
        await expect(page.getByRole('link', { name: 'Войти' })).toBeVisible();
      });
    test('Unauthorised user', async({ page }) => {
      // Should see BUY A TICKET in hero block
      await expect(page.locator('#main__anchor').getByRole('link', { name: 'Купить билет' })).toBeVisible();
      // Should see BUY A TICKET in menu line
      await expect(page.getByLabel('Важные разделы').getByRole('link', { name: 'Купить билет' })).toBeVisible();
      // Should NOT see BUY A TICKET in menu -> more
      await page.getByLabel('Еще').click();
      const count = await page.locator('#headerNavigation__more').getByRole('listitem').count();
      for (let i = 0; i < count; ++i)
          await expect(page.locator('#headerNavigation__more').getByRole('listitem').nth(i)).not.toHaveText('Купить билет');
    })
    test('User with a ticket', async({ page }) => {
    // Authorise
        await page.getByRole('link', { name: 'Войти' }).click();

        await page.locator('#login-email').fill(`${users[0].login}`);
        await page.locator('#login-password').fill(`${users[0].password}`);
        await page.getByRole('button', { name: 'Войти' }).click();

        // Should NOT see BUY A TICKET in hero block
        await expect(page.locator('#main__anchor').getByRole('link', { name: 'Купить билет' })).not.toBeVisible();
        // Should NOT see BUY A TICKET in menu line
        await expect(page.getByLabel('Важные разделы').getByRole('link', { name: 'Купить билет' })).not.toBeVisible();
        // Should see BUY A TICKET in menu -> more
        await page.getByLabel('Еще').click();
        await expect(page.locator('#headerNavigation__more').getByRole('listitem').last()).toHaveText('Купить билет');
    });

    test('User without a ticket', async({ page }) => {
        await page.getByRole('link', { name: 'Войти' }).click();

        await page.locator('#login-email').fill(`${users[1].login}`);
        await page.locator('#login-password').fill(`${users[1].password}`);
        await page.getByRole('button', { name: 'Войти' }).click();

        // Should see BUY A TICKET in hero block
        await expect(page.locator('#main__anchor').getByRole('link', { name: 'Купить билет' })).toBeVisible();
        // Should see BUY A TICKET in menu line
        await expect(page.getByLabel('Важные разделы').getByRole('link', { name: 'Купить билет' })).toBeVisible();
        // Should NOT see BUY A TICKET in menu -> more
        await page.getByLabel('Еще').click();
        const count = await page.locator('#headerNavigation__more').getByRole('listitem').count();
        for (let i = 0; i < count; ++i)
            await expect(page.locator('#headerNavigation__more').getByRole('listitem').nth(i)).not.toHaveText('Купить билет');
    });
});