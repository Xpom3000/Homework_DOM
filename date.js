import { format } from "date-fns";
export const formatDateTime = () => {
    createDate();
    // const currentDate = new Date();
    // const day = String(currentDate.getDate()).padStart(2, '0');
    // const month = String(currentDate.getMonth()).padStart(2, '0');
    // const year = String(currentDate.getFullYear() - 2000);
    // const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    // const hours = String(currentDate.getHours()).padStart(2, '0');
    // return `${day}.${month}.${year} ${hours}:${minutes}`;
};

const createDate = format(new Date(comment.created_at),  'yyyy-MM-dd hh.mm.ss');
// const now = new Date();

// format(now, "dd/MM/yyyy hh:mm"); // 26/03/2023 10:33
// format(now, "MM-dd-yyyy hh:mm"); // 03-26-2023 10:33
// format(now, "dd.MM.yyyy hh:mm:ss"); // 26.03.2023 10:33:41
// format(now, "yyyy-MM-dd hh.mm.ss"); // 2023-03-26 10.33.41