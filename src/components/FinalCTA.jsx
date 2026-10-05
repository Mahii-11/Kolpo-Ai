import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { UI_COPY } from '../data/platformData';

export default function FinalCTA({ lang, onOpenModal }) {
  const t = UI_COPY[lang].finalCta;

  const handleExploreFeatures = () => {
    const el = document.querySelector('#industries');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      <div className="max-w-[1380px] mx-auto">
        <div className="relative rounded-[32px] bg-gradient-to-br from-[#0B1120] via-[#111A3A] to-[#1E1B4B] px-6 py-16 sm:px-14 sm:py-20 lg:py-24 overflow-hidden shadow-[0_25px_70px_-20px_rgba(15,23,42,0.45)] border border-indigo-500/25">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl animate-pulse-glow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl"
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 tracking-wide">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Instant Autonomous Deployment · English & বাংলা</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              {t.headline}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {t.subtitle}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onOpenModal({ mode: 'signup' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-[0_10px_30px_-6px_rgba(79,70,229,0.6)] transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                <span>{t.primaryBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleExploreFeatures}
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl backdrop-blur-xs transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                {t.secondaryBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
