import { deleteComment } from "./api.js";
import { fetchAndRenderComments } from "./index.js";

export const initDeleteButtonLisners = (comments) => {
  // deleteButtonElements.disabled = true;
  const deleteButtonElements = document.querySelectorAll(".delete-form-button");
  for (const deleteButtonElement of deleteButtonElements) {
    deleteButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = deleteButtonElement.dataset.id;
      deleteComment({ id }).then(() => {
        fetchAndRenderComments(comments);
      });
    });
  }
};
