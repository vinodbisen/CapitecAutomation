import {Page,Locator} from '@playwright/test'
class ProductPage{
    page:Page;
    shoppingcart: Locator;
    constructor(page:Page) {
        this.page = page;
        this.shoppingcart = page.locator('span.shopping_cart_badge')
    }
}
export default ProductPage;