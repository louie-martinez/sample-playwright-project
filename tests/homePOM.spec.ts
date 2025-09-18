import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProgressBarPage } from '../pages/ProgressBarPage';
import { LoadDelayPage } from '../pages/LoadDelayPage';
import { generateRandomEmail } from '../utils/stringUtils';

test('has title', async ({ page }) => {
    const homePage = new HomePage(page);
    const email = generateRandomEmail(); // sample how to use util. not used in test

    // Use the actions from the POMs
    await homePage.navigate();

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);

});

test('has element visible', async ({ page }) => {

    const homePage = new HomePage(page);

    // Use the actions from the POMs
    await homePage.navigate();
    await homePage.visibilityLink.click();
    await homePage.hideButton.click();

    // Expect a title "to contain" a substring.
    await expect(page).toHaveURL(/visibility/);
    await expect(homePage.removedButton).not.toBeVisible();

});

test('has element loader to wait for progress bar', async ({ page }) => {
    // Arrange
    test.setTimeout(60000); // 60 seconds for the entire test
    const homePage = new HomePage(page);
    const progressBarPage = new ProgressBarPage(page);

    // Act
    await homePage.navigate();
    await homePage.clickProgressBarLink()

    // Assert
    await expect(page).toHaveURL(/progressbar/);
    await expect(progressBarPage.progressBar).toBeVisible();
    await expect(progressBarPage.resultText).toHaveText('Result: n/a');

    // Act
    await progressBarPage.clickStartButton();

    //Assert
    await expect(progressBarPage.progressBar).toHaveText('100%', { timeout: 60000 });

    // Act
    await progressBarPage.clickStopButton();

    //Assert
    await expect(progressBarPage.resultText).toHaveText(/Result: \d+,\s*duration: \d+/);

});

test('has element loader to wait for page that loads long', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const loadDelayPage = new LoadDelayPage(page);

    // Act
    await homePage.navigate();
    await homePage.clickLoadDelayLink()

    // Assert
    await expect(page).toHaveURL(/loaddelay/, { timeout: 30000 });
    await expect(loadDelayPage.buttonppearingAfterDelayButton).toBeVisible();

});