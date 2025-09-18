import { Page, Locator } from '@playwright/test';

export class HomePage {
  // Page object's URL property
  readonly page: Page;
  readonly visibilityLink: Locator;
  readonly hideButton: Locator;
  readonly removedButton: Locator;
  readonly progressBarLink: Locator;
  readonly loadDelayLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Define locators for page elements
    this.visibilityLink = page.getByRole('link', { name: 'Visibility' });
    this.hideButton = page.getByRole('button', { name: 'Hide' });
    this.removedButton = page.getByRole('button', { name: 'Removed' });
    this.progressBarLink = page.getByRole('link', { name: 'Progress Bar' });
    this.loadDelayLink = page.getByRole('link', { name: 'Load Delay' });
  }

  // Define actions that can be performed on the page
  async navigate() {
    await this.page.goto('http://uitestingplayground.com/');
  }

  async clickProgressBarLink() {
    await this.progressBarLink.click();
  }
  async clickLoadDelayLink() {
    await this.loadDelayLink.click();
  }

}