import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import IndustryCard from './IndustryCard';
import { INDUSTRIES, UI_COPY } from '../data/platformData';

export default function Industries({ lang, onOpenDemo }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const t = UI_COPY[lang].industriesSection;

  const filteredIndustries =
    activeFilter === 'all'
      ? INDUSTRIES
      : INDUSTRIES.filter((item) => item.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: t.filterAll },
    { id: 'service', label: t.filterService },
    { id: 'advisory', label: t.filterAdvisory },
  ];

  return (
    <section
      id="industries"
      className="py-20 sm:py-28 bg-[#F8FAFC] relative"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-indigo-600 tracking-wide">
              {t.kicker}
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1120]">
              {t.title}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Interactive Sector Filter Controls */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <div
              role="tablist"
              aria-label="Filter industries"
              className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl border border-slate-200"
            >
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-white text-[#0B1120] shadow-xs'
                      : 'text-slate-600 hover:text-[#0B1120]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Grid: 3 cols Desktop, 2 cols Tablet, 1 col Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredIndustries.map((industry) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              lang={lang}
              onSelect={(id) => onOpenDemo(id)}
            />
          ))}
        </div>

        {/* Bottom Interactive Action Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Need a custom vertical workflow for banking, logistics, or telecom?
          </p>
          <button
            type="button"
            onClick={() => onOpenDemo('university')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Test any industry agent in the live simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
