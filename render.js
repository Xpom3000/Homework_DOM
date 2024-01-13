import { renderLogin } from './renderLogin.js';
import { initLikesListeners } from './likes.js';
import { initDeleteButtonLisners } from './delete.js';
import { postComment } from './api.js'
import { fetchAndRenderComments, user} from './index.js';

export const renderComments = (comments) => {
    console.log(comments);
    const appElement = document.getElementById("app")
    const commentsHtml = comments
        .map((comment, index ) => {
            return `<li class="comment"  data-index="${index}" id="comment">
                <div class="comment-header" >
                    <div class="comment-name">${comment.name}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${comment.text}</div>
                </div>
                <div class="${user ? "comment-footer": "comment-footer-notUser"}">
                    <button id=delete-form-button class="${user? "delete-form-button ": "delete-button "}" data-id="${comment.id}">Удалить</button>
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="${comment.isLike? 'like-button active-like': 'like-button'} " data-id="${comment.id}" ></button>
                    </div>
                </div>
             </li>`;
        }).join("");
    const appHtml = `
    <div class="container" id="add-container">
        <ul class="comments" id="comments" >${commentsHtml}</ul>
        ${user? `
        <div id="loading"></div>
        <div class="add-form" id="add-form">
            <input type="text" class="add-form-name" placeholder="Введите ваше имя"  id="name-input" value="${user?.name}" readonly/>
            <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4" id="comment-input"></textarea>
            <div class="add-form-row">
                 <button class="add-form-button" id="add-button">Написать</button>
            </div>
        </div>` :'<button class="link-form-button" id="login-button">Чтобы добавить коментарий, <a class="link">авторизуйтесь</a> </button>'}

    </div>`;
    appElement.innerHTML = appHtml;
    // кнопка Цитирования
    const quoteElements = document.querySelectorAll(".comment");
    const commentInputElement = document.getElementById("comment-input");
    for (const comment of quoteElements) {
        comment.addEventListener("click", () => {
        const index = comment.dataset.index;
            const comentText = comments[index].text;
            const comentAuthor = comments[index].name;
            commentInputElement.value = `<${comentAuthor}> ${comentText} `;
        })
    };

    initLikesListeners(comments);
    initDeleteButtonLisners(comments);

    if (user) {
        const buttonElement = document.getElementById("add-button");
        const nameInputElement = document.getElementById("name-input");
        const commentInputElement = document.getElementById("comment-input");
        // const loaderElement = document.getElementById("loading");
       
        buttonElement.addEventListener("click", () => {
            nameInputElement.style.backgroundColor = "white" ;
            commentInputElement.style.backgroundColor = "white";
            if (nameInputElement.value === "") {
            nameInputElement.style.backgroundColor = "pink";
            return;
            } if (commentInputElement.value === "") {
            commentInputElement.style.backgroundColor = "pink";
            return;
            }

            buttonElement.disabled = true;
            buttonElement.textContent = "Комментарий добавляется...";
            const handlePostClick = () => {
                postComment(
                    nameInputElement.value,
                    commentInputElement.value,
                )
                .then((response) => {
                    if (response.status === 201) {
                        return response.json();
                    }
                    if (response.status === 400) {
                        throw new Error("Неверный запрос");
                    } if (response.status === 500) {
                        throw new Error("Сервер упал");
                    }
                })
                .then((responseData) => {
                    return fetchAndRenderComments(comments);
                })
                .then(() => {
                    buttonElement.disabled = false;
                    buttonElement.textContent = "Написать";
                    nameInputElement.value = "";
                    commentInputElement.value = "";
                })
                .catch((error) => {
                    buttonElement.disabled = false;
                    buttonElement.textContent = "Написать";
                    if (error.message === "Неверный запрос") {
                        alert("Имя и комментарий должны быть не короче 3 символов")
                    } if (error.message === "Сервер упал") {
                        alert("Кажется, что-то пошло не так, попробуй позже")
                        handlePostClick();
                    } if (error.message === 'Failed to fetch') {
                        alert("Кажется,сломался интернет, попробуй позже");
                    }
                    console.warn(error);
                });
            };       
            initDeleteButtonLisners(comments);
            handlePostClick();
            renderComments(comments);
        });
    } else {
        const loginButtonElement = document.getElementById('login-button')
        loginButtonElement.addEventListener("click", () => {   
        renderLogin();
    });
    } 
   
};
