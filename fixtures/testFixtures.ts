import { test as base, request as playwrightRequest } from '@playwright/test';
import { PageManager } from '@pages/PageManager';

// Define the custom fixtures for the test suite
type MyFixtures = {
  pm: PageManager;
  authenticatedUser: void;
  request: typeof playwrightRequest;
};

// Extend the base test with custom fixtures
export const test = base.extend<MyFixtures>({
  // Create a new instance of PageManager for each test
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },

  // Log in to the application before each test that requires an authenticated user
  authenticatedUser: async ({ pm, page }, use) => {
    const loginPage = pm.getLoginPage();
    await loginPage.navigateToLogin();
    await loginPage.login(process.env.UI_USERNAME!, process.env.UI_PASSWORD!);
    await loginPage.verifyLoginWithSuccess();
    await use();
  },

  // Create a new API request context for each test
  request: async ({ }, use) => {
    const apiContext = await playwrightRequest.newContext({
      baseURL: process.env.API_BASE_URL,
    });

    await use(apiContext);
    await apiContext.dispose();
  }

});

export { expect } from '@playwright/test';