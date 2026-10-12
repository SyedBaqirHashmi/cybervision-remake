export const interests = ['AI & automation', 'Software & cloud', 'IoT & connected systems', 'Training & EdTech', 'Startup support'] as const;
export type Interest = typeof interests[number];
export type Inquiry = {
  kind: 'consultation' | 'newsletter';
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  consent: boolean;
  website: string;
  requestId: string;
};
export type FieldErrors = Partial<Record<keyof Inquiry, string>>;
export const emptyInquiry: Inquiry = {
  kind: 'consultation',
  name: '',
  email: '',
  company: '',
  interest: '',
  message: '',
  consent: false,
  website: '',
  requestId: ''
};
export function validateInquiry(input: unknown): {
  data?: Inquiry;
  errors: FieldErrors;
} {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {
    errors: {
      message: 'Invalid request.'
    }
  };
  const raw = input as Record<string, unknown>;
  const string = (key: string) => typeof raw[key] === 'string' ? (raw[key] as string).trim() : '';
  const data: Inquiry = {
    kind: raw.kind === 'newsletter' ? 'newsletter' : 'consultation',
    name: string('name'),
    email: string('email'),
    company: string('company'),
    interest: string('interest'),
    message: string('message'),
    consent: raw.consent === true,
    website: string('website'),
    requestId: string('requestId')
  };
  const errors: FieldErrors = {};
  if (raw.kind !== 'consultation' && raw.kind !== 'newsletter') errors.kind = 'Choose a supported request type.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254 || /[\r\n]/.test(data.email)) errors.email = 'Enter a valid email address.';
  if (data.kind === 'consultation') {
    if (data.name.length < 2 || data.name.length > 100) errors.name = 'Enter your name (2–100 characters).';
    if (!interests.includes(data.interest as Interest)) errors.interest = 'Choose an area of interest.';
    if (data.message.length < 20 || data.message.length > 3000) errors.message = 'Describe your project in 20–3,000 characters.';
  }
  if (data.company.length > 150) errors.company = 'Use 150 characters or fewer.';
  if (!data.consent) errors.consent = 'Please consent so we can respond to your request.';
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(data.requestId)) errors.requestId = 'Refresh the page and try again.';
  return {
    data: Object.keys(errors).length ? undefined : data,
    errors
  };
}
export function stepErrors(data: Inquiry, step: number): FieldErrors {
  const errors = validateInquiry({
    ...data,
    requestId: '00000000-0000-4000-8000-000000000000'
  }).errors;
  const keys: (keyof Inquiry)[] = step === 0 ? ['interest', 'message'] : step === 1 ? ['name', 'email', 'company'] : ['consent'];
  return Object.fromEntries(Object.entries(errors).filter(([key]) => keys.includes(key as keyof Inquiry)));
}
