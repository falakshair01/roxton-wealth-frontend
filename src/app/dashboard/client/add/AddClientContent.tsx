'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmartInput } from '@/features/client/components/SmartInput';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FORM_DATA, FormField, FormData } from '@/constants/form-data';
import CourseProgressCard from '@/features/client/components/CourseProgressCard';
import { zodFromFields } from '@/validation/segmentSchema';
import toast from 'react-hot-toast';
import {
  cloneFieldsWithPrefix,
  collectAllFieldsForSchema,
  defaultsFromFields,
  isFormField,
  isSplitSection
} from '@/lib/client-split-section';

export default function AddClientContent() {
  const allSchemaFields = useMemo(
    () => collectAllFieldsForSchema(FORM_DATA),
    []
  );
  const schema = useMemo(
    () => zodFromFields(allSchemaFields),
    [allSchemaFields]
  );

  const defaultValues = useMemo(
    () => defaultsFromFields(allSchemaFields),
    [allSchemaFields]
  );

  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [title, setTitle] = useState(FORM_DATA[0]?.title ?? '');
  const [subTitle, setSubTitle] = useState(
    FORM_DATA[0].sections?.[0]?.sub_title ?? ''
  );

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors }
  } = methods;

  const currentStep = FORM_DATA[step];
  const currentSection = currentStep.sections?.[subStep];
  const currentFields: FormField[] = (currentSection?.fields ??
    []) as FormField[];

  const splitThisSection = isSplitSection(
    currentStep.id,
    currentSection?.sub_title
  );

  const client1Fields = useMemo(
    () =>
      splitThisSection ? cloneFieldsWithPrefix(currentFields, 'client1_') : [],
    [splitThisSection, currentFields]
  );
  const client2Fields = useMemo(
    () =>
      splitThisSection ? cloneFieldsWithPrefix(currentFields, 'client2_') : [],
    [splitThisSection, currentFields]
  );
  const normalFields = useMemo(
    () => (splitThisSection ? [] : currentFields),
    [splitThisSection, currentFields]
  );

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    try {
      console.log('Final Submitted Data', formData);
      toast.success('Client successfully created!');
    } catch (e) {
      console.error(e);
      toast.error('Client create failed!');
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

    const stepValues = getValues(fieldNames);
    console.log('Current Step Values:', stepValues, 'fieldNames:', fieldNames);

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
      const hasSec = Array.isArray(next?.sections) && next.sections.length > 0;
      setSubStep(0);
      setSubTitle(
        hasSec && next.sections ? (next.sections[0]?.sub_title ?? '') : ''
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
        style={{ '--header-h': '100px' } as React.CSSProperties}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex h-full flex-col'
          >
            <div className='flex h-full flex-col rounded-xl border p-6 shadow-sm backdrop-blur'>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-bold tracking-tight'>
                  {`${title} ${subTitle ? ' / ' + subTitle : ''}`}
                </h2>
              </div>

              <div className='min-h-0 flex-1 overflow-y-auto pr-2'>
                {!splitThisSection && (
                  <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    {normalFields.map((field) => (
                      <div
                        key={field.name}
                        className={
                          field.input_type === 'input_textarea'
                            ? 'col-span-2'
                            : ''
                        }
                      >
                        <SmartInput
                          key={field.name}
                          field={{
                            ...field,
                            defaultValue: getValues(field.name as string),
                            error: String(
                              (errors as any)[field.name]?.message ?? ''
                            ),
                            onChange: (val) =>
                              setValue(field.name as string, val, {
                                shouldValidate: true
                              })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {splitThisSection && (
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {/* Client 1 */}
                    <div>
                      <div className='mb-3 text-lg font-semibold'>Client 1</div>
                      <div className='grid grid-cols-1 gap-5'>
                        {client1Fields.map((field) => (
                          <div
                            key={field.name}
                            className={
                              field.input_type === 'input_textarea'
                                ? 'col-span-1'
                                : ''
                            }
                          >
                            <SmartInput
                              key={field.name}
                              field={{
                                ...field,
                                defaultValue: getValues(field.name as string),
                                error: String(
                                  (errors as any)[field.name]?.message ?? ''
                                ),
                                onChange: (val) =>
                                  setValue(field.name as string, val, {
                                    shouldValidate: true
                                  })
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Client 2 */}
                    <div>
                      <div className='mb-3 text-lg font-semibold'>Client 2</div>
                      <div className='grid grid-cols-1 gap-5'>
                        {client2Fields.map((field) => (
                          <div
                            key={field.name}
                            className={
                              field.input_type === 'input_textarea'
                                ? 'col-span-1'
                                : ''
                            }
                          >
                            <SmartInput
                              key={field.name}
                              field={{
                                ...field,
                                defaultValue: getValues(field.name as string),
                                error: String(
                                  (errors as any)[field.name]?.message ?? ''
                                ),
                                onChange: (val) =>
                                  setValue(field.name as string, val, {
                                    shouldValidate: true
                                  })
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* actions */}
                <div className='sticky bottom-0 mt-6 pt-4 backdrop-blur'>
                  <div className='flex items-center justify-between'>
                    {step > 0 || subStep > 0 ? (
                      <Button
                        type='button'
                        variant='secondary'
                        onClick={handleBack}
                        className='!bg-gray-2 00 rounded-lg text-gray-800'
                      >
                        Back
                      </Button>
                    ) : (
                      <div />
                    )}

                    {step < FORM_DATA.length - 1 ||
                    (FORM_DATA[step]?.sections &&
                      subStep < (FORM_DATA[step].sections?.length ?? 0) - 1) ? (
                      <Button
                        type='button'
                        onClick={handleNext}
                        className='bg-primary mr-2 rounded-lg text-white'
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type='submit'
                        className='bg-primary rounded-lg text-white'
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Right: Progress (30%) */}
      <div
        className='h-[calc(100vh-var(--header-h))] w-[30%] min-w-[30%]'
        style={{ '--header-h': '100px' } as React.CSSProperties}
      >
        <div className='grid h-full grid-cols-1 gap-4'>
          <CourseProgressCard
            step={step}
            subStep={subStep}
            showDownload={false}
          />
        </div>
      </div>
    </div>
  );
}
