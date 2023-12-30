export const formatDateTime = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth()).padStart(2, '0');
    const year = String(currentDate.getFullYear() - 2000);
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
};