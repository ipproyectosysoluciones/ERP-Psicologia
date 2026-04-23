import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
        variant === 'default' && 'bg-indigo-600 text-white hover:bg-indigo-700',
        variant === 'outline' && 'border border-gray-300 bg-white hover:bg-gray-50',
        variant === 'ghost' && 'hover:bg-gray-100',
        className,
      )}
      {...props}
    />
  );
}
