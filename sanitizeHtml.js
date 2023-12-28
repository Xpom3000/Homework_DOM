// Модуль sanitizeHtml.js
export const sanitizeHtml = (htmlString) => {
    return htmlString
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
};