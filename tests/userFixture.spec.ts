import { test, expect } from '../fixtures/testUserFixture';

test('user can log in and see dashboard', async ({ page, testUser }) => {
  await page.goto('https://yourapp.com/login');
  await page.fill('#email', testUser.email);
  await page.fill('#password', testUser.password);
  await page.click('button[type=submit]');
  await expect(page).toHaveURL('https://yourapp.com/dashboard');
});
