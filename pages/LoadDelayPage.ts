import { Page, Locator } from '@playwright/test';

export class LoadDelayPage {
  // Page object's URL property
  readonly page: Page;
  readonly buttonppearingAfterDelayButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Define locators for page elements
    this.buttonppearingAfterDelayButton = page.getByRole('button', { name: 'Button Appearing After Delay' });

  // Define actions that can be performed on the page

  }
}