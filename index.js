//use strict";
import { getComments} from './api.js'
import { formatDateTime } from './date.js';
import { renderComments } from './render.js';
import { setToken } from './api.js';
import {
    getUserFromLocalStorage,
    saveUserToLocalStorage,
    removeUserFromLocalStorage
} from './helpers.js'

// Запрос двнных в API на комментарий
let comments = [];
// Берем данные user из localStorage
// export let user = getUserFromLocalStorage();
export let user = null;
export const setUser = (newUser) => {
    user = newUser;
    saveUserToLocalStorage(user)
};

export const logout = () => {
    user = null;
    removeUserFromLocalStorage();
  };

export const fetchAndRenderComments = (comments) => { 
    getComments({ token: setToken() })
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                id: comment.id,
                name: comment.author.name,
                date: formatDateTime(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: comment.isLikedlikes
            };
        });
        comments = appComments;
        renderComments(comments);
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

