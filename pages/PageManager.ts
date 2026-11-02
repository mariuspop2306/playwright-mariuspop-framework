import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly productsPage: ProductsPage;
  private readonly cartPage: CartPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getProductsPage(): ProductsPage {
    return this.productsPage;
  }

  getCartPage(): CartPage {
    return this.cartPage;
  }


}