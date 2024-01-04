import { likeComment } from "./api.js";
import { fetchAndRenderComments } from "./index.js";

export const initLikesListeners = (comments) => {
  for (const commentElement of document.querySelectorAll(".like-button")) {
    // Добавляет обработчик клика на конкретный элемент в списке
    commentElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = commentElement.dataset.id;
      likeComment({ id }).then(() => {
        fetchAndRenderComments(comments);
      });
    });
  }
};
