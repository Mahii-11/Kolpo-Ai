import React, { useState } from 'react';
import {
  MessageSquareText,
  Globe2,
  UserCheck,
  CalendarCheck2,
  LifeBuoy,
  Sparkles,
  PackageSearch,
  ArrowUpRightFromCircle,
  Check,
  ArrowRight,
} from 'lucide-react';
import { CAPABILITIES, PRICING_PLANS, UI_COPY } from '../data/platformData';

const ICON_MAP = {
  MessageSquareText,
  Globe2,
  UserCheck,
  CalendarCheck2,
  LifeBuoy,
  Sparkles,
  PackageSearch,
  ArrowUpRightFromCircle,
};

export default function Capabilities({ lang, onOpenModal }) {
  const [annualBilling, setAnnualBilling] = useState(true);
  const t = UI_COPY[lang].capabilitiesSection;

  return (
    <>
      {/* AI Capabilities Bento Grid Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {CAPABILITIES.map((cap, index) => {
              const IconComponent = ICON_MAP[cap.iconName] || Sparkles;
              const isHighlighted = index === 0;

              return (
                <div
                  key={cap.id}
                  className={`${cap.span} group rounded-2xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between ${
                    isHighlighted
                      ? 'bg-gradient-to-br from-[#0B1120] via-slate-900 to-indigo-950 text-white border-slate-800 shadow-[0_16px_40px_-15px_rgba(15,23,42,0.25)]'
                      : 'bg-[#F8FAFC] hover:bg-white border-slate-200/85 hover:border-indigo-400/60 hover:shadow-[0_12px_30px_-12px_rgba(79,70,229,0.1)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isHighlighted
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30'
                            : 'bg-white text-indigo-600 border border-slate-200/90 shadow-2xs'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </span>

                      <span
                        className={`text-xs font-mono tabular-nums ${
                          isHighlighted ? 'text-indigo-300' : 'text-slate-400'
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <h3
                      className={`text-lg sm:text-xl font-bold mb-2 ${
                        isHighlighted ? 'text-white' : 'text-[#0B1120]'
                      }`}
                    >
                      {cap.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${
                        isHighlighted ? 'text-slate-300 max-w-xl' : 'text-slate-600'
                      }`}
                    >
                      {cap.description}
                    </p>
                  </div>

                  <div
                    className={`mt-6 pt-4 border-t text-xs font-mono tabular-nums flex items-center justify-between ${
                      isHighlighted
                        ? 'border-slate-800 text-sky-300'
                        : 'border-slate-200/70 text-slate-500'
                    }`}
                  >
                    <span>{cap.metric}</span>
                    <span
                      className={
                        isHighlighted
                          ? 'text-emerald-400 font-sans font-semibold'
                          : 'text-indigo-600 font-sans font-semibold'
                      }
                    >
                      Active
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 sm:py-24 bg-[#F8FAFC] border-t border-slate-200/80"
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl space-y-2.5">
              <p className="text-xs sm:text-sm font-semibold text-indigo-600 tracking-wide">
                Predictable Scaling
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1120]">
                Simple pricing that scales with your conversations.
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Every plan includes bilingual English & বাংলা support, Creative Studio access, and real-time analytics.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-200/75 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setAnnualBilling(false)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  !annualBilling
                    ? 'bg-white text-[#0B1120] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setAnnualBilling(true)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  annualBilling
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all ${
                  plan.popular
                    ? 'bg-white border-indigo-600 ring-2 ring-indigo-600/10 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.15)]'
                    : 'bg-white/90 border-slate-200/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-[#0B1120]">
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className="text-xs font-semibold text-indigo-600">
                        Most Deployed
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-100">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B1120] font-mono tabular-nums">
                      {annualBilling ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                      >
                        <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenModal({ mode: 'signup', selectedPlan: plan.name })
                  }
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
