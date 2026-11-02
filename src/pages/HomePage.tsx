import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  DELIVERABLES_LIST,
  HOMEPAGE_FAQS,
  INDUSTRIES_CONFIG,
  PURCHASE_WORKFLOW_STEPS,
  type IndustryKey,
} from '../config/siteConfig';
import { LiveDemoShowcase } from '../components/LiveDemoShowcase';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { analytics } from '../utils/analytics';

interface HomePageProps {
  onNavigate: (path: string, hash?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleNavigateToIndustry = (industry: IndustryKey) => {
    onNavigate(INDUSTRIES_CONFIG[industry].route);
  };

  return (
    <main>
      {/* 2. Hero Section */}
      <section className="py-10 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Column: Direct Product Proposition */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="font-mono-label text-xs text-[#6647F0] tracking-wider uppercase">
                HVAC · ROOFING · ELECTRICAL
              </div>

              <h1 className="text-[32px] sm:text-5xl lg:text-[54px] font-extrabold text-[#202020] tracking-tight leading-[1.1] sm:leading-[1.08] text-balance">
                Professional websites for home-service businesses. Delivered in 48 hours.
              </h1>

              <p className="text-base sm:text-lg text-[#5C5E64] leading-relaxed max-w-xl">
                Forgevox Studio builds complete, high-converting websites for HVAC, Roofing, and Electrical contractors—and delivers them ready for live traffic within 48 hours of completed onboarding.
              </p>

              {/* Primary and Secondary CTAs: Full-width stacked on mobile (48px height), inline on sm+ */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="#pricing"
                  onClick={() => analytics.trackCtaClick('Get your website', 'hero_primary', '#pricing')}
                  className="min-h-[48px] px-6 py-3.5 rounded-lg cta-accent text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Get your website</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#demonstrations"
                  onClick={() => analytics.trackCtaClick('Explore examples', 'hero_secondary', '#demonstrations')}
                  className="min-h-[48px] px-6 py-3.5 rounded-lg border border-[#E8E8E8] bg-white hover:bg-[#F8F9FA] text-[#202020] text-sm font-semibold inline-flex items-center justify-center transition-colors whitespace-nowrap shrink-0"
                >
                  Explore examples
                </a>
              </div>

              {/* Quiet Pricing & Turnaround Summary Line */}
              <p className="font-mono-label text-xs text-[#5C5E64] leading-relaxed pt-1">
                $99/month · or $792/year upfront ($66/month equivalent) · No setup fees
              </p>
            </div>

            {/* Right Column: Live Visual Demonstration of an Actual Website */}
            <div className="lg:col-span-6">
              <LiveDemoShowcase compactHeroMode />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Live Website Demonstrations */}
      <section id="demonstrations" className="py-14 sm:py-24 lg:py-28 border-t border-[#E8E8E8] bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div className="max-w-2xl">
              <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-2.5 sm:mb-3">
                Live Product Demonstrations
              </p>
              <h2 className="text-[28px] sm:text-4xl lg:text-[42px] font-extrabold text-[#202020] tracking-tight leading-[1.14] text-balance">
                Explore the actual websites we build.
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#5C5E64] leading-relaxed">
                Switch between HVAC, Roofing, and Electrical below. Test the navigation, interactive service tabs, estimate forms, and mobile viewports directly inside the live preview.
              </p>
            </div>

            {/* Direct links to dedicated industry pages */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono-label">
              <span className="text-[#5C5E64] w-full sm:w-auto">Industry pages:</span>
              {(['hvac', 'roofing', 'electrical'] as IndustryKey[]).map((key) => {
                const item = INDUSTRIES_CONFIG[key];
                return (
                  <a
                    key={key}
                    href={item.route}
                    onClick={(e) => {
                      e.preventDefault();
                      analytics.trackCtaClick(`Demo header link: ${item.label}`, 'demo_section', item.route);
                      handleNavigateToIndustry(key);
                    }}
                    className="min-h-[40px] inline-flex items-center px-3.5 py-2 bg-white border border-[#E8E8E8] rounded-lg text-[#202020] hover:border-[#6647F0] hover:text-[#6647F0] transition-colors whitespace-nowrap"
                  >
                    {item.route} →
                  </a>
                );
              })}
            </div>
          </div>

          <LiveDemoShowcase onNavigateToIndustry={handleNavigateToIndustry} />
        </div>
      </section>

      {/* 4. How It Works */}
      <section id="how-it-works" className="py-14 sm:py-24 lg:py-28 border-t border-[#E8E8E8] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-2.5 sm:mb-3">
              How It Works
            </p>
            <h2 className="text-[28px] sm:text-4xl lg:text-[42px] font-extrabold text-[#202020] tracking-tight leading-[1.14] text-balance">
              From purchase to live website in 48 hours.
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#5C5E64] leading-relaxed">
              No discovery calls, agency proposals, or drawn-out revisions. Follow three clear steps from checkout to launch.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid md:grid-cols-3 gap-5 sm:gap-8">
            {PURCHASE_WORKFLOW_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-[#F8F9FA] border border-[#E8E8E8] rounded-xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-[#E8E8E8]">
                    <span className="font-mono-label text-xs font-semibold text-[#6647F0]">
                      STEP {item.step}
                    </span>
                    <span className="font-mono-label text-xs text-[#5C5E64]">
                      {item.phase}
                    </span>
                  </div>
                  <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold text-[#202020]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 sm:mt-3 text-sm text-[#5C5E64] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What's Included */}
      <section id="whats-included" className="py-14 sm:py-24 lg:py-28 border-t border-[#E8E8E8] bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-2.5 sm:mb-3">
              What’s Included
            </p>
            <h2 className="text-[28px] sm:text-4xl lg:text-[42px] font-extrabold text-[#202020] tracking-tight leading-[1.14] text-balance">
              Every deliverable included in your package.
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#5C5E64] leading-relaxed">
              Everything required to launch a dependable, lead-ready home-service website—with zero unnecessary add-ons.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {DELIVERABLES_LIST.map((item, index) => (
              <div
                key={item.title}
                className="bg-white border border-[#E8E8E8] rounded-xl p-5 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                    <span className="font-mono-label text-xs text-[#5C5E64]">
                      0{index + 1}
                    </span>
                    <Check className="w-4 h-4 text-[#6647F0]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#202020]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5C5E64] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pricing */}
      <PricingSection />

      {/* 7. FAQ */}
      <FAQSection items={HOMEPAGE_FAQS} />
    </main>
  );
};
