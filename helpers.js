
// Сохраняем данные об объекте User в localStorage
export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}
// Достаем данные  объекта User из localStorage
export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}
// Удаляем данные об объекте User из localStorage
export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}
