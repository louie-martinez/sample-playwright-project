import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProgressBarPage } from '../pages/ProgressBarPage';
import { LoadDelayPage } from '../pages/LoadDelayPage';
import { generateRandomEmail } from '../utils/stringUtils';

test.describe('tests with beforeEach', () => {
    let homePage: HomePage;
    let progressBarPage: ProgressBarPage;
    let loadDelayPage: LoadDelayPage;

    test.beforeEach(async ({ page }) =>{
        homePage = new HomePage(page);
        progressBarPage = new ProgressBarPage(page);
        loadDelayPage = new LoadDelayPage(page);

        // Use the actions from the POMs
        await homePage.navigate();
        const email = generateRandomEmail(); // sample how to use util. not used in test
    })

    test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/UI Test Automation Playground/);

    });

    test('has element visible', async ({ page }) => {

        // Use the actions from the POMs
        await homePage.visibilityLink.click();
        await homePage.hideButton.click();

        // Expect a title "to contain" a substring.
        await expect(page).toHaveURL(/visibility/);
        await expect(homePage.removedButton).not.toBeVisible();

    });

    test('has element loader to wait for progress bar', async ({ page }) => {
        // Arrange
        test.setTimeout(60000); // 60 seconds for the entire test

        // Act
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

        // Act
        await homePage.clickLoadDelayLink()

        // Assert
        await expect(page).toHaveURL(/loaddelay/, { timeout: 30000 });
        await expect(loadDelayPage.buttonppearingAfterDelayButton).toBeVisible();

    });
});