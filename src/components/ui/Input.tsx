import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

const labelCls = 'block text-sm font-semibold text-gray-700 dark:text-gray-200';

const inputBase =
  'w-full rounded-xl border px-4 py-3 text-base font-medium ' +
  'text-gray-900 dark:text-white ' +
  'placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-normal ' +
  'bg-white dark:bg-white/[0.07] ' +
  'outline-none transition-all ' +
  'focus:ring-2 focus:ring-brand-blue/25 dark:focus:ring-brand-purple/30 focus:border-brand-blue dark:focus:border-brand-purple';

const inputNormal = 'border-gray-200 dark:border-white/15 hover:border-gray-300 dark:hover:border-white/25';
const inputError  = 'border-red-400 dark:border-red-500/60 bg-red-50/30 dark:bg-red-900/10';

export function Input({ label, error, hint, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      <label className={labelCls}>
        {label}
        {props.required && <span className="text-brand-purple ml-1">*</span>}
      </label>
      <input
        className={`${inputBase} ${error ? inputError : inputNormal} ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, hint, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <label className={labelCls}>
        {label}
        {props.required && <span className="text-brand-purple ml-1">*</span>}
      </label>
      <textarea
        rows={3}
        className={`${inputBase} resize-none ${error ? inputError : inputNormal} ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>}
    </div>
  );
}
