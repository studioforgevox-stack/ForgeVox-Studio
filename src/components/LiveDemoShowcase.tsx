import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Maximize2, Minimize2, ArrowUpRight, Hand } from 'lucide-react';
import { INDUSTRIES_CONFIG, type IndustryKey } from '../config/siteConfig';
import { analytics } from '../utils/analytics';

interface LiveDemoShowcaseProps {
  initialIndustry?: IndustryKey;
  lockedIndustry?: IndustryKey;
  onNavigateToIndustry?: (industry: IndustryKey) => void;
  compactHeroMode?: boolean;
}

export const LiveDemoShowcase: React.FC<LiveDemoShowcaseProps> = ({
  initialIndustry = 'hvac',
  lockedIndustry,
  onNavigateToIndustry,
  compactHeroMode = false,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>(lockedIndustry || initialIndustry);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'mobile';
    }
    return 'desktop';
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouchUnlocked, setIsTouchUnlocked] = useState(false);

  const activeIndustryKey = lockedIndustry || selectedIndustry;
  const activeConfig = INDUSTRIES_CONFIG[activeIndustryKey];

  useEffect(() => {
    setIsTouchUnlocked(false);
  }, [activeIndustryKey, viewportMode]);

  const handleSelectIndustry = (industry: IndustryKey) => {
    if (lockedIndustry) return;
    setSelectedIndustry(industry);
    analytics.trackDemoInteraction(industry, 'switch_industry');
  };

  const handleSelectViewport = (mode: 'desktop' | 'mobile') => {
    setViewportMode(mode);
    analytics.trackDemoInteraction(activeIndustryKey, 'switch_viewport', mode);
  };

  const handleToggleExpand = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    if (next) setIsTouchUnlocked(true);
    analytics.trackDemoInteraction(activeIndustryKey, 'open_fullscreen', next ? 'expanded' : 'collapsed');
  };

  const industryKeys: IndustryKey[] = ['hvac', 'roofing', 'electrical'];

  if (compactHeroMode) {
    return (
      <div className="bg-[#F8F9FA] border border-[#E8E8E8] rounded-xl overflow-hidden">
        {/* Browser Chrome Header */}
        <div className="bg-white border-b border-[#E8E8E8] px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E8E8]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E8E8]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E8E8]" />
            </div>
            <span className="sm:ml-2 font-mono-label text-[11px] sm:text-xs text-[#5C5E64] truncate">
              live-demo · {activeConfig.label.toLowerCase()}
            </span>
          </div>

          {!lockedIndustry && (
            <div className="flex items-center gap-1 bg-[#F8F9FA] p-1 rounded-lg border border-[#E8E8E8]">
              {industryKeys.map((key) => {
                const item = INDUSTRIES_CONFIG[key];
                const isSelected = activeIndustryKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectIndustry(key)}
                    className={`min-h-[34px] px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-white text-[#202020] shadow-xs border border-[#E8E8E8]'
                        : 'text-[#5C5E64] hover:text-[#202020]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Interactive Iframe Preview: Native 1:1 on Mobile (<640px), Scaled Desktop on sm+ */}
        <div className="relative w-full h-[380px] sm:h-[430px] bg-white overflow-hidden">
          <iframe
            key={activeConfig.demoFilePath}
            src={activeConfig.demoFilePath}
            title={`${activeConfig.label} Live Website Demonstration`}
            className="w-full h-full sm:w-[200%] sm:h-[200%] sm:origin-top-left sm:scale-50 border-0"
            loading="eager"
          />

          {/* Mobile Scroll-Trap Guard Overlay */}
          {!isTouchUnlocked && (
            <div className="sm:hidden absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#202020]/80 via-[#202020]/40 to-transparent flex items-end justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsTouchUnlocked(true);
                  analytics.trackDemoInteraction(activeIndustryKey, 'open_fullscreen', 'hero_mobile_interact');
                }}
                className="w-full min-h-[42px] px-4 py-2 rounded-lg bg-white text-[#202020] font-semibold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Hand className="w-3.5 h-3.5 text-[#6647F0]" />
                <span>Tap to interact inside live {activeConfig.label} demo</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Caption Bar */}
        <div className="bg-white border-t border-[#E8E8E8] px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 text-xs text-[#5C5E64]">
          <span className="font-mono-label text-[11px] sm:text-xs truncate">
            {isTouchUnlocked ? 'Interactive mode active' : 'Live HTML website'}
          </span>
          <a
            href={lockedIndustry ? '#live-demo' : '#demonstrations'}
            onClick={() =>
              analytics.trackCtaClick(
                'Full interactive view',
                'hero_demo_bar',
                lockedIndustry ? '#live-demo' : '#demonstrations'
              )
            }
            className="font-semibold text-[#6647F0] hover:underline whitespace-nowrap shrink-0 py-1"
          >
            Inspect full viewport →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isExpanded
          ? 'fixed inset-2 sm:inset-4 z-50 bg-white border border-[#E8E8E8] rounded-xl shadow-2xl flex flex-col'
          : 'bg-[#F8F9FA] border border-[#E8E8E8] rounded-xl overflow-hidden'
      }`}
    >
      {/* Top Control Toolbar */}
      <div className="bg-white border-b border-[#E8E8E8] p-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Industry Switcher (Full-width 3-col grid on mobile) or Locked Label */}
        {!lockedIndustry ? (
          <div
            className="grid grid-cols-3 sm:flex items-center gap-1 bg-[#F8F9FA] p-1 rounded-lg border border-[#E8E8E8] w-full sm:w-auto"
            role="tablist"
            aria-label="Select industry demonstration"
          >
            {industryKeys.map((key) => {
              const item = INDUSTRIES_CONFIG[key];
              const isSelected = activeIndustryKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectIndustry(key)}
                  className={`min-h-[42px] sm:min-h-[36px] px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 text-center ${
                    isSelected
                      ? 'bg-[#202020] text-white'
                      : 'text-[#5C5E64] hover:text-[#202020]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="font-mono-label text-xs text-[#5C5E64]">
              LIVE DEMO · {activeConfig.label.toUpperCase()}
            </span>
          </div>
        )}

        {/* Center: URL & Interactive Notice (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-[#F8F9FA] border border-[#E8E8E8] rounded-md font-mono-label text-xs text-[#5C5E64]">
          <span>{activeConfig.demoBrandName}</span>
          <span aria-hidden="true">·</span>
          <span>Interactive HTML</span>
        </div>

        {/* Right: Viewport Switcher & Expand */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <div className="grid grid-cols-2 sm:flex items-center gap-1 bg-[#F8F9FA] p-1 rounded-lg border border-[#E8E8E8] flex-1 sm:flex-initial">
            <button
              type="button"
              onClick={() => handleSelectViewport('desktop')}
              aria-label="Desktop viewport preview"
              className={`min-h-[40px] sm:min-h-[34px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                viewportMode === 'desktop'
                  ? 'bg-white text-[#202020] shadow-xs border border-[#E8E8E8]'
                  : 'text-[#5C5E64] hover:text-[#202020]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectViewport('mobile')}
              aria-label="Mobile viewport preview"
              className={`min-h-[40px] sm:min-h-[34px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                viewportMode === 'mobile'
                  ? 'bg-white text-[#202020] shadow-xs border border-[#E8E8E8]'
                  : 'text-[#5C5E64] hover:text-[#202020]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleToggleExpand}
            aria-label={isExpanded ? 'Exit full window preview' : 'Expand preview window'}
            className="min-h-[42px] sm:min-h-[36px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#202020] bg-white hover:bg-[#F8F9FA] border border-[#E8E8E8] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Collapse</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Viewport Canvas Area */}
      <div
        className={`relative w-full bg-[#F8F9FA] flex justify-center items-start overflow-hidden transition-all ${
          isExpanded ? 'flex-1 p-2 sm:p-4' : viewportMode === 'mobile' ? 'py-4 sm:py-8 px-2 sm:px-4' : 'p-0'
        }`}
      >
        <div
          className={`relative bg-white transition-all duration-200 overflow-hidden ${
            viewportMode === 'mobile'
              ? 'w-full max-w-[390px] h-[560px] sm:h-[720px] rounded-2xl border-2 border-[#202020] shadow-lg'
              : isExpanded
              ? 'w-full h-full rounded-lg border border-[#E8E8E8]'
              : 'w-full h-[520px] sm:h-[720px]'
          }`}
        >
          {/* On narrow screens when viewing Desktop mode, scale 200% width by 0.5 so the true desktop layout is visible */}
          <iframe
            key={`${activeConfig.demoFilePath}-${viewportMode}`}
            src={activeConfig.demoFilePath}
            title={`${activeConfig.label} Interactive Website Demo (${viewportMode})`}
            className={`border-0 ${
              viewportMode === 'desktop'
                ? 'w-[200%] h-[200%] origin-top-left scale-50 md:w-full md:h-full md:scale-100'
                : 'w-full h-full'
            } ${!isTouchUnlocked ? 'pointer-events-none md:pointer-events-auto' : 'pointer-events-auto'}`}
          />

          {/* Mobile Touch Scroll Protection Banner */}
          {!isTouchUnlocked && (
            <div className="md:hidden absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#202020]/85 via-[#202020]/50 to-transparent flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsTouchUnlocked(true);
                  analytics.trackDemoInteraction(activeIndustryKey, 'open_fullscreen', 'unlock_mobile_touch');
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-white text-[#202020] font-semibold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Hand className="w-4 h-4 text-[#6647F0]" />
                <span>Tap to scroll & click inside live {activeConfig.label} demo</span>
              </button>
            </div>
          )}

          {isTouchUnlocked && !isExpanded && (
            <div className="md:hidden absolute top-2 right-2 z-20">
              <button
                type="button"
                onClick={() => setIsTouchUnlocked(false)}
                className="min-h-[36px] px-3 py-1.5 rounded-md bg-[#202020]/90 text-white font-mono-label text-[11px] shadow-md cursor-pointer"
              >
                Lock demo scroll
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="bg-white border-t border-[#E8E8E8] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-[#5C5E64]">
          <span className="font-semibold text-[#202020]">{activeConfig.label} Package Foundation:</span>{' '}
          {activeConfig.deliverablesNote}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E8E8] shrink-0">
          {!lockedIndustry && onNavigateToIndustry && (
            <button
              type="button"
              onClick={() => {
                analytics.trackCtaClick(`Explore ${activeConfig.label} page`, 'demo_footer', activeConfig.route);
                onNavigateToIndustry(activeIndustryKey);
              }}
              className="min-h-[40px] inline-flex items-center gap-1 text-xs font-semibold text-[#6647F0] hover:underline cursor-pointer whitespace-nowrap"
            >
              <span>View {activeConfig.label} page</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
          <a
            href="#pricing"
            onClick={() => analytics.trackCtaClick(`Get this ${activeConfig.label} website`, 'demo_footer', '#pricing')}
            className="min-h-[40px] inline-flex items-center gap-1 text-xs font-semibold text-[#202020] hover:text-[#6647F0] transition-colors whitespace-nowrap"
          >
            <span>Get this {activeConfig.label} website →</span>
          </a>
        </div>
      </div>
    </div>
  );
};
