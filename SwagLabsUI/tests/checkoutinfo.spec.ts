import { test, expect } from '@playwright/test';
import HomePage from './pages/home.page';
import ProductPage from './pages/product.page';
import YourCartPage from './pages/yourcart.page';
import CheckoutInfoPage from './pages/checkoutinfo.page';

test.describe('Checkout:Your Information screen', () => {
    let homepage:HomePage;
    let productpage:ProductPage;
    let yourcartpage:YourCartPage;
    let checkoutinfopage:CheckoutInfoPage;
    test('User is able to provide the first name, lastname and zip/postal code', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")

        
        await homepage.login("standard_user","secret_sauce")
        //await page.pause()
        //await page.waitForTimeout(1000)
        //console.log(await page.getByText("Products").allInnerTexts())
        await expect(page.getByText("Products")).toHaveText("Products")

        const cartids: string[] = ["add-to-cart-sauce-labs-backpack","add-to-cart-sauce-labs-bike-light","add-to-cart-sauce-labs-bolt-t-shirt","add-to-cart-sauce-labs-fleece-jacket","add-to-cart-sauce-labs-onesie"]

        for(var item of cartids){
            
            await page.locator(`#${item}`).click()
        }
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        await yourcartpage.checkout.click()
        await expect(page.getByText("Checkout: Your Information")).toHaveText("Checkout: Your Information")
        await checkoutinfopage.filluserinfo("Vinod","Bisen","7550")
        await page.waitForTimeout(1000)
        //await expect(page.getByText("Checkout: Overview")).toHaveText("Checkout: Overview")
        await page.waitForTimeout(1000)
    })
    test('User is able to cancel the checkout option by clicking on cancel button and go back to Your cart screen', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")

        
        await homepage.login("standard_user","secret_sauce")
        //await page.pause()
        //await page.waitForTimeout(1000)
        //console.log(await page.getByText("Products").allInnerTexts())
        await expect(page.getByText("Products")).toHaveText("Products")

        const cartids: string[] = ["add-to-cart-sauce-labs-backpack","add-to-cart-sauce-labs-bike-light","add-to-cart-sauce-labs-bolt-t-shirt","add-to-cart-sauce-labs-fleece-jacket","add-to-cart-sauce-labs-onesie"]

        for(var item of cartids){
            
            await page.locator(`#${item}`).click()
        }
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        await yourcartpage.checkout.click()
        await expect(page.getByText("Checkout: Your Information")).toHaveText("Checkout: Your Information")
        await checkoutinfopage.filluserinfo("Vinod","Bisen","7550")
        await page.waitForTimeout(1000)
        await page.locator('#cancel').click()
        // await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        // await page.waitForTimeout(1000)
    })
    test('User is unable to continue with the checkout process without providing Name', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")

        
        await homepage.login("standard_user","secret_sauce")
        //await page.pause()
        //await page.waitForTimeout(1000)
        //console.log(await page.getByText("Products").allInnerTexts())
        await expect(page.getByText("Products")).toHaveText("Products")

        const cartids: string[] = ["add-to-cart-sauce-labs-backpack","add-to-cart-sauce-labs-bike-light","add-to-cart-sauce-labs-bolt-t-shirt","add-to-cart-sauce-labs-fleece-jacket","add-to-cart-sauce-labs-onesie"]

        for(var item of cartids){
            
            await page.locator(`#${item}`).click()
        }
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        await yourcartpage.checkout.click()
        await expect(page.getByText("Checkout: Your Information")).toHaveText("Checkout: Your Information")
        await checkoutinfopage.filluserinfo("","Bisen","7550")
        await expect(page.locator("h3")).toHaveText("Error: First Name is required")
        await page.waitForTimeout(1000)
        
    })
    test('User is unable to continue with the checkout process without providing Last Name', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")

        
        await homepage.login("standard_user","secret_sauce")
        //await page.pause()
        //await page.waitForTimeout(1000)
        //console.log(await page.getByText("Products").allInnerTexts())
        await expect(page.getByText("Products")).toHaveText("Products")

        const cartids: string[] = ["add-to-cart-sauce-labs-backpack","add-to-cart-sauce-labs-bike-light","add-to-cart-sauce-labs-bolt-t-shirt","add-to-cart-sauce-labs-fleece-jacket","add-to-cart-sauce-labs-onesie"]

        for(var item of cartids){
            
            await page.locator(`#${item}`).click()
        }
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        await yourcartpage.checkout.click()
        await expect(page.getByText("Checkout: Your Information")).toHaveText("Checkout: Your Information")
        await checkoutinfopage.filluserinfo("Vinod","","7550")
        await expect(page.locator("h3")).toHaveText("Error: Last Name is required")
        await page.waitForTimeout(1000)
        
    })
    test('User is unable to continue with the checkout process without providing Zip Code', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")

        
        await homepage.login("standard_user","secret_sauce")
        //await page.pause()
        //await page.waitForTimeout(1000)
        //console.log(await page.getByText("Products").allInnerTexts())
        await expect(page.getByText("Products")).toHaveText("Products")

        const cartids: string[] = ["add-to-cart-sauce-labs-backpack","add-to-cart-sauce-labs-bike-light","add-to-cart-sauce-labs-bolt-t-shirt","add-to-cart-sauce-labs-fleece-jacket","add-to-cart-sauce-labs-onesie"]

        for(var item of cartids){
            
            await page.locator(`#${item}`).click()
        }
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        await yourcartpage.checkout.click()
        await expect(page.getByText("Checkout: Your Information")).toHaveText("Checkout: Your Information")
        await checkoutinfopage.filluserinfo("Vinod","Bisen","")
        await expect(page.locator("h3")).toHaveText("Error: Postal Code is required")
        await page.waitForTimeout(1000)    
    })
})