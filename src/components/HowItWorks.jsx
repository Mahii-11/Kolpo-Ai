import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Layers, Sliders, Zap } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, UI_COPY } from '../data/platformData';

const STEP_ICONS = [Layers, Sliders, Zap];

export default function HowItWorks({ lang, onOpenModal }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const t = UI_COPY[lang].howItWorksSection;

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-3">
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

        {/* 3-Step Horizontal / Vertical Connected Architecture */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            aria-hidden="true"
            className="hidden lg:block pointer-events-none absolute top-11 left-[12%] right-[12%] h-[1.5px] bg-gradient-to-r from-indigo-200 via-indigo-400 to-sky-300 z-0"
          />

          {HOW_IT_WORKS_STEPS.map((item, idx) => {
            const StepIcon = STEP_ICONS[idx] || Layers;
            const isSelected = activeStepIndex === idx;

            return (
              <div
                key={item.step}
                role="button"
                tabIndex={0}
                onClick={() => setActiveStepIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStepIndex(idx);
                  }
                }}
                className={`relative z-10 flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-200 text-left cursor-pointer border ${
                  isSelected
                    ? 'bg-[#F8FAFC] border-indigo-500/70 shadow-[0_16px_36px_-12px_rgba(79,70,229,0.12)]'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-11 h-11 rounded-xl font-mono tabular-nums text-sm font-bold flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.step}
                      </span>
                      <span className="text-xs font-mono tabular-nums text-slate-500">
                        Step {item.step} of 03
                      </span>
                    </div>

                    <span className="w-9 h-9 rounded-xl bg-indigo-50/80 text-indigo-600 flex items-center justify-center">
                      <StepIcon className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1120] mb-2.5">
                    {item.step}. {lang === 'bn' ? item.titleBn : item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {lang === 'bn' ? item.descriptionBn : item.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-200/80 space-y-2.5">
                  {item.previewItems.map((check) => (
                    <div
                      key={check.name}
                      className="flex items-center justify-between text-xs gap-2"
                    >
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{check.name}</span>
                      </span>
                      <span className="font-mono tabular-nums text-[11px] text-slate-500">
                        {check.status}
                      </span>
                    </div>
                  ))}

                  <div className="pt-3 flex items-center justify-between text-xs text-indigo-600 font-semibold">
                    <span>{item.metrics}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Prompt */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 text-white">
          <div className="space-y-1">
            <h4 className="text-base font-bold">
              Ready to connect your own business knowledge base?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Start with our pre-built industry templates and go live in under 10 minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenModal({ mode: 'signup' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Start Free Deployment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
