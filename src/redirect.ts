import { env } from './env.js';

const mainUrl: string = env('MAIN_URL');
const utmSource: string = env('UTM_SOURCE', 'jadwallari');
const utmMedium: string = env('UTM_MEDIUM', 'referral');

export function redirectSchedule(slug: string): string {
  const url = new URL(`${mainUrl}/event/${slug}`)

  if (!url.searchParams.has('utm_source')) {
    url.searchParams.set('utm_source', utmSource);
  }

  return url.toString();
}

export function redirectToOfficial(
  externalUrl: string,
  slug: string,
): string {
  const url = new URL(externalUrl);

  if (!url.searchParams.has('utm_source')) {
    url.searchParams.set('utm_source', utmSource);
  }

  if (!url.searchParams.has('utm_medium')) {
    url.searchParams.set('utm_medium', utmMedium);
  }

  if (!url.searchParams.has('utm_campaign')) {
    url.searchParams.set('utm_campaign', slug);
  }

  return url.toString();
}
