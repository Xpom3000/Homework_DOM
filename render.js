import { getComments } from './api.js'
import { formatDateTime } from './date.js';
import { initLikesListeners } from './likes.js';
import { initDeleteButtonsLisners } from './delete.js';
// import { initLikesListeners } from './index.js';
// import { initDeleteButtonsLisners } from './index.js';

const commentsElement = document.getElementById("comments");
const buttonElement = document.getElementById("add-button");
const loaderElement = document.getElementById("loading");
const commentInputElement = document.getElementById("comment-input");
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
    }).then((response) => {
        buttonElement.disabled = false;
        loaderElement.textContent = "";
    });
};

export const renderComments = (comments) => {
    const commentsHtml = comments
        .map((comment, index) => {
            return `<li class="comment" data-index="${index}" id="comment">
                <div class="comment-header" >
                    <div class="comment-name">${comment.name}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${comment.text}</div>
                </div>
                <div class="comment-footer">
                    <button id=delete-form-button class="delete-form-button" data-index="${index}">Удалить</button>
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="${comment.isLike ? 'like-button active-like': 'like-button'} " data-index="${index}"></button>
                    </div>
                </div>
             </li>`;
        }).join("");
    
    commentsElement.innerHTML = commentsHtml;
    
    // кнопка Цитирования
    const quoteElements = document.querySelectorAll(".comment");
    for (const comment of quoteElements) {
        comment.addEventListener("click", () => {
        const index = comment.dataset.index;
            const comentText = comments[index].text;
            const comentAuthor = comments[index].name;

            commentInputElement.value = `>${comentAuthor} ${comentText} `;
        })
    };

    initLikesListeners(comments);
    initDeleteButtonsLisners(comments);
};