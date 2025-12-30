import { compare, hash } from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function verifyPassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
}

export function hashPassword(password: string) {
    return hash(password, 10);
}
