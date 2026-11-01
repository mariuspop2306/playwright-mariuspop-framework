import { test, expect } from '@fixtures/testFixtures';

test.describe('SauceDemo - Login Tests', () => {
  test.beforeEach(async ({ pm }) => {
    const loginPage = pm.getLoginPage();
    await loginPage.navigateToLogin();
  });

  test('Successful login with valid credentials', async ({ pm }) => {
    const loginPage = pm.getLoginPage();
    
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyLoginWithSuccess();
  });

  test('Failed login with locked out user', async ({ pm }) => {
    const loginPage = pm.getLoginPage();
    
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});