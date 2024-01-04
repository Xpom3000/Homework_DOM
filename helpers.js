// Сохраняем данные об объекте User в localStorage
export function saveToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}
// Достаем данные  объекта User из localStorage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}
// Удаляем данные об объекте User из localStorage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function removeFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}
