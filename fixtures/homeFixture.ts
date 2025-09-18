// fixtures/homePageFixture.ts
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();  // Navigate to homepage here
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
