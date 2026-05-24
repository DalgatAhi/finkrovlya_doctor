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

export function Input({ label, error, hint, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {props.required && <span className="text-brand-purple ml-1">*</span>}
      </label>
      <input
        className={`
          w-full rounded-xl border px-4 py-3 text-base font-medium text-gray-900
          placeholder:text-gray-400 placeholder:font-normal
          bg-white outline-none transition-all
          focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue
          ${error ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, hint, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {props.required && <span className="text-brand-purple ml-1">*</span>}
      </label>
      <textarea
        rows={3}
        className={`
          w-full rounded-xl border px-4 py-3 text-base font-medium text-gray-900
          placeholder:text-gray-400 placeholder:font-normal resize-none
          bg-white outline-none transition-all
          focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue
          ${error ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
