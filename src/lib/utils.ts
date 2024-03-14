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

export const stringToArray = (str: string) => {
  const obj_keywords = str.split('\n')
    .map(s => s.trim())
    .filter(Boolean);

  return obj_keywords;
}