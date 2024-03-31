import { test, expect } from '@playwright/test';
import { users } from '../fixtures/.authData';
import { MainPage } from '../pages/mainPage';

test.describe('Check BUY A TICKET button on main page', () => {
    test('Unauthorised user', async({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.open();
        // Should see BUY A TICKET in hero block
        await expect(mainPage.heroBlockButton).toBeVisible();
        // Should see BUY A TICKET in menu line
        await expect(mainPage.menuButton).toBeVisible();
        // Should NOT see BUY A TICKET in menu -> more
        await mainPage.openMoreDropDownList();
        const count = await mainPage.moreListItem.count();
        for (let i = 0; i < count; ++i)
            await expect(mainPage.moreListItem.nth(i)).not.toHaveText('Купить билет');
      })

    test('User with a ticket', async({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.open();

        // Authorise
        const loginPage = await mainPage.login();
        await loginPage.login(`${users[0].login}`, `${users[0].password}`);
    
        // Should NOT see BUY A TICKET in hero block
        await expect(mainPage.heroBlockButton).not.toBeVisible();
        // Should NOT see BUY A TICKET in menu line
        await expect(mainPage.menuButton).not.toBeVisible();
         // Should see BUY A TICKET in menu -> more
        await mainPage.openMoreDropDownList();
        await expect(mainPage.moreListItem.last()).toHaveText('Купить билет');
        });

    test('User without a ticket', async({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.open();
    
        // Authorise
        const loginPage = await mainPage.login();
        await loginPage.login(`${users[1].login}`, `${users[1].password}`);
    
        // Should see BUY A TICKET in hero block
        await expect(mainPage.heroBlockButton).toBeVisible();
        // Should see BUY A TICKET in menu line
        await expect(mainPage.menuButton).toBeVisible();
        // Should NOT see BUY A TICKET in menu -> more
        await mainPage.openMoreDropDownList();
        const count = await mainPage.moreListItem.count();
        for (let i = 0; i < count; ++i)
            await expect(mainPage.moreListItem.nth(i)).not.toHaveText('Купить билет');
    });
})