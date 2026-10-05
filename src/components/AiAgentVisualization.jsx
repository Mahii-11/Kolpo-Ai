import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  UtensilsCrossed,
  ShoppingBag,
  Stethoscope,
  Building2,
  Headset,
  ChevronRight,
  Bot,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { INDUSTRIES } from '../data/platformData';

const ICON_MAP = {
  GraduationCap,
  UtensilsCrossed,
  ShoppingBag,
  Stethoscope,
  Building2,
  Headset,
};

const ACCENT_STYLES = {
  indigo: {
    iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    metricText: 'text-indigo-700',
    lineStroke: '#4F46E5',
    activeBorder: 'border-indigo-500/70 ring-2 ring-indigo-500/15',
  },
  amber: {
    iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
    metricText: 'text-amber-700',
    lineStroke: '#D97706',
    activeBorder: 'border-amber-500/70 ring-2 ring-amber-500/15',
  },
  sky: {
    iconBg: 'bg-sky-50 text-sky-600 border-sky-100',
    metricText: 'text-sky-700',
    lineStroke: '#0284C7',
    activeBorder: 'border-sky-500/70 ring-2 ring-sky-500/15',
  },
  rose: {
    iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
    metricText: 'text-rose-700',
    lineStroke: '#E11D48',
    activeBorder: 'border-rose-500/70 ring-2 ring-rose-500/15',
  },
  emerald: {
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    metricText: 'text-emerald-700',
    lineStroke: '#059669',
    activeBorder: 'border-emerald-500/70 ring-2 ring-emerald-500/15',
  },
  cyan: {
    iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    metricText: 'text-cyan-700',
    lineStroke: '#0891B2',
    activeBorder: 'border-cyan-500/70 ring-2 ring-cyan-500/15',
  },
};

export default function AiAgentVisualization({
  lang,
  selectedIndustryId,
  onSelectIndustry,
  onOpenDemo,
}) {
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    if (!isAutoCycling) return;
    const timer = setInterval(() => {
      const currentIndex = INDUSTRIES.findIndex((i) => i.id === selectedIndustryId);
      const nextIndex = (currentIndex + 1) % INDUSTRIES.length;
      onSelectIndustry(INDUSTRIES[nextIndex].id);
    }, 4800);
    return () => clearInterval(timer);
  }, [isAutoCycling, selectedIndustryId, onSelectIndustry]);

  const activeIndustry =
    INDUSTRIES.find((item) => item.id === selectedIndustryId) || INDUSTRIES[0];

  const leftNodes = [INDUSTRIES[0], INDUSTRIES[2], INDUSTRIES[4]];
  const rightNodes = [INDUSTRIES[1], INDUSTRIES[3], INDUSTRIES[5]];

  const handleCardSelect = (id) => {
    setIsAutoCycling(false);
    onSelectIndustry(id);
  };

  const renderNodeCard = (item) => {
    const IconComponent = ICON_MAP[item.iconName] || Bot;
    const isSelected = item.id === activeIndustry.id;
    const style = ACCENT_STYLES[item.accentColor] || ACCENT_STYLES.indigo;

    return (
      <div
        key={item.id}
        role="button"
        tabIndex={0}
        onClick={() => handleCardSelect(item.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardSelect(item.id);
          }
        }}
        className={`group relative text-left rounded-2xl bg-white/95 backdrop-blur-xs p-3.5 transition-all duration-200 cursor-pointer border ${
          isSelected
            ? `${style.activeBorder} shadow-[0_12px_32px_-8px_rgba(79,70,229,0.16)] -translate-y-0.5`
            : 'border-slate-200/80 hover:border-slate-300 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)] hover:-translate-y-0.5'
        }`}
      >
        {/* Header Row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${style.iconBg}`}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </span>
            <h3 className="text-xs sm:text-[13px] font-bold text-[#0B1120] truncate">
              {lang === 'bn' ? item.titleBn : item.title}
            </h3>
          </div>
          <ChevronRight
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${
              isSelected
                ? 'text-indigo-600 translate-x-0.5'
                : 'text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5'
            }`}
          />
        </div>

        {/* Media + Description Row */}
        <div className="flex items-start gap-2.5">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60 relative">
            {!imgErrors[item.id] ? (
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                onError={() =>
                  setImgErrors((prev) => ({ ...prev, [item.id]: true }))
                }
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-600">
                <IconComponent className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] leading-snug text-slate-600 line-clamp-2 mb-1.5">
              {item.shortDesc}
            </p>
            {/* Clean Unboxed Metadata with Middle Dots */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] font-medium text-slate-400">
              {item.heroTags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  <span className={isSelected ? 'text-slate-700' : 'text-slate-500'}>
                    {tag}
                  </span>
                  {idx < item.heroTags.length - 1 && (
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metric Footer */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="font-mono tabular-nums font-semibold text-slate-700">
            <strong className={style.metricText}>{item.activeConversations}</strong>{' '}
            conversations
          </span>
          <span className="font-mono tabular-nums text-slate-400">
            {item.avgResolutionTime}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      {/* Subtle Ambient Background Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 via-sky-400/8 to-violet-500/10 rounded-[36px] blur-2xl"
      />

      <div className="relative rounded-[28px] bg-gradient-to-b from-white/90 to-slate-50/90 border border-slate-200/80 p-4 sm:p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.08)]">
        {/* Top Interactive Ecosystem Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-800">
              Kolpo Multi-Agent Mesh
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              9.7K active sessions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAutoCycling(!isAutoCycling)}
              className="text-[11px] font-medium text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/70 transition-colors cursor-pointer whitespace-nowrap"
            >
              {isAutoCycling ? 'Auto-Routing: On' : 'Auto-Routing: Paused'}
            </button>
          </div>
        </div>

        {/* 3-Column Connected Hub Architecture */}
        <div className="relative grid grid-cols-1 xl:grid-cols-12 gap-4 items-center">
          {/* SVG Connection Lines */}
          <svg
            aria-hidden="true"
            className="hidden xl:block pointer-events-none absolute inset-0 w-full h-full z-0"
            viewBox="0 0 800 500"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 250 85 C 315 85, 325 195, 390 215"
              stroke={activeIndustry.id === 'university' ? '#4F46E5' : '#CBD5E1'}
              strokeWidth={activeIndustry.id === 'university' ? '2.5' : '1.5'}
              strokeDasharray={activeIndustry.id === 'university' ? 'none' : '4 4'}
            />
            <path
              d="M 250 250 L 390 250"
              stroke={activeIndustry.id === 'ecommerce' ? '#0284C7' : '#CBD5E1'}
              strokeWidth={activeIndustry.id === 'ecommerce' ? '2.5' : '1.5'}
              strokeDasharray={activeIndustry.id === 'ecommerce' ? 'none' : '4 4'}
            />
            <path
              d="M 250 415 C 315 415, 325 305, 390 285"
              stroke={activeIndustry.id === 'realestate' ? '#059669' : '#CBD5E1'}
              strokeWidth={activeIndustry.id === 'realestate' ? '2.5' : '1.5'}
              strokeDasharray={activeIndustry.id === 'realestate' ? 'none' : '4 4'}
            />
            <path
              d="M 550 85 C 485 85, 475 195, 410 215"
              stroke={activeIndustry.id === 'restaurants' ? '#D97706' : '#CBD5E1'}
              strokeWidth={activeIndustry.id === 'restaurants' ? '2.5' : '1.5'}
              strokeDasharray={activeIndustry.id === 'restaurants' ? 'none' : '4 4'}
            />
            <path
              d="M 550 250 L 410 250"
              stroke={activeIndustry.id === 'healthcare' ? '#E11D48' : '#CBD5E1'}
              strokeWidth={activeIndustry.id === 'healthcare' ? '2.5' : '1.5'}
              strokeDasharray={activeIndustry.id === 'healthcare' ? 'none' : '4 4'}
            />
            <path
              d="M 550 415 C 485 415, 475 305, 410 285"
              stroke={activeIndustry.id === 'support' ? '#0891B2' : '#CBD5E1'}
              strokeWidth={activeIndustry.id === 'support' ? '2.5' : '1.5'}
              strokeDasharray={activeIndustry.id === 'support' ? 'none' : '4 4'}
            />
          </svg>

          {/* Left Column: 3 Industry Nodes */}
          <div className="xl:col-span-4 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 z-10">
            {leftNodes.map(renderNodeCard)}
          </div>

          {/* Center Column: Kolpo AI Assistant Orb */}
          <div className="xl:col-span-4 flex flex-col items-center justify-center z-10 my-2 xl:my-0">
            <div className="w-full rounded-2xl bg-[#0B1120] text-white p-4 sm:p-5 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.35)] border border-indigo-500/30 relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/25 rounded-full blur-2xl"
              />

              <div className="relative flex flex-col items-center text-center mb-4">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-500 p-0.5 shadow-lg animate-float-slow mb-3">
                  <div className="w-full h-full bg-[#0B1120] rounded-[14px] flex items-center justify-center">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                <h4 className="text-sm font-bold tracking-tight text-white">
                  Kolpo AI Assistant
                </h4>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Active · Handling requests</span>
                </div>
              </div>

              {/* Live Selected Industry Stream */}
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3 text-left space-y-2.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5">
                  <span className="font-semibold text-indigo-300 truncate">
                    {lang === 'bn' ? activeIndustry.titleBn : activeIndustry.title}
                  </span>
                  <span className="font-mono tabular-nums text-emerald-400 shrink-0">
                    {activeIndustry.avgResolutionTime} latency
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 bg-slate-800/70 rounded-lg p-2 leading-relaxed">
                  “{lang === 'bn'
                    ? activeIndustry.sampleChat.userBn
                    : activeIndustry.sampleChat.userEn}”
                </div>

                <div className="text-[11px] text-indigo-100 bg-indigo-950/60 border border-indigo-500/25 rounded-lg p-2 leading-relaxed">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-sky-300 mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Kolpo Agent Response</span>
                  </div>
                  {lang === 'bn'
                    ? activeIndustry.sampleChat.agentBn
                    : activeIndustry.sampleChat.agentEn}
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-medium truncate">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">{activeIndustry.sampleChat.actionTaken}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenDemo(activeIndustry.id)}
                    className="text-indigo-300 hover:text-white font-semibold underline underline-offset-2 ml-2 shrink-0 cursor-pointer"
                  >
                    Test Live
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Industry Nodes */}
          <div className="xl:col-span-4 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 z-10">
            {rightNodes.map(renderNodeCard)}
          </div>
        </div>
      </div>
    </div>
  );
}
