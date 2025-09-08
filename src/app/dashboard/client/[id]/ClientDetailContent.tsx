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
  YES_NO_KEYS
} from '@/lib/client-split-section';

/* ================== data normalisation ================== */
type AnyRec = Record<string, any>;

function toYesNo(v: any) {
  if (typeof v === 'number') return v > 0 ? 'yes' : 'no';
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    if (['yes', 'y', 'true', '1'].includes(s)) return 'yes';
    if (['no', 'n', 'false', '0', ''].includes(s)) return 'no';
    return 'yes';
  }
  return 'no';
}
function isoDate(d: any) {
  if (!d) return '';
  const x = new Date(d);
  if (isNaN(x.getTime())) return String(d);
  const mm = String(x.getMonth() + 1).padStart(2, '0');
  const dd = String(x.getDate()).padStart(2, '0');
  return `${x.getFullYear()}-${mm}-${dd}`;
}

const SPLIT_BASE_FIELD_NAMES: Set<string> = (() => {
  const names = new Set<string>();
  for (const step of FORM_DATA) {
    const sections = step.sections ?? [];
    for (const sec of sections) {
      if (isSplitSection(step.id, sec.sub_title)) {
        for (const f of sec.fields as FormField[]) names.add(f.name);
      }
    }
  }
  return names;
})();

export function normaliseClientDetailForForm(src: AnyRec): AnyRec {
  const out: AnyRec = { ...src };

  const c1 =
    out.client1 && typeof out.client1 === 'object' ? out.client1 : null;
  const c2 =
    out.client2 && typeof out.client2 === 'object' ? out.client2 : null;
  if (c1) {
    for (const [k, v] of Object.entries(c1)) out[`client1_${k}`] = v;
  }
  if (c2) {
    for (const [k, v] of Object.entries(c2)) out[`client2_${k}`] = v;
  }

  Object.keys(out).forEach((k) => {
    if (
      /_date$|date_of_birth|dependent_dob|employment_start_date|date_of_issue|expiry_date/i.test(
        k
      )
    ) {
      out[k] = isoDate(out[k]);
    }
  });

  if (typeof out.meeting_venue === 'string') {
    const s = out.meeting_venue.toLowerCase();
    out.meeting_venue = s.includes('client')
      ? 'face_to_face'
      : s.includes('video')
        ? 'video_conference'
        : 'face_to_face';
  }

  const mapPairs = (keys: string[], fn: (val: any) => any) => {
    for (const key of keys) {
      if (key in out && typeof out[key] === 'string') out[key] = fn(out[key]);
    }
  };
  mapPairs(
    ['client_status', 'client1_client_status', 'client2_client_status'],
    (v: string) =>
      v.toLowerCase() === 'active'
        ? 'current_client'
        : v.toLowerCase() === 'legacy_client'
          ? 'legacy_client'
          : v
  );
  mapPairs(
    ['employment_type', 'client1_employment_type', 'client2_employment_type'],
    (v: string) => v.toLowerCase()
  );

  // E) contact_method conversions (base + prefixed)
  const normalizeContactMethod = (v: any) =>
    Array.isArray(v)
      ? v.map((x: string) =>
          String(x).toLowerCase() === 'email'
            ? 'correspondence_email'
            : String(x).toLowerCase()
        )
      : v;

  [
    'contact_method',
    'client1_contact_method',
    'client2_contact_method'
  ].forEach((k) => {
    if (k in out) out[k] = normalizeContactMethod(out[k]);
  });

  const allowOrNot = (v: any) =>
    String(v).toLowerCase() === 'yes'
      ? 'allow'
      : String(v).toLowerCase() === 'allow'
        ? 'allow'
        : 'dont_allow';
  [
    'correspondence_email',
    'client1_correspondence_email',
    'client2_correspondence_email'
  ].forEach((k) => {
    if (k in out) out[k] = allowOrNot(out[k]);
  });
  [
    'servicing_emails',
    'client1_servicing_emails',
    'client2_servicing_emails'
  ].forEach((k) => {
    if (k in out) out[k] = allowOrNot(out[k]);
  });
  [
    'post_advertising',
    'client1_post_advertising',
    'client2_post_advertising'
  ].forEach((k) => {
    if (k in out) out[k] = allowOrNot(out[k]);
  });

  // F) YES/NO fields – base + prefixed
  const yesNoKeysAll = [
    ...Array.from(YES_NO_KEYS),
    ...Array.from(YES_NO_KEYS).map((k) => `client1_${k}`),
    ...Array.from(YES_NO_KEYS).map((k) => `client2_${k}`)
  ];
  yesNoKeysAll.forEach((k) => {
    if (k in out) out[k] = toYesNo(out[k]);
  });

  // G) *** THE IMPORTANT FALLBACK ***
  // If data has UNPREFIXED base keys that belong to split sections, copy them into Client 1.
  // Also, if we find "<name>_2" or "<name>2" -> map to Client 2.
  for (const baseName of Array.from(SPLIT_BASE_FIELD_NAMES)) {
    const c1Key = `client1_${baseName}`;
    const c2Key = `client2_${baseName}`;

    // If client1_ not present but base value exists -> copy to client1_
    if (!(c1Key in out) && baseName in out) {
      out[c1Key] = out[baseName];
    }

    // If client2_ not present, try common second-client patterns
    if (!(c2Key in out)) {
      const c2Candidates = [
        `${baseName}_2`,
        `${baseName}2`,
        `second_${baseName}`
      ];
      for (const cand of c2Candidates) {
        if (cand in out) {
          out[c2Key] = out[cand];
          break;
        }
      }
      // If still missing and there is an explicit 'client2' nested (handled above), it would be set.
      // Otherwise leave empty so user can fill Client 2 manually.
    }
  }

  return out;
}

/* ================== COMPONENT ================== */
export default function ClientDetailContent({ data }: { data: ClientDetail }) {
  // Build schema from split-aware flatten
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

  // Merge incoming data → normalize (now includes mapping to client1_/client2_)
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

  // is last?
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

  // Enter -> Next (except last step / textarea / combobox)
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

  // split vs normal for current section
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

  const hasSections = (s: any) =>
    Array.isArray(s?.sections) && s.sections.length > 0;
  const lastSubIndex = (s: any) => (hasSections(s) ? s.sections.length - 1 : 0);

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
          >
            <div className='flex h-full flex-col rounded-xl border p-6 shadow-sm backdrop-blur'>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-bold tracking-tight'>
                  {`${title} ${subTitle ? ' / ' + subTitle : ''}`}
                </h2>
              </div>

              <div className='min-h-0 flex-1 overflow-y-auto pr-2 pb-12'>
                {/* Top-level fields (rare) — unchanged */}
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                  {Array.isArray((currentStep as any).fields) &&
                    (
                      (currentStep as any).fields as (
                        | FormField
                        | { sub_title: string; fields: FormField[] }
                      )[]
                    )
                      .filter(isFormField)
                      .map((field) => {
                        const v = getValues(field.name as string);
                        return (
                          <div
                            key={`${field.name}:${String(v)}`}
                            className={
                              field.input_type === 'input_textarea'
                                ? 'col-span-2'
                                : ''
                            }
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

                {/* Section fields — either normal OR split (Client 1 | Client 2) */}
                {!splitThisSection && (
                  <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    {normalFields.map((field) => {
                      const v = getValues(field.name as string);
                      return (
                        <div
                          key={`${field.name}:${String(v)}`}
                          className={
                            field.input_type === 'input_textarea'
                              ? 'col-span-2'
                              : ''
                          }
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
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {/* Client 1 */}
                    <div>
                      <div className='mb-3 text-lg font-semibold'>Client 1</div>
                      <div className='grid grid-cols-1 gap-5'>
                        {client1Fields.map((field) => {
                          const v = getValues(field.name as string);
                          return (
                            <div key={`${field.name}:${String(v)}`}>
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

                    {/* Client 2 */}
                    <div>
                      <div className='mb-3 text-lg font-semibold'>Client 2</div>
                      <div className='grid grid-cols-1 gap-5'>
                        {client2Fields.map((field) => {
                          const v = getValues(field.name as string);
                          return (
                            <div key={`${field.name}:${String(v)}`}>
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
