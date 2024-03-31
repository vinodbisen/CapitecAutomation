import {Page,Locator} from '@playwright/test'
class SidebarMenu{
    page:Page;
    burgermenu: Locator;
    allproduct: Locator;
    about: Locator;
    logout: Locator;
    resetappstate: Locator;
    constructor(page:Page) {
        this.page = page;
        this.burgermenu = page.locator('#react-burger-menu-btn');
        this.allproduct = page.locator('#inventory_sidebar_link');
        this.about = page.locator('#about_sidebar_link');
        this.logout = page.locator('#logout_sidebar_link');
        this.resetappstate = page.locator('#reset_sidebar_link');
    }
}
export default SidebarMenu;