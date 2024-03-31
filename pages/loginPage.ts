import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.locator('#login-email');
        this.passwordInput = page.locator('#login-password');
        this.loginButton = page.getByRole('button', { name: 'Войти' });
      }

    async open(url: string) {
        await this.page.goto(url);
    }

    async url() {
       return this.url;
    }
    async login(login: string, password: string) {
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
      }
}