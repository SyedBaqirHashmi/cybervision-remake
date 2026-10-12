import { createHash } from 'node:crypto';
import { validateInquiry } from './inquiry.ts';
export type LeadEnvironment = Record<string, string | undefined>;
export type Fetcher = (url: string, init?: RequestInit) => Promise<Response>;
const json = (body: unknown, status = 200, headers: Record<string, string> = {}) => Response.json(body, {
  status,
  headers: {
    'Cache-Control': 'no-store',
    ...headers
  }
});
const unavailable = () => json({
  error: 'Online delivery is temporarily unavailable. Please email info@cybervision.com.pk or call +92 51 230 4878.'
}, 503);
const incrementScript = "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return n";
async function readBody(request: Request): Promise<string> {
  const max = 16384;
  if (Number(request.headers.get('content-length') || 0) > max) throw new RangeError('Request too large');
  if (!request.body) return '';
  const reader = request.body.getReader();
  const parts: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const {
        value,
        done
      } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > max) {
        await reader.cancel();
        throw new RangeError('Request too large');
      }
      parts.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const all = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    all.set(part, offset);
    offset += part.length;
  }
  return new TextDecoder().decode(all);
}
export async function handleLead(request: Request, env: LeadEnvironment = process.env, fetcher: Fetcher = fetch): Promise<Response> {
  if (request.method !== 'POST') return json({
    error: 'Use POST.'
  }, 405, {
    Allow: 'POST'
  });
  let origin: string;
  try {
    origin = new URL(env.NEXT_PUBLIC_SITE_URL || '').origin;
  } catch {
    return unavailable();
  }
  if (request.headers.get('origin') !== origin) return json({
    error: 'This request must come from the website.'
  }, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json({
    error: 'Use a JSON request.'
  }, 415);
  let input: unknown;
  try {
    input = JSON.parse(await readBody(request));
  } catch (error) {
    return json({
      error: error instanceof RangeError ? 'Your request is too large.' : 'The request could not be read.'
    }, error instanceof RangeError ? 413 : 400);
  }
  const result = validateInquiry(input);
  if (!result.data) return json({
    error: 'Please check the highlighted fields.',
    errors: result.errors
  }, 422);
  const data = result.data;
  if (data.website) return json({
    error: 'The request could not be accepted.'
  }, 400);
  const {
    RESEND_API_KEY,
    MAIL_FROM,
    CONTACT_TO,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
    RATE_LIMIT_SALT
  } = env;
  if (!RESEND_API_KEY || !MAIL_FROM || !CONTACT_TO || !UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN || !RATE_LIMIT_SALT) return unavailable();
  let redisUrl: URL;
  try {
    redisUrl = new URL(UPSTASH_REDIS_REST_URL);
    if (redisUrl.protocol !== 'https:') return unavailable();
  } catch {
    return unavailable();
  }
  const address = env.TRUSTED_IP_HEADER ? request.headers.get(env.TRUSTED_IP_HEADER)?.split(',')[0]?.trim() : undefined;
  const key = createHash('sha256').update(`${RATE_LIMIT_SALT}:${address || 'shared'}:${data.kind}`).digest('hex');
  try {
    const rate = await fetcher(redisUrl.href, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['EVAL', incrementScript, '1', `cybervision:leads:${key}`, '900']),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store'
    });
    if (!rate.ok) return unavailable();
    const counter = (await rate.json()) as {
      result?: unknown;
      error?: unknown;
    };
    if (counter.error || typeof counter.result !== 'number' || !Number.isFinite(counter.result) || counter.result < 1) return unavailable();
    if (counter.result > (data.kind === 'newsletter' ? 3 : 5)) return json({
      error: 'You have made several requests. Please try again in 15 minutes or contact us directly.'
    }, 429, {
      'Retry-After': '900'
    });
    const isNewsletter = data.kind === 'newsletter';
    const text = isNewsletter ? `Newsletter subscription request\n\nEmail: ${data.email}\nConsent: affirmative\n\nPlease confirm the subscription with this person before adding them to your mailing list.` : `New consultation enquiry\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'Not provided'}\nInterest: ${data.interest}\n\nProject:\n${data.message}\n\nConsent to respond: affirmative`;
    const fingerprint = createHash('sha256').update(JSON.stringify({
      kind: data.kind,
      name: data.name,
      email: data.email,
      company: data.company,
      interest: data.interest,
      message: data.message
    })).digest('hex').slice(0, 24);
    const sent = await fetcher('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `cv-${data.requestId}-${fingerprint}`
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [CONTACT_TO],
        reply_to: data.email,
        subject: isNewsletter ? 'CyberVision newsletter subscription request' : `CyberVision consultation: ${data.interest}`,
        text
      }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store'
    });
    if (!sent.ok) return unavailable();
    const delivery = (await sent.json()) as {
      id?: unknown;
    };
    if (typeof delivery.id !== 'string' || !delivery.id) return unavailable();
    return json({
      ok: true,
      message: isNewsletter ? 'Your subscription request is on its way. Subscription confirmation is handled by the CyberVision team.' : 'Your enquiry is on its way to CyberVision. Thank you for sharing your vision.'
    });
  } catch {
    return unavailable();
  }
}
