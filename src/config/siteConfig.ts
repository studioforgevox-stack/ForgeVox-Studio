export type IndustryKey = 'hvac' | 'roofing' | 'electrical';
export type PlanInterval = 'monthly' | 'annual';

export interface PricingPlanConfig {
  id: PlanInterval;
  name: string;
  priceDisplay: string;
  periodDisplay: string;
  effectiveMonthlyDisplay: string;
  billingNote: string;
  checkoutUrlPlaceholder: string;
  ctaLabel: string;
}

export interface IndustryConfig {
  key: IndustryKey;
  label: string;
  route: string;
  demoFilePath: string;
  demoBrandName: string;
  demoLocation: string;
  headline: string;
  subheadline: string;
  positioningCopy: string;
  demoHighlights: string[];
  deliverablesNote: string;
  faqs: Array<{ question: string; answer: string }>;
}

/**
 * Central Whop Checkout Configuration
 * Replace WHOP_CHECKOUT_URLS values with live Whop payment links when ready.
 */
export const WHOP_CHECKOUT_CONFIG = {
  isPlaceholderMode: true,
  monthlyCheckoutUrl: 'https://whop.com/checkout/PLACEHOLDER_FORGEVOX_MONTHLY_99',
  annualCheckoutUrl: 'https://whop.com/checkout/PLACEHOLDER_FORGEVOX_ANNUAL_792',
  onboardingNote: 'Payment → Onboarding Form → Website Development → Delivery within 48 hours of completed onboarding.',
  supportEmail: 'hello@forgevox.studio',
} as const;

export const PRICING_PLANS: Record<PlanInterval, PricingPlanConfig> = {
  monthly: {
    id: 'monthly',
    name: 'Monthly Plan',
    priceDisplay: '$99',
    periodDisplay: 'per month',
    effectiveMonthlyDisplay: '$99/month',
    billingNote: 'Billed monthly. Cancel or switch to annual billing at any time.',
    checkoutUrlPlaceholder: WHOP_CHECKOUT_CONFIG.monthlyCheckoutUrl,
    ctaLabel: 'Start on Monthly — $99/mo',
  },
  annual: {
    id: 'annual',
    name: 'Annual Plan',
    priceDisplay: '$792',
    periodDisplay: 'per year, billed upfront',
    effectiveMonthlyDisplay: 'Equivalent to $66/month',
    billingNote: 'Billed $792 upfront annually (saves $396 per year compared to monthly billing).',
    checkoutUrlPlaceholder: WHOP_CHECKOUT_CONFIG.annualCheckoutUrl,
    ctaLabel: 'Start on Annual — $792/yr',
  },
};

export const DELIVERABLES_LIST: Array<{ title: string; description: string }> = [
  {
    title: 'Industry-specific website architecture',
    description: 'Complete multi-section layout structured specifically for residential and commercial HVAC, Roofing, or Electrical service calls.',
  },
  {
    title: 'Custom brand adaptation',
    description: 'Tailored with your company name, logo, service area cities, phone numbers, license credentials, and core service offerings.',
  },
  {
    title: 'Mobile and desktop responsive build',
    description: 'Engineered for fast loading on smartphones, tablets, and desktop screens with tap-to-call actions and quote request forms.',
  },
  {
    title: 'Lead capture & dispatch routing',
    description: 'Built-in estimate request forms, service selection menus, and direct click-to-call triggers wired to your business contact details.',
  },
  {
    title: 'Hosting, SSL & technical setup',
    description: 'Managed hosting, SSL security certificate, and custom domain connection configured prior to launch.',
  },
  {
    title: '48-hour turnaround after onboarding',
    description: 'Your finished website is configured, reviewed, and delivered ready for live traffic within 48 hours of your completed onboarding form.',
  },
];

export const PURCHASE_WORKFLOW_STEPS = [
  {
    step: '01',
    phase: 'Select & Checkout',
    title: 'Choose your industry and plan',
    description: 'Select HVAC, Roofing, or Electrical and choose between the $99/month plan or the $792/year upfront annual plan ($66/month equivalent).',
  },
  {
    step: '02',
    phase: 'Submit Details',
    title: 'Complete payment and submit your onboarding form',
    description: 'Immediately after Whop checkout, complete a concise onboarding form with your company name, logo, phone number, license numbers, and service areas.',
  },
  {
    step: '03',
    phase: 'Launch in 48h',
    title: 'Receive your completed website within 48 hours',
    description: 'We configure your website, connect your domain and lead routing, and deliver your live production site within 48 hours of completed onboarding.',
  },
] as const;

export const HOMEPAGE_FAQS: Array<{ question: string; answer: string }> = [
  {
    question: 'How much does a Forgevox Studio website cost?',
    answer: 'We offer two straightforward plans: $99/month billed monthly, or $792/year billed upfront (which is equivalent to $66/month). There are no setup fees or hidden build charges.',
  },
  {
    question: 'What happens immediately after I complete my purchase?',
    answer: 'Payment is processed securely via Whop. Right after checkout, you are directed to our onboarding form where you submit your business name, phone number, logo, service areas, and services offered. Once your onboarding form is completed, we deliver your live website within 48 hours.',
  },
  {
    question: 'Will my website look like the live demonstrations on this page?',
    answer: 'Yes. The live HVAC, Roofing, and Electrical websites shown on this site are the actual foundations we use. We customize the branding, copy, cities, credentials, and contact forms to match your specific business.',
  },
  {
    question: 'What is included in the monthly or annual subscription?',
    answer: 'Your subscription includes the customized website build, mobile and desktop optimization, quote request forms, click-to-call actions, managed hosting, SSL security, and domain connection.',
  },
  {
    question: 'How does the 48-hour delivery timeline work?',
    answer: 'The 48-hour delivery window begins as soon as you submit your completed onboarding form with your business details. Within 48 hours, we send you the live, configured website ready to receive customer calls and quote requests.',
  },
  {
    question: 'Can I use my existing domain name?',
    answer: 'Yes. During onboarding, you can provide your existing domain name and we will guide you through pointing your DNS records to your new website, or help you configure a new domain.',
  },
];

export const INDUSTRIES_CONFIG: Record<IndustryKey, IndustryConfig> = {
  hvac: {
    key: 'hvac',
    label: 'HVAC',
    route: '/hvac',
    demoFilePath: '/assets/aistudio/template_hvac_f7bc4dbe.html?preview=false',
    demoBrandName: 'Goettl Air Conditioning & Plumbing (Demo)',
    demoLocation: 'Austin, TX',
    headline: 'Professional websites for HVAC businesses, delivered in 48 hours.',
    subheadline: 'Built for air conditioning, heating, and mechanical contractors who want a clean, high-converting website without agency retainers or multi-month delays.',
    positioningCopy: 'Homeowners searching for emergency AC repair or system replacement decide who to call in seconds. Our HVAC website package gives your business a structured, mobile-ready presence featuring 24/7 dispatch calls-to-action, seasonal offer coupons, service department tabs, maintenance plan comparisons, and an interactive monthly financing estimator.',
    demoHighlights: [
      '24/7 emergency dispatch utility header and sticky mobile call bar',
      'Interactive 4-pillar service matrix (Air Conditioning, Heating, Plumbing, Clean Water)',
      'Filterable seasonal promo coupons with direct claim modal',
      'Interactive monthly equipment financing payment estimator',
      'Maintenance membership comparison table and service area pills',
    ],
    deliverablesNote: 'Customized with your HVAC company name, state license numbers, service cities, seasonal offers, and dispatch phone number.',
    faqs: [
      {
        question: 'Can we customize the seasonal coupons and offers on the HVAC website?',
        answer: 'Yes. During onboarding, you provide the tune-up specials, repair discounts, or system rebates you want displayed, and we configure them directly into the coupon grid.',
      },
      {
        question: 'What if we only offer HVAC and not plumbing?',
        answer: 'We adapt the service navigation and department tabs to match your exact service mix—such as AC Repair, AC Installation, Heating & Furnaces, and Indoor Air Quality.',
      },
      {
        question: 'How much does the HVAC website cost and when is it delivered?',
        answer: 'Choose between $99/month or $792/year billed upfront ($66/month equivalent). Your customized HVAC website is delivered within 48 hours of completing your onboarding form.',
      },
    ],
  },
  roofing: {
    key: 'roofing',
    label: 'Roofing',
    route: '/roofing',
    demoFilePath: '/assets/aistudio/template_roofing_5fbe4646.html',
    demoBrandName: 'Houston Roofing & Construction (Demo)',
    demoLocation: 'Houston, TX',
    headline: 'Professional websites for roofing contractors, delivered in 48 hours.',
    subheadline: 'Purpose-built for residential and commercial roofers who need an authoritative website that captures inspection requests and storm restoration leads.',
    positioningCopy: 'Property owners comparing roofing contractors look for licensing credentials, manufacturer certifications, clear inspection processes, and straightforward warranty explanations. Our Roofing website package pairs an immediate above-the-fold inspection booking form with dedicated sections for residential replacement, storm repairs, commercial roofing, and local service areas.',
    demoHighlights: [
      'Split hero layout with embedded Free Inspection & Estimate request form',
      'Manufacturer certification & licensing strip (GAF, Owens Corning, CertainTeed, BBB)',
      'Architectural service breakdown for Residential, Commercial, Multi-Family, and Siding',
      '3-step roof inspection workflow and Warranty Expectations vs. Reality table',
      'Metropolitan service area matrix and sticky mobile call/quote bar',
    ],
    deliverablesNote: 'Customized with your roofing company name, contractor license, manufacturer certifications, service cities, and inspection contact details.',
    faqs: [
      {
        question: 'Can you display our specific roofing manufacturer certifications?',
        answer: 'Yes. In the onboarding form, simply select or list your certifications (such as GAF, Owens Corning, CertainTeed, IKO, or state roofing association memberships) and we configure the trust strip accordingly.',
      },
      {
        question: 'Can we adjust the services if we only focus on residential roofing?',
        answer: 'Yes. We tailor the service cards to match your exact offerings, such as Asphalt Shingle Replacement, Metal Roofing, Storm & Hail Damage Repair, and Gutters/Siding.',
      },
      {
        question: 'How much does the Roofing website cost and how fast is delivery?',
        answer: 'It is $99/month or $792/year billed upfront ($66/month equivalent). Once you complete payment and submit your onboarding form, your website is delivered within 48 hours.',
      },
    ],
  },
  electrical: {
    key: 'electrical',
    label: 'Electrical',
    route: '/electrical',
    demoFilePath: '/assets/aistudio/template_electrical_11d96a65.html',
    demoBrandName: 'Apex Electrical Services (Demo)',
    demoLocation: 'Regional Metro',
    headline: 'Professional websites for electrical contractors, delivered in 48 hours.',
    subheadline: 'Designed for licensed residential and commercial electricians who want a dependable, conversion-ready website that turns local searches into booked jobs.',
    positioningCopy: 'From 200A panel upgrades and EV charger installations to 24/7 emergency troubleshooting, homeowners hire electricians who project safety, licensure, and responsiveness. Our Electrical website package highlights your core electrical services, home upgrade capabilities, licensing guarantees, and an immediate fast-estimate booking form.',
    demoHighlights: [
      '24/7 emergency electrical service utility bar and click-to-call dispatch header',
      'Hero section with embedded Fast Estimate lead capture form and service selector',
      'Dedicated service grid for 200A Panel Upgrades, EV Chargers, Generators, and Lighting',
      'Home amenities showcase for Spa/Hot Tub wiring, Exhaust Fans, and Smart Security',
      'Accordion FAQ section and responsive mobile navigation drawer',
    ],
    deliverablesNote: 'Customized with your electrical company name, master electrician license details, service area coverage, and dispatch phone number.',
    faqs: [
      {
        question: 'Can we customize the electrical services listed on the form and service grid?',
        answer: 'Yes. During onboarding, you specify which services you want highlighted—whether that is panel upgrades, EV chargers, standby generators, commercial wiring, or service calls.',
      },
      {
        question: 'Where do the estimate form submissions go?',
        answer: 'We configure the estimate request form and call buttons with your business email and dispatch phone number so inquiries reach your team directly.',
      },
      {
        question: 'What is the pricing and turnaround time?',
        answer: 'Pricing is $99/month or $792/year billed upfront ($66/month equivalent). Your completed electrical website is delivered within 48 hours of submitting your onboarding form.',
      },
    ],
  },
};

export function getCheckoutDestination(
  plan: PlanInterval,
  industry?: IndustryKey,
  attributionParams?: Record<string, string>
): string {
  const base = plan === 'annual'
    ? WHOP_CHECKOUT_CONFIG.annualCheckoutUrl
    : WHOP_CHECKOUT_CONFIG.monthlyCheckoutUrl;

  const url = new URL(base);
  url.searchParams.set('plan', plan);
  if (industry) {
    url.searchParams.set('industry', industry);
  }
  if (attributionParams) {
    Object.entries(attributionParams).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
  }
  return url.toString();
}
