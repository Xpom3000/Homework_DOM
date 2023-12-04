//use strict";
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const likeInputElement = document.getElementById("like-input");
const commentsElement = document.getElementById("comments");
const form = document.getElementById("add-form");
const container = document.getElementById("add-container")

const comments = [
    {
        name: "Глеб Фокин",
        date: "13.02.22 19:22",
        text: "Мне нравится как оформлена эта страница! ❤",
        likes: 3
    },
    {
        name: "Варвара Н",
        date: "12.02.22 12:18",
        text: "Это будет первый комментарий на этой странице",
        likes: 75
    }
];
//Кнопка лайков
const initLikesListeners = () => {
    for (const commentElement of document.querySelectorAll(".like-button")) {
        // Добавляет обработчик клика на конкретный элемент в списке
        commentElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = commentElement.dataset.index;
            comments[index].likes += comments[index].isLiked ? -1 : +1;
            comments[index].isLiked = !comments[index].isLiked;
            renderComments();
        }); 
    };
    
};
//Кнопка удаления 
const initDeleteButtonsLisners = () => {
    const deleteButtonsElements = document.querySelectorAll(".delete__form-button");
    for (const deleteButtonsElement of deleteButtonsElements) {
        deleteButtonsElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = deleteButtonsElement.dataset.index;
            comments.splice(index, 1);
            renderComments();
        });
    }; 
};

const renderComments = () => {
    const commentsHtml = comments
        .map((comment, index) => {
            return `<li class="comment" id="comment">
                <div class="comment-header" >
                    <div>${comment.name}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${comment.text}</div>
                </div>
                <div class="comment-footer">
                    <button id=delete__form-button class="delete__form-button" вфвеф-index="${index}">Удалить</button>
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="like-button" data-index="${index}"></button>
                    </div>
                </div>
             </li>`;
        }).join("");
    
    commentsElement.innerHTML = commentsHtml;
  
    initLikesListeners();
  

};


renderComments();
initLikesListeners();
initDeleteButtonsLisners();

  
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

    comments.push({
        name: nameInputElement.value,
        text: commentInputElement.value

    });
    

    renderComments();
    initLikesListeners();
    initDeleteButtonsLisners();
    
    nameInputElement.value = "";
    commentInputElement.value = "";    
});








    // const sanitizeHtml = (htmlString) => {
//   return htmlString
//          .replaceAll("&", "&amp;")
//          .replaceAll("<", "&lt;")
//          .replaceAll(">", "&gt;")
//          .replaceAll('"', "&quot;");
// };
