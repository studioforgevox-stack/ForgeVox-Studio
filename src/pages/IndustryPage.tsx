import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  DELIVERABLES_LIST,
  INDUSTRIES_CONFIG,
  PURCHASE_WORKFLOW_STEPS,
  type IndustryKey,
} from '../config/siteConfig';
import { LiveDemoShowcase } from '../components/LiveDemoShowcase';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { analytics } from '../utils/analytics';

interface IndustryPageProps {
  industryKey: IndustryKey;
  onNavigate: (path: string, hash?: string) => void;
}

export const IndustryPage: React.FC<IndustryPageProps> = ({ industryKey, onNavigate }) => {
  const config = INDUSTRIES_CONFIG[industryKey];
  const otherIndustries = (['hvac', 'roofing', 'electrical'] as IndustryKey[]).filter(
    (k) => k !== industryKey
  );

  return (
    <main>
      {/* 1. Industry Hero & Positioning */}
      <section className="py-10 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-3 sm:mb-4">
                <span>FORGEVOX STUDIO</span>
                <span aria-hidden="true">·</span>
                <span>{config.label.toUpperCase()} WEBSITE PACKAGE</span>
              </div>

              <h1 className="text-[32px] sm:text-5xl lg:text-[52px] font-extrabold text-[#202020] tracking-tight leading-[1.1] sm:leading-[1.08] text-balance">
                {config.headline}
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5C5E64] leading-relaxed">
                {config.subheadline}
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="#pricing"
                  onClick={() =>
                    analytics.trackCtaClick(`Get your ${config.label} website`, `${industryKey}_hero`, '#pricing')
                  }
                  className="min-h-[48px] px-6 py-3.5 rounded-lg cta-accent text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Get your {config.label} website</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#live-demo"
                  onClick={() =>
                    analytics.trackCtaClick(`Inspect ${config.label} live demo`, `${industryKey}_hero`, '#live-demo')
                  }
                  className="min-h-[48px] px-6 py-3.5 rounded-lg border border-[#E8E8E8] bg-white hover:bg-[#F8F9FA] text-[#202020] text-sm font-semibold inline-flex items-center justify-center transition-colors whitespace-nowrap shrink-0"
                >
                  Explore live {config.label} demo
                </a>
              </div>

              <p className="mt-4 font-mono-label text-xs text-[#5C5E64] leading-relaxed">
                $99/month · or $792/year upfront ($66/month equivalent) · Delivered within 48 hours of onboarding
              </p>
            </div>

            <div className="lg:col-span-6">
              <LiveDemoShowcase lockedIndustry={industryKey} compactHeroMode />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Actual Live Website Demonstration */}
      <section id="live-demo" className="py-14 sm:py-24 border-t border-[#E8E8E8] bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-8 sm:mb-10">
            <div className="lg:col-span-7">
              <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-2">
                Interactive {config.label} Demonstration
              </p>
              <h2 className="text-[28px] sm:text-4xl font-extrabold text-[#202020] tracking-tight leading-[1.14] text-balance">
                See what your {config.label} website will look like.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5C5E64] leading-relaxed">
                {config.positioningCopy}
              </p>
            </div>

            <div className="lg:col-span-5 bg-white border border-[#E8E8E8] rounded-xl p-5">
              <p className="font-mono-label text-xs font-semibold text-[#202020] uppercase mb-2.5">
                Key {config.label} Architecture Highlights
              </p>
              <ul className="space-y-2 text-xs text-[#5C5E64]">
                {config.demoHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#6647F0] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <LiveDemoShowcase lockedIndustry={industryKey} />
        </div>
      </section>

      {/* 3. Short Explanation of What's Included & Process */}
      <section className="py-14 sm:py-24 border-t border-[#E8E8E8] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            {/* Left: Deliverables */}
            <div className="lg:col-span-7">
              <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-2.5 sm:mb-3">
                What’s Included
              </p>
              <h2 className="text-[28px] sm:text-3xl font-extrabold text-[#202020] tracking-tight leading-[1.14]">
                Built and configured for your {config.label.toLowerCase()} business.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#5C5E64] leading-relaxed">
                {config.deliverablesNote}
              </p>

              <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 gap-4">
                {DELIVERABLES_LIST.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 bg-[#F8F9FA] border border-[#E8E8E8] rounded-xl"
                  >
                    <h3 className="text-sm font-bold text-[#202020] flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6647F0] shrink-0" />
                      <span>{item.title}</span>
                    </h3>
                    <p className="mt-1.5 text-xs text-[#5C5E64] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3-Step Delivery Process */}
            <div className="lg:col-span-5 bg-[#F8F9FA] border border-[#E8E8E8] rounded-xl p-6 sm:p-8">
              <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-2">
                Delivery Workflow
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#202020] tracking-tight">
                Live in 48 hours after onboarding.
              </h3>

              <div className="mt-6 space-y-5 sm:space-y-6">
                {PURCHASE_WORKFLOW_STEPS.map((step) => (
                  <div key={step.step} className="border-t border-[#E8E8E8] pt-4 first:border-0 first:pt-0">
                    <div className="font-mono-label text-xs text-[#6647F0] font-semibold">
                      STEP {step.step} · {step.phase.toUpperCase()}
                    </div>
                    <h4 className="text-base font-bold text-[#202020] mt-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#5C5E64] mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-[#E8E8E8] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[#5C5E64]">Other industries:</span>
                <div className="flex items-center gap-3">
                  {otherIndustries.map((otherKey) => {
                    const other = INDUSTRIES_CONFIG[otherKey];
                    return (
                      <a
                        key={otherKey}
                        href={other.route}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(other.route);
                        }}
                        className="min-h-[38px] inline-flex items-center font-mono-label font-semibold text-[#202020] hover:text-[#6647F0] transition-colors"
                      >
                        {other.label} →
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pricing & Purchase CTA */}
      <PricingSection industry={industryKey} />

      {/* 5. Brief Industry FAQ */}
      <FAQSection
        items={config.faqs}
        title={`${config.label} Website FAQ`}
        subtitle={`Common questions about our ${config.label.toLowerCase()} website package, customization, pricing, and 48-hour delivery.`}
      />
    </main>
  );
};
