// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { SmartInput } from '@/features/client/components/SmartInput';
// import { FormProvider, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { FORM_DATA, FormField } from '@/constants/form-data';
// import CourseProgressCard from '@/features/client/components/CourseProgressCard';
// import { zodFromFields } from '@/validation/segmentSchema';
// import { ClientDetail } from '@/constants/mock-clients-detail';
// import {
//   cloneFieldsWithPrefix,
//   collectAllFieldsForSchema,
//   defaultsFromFields,
//   isFormField,
//   isSplitSection,
//   normaliseClientDetailForForm
// } from '@/lib/client-split-section';

// export default function ClientDetailContent({ data }: { data: ClientDetail }) {
//   // Build schema from split-aware flatten
//   const allFormFields = useMemo(() => collectAllFieldsForSchema(FORM_DATA), []);
//   const schema = useMemo(() => zodFromFields(allFormFields), [allFormFields]);

//   // Defaults
//   const baseDefaults = useMemo(
//     () => defaultsFromFields(allFormFields),
//     [allFormFields]
//   );

//   const methods = useForm<z.infer<typeof schema>>({
//     resolver: zodResolver(schema),
//     mode: 'onChange',
//     defaultValues: baseDefaults,
//     shouldUnregister: false
//   });

//   const {
//     reset,
//     getValues,
//     setValue,
//     trigger,
//     handleSubmit,
//     formState: { errors }
//   } = methods;

//   // Merge incoming data → normalize (now includes mapping to client1_/client2_)
//   useEffect(() => {
//     if (!data) return;
//     const merged = { ...baseDefaults, ...data };
//     const normalised = normaliseClientDetailForForm(merged);
//     reset(normalised, { keepErrors: true });
//   }, [data?.id, baseDefaults, reset]);

//   const [step, setStep] = useState(0);
//   const [subStep, setSubStep] = useState(0);
//   const [title, setTitle] = useState(FORM_DATA[0]?.title ?? '');
//   const [subTitle, setSubTitle] = useState(
//     FORM_DATA[0].sections?.[0]?.sub_title ?? ''
//   );

//   const currentStep = FORM_DATA[step];
//   const section = currentStep.sections?.[subStep];
//   const sectionFields: FormField[] = (section?.fields ?? []) as FormField[];

//   // View mode: toggle which client to show in split sections
//   const [activeClient, setActiveClient] = useState<'client1' | 'client2'>(
//     'client1'
//   );

//   // is last?
//   const isLastStep = useMemo(() => {
//     const s = FORM_DATA[step];
//     const sections = s?.sections ?? [];
//     const hasSections = sections.length > 0;
//     const atLastSub = hasSections ? subStep === sections.length - 1 : true;
//     return step === FORM_DATA.length - 1 && atLastSub;
//   }, [step, subStep]);

//   const onSubmit = async (formData: z.infer<typeof schema>) => {
//     // view mode me submit ka real effect nahi—layout parity ke liye rehne diya
//     console.log('View Submit (no-op)', formData);
//   };

//   // Enter -> Next (except textarea / combobox)
//   const handleFormKeyDown = async (e: React.KeyboardEvent<HTMLFormElement>) => {
//     if (e.key !== 'Enter') return;
//     const tgt = e.target as HTMLElement;
//     const tag = tgt.tagName.toLowerCase();
//     const role = tgt.getAttribute('role');
//     const isTextArea = tag === 'textarea';
//     const isCombo = role === 'combobox';
//     if (!isLastStep && !isTextArea && !isCombo) {
//       e.preventDefault();
//       await handleNext();
//     }
//   };

//   // split vs normal for current section
//   const splitThisSection = isSplitSection(currentStep.id, section?.sub_title);
//   const client1Fields = useMemo(
//     () =>
//       splitThisSection ? cloneFieldsWithPrefix(sectionFields, 'client1_') : [],
//     [splitThisSection, sectionFields]
//   );
//   const client2Fields = useMemo(
//     () =>
//       splitThisSection ? cloneFieldsWithPrefix(sectionFields, 'client2_') : [],
//     [splitThisSection, sectionFields]
//   );
//   const normalFields = useMemo(
//     () => (splitThisSection ? [] : sectionFields),
//     [splitThisSection, sectionFields]
//   );

//   const handleNext = async () => {
//     const fieldNames = splitThisSection
//       ? (activeClient === 'client1' ? client1Fields : client2Fields).map(
//           (f) => f.name
//         )
//       : normalFields.map((f) => f.name);

//     const ok = await trigger(fieldNames);
//     if (!ok) return;

//     const curr = FORM_DATA[step];

//     if (Array.isArray(curr?.sections) && subStep < curr.sections.length - 1) {
//       const nextSub = subStep + 1;
//       setSubStep(nextSub);
//       setSubTitle(curr.sections[nextSub]?.sub_title ?? '');
//       return;
//     }

//     if (step < FORM_DATA.length - 1) {
//       const nextStep = step + 1;
//       const next = FORM_DATA[nextStep];
//       setStep(nextStep);
//       setTitle(next?.title ?? '');
//       const hasSections =
//         Array.isArray(next?.sections) && next.sections.length > 0;
//       setSubStep(0);
//       setSubTitle(
//         hasSections && next.sections ? (next.sections[0]?.sub_title ?? '') : ''
//       );
//     }
//   };

//   const hasSections = (s: any) =>
//     Array.isArray(s?.sections) && s.sections.length > 0;
//   const lastSubIndex = (s: any) => (hasSections(s) ? s.sections.length - 1 : 0);

//   const handleBack = () => {
//     const curr = FORM_DATA[step];

//     if (hasSections(curr) && subStep > 0) {
//       const prevSub = subStep - 1;
//       setSubStep(prevSub);
//       setSubTitle(curr.sections?.[prevSub]?.sub_title ?? '');
//       return;
//     }

//     if (step > 0) {
//       const prevStep = step - 1;
//       const prev = FORM_DATA[prevStep];

//       setStep(prevStep);
//       setTitle(prev?.title ?? '');

//       const prevLast = lastSubIndex(prev);
//       setSubStep(prevLast);
//       setSubTitle(
//         hasSections(prev) ? (prev.sections?.[prevLast]?.sub_title ?? '') : ''
//       );
//     }
//   };

//   return (
//     <div className='flex min-h-screen flex-row gap-4'>
//       {/* Left: Step Form (70%) */}
//       <div
//         className='h-[calc(100vh-var(--header-h))] w-[70%] min-w-[70%]'
//         style={{
//           // @ts-ignore
//           '--header-h': '100px'
//         }}
//       >
//         <FormProvider {...methods}>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             onKeyDown={handleFormKeyDown}
//             className='flex h-full flex-col'
//           >
//             <div className='flex h-full flex-col rounded-xl border p-6 shadow-sm backdrop-blur'>
//               <div className='mb-6 flex items-center justify-between'>
//                 <h2 className='text-2xl font-bold tracking-tight'>
//                   {`${title} ${subTitle ? ' / ' + subTitle : ''}`}
//                 </h2>
//               </div>

//               <div className='min-h-0 flex-1 overflow-y-auto pr-2 pb-12'>
//                 {/* Top-level fields (rare) — READ-ONLY: 2 per row */}
//                 <fieldset disabled aria-disabled='true'>
//                   <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
//                     {Array.isArray((currentStep as any).fields) &&
//                       (
//                         (currentStep as any).fields as (
//                           | FormField
//                           | { sub_title: string; fields: FormField[] }
//                         )[]
//                       )
//                         .filter(isFormField)
//                         .map((field) => {
//                           const v = getValues(field.name as string);
//                           const span =
//                             field.input_type === 'input_textarea'
//                               ? 'md:col-span-2'
//                               : '';
//                           return (
//                             <div
//                               key={`${field.name}:${String(v)}`}
//                               className={span}
//                             >
//                               <SmartInput
//                                 field={{
//                                   ...field,
//                                   defaultValue: v,
//                                   error: String(
//                                     (errors as any)[field.name]?.message ?? ''
//                                   )
//                                 }}
//                               />
//                             </div>
//                           );
//                         })}
//                   </div>
//                 </fieldset>

//                 {/* Section fields — either normal OR split (Client 1 | Client 2) */}
//                 {!splitThisSection && (
//                   // READ-ONLY: 2 per row
//                   <fieldset disabled aria-disabled='true'>
//                     <div className='mt-6 grid grid-cols-1 gap-5 md:grid-cols-2'>
//                       {normalFields.map((field) => {
//                         const v = getValues(field.name as string);
//                         const span =
//                           field.input_type === 'input_textarea'
//                             ? 'md:col-span-2'
//                             : '';
//                         return (
//                           <div
//                             key={`${field.name}:${String(v)}`}
//                             className={span}
//                           >
//                             <SmartInput
//                               field={{
//                                 ...field,
//                                 defaultValue: v,
//                                 error: String(
//                                   (errors as any)[field.name]?.message ?? ''
//                                 )
//                               }}
//                             />
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </fieldset>
//                 )}

//                 {splitThisSection && (
//                   <div className='mt-6'>
//                     {/* ONE grid: row 1 => two input-like toggle buttons (enabled); then fields (disabled, 2-per-row) */}
//                     <div className='grid grid-cols-1 md:grid-cols-2'>
//                       {/* Client 1 button (input-like, left rounded) */}
//                       <div>
//                         <button
//                           type='button'
//                           onClick={() => setActiveClient('client1')}
//                           className={[
//                             'h-11 w-full rounded-none rounded-l-md border px-3 text-left text-sm',
//                             'transition focus:outline-none',
//                             activeClient === 'client1'
//                               ? 'border-primary bg-primary text-white'
//                               : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
//                           ].join(' ')}
//                         >
//                           Client 1
//                         </button>
//                       </div>

//                       {/* Client 2 button (input-like, right rounded) */}
//                       <div>
//                         <button
//                           type='button'
//                           onClick={() => setActiveClient('client2')}
//                           className={[
//                             'h-11 w-full rounded-none rounded-r-md border px-3 text-left text-sm',
//                             'transition focus:outline-none',
//                             activeClient === 'client2'
//                               ? 'border-primary bg-primary text-white'
//                               : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
//                           ].join(' ')}
//                         >
//                           Client 2
//                         </button>
//                       </div>
//                     </div>
//                     <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
//                       {/* Disabled fields grid continues in same grid (2 per row) */}
//                       <fieldset
//                         disabled
//                         aria-disabled='true'
//                         className='contents'
//                       >
//                         {(activeClient === 'client1'
//                           ? client1Fields
//                           : client2Fields
//                         ).map((field) => {
//                           const v = getValues(field.name as string);
//                           const span =
//                             field.input_type === 'input_textarea'
//                               ? 'md:col-span-2'
//                               : '';
//                           return (
//                             <div
//                               key={`${field.name}:${String(v)}`}
//                               className={span}
//                             >
//                               <SmartInput
//                                 field={{
//                                   ...field,
//                                   defaultValue: v,
//                                   error: String(
//                                     (errors as any)[field.name]?.message ?? ''
//                                   )
//                                 }}
//                               />
//                             </div>
//                           );
//                         })}
//                       </fieldset>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Actions: ENABLED */}
//               <div className='absolute right-0 bottom-0 left-0 p-4'>
//                 <div className='flex items-center justify-between'>
//                   {step > 0 || subStep > 0 ? (
//                     <Button
//                       type='button'
//                       variant='secondary'
//                       onClick={handleBack}
//                       className='rounded-lg !bg-gray-200 text-gray-800'
//                     >
//                       Back
//                     </Button>
//                   ) : (
//                     <div />
//                   )}

//                   {isLastStep ? (
//                     <Button
//                       type='submit'
//                       className='bg-primary rounded-lg text-white'
//                     >
//                       Submit
//                     </Button>
//                   ) : (
//                     <Button
//                       type='button'
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         handleNext();
//                       }}
//                       className='bg-primary mr-2 rounded-lg text-white'
//                     >
//                       Next
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </form>
//         </FormProvider>
//       </div>

//       {/* Right: Course Progress (30%) */}
//       <div
//         className='h-[calc(100vh-var(--header-h))] w-[30%] min-w-[30%]'
//         style={{
//           // @ts-ignore
//           '--header-h': '100px'
//         }}
//       >
//         <div className='grid h-full grid-cols-1 gap-4'>
//           <CourseProgressCard
//             step={step}
//             subStep={subStep}
//             data={getValues()}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmartInput } from '@/features/client/components/SmartInput';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FORM_DATA, FormField } from '@/constants/form-data';
import CourseProgressCard from '@/features/client/components/CourseProgressCard';
import { zodFromFields } from '@/validation/segmentSchema';
import { ClientDetail } from '@/constants/mock-clients-detail';
import toast from 'react-hot-toast';
import {
  cloneFieldsWithPrefix,
  collectAllFieldsForSchema,
  defaultsFromFields,
  isFormField,
  isSplitSection,
  normaliseClientDetailForForm
} from '@/lib/client-split-section';
import { TabButton } from '@/features/client/components/TabButton';

export default function ClientDetailContent({ data }: { data: ClientDetail }) {
  const allFormFields = useMemo(() => collectAllFieldsForSchema(FORM_DATA), []);
  const schema = useMemo(() => zodFromFields(allFormFields), [allFormFields]);

  const baseDefaults = useMemo(
    () => defaultsFromFields(allFormFields),
    [allFormFields]
  );

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: baseDefaults,
    shouldUnregister: false
  });

  const {
    reset,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors }
  } = methods;

  useEffect(() => {
    if (!data) return;
    const merged = { ...baseDefaults, ...data };
    const normalised = normaliseClientDetailForForm(merged);
    reset(normalised, { keepErrors: true });
  }, [data?.id, baseDefaults, reset]);

  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [title, setTitle] = useState(FORM_DATA[0]?.title ?? '');
  const [subTitle, setSubTitle] = useState(
    FORM_DATA[0].sections?.[0]?.sub_title ?? ''
  );

  const currentStep = FORM_DATA[step];
  const section = currentStep.sections?.[subStep];
  const sectionFields: FormField[] = (section?.fields ?? []) as FormField[];

  const [activeClient, setActiveClient] = useState<'client1' | 'client2'>(
    'client1'
  );

  const splitThisSection = isSplitSection(currentStep.id, section?.sub_title);
  const client1Fields = useMemo(
    () =>
      splitThisSection ? cloneFieldsWithPrefix(sectionFields, 'client1_') : [],
    [splitThisSection, sectionFields]
  );
  const client2Fields = useMemo(
    () =>
      splitThisSection ? cloneFieldsWithPrefix(sectionFields, 'client2_') : [],
    [splitThisSection, sectionFields]
  );
  const normalFields = useMemo(
    () => (splitThisSection ? [] : sectionFields),
    [splitThisSection, sectionFields]
  );

  const isLastStep = useMemo(() => {
    const s = FORM_DATA[step];
    const sections = s?.sections ?? [];
    const hasSections = sections.length > 0;
    const atLastSub = hasSections ? subStep === sections.length - 1 : true;
    return step === FORM_DATA.length - 1 && atLastSub;
  }, [step, subStep]);

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    if (!isLastStep) return;
    try {
      console.log('Final Submitted Data', formData);
      toast.success('Client successfully updated!');
    } catch (e) {
      console.error(e);
      toast.error('Client update failed!');
    }
  };

  const hasSections = (s: any) =>
    Array.isArray(s?.sections) && s.sections.length > 0;
  const lastSubIndex = (s: any) => (hasSections(s) ? s.sections.length - 1 : 0);

  const handleNext = async () => {
    const fieldNames = splitThisSection
      ? [...client1Fields, ...client2Fields].map((f) => f.name)
      : normalFields.map((f) => f.name);

    const ok = await trigger(fieldNames);
    if (!ok) return;

    const curr = FORM_DATA[step];

    if (Array.isArray(curr?.sections) && subStep < curr.sections.length - 1) {
      const nextSub = subStep + 1;
      setSubStep(nextSub);
      setSubTitle(curr.sections[nextSub]?.sub_title ?? '');
      return;
    }

    if (step < FORM_DATA.length - 1) {
      const nextStep = step + 1;
      const next = FORM_DATA[nextStep];
      setStep(nextStep);
      setTitle(next?.title ?? '');
      const hasSections =
        Array.isArray(next?.sections) && next.sections.length > 0;
      setSubStep(0);
      setSubTitle(
        hasSections && next.sections ? (next.sections[0]?.sub_title ?? '') : ''
      );
    }
  };

  const handleBack = () => {
    const curr = FORM_DATA[step];

    if (hasSections(curr) && subStep > 0) {
      const prevSub = subStep - 1;
      setSubStep(prevSub);
      setSubTitle(curr.sections?.[prevSub]?.sub_title ?? '');
      return;
    }

    if (step > 0) {
      const prevStep = step - 1;
      const prev = FORM_DATA[prevStep];

      setStep(prevStep);
      setTitle(prev?.title ?? '');

      const prevLast = lastSubIndex(prev);
      setSubStep(prevLast);
      setSubTitle(
        hasSections(prev) ? (prev.sections?.[prevLast]?.sub_title ?? '') : ''
      );
    }
  };

  return (
    <div className='flex min-h-screen flex-row gap-4'>
      <div
        className='h-[calc(100vh-var(--header-h))] w-[70%] min-w-[70%]'
        style={{
          // @ts-ignore
          '--header-h': '100px'
        }}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex h-full flex-col'
          >
            {/* 📌 typography apply here */}
            <div className='flex h-full flex-col rounded-xl border p-6 font-sans text-sm shadow-sm backdrop-blur [&_input]:font-sans [&_input]:text-sm [&_label]:font-sans [&_label]:text-sm [&_select]:font-sans [&_select]:text-sm [&_textarea]:font-sans [&_textarea]:text-sm'>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-bold tracking-tight'>
                  {`${title} ${subTitle ? ' / ' + subTitle : ''}`}
                </h2>
              </div>

              <div className='min-h-0 flex-1 overflow-y-auto pr-2 pb-12'>
                {!splitThisSection && (
                  <div className='mt-6 grid grid-cols-1 gap-5 md:grid-cols-2'>
                    {normalFields.map((field) => {
                      const v = getValues(field.name as string);
                      const span =
                        field.input_type === 'input_textarea'
                          ? 'md:col-span-2'
                          : '';
                      return (
                        <div
                          key={`${field.name}:${String(v)}`}
                          className={span}
                        >
                          <SmartInput
                            key={`${field.name}:${String(v)}`}
                            field={{
                              ...field,
                              defaultValue: v,
                              error: String(
                                (errors as any)[field.name]?.message ?? ''
                              ),
                              disabled: true,
                              onChange: (val) =>
                                setValue(field.name as string, val, {
                                  shouldValidate: true
                                })
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {splitThisSection && (
                  <div className='mt-2'>
                    <TabButton
                      loading={false}
                      onClick={(tab) =>
                        setActiveClient(tab as 'client1' | 'client2')
                      }
                      activeClient={activeClient}
                    />

                    <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
                      {(activeClient === 'client1'
                        ? client1Fields
                        : client2Fields
                      ).map((field) => {
                        const v = getValues(field.name as string);
                        const span =
                          field.input_type === 'input_textarea'
                            ? 'md:col-span-2'
                            : '';
                        return (
                          <div
                            key={`${field.name}:${String(v)}`}
                            className={span}
                          >
                            <SmartInput
                              key={`${field.name}:${String(v)}`}
                              field={{
                                ...field,
                                defaultValue: v,
                                error: String(
                                  (errors as any)[field.name]?.message ?? ''
                                ),
                                disabled: true,
                                onChange: (val) =>
                                  setValue(field.name as string, val, {
                                    shouldValidate: true
                                  })
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className='absolute right-0 bottom-0 left-0 p-4'>
                <div className='flex items-center justify-between'>
                  {step > 0 || subStep > 0 ? (
                    <Button
                      type='button'
                      variant='secondary'
                      onClick={handleBack}
                      className='rounded-lg !bg-gray-200 text-gray-800'
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {isLastStep ? (
                    <Button
                      type='submit'
                      className='bg-primary rounded-lg text-white'
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleNext();
                      }}
                      className='bg-primary mr-2 rounded-lg text-white'
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      <div
        className='h-[calc(100vh-var(--header-h))] w-[30%] min-w-[30%]'
        style={{
          // @ts-ignore
          '--header-h': '100px'
        }}
      >
        <div className='grid h-full grid-cols-1 gap-4'>
          <CourseProgressCard
            step={step}
            subStep={subStep}
            data={getValues()}
          />
        </div>
      </div>
    </div>
  );
}
