const commentsUrl = "https://wedev-api.sky.pro/api/v1/:igror-shipitko/comments";
const userUrL = "https://wedev-api.sky.pro/api/user/login";

export let token;
export const setToken = (newToken) => {
    token = newToken;
} 

export function getComments() {
    return fetch(commentsUrl, {
        method: "GET",
        headers: {
            Authorizetion: `Bearer ${token}`,
        }
    }).then((response) => {
       return response.json()
    }); 
};

export function postComment(name, text) {
    return fetch(commentsUrl, {
        method: "POST",
        headers: {
            Authorizetion: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            text: text,
            forceError: true,
        })
    }).then((response) => {
        return response.json()
     }); 
};

export function login({login, password }) {
    return fetch(userUrL, {
        method: "POST",
        body: JSON.stringify({
           login,
           password,
            // forceError: true,
        })
    }).then((response) => {
        return response.json()
     }); 
}