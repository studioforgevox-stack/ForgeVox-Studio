import React, { useState } from 'react';
import { Check, ArrowRight, X } from 'lucide-react';
import {
  PRICING_PLANS,
  WHOP_CHECKOUT_CONFIG,
  PURCHASE_WORKFLOW_STEPS,
  getCheckoutDestination,
  type IndustryKey,
  type PlanInterval,
} from '../config/siteConfig';
import { analytics, getAttributionQueryRecord } from '../utils/analytics';

interface PricingSectionProps {
  industry?: IndustryKey;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ industry }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>(industry || 'hvac');
  const [activeCheckoutModal, setActiveCheckoutModal] = useState<{
    plan: PlanInterval;
    checkoutUrl: string;
  } | null>(null);

  const handleCheckoutInitiation = (plan: PlanInterval) => {
    const targetIndustry = industry || selectedIndustry;
    analytics.trackPricingSelection(plan, targetIndustry);
    const attributionParams = getAttributionQueryRecord();
    const destination = getCheckoutDestination(plan, targetIndustry, attributionParams);
    analytics.trackCheckoutClick(plan, targetIndustry, destination);

    if (WHOP_CHECKOUT_CONFIG.isPlaceholderMode) {
      setActiveCheckoutModal({ plan, checkoutUrl: destination });
    } else {
      window.location.href = destination;
    }
  };

  const coreIncludedItems = [
    'Complete website tailored to your business, services, and cities',
    'Desktop and mobile optimization with tap-to-call dispatch headers',
    'Built-in quote request and service scheduling forms',
    'Managed hosting, SSL certificate, and custom domain connection',
    'Delivered live within 48 hours of completed onboarding',
  ];

  return (
    <section id="pricing" className="py-14 sm:py-24 lg:py-28 border-t border-[#E8E8E8] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-2.5 sm:mb-3">
            Pricing & Checkout
          </p>
          <h2 className="text-[28px] sm:text-4xl lg:text-[42px] font-extrabold text-[#202020] tracking-tight leading-[1.14] text-balance">
            Simple, transparent pricing. No setup fees.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#5C5E64] leading-relaxed">
            Every plan includes the complete website build, custom brand configuration, hosting, and 48-hour delivery after onboarding. Choose monthly billing or save 33% with upfront annual billing.
          </p>
        </div>

        {/* Optional Industry Selector when on Homepage (Full width 3-col grid on mobile) */}
        {!industry && (
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
            <span className="font-mono-label text-xs text-[#5C5E64]">
              Select your industry package:
            </span>
            <div className="grid grid-cols-3 sm:inline-flex items-center gap-1 p-1 bg-[#F8F9FA] border border-[#E8E8E8] rounded-lg w-full sm:w-auto">
              {(['hvac', 'roofing', 'electrical'] as IndustryKey[]).map((key) => {
                const label = key === 'hvac' ? 'HVAC' : key === 'roofing' ? 'Roofing' : 'Electrical';
                const active = selectedIndustry === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedIndustry(key);
                      analytics.trackCtaClick(`Pricing filter: ${label}`, 'pricing_section');
                    }}
                    className={`min-h-[42px] sm:min-h-[36px] px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 text-center ${
                      active
                        ? 'bg-white text-[#202020] shadow-xs border border-[#E8E8E8]'
                        : 'text-[#5C5E64] hover:text-[#202020]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Two Pricing Columns */}
        <div className="mt-8 sm:mt-10 grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Monthly Option */}
          <div className="bg-[#F8F9FA] border border-[#E8E8E8] rounded-xl p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#202020]">
                  {PRICING_PLANS.monthly.name}
                </h3>
                <span className="font-mono-label text-[11px] sm:text-xs text-[#5C5E64]">
                  Pay month-to-month
                </span>
              </div>

              <div className="mt-5 sm:mt-6 flex items-baseline gap-2 tabular-nums">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#202020] font-heading">
                  {PRICING_PLANS.monthly.priceDisplay}
                </span>
                <span className="text-sm font-medium text-[#5C5E64]">
                  /month
                </span>
              </div>

              <p className="mt-2 text-xs text-[#5C5E64] leading-relaxed">
                {PRICING_PLANS.monthly.billingNote}
              </p>

              <div className="my-6 sm:my-8 border-t border-[#E8E8E8]" />

              <ul className="space-y-3 text-sm text-[#202020]">
                {coreIncludedItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#6647F0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#E8E8E8]">
              <button
                type="button"
                onClick={() => handleCheckoutInitiation('monthly')}
                className="w-full min-h-[48px] py-3.5 px-5 rounded-lg cta-primary text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>{PRICING_PLANS.monthly.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <p className="mt-2.5 text-center font-mono-label text-[11px] text-[#5C5E64]">
                Checkout via Whop · Immediate onboarding access
              </p>
            </div>
          </div>

          {/* Annual Option */}
          <div className="bg-white border-2 border-[#202020] rounded-xl p-6 sm:p-10 flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#202020]">
                  {PRICING_PLANS.annual.name}
                </h3>
                <span className="font-mono-label text-[11px] sm:text-xs font-semibold text-[#6647F0]">
                  Equivalent to $66/month
                </span>
              </div>

              <div className="mt-5 sm:mt-6 flex items-baseline gap-2 tabular-nums">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#202020] font-heading">
                  {PRICING_PLANS.annual.priceDisplay}
                </span>
                <span className="text-sm font-medium text-[#5C5E64]">
                  /year · billed upfront
                </span>
              </div>

              <p className="mt-2 text-xs text-[#202020] font-medium leading-relaxed">
                {PRICING_PLANS.annual.billingNote}
              </p>

              <div className="my-6 sm:my-8 border-t border-[#E8E8E8]" />

              <ul className="space-y-3 text-sm text-[#202020]">
                {coreIncludedItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#0091FF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#E8E8E8]">
              <button
                type="button"
                onClick={() => handleCheckoutInitiation('annual')}
                className="w-full min-h-[48px] py-3.5 px-4 sm:px-6 rounded-lg cta-accent text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>{PRICING_PLANS.annual.ctaLabel} ($66/mo equiv.)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <p className="mt-2.5 text-center font-mono-label text-[11px] text-[#5C5E64]">
                Billed $792 upfront annually via Whop · Immediate onboarding access
              </p>
            </div>
          </div>
        </div>

        {/* Post-Purchase Workflow Strip */}
        <div className="mt-8 sm:mt-10 bg-[#F8F9FA] border border-[#E8E8E8] rounded-xl p-5 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            <div>
              <p className="font-mono-label text-xs text-[#202020] font-semibold uppercase">
                What happens after clicking purchase
              </p>
              <p className="text-xs sm:text-sm text-[#5C5E64] mt-1 leading-relaxed">
                {WHOP_CHECKOUT_CONFIG.onboardingNote}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 font-mono-label text-xs text-[#202020] pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E8E8E8]">
              <span>1. Whop Payment</span>
              <span className="hidden sm:inline text-[#5C5E64]">→</span>
              <span>2. Onboarding Form</span>
              <span className="hidden sm:inline text-[#5C5E64]">→</span>
              <span>3. Website Build</span>
              <span className="hidden sm:inline text-[#5C5E64]">→</span>
              <span className="text-[#6647F0] font-semibold">4. Live in 48 Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Destination & Post-Purchase Modal (Bottom-sheet ergonomics on mobile) */}
      {activeCheckoutModal && (
        <div
          className="fixed inset-0 z-50 bg-[#202020]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
        >
          <div className="bg-white border-t sm:border border-[#E8E8E8] rounded-t-2xl sm:rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveCheckoutModal(null)}
              aria-label="Close checkout modal"
              className="absolute top-3 right-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-[#5C5E64] hover:text-[#202020] hover:bg-[#F8F9FA] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="font-mono-label text-xs text-[#6647F0] uppercase pr-10">
              Whop Checkout Destination
            </p>
            <h3 id="checkout-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#202020] mt-1 pr-8">
              {activeCheckoutModal.plan === 'annual'
                ? 'Annual Plan — $792/year ($66/mo equivalent)'
                : 'Monthly Plan — $99/month'}
            </h3>
            <p className="text-sm text-[#5C5E64] mt-1.5">
              Industry Package:{' '}
              <strong className="text-[#202020] uppercase">
                {industry || selectedIndustry}
              </strong>
            </p>

            {/* Step-by-step post-purchase clarity */}
            <div className="mt-5 space-y-2.5 bg-[#F8F9FA] border border-[#E8E8E8] rounded-lg p-4">
              <p className="font-mono-label text-xs font-semibold text-[#202020]">
                NEXT STEPS AFTER PAYMENT:
              </p>
              {PURCHASE_WORKFLOW_STEPS.map((item) => (
                <div key={item.step} className="text-xs text-[#5C5E64] leading-relaxed">
                  <strong className="text-[#202020] font-mono-label">{item.step}. {item.phase}:</strong>{' '}
                  {item.description}
                </div>
              ))}
            </div>

            {/* Configured Central Checkout URL */}
            <div className="mt-4">
              <label className="block font-mono-label text-[11px] text-[#5C5E64] mb-1">
                Configured Whop Checkout Destination (src/config/siteConfig.ts):
              </label>
              <div className="p-3 bg-[#F8F9FA] border border-[#E8E8E8] rounded-md font-mono-label text-[11px] sm:text-xs text-[#202020] break-all">
                {activeCheckoutModal.checkoutUrl}
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setActiveCheckoutModal(null)}
                className="w-full sm:w-auto min-h-[46px] px-4 py-2.5 text-xs font-semibold text-[#5C5E64] hover:text-[#202020] border border-[#E8E8E8] rounded-lg cursor-pointer"
              >
                Return to page
              </button>
              <a
                href={activeCheckoutModal.checkoutUrl}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCheckoutModal(null);
                }}
                className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 text-xs font-semibold rounded-lg cta-accent flex items-center justify-center text-center whitespace-nowrap"
              >
                Proceed to Whop Checkout →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
