import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText('Products');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async addProductToCartByName(productName: string) {
    const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  async getCartCount(): Promise<string> {
    return (await this.shoppingCartBadge.textContent()) || '0';
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async getProductNameByIndex(index: number): Promise<string> {
    const text = await this.page.getByTestId('inventory-item-name').nth(index).textContent();
    return text ? text.trim() : '';
  }

  async expectCartToBeEmpty(): Promise<void> {
    await expect(this.shoppingCartLink).toHaveAttribute('aria-label', 'Cart, empty');
  }
}