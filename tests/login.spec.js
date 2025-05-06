import {login, product_page} from "../support/locators";
import * as data from "../support/data.json";

const {test, expect} = require('@playwright/test');


test("Login com usuário normal", async ({page}) => {

    await page.goto('https://www.saucedemo.com/');
    // para abrir o debug, add o await page.pause()

    //add dado no campo de username
    await page.locator(login.username_field).fill(data.standard_user);

    //add dado no campo de password
    await page.locator(login.password_field).fill(data.password);

    //clicar no botão de login
    await page.locator(login.login_button).click();

    //checar se usuário logou na página através do título do página redirecionada
    await expect(page.locator(product_page.title)).toBeVisible();

})