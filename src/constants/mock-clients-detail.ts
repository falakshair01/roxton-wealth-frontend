import { FORM_DATA } from './form-data';
import { MOCK_CLIENTS } from './mock-clients';

export interface ClientDetail {
  adviser_name: string;
  fact_find_completed_date: string;
  fact_find_place: string;
  client_agreement_given_date: string;
  client_agreement_signed_date: string;
  client_agreement_dispatch_method: string;
  client_agreement_reference_number: string;
  client_meeting_date: string;
  meeting_venue: string;
  all_clients_present: string;
  quotes_sourcing_date: string;
  quotes_presentation_date: string;
  esis_presentation_date: string;
  tech_dispatch_method: string;
  protection_quotes_date: string;
  protection_risks_discussed_date: string;
  protection_declaration_signed_date: string;
  protection_declaration_dispatch_method: string;
  suitability_report_sent_date: string;
  suitability_report_dispatch_method: string;
  mortgage_offer_date: string;
  lender_application_date: string;
  anticipated_completion_date: string;
  proc_fees: number;
  broker_fees: number;
  lead_source: string;
  fee_split_introducer: string;
  introducer_name: string;
  client_status: string;
  title: string;
  gender: string;
  forenames: string;
  surname: string;
  preferred_name_salutation: string;
  previous_names: string;
  date_of_birth: string;
  marital_status: string;
  national_insurance_number: string;
  tax_residence_and_domicile: string;
  passport_number: string;
  driving_licence_number: string;
  nationality: string;
  country_of_residence: string;
  country_of_domicile: string;
  dual_nationality: string;
  uk_tax_payer: string;
  valid_will: string;
  anticipated_retirement_age: number;
  dependent_on_partner: string;
  politically_exposed_person: string;
  uk_sanction_entity: string;
  home_address: string;
  occupancy_status: string;
  time_at_current_address: string;
  previous_addresses_if_less_than_3_years: string;
  telephone_numbers: string;
  email_address: string;
  preferred_contact_method: string;
  marketing_preferences_last_confirmed_date: string;
  contact_method: string[];
  correspondence_email: string;
  servicing_emails: string;
  post_advertising: string;
  type_of_id: string;
  verification_method: string;
  reference_number: string;
  date_of_issue: string;
  expiry_date: string;
  financial_dependents: string;
  summary_income: string;
  summary_properties: string;
  summary_protection: string;
  summary_other_liabilities: string;
  summary_previous_debt_consolidation: string;
  dependent_name: string;
  dependent_dob: string;
  dependent_relationship: string;
  dependency_duration: string;
  joint_dependent: string;
  changes_in_personal_circumstances: string;
  has_adverse_credit_history: string;
  credit_history_notes: string;
  loan_application_refused: string;
  pep_or_linked: string;
  client_vulnerability_factors: string[];
  vc_elements_explanation: string;
  face_to_face_meeting_reason: string;
  vulnerability_notes: string;
  occupation: string;
  employment_type: string;
  contractor_or_probation: string;
  business_name: string;
  employment_start_date: string;
  previous_job_details: string;
  gross_income_annual: number;
  additional_income: number;
  state_benefits: string;
  covid_impact: string;
  previous_year_income: number;
  expected_retirement_age: number;
  net_monthly_income: string;
  total_monthly_outgoings: string;
  disposable_income: string;
  income_expenditure_change_details: string;
  main_residence: string;
  other_property: string;
  cash_savings: string;
  other_assets: string;
  emergency_fund_details: string;
  residential_mortgage_balance: string;
  residential_mortgage_repayments: string;
  residential_mortgage_term: string;
  residential_mortgage_interest_rate: string;
  residential_mortgage_repayment_basis: string;
  btl_mortgage_balance: string;
  btl_mortgage_repayments: string;
  btl_mortgage_term: string;
  btl_mortgage_interest_rate: string;
  btl_mortgage_repayment_basis: string;
  other_loan_type: string;
  other_loans_balance: string;
  other_loans_repayments: string;
  remaining_term: string;
  other_loans_interest_rate: string;
  early_redemption_charges: string;
  total_household_expenditure: string;
  mortgage: string;
  rent: string;
  council_tax: string;
  gas: string;
  electricity: string;
  water: string;
  telephone: string;
  food: string;
  clothing: string;
  hairdressing_cosmetics: string;
  memberships: string;
  entertainment: string;
  tv_satellite_internet: string;
  life_assurance_pension: string;
  personal_loans: string;
  credit_cards: string;
  car_loans_leasing: string;
  car_travel_insurance: string;
  general_insurance_premiums: string;
  housing_maintenance: string;
  holidays: string;
  school_fees_childcare: string;
  pets: string;
  other_expenditure: string;
  income_or_expenditure_change: string;
  mortgage_payoff_plan: string;
  likely_to_move_home: string;
  upper_limit_mortgage_costs: string;
  fix_mortgage_costs: string;
  rate_linked_to_boer: string;
  early_year_discount: string;
  cashback_access: string;
  priority_features_misc: string;
  objective_of_borrowing: string;
  property_use: string;
  buyer_situation: string;
  property_value: number;
  deposit_amount: number;
  borrowing_amount: number;
  deposit_source_and_docs: string;
  additional_funds: string;
  stamp_duty_details: string;
  high_risk_country_deposit_check: string;
  scheme_applicability: string;
  loan_to_value_percent: number;
  repayment_method: string;
  mortgage_term_preference: string;
  shorter_term_consideration: string;
  initial_rate_type_preference: string;
  erc_acceptance: string;
  initial_rate_period_preference: string;
  fee_payment_preference: string;
  special_considerations_or_limitations: string;
  attitude_to_mortgage_repayment: string;
  interest_only_repayment_plan: string;
  payments_into_retirement: string;
  debt_consolidation_details: string;
  new_mortgage_or_loan_details: string;
  property_characteristics: string;
  maintain_mortgage_payments_plan: string;
  maintain_lifestyle_plan: string;
  protection_needs: string[];
  smoker_status: string;
  health_issues: string;
  existing_owner: string;
  existing_provider: string;
  existing_term: string;
  existing_sum_assured: string;
  existing_type: string;
  existing_purpose: string;
  existing_premium_frequency: string;
  replace_policy_happy: string;
  which_policies: string;
  cancellation_impact: string;
  topup_without_underwriting: string;
  family_history_considerations: string;
  need_income_on_death: string;
  need_critical_illness: string;
  need_income_on_illness_or_redundancy: string;
  need_pmi: string;
  need_mortgage_debt_repayment: string;
  beneficiaries: string;
  trust_status_type: string;
  mortgage_overview: string;
  protection_overview: string;
  reasons_lender_selection: string;
  mortgage_term_reason: string;
  mortgage_amount_reason: string;
  rate_type_reason: string;
  initial_rate_period_reason: string;
  case_notes: string;
  confirmation_checks: string;
  docs_id_scans: string;
  docs_bank_statements: string;
  docs_debt_statements: string;
  docs_income_proof: string;
  docs_lender_docs: string;
  docs_gdpr_notice: string;
  docs_agreements: string;
  docs_protection_declaration: string;
  docs_budget_planner: string;
  id: string;
  client1_national_insurance_number: string;
  client1_passport_number: string;
  client1_driving_licence_number: string;
  client2_national_insurance_number: string;
  client2_passport_number: string;
  client2_driving_licence_number: string;
  client1_nationality: string;
  client1_country_of_residence: string;
  client1_country_of_domicile: string;
  client2_nationality: string;
  client2_country_of_residence: string;
  client2_country_of_domicile: string;
  client1_home_address: string;
  client1_telephone_numbers: string;
  client1_email_address: string;
  client2_home_address: string;
  client2_telephone_numbers: string;
  client2_email_address: string;
  client1_client_status: string;
  client1_title: string;
  client1_gender: string;
  client1_forenames: string;
  client1_surname: string;
  client1_preferred_name_salutation: string;
  client1_previous_names: string;
  client1_date_of_birth: string;
  client1_marital_status: string;
  client2_client_status: string;
  client2_title: string;
  client2_gender: string;
  client2_forenames: string;
  client2_surname: string;
  client2_preferred_name_salutation: string;
  client2_previous_names: string;
  client2_date_of_birth: string;
  client2_marital_status: string;
  client1_tax_residence_and_domicile: string;
  client1_dual_nationality: string;
  client1_uk_tax_payer: string;
  client2_tax_residence_and_domicile: string;
  client2_dual_nationality: string;
  client2_uk_tax_payer: string;
  client1_valid_will: string;
  client1_anticipated_retirement_age: number;
  client1_dependent_on_partner: string;
  client1_politically_exposed_person: string;
  client1_uk_sanction_entity: string;
  client1_lead_source: string;
  client2_valid_will: string;
  client2_anticipated_retirement_age: number;
  client2_dependent_on_partner: string;
  client2_politically_exposed_person: string;
  client2_uk_sanction_entity: string;
  client2_lead_source: string;
  client1_occupancy_status: string;
  client1_time_at_current_address: string;
  client1_previous_addresses_if_less_than_3_years: string;
  client1_preferred_contact_method: string;
  client2_occupancy_status: string;
  client2_time_at_current_address: string;
  client2_previous_addresses_if_less_than_3_years: string;
  client2_preferred_contact_method: string;
  client1_marketing_preferences_last_confirmed_date: string;
  client1_contact_method_preference: string;
  client1_correspondence_email: string;
  client1_servicing_emails: string;
  client1_post_advertising: string;
  client2_marketing_preferences_last_confirmed_date: string;
  client2_contact_method_preference: string;
  client2_correspondence_email: string;
  client2_servicing_emails: string;
  client2_post_advertising: string;
  client1_type_of_id: string;
  client1_verification_method: string;
  client1_reference_number: string;
  client1_date_of_issue: string;
  client1_expiry_date: string;
  client2_type_of_id: string;
  client2_verification_method: string;
  client2_reference_number: string;
  client2_date_of_issue: string;
  client2_expiry_date: string;
  client1_vulnerability_indicators: string;
  client1_vc_elements_explanation: string;
  client1_face_to_face_meeting_reason: string;
  client1_vulnerability_notes: string;
  client2_vulnerability_factors: string;
  client2_vc_elements_explanation: string;
  client2_face_to_face_meeting_reason: string;
  client2_vulnerability_notes: string;
  client1_occupation: string;
  client1_employment_type: string;
  client1_contractor_or_probation: string;
  client1_business_name: string;
  client1_employment_start_date: string;
  client1_previous_job_details: string;
  client1_gross_income_annual: number;
  client1_additional_income: number;
  client1_state_benefits: string;
  client1_covid_impact: string;
  client1_previous_year_income: number;
  client1_expected_retirement_age: number;
  client2_occupation: string;
  client2_employment_type: string;
  client2_contractor_or_probation: string;
  client2_business_name: string;
  client2_employment_start_date: string;
  client2_previous_job_details: string;
  client2_gross_income_annual: number;
  client2_additional_income: number;
  client2_state_benefits: string;
  client2_covid_impact: string;
  client2_previous_year_income: number;
  client2_expected_retirement_age: number;
  client1_net_monthly_income: string;
  client1_total_monthly_outgoings: string;
  client1_disposable_income: string;
  client1_income_expenditure_change_details: string;
  client2_net_monthly_income: string;
  client2_total_monthly_outgoings: string;
  client2_disposable_income: string;
  client2_income_expenditure_change_details: string;
  client1_main_residence: string;
  client1_other_property: string;
  client1_cash_savings: string;
  client1_other_assets: string;
  client1_emergency_fund_details: string;
  client2_main_residence: string;
  client2_other_property: string;
  client2_cash_savings: string;
  client2_other_assets: string;
  client2_emergency_fund_details: string;
  client1_residential_mortgage_balance: string;
  client1_residential_mortgage_repayments: string;
  client1_residential_mortgage_term: string;
  client1_residential_mortgage_interest_rate: string;
  client1_residential_mortgage_repayment_basis: string;
  client1_btl_mortgage_balance: string;
  client1_btl_mortgage_repayments: string;
  client1_btl_mortgage_term: string;
  client1_btl_mortgage_interest_rate: string;
  client1_btl_mortgage_repayment_basis: string;
  client1_other_loan_type: string;
  client1_other_loans_balance: string;
  client1_other_loans_repayments: string;
  client1_remaining_term: string;
  client1_other_loans_interest_rate: string;
  client1_early_redemption_charges: string;
  client2_residential_mortgage_balance: string;
  client2_residential_mortgage_repayments: string;
  client2_residential_mortgage_term: string;
  client2_residential_mortgage_interest_rate: string;
  client2_residential_mortgage_repayment_basis: string;
  client2_btl_mortgage_balance: string;
  client2_btl_mortgage_repayments: string;
  client2_btl_mortgage_term: string;
  client2_btl_mortgage_interest_rate: string;
  client2_btl_mortgage_repayment_basis: string;
  client2_other_loan_type: string;
  client2_other_loans_balance: string;
  client2_other_loans_repayments: string;
  client2_remaining_term: string;
  client2_other_loans_interest_rate: string;
  client2_early_redemption_charges: string;
  client1_total_household_expenditure: string;
  client1_mortgage: string;
  client1_rent: string;
  client1_council_tax: string;
  client1_gas: string;
  client1_electricity: string;
  client1_water: string;
  client1_telephone: string;
  client1_food: string;
  client1_clothing: string;
  client1_hairdressing_cosmetics: string;
  client1_memberships: string;
  client1_entertainment: string;
  client1_tv_satellite_internet: string;
  client1_life_assurance_pension: string;
  client1_personal_loans: string;
  client1_credit_cards: string;
  client1_car_loans_leasing: string;
  client1_car_travel_insurance: string;
  client1_general_insurance_premiums: string;
  client1_housing_maintenance: string;
  client1_holidays: string;
  client1_school_fees_childcare: string;
  client1_pets: string;
  client1_other_expenditure: string;
  client2_total_household_expenditure: string;
  client2_mortgage: string;
  client2_rent: string;
  client2_council_tax: string;
  client2_gas: string;
  client2_electricity: string;
  client2_water: string;
  client2_telephone: string;
  client2_food: string;
  client2_clothing: string;
  client2_hairdressing_cosmetics: string;
  client2_memberships: string;
  client2_entertainment: string;
  client2_tv_satellite_internet: string;
  client2_life_assurance_pension: string;
  client2_personal_loans: string;
  client2_credit_cards: string;
  client2_car_loans_leasing: string;
  client2_car_travel_insurance: string;
  client2_general_insurance_premiums: string;
  client2_housing_maintenance: string;
  client2_holidays: string;
  client2_school_fees_childcare: string;
  client2_pets: string;
  client2_other_expenditure: string;
  client1_replace_policy_happy: string;
  client1_which_policies: string;
  client1_cancellation_impact: string;
  client1_topup_without_underwriting: string;
  client1_family_history_considerations: string;
  client2_replace_policy_happy: string;
  client2_which_policies: string;
  client2_cancellation_impact: string;
  client2_topup_without_underwriting: string;
  client2_family_history_considerations: string;
  client1_need_income_on_death: string;
  client1_need_critical_illness: string;
  client1_need_income_on_illness_or_redundancy: string;
  client1_need_pmi: string;
  client1_need_mortgage_debt_repayment: string;
  client2_need_income_on_death: string;
  client2_need_critical_illness: string;
  client2_need_income_on_illness_or_redundancy: string;
  client2_need_pmi: string;
  client2_need_mortgage_debt_repayment: string;
}

const DUMMY_DATA: any = {
  adviser_name: 'Lorraine Wells',
  fact_find_completed_date: '2024-06-26',
  fact_find_place: 'video_conference',
  client_agreement_given_date: '2024-06-06',
  client_agreement_signed_date: '2025-01-31',
  client_agreement_dispatch_method: 'email',
  client_agreement_reference_number: 'AGR-390249',
  client_meeting_date: '2024-08-30',
  meeting_venue: 'video_conference',
  all_clients_present: 'no',
  quotes_sourcing_date: '2024-07-05',
  quotes_presentation_date: '2024-07-12',
  esis_presentation_date: '2024-07-15',
  tech_dispatch_method: 'email',
  protection_quotes_date: '2024-07-18',
  protection_risks_discussed_date: '2024-07-25',
  protection_declaration_signed_date: '2024-08-02',
  protection_declaration_dispatch_method: 'paper',
  suitability_report_sent_date: '2024-08-10',
  suitability_report_dispatch_method: 'paper',
  mortgage_offer_date: '2024-09-06',
  lender_application_date: '2024-08-20',
  anticipated_completion_date: '2025-02-28',
  proc_fees: 89,
  broker_fees: 74,
  // lead_source: 'Website',
  fee_split_introducer: '0%',
  introducer_name: 'N/A',

  client1_client_status: 'active',
  client1_title: 'Mx',
  client1_gender: 'other',
  client1_forenames: 'Christian',
  client1_surname: 'Morley',
  client1_preferred_name_salutation: 'Chris',
  client1_previous_names: 'None',
  client1_date_of_birth: '1972-03-07',
  client1_marital_status: 'widowed',

  client2_client_status: 'active',
  client2_title: 'Mx',
  client2_gender: 'other',
  client2_forenames: 'Christian',
  client2_surname: 'Morley',
  client2_preferred_name_salutation: 'Chris',
  client2_previous_names: 'None',
  client2_date_of_birth: '1972-03-07',
  client2_marital_status: 'widowed',

  client1_national_insurance_number: 'AB602114C',
  client1_tax_residence_and_domicile: 'UK',
  client1_passport_number: 'P6942739',
  client1_driving_licence_number: 'DL-92554',
  client1_nationality: 'British',
  client1_country_of_residence: 'United Kingdom',
  client1_country_of_domicile: 'United Kingdom',
  client1_dual_nationality: 'no',
  client1_uk_tax_payer: 'non_uk',

  client2_national_insurance_number: 'AB602114C',
  client2_tax_residence_and_domicile: 'UK',
  client2_passport_number: 'P6942739',
  client2_driving_licence_number: 'DL-92554',
  client2_nationality: 'British',
  client2_country_of_residence: 'United Kingdom',
  client2_country_of_domicile: 'United Kingdom',
  client2_dual_nationality: 'no',
  client2_uk_tax_payer: 'non_uk',

  client1_valid_will: 'no',
  client1_anticipated_retirement_age: 62,
  client1_dependent_on_partner: 'no',
  client1_politically_exposed_person: 'no',
  client1_uk_sanction_entity: 'no',
  client1_lead_source: 'Website',

  client2_valid_will: 'no',
  client2_anticipated_retirement_age: 62,
  client2_dependent_on_partner: 'no',
  client2_politically_exposed_person: 'no',
  client2_uk_sanction_entity: 'no',
  client2_lead_source: 'Website',

  client1_home_address: '25 Morley Street, London',
  client1_occupancy_status: 'living_with_parents',
  client1_time_at_current_address: '5 years 2 months',
  client1_previous_addresses_if_less_than_3_years: 'N/A',
  client1_telephone_numbers: '+44 7945678723',
  client1_email_address: 'christian.morley@example.com',
  client1_preferred_contact_method: 'post',

  client2_home_address: '25 Morley Street, London',
  client2_occupancy_status: 'living_with_parents',
  client2_time_at_current_address: '5 years 2 months',
  client2_previous_addresses_if_less_than_3_years: 'N/A',
  client2_telephone_numbers: '+44 7945678723',
  client2_email_address: 'christian.morley@example.com',
  client2_preferred_contact_method: 'post',

  client1_marketing_preferences_last_confirmed_date: '2024-06-26',
  client1_contact_method_preference: 'phone',
  client1_correspondence_email: 'dont_allow',
  client1_servicing_emails: 'dont_allow',
  client1_post_advertising: 'dont_allow',

  client2_marketing_preferences_last_confirmed_date: '2024-06-26',
  client2_contact_method_preference: 'phone',
  client2_correspondence_email: 'dont_allow',
  client2_servicing_emails: 'dont_allow',
  client2_post_advertising: 'dont_allow',

  client1_type_of_id: 'residence_permit',
  client1_verification_method: 'online',
  client1_reference_number: 'RP-2024-548392',
  client1_date_of_issue: '2019-04-10',
  client1_expiry_date: '2029-04-10',

  client2_type_of_id: 'residence_permit',
  client2_verification_method: 'online',
  client2_reference_number: 'RP-2024-548392',
  client2_date_of_issue: '2019-04-10',
  client2_expiry_date: '2029-04-10',

  financial_dependents: 'no',
  summary_income: 'no',
  summary_properties: 'no',
  summary_protection: 'no',
  summary_other_liabilities: 'no',
  summary_previous_debt_consolidation: 'no',

  dependent_name: 'N/A',
  dependent_dob: '2029-04-10',
  dependent_relationship: 'N/A',
  dependency_duration: 'N/A',
  joint_dependent: 'no',

  changes_in_personal_circumstances: 'None planned in the next 12 months',
  has_adverse_credit_history: 'no',
  credit_history_notes: 'No missed payments reported in last 24 months',
  loan_application_refused: 'no',
  pep_or_linked: 'no',

  client1_vulnerability_indicators: 'unemployed',
  client1_vc_elements_explanation:
    'Not assessed as overall vulnerable; employment status monitored',
  client1_face_to_face_meeting_reason: 'N/A (video preferred)',
  client1_vulnerability_notes: 'No additional support requested',

  client2_vulnerability_factors: 'unemployed',
  client2_vc_elements_explanation:
    'Not assessed as overall vulnerable; employment status monitored',
  client2_face_to_face_meeting_reason: 'N/A (video preferred)',
  client2_vulnerability_notes: 'No additional support requested',

  client1_occupation: 'Software Engineer',
  client1_employment_type: 'self_employed',
  client1_contractor_or_probation: 'Ongoing rolling 12‑month contract',
  client1_business_name: 'Morley Consulting Ltd',
  client1_employment_start_date: '2015-08-24',
  client1_previous_job_details: 'Senior Developer at BluePixel Ltd (2011–2015)',
  client1_gross_income_annual: 84,
  client1_additional_income: 53,
  client1_state_benefits: 'None',
  client1_covid_impact: 'No lasting impact reported',
  client1_previous_year_income: 60,
  client1_expected_retirement_age: 85,

  client2_occupation: 'Software Engineer',
  client2_employment_type: 'self_employed',
  client2_contractor_or_probation: 'Ongoing rolling 12‑month contract',
  client2_business_name: 'Morley Consulting Ltd',
  client2_employment_start_date: '2015-08-24',
  client2_previous_job_details: 'Senior Developer at BluePixel Ltd (2011–2015)',
  client2_gross_income_annual: 84,
  client2_additional_income: 53,
  client2_state_benefits: 'None',
  client2_covid_impact: 'No lasting impact reported',
  client2_previous_year_income: 60,
  client2_expected_retirement_age: 85,

  client1_net_monthly_income: '7',
  client1_total_monthly_outgoings: '1397',
  client1_disposable_income: '-1005',
  client1_income_expenditure_change_details:
    'No expected changes within 12 months',

  client2_net_monthly_income: '7',
  client2_total_monthly_outgoings: '1397',
  client2_disposable_income: '-1005',
  client2_income_expenditure_change_details:
    'No expected changes within 12 months',

  client1_main_residence: '0',
  client1_other_property: '0',
  client1_cash_savings: '18,500',
  client1_other_assets: 'Company laptop and equipment (~£2,000)',
  client1_emergency_fund_details:
    '6 months’ expenses held in instant-access savings',

  client2_main_residence: '0',
  client2_other_property: '0',
  client2_cash_savings: '18,500',
  client2_other_assets: 'Company laptop and equipment (~£2,000)',
  client2_emergency_fund_details:
    '6 months’ expenses held in instant-access savings',

  client1_residential_mortgage_balance: '0',
  client1_residential_mortgage_repayments: '0',
  client1_residential_mortgage_term: 'N/A',
  client1_residential_mortgage_interest_rate: 'N/A',
  client1_residential_mortgage_repayment_basis: 'repayment',
  client1_btl_mortgage_balance: '0',
  client1_btl_mortgage_repayments: '0',
  client1_btl_mortgage_term: 'N/A',
  client1_btl_mortgage_interest_rate: 'N/A',
  client1_btl_mortgage_repayment_basis: 'repayment',
  client1_other_loan_type: 'Credit card',
  client1_other_loans_balance: '1,200',
  client1_other_loans_repayments: '60 / month',
  client1_remaining_term: '18 months',
  client1_other_loans_interest_rate: '19.9% APR variable',
  client1_early_redemption_charges: 'None',

  client2_residential_mortgage_balance: '0',
  client2_residential_mortgage_repayments: '0',
  client2_residential_mortgage_term: 'N/A',
  client2_residential_mortgage_interest_rate: 'N/A',
  client2_residential_mortgage_repayment_basis: 'repayment',
  client2_btl_mortgage_balance: '0',
  client2_btl_mortgage_repayments: '0',
  client2_btl_mortgage_term: 'N/A',
  client2_btl_mortgage_interest_rate: 'N/A',
  client2_btl_mortgage_repayment_basis: 'repayment',
  client2_other_loan_type: 'Credit card',
  client2_other_loans_balance: '1,200',
  client2_other_loans_repayments: '60 / month',
  client2_remaining_term: '18 months',
  client2_other_loans_interest_rate: '19.9% APR variable',
  client2_early_redemption_charges: 'None',

  client1_total_household_expenditure: '3,100',
  client1_mortgage: '0',
  client1_rent: '1,600',
  client1_council_tax: '160',
  client1_gas: '70',
  client1_electricity: '85',
  client1_water: '35',
  client1_telephone: '45',
  client1_food: '420',
  client1_clothing: '70',
  client1_hairdressing_cosmetics: '35',
  client1_memberships: '40',
  client1_entertainment: '140',
  client1_tv_satellite_internet: '65',
  client1_life_assurance_pension: '90',
  client1_personal_loans: '0',
  client1_credit_cards: '60',
  client1_car_loans_leasing: '150',
  client1_car_travel_insurance: '30',
  client1_general_insurance_premiums: '50',
  client1_housing_maintenance: '0',
  client1_holidays: '30',
  client1_school_fees_childcare: '0',
  client1_pets: '20',
  client1_other_expenditure: '0',

  client2_total_household_expenditure: '3,100',
  client2_mortgage: '0',
  client2_rent: '1,600',
  client2_council_tax: '160',
  client2_gas: '70',
  client2_electricity: '85',
  client2_water: '35',
  client2_telephone: '45',
  client2_food: '420',
  client2_clothing: '70',
  client2_hairdressing_cosmetics: '35',
  client2_memberships: '40',
  client2_entertainment: '140',
  client2_tv_satellite_internet: '65',
  client2_life_assurance_pension: '90',
  client2_personal_loans: '0',
  client2_credit_cards: '60',
  client2_car_loans_leasing: '150',
  client2_car_travel_insurance: '30',
  client2_general_insurance_premiums: '50',
  client2_housing_maintenance: '0',
  client2_holidays: '30',
  client2_school_fees_childcare: '0',
  client2_pets: '20',
  client2_other_expenditure: '0',

  income_or_expenditure_change: 'None anticipated',
  mortgage_payoff_plan: 'N/A (no current mortgage)',
  likely_to_move_home: 'No plans to move within the next 12 months',
  upper_limit_mortgage_costs: 'Not applicable',
  fix_mortgage_costs: 'Not applicable',
  rate_linked_to_boer: 'Not applicable',
  early_year_discount: 'Not applicable',
  cashback_access: 'Not applicable',
  priority_features_misc: 'Not applicable',
  objective_of_borrowing: 'Purchase of a second home for personal use',
  property_use: 'second_home',
  buyer_situation: 'first_time_buyer',
  property_value: 64,
  deposit_amount: 76,
  borrowing_amount: 62,
  deposit_source_and_docs:
    'Personal savings; 3 months bank statements provided',
  additional_funds: '5,000 for furnishings',
  stamp_duty_details: 'Calculated as per second home rates (indicative only)',
  high_risk_country_deposit_check: 'Not applicable',
  scheme_applicability: 'right_to_buy',
  loan_to_value_percent: 59,
  repayment_method: 'Capital & interest (repayment)',
  mortgage_term_preference: '25 years',
  shorter_term_consideration: 'Would consider 20 years if affordable',
  initial_rate_type_preference: '5‑year fixed preferred',
  erc_acceptance: 'Acceptable if aligned with fixed period',
  initial_rate_period_preference: '5 years',
  fee_payment_preference: 'Add arrangement fee to loan',
  special_considerations_or_limitations: 'None declared',
  attitude_to_mortgage_repayment:
    'Prefers payment certainty over the medium term',
  interest_only_repayment_plan: 'N/A (repayment mortgage)',
  payments_into_retirement: 'Not expected',
  debt_consolidation_details: 'No consolidation planned',
  new_mortgage_or_loan_details: 'Exploring mainstream high‑street lenders',
  property_characteristics:
    '2‑bed flat, leasehold, built ~2008, brick construction',
  maintain_mortgage_payments_plan:
    'Emergency fund covers 6 months; income protection considered',
  maintain_lifestyle_plan: 'Maintain emergency fund; review insurance annually',
  protection_needs: 'illness',
  smoker_status: 'Non‑smoker',
  health_issues: 'None disclosed',
  existing_owner: 'N/A',
  existing_provider: 'N/A',
  existing_term: 'N/A',
  existing_sum_assured: '0',
  existing_type: 'N/A',
  existing_purpose: 'N/A',
  existing_premium_frequency: 'N/A',

  client1_replace_policy_happy: 'no',
  client1_which_policies: 'N/A',
  client1_cancellation_impact: 'N/A',
  client1_topup_without_underwriting: 'no',
  client1_family_history_considerations:
    'No significant family medical history reported',

  client2_replace_policy_happy: 'no',
  client2_which_policies: 'N/A',
  client2_cancellation_impact: 'N/A',
  client2_topup_without_underwriting: 'no',
  client2_family_history_considerations:
    'No significant family medical history reported',

  client1_need_income_on_death: 'Not a priority; no dependents',
  client1_need_critical_illness: 'Yes, to protect income during illness',
  client1_need_income_on_illness_or_redundancy:
    'Yes, 12 months cover preferred',
  client1_need_pmi: 'Optional',
  client1_need_mortgage_debt_repayment: 'Not applicable at present',

  client2_need_income_on_death: 'Not a priority; no dependents',
  client2_need_critical_illness: 'Yes, to protect income during illness',
  client2_need_income_on_illness_or_redundancy:
    'Yes, 12 months cover preferred',
  client2_need_pmi: 'Optional',
  client2_need_mortgage_debt_repayment: 'Not applicable at present',

  beneficiaries: 'Sibling (Jane Morley, 100%)',
  trust_status_type: 'No trust currently in place',
  mortgage_overview:
    'Considering second‑home purchase with conservative LTV and fixed rate',
  protection_overview:
    'Priority on income protection and critical illness cover',
  reasons_lender_selection:
    'Service quality, fixed‑rate pricing, and product flexibility',
  mortgage_term_reason: 'Balance of affordability and total interest paid',
  mortgage_amount_reason: 'Aligned with deposit size and affordability checks',
  rate_type_reason: 'Prefers stability amid rate uncertainty',
  initial_rate_period_reason: '5 years fits medium‑term plans',
  case_notes:
    'Client prefers remote process; documentation provided electronically',
  confirmation_checks:
    'Fact find matches; due diligence complete; Consumer Duty evidenced',
  docs_id_scans: 'https://files.example.com/JGZLMA5UOFWB0HPM/docs/id_scans.pdf',
  docs_bank_statements:
    'https://files.example.com/JGZLMA5UOFWB0HPM/docs/bank_statements.pdf',
  docs_debt_statements:
    'https://files.example.com/JGZLMA5UOFWB0HPM/docs/debt_statements.pdf',
  docs_income_proof:
    'https://files.example.com/JGZLMA5UOFWB0HPM/docs/income_proof.pdf',
  docs_lender_docs:
    'https://files.example.com/JGZLMA5UOFWB0HPM/docs/lender_documents.pdf',
  docs_gdpr_notice:
    'https://files.example.com/JGZLMA5UOFWB0HPM/docs/gdpr_notice.pdf',
  docs_agreements:
    'https://files.example.com/JGZLMA5UOFWB0HPM/docs/agreements.pdf',
  docs_protection_declaration:
    'https://files.example.com/JGZLMA5UOFWB0HPM/docs/protection_declaration.pdf',
  docs_budget_planner:
    'https://files.example.com/JGZLMA5UOFWB0HPM/docs/budget_planner.pdf',
  id: 'JGZLMA5UOFWB0HPM'
};

const fillMissingFields = (record: ClientDetail): ClientDetail => {
  // Small helpers
  const randomDate = (start: Date, end: Date) =>
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
      .toISOString()
      .split('T')[0];

  const surnamesToNationality: Record<string, string> = {
    Kaur: 'Indian',
    Ali: 'Pakistani',
    Smith: 'British',
    Lopez: 'Spanish',
    Rossi: 'Italian',
    Chen: 'Chinese'
  };

  const client1_surname = record.client1_surname || 'Smith';
  const client1_nationality =
    surnamesToNationality[client1_surname] || 'British';

  const client2_surname = record.client1_surname || 'Smith';
  const client2_nationality =
    surnamesToNationality[client2_surname] || 'British';

  return {
    ...record,

    // Fill client agreement fields
    client_agreement_given_date:
      record.client_agreement_given_date ||
      randomDate(new Date(2024, 0, 1), new Date(2025, 0, 1)),
    client_agreement_signed_date:
      record.client_agreement_signed_date ||
      randomDate(new Date(2024, 0, 1), new Date(2025, 5, 1)),
    client_agreement_reference_number:
      record.client_agreement_reference_number ||
      `AGR-${Math.floor(100000 + Math.random() * 900000)}`,

    // Meeting
    client_meeting_date:
      record.client_meeting_date ||
      randomDate(new Date(2024, 6, 1), new Date(2025, 0, 1)),

    // IDs
    client1_national_insurance_number:
      record.client1_national_insurance_number ||
      `AB${Math.floor(100000 + Math.random() * 900000)}C`,
    client1_passport_number:
      record.client1_passport_number ||
      `P${Math.floor(1000000 + Math.random() * 9000000)}`,
    client1_driving_licence_number:
      record.client1_driving_licence_number ||
      `DL-${Math.floor(10000 + Math.random() * 90000)}`,

    client2_national_insurance_number:
      record.client2_national_insurance_number ||
      `AB${Math.floor(100000 + Math.random() * 900000)}C`,
    client2_passport_number:
      record.client2_passport_number ||
      `P${Math.floor(1000000 + Math.random() * 9000000)}`,
    client2_driving_licence_number:
      record.client2_driving_licence_number ||
      `DL-${Math.floor(10000 + Math.random() * 90000)}`,

    // Country / nationality
    client1_nationality: record.client1_nationality || client1_nationality,
    client1_country_of_residence:
      record.client1_country_of_residence || 'United Kingdom',
    client1_country_of_domicile:
      record.client1_country_of_domicile || 'United Kingdom',

    client2_nationality: record.client2_nationality || client2_nationality,
    client2_country_of_residence:
      record.client2_country_of_residence || 'United Kingdom',
    client2_country_of_domicile:
      record.client2_country_of_domicile || 'United Kingdom',

    // Contact
    client1_home_address:
      record.client1_home_address ||
      `${Math.floor(Math.random() * 200) + 1} ${client2_surname} Street, London`,
    client1_telephone_numbers:
      record.client1_telephone_numbers ||
      `+44 7${Math.floor(100000000 + Math.random() * 899999999)}`,
    client1_email_address:
      record.client1_email_address ||
      `${client2_surname.toLowerCase()}@example.com`,
    // `${record.client1_forenames.toLowerCase()}.${client2_surname.toLowerCase()}@example.com`,

    client2_home_address:
      record.client2_home_address ||
      `${Math.floor(Math.random() * 200) + 1} ${client2_surname} Street, London`,
    client2_telephone_numbers:
      record.client2_telephone_numbers ||
      `+44 7${Math.floor(100000000 + Math.random() * 899999999)}`,
    client2_email_address:
      record.client2_email_address ||
      `${client2_surname.toLowerCase()}@example.com`,
    // `${record.client2_forenames.toLowerCase()}.${client2_surname.toLowerCase()}@example.com`,

    // Employment
    occupation: record.occupation || 'Software Engineer',
    business_name: record.business_name || `${client2_surname} Consulting Ltd`,
    employment_start_date:
      record.employment_start_date ||
      randomDate(new Date(2015, 0, 1), new Date(2022, 0, 1)),

    // Financial
    net_monthly_income:
      record.net_monthly_income || (record.gross_income_annual / 12).toFixed(0),
    total_monthly_outgoings:
      record.total_monthly_outgoings ||
      `${Math.floor(800 + Math.random() * 1200)}`,
    disposable_income:
      record.disposable_income ||
      `${Math.floor(Number(record.net_monthly_income) - (800 + Math.random() * 800))}`,

    // Docs
    docs_id_scans: record.docs_id_scans || 'provided',
    docs_bank_statements: record.docs_bank_statements || 'provided',
    docs_income_proof: record.docs_income_proof || 'provided'
  };
};
// Build an object with defaults/randoms for every field in FORM_DATA
const buildAutoDataFromForm = (formData: any[]): Record<string, any> => {
  const out: Record<string, any> = {};

  formData.forEach((item: any) => {
    // If an item has no sections, treat its own fields as a single section
    const sections =
      Array.isArray(item.sections) && item.sections.length
        ? item.sections
        : [{ fields: item.fields ?? [] }];

    sections.forEach((section: any) => {
      const fields = Array.isArray(section?.fields) ? section.fields : [];
      fields.forEach((field: any) => {
        switch (field.input_type) {
          case 'input_number': {
            // Use min/max if present; else 50–89
            const min = typeof field.min === 'number' ? field.min : 50;
            const max = typeof field.max === 'number' ? field.max : 90;
            out[field.name] = Math.floor(min + Math.random() * (max - min));
            break;
          }

          case 'input_dropdown': {
            const opts = Array.isArray(field.options) ? field.options : [];
            if (opts.length > 0) {
              const i = Math.floor(Math.random() * opts.length);
              const opt = opts[i];
              out[field.name] = typeof opt === 'object' ? opt.value : opt;
            } else {
              out[field.name] = '';
            }
            break;
          }

          case 'input_checklist': {
            const vals = Array.isArray(field.value) ? field.value : [];
            if (vals.length > 0) {
              // pick 1–N random unique options
              const count = Math.max(
                1,
                Math.floor(Math.random() * vals.length)
              );
              const shuffled = [...vals].sort(() => Math.random() - 0.5);
              const picked = shuffled
                .slice(0, count)
                .map((v: any) => v?.value ?? v);
              out[field.name] = picked;
            } else {
              out[field.name] = [];
            }
            break;
          }

          case 'input_radio': {
            const vals = Array.isArray(field.value) ? field.value : [];
            if (vals.length > 0) {
              const i = Math.floor(Math.random() * vals.length);
              const v = vals[i];
              out[field.name] = typeof v === 'object' ? v.value : v;
            } else {
              out[field.name] = '';
            }
            break;
          }

          case 'file': {
            out[field.name] = null;
            break;
          }

          default: {
            // text/textarea/etc.
            out[field.name] = field.value ?? '';
            break;
          }
        }
      });
    });
  });

  return out;
};

const isEmptyValue = (v: unknown) =>
  v === null ||
  v === undefined ||
  (typeof v === 'string' && v.trim() === '') ||
  (Array.isArray(v) && v.length === 0);

// ---- Your existing code rewritten safely ----
export const MOCK_CLIENTS_DETAIL: ClientDetail[] = MOCK_CLIENTS.map(
  (client) => {
    // 1) generate data for all fields present in FORM_DATA
    let data: any = buildAutoDataFromForm(FORM_DATA);

    // 2) overlay the specific client record
    data = { ...data, ...client };

    // 3) fill any remaining holes with inferred/realistic values
    data = fillMissingFields(data);

    type CD = ClientDetail;
    type CDKey = keyof CD;

    const isEmptyValue = (v: unknown) =>
      v === null ||
      v === undefined ||
      (typeof v === 'string' && v.trim() === '') ||
      (Array.isArray(v) && v.length === 0);

    // Strongly typed conditional assign
    function assignIfEmpty<K extends CDKey>(
      obj: Partial<CD>,
      key: K,
      value: CD[K]
    ) {
      if (isEmptyValue(obj[key])) obj[key] = value;
    }

    // ...

    // Final backfill from DUMMY_DATA for anything still empty
    (Object.keys(DUMMY_DATA) as CDKey[]).forEach((k) => {
      assignIfEmpty(data, k, DUMMY_DATA[k]);
    });

    return data as ClientDetail;
  }
);

console.log(
  'MOCK_CLIENTS_DETAIL:',
  MOCK_CLIENTS_DETAIL.length,
  MOCK_CLIENTS_DETAIL[0]
);
