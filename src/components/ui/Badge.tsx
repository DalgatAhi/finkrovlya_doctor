import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'brand', size = 'sm' }: BadgeProps) {
  const variants = {
    brand:
      'bg-brand-gradient-soft text-brand-blue dark:text-brand-purple border border-brand-blue/15 dark:border-brand-purple/25 dark:bg-brand-purple/15',
    success:
      'bg-green-50 dark:bg-green-500/15 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/25',
    warning:
      'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/25',
    danger:
      'bg-red-50 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/25',
    neutral:
      'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/15',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1 font-semibold',
    md: 'text-sm px-3 py-1.5 font-semibold',
  };

  return (
    <span className={`inline-flex items-center rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
