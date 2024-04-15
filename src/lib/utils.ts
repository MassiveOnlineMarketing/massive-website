import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: any) {
  return (new Date(date).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).replace(/\-/g, '/'))
}

/**
 * Converts a string into an array of keywords.
 * 
 * @param str - The input string to be converted.
 * @returns An array of strings extracted from the input string.
 */
export function stringToArray(str: string) {
  const stringArray = str.split('\n')
    .map(s => s.trim())
    .filter(Boolean);

  return stringArray;
}

/**
 * Ensures that the input is an array. If the input is already an array, it is returned as is.
 * If the input is not an array, it is wrapped in an array and returned.
 * 
 * @param input - The input value to ensure as an array.
 * @returns The input value as an array.
 */
export function ensureArray(input: any | any[]) {
  return Array.isArray(input) ? input : [input];
}