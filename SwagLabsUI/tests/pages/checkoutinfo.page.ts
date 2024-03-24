import {Page,Locator} from '@playwright/test'
class CheckoutInfoPage{
    page:Page;
    constructor(page:Page) {
        this.page = page;
        
    }
    async filluserinfo(firstname,lastname,postal){
        await this.page.locator('#first-name').fill(firstname)
        await this.page.locator('#last-name').fill(lastname)
        await this.page.locator('#postal-code').fill(postal)
        await this.page.locator('#continue').click()
    }
}
export default CheckoutInfoPage;