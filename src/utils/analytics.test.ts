import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRICING_PLANS,
  WHOP_CHECKOUT_CONFIG,
  INDUSTRIES_CONFIG,
  getCheckoutDestination,
} from '../config/siteConfig';
import {
  parseAttributionFromSearch,
  getAttributionQueryRecord,
} from './analytics';

test('pricing plans match directive ($99/mo and $792/yr equivalent to $66/mo)', () => {
  assert.equal(PRICING_PLANS.monthly.priceDisplay, '$99');
  assert.equal(PRICING_PLANS.annual.priceDisplay, '$792');
  assert.ok(PRICING_PLANS.annual.effectiveMonthlyDisplay.includes('$66/month'));
});

test('industry configuration covers hvac, roofing, and electrical with local demo paths', () => {
  assert.equal(INDUSTRIES_CONFIG.hvac.route, '/hvac');
  assert.equal(INDUSTRIES_CONFIG.roofing.route, '/roofing');
  assert.equal(INDUSTRIES_CONFIG.electrical.route, '/electrical');

  assert.equal(
    INDUSTRIES_CONFIG.hvac.demoFilePath,
    '/assets/aistudio/template_hvac_f7bc4dbe.html?preview=false'
  );
  assert.equal(
    INDUSTRIES_CONFIG.roofing.demoFilePath,
    '/assets/aistudio/template_roofing_5fbe4646.html'
  );
  assert.equal(
    INDUSTRIES_CONFIG.electrical.demoFilePath,
    '/assets/aistudio/template_electrical_11d96a65.html'
  );
});

test('getCheckoutDestination appends plan, industry, and attribution parameters', () => {
  const urlStr = getCheckoutDestination('annual', 'roofing', {
    utm_source: 'google',
    utm_campaign: 'q4_roofers',
  });
  const parsed = new URL(urlStr);
  assert.ok(urlStr.startsWith(WHOP_CHECKOUT_CONFIG.annualCheckoutUrl));
  assert.equal(parsed.searchParams.get('plan'), 'annual');
  assert.equal(parsed.searchParams.get('industry'), 'roofing');
  assert.equal(parsed.searchParams.get('utm_source'), 'google');
  assert.equal(parsed.searchParams.get('utm_campaign'), 'q4_roofers');
});

test('parseAttributionFromSearch extracts UTM and referral parameters cleanly', () => {
  const ctx = parseAttributionFromSearch(
    '?utm_source=linkedin&utm_medium=paid&utm_campaign=hvac_launch&ref=partner1',
    'https://trygtm.com',
    '/hvac'
  );
  assert.equal(ctx.utm_source, 'linkedin');
  assert.equal(ctx.utm_medium, 'paid');
  assert.equal(ctx.utm_campaign, 'hvac_launch');
  assert.equal(ctx.ref, 'partner1');
  assert.equal(ctx.referrer, 'https://trygtm.com');
  assert.equal(ctx.landing_path, '/hvac');

  const queryRecord = getAttributionQueryRecord(ctx);
  assert.deepEqual(queryRecord, {
    utm_source: 'linkedin',
    utm_medium: 'paid',
    utm_campaign: 'hvac_launch',
    ref: 'partner1',
  });
});
