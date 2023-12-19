const host = "https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments"
export function getComments() {
    return fetch(host, {
        method: "GET"
    }).then((response) => {
       return response.json()
    });
    
};
export function postComment(name, text) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            text: text,
            forceError: false,
        })
    })
}