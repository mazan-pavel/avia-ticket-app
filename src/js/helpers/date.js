import { format } from "date-fns";
/**
 * 
 * @param {String} dateString 
 * @param {String} type
 * @returns 
 */
export function formatDate(dateString, type) {
    const date = new Date(dateString);
    return format(date, type);
}