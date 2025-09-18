import { test, expect } from '../fixtures/homeFixture';
import { HomePage } from '../pages/HomePage';
import { ProgressBarPage } from '../pages/ProgressBarPage';
import { LoadDelayPage } from '../pages/LoadDelayPage';
import { generateRandomEmail } from '../utils/stringUtils';

test.describe.only('tests with beforeEach', () => {
    let progressBarPage: ProgressBarPage;
    let loadDelayPage: LoadDelayPage;

    test.beforeEach(async ({ page }) =>{
        progressBarPage = new ProgressBarPage(page);
        loadDelayPage = new LoadDelayPage(page);

        // Use the actions from the POMs
        const email = generateRandomEmail(); // sample how to use util. not used in test
    })

    test('has title', async ({ homePage }) => {
        // Expect a title "to contain" a substring.
        await expect(homePage.page).toHaveTitle(/UI Test Automation Playground/);
    });

    test('has element visible', async ({ homePage }) => {

        // Use the actions from the POMs
        await homePage.visibilityLink.click();
        await homePage.hideButton.click();

        // Expect a title "to contain" a substring.
        await expect(homePage.page).toHaveURL(/visibility/);
        await expect(homePage.removedButton).not.toBeVisible();

    });

    test('has element loader to wait for progress bar', async ({ homePage }) => {
        // Arrange
        test.setTimeout(60000); // 60 seconds for the entire test

        // Act
        await homePage.clickProgressBarLink()

        // Assert
        await expect(homePage.page).toHaveURL(/progressbar/);
        await expect(progressBarPage.progressBar).toBeVisible();
        await expect(progressBarPage.resultText).toHaveText('Result: n/a');

        // Act
        await progressBarPage.clickStartButton();

        //Assert
        await expect(progressBarPage.progressBar).toHaveText('100%', { timeout: 60000 });

        // Act
        await progressBarPage.clickStopButton();

        //Assert
        await expect(progressBarPage.resultText).toHaveText(/Result: \d+, duration: \d+/);

    });

    test('has element loader to wait for page that loads long', async ({ homePage }) => {

        // Act
        await homePage.clickLoadDelayLink()

        // Assert
        await expect(homePage.page).toHaveURL(/loaddelay/, { timeout: 30000 });
        await expect(loadDelayPage.buttonppearingAfterDelayButton).toBeVisible();

    });
});