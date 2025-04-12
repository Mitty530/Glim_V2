import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names with tailwind merge utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 