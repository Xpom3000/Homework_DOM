import { deleteComment } from "./api.js";
import { fetchAndRenderComments } from "./index.js";

export const initDeleteButtonLisners = (comments) => {
    const deleteButtonElements = document.querySelectorAll(".delete-form-button");
    for (const deleteButtonElement of deleteButtonElements) {
        // deleteButtonElements.disabled = true;
        deleteButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const id = deleteButtonElement.dataset.id;
            deleteComment({ id })
            .then(() => {
                fetchAndRenderComments(comments);
            })
            // .then(() => {
            //     deleteButtonElements.disabled = false;
            // })
            
        });
    };
};