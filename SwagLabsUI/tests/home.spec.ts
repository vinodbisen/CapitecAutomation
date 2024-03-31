import { test, expect } from '@playwright/test';
import HomePage from './pages/home.page';
import SidebarMenu from './pages/sidebarmenu.page';
test.describe('Login screen', () => {
    let homepage:HomePage;
    let sidebarmenu:SidebarMenu;
    test('User is able to view the login screen', async ({ page }) => {
        homepage = new HomePage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
    })
    test('User is able to login', async ({ page }) => {
        homepage = new HomePage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")       
        await homepage.login("standard_user","secret_sauce")       
        await expect(page.getByText("Products")).toHaveText("Products")
    })
    test('Check if user is able to input username as uppercase', async ({ page }) => {
        homepage = new HomePage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")       
        await homepage.login("STANDARD_USER","secret_sauce")       
        await expect(page.locator("h3")).toHaveText("Epic sadface: Username and password do not match any user in this service")
    })
    test('Check if user is able to input username as special charater', async ({ page }) => {
        homepage = new HomePage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")       
        await homepage.login("!@%_US&^","secret_sauce")       
        await expect(page.locator("h3")).toHaveText("Epic sadface: Username and password do not match any user in this service")
    })
    test('Check if user is able to input username as numbers', async ({ page }) => {
        homepage = new HomePage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")       
        await homepage.login("123456789","secret_sauce")       
        await expect(page.locator("h3")).toHaveText("Epic sadface: Username and password do not match any user in this service")
    })
    test('Check if user is able to input nothing in username place', async ({ page }) => {
        homepage = new HomePage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")       
        await homepage.login("","secret_sauce")       
        await expect(page.locator("h3")).toHaveText("Epic sadface: Username is required")
    })
    test('Check if user is able to input nothing in password place', async ({ page }) => {
        homepage = new HomePage(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")       
        await homepage.login("standard_user","")       
        await expect(page.locator("h3")).toHaveText("Epic sadface: Password is required")
    })
    test('Login with multiple users', async ({ page }) => {
        homepage = new HomePage(page)
        sidebarmenu = new SidebarMenu(page)
        await homepage.navigate()
        await expect(page).toHaveTitle("Swag Labs")
        const users: string[] = ["standard_user","problem_user","performance_glitch_user","error_user","visual_user"]
        for(var user of users){
            
            await homepage.login(user,"secret_sauce")
            await expect(page.getByText("Products")).toHaveText("Products")
            await sidebarmenu.burgermenu.click()
            await sidebarmenu.logout.click()
        }
        await homepage.login("locked_out_user","secret_sauce")
        await expect(page.locator("h3")).toHaveText("Epic sadface: Sorry, this user has been locked out.")
        
    })
})  
