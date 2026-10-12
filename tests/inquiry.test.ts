import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyInquiry, stepErrors, validateInquiry } from '../lib/inquiry.ts';
const valid = {
  ...emptyInquiry,
  kind: 'consultation',
  name: 'Ayesha Khan',
  email: 'ayesha@example.com',
  interest: 'AI & automation',
  message: 'We want to improve our operations with a custom workflow.',
  consent: true,
  requestId: 'a61aa377-475a-48b0-b3e0-347bb1e2a8f5'
};
test('accepts valid consultation and normalises whitespace', () => {
  const result = validateInquiry({
    ...valid,
    name: '  Ayesha Khan  '
  });
  assert.equal(result.data?.name, 'Ayesha Khan');
  assert.deepEqual(result.errors, {});
});
test('rejects empty, non-object and malformed data', () => {
  for (const value of [null, undefined, 'bad', [], {}, 42]) assert.ok(Object.keys(validateInquiry(value).errors).length);
});
test('rejects invalid email, missing consent, unsupported interest and short message', () => {
  const result = validateInquiry({
    ...valid,
    email: 'bad\r\n@example.com',
    consent: false,
    interest: 'unknown',
    message: 'short'
  });
  assert.ok(result.errors.email);
  assert.ok(result.errors.consent);
  assert.ok(result.errors.interest);
  assert.ok(result.errors.message);
  assert.equal(result.data, undefined);
});
test('enforces message, name and organisation limits', () => {
  const result = validateInquiry({
    ...valid,
    name: 'a'.repeat(101),
    company: 'b'.repeat(151),
    message: 'c'.repeat(3001)
  });
  assert.ok(result.errors.name);
  assert.ok(result.errors.company);
  assert.ok(result.errors.message);
});
test('does not coerce truthy consent or malformed request IDs', () => {
  assert.ok(validateInquiry({
    ...valid,
    consent: 'true'
  }).errors.consent);
  assert.ok(validateInquiry({
    ...valid,
    requestId: 'bad'
  }).errors.requestId);
});
test('newsletter requires email and consent but no project fields', () => {
  assert.ok(validateInquiry({
    ...emptyInquiry,
    kind: 'newsletter',
    email: valid.email,
    consent: true,
    requestId: valid.requestId
  }).data);
});
test('step validation reports only fields visible at that step', () => {
  assert.deepEqual(Object.keys(stepErrors({
    ...emptyInquiry
  }, 0)).sort(), ['interest', 'message']);
  assert.deepEqual(Object.keys(stepErrors({
    ...emptyInquiry
  }, 1)).sort(), ['email', 'name']);
  assert.deepEqual(Object.keys(stepErrors({
    ...emptyInquiry
  }, 2)), ['consent']);
});
