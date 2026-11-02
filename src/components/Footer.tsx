import React, { useState } from 'react';
import { WHOP_CHECKOUT_CONFIG } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (path: string, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  const handleLink = (e: React.MouseEvent, path: string, hash?: string) => {
    e.preventDefault();
    onNavigate(path, hash);
  };

  return (
    <footer className="bg-white border-t border-[#E8E8E8] py-12 sm:py-16 text-sm text-[#5C5E64]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#E8E8E8]">
          {/* Brand & Summary */}
          <div className="col-span-2 lg:col-span-5 space-y-3">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="text-lg font-extrabold tracking-tight text-[#202020] font-heading inline-block"
            >
              Forgevox Studio
            </a>
            <p className="text-sm text-[#5C5E64] max-w-sm leading-relaxed">
              Professionally designed websites for HVAC, Roofing, and Electrical businesses. Delivered ready for live traffic within 48 hours of completed onboarding.
            </p>
            <p className="font-mono-label text-xs text-[#202020] pt-1">
              <a
                href={`mailto:${WHOP_CHECKOUT_CONFIG.supportEmail}`}
                className="inline-block py-1 hover:text-[#6647F0] transition-colors"
              >
                {WHOP_CHECKOUT_CONFIG.supportEmail}
              </a>
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 lg:col-span-2 space-y-2.5">
            <h3 className="font-mono-label text-xs font-semibold text-[#202020] uppercase">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/#demonstrations" onClick={(e) => handleLink(e, '/', 'demonstrations')} className="inline-block py-1 hover:text-[#202020] transition-colors">
                  Live demonstrations
                </a>
              </li>
              <li>
                <a href="/#how-it-works" onClick={(e) => handleLink(e, '/', 'how-it-works')} className="inline-block py-1 hover:text-[#202020] transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="/#whats-included" onClick={(e) => handleLink(e, '/', 'whats-included')} className="inline-block py-1 hover:text-[#202020] transition-colors">
                  What’s included
                </a>
              </li>
              <li>
                <a href="/#pricing" onClick={(e) => handleLink(e, '/', 'pricing')} className="inline-block py-1 hover:text-[#202020] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/blog" onClick={(e) => handleLink(e, '/blog')} className="inline-block py-1 hover:text-[#202020] transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div className="col-span-1 lg:col-span-3 space-y-2.5">
            <h3 className="font-mono-label text-xs font-semibold text-[#202020] uppercase">
              Industries
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/hvac" onClick={(e) => handleLink(e, '/hvac')} className="inline-block py-1 hover:text-[#202020] transition-colors">
                  HVAC websites
                </a>
              </li>
              <li>
                <a href="/roofing" onClick={(e) => handleLink(e, '/roofing')} className="inline-block py-1 hover:text-[#202020] transition-colors">
                  Roofing websites
                </a>
              </li>
              <li>
                <a href="/electrical" onClick={(e) => handleLink(e, '/electrical')} className="inline-block py-1 hover:text-[#202020] transition-colors">
                  Electrical websites
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2 lg:col-span-2 space-y-2.5">
            <h3 className="font-mono-label text-xs font-semibold text-[#202020] uppercase">
              Legal
            </h3>
            <ul className="flex sm:block gap-6 sm:space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal('terms')}
                  className="py-1 hover:text-[#202020] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalModal('privacy')}
                  className="py-1 hover:text-[#202020] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#5C5E64]">
          <p>© {new Date().getFullYear()} Forgevox Studio. All rights reserved.</p>
          <p className="font-mono-label">$99/month or $792/year ($66/mo equivalent) · 48-hour delivery</p>
        </div>
      </div>

      {/* Minimal Legal Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 bg-[#202020]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border-t sm:border border-[#E8E8E8] rounded-t-2xl sm:rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-xl">
            <h4 className="text-xl font-bold text-[#202020]">
              {legalModal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
            </h4>
            <p className="text-sm text-[#5C5E64] mt-3 leading-relaxed">
              {legalModal === 'terms'
                ? 'Forgevox Studio provides website packages on a $99/month or $792/year upfront subscription basis. Upon completed payment via Whop and submission of the onboarding form, Forgevox Studio configures and delivers your website within 48 hours.'
                : 'Forgevox Studio collects only the business onboarding information, contact details, and standard analytics attribution required to provision, deliver, and maintain your business website.'}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-semibold bg-[#202020] text-white rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
