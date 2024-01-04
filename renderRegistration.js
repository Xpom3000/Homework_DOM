import { registration } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { fetchAndRenderComments } from "./index.js";

export const registrationLogin = () => {
  const appElement = document.getElementById("app");
  const registrationHtml = `
    <div class="container" id="add-container">
    <ul class="comments" id="comments" >
     <!--Список берется из JS-->
    </ul>
    <div id="loading"></div>
    <div class="login-form" id="login-form">
      <h2>Форма регистрации</h2>
      <input type="text" class="add-form-login" placeholder="Введите логин" id="login-input"/>
      <input type="text" class="add-form-password" placeholder="Введите имя" rows="4" id="name-input"/>
      <input type="text" class="add-form-password" placeholder="Введите пороль" rows="4" id="password-input"/>
      <div class="login-form-row">
      <button class="login-form-button" id="registration-button">Зарегистрироваться</button>
      </div>
      <button class="login-button" id="login-button">Войти</button>
    </div>
  </div>`;
  appElement.innerHTML = registrationHtml;

  const registrationButtonElement = document.getElementById(
    "registration-button",
  );
  const loginInputElement = document.getElementById("login-input");
  const namedInputElement = document.getElementById("name-input");
  const passwordInputElement = document.getElementById("password-input");

  console.log(registrationButtonElement);
  registrationButtonElement.addEventListener("click", () => {
    console.log("ИГорь");
    loginInputElement.style.backgroundColor = "white";
    namedInputElement.style.backgroundColor = "white";
    passwordInputElement.style.backgroundColor = "white";
    if (
      loginInputElement.value === "" ||
      namedInputElement.value === "" ||
      passwordInputElement.value === ""
    ) {
      namedInputElement.style.backgroundColor = "pink";
      passwordInputElement.style.backgroundColor = "pink";
      return;
    }
    registrationButtonElement.disabled = true;
    registrationButtonElement.textContent = "Идет регистрация.";
    registration({
      login: loginInputElement.value,
      name: namedInputElement.value,
      password: passwordInputElement.value,
    })
      .then(() => {
        // eslint-disable-next-line no-undef
        return fetchAndRenderComments(comments);
      })
      .then(() => {
        return renderLogin();
      })
      .catch((error) => {
        registrationButtonElement.disabled = false;
        registrationButtonElement.textContent = "Войти";
        if (error.message === "Неверный запрос") {
          alert("Такой пользователь уже существует");
        }
      });
  });
  const loginButtonElement = document.getElementById("login-button");
  loginButtonElement.addEventListener("click", () => {
    renderLogin();
  });
};
