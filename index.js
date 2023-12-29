//use strict";
import { getComments, likeComment } from './api.js'
import { formatDateTime } from './date.js';
import { renderComments } from './render.js';

// Запрос двнных в API на комментарий
let comments = [];
// export let user = getUserFromLocalStorage;

export let user = null;
export const setUser = (newUser) => {
    user = newUser;
};

export const fetchAndRenderComments = (comments) => { 
    getComments()
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                id: comment.id,
                name: comment.author.name,
                date: formatDateTime(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });
        comments = appComments;
        renderComments(comments);
        likeComment({ id });
    });
};
fetchAndRenderComments(comments);
// renderLogin()
//Ркндер функция
//render.js
//Кнопка лайков
//likes.js
//Кнопка удаления
//delete.js
//форма добавления  


