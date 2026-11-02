import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { INDUSTRIES_CONFIG, type IndustryKey } from '../config/siteConfig';
import { analytics } from '../utils/analytics';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string, hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent, path: string, hash?: string, label?: string) => {
    e.preventDefault();
    setIndustriesOpen(false);
    setMobileMenuOpen(false);
    if (label) {
      analytics.trackCtaClick(label, 'navbar', hash ? `${path}#${hash}` : path);
    }
    onNavigate(path, hash);
  };

  const industryKeys: IndustryKey[] = ['hvac', 'roofing', 'electrical'];
  const targetPricingPath = ['/hvac', '/roofing', '/electrical'].includes(currentPath)
    ? currentPath
    : '/';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Title */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/', undefined, 'Brand Logo')}
          className="text-base sm:text-lg font-extrabold tracking-tight text-[#202020] font-heading whitespace-nowrap shrink-0 py-2"
        >
          Forgevox Studio
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C5E64]">
          <a
            href="/#how-it-works"
            onClick={(e) => handleNavClick(e, '/', 'how-it-works', 'How it works')}
            className="hover:text-[#202020] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            How it works
          </a>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIndustriesOpen((prev) => !prev)}
              aria-expanded={industriesOpen}
              className={`inline-flex items-center gap-1.5 hover:text-[#202020] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2 ${
                ['/hvac', '/roofing', '/electrical'].includes(currentPath) ? 'text-[#202020] font-semibold' : ''
              }`}
            >
              <span>Industries</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {industriesOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white border border-[#E8E8E8] rounded-lg shadow-lg py-1.5 z-50">
                <a
                  href="/#demonstrations"
                  onClick={(e) => handleNavClick(e, '/', 'demonstrations', 'All live demos')}
                  className="block px-4 py-2 text-xs font-mono-label text-[#5C5E64] hover:text-[#202020] hover:bg-[#F8F9FA] border-b border-[#E8E8E8]"
                >
                  All live demos
                </a>
                {industryKeys.map((key) => {
                  const ind = INDUSTRIES_CONFIG[key];
                  const isActive = currentPath === ind.route;
                  return (
                    <a
                      key={ind.key}
                      href={ind.route}
                      onClick={(e) => handleNavClick(e, ind.route, undefined, `Industry: ${ind.label}`)}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-[#F8F9FA] text-[#6647F0] font-semibold'
                          : 'text-[#202020] hover:bg-[#F8F9FA]'
                      }`}
                    >
                      <span>{ind.label}</span>
                      <span className="font-mono-label text-[11px] text-[#5C5E64]">{ind.route}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <a
            href="/#pricing"
            onClick={(e) => handleNavClick(e, '/', 'pricing', 'Pricing')}
            className="hover:text-[#202020] transition-colors whitespace-nowrap shrink-0 py-2"
          >
            Pricing
          </a>

          <a
            href="/blog"
            onClick={(e) => handleNavClick(e, '/blog', undefined, 'Blog')}
            className={`hover:text-[#202020] transition-colors whitespace-nowrap shrink-0 py-2 ${
              currentPath === '/blog' ? 'text-[#202020] font-semibold' : ''
            }`}
          >
            Blog
          </a>
        </nav>

        {/* Zone 3: 1 Primary CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, targetPricingPath, 'pricing', 'Get your website')}
            className="inline-flex items-center justify-center min-h-[38px] sm:min-h-[40px] px-3 sm:px-4 py-2 text-xs font-semibold rounded-md cta-accent whitespace-nowrap shrink-0"
          >
            Get your website
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md border border-[#E8E8E8] text-[#202020] hover:bg-[#F8F9FA] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer with 44px+ Touch Targets */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8E8E8] px-4 pt-2 pb-5 space-y-3 shadow-lg">
          <div className="divide-y divide-[#E8E8E8]">
            <a
              href="/#how-it-works"
              onClick={(e) => handleNavClick(e, '/', 'how-it-works', 'Mobile: How it works')}
              className="flex items-center min-h-[46px] text-sm font-semibold text-[#202020]"
            >
              How it works
            </a>

            <div className="py-3">
              <div className="font-mono-label text-[11px] text-[#5C5E64] uppercase tracking-wider mb-2">
                Industry Packages
              </div>
              <div className="grid grid-cols-3 gap-2">
                {industryKeys.map((key) => {
                  const ind = INDUSTRIES_CONFIG[key];
                  return (
                    <a
                      key={ind.key}
                      href={ind.route}
                      onClick={(e) => handleNavClick(e, ind.route, undefined, `Mobile Industry: ${ind.label}`)}
                      className={`min-h-[44px] px-3 rounded-lg text-xs font-semibold flex items-center justify-center border transition-colors ${
                        currentPath === ind.route
                          ? 'border-[#6647F0] text-[#6647F0] bg-[#F8F9FA]'
                          : 'border-[#E8E8E8] text-[#202020] bg-white active:bg-[#F8F9FA]'
                      }`}
                    >
                      {ind.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <a
              href="/#pricing"
              onClick={(e) => handleNavClick(e, '/', 'pricing', 'Mobile: Pricing')}
              className="flex items-center min-h-[46px] text-sm font-semibold text-[#202020]"
            >
              Pricing ($99/mo or $792/yr)
            </a>

            <a
              href="/blog"
              onClick={(e) => handleNavClick(e, '/blog', undefined, 'Mobile: Blog')}
              className="flex items-center min-h-[46px] text-sm font-semibold text-[#202020]"
            >
              Blog
            </a>
          </div>

          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, targetPricingPath, 'pricing', 'Mobile Drawer: Get your website')}
            className="flex items-center justify-center w-full min-h-[48px] text-center text-sm font-semibold rounded-lg cta-accent"
          >
            Get your website
          </a>
        </div>
      )}
    </header>
  );
};
