import { test, expect } from '@fixtures/testFixtures';

test.describe('SauceDemo - Inventory Tests', () => {
  let firstProductName: string;
  let secondProductName: string;

  test.beforeEach(async ({ pm, authenticatedUser }) => {
    const productsPage = pm.getProductsPage();

    firstProductName = await productsPage.getProductNameByIndex(0);
    secondProductName = await productsPage.getProductNameByIndex(1);
  });

  test('Add single item to cart updates badge count', async ({ pm }) => {
    const productsPage = pm.getProductsPage();

    await productsPage.expectCartToBeEmpty();
    await productsPage.addProductToCartByName(firstProductName);

    await expect(productsPage.shoppingCartBadge).toHaveText('1');
  });

  test('Add multiple items to cart', async ({ pm }) => {
    const productsPage = pm.getProductsPage();
    const cartPage = pm.getCartPage();

    // Validate the cart is empty
    await productsPage.expectCartToBeEmpty();

    // Add 2 products to cart
    await productsPage.addProductToCartByName(firstProductName);
    await productsPage.addProductToCartByName(secondProductName);

    // Validate there are 2 products in cart
    await expect(productsPage.shoppingCartBadge).toHaveText('2');

    // Go to cart by selecting the cart icon
    await cartPage.selectCartIcon()
    await expect(cartPage.getCartList()).toBeVisible()

    // Validate the products added by their names 
    await expect(cartPage.getCartList()).toContainText(firstProductName)
    await expect(cartPage.getCartList()).toContainText(secondProductName)

    // Validate that each product added has the qty=1 
    await expect(cartPage.getValueOfTheQuantityField(firstProductName)).toHaveText('1');
    await expect(cartPage.getValueOfTheQuantityField(secondProductName)).toHaveText('1');

  });
});