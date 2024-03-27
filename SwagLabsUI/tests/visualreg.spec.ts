import { chromium, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';
import { pixelmatch } from 'pixelmatch';
import { test, expect } from '@playwright/test';
import HomePage from './pages/home.page';
import ProductPage from './pages/product.page';
import YourCartPage from './pages/yourcart.page';
import CheckoutInfoPage from './pages/checkoutinfo.page';
import CheckoutOverPage from './pages/checkoutoverview.page';

async function captureScreenshot(page: Page, txt: string, outputDir: string) {
    await page.screenshot({ path: `${outputDir}/${txt}.png`, fullPage: true });
}

function compareImages(img1Path: string, img2Path: string, diffOutputPath: string): number {
    const fs = require('fs');
    const PNG = require('pngjs').PNG;
    const pixelmatch = require('pixelmatch');

    const img1 = PNG.sync.read(fs.readFileSync(img1Path));
    const img2 = PNG.sync.read(fs.readFileSync(img2Path));
    const { width, height } = img1;
    const diff = new PNG({ width, height });
    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    fs.writeFileSync(diffOutputPath, PNG.sync.write(diff));
    return numDiffPixels;
}


test.describe('Visual Regression', () => {
    let homepage: HomePage;
    let productpage: ProductPage;
    let yourcartpage: YourCartPage;
    let checkoutinfopage: CheckoutInfoPage;
    let checkoutoverpage: CheckoutOverPage;
    test('User is able to compare difference between user interface', async ({ page }) => {
        homepage = new HomePage(page)
        productpage = new ProductPage(page)
        yourcartpage = new YourCartPage(page)
        checkoutinfopage = new CheckoutInfoPage(page)
        checkoutoverpage = new CheckoutOverPage(page)
        const users: string[] = ["standard_user", "visual_user"];
        const outputDir = "visual_regression_results";
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        for (var user of users) {
            await homepage.navigate()

            //screenshot
            await captureScreenshot(page, `${user}_home`, outputDir);
            await expect(page).toHaveTitle("Swag Labs")
            await homepage.login(user, "secret_sauce")
            //screenshot
            await captureScreenshot(page, `${user}_products`, outputDir);

            await expect(page.getByText("Products")).toHaveText("Products")

            const cartids: string[] = ["add-to-cart-sauce-labs-backpack", "add-to-cart-sauce-labs-bike-light", "add-to-cart-sauce-labs-bolt-t-shirt", "add-to-cart-sauce-labs-fleece-jacket", "add-to-cart-sauce-labs-onesie"]
            for (var item of cartids) {

                await page.locator(`#${item}`).click()
            }
            await page.waitForTimeout(1000)
            await captureScreenshot(page, `${user}_products_add_items`, outputDir);
            await productpage.shoppingcart.click()

            //screenshot
            await captureScreenshot(page, `${user}_your_cart`, outputDir);
            await expect(page.getByText("Your Cart")).toHaveText("Your Cart")
            await page.waitForTimeout(1000)
            await yourcartpage.checkout.click()
            //screenshot
            await captureScreenshot(page, `${user}_checkout_info`, outputDir);

            await expect(page.getByText("Checkout: Your Information")).toHaveText("Checkout: Your Information")
            await checkoutinfopage.filluserinfo("Vinod", "Bisen", "7550")
            //screenshot
            await captureScreenshot(page, `${user}_checkout_overview`, outputDir);
            await expect(page.getByText("Checkout: Overview")).toHaveText("Checkout: Overview")
            await page.waitForTimeout(1000)
            await checkoutoverpage.finish.click()
            //screenshot
            await captureScreenshot(page, `${user}_checkout_complete`, outputDir);
            await expect(page.getByText("Checkout: Complete!")).toHaveText("Checkout: Complete!")

            await page.locator("#react-burger-menu-btn").click()
            await page.getByText("Logout").click()
            await page.waitForTimeout(1000)
        }

        const uscreens: string[] = ["home", "products", "products_add_items", "your_cart", "checkout_info", "checkout_overview", "checkout_complete"];
        for(var screen of uscreens)
        {
            const baselineImgPath = path.join(outputDir, `${users[0]}_${screen}.png`);
            //console.log(baselineImgPath)
            const newImgPath = path.join(outputDir, `${users[1]}_${screen}.png`);
            //console.log(newImgPath)
            const diffImgPath = path.join(outputDir, `diff_${screen}.png`);
            //console.log(diffImgPath)
            const numDiffPixels = compareImages(baselineImgPath, newImgPath, diffImgPath);
            if (numDiffPixels === 0) {
                console.log(`No visual differences found.`);
            } else {
                console.log(`Visual differences found. Diff image saved to ${diffImgPath}`);
            }
        }
    })

})
