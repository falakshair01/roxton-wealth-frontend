'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { InputProps } from '../types';

interface TextAreaProps extends InputProps {
  rows?: number;
}

export function TextAreaInput({
  name,
  label,
  placeholder,
  required,
  disabled = false,
  rows = 8
}: TextAreaProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className='space-y-1'>
      <Label className='mb-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>

      <textarea
        rows={rows}
        className={cn(
          'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900',
          'transition-colors duration-200 outline-none placeholder:text-gray-400',
          // 'hover:border-gray-300 hov er:shadow-sm',
          // 'focus:border-gray-300 focus:ring-0',
          // 'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-600',
          'dark:text-gray-100',
          errors[name] && 'border-red-500 focus:border-red-500'
        )}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, {
          required: required ? `${label} is required` : false
        })}
      />

      {errors[name] && (
        <p className='text-xs text-red-500'>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
