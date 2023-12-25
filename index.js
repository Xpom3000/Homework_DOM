//use strict";
import { login, postComment } from './api.js'
import { fetchAndRenderComments } from './render.js';
import { renderComments } from './render.js';
import { initDeleteButtonsLisners } from './delete.js';
import { renderLogin } from './renderLogin.js';

const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const loaderElement = document.getElementById("loading");

// Запрос двнных в API на комментарий
let comments = [];
buttonElement.disabled = true;
loaderElement.innerHTML = "Подождите пожалуйста, комментарии загружаются...";
// fetchAndRenderComments(comments);
renderLogin()
//Ркндер функция
//render.js
//Кнопка лайков
//likes.js
//Кнопка удаления
//delete.js
//форма добавления  
buttonElement.addEventListener("click", () => {
    nameInputElement.style.backgroundColor = "white" ;
    commentInputElement.style.backgroundColor = "white";
    if (nameInputElement.value === "") {
    nameInputElement.style.backgroundColor = "red";
    return;
    }
    if (commentInputElement.value === "") {
    commentInputElement.style.backgroundColor = "red";
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
            //console.log(response);
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
        })
    };       
    handlePostClick();
    renderComments(comments);
    initDeleteButtonsLisners(comments);
});

