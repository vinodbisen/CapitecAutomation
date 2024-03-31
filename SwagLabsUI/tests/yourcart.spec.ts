import { test, expect } from '@playwright/test';
import HomePage from './pages/home.page';
import ProductPage from './pages/product.page';
import YourCartPage from './pages/yourcart.page';

test.describe('Cart screen', () => {
    let homepage:HomePage;
    let productpage:ProductPage;
    let yourcartpage:YourCartPage;
    test('User is able to select multiple items to cart', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
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
    })
    test('User is able to validate the added quantity of item', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        let yourcartpage:YourCartPage;
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        
        //await expect(page.locator('[data-testid="item-quantity"]').first()).toHaveText("1")
        await page.waitForTimeout(1000)
    })
    test('User is able to increase or decrease the quantity of items on your cart screen', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        //await page.locator('#cart_quantity').fill()
        // need to add validation for the quantity increase or decrese
    })
    test('User is able to validate the description of the item ', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        //validate the description of product added
    })
    test('User is able to validate the price of the item', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        //validate the price of product added
    })
    test('User is able to click on continue shopping button go back to product screen', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        await page.locator('#continue-shopping').click()
        await expect(page.getByText("Products")).toHaveText("Products")
    })
    test('User is able to click on Checkout button and go to Checkout user information screen', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        await yourcartpage.checkout.click()
        await expect(page.getByText("Checkout: Your Information")).toHaveText("Checkout: Your Information")
        await page.waitForTimeout(1000)
    })
})