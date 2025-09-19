//TODO: Imports
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

//TODO: Describe block
test.describe('Loging Page Tests', () => {

    //TODO: Test block
    test('Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login('validUser', 'validPassword'); //values idealy in a config file

        await expect(loginPage.successText).toHaveText('Login Successful');
        await expect(page).toHaveURL(/account/);
        await expect(loginPage.balance).toHaveText('Balance: \d');
    })
})

