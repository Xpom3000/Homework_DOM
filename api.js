const commentsUrl = "https://wedev-api.sky.pro/api/v2/:igror-shipitko/comments";
const userUrL =     "https://wedev-api.sky.pro/api/user/login";
const newUserUrl =  "https://wedev-api.sky.pro/api/user"

export let token;
export const setToken = (newToken) => {
    token = newToken;
} 
// const getUserFromLocalStorage = () => {
//     localStorage.setItem('User', `${token}`); 
//  }

// localStorage.setItem('token', 'token');
export function getComments() {
    return fetch(commentsUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
       return response.json()
    }); 
};

export function postComment(name, text) {
    return fetch(commentsUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            text: text,
            // forceError: true,
        })
    }).then((response) => {
        return response.json()
    }); 
};

export function deleteComment({id}) {
    return fetch(`${commentsUrl}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
       return response.json()
    }); 
};

export function likeComment({ id }) {
    console.log(likeComment);
    return fetch(`${commentsUrl}/${id}/toggle-like`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        }
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
            forceError: true,
        })
    }).then((response) => {
        return response.json()
    })
    
};

export function registration({login, name, password }) {
    return fetch(newUserUrl, {
        method: "POST",
        body: JSON.stringify({
            login,
            name,
            password,
            // forceError: true,
        })
    }).then((response) => {
        return response.json()
    }); 
};
