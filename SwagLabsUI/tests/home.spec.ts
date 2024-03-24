import { test, expect } from '@playwright/test';
import HomePage from './pages/home.page';
test.describe('Login screen', () => {
    let homepage:HomePage;
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
    
})
