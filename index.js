//use strict";
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const likeInputElement = document.getElementById("like-input");
const commentsElement = document.getElementById("comments");
const addForm = document.getElementById("add-form");
const container = document.getElementById("add-container");
const loaderElement = document.getElementById("loading");
const formatDateTime = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth()).padStart(2, '0');
    const year = String(currentDate.getFullYear() - 2000);
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
};
// Запрос двнных в API на комментарий
let comments = [];
buttonElement.disabled = true;
loaderElement.textContent = "Подождите пожалуйста, комментарии загружаются...";
const fetchAndRenderComments = () => { 
    fetch("https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments", {
        method: "GET"
    }).then((response) => {
        response.json().then((responseData) => {
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
            renderComments();
        }).then((response) => {
            buttonElement.disabled = false;
            loaderElement.textContent = "";
        });
    });
};
fetchAndRenderComments();

function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
}

//Ркндер функция
const renderComments = () => {
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

    initLikesListeners();
    initDeleteButtonsLisners();
};
//Кнопка лайков
const initLikesListeners = () => {
    for (const commentElement of document.querySelectorAll(".like-button")) {
        // Добавляет обработчик клика на конкретный элемент в списке
        commentElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = commentElement.dataset.index;
            comments[index].likes += comments[index].isLike ? -1 : +1;
            comments[index].isLike = !comments[index].isLike;
            renderComments();
        }); 
    };
    
};
//Кнопка удаления 
const initDeleteButtonsLisners = () => {
    const deleteButtonsElements = document.querySelectorAll(".delete-form-button");
    for (const deleteButtonsElement of deleteButtonsElements) {
        deleteButtonsElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = deleteButtonsElement.dataset.index;
            comments.splice(index, 1);
            renderComments();
        });
    }; 
};
renderComments();

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
    const oldAddForm = addForm.innerHTML;
    addForm.classList.remove("add-form");
    addForm.textContent = "Комментарий добавляется...";
    fetch("https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value,
            text: commentInputElement.value,

        })
    })   
    .then((response) => {
        return response.json();
    })
    .then((responseData) => {
        return fetchAndRenderComments();
        // получили данные и рендерим их в приложении
    }).then((response) => {
        addForm.innerHTML = oldAddForm, 
        addForm.classList.add("add-form");
    })
        
    renderComments();
    initDeleteButtonsLisners();
  
    nameInputElement.value = "";
    commentInputElement.value = "";    
});


