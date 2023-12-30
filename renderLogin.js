import { login, setToken } from "./api.js";
import { fetchAndRenderComments, setUser } from "./index.js";
import { registrationLogin } from "./renderRegistration.js";

    export const renderLogin = () => {
        const appElement = document.getElementById("app")
        const loginHtml = `
            <div class="container" id="add-container">
                <ul class="comments" id="comments" ></ul>
                <div id="loading"></div>
                <div class="login-form" id="login-form">
                    <h2>Форма входа</h2>
                    <input type="text" class="add-form-login" placeholder="Логин" id="login-input"/>
                    <input type="text" class="add-form-password" placeholder="Пороль" rows="4" id="password-input"/>
                    <div class="login-form-row">
                      <button class="login-form-button" id="login-button">Войти</button>
                    </div>
                    <button class="login-button" id="registration-button">Регистрация</button>
                </div>
            </div>`;
        appElement.innerHTML = loginHtml;

        const loginInputElement = document.getElementById('login-input');
        const passwordInputElement = document.getElementById('password-input');
        const loginButtonElement = document.getElementById('login-button');

        loginButtonElement.addEventListener("click", () => {
            loginInputElement.style.backgroundColor = "white" ;
            passwordInputElement.style.backgroundColor = "white";
            if (loginInputElement.value === "" || passwordInputElement.value === "") {
                loginInputElement.style.backgroundColor = "pink";
                passwordInputElement.style.backgroundColor = "pink"
            return;
            }
            loginButtonElement.disabled = true;
            loginButtonElement.textContent = "Идет авторизация.";
            const handleLoginClick = () => {
                login({
                    login: loginInputElement.value,
                    password: passwordInputElement.value,
                }).then((responseData) => {
                    setToken(responseData.user.token);
                    setUser(responseData.user);
                }).then(() => {
                    fetchAndRenderComments(comments);
                }).then(() => {
                    loginButtonElement.disabled = false;
                    loginButtonElement.textContent = "Войти";
                    loginInputElement.value = "";
                    passwordInputElement.value = "";
                });
            };
          handleLoginClick();
        });
      
        const registrationButtonElement = document.getElementById('registration-button')
        registrationButtonElement.addEventListener("click", () => {   
            registrationLogin();
        });
      
    };
