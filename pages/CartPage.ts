import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartList: Locator;
    readonly cartIcon: Locator;
    readonly cartItems: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartList = page.getByTestId('cart-list');
        this.cartIcon = page.getByTestId('shopping-cart-link')
        this.cartItems = page.getByTestId('inventory-item')

    }

    getCartList() {
        return this.cartList;
    }

    async selectCartIcon() {
        await this.cartIcon.click();
    }

    getValueOfTheQuantityField(prodName: string) : Locator {
        return this.cartItems.filter({ hasText: `${prodName}` }).getByTestId('item-quantity');
    }

}