import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  items,
  title = 'Questions before you start.',
  subtitle = 'Straightforward answers about pricing, payment, onboarding, and our 48-hour website delivery.',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 sm:py-24 lg:py-28 border-t border-[#E8E8E8] bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5">
            <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-2.5 sm:mb-3">
              FAQ
            </p>
            <h2 className="text-[28px] sm:text-4xl font-extrabold text-[#202020] tracking-tight leading-[1.14] text-balance">
              {title}
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#5C5E64] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Right Column: Clean Accordion with 48px+ mobile tap rows */}
          <div className="lg:col-span-7 divide-y divide-[#E8E8E8] bg-white px-5 sm:px-8 rounded-xl border border-[#E8E8E8]">
            {items.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={faq.question} className="py-4 sm:py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full min-h-[44px] flex items-center justify-between gap-4 text-left font-heading font-bold text-base sm:text-lg text-[#202020] hover:text-[#6647F0] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#5C5E64] shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#6647F0]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#5C5E64] leading-relaxed pr-2 sm:pr-6">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
