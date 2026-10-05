import React, { useState } from 'react';
import {
  GraduationCap,
  UtensilsCrossed,
  ShoppingBag,
  Stethoscope,
  Building2,
  Headset,
  ArrowUpRight,
} from 'lucide-react';

const ICON_MAP = {
  GraduationCap,
  UtensilsCrossed,
  ShoppingBag,
  Stethoscope,
  Building2,
  Headset,
};

const ICON_ACCENT = {
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  sky: 'bg-sky-50 text-sky-600 border-sky-100',
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
};

export default function IndustryCard({ industry, lang, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const IconComponent = ICON_MAP[industry.iconName] || GraduationCap;
  const iconStyle = ICON_ACCENT[industry.accentColor] || ICON_ACCENT.indigo;

  return (
    <article
      onClick={() => onSelect(industry.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(industry.id);
        }
      }}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/85 hover:border-indigo-500/60 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.14)] transition-all duration-200 hover:-translate-y-1 overflow-hidden cursor-pointer text-left"
    >
      {/* Top Media Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
        {!imgError ? (
          <img
            src={industry.image}
            alt={industry.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50/50 to-slate-200 text-indigo-600 p-6">
            <IconComponent className="w-10 h-10 mb-2 opacity-80" />
            <span className="text-xs font-semibold text-slate-700">
              {industry.title}
            </span>
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"
        />

        <div className="absolute bottom-3 left-3 text-[11px] font-mono tabular-nums font-medium text-white drop-shadow-xs">
          {industry.activeConversations} active sessions · {industry.avgResolutionTime}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-6 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${iconStyle}`}
              >
                <IconComponent className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold tracking-tight text-[#0B1120] group-hover:text-indigo-600 transition-colors truncate">
                {lang === 'bn' ? industry.titleBn : industry.title}
              </h3>
            </div>

            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full border border-slate-200/90 group-hover:border-indigo-600 group-hover:bg-indigo-600 text-slate-500 group-hover:text-white flex items-center justify-center transition-all duration-150 shrink-0"
            >
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {lang === 'bn' ? industry.descriptionBn : industry.description}
          </p>
        </div>

        {/* Clean Unboxed Capability Metadata */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
          {industry.tags.map((tag, index) => (
            <React.Fragment key={tag}>
              <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
                {tag}
              </span>
              {index < industry.tags.length - 1 && (
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </article>
  );
}
