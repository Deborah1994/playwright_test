import {login, product_page, notify} from "../support/locators";
import * as data from "../support/data.json";

const {test, expect, page} = require('@playwright/test');

test.beforeEach(async({page}) => {
    await page.goto('/');
})
test("Login com usuário normal", async ({page}) => {
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

test("Login com usuário inexistente", async({page}) => {

    //add dado inexistente no campo de username
    await page.locator(login.username_field).fill('Nana');

    //add dado no campo de password
    await page.locator(login.password_field).fill(data.password);

    //clicar no botão de login
    await page.locator(login.login_button).click();

    //checar se usuário não logou na página através do título da página que seria redirecionada
    await expect(page.locator(product_page.title)).not.toBeVisible();

    //checar se usuário continua na página
    await expect(page.url()).toBe('https://www.saucedemo.com/');

    //checar se usuário visualize notificação de erro
    await expect(page.locator(notify.error)).toBeVisible();
    await expect(page.locator(notify.error)).toHaveText('Epic sadface: Username and password do not match any user in this service');
    
})

test("Login com usuário bloqueado", async({page}) => {

    //add dado bloqueado no campo de username
    await page.locator(login.username_field).fill(data.locked_user);

    //add dado no campo de password
    await page.locator(login.password_field).fill(data.password);

    //clicar no botão de login
    await page.locator(login.login_button).click();

    //checar se usuário não logou na página através do título da página que seria redirecionada
    await expect(page.locator(product_page.title)).not.toBeVisible();

    //checar se usuário continua na página
    await expect(page.url()).toBe('https://www.saucedemo.com/');

    //checar se usuário visualize notificação de erro
    await expect(page.locator(notify.error)).toBeVisible();
    await expect(page.locator(notify.error)).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    
})

test("Login com usuário em branco", async ({page}) => {

    //add dado no campo de password
    await page.locator(login.password_field).fill(data.password)

    //clicar no botão de login
    await page.locator(login.login_button).click()

    //checar se usuário não logou na página através do título da página que seria redirecionada
    await expect(page.locator(product_page.title)).not.toBeVisible();

    //checar se usuário continua na página
    await expect(page.url()).toBe('https://www.saucedemo.com/');

    //checar se usuário visualize notificação de erro
    await expect(page.locator(notify.error)).toBeVisible();
    await expect(page.locator(notify.error)).toHaveText('Epic sadface: Username is required');
})

test("Login com senha em branco", async ({page}) => {

    //add dado existente no campo de username
    await page.locator(login.username_field).fill(data.standard_user);

    //clicar no botão de login
    await page.locator(login.login_button).click();

    //checar se usuário continua na página
    await expect(page.url()).toBe('https://www.saucedemo.com/');

    //checar se usuário visualize notificação de erro
    await expect(page.locator(notify.error)).toBeVisible();
    await expect(page.locator(notify.error)).toHaveText('Epic sadface: Password is required')
})