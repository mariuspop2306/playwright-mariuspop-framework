import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';      
import { ProductsPage } from './ProductsPage'; 

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly productsPage: ProductsPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.productsPage = new ProductsPage(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getProductsPage(): ProductsPage {
    return this.productsPage;
  }
}