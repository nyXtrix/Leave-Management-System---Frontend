import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatCapitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatDate(date: string | Date, pattern: 'MMM D' | 'MMM D, YYYY' | 'full' = 'MMM D, YYYY') {
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);

  const options: Intl.DateTimeFormatOptions = {};
  if (pattern === 'MMM D') {
    options.month = 'short';
    options.day = 'numeric';
  } else if (pattern === 'MMM D, YYYY') {
    options.month = 'short';
    options.day = 'numeric';
    options.year = 'numeric';
  } else {
    return d.toLocaleDateString();
  }

  return new Intl.DateTimeFormat('en-US', options).format(d);
}


export function fromNow(date: string | Date): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return formatDate(d, 'MMM D, YYYY');
}
