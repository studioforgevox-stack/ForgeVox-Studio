/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { IndustryPage } from './pages/IndustryPage';
import { BlogPage } from './pages/BlogPage';
import { analytics, getOrCaptureAttribution } from './utils/analytics';
import type { IndustryKey } from './config/siteConfig';

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/\/+$/, '').toLowerCase();
  if (['/hvac', '/roofing', '/electrical', '/blog'].includes(cleaned)) {
    return cleaned;
  }
  return '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePathname(window.location.pathname) : '/'
  );

  const scrollToHashOrTop = useCallback((hash?: string) => {
    const targetHash = hash || (typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '');
    if (targetHash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    getOrCaptureAttribution();
    analytics.trackPageView(currentPath);

    if (currentPath === '/hvac') analytics.trackIndustryVisit('hvac');
    if (currentPath === '/roofing') analytics.trackIndustryVisit('roofing');
    if (currentPath === '/electrical') analytics.trackIndustryVisit('electrical');
  }, [currentPath]);

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = normalizePathname(window.location.pathname);
      setCurrentPath(nextPath);
      scrollToHashOrTop();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollToHashOrTop]);

  const handleNavigate = useCallback(
    (path: string, hash?: string) => {
      const normalized = normalizePathname(path);
      const fullUrl = hash ? `${normalized}#${hash}` : normalized;
      if (window.location.pathname + window.location.hash !== fullUrl) {
        window.history.pushState({}, '', fullUrl);
      }
      setCurrentPath(normalized);
      scrollToHashOrTop(hash);
    },
    [scrollToHashOrTop]
  );

  const renderPage = () => {
    if (currentPath === '/hvac' || currentPath === '/roofing' || currentPath === '/electrical') {
      const industryKey = currentPath.slice(1) as IndustryKey;
      return <IndustryPage key={industryKey} industryKey={industryKey} onNavigate={handleNavigate} />;
    }
    if (currentPath === '/blog') {
      return <BlogPage onNavigate={handleNavigate} />;
    }
    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202020]">
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      <div className="flex-1">{renderPage()}</div>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
