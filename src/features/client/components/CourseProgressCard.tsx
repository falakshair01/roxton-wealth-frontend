// 'use client';

// import { IconCheck, IconLock } from '@tabler/icons-react';
// import {
//   ChevronRight as ChevronRightIcon,
//   ChevronDown as ChevronDownIcon
// } from 'lucide-react';
// import { DownloadIcon } from '@radix-ui/react-icons';
// import { useState } from 'react';
// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';
// import { GenerateStepsFromFormData } from '../utils/generateStepsFromFormData';
// import { jsPDF } from 'jspdf';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(...inputs));
// }

// const steps = GenerateStepsFromFormData();

// function toRoman(num: number): string {
//   const romanMap: [number, string][] = [
//     [1000, 'M'],
//     [900, 'CM'],
//     [500, 'D'],
//     [400, 'CD'],
//     [100, 'C'],
//     [90, 'XC'],
//     [50, 'L'],
//     [40, 'XL'],
//     [10, 'X'],
//     [9, 'IX'],
//     [5, 'V'],
//     [4, 'IV'],
//     [1, 'I']
//   ];
//   let result = '';
//   for (const [value, numeral] of romanMap) {
//     while (num >= value) {
//       result += numeral;
//       num -= value;
//     }
//   }
//   return result.toLowerCase();
// }

// type Props = {
//   step: number;
//   subStep: number;
//   data?: Record<string, any>;
//   showDownload?: boolean; // NEW
// };

// export default function InstagramCourseProgress({
//   step,
//   subStep,
//   data,
//   showDownload = true // default: show
// }: Props) {
//   const [openIndexes, setOpenIndexes] = useState<number>();
//   const completedCount = step;
//   const totalSteps = steps.length;

//   const toggleStep = (index: number) => {
//     setOpenIndexes((prev) => (prev === index ? undefined : index));
//   };

//   // ---------- filename helpers ----------
//   function safeName(s: string) {
//     return String(s)
//       .normalize('NFKD')
//       .replace(/[\u0300-\u036f]/g, '')
//       .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
//       .trim()
//       .replace(/\s+/g, '_')
//       .slice(0, 60);
//   }
//   function pickByKeys(obj: any, keys: string[]): string | undefined {
//     if (!obj || typeof obj !== 'object') return;
//     for (const k of Object.keys(obj)) {
//       const lk = k.toLowerCase();
//       if (keys.includes(lk)) {
//         const v = obj[k];
//         if (v && typeof v !== 'object') return String(v);
//       }
//     }
//     return;
//   }
//   function findClientNameDeep(obj: any): string | undefined {
//     if (!obj || typeof obj !== 'object') return;
//     const full = pickByKeys(obj, [
//       'client_name',
//       'fullname',
//       'full_name',
//       'name',
//       'clientname'
//     ]);
//     if (full) return full;
//     const first = pickByKeys(obj, ['first_name', 'firstname', 'first']);
//     const last = pickByKeys(obj, ['last_name', 'lastname', 'last', 'surname']);
//     if (first || last) return [first, last].filter(Boolean).join(' ');
//     for (const key of Object.keys(obj)) {
//       const v = obj[key];
//       if (v && typeof v === 'object') {
//         const nested = findClientNameDeep(v);
//         if (nested) return nested;
//       }
//     }
//     return;
//   }
//   function makeFileNameFromData(d?: Record<string, any>) {
//     const found = d ? findClientNameDeep(d) : undefined;
//     const base = safeName(found || 'client_data');
//     return `${base}.pdf`;
//   }
//   // --------------------------------------

//   // PDF: label-value with spacing & page-break safety
//   const handleDownloadPdf = () => {
//     const doc = new jsPDF({ unit: 'pt', format: 'a4' });

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();

//     const margin = 40;
//     const lineHeight = 16;

//     const labelColWidth = 220; // label column width
//     const gap = 14; // label-value gap
//     const valueX = margin + labelColWidth + gap;
//     const maxValueWidth = pageWidth - valueX - margin;

//     let y = margin;

//     const filename = makeFileNameFromData(data);

//     // Heading
//     doc.setFontSize(16);
//     doc.text('Client Data Summary', margin, y);
//     y += 24;
//     doc.setFontSize(11);

//     const HIDE_KEYS = new Set(['id', '_id', '__v']);
//     const entries = Object.entries(data || {}).filter(
//       ([k]) => !HIDE_KEYS.has(k)
//     );

//     if (entries.length === 0) {
//       doc.text('No data found.', margin, y);
//       doc.save(filename);
//       return;
//     }

//     const fmt = (k: string) =>
//       k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

//     for (const [rawKey, value] of entries) {
//       let val =
//         typeof value === 'object'
//           ? JSON.stringify(value, null, 2)
//           : String(value ?? '');

//       const valueLines = doc.splitTextToSize(val, maxValueWidth);

//       const neededHeight =
//         Math.max(lineHeight, valueLines.length * lineHeight) + 4;
//       if (y + neededHeight > pageHeight - margin) {
//         doc.addPage();
//         y = margin;
//       }

//       doc.setFont('helvetica', 'bold');
//       doc.text(`${fmt(rawKey)}:`, margin, y);

//       doc.setFont('helvetica', 'normal');
//       for (let i = 0; i < valueLines.length; i++) {
//         if (y > pageHeight - margin) {
//           doc.addPage();
//           y = margin;
//         }
//         doc.text(valueLines[i], valueX, y);
//         y += lineHeight;
//       }

//       y += 4; // row gap
//     }

//     doc.save(filename);
//   };

//   return (
//     <div className='max-w-md rounded-xl border p-6 shadow-md'>
//       {/* Header */}
//       <div className='mb-4'>
//         <h2 className='text-lg font-semibold'>
//           Mortgage & Protection Fact Find
//         </h2>
//         <p className='mt-1 text-sm text-gray-500'>{`${completedCount}/${totalSteps} COMPLETED`}</p>

//         {/* Progress bar */}
//         <div className='mt-3 flex items-center gap-1'>
//           {Array.from({ length: totalSteps }).map((_, idx) => (
//             <div
//               key={idx}
//               className={cn(
//                 'h-2 flex-1 rounded-full',
//                 idx < completedCount ? 'bg-primary' : 'bg-primary/20'
//               )}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Step list */}
//       <div
//         className='scrollbar-premium mt-6 space-y-4 overflow-y-auto pr-2 pb-8'
//         style={{ maxHeight: 'calc(100vh - var(--header-h) - 160px)' }}
//       >
//         {steps.map((stepItem, idx) => {
//           const isOpen = openIndexes === idx;
//           const isCompleted = idx < step;
//           const isCurrent = idx === step;
//           const isLocked = idx > step;

//           return (
//             <div key={idx}>
//               <div
//                 className='flex cursor-pointer items-center justify-between'
//                 onClick={() => toggleStep(idx)}
//               >
//                 {/* Left: Number + Title */}
//                 <div className='flex min-w-0 items-center gap-3'>
//                   <div
//                     className={cn(
//                       'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs leading-none font-bold transition-colors',
//                       isCompleted &&
//                         'bg-primary text-primary-foreground border-primary',
//                       isCurrent && 'text-primary border-primary bg-transparent',
//                       isLocked && 'border-gray-300 text-gray-400'
//                     )}
//                   >
//                     {idx + 1}
//                   </div>
//                   <span
//                     className={cn(
//                       'block min-w-0 flex-1 truncate text-sm font-medium transition-colors',
//                       isCompleted && 'text-gray-500 line-through',
//                       isCurrent && 'text-primary',
//                       isLocked && 'text-gray-400'
//                     )}
//                     title={stepItem.title}
//                   >
//                     {stepItem.title}
//                   </span>
//                 </div>

//                 {/* Right: icons */}
//                 <div className='ml-3 flex items-center gap-2'>
//                   {isLocked ? (
//                     <IconLock className='h-4 w-4 shrink-0 text-gray-400' />
//                   ) : isCompleted ? (
//                     <IconCheck className='text-primary h-4 w-4 shrink-0' />
//                   ) : (
//                     <span className='h-4 w-4 shrink-0' />
//                   )}

//                   {isOpen ? (
//                     <ChevronDownIcon className='h-4 w-4 shrink-0 text-gray-400' />
//                   ) : (
//                     <ChevronRightIcon className='h-4 w-4 shrink-0 text-gray-400' />
//                   )}
//                 </div>
//               </div>

//               {/* Subtitles */}
//               {/* {isOpen && stepItem?.subTitles?.length > 0 && (
//                 <ul className='mt-2 ml-11 space-y-1 text-sm text-gray-500'>
//                   {stepItem.subTitles.map((sub, subIdx) => {
//                     const isSubCompleted =
//                       idx < step || (idx === step && subIdx < subStep);
//                     const isSubCurrent = idx === step && subIdx === subStep;
//                     const isSubLocked =
//                       idx > step || (idx === step && subIdx > subStep);

//                     return (
//                       <li key={subIdx} className='flex'>
//                         <span
//                           className={cn(
//                             'mr-2 text-gray-400',
//                             isSubCompleted && 'text-primary border-primary',
//                             isSubCurrent &&
//                               'text-primary border-primary bg-transparent',
//                             isSubLocked && 'border-gray-300 text-gray-400'
//                           )}
//                         >
//                           {toRoman(subIdx + 1)}.
//                         </span>
//                         <span
//                           className={cn(
//                             'block min-w-0 flex-1 truncate text-sm font-medium transition-colors',
//                             isSubCompleted && 'text-gray-500 line-through',
//                             isSubCurrent && 'text-primary',
//                             isSubLocked && 'text-gray-400'
//                           )}
//                         >
//                           {sub}
//                         </span>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )} */}

//               {isOpen && subTitles.length > 0 && (
//                 <ul className='mt-2 ml-11 space-y-1 text-sm text-gray-500'>
//                   {subTitles.map((sub, subIdx) => {
//                     const isSubCompleted =
//                       idx < step || (idx === step && subIdx < subStep);
//                     const isSubCurrent = idx === step && subIdx === subStep;
//                     const isSubLocked =
//                       idx > step || (idx === step && subIdx > subStep);

//                     return (
//                       <li key={subIdx} className='flex'>
//                         <span
//                           className={cn(
//                             'mr-2 text-gray-400',
//                             isSubCompleted && 'text-primary border-primary',
//                             isSubCurrent &&
//                               'text-primary border-primary bg-transparent',
//                             isSubLocked && 'border-gray-300 text-gray-400'
//                           )}
//                         >
//                           {toRoman(subIdx + 1)}.
//                         </span>
//                         <span
//                           className={cn(
//                             'block min-w-0 flex-1 truncate text-sm font-medium transition-colors',
//                             isSubCompleted && 'text-gray-500 line-through',
//                             isSubCurrent && 'text-primary',
//                             isSubLocked && 'text-gray-400'
//                           )}
//                         >
//                           {sub}
//                         </span>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Download buttons shown only if allowed */}
//       {showDownload && (
//         <div className='flex items-center justify-center text-sm'>
//           <button
//             type='button'
//             onClick={handleDownloadPdf}
//             className='text-primary font-medium hover:underline'
//           >
//             Download PDF
//           </button>

//           <span className='mx-3 h-4 w-px bg-gray-300' aria-hidden='true' />

//           <button
//             type='button'
//             onClick={handleDownloadPdf}
//             className='text-primary font-medium hover:underline'
//           >
//             Download PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { IconCheck, IconLock } from '@tabler/icons-react';
import {
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon
} from 'lucide-react';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GenerateStepsFromFormData } from '../utils/generateStepsFromFormData';
import { jsPDF } from 'jspdf';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

const steps = GenerateStepsFromFormData();

function toRoman(num: number): string {
  const romanMap: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];
  let result = '';
  for (const [value, numeral] of romanMap) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result.toLowerCase();
}

type Props = {
  step: number; // current step index (0-based)
  subStep: number; // current sub-step index (0-based)
  data?: Record<string, any>;
  showDownload?: boolean;
};

export default function InstagramCourseProgress({
  step,
  subStep,
  data,
  showDownload = true
}: Props) {
  // open the current step by default
  const [openIndexes, setOpenIndexes] = useState<number | undefined>(step);
  useEffect(() => {
    setOpenIndexes(step);
  }, [step]);

  const completedCount = step; // full steps completed
  const totalSteps = steps.length;

  const toggleStep = (index: number) => {
    setOpenIndexes((prev) => (prev === index ? undefined : index));
  };

  // ---------- filename helpers ----------
  function safeName(s: string) {
    return String(s)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .slice(0, 60);
  }
  function pickByKeys(obj: any, keys: string[]): string | undefined {
    if (!obj || typeof obj !== 'object') return;
    for (const k of Object.keys(obj)) {
      const lk = k.toLowerCase();
      if (keys.includes(lk)) {
        const v = obj[k];
        if (v && typeof v !== 'object') return String(v);
      }
    }
    return;
  }
  function findClientNameDeep(obj: any): string | undefined {
    if (!obj || typeof obj !== 'object') return;
    const full = pickByKeys(obj, [
      'client_name',
      'fullname',
      'full_name',
      'name',
      'clientname'
    ]);
    if (full) return full;
    const first = pickByKeys(obj, ['first_name', 'firstname', 'first']);
    const last = pickByKeys(obj, ['last_name', 'lastname', 'last', 'surname']);
    if (first || last) return [first, last].filter(Boolean).join(' ');
    for (const key of Object.keys(obj)) {
      const v = obj[key];
      if (v && typeof v === 'object') {
        const nested = findClientNameDeep(v);
        if (nested) return nested;
      }
    }
    return;
  }
  function makeFileNameFromData(d?: Record<string, any>) {
    const found = d ? findClientNameDeep(d) : undefined;
    const base = safeName(found || 'client_data');
    return `${base}.pdf`;
  }
  // --------------------------------------

  // PDF generation
  const handleDownloadPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40,
      lineHeight = 16;
    const labelColWidth = 220,
      gap = 14;
    const valueX = margin + labelColWidth + gap;
    const maxValueWidth = pageWidth - valueX - margin;
    let y = margin;

    const filename = makeFileNameFromData(data);

    doc.setFontSize(16);
    doc.text('Client Data Summary', margin, y);
    y += 24;
    doc.setFontSize(11);

    const HIDE_KEYS = new Set(['id', '_id', '__v']);
    const entries = Object.entries(data || {}).filter(
      ([k]) => !HIDE_KEYS.has(k)
    );

    if (entries.length === 0) {
      doc.text('No data found.', margin, y);
      doc.save(filename);
      return;
    }

    const fmt = (k: string) =>
      k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    for (const [rawKey, value] of entries) {
      const val =
        typeof value === 'object'
          ? JSON.stringify(value, null, 2)
          : String(value ?? '');
      const valueLines = doc.splitTextToSize(val, maxValueWidth);
      const needed = Math.max(lineHeight, valueLines.length * lineHeight) + 4;
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      doc.setFont('helvetica', 'bold');
      doc.text(`${fmt(rawKey)}:`, margin, y);

      doc.setFont('helvetica', 'normal');
      for (let i = 0; i < valueLines.length; i++) {
        if (y > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(valueLines[i], valueX, y);
        y += lineHeight;
      }
      y += 4;
    }
    doc.save(filename);
  };

  // ------ helpers to calculate sub-step progress for a given step ------
  const getSubProgress = (stepIndex: number) => {
    const totalSub = steps[stepIndex]?.subTitles?.length ?? 0;
    let completedSub = 0;

    if (totalSub === 0) return { completedSub, totalSub };

    if (stepIndex < step) {
      completedSub = totalSub; // all done for previous steps
    } else if (stepIndex === step) {
      completedSub = Math.max(0, Math.min(subStep, totalSub)); // current sub-step index
    } // future steps remain 0

    return { completedSub, totalSub };
  };

  return (
    <div className='max-w-md rounded-xl border p-6 shadow-md'>
      {/* Header */}
      <div className='mb-4'>
        <h2 className='text-lg font-semibold'>
          Mortgage & Protection Fact Find
        </h2>
        <p className='mt-1 text-sm text-gray-500'>{`${completedCount}/${totalSteps} COMPLETED`}</p>

        {/* Overall progress (per step) */}
        <div className='mt-3 flex items-center gap-1'>
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'h-2 flex-1 rounded-full',
                idx < completedCount ? 'bg-primary' : 'bg-primary/20'
              )}
            />
          ))}
        </div>
      </div>

      {/* Step list */}
      <div
        className='scrollbar-premium mt-6 space-y-4 overflow-y-auto pr-2 pb-8'
        style={{ maxHeight: 'calc(100vh - var(--header-h) - 160px)' }}
      >
        {steps.map((stepItem, idx) => {
          const isOpen = openIndexes === idx;
          const isLocked = idx > step;

          const { completedSub, totalSub } = getSubProgress(idx);
          const isStepFullyDone = totalSub > 0 && completedSub === totalSub;
          const isPastStep = idx < step;

          const subTitles = Array.isArray(stepItem?.subTitles)
            ? stepItem.subTitles
            : [];

          return (
            <div key={idx}>
              <div
                className='flex cursor-pointer items-start justify-between gap-3'
                onClick={() => toggleStep(idx)}
              >
                {/* Left: Number + Title */}
                <div className='flex min-w-0 flex-1 items-center gap-3'>
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs leading-none font-bold transition-colors',
                      isStepFullyDone &&
                        'bg-primary text-primary-foreground border-primary',
                      !isStepFullyDone &&
                        idx === step &&
                        'text-primary border-primary bg-transparent',
                      isLocked && 'border-gray-300 text-gray-400'
                    )}
                  >
                    {idx + 1}
                  </div>

                  <div className='min-w-0 flex-1'>
                    <span
                      className={cn(
                        'block truncate text-sm font-medium transition-colors',
                        isPastStep && 'text-gray-500 line-through',
                        idx === step && 'text-primary',
                        isLocked && 'text-gray-400'
                      )}
                      title={stepItem.title}
                    >
                      {stepItem.title}
                    </span>

                    {/* Mini progress bar for sub-steps */}
                    {totalSub > 0 && (
                      <div className='mt-2 flex items-center gap-1'>
                        {Array.from({ length: totalSub }).map((_, sIdx) => {
                          const filled =
                            idx < step || (idx === step && sIdx < completedSub);
                          return (
                            <div
                              key={sIdx}
                              className={cn(
                                'h-1.5 flex-1 rounded-full',
                                filled ? 'bg-primary' : 'bg-primary/20'
                              )}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: lock / step-level check + caret */}
                <div className='flex items-center gap-2'>
                  {isLocked ? (
                    <IconLock className='h-4 w-4 shrink-0 text-gray-400' />
                  ) : isStepFullyDone ? (
                    <IconCheck className='text-primary h-4 w-4 shrink-0' />
                  ) : (
                    <span className='h-4 w-4 shrink-0' />
                  )}

                  {isOpen ? (
                    <ChevronDownIcon className='h-4 w-4 shrink-0 text-gray-400' />
                  ) : (
                    <ChevronRightIcon className='h-4 w-4 shrink-0 text-gray-400' />
                  )}
                </div>
              </div>

              {/* Subtitles */}
              {/* {isOpen && stepItem?.subTitles?.length > 0 && (
                <ul className='mt-2 ml-11 space-y-1 text-sm text-gray-500'>
                  {stepItem.subTitles.map((sub, subIdx) => {
                    const isSubCompleted =
                      idx < step || (idx === step && subIdx < completedSub);
                    const isSubCurrent =
                      idx === step && subIdx === completedSub;
                    const isSubLocked =
                      idx > step || (idx === step && subIdx > completedSub);

                    return (
                      <li key={subIdx} className='flex'>
                        <span
                          className={cn(
                            'mr-2',
                            isSubCompleted && 'text-primary',
                            isSubCurrent && 'text-primary',
                            isSubLocked && 'text-gray-400'
                          )}
                        >
                          {toRoman(subIdx + 1)}.
                        </span>
                        <span
                          className={cn(
                            'block min-w-0 flex-1 truncate font-medium transition-colors',
                            isSubCompleted && 'text-gray-500 line-through',
                            isSubCurrent && 'text-primary',
                            isSubLocked && 'text-gray-400'
                          )}
                        >
                          {sub}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )} */}

              {isOpen && subTitles.length > 0 && (
                <ul className='mt-2 ml-11 space-y-1 text-sm text-gray-500'>
                  {subTitles.map((sub, subIdx) => {
                    const isSubCompleted =
                      idx < step || (idx === step && subIdx < subStep);
                    const isSubCurrent = idx === step && subIdx === subStep;
                    const isSubLocked =
                      idx > step || (idx === step && subIdx > subStep);

                    return (
                      <li key={subIdx} className='flex'>
                        <span
                          className={cn(
                            'mr-2 text-gray-400',
                            isSubCompleted && 'text-primary border-primary',
                            isSubCurrent &&
                              'text-primary border-primary bg-transparent',
                            isSubLocked && 'border-gray-300 text-gray-400'
                          )}
                        >
                          {toRoman(subIdx + 1)}.
                        </span>
                        <span
                          className={cn(
                            'block min-w-0 flex-1 truncate text-sm font-medium transition-colors',
                            isSubCompleted && 'text-gray-500 line-through',
                            isSubCurrent && 'text-primary',
                            isSubLocked && 'text-gray-400'
                          )}
                        >
                          {sub}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Download buttons */}
      {showDownload && (
        <div className='mt-4 flex w-full gap-4'>
          <button
            type='button'
            onClick={handleDownloadPdf}
            className='border-primary text-primary hover:bg-primary flex w-full items-center justify-center gap-2 rounded-lg border bg-transparent px-4 py-2 font-medium transition hover:text-white'
          >
            <DownloadIcon className='h-4 w-4' />
            Download PDF
          </button>

          <button
            type='button'
            onClick={handleDownloadPdf}
            className='border-primary text-primary hover:bg-primary flex w-full items-center justify-center gap-2 rounded-lg border bg-transparent px-4 py-2 font-medium transition hover:text-white'
          >
            <DownloadIcon className='h-4 w-4' />
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
