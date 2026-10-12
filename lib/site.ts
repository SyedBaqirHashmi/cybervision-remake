export function siteOrigin() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
