import type { IndustryKey, PlanInterval } from '../config/siteConfig';

export interface AttributionContext {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ref?: string;
  referrer?: string;
  landing_path?: string;
  first_seen_at?: string;
}

export type AnalyticsEventName =
  | 'page_view'
  | 'industry_page_visit'
  | 'demo_interaction'
  | 'cta_click'
  | 'pricing_selection'
  | 'checkout_click';

export interface AnalyticsEventPayload {
  event: AnalyticsEventName;
  timestamp: string;
  path: string;
  attribution: AttributionContext;
  properties?: Record<string, string | number | boolean | undefined>;
}

const ATTRIBUTION_STORAGE_KEY = 'forgevox_attribution_v1';
const EVENTS_STORAGE_KEY = 'forgevox_events_v1';

export function parseAttributionFromSearch(
  searchString: string,
  referrer = '',
  pathname = '/'
): AttributionContext {
  const params = new URLSearchParams(searchString);
  const context: AttributionContext = {
    landing_path: pathname,
    first_seen_at: new Date().toISOString(),
  };

  const utmKeys: Array<keyof AttributionContext> = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'ref',
  ];

  utmKeys.forEach((key) => {
    const val = params.get(key);
    if (val && val.trim() !== '') {
      context[key] = val.trim();
    }
  });

  if (referrer && referrer.trim() !== '') {
    context.referrer = referrer.trim();
  }

  return context;
}

export function getOrCaptureAttribution(): AttributionContext {
  if (typeof window === 'undefined') {
    return { landing_path: '/' };
  }

  try {
    const existingRaw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const currentParsed = parseAttributionFromSearch(
      window.location.search,
      document.referrer,
      window.location.pathname
    );

    if (existingRaw) {
      const existing = JSON.parse(existingRaw) as AttributionContext;
      const merged: AttributionContext = {
        ...existing,
        ...(currentParsed.utm_source ? { utm_source: currentParsed.utm_source } : {}),
        ...(currentParsed.utm_medium ? { utm_medium: currentParsed.utm_medium } : {}),
        ...(currentParsed.utm_campaign ? { utm_campaign: currentParsed.utm_campaign } : {}),
        ...(currentParsed.utm_term ? { utm_term: currentParsed.utm_term } : {}),
        ...(currentParsed.utm_content ? { utm_content: currentParsed.utm_content } : {}),
        ...(currentParsed.ref ? { ref: currentParsed.ref } : {}),
      };
      window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }

    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(currentParsed));
    return currentParsed;
  } catch {
    return { landing_path: window.location.pathname };
  }
}

export function getAttributionQueryRecord(ctx?: AttributionContext): Record<string, string> {
  const source = ctx || getOrCaptureAttribution();
  const out: Record<string, string> = {};
  if (source.utm_source) out.utm_source = source.utm_source;
  if (source.utm_medium) out.utm_medium = source.utm_medium;
  if (source.utm_campaign) out.utm_campaign = source.utm_campaign;
  if (source.utm_term) out.utm_term = source.utm_term;
  if (source.utm_content) out.utm_content = source.utm_content;
  if (source.ref) out.ref = source.ref;
  return out;
}

export function trackEvent(
  event: AnalyticsEventName,
  properties?: Record<string, string | number | boolean | undefined>
): AnalyticsEventPayload {
  const attribution = getOrCaptureAttribution();
  const payload: AnalyticsEventPayload = {
    event,
    timestamp: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    attribution,
    properties,
  };

  if (typeof window !== 'undefined') {
    try {
      const existingRaw = window.sessionStorage.getItem(EVENTS_STORAGE_KEY);
      const history: AnalyticsEventPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
      history.push(payload);
      window.sessionStorage.setItem(
        EVENTS_STORAGE_KEY,
        JSON.stringify(history.slice(-100))
      );

      // Dispatch custom DOM event for external analytics listeners (GA4, PostHog, Plausible, etc.)
      window.dispatchEvent(new CustomEvent('forgevox:analytics', { detail: payload }));
    } catch {
      // Ignore storage quota errors
    }
  }

  return payload;
}

export const analytics = {
  trackPageView: (path: string) => trackEvent('page_view', { path }),
  trackIndustryVisit: (industry: IndustryKey) =>
    trackEvent('industry_page_visit', { industry }),
  trackDemoInteraction: (
    industry: IndustryKey,
    action: 'switch_industry' | 'switch_viewport' | 'open_fullscreen' | 'open_new_tab',
    detail?: string
  ) => trackEvent('demo_interaction', { industry, action, detail }),
  trackCtaClick: (label: string, location: string, destination?: string) =>
    trackEvent('cta_click', { label, location, destination }),
  trackPricingSelection: (plan: PlanInterval, industry?: IndustryKey | 'all') =>
    trackEvent('pricing_selection', { plan, industry: industry || 'all' }),
  trackCheckoutClick: (plan: PlanInterval, industry?: IndustryKey | 'all', url?: string) =>
    trackEvent('checkout_click', { plan, industry: industry || 'all', url }),
};
