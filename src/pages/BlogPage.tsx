import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES_CONFIG, type IndustryKey } from '../config/siteConfig';
import { analytics } from '../utils/analytics';

export interface BlogArticleMeta {
  slug: string;
  title: string;
  publishedAt: string;
  category: 'HVAC' | 'Roofing' | 'Electrical' | 'Product';
  summary: string;
}

/**
 * Blog Articles Registry
 * Kept intentionally empty per directive ("Do not fabricate blog posts or author information. I will upload content later.")
 * Add real articles to BLOG_ARTICLES when ready to publish.
 */
export const BLOG_ARTICLES: BlogArticleMeta[] = [];

interface BlogPageProps {
  onNavigate: (path: string, hash?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'HVAC', 'Roofing', 'Electrical', 'Product'];

  const filteredArticles =
    selectedCategory === 'All'
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <main className="min-h-[75vh] bg-white">
      {/* Header */}
      <section className="py-12 sm:py-24 border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider mb-2.5 sm:mb-3">
              Forgevox Studio · Blog
            </p>
            <h1 className="text-[32px] sm:text-5xl font-extrabold text-[#202020] tracking-tight leading-tight">
              Notes on home-service websites.
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#5C5E64] leading-relaxed">
              Practical guides on website structure, conversion architecture, and local search fundamentals for HVAC, Roofing, and Electrical contractors.
            </p>
          </div>

          {/* Category Filter Bar (Horizontally scrollable on narrow mobile screens) */}
          <div className="mt-6 sm:mt-8 flex items-center gap-1.5 p-1 bg-[#F8F9FA] border border-[#E8E8E8] rounded-lg w-full sm:w-fit overflow-x-auto">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    analytics.trackCtaClick(`Blog category: ${cat}`, 'blog_index');
                  }}
                  className={`min-h-[38px] flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-white text-[#202020] shadow-xs border border-[#E8E8E8]'
                      : 'text-[#5C5E64] hover:text-[#202020]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles List or Clean Ready State */}
      <section className="py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-white border border-[#E8E8E8] rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 font-mono-label text-xs text-[#5C5E64]">
                      <span>{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.publishedAt}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-[#202020]">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#5C5E64] leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-[#F8F9FA] border border-[#E8E8E8] rounded-xl p-6 sm:p-12 max-w-3xl">
              <p className="font-mono-label text-xs text-[#6647F0] uppercase tracking-wider">
                Publication Index · {selectedCategory}
              </p>
              <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#202020]">
                No articles published yet.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5C5E64] leading-relaxed">
                Upcoming articles covering HVAC, Roofing, and Electrical website architecture will be published here. In the meantime, you can explore our live interactive website demonstrations or review package pricing.
              </p>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E8E8E8] flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                <a
                  href="/#demonstrations"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', 'demonstrations');
                  }}
                  className="min-h-[44px] px-4 py-2.5 rounded-lg cta-primary text-xs font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Explore live demos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <div className="grid grid-cols-3 sm:flex items-center gap-2">
                  {(['hvac', 'roofing', 'electrical'] as IndustryKey[]).map((key) => {
                    const ind = INDUSTRIES_CONFIG[key];
                    return (
                      <a
                        key={key}
                        href={ind.route}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(ind.route);
                        }}
                        className="min-h-[42px] px-3 py-2 rounded-lg bg-white border border-[#E8E8E8] hover:border-[#202020] text-xs font-semibold text-[#202020] flex items-center justify-center transition-colors whitespace-nowrap"
                      >
                        {ind.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
