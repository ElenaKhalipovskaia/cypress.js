import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe("Проверка авторизации", function () {

beforeEach('Начало теста', function () {
        cy.visit("/"); //Открыть сайт
        cy.get (main_page.forgot_pass_btn).should("have.css", "color", "rgb(0, 85, 152)"); //Проверить цвет кнопки "Забыл пароль"
});
afterEach('Конец теста', function () {
        cy.get (result_page.close).should("be.visible"); //Проверить, что после авторизации видна кнопка выхода
});
it("Верный логин и верный пароль", function () {
        cy.get(main_page.email).type(data.login); //Ввести верный логин
        cy.get(main_page.password).type(data.password); //Ввести верный пароль
        cy.get(main_page.login_button).click(); //Нажать на кнопку "Войти"

        cy.get(result_page.title).contains("Авторизация прошла успешно"); // Проверить, что после авторизации виден текст
        cy.get(result_page.title).should("be.visible"); //Проверить, что текст виден пользователю   
})
it("Верный логин и неверный пароль", function () {
        cy.get(main_page.email).type(data.login); //Ввести верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); //Ввести неверный пароль
        cy.get(main_page.login_button).click(); //Нажать на кнопку "Войти"
       
        cy.get(result_page.title).contains("Такого логина или пароля нет"); // Проверить, какой текст виден пользователю
        cy.get(result_page.title).should("be.visible"); //Проверить, что текст виден пользователю   
})
it("Неверный логин и верный пароль", function () {
        cy.get(main_page.email).type('german@tolnikov.ru'); //Ввести неверный логин
        cy.get(main_page.password).type(data.password); //Ввести верный пароль
        cy.get(main_page.login_button).click(); //Нажать на кнопку "Войти"
       
        cy.get(result_page.title).contains("Такого логина или пароля нет"); // Проверить, какой текст виден пользователю
        cy.get(result_page.title).should("be.visible"); //Проверить, что текст виден пользователю   
})
it("Невалидный логин и верный пароль", function () {
        cy.get(main_page.email).type('germandolnikov.ru'); //Ввести логин без "@"
        cy.get(main_page.password).type(data.password); //Ввести верный пароль
        cy.get(main_page.login_button).click(); //Нажать на кнопку "Войти"
       
        cy.get(result_page.title).contains("Нужно исправить проблему валидации"); // Проверить, какой текст виден пользователю
        cy.get(result_page.title).should("be.visible"); //Проверить, что текст виден пользователю   
})
it("Приведение к нижнему регистру", function () {
        cy.get(main_page.email).type('GERMAN@DOLNIKOV.RU'); //Ввести логин с заглавными буквами
        cy.get(main_page.password).type(data.password); //Ввести верный пароль
        cy.get(main_page.login_button).click(); //Нажать на кнопку "Войти"
       
        cy.get(result_page.title).contains("Авторизация прошла успешно"); // Проверить, какой текст виден пользователю
        cy.get(result_page.title).should("be.visible"); //Проверить, что текст виден пользователю   
})
it("Восстановить пароль", function () {
        cy.get(main_page.forgot_pass_btn).click(); //Нажать на кнопку "Забыл пароль"
        cy.get(recovery_password_page.email).type(data.login); //Ввести верный логин 
        cy.get(recovery_password_page.send_button).click(); //Нажать на кнопку "Отправить код"

        cy.get(result_page.title).contains("Успешно отправили пароль на e-mail"); // Проверить, какой текст виден пользователю
        cy.get(result_page.title).should("be.visible"); //Проверить, что текст виден пользователю   
})
})       