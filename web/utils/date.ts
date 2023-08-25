import dayjs from "dayjs";
export const dateFormat = dayjs;

export function sortByDate<T extends { createdAt: string }>(
    a: T,
    b: T
): number {
    return dateFormat(a.createdAt).isAfter(dateFormat(b.createdAt)) ? 1 : -1;
}

export function sortByDateDesc<T extends { createdAt: string }>(
    a: T,
    b: T
): number {
    return sortByDate(a, b) * -1;
}
