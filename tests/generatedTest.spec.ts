import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { generateRandomEmail } from '../utils/stringUtils';

test.describe('Registration Form', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await page.goto('https://test.com/registration');
  });

  test('should register successfully with valid data', async ({ page }) => {
    await registrationPage.firstName.fill('John');
    await registrationPage.lastName.fill('Doe');
    await registrationPage.email.fill(generateRandomEmail());
    await registrationPage.userName.fill('john_doe');
    await registrationPage.password.fill('Password123!');
    await registrationPage.submit.click();

    // Assert success message or navigation
    await expect(page.getByRole('alert')).toHaveText(/registration successful/i);
  });

  test('should show error for missing required fields', async ({ page }) => {
    await registrationPage.submit.click();
    await expect(page.getByRole('alert')).toHaveText(/required/i);
  });

  test('should show error for invalid email', async ({ page }) => {
    await registrationPage.firstName.fill('Jane');
    await registrationPage.lastName.fill('Smith');
    await registrationPage.email.fill('invalid-email');
    await registrationPage.userName.fill('jane_smith');
    await registrationPage.password.fill('Password123!');
    await registrationPage.submit.click();

    await expect(page.getByRole('alert')).toHaveText(/invalid email/i);
  });

  test('should show error for weak password', async ({ page }) => {
    await registrationPage.firstName.fill('Alice');
    await registrationPage.lastName.fill('Brown');
    await registrationPage.email.fill(generateRandomEmail());
    await registrationPage.userName.fill('alice_brown');
    await registrationPage.password.fill('123');
    await registrationPage.submit.click();

    await expect(page.getByRole('alert')).toHaveText(/password/i);
  });

  test('should show error for duplicate username', async ({ page }) => {
    const email = generateRandomEmail();
    await registrationPage.firstName.fill('Bob');
    await registrationPage.lastName.fill('Green');
    await registrationPage.email.fill(email);
    await registrationPage.userName.fill('existing_user');
    await registrationPage.password.fill('Password123!');
    await registrationPage.submit.click();

    await expect(page.getByRole('alert')).toHaveText(/username.*taken/i);
  });
});