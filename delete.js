// import { renderComments } from "./render.js";
import { deleteComment } from "./api.js";
import { fetchAndRenderComments } from "./index.js";
export const initDeleteButtonLisners = (comments) => {
    const deleteButtonElements = document.querySelectorAll(".delete-form-button");
    for (const deleteButtonElement of deleteButtonElements) {
        deleteButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const id = deleteButtonElement.dataset.id;
            console.log({id});  
            deleteComment({id}).then(() => {
                fetchAndRenderComments(comments);
            })
            
        });
    };
};