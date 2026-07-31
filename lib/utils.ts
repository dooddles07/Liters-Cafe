import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Philippine peso, no decimals - every price on the menu is a whole number. */
export function peso(amount: number) {
  return `₱${amount.toLocaleString("en-PH")}`;
}
