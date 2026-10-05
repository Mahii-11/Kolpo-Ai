import React from 'react';
import { STATS } from '../data/platformData';

export default function Stats({ lang }) {
  return (
    <section
      aria-label="Platform performance metrics"
      className="border-y border-slate-200/80 bg-white/75 backdrop-blur-xs"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-200/80">
          {STATS.map((stat, idx) => (
            <div
              key={stat.id}
              className={`flex flex-col justify-between ${
                idx === 0
                  ? 'lg:pr-8'
                  : idx === STATS.length - 1
                  ? 'lg:pl-8'
                  : 'lg:px-8'
              }`}
            >
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1120] font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-bold text-slate-800">
                {lang === 'bn' ? stat.labelBn : stat.label}
              </div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                {stat.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
