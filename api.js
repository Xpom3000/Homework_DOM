
export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments", {
        method: "GET"
    }).then((response) => {
       return response.json()
    });
    
};
export function postComment(name, text) {
    return fetch("https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            text: text,
            forceError: true,
        })
    })
}