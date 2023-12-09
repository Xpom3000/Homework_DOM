//use strict";
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const likeInputElement = document.getElementById("like-input");
const commentsElement = document.getElementById("comments");
const form = document.getElementById("add-form");
const container = document.getElementById("add-container")

const formatDateTime = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth()).padStart(2, '0');
    const year = String(currentDate.getFullYear() - 2000);
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
};
// Массив данных пользователя
// const comments = [
//     {
//         name: "Глеб Фокин",
//         date: "13.02.22 19:22",
//         text: "Мне нравится как оформлена эта страница! ❤",
//         likes: 3,
//         isLike: true,
//     },
//     {
//         name: "Варвара Н",
//         date: "12.02.22 12:18",
//         text: "Это будет первый комментарий на этой странице",
//         likes: 75,
//         isLike: false,
//     }
// ];

// Запрос двнных в API на комментарий
let comments = [];
const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments", {
  method: "GET"
});

fetchPromise.then((response) => {
    response.json().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: new Date(comment.date).toLocaleString(),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });

        comments = appComments;
        renderComments();
    });
});

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
    // comments.push({
    //     name: nameInputElement.value
    //         .replaceAll("&", "&amp;")
    //         .replaceAll("<", "&lt;")
    //         .replaceAll(">", "&gt;")
    //         .replaceAll('"', "&quot;"),
    //     date:formatDateTime(),
    //     text: commentInputElement.value
    //         .replaceAll("&", "&amp;")
    //         .replaceAll("<", "&lt;")
    //         .replaceAll(">", "&gt;")
    //         .replaceAll('"', "&quot;"),
    //     likes: 0,
    //     isLike: false,
    // });

    // подписываемся на успешное завершение запроса с помощью then
    fetch("https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments", {
        method: "POST",
        body: JSON.stringify({
        name: nameInputElement.value,
        text: commentInputElement.value,
        })
    }).then((response) => {
        response.json().then((responseData) => {

            const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments", {
            method: "GET"
            });
            // Запрос двнных в API на комментарий
            fetchPromise.then((response) => {
                response.json().then((responseData) => {
                    const appComments = responseData.comments.map((comment) => {
                        return {
                            name: comment.author.name,
                            date: new Date(comment.date).toLocaleString(),
                            text: comment.text,
                            likes: comment.likes,
                            isLiked: false,
                        };
                    });

                    comments = appComments;
                    renderComments();
                });
            });
            // получили данные и рендерим их в приложении
            comments = responseData.comments;
            renderComments();
        });
    });

    renderComments();
    initDeleteButtonsLisners();
  
    nameInputElement.value = "";
    commentInputElement.value = "";    
});


// КАК ПРИМЕНИТЬ ЭТО СВОЙСТВО???
//При подстановке текста в поле ввода можно разметить блок цитаты специальными словами типа 
//QUOTE_BEGIN ${comment.text} QUOTE_END
//, а во время рендера заменить их на HTML: 
//comment.text.replaceAll("BEGIN_QUOTE", "<div class='quote'>")
  

