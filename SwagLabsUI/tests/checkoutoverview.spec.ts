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
        const pdescription: string[] = ["carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
        "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
        "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
        "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel."]
        const pprice: string[] = ["$29.99","$9.99","$15.99","$49.99","$7.99"]
        const tquantity = page.locator('#checkout_summary_container div[data-test*=inventory-item] div[data-test*=item-quantity]')

        for (const query of await tquantity.elementHandles()){
            await expect(await query.textContent()).toEqual('1');

            //console.log(await query.textContent());
        }
    
        const tdescription = page.locator('#checkout_summary_container div[data-test*=inventory-item] div[data-test*=inventory-item-desc]')
        var i = 0;
        for (const query of await tdescription.elementHandles()){
            await expect(await query.textContent()).toEqual(pdescription[i]);
            i = i+1;
            // console.log(await query.textContent());
        }
        var ii = 0;
        const tprice = page.locator('#checkout_summary_container div[data-test*=inventory-item] div[data-test*=inventory-item-price]')
        for (const query of await tprice.elementHandles()){
            await expect(await query.textContent()).toEqual(pprice[ii]);
            ii = ii+1;
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
        await expect(page.locator("div[data-test*=payment-info-value]")).toHaveText("SauceCard #31337")
        await expect(page.locator("div[data-test*=shipping-info-value]")).toHaveText("Free Pony Express Delivery!")
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
        var sum = 0;
        const tprice = page.locator('#checkout_summary_container div[data-test*=inventory-item] div[data-test*=inventory-item-price]')
        for (const query of await tprice.elementHandles()){
            var p = (await query.textContent());
            var pp = Number(p?.replace("$",""))
            sum = sum+pp;
        }
        let tval = await page.locator("div[data-test*=subtotal-label]").textContent()
        // console.log(tval)
        // console.log(sum)
        var ttval = tval?.split("$")
        // console.log(ttval[1])
        // var ttval = tval?.replace("$","")
        await expect(Number(ttval[1])).toBe(sum)
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
        let tval = await page.locator("div[data-test*=subtotal-label]").textContent()
        var ttval = tval?.split("$")
        let ttax = await page.locator("div[data-test*=tax-label]").textContent()
        var tttax = ttax?.split("$")
        let ttotal = await page.locator("div[data-test=total-label]").textContent()
        var tttotal = ttotal?.split("$")
        var gtotal = Number(ttval[1])+Number(tttax[1])
        await expect(Number(tttotal[1])).toBe(Number(gtotal.toFixed(2)))

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