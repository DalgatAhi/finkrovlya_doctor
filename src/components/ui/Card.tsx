import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', gradient = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl p-4
        ${gradient ? 'bg-brand-gradient text-white' : 'bg-white border border-gray-100'}
        shadow-sm
        ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
