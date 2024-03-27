import { test, expect } from '@playwright/test';
import HomePage from './pages/home.page';
import ProductPage from './pages/product.page';
test.describe('Product screen', () => {
    let homepage:HomePage;
    let productpage:ProductPage;
    test('User is able to select a item', async ({ page }) => {
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
        await page.locator("#add-to-cart-sauce-labs-backpack").click()
        await expect(page.locator("#remove-sauce-labs-backpack")).toHaveText("Remove")
        await page.locator("#remove-sauce-labs-backpack").click()
        await expect(page.locator("#add-to-cart-sauce-labs-backpack")).toHaveText("Add to cart")
        await page.waitForTimeout(1000) 
    })
    test('User is able to add again previously removed item', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")      
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator("#add-to-cart-sauce-labs-backpack").click()
        await expect(page.locator("#remove-sauce-labs-backpack")).toHaveText("Remove")
        await page.locator("#remove-sauce-labs-backpack").click()
        await expect(page.locator("#add-to-cart-sauce-labs-backpack")).toHaveText("Add to cart")
        await page.locator("#add-to-cart-sauce-labs-backpack").click()
        await expect(page.locator("#remove-sauce-labs-backpack")).toHaveText("Remove")
        await page.waitForTimeout(1000) 
    })
    test('User is able to select multiple items and remove them one by one', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")      
        await homepage.login("standard_user","secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await page.locator("#add-to-cart-sauce-labs-backpack").click()
        await expect(page.locator("#remove-sauce-labs-backpack")).toHaveText("Remove")
        await page.locator("#remove-sauce-labs-backpack").click()
        await expect(page.locator("#add-to-cart-sauce-labs-backpack")).toHaveText("Add to cart")
        await page.locator("#add-to-cart-sauce-labs-backpack").click()
        await expect(page.locator("#remove-sauce-labs-backpack")).toHaveText("Remove")
        await page.waitForTimeout(1000) 
    })
})
