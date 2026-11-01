import { test as base } from '@playwright/test';
import { PageManager } from '@page-objects/PageManager';

type MyFixtures = {
  pm: PageManager;
  authenticatedUser: void;
};

export const test = base.extend<MyFixtures>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },

  authenticatedUser: async ({ pm, page }, use) => {
    const loginPage = pm.getLoginPage();
    await loginPage.navigateToLogin();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyLoginWithSuccess();
    await use();
  },
});

export { expect } from '@playwright/test';