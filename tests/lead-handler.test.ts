import test from 'node:test';
import assert from 'node:assert/strict';
import { handleLead, type Fetcher } from '../lib/lead-handler.ts';
import { emptyInquiry } from '../lib/inquiry.ts';
const env = {
  NEXT_PUBLIC_SITE_URL: 'https://cv.example',
  RESEND_API_KEY: 'unit-test-key',
  MAIL_FROM: 'Website <site@cv.example>',
  CONTACT_TO: 'contact@cv.example',
  UPSTASH_REDIS_REST_URL: 'https://redis.example',
  UPSTASH_REDIS_REST_TOKEN: 'unit-test-token',
  RATE_LIMIT_SALT: 'unit-test-salt',
  TRUSTED_IP_HEADER: 'x-trusted-ip'
};
const valid = {
  ...emptyInquiry,
  name: 'Ayesha Khan',
  email: 'ayesha@example.com',
  interest: 'Software & cloud',
  message: 'We need an accessible web platform for our organisation.',
  consent: true,
  requestId: 'a61aa377-475a-48b0-b3e0-347bb1e2a8f5'
};
function request(body: unknown = valid, origin = 'https://cv.example') {
  return new Request('https://cv.example/api/inquiries', {
    method: 'POST',
    headers: {
      origin,
      'content-type': 'application/json',
      'x-trusted-ip': '192.0.2.1'
    },
    body: JSON.stringify(body)
  });
}
const noNetwork: Fetcher = async () => {
  throw new Error('Unexpected network call');
};
test('blocks cross-origin requests before network access', async () => assert.equal((await handleLead(request(valid, 'https://attacker.example'), env, noNetwork)).status, 403));
test('returns clear validation errors without sending mail', async () => {
  const response = await handleLead(request({
    ...valid,
    email: 'invalid'
  }), env, noNetwork);
  assert.equal(response.status, 422);
  assert.ok((await response.json()).errors.email);
});
test('fails closed when delivery credentials or rate limiting are unconfigured', async () => {
  assert.equal((await handleLead(request(), {
    NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL
  }, noNetwork)).status, 503);
});
test('rejects honeypot submissions', async () => assert.equal((await handleLead(request({
  ...valid,
  website: 'spam'
}), env, noNetwork)).status, 400));
test('rejects oversized JSON bodies', async () => assert.equal((await handleLead(request({
  ...valid,
  message: 'a'.repeat(17000)
}), env, noNetwork)).status, 413));
test('handles malformed JSON', async () => {
  const req = new Request('https://cv.example/api/inquiries', {
    method: 'POST',
    headers: {
      origin: env.NEXT_PUBLIC_SITE_URL,
      'content-type': 'application/json'
    },
    body: '{'
  });
  assert.equal((await handleLead(req, env, noNetwork)).status, 400);
});
test('rejects unsupported content type', async () => {
  const req = new Request('https://cv.example/api/inquiries', {
    method: 'POST',
    headers: {
      origin: env.NEXT_PUBLIC_SITE_URL
    },
    body: 'data'
  });
  assert.equal((await handleLead(req, env, noNetwork)).status, 415);
});
test('rate limit blocks sending and provides retry timing', async () => {
  let calls = 0;
  const mock: Fetcher = async () => {
    calls++;
    return Response.json({
      result: 6
    });
  };
  const response = await handleLead(request(), env, mock);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '900');
  assert.equal(calls, 1);
});
test('sends plain text with reply-to and a stable idempotency key', async () => {
  const calls: {
    url: string;
    init?: RequestInit;
  }[] = [];
  const mock: Fetcher = async (url, init) => {
    calls.push({
      url,
      init
    });
    return url.includes('redis') ? Response.json({
      result: 1
    }) : Response.json({
      id: 'email-id'
    });
  };
  const response = await handleLead(request(), env, mock);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, 'https://api.resend.com/emails');
  const mail = JSON.parse(String(calls[1].init?.body));
  assert.equal(mail.reply_to, valid.email);
  assert.equal(mail.html, undefined);
  assert.ok(mail.text.includes(valid.message));
  const key = (calls[1].init?.headers as Record<string, string>)['Idempotency-Key'];
  await handleLead(request(), env, mock);
  assert.equal((calls[3].init?.headers as Record<string, string>)['Idempotency-Key'], key);
  assert.ok(!String(calls[0].init?.body).includes('192.0.2.1'));
});
test('delivery failure never returns success', async () => {
  const mock: Fetcher = async url => url.includes('redis') ? Response.json({
    result: 1
  }) : Response.json({
    error: 'down'
  }, {
    status: 500
  });
  assert.equal((await handleLead(request(), env, mock)).status, 503);
});
test('invalid rate-limit response fails closed', async () => {
  assert.equal((await handleLead(request(), env, async () => Response.json({
    error: 'redis failed'
  }))).status, 503);
});
test('provider acceptance must contain an email ID', async () => {
  const mock: Fetcher = async url => url.includes('redis') ? Response.json({
    result: 1
  }) : Response.json({});
  assert.equal((await handleLead(request(), env, mock)).status, 503);
});
test('newsletter email describes a request, not a completed subscription', async () => {
  let mail = '';
  const mock: Fetcher = async (url, init) => {
    if (url.includes('redis')) return Response.json({
      result: 1
    });
    mail = String(init?.body);
    return Response.json({
      id: 'email-id'
    });
  };
  const response = await handleLead(request({
    ...valid,
    kind: 'newsletter'
  }), env, mock);
  assert.equal(response.status, 200);
  assert.match(mail, /confirm the subscription/);
});
