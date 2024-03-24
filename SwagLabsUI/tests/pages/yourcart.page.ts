import {Page,Locator} from '@playwright/test'
class YourCartPage{
    page:Page;
    checkout: Locator;
    constructor(page:Page) {
        this.page = page;
        this.checkout = page.locator('#checkout')
    }
}
export default YourCartPage;