import { FormField, FormData } from '@/constants/form-data';

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
