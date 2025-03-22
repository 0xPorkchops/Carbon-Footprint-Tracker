import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  const words = name.split(' ');
  return (words.length > 1 ? (words[0][0] + words[1][0]) : (name.length !== 1 ? words[0][0] + words[0][1].toUpperCase() : name.toUpperCase()));
}