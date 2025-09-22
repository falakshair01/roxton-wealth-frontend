import { FormField, FormData, FORM_DATA } from '@/constants/form-data';

export const CLIENT_SPLIT_SECTIONS: Record<number, string[]> = {
  1: [
    'Personal Details',
    'Identification & Tax',
    'Additional Personal Status',
    'Address & Contact',
    'Marketing Preferences',
    'Identity Verification'
  ],
  2: [
    'Summary Overview',
    'Vulnerability Assessment',
    'Occupation & Income',
    'Financial Summary',
    'Assets',
    'Liabilities',
    'Expenditure Details'
  ],

  4: ['Policy Replacements', 'Client Needs by Protection Type']
  // id: 5 => Advisor Notes & Checklist (no splits)
};

export const isSplitSection = (stepId: number, subTitle?: string) => {
  if (!subTitle) return false;
  const list = CLIENT_SPLIT_SECTIONS[stepId];
  return Array.isArray(list) && list.includes(subTitle);
};

export const cloneFieldsWithPrefix = (
  fields: FormField[],
  prefix: 'client1_' | 'client2_'
): FormField[] => {
  return fields.map((f) => ({
    ...f,
    name: `${prefix}${f.name}`
  }));
};

export const isFormField = (
  item: FormField | { sub_title: string; fields: FormField[] }
): item is FormField => {
  return (item as FormField).input_type !== undefined;
};

export const defaultsFromFields = (fields: FormField[]) => {
  const d: Record<string, any> = {};
  for (const f of fields) {
    if (d[f.name] !== undefined) continue;
    switch (f.input_type) {
      case 'input_checklist':
        d[f.name] = Array.isArray(f.value) ? f.value : [];
        break;
      case 'file':
        d[f.name] = null;
        break;
      case 'input_number':
        d[f.name] = typeof f.value === 'number' ? f.value : '';
        break;
      default:
        d[f.name] = typeof f.value === 'string' ? f.value : '';
    }
  }
  return d;
};

export const collectAllFieldsForSchema = (data: FormData): FormField[] => {
  const out: FormField[] = [];
  data.forEach((step) => {
    const stepId = step.id;
    const sections = step.sections ?? [];

    sections.forEach((sec) => {
      const subTitle = sec.sub_title;
      const fields = (sec.fields ?? []).filter(Boolean) as FormField[];

      if (isSplitSection(stepId, subTitle)) {
        out.push(...cloneFieldsWithPrefix(fields, 'client1_'));
        out.push(...cloneFieldsWithPrefix(fields, 'client2_'));
      } else {
        out.push(...fields);
      }
    });

    const topLevelFields = (step.fields ?? []).filter(
      isFormField
    ) as FormField[];
    if (topLevelFields.length) out.push(...topLevelFields);
  });
  return out;
};

export const YES_NO_KEYS = new Set([
  'valid_will',
  'dependent_on_partner',
  'politically_exposed_person',
  'uk_sanction_entity',
  'financial_dependents',
  'summary_income',
  'summary_properties',
  'summary_protection',
  'summary_other_liabilities',
  'summary_previous_debt_consolidation',
  'has_adverse_credit_history',
  'loan_application_refused',
  'pep_or_linked',
  'joint_dependent'
]);

export const toYesNo = (v: any) => {
  if (typeof v === 'number') return v > 0 ? 'yes' : 'no';
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    if (['yes', 'y', 'true', '1'].includes(s)) return 'yes';
    if (['no', 'n', 'false', '0', ''].includes(s)) return 'no';
    return 'yes';
  }
  return 'no';
};

export const isoDate = (d: any) => {
  if (!d) return '';
  const x = new Date(d);
  if (isNaN(x.getTime())) return String(d);
  const mm = String(x.getMonth() + 1).padStart(2, '0');
  const dd = String(x.getDate()).padStart(2, '0');
  return `${x.getFullYear()}-${mm}-${dd}`;
};

export const SPLIT_BASE_FIELD_NAMES: Set<string> = (() => {
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

type AnyRec = Record<string, any>;

export const normaliseClientDetailForForm = (src: AnyRec): AnyRec => {
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
};
