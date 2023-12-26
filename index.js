//use strict";
import { getComments } from './api.js'
import { renderLogin } from './renderLogin.js';
import { formatDateTime } from './date.js';
import { renderComments } from './render.js';


// Запрос двнных в API на комментарий
let comments = [];
export let user = null;
export const setUser = (newUser) => {
    user = newUser;
};
export const fetchAndRenderComments = (comments) => { 
    getComments()
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: formatDateTime(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });
        comments = appComments;
        renderComments(comments);
    // }).then((response) => {
    //     buttonElement.disabled = false;
    //     loaderElement.textContent = "";
    });
};
// buttonElement.disabled = true;
// loaderElement.innerHTML = "Подождите пожалуйста, комментарии загружаются...";
fetchAndRenderComments(comments);
// renderLogin()
//Ркндер функция
//render.js
//Кнопка лайков
//likes.js
//Кнопка удаления
//delete.js
//форма добавления  


