import { login, setToken } from "./api.js";
import { fetchAndRenderComments } from "./index.js";



export const renderLogin = () => {
  const appElement = document.getElementById("app")
  const loginHtml = `
    <div class="container" id="add-container">
      <ul class="comments" id="comments" >
       <!--Список берется из JS-->
      </ul>
      <div id="loading"></div>
      <div class="login-form" id="login-form">
        <h2>Форма входа</h2>
        <input type="text" class="add-form-login" placeholder="Логин" id="login-input"/>
        <input type="text" class="add-form-password" placeholder="Пороль" rows="4" id="password-input"/>
        <div class="login-form-row">
          <!--<button class="login-form-button" id="add-button">Войти</button>-->
          <!--<button class="link-form-button"  id="link-to-login">Зарегистрироваться</button>-->
          <button class="login-form-button" id="login-button">Войти</button>
        </div>
      </div>
    </div>`;
  appElement.innerHTML = loginHtml;

  const loginInputElement = document.getElementById('login-input');
  const passwordInputElement = document.getElementById('password-input');
  const loginButtonElement = document.getElementById('login-button')
  // console.log(loginButtonElement)
  
  loginButtonElement.addEventListener("click", () => {
    // console.log("ИГорь")
   
      if (!loginInputElement.value || !passwordInputElement.value) {
        alert("Вы не ввели логин или пороль");
        return;
      }
      login({
        login: loginInputElement.value,
        password: passwordInputElement.value,
      }).then((responseData) => {
        // console.log(token);
        setToken(responseData.user.token);
        console.log(responseData.user.token);
      }).then(() => {
        fetchAndRenderComments(comments);
      })
    });

  renderLogin();
};


// const loginButtonElement = document.getElementById("login-button");
// const loginInputElement = document.getElementById("login-input");
// const passwordInputElement = document.getElementById("password-input");
// export const intitLoginButtonElement = () => {
//   console.log(loginButtonElement);
//   loginButtonElement.addEventListener("click", () => {
//     if (!loginInputElement.value || !passwordInputElement) {
//       alert("Вы не ввели логин или пороль");
//       return;
//     }
//     buttonElement.disabled = true;
//     buttonElement.textContent = "Комментарий добавляется...";
//     login({
//       login: loginInputElement.value,
//       password: passwordInputElement.value,
//     })
//       .then((responseData) => {
//         setToken(responseData.user.token);
//         console.log(token);
//         setUser(responseData.user)
//       })
//       .then(() => {
//         fetchAndRenderComments(comments);
//       })
//       .then(() => {
//         intitLoginButtonElement()
//       });
//   });
  
// }