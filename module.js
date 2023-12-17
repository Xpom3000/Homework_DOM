// import{formatDateTime} from './index.js'
export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments", {
        method: "GET"
    }).then((response) => {
        response.json()
    });
    
};
export function postComment() {
    fetch("https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value,
            text: commentInputElement.value,
            forceError: true,
        })
    })
}