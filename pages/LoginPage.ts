//TODO: imports
import {Page, Locator} from '@playwright/test';

//TODO: export class LoginPage
export class LoginPage {
    private readonly page: Page;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly submitButton: Locator;
    readonly balance: Locator;
    readonly successText: Locator;

    //TODO: constructor
    constructor(page: Page){
        //TODO: locators
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.balance = page.getByTestId('balance');
        this.successText = page.locator('#success-text');
    }

    //TODO: methods
    async navigateToLoginPage(){
        await this.page.goto('https://example.com/login');
    }

    async login(username: string, password: string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.submitButton.click();
    }

}

