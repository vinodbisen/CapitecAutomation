import { test, expect } from '@playwright/test';
import HomePage from './pages/home.page';
import ProductPage from './pages/product.page';
import YourCartPage from './pages/yourcart.page';
import CheckoutInfoPage from './pages/checkoutinfo.page';
import CheckoutOverPage from './pages/checkoutoverview.page';

test.describe('Checkout: Overview screen', () => {
    let homepage:HomePage;
    let productpage:ProductPage;
    let yourcartpage:YourCartPage;
    let checkoutinfopage:CheckoutInfoPage;
    let checkoutoverpage:CheckoutOverPage;
    test('User is able to click on finish button and able to complete the checkout process', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        checkoutoverpage = new CheckoutOverPage(page)
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
        await expect(page.getByText("Checkout: Overview")).toHaveText("Checkout: Overview")
        await page.waitForTimeout(1000)
        await checkoutoverpage.finish.click()
        await expect(page.getByText("Checkout: Complete!")).toHaveText("Checkout: Complete!")
    })
    test('User is able to validate the quantity, description and price of items added to cart', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        checkoutoverpage = new CheckoutOverPage(page)
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
        await expect(page.getByText("Checkout: Overview")).toHaveText("Checkout: Overview")
        await page.waitForTimeout(1000)
        const tquantity = page.locator('#checkout_summary_container div[data-test*=inventory-item] div[data-test*=item-quantity]')
        for (const query of await tquantity.elementHandles()){
            console.log(await query.textContent());
        }
        const tdescription = page.locator('#checkout_summary_container div[data-test*=inventory-item] div[data-test*=inventory-item-desc]')
        for (const query of await tdescription.elementHandles()){
            console.log(await query.textContent());
        }
        const tprice = page.locator('#checkout_summary_container div[data-test*=inventory-item] div[data-test*=inventory-item-price]')
        for (const query of await tprice.elementHandles()){
            console.log(await query.textContent());
        }
    })
    test('User is able to view the Payment and Shipping information on screen', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        checkoutoverpage = new CheckoutOverPage(page)
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
        await expect(page.getByText("Checkout: Overview")).toHaveText("Checkout: Overview")
        await page.waitForTimeout(1000)
        // Payment and Shipping information display
    })
    test('User is able to validate the Price Total on screen', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        checkoutoverpage = new CheckoutOverPage(page)
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
        await expect(page.getByText("Checkout: Overview")).toHaveText("Checkout: Overview")
        await page.waitForTimeout(1000)
        // Validation for Price Total on screen
    })
    test('User is able to validate the Total amount ', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        checkoutoverpage = new CheckoutOverPage(page)
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
        await expect(page.getByText("Checkout: Overview")).toHaveText("Checkout: Overview")
        await page.waitForTimeout(1000)
        // Validation for Total amount 
    })
    test('User is able to cancel the checkout process', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        checkoutoverpage = new CheckoutOverPage(page)
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
        await expect(page.getByText("Checkout: Overview")).toHaveText("Checkout: Overview")
        await page.waitForTimeout(1000)
        await page.locator('#cancel').click()
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.waitForTimeout(1000)
    })
        test('If user is logged in with error_user then check the output', async ({ page }) => {
            homepage = new HomePage(page)
            productpage = new ProductPage(page)
            yourcartpage = new YourCartPage(page)
            checkoutinfopage = new CheckoutInfoPage(page)
            checkoutoverpage = new CheckoutOverPage(page)
            await homepage.navigate()
            await expect(page).toHaveTitle("Swag Labs")
    
            
            await homepage.login("error_user","secret_sauce")
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
            
            await expect(page.getByText("Checkout: Overview")).toHaveText("Checkout: Overview")
            await page.waitForTimeout(1000)
            await checkoutoverpage.finish.click()
            await expect(page.getByText("Checkout: Complete!")).toHaveText("Checkout: Complete!")
            
            // page.on('console', msg => {
            //     if (msg.type() === 'error')
            //       console.log(`Error text: "${msg.text()}"`);
            // })
        })
    
    
})