import { expect, type Locator, type Page } from '@playwright/test';
import { LoginPage } from './loginPage';

export class MainPage {
    readonly page: Page;
    readonly heroBlockButton: Locator;
    readonly menuButton: Locator;
    readonly moreButton: Locator;
    readonly moreListItem: Locator;
    readonly loginButton;

    constructor(page: Page) {
        this.page = page;
        this.heroBlockButton = page.locator('#main__anchor').getByRole('link', { name: 'Купить билет' });
        this.menuButton = page.getByLabel('Важные разделы').getByRole('link', { name: 'Купить билет' });
        this.moreButton = page.getByLabel('Еще');
        this.moreListItem = page.locator('#headerNavigation__more').getByRole('listitem');
        this.loginButton = page.getByRole('link', { name: 'Войти' });
    }

    async open() {
        await this.page.goto('');
        await expect(this.loginButton).toBeVisible()
    }

    async openMoreDropDownList() {
        await this.moreButton.click();
    }

    async login() {
        const loginPage = new LoginPage(this.page);
        await this.loginButton.click();
        return loginPage;
    }
}