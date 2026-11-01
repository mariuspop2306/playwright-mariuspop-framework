import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryList = page.getByTestId('inventory-list');
  }

  async navigateToLogin() {
    // Navigate to basURL set in playwright.config.ts
    await this.page.goto('/');
  }

  // Login with valid credentials 
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Verify login was done successfuly
  async verifyLoginWithSuccess() {
    // await expect(this.inventoryList).toBeVisible();
    await expect(this.page).toHaveURL('/inventory.html');
    await expect(this.page.getByText('Products')).toBeVisible();
  }
}