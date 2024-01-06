import { user } from "./index.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import _ from "lodash";

const commentsUrl = "https://wedev-api.sky.pro/api/v2/:igror-shipitko/comments";
const userUrL = "https://wedev-api.sky.pro/api/user/login";
const newUserUrl = "https://wedev-api.sky.pro/api/user";

export const setToken = () => {
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};

export function getComments() {
  return fetch(commentsUrl, {
    method: "GET",
    headers: {
      Authorization: setToken(),
    },
  }).then((response) => {
    return response.json();
  });
}

export function postComment(name, text) {
  return fetch(commentsUrl, {
    method: "POST",
    headers: {
      Authorization: setToken(),
    },
    body: JSON.stringify({
      // name: name,
      text: sanitizeHtml(text),
      // forceError: true,
    }),
  }).then((response) => {
    return response.json();
  });
}

export function deleteComment({ id }) {
  return fetch(`${commentsUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: setToken(),
    },
  }).then((response) => {
    return response.json();
  });
}

export function likeComment({ id }) {
  // console.log(likeComment);
  return fetch(`${commentsUrl}/${id}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: setToken(),
    },
  }).then((response) => {
    return response.json();
  });
}

export function login({ login, password }) {
  return fetch(userUrL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      // forceError: true,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный запрос");
    }
    return response.json();
  });
}

export function registration({ login, name, password }) {
  return fetch(newUserUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      name: _.capitalize(name),
      password,
      // forceError: true,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный запрос");
    }
    return response.json();
  });
}
