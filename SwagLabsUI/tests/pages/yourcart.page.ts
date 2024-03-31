import {Page,Locator} from '@playwright/test'
class YourCartPage{
    page:Page;
    checkout: Locator;
    continueshopping: Locator;
    constructor(page:Page) {
        this.page = page;
        this.checkout = page.locator('#checkout')
        this.continueshopping = page.locator('#continue-shopping')
    }
}
export default YourCartPage;