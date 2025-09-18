import { Page, Locator } from '@playwright/test';

export class ProgressBarPage {
  // Page object's URL property
  readonly page: Page;
  readonly startButton: Locator;
  readonly stopButton: Locator;
  readonly progressBar: Locator;
  readonly resultText: Locator;

  constructor(page: Page) {
    this.page = page;
    // Define locators for page elements
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.stopButton = page.getByRole('button', { name: 'Stop' });
    this.progressBar = page.getByRole('progressbar');
    this.resultText = page.locator('#result')
  }

  // Define actions that can be performed on the page
  async clickStartButton() {
    await this.startButton.click();
  }

  async clickStopButton() {
    await this.stopButton.click();
  }

}