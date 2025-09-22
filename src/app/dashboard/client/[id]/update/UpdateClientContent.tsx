'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

export default function UpdateClientContent({ data }: { data: ClientDetail }) {
  const allFormFields = useMemo(() => collectAllFieldsForSchema(FORM_DATA), []);
  const schema = useMemo(() => zodFromFields(allFormFields), [allFormFields]);

  // Defaults
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

  // loading + timerRef + cleanup
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const currentStep = FORM_DATA[step];
  const section = currentStep.sections?.[subStep];
  const sectionFields: FormField[] = (section?.fields ?? []) as FormField[];

  const [activeClient, setActiveClient] = useState<'client1' | 'client2'>(
    'client1'
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

  const handleFormKeyDown = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== 'Enter') return;
    const tgt = e.target as HTMLElement;
    const tag = tgt.tagName.toLowerCase();
    const role = tgt.getAttribute('role');
    const isTextArea = tag === 'textarea';
    const isCombo = role === 'combobox';
    if (!isLastStep && !isTextArea && !isCombo) {
      e.preventDefault();
      await handleNext();
    }
  };

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

  const handleNext = async () => {
    if (loading) return;

    const fieldNames = splitThisSection
      ? (activeClient === 'client1' ? client1Fields : client2Fields).map(
          (f) => f.name
        )
      : normalFields.map((f) => f.name);

    const ok = await trigger(fieldNames);
    if (!ok) return;

    const stepValues = getValues(fieldNames);
    console.groupCollapsed(
      `[NEXT] Step ${step} • Sub ${subStep} — ${title}${
        subTitle ? ' / ' + subTitle : ''
      } • Active: ${splitThisSection ? activeClient : 'normal'}`
    );
    console.table(stepValues);
    console.log('fieldNames:', fieldNames);
    console.groupEnd();

    setLoading(true);
    timerRef.current = window.setTimeout(() => {
      setLoading(false);

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
          hasSections && next.sections
            ? (next.sections[0]?.sub_title ?? '')
            : ''
        );
      }
    }, 2000);
  };

  const hasSections = (s: any) =>
    Array.isArray(s?.sections) && s.sections.length > 0;
  const lastSubIndex = (s: any) => (hasSections(s) ? s.sections.length - 1 : 0);

  const handleBack = () => {
    if (loading) return;

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
      {/* Left: Step Form (70%) */}
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
            onKeyDown={handleFormKeyDown}
            className='flex h-full flex-col'
            aria-busy={loading}
          >
            {/* 🔽 Sidebar-style typography applied here */}
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
                      loading={loading}
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
                      disabled={loading}
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
                      disabled={loading}
                    >
                      {loading ? 'Submitting…' : 'Submit'}
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
                      disabled={loading}
                    >
                      {loading ? 'Loading…' : 'Next'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Right: Course Progress (30%) */}
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
