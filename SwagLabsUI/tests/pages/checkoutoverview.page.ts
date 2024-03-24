import {Page,Locator} from '@playwright/test'
class CheckoutOverPage{
    page:Page;
    finish: Locator;
    constructor(page:Page) {
        this.page = page;
        this.finish = page.locator('#finish');
        
    }
}
export default CheckoutOverPage;