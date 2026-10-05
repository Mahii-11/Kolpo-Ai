import React from 'react';
import { ArrowRight, Play, Globe2 } from 'lucide-react';
import AiAgentVisualization from './AiAgentVisualization';
import { UI_COPY } from '../data/platformData';

export default function Hero({
  lang,
  setLang,
  selectedIndustryId,
  onSelectIndustry,
  onOpenDemo,
}) {
  const t = UI_COPY[lang].hero;

  const handleExploreScroll = () => {
    const el = document.querySelector('#industries');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="agentic-ai"
      className="relative pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/4 w-[520px] h-[520px] bg-indigo-500/6 rounded-full blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 w-[460px] h-[460px] bg-sky-400/6 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-5 text-left space-y-6">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-indigo-600">
              {t.eyebrow}
            </p>

            <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-extrabold tracking-tight text-[#0B1120] leading-[1.08]">
              {t.headlineStart}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-600 bg-clip-text text-transparent">
                {t.headlineHighlight}
              </span>
              {t.headlineEnd}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {t.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleExploreScroll}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-[0_10px_28px_-6px_rgba(79,70,229,0.45)] hover:shadow-[0_14px_32px_-6px_rgba(79,70,229,0.55)] transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                <span>{t.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenDemo(selectedIndustryId)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B1120] bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 rounded-xl shadow-xs transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-indigo-600 ml-0.5" />
                </span>
                <span>{t.secondaryCta}</span>
              </button>
            </div>

            {/* Bilingual Support Footnote */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="font-medium">{t.langNote}</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                {lang === 'en' ? 'বাংলায় প্রিভিউ দেখুন' : 'Switch to English Preview'}
              </button>
            </div>
          </div>

          {/* Right Column: Interactive AI Agent Ecosystem */}
          <div className="lg:col-span-7">
            <AiAgentVisualization
              lang={lang}
              selectedIndustryId={selectedIndustryId}
              onSelectIndustry={onSelectIndustry}
              onOpenDemo={onOpenDemo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
