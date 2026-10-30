import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';

test.describe('SauceDemo - Inventory Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add single item to cart updates badge count', async () => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await expect(productsPage.shoppingCartBadge).toHaveText('1');
  });

  test('Add multiple items to cart', async () => {
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    await productsPage.addProductToCartByName('Sauce Labs Bike Light');
    await expect(productsPage.shoppingCartBadge).toHaveText('2');
  });
});