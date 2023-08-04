import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function camelToTitle(text: string): string {
    const r = text.replace(/([A-Z])/g, " $1");
    return r.charAt(0).toUpperCase() + r.slice(1);
}
