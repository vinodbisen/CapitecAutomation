import {Page,Locator} from '@playwright/test'
class HomePage{
    page:Page;
    constructor(page:Page) {
        this.page = page;
        
    }
    async login(username,password){
        await this.page.locator("#user-name").fill(username)
        await this.page.locator("#password").fill(password)
        await this.page.locator("#login-button").click()

    }
    async navigate(){
        await this.page.goto("https://www.saucedemo.com/")
    }
}
export default HomePage;