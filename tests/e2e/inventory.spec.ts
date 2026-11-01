import { test, expect } from '@fixtures/testFixtures';

test.describe('SauceDemo - Inventory Tests', () => {
  let firstProductName: string;
  let secondProductName: string;

  test.beforeEach(async ({ pm, authenticatedUser }) => {
    const productsPage = pm.getProductsPage();

    firstProductName = await productsPage.getFirstProductName();
    secondProductName = await productsPage.getSecondProductName();
  });

  test('Add single item to cart updates badge count', async ({ pm }) => {
    const productsPage = pm.getProductsPage();

    await productsPage.expectCartToBeEmpty();
    await productsPage.addProductToCartByName(firstProductName);
    
    await expect(productsPage.shoppingCartBadge).toHaveText('1');
  });

  test('Add multiple items to cart', async ({ pm }) => {
    const productsPage = pm.getProductsPage();

    await productsPage.expectCartToBeEmpty();
    await productsPage.addProductToCartByName(firstProductName);
    await productsPage.addProductToCartByName(secondProductName);
    
    await expect(productsPage.shoppingCartBadge).toHaveText('2');
  });
});