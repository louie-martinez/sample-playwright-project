import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

    await page.goto('http://uitestingplayground.com/');

    // Expect a title "to contain" a substring.
   await expect(page).toHaveTitle(/UI Test Automation Playground/);

});

test('has element visible', async ({ page }) => {

    //Page locators
    const visibilityLink = page.getByText('Visibility');
    const hideButton = page.locator('#hideButton');
    const removedButton = page.locator('#removedButton');

    //Action
    await page.goto('http://uitestingplayground.com/');
    await visibilityLink.click();
    await hideButton.click();

    // Expect a title "to contain" a substring.
    await expect(page).toHaveURL(/visibility/);
    await expect(removedButton).not.toBeVisible();

});