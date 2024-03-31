import { test, expect } from '@playwright/test';
import HomePage from './pages/home.page';
import ProductPage from './pages/product.page';
import YourCartPage from './pages/yourcart.page';
test.describe('Product screen', () => {
    let homepage:HomePage;
    let productpage:ProductPage;
    let yourcartpage:YourCartPage;
    test('User is able to select all items', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        const cartids: string[] = ["add-to-cart-sauce-labs-backpack","add-to-cart-sauce-labs-bike-light","add-to-cart-sauce-labs-bolt-t-shirt","add-to-cart-sauce-labs-fleece-jacket","add-to-cart-sauce-labs-onesie"]
        for(var item of cartids){
            
            await page.locator(`#${item}`).click()
        }
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
    })
    test('User is able to click on remove button', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.waitForTimeout(1000)
        await page.locator('#remove-sauce-labs-backpack').click()
        await expect(page.locator("#add-to-cart-sauce-labs-backpack")).toHaveText("Add to cart")
    })
    test('User is able to add again previously removed item', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await page.waitForTimeout(1000)
        await page.locator('#remove-sauce-labs-backpack').click()
        await expect(page.locator("#add-to-cart-sauce-labs-backpack")).toHaveText("Add to cart")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await expect(page.locator("#remove-sauce-labs-backpack")).toHaveText("Remove")
    })
    test('User is able to select multiple items and remove them one by one', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        const cartids: string[] = ["sauce-labs-backpack","sauce-labs-bike-light","sauce-labs-bolt-t-shirt"]
        for(var item of cartids){
            
            await page.locator(`#add-to-cart-${item}`).click()
        }
        await page.waitForTimeout(1000)
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)
        for (var item of cartids){
            await page.locator(`#remove-${item}`).click()
        }        
        await page.waitForTimeout(1000)
        await yourcartpage.continueshopping.click()
        await page.waitForTimeout(1000)
        await expect(page.getByText("Products")).toHaveText("Products")      
    })
    test('User is able to select a item and move to cart screen', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        await productpage.shoppingcart.click()
        await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
        await page.waitForTimeout(1000)   
    })
})