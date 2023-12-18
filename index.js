//use strict";
import { postComment } from './api.js'
import { fetchAndRenderComments } from './render.js';
import { renderComments } from './render.js';
// import { initDeleteButtonsLisners } from './delete.js';
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const addForm = document.getElementById("add-form");
const container = document.getElementById("add-container");
const loaderElement = document.getElementById("loading");


// Запрос двнных в API на комментарий
let comments = [];
buttonElement.disabled = true;
loaderElement.innerHTML = "Подождите пожалуйста, комментарии загружаются...";
// const fetchAndRenderComments = () => { 
//     getComments()
//     .then((responseData) => {
//         const appComments = responseData.comments.map((comment) => {
//             return {
//                 name: comment.author.name,
//                 date: formatDateTime(comment.date),
//                 text: comment.text,
//                 likes: comment.likes,
//                 isLiked: false,
//             };
//         });
//         comments = appComments;
//         renderComments();
//     }).then((response) => {
//         buttonElement.disabled = false;
//         loaderElement.textContent = "";
//     });
// };
fetchAndRenderComments(comments);
//Ркндер функция
//render.js
//Кнопка лайков
//likes.js

// export const initLikesListeners = (comments) => {
//     for (const commentElement of document.querySelectorAll(".like-button")) {
//         // Добавляет обработчик клика на конкретный элемент в списке
//         commentElement.addEventListener("click", (event) => {
//             event.stopPropagation();
//             const index = commentElement.dataset.index;
//             comments[index].likes += comments[index].isLike ? -1 : +1;
//             comments[index].isLike = !comments[index].isLike;
//             renderComments(comments);
//         }); 
//     };
    
// };

//Кнопка удаления
//delete.js
// export const initDeleteButtonsLisners = (comments) => {
//     const deleteButtonsElements = document.querySelectorAll(".delete-form-button");
//     for (const deleteButtonsElement of deleteButtonsElements) {
//         deleteButtonsElement.addEventListener("click", (event) => {
//             event.stopPropagation();
//             const index = deleteButtonsElement.dataset.index;
//             comments.splice(index, 1);
//             renderComments(comments);
//         });
//     }; 
// };
// renderComments(comments);

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
            }  
            console.warn(error);
        })
    };       
    handlePostClick();
    renderComments(comments);
    initDeleteButtonsLisners(comments);
});

