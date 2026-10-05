import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Maximize2,
  Cpu,
} from 'lucide-react';
import { SLIDER_3D_ITEMS } from '../data/platformData';

export default function Modern3DSlider({ lang, onOpenModal }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [imgErrors, setImgErrors] = useState({});
  const autoPlayRef = useRef(null);
  const totalSlides = SLIDER_3D_ITEMS.length;

  const activeSlide = SLIDER_3D_ITEMS[activeIndex];

  // Auto Slider Timer
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 4200);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, totalSlides]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCopyPrompt = () => {
    const textToCopy = lang === 'bn' ? activeSlide.promptBn : activeSlide.prompt;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleSimulateRender = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 900);
  };

  // 3D positioning calculation
  const getCardStyle = (index) => {
    const diff = (index - activeIndex + totalSlides) % totalSlides;
    // Map diff to -2, -1, 0, 1, 2
    let normalizedDiff = diff;
    if (diff > totalSlides / 2) {
      normalizedDiff = diff - totalSlides;
    }

    if (normalizedDiff === 0) {
      // Center active slide
      return {
        transform: 'translateX(0%) translateZ(140px) rotateY(0deg) scale(1)',
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
        pointerEvents: 'auto',
      };
    } else if (normalizedDiff === 1) {
      // Right slide 1
      return {
        transform: 'translateX(58%) translateZ(0px) rotateY(-24deg) scale(0.86)',
        zIndex: 20,
        opacity: 0.75,
        filter: 'brightness(0.85)',
        pointerEvents: 'auto',
      };
    } else if (normalizedDiff === -1) {
      // Left slide 1
      return {
        transform: 'translateX(-58%) translateZ(0px) rotateY(24deg) scale(0.86)',
        zIndex: 20,
        opacity: 0.75,
        filter: 'brightness(0.85)',
        pointerEvents: 'auto',
      };
    } else if (normalizedDiff === 2) {
      // Far right slide
      return {
        transform: 'translateX(105%) translateZ(-120px) rotateY(-36deg) scale(0.72)',
        zIndex: 10,
        opacity: 0.35,
        filter: 'brightness(0.65)',
        pointerEvents: 'none',
      };
    } else if (normalizedDiff === -2) {
      // Far left slide
      return {
        transform: 'translateX(-105%) translateZ(-120px) rotateY(36deg) scale(0.72)',
        zIndex: 10,
        opacity: 0.35,
        filter: 'brightness(0.65)',
        pointerEvents: 'none',
      };
    } else {
      // Hidden slides behind
      return {
        transform: 'translateX(0%) translateZ(-250px) scale(0.5)',
        zIndex: 0,
        opacity: 0,
        pointerEvents: 'none',
      };
    }
  };

  return (
    <div
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900 via-[#0B1120] to-[#0A0F1D] text-white p-5 sm:p-8 lg:p-10 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.45)] border border-slate-800/90 overflow-hidden"
    >
      {/* Background 3D Ambient Lighting and Mesh Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-indigo-500/20 via-violet-500/10 to-transparent rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl"
      />

      {/* Top 3D Studio Status Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                {lang === 'bn' ? 'ত্রিমাত্রিক ৩ডি ইমেজ স্লাইডার' : 'Modern 3D Generative Canvas'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Auto-Rotate 3D
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {lang === 'bn'
                ? 'স্বয়ংক্রিয় থ্রি-ডি অ্যানিমেশন ও ডিপ ভিউ'
                : 'Coverflow depth · 4K Neural synthesis · Dynamic lighting'}
            </p>
          </div>
        </div>

        {/* Auto Play / Pause Toggle + Direct Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isAutoPlaying
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'চলছে (Auto On)' : 'Auto: Active'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'বিরাম (Paused)' : 'Auto: Paused'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSimulateRender}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Re-render active frame"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3D PERSPECTIVE STAGE */}
      <div className="relative py-8 sm:py-12 my-2 w-full flex items-center justify-center">
        {/* 3D Viewport with 1200px perspective */}
        <div
          className="relative w-full max-w-[940px] h-[300px] sm:h-[390px] md:h-[430px] flex items-center justify-center"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {SLIDER_3D_ITEMS.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            const style3D = getCardStyle(idx);

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isCurrent) setActiveIndex(idx);
                }}
                style={{
                  ...style3D,
                  transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s, filter 0.65s',
                }}
                className={`absolute w-[260px] sm:w-[380px] md:w-[460px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer select-none group border ${
                  isCurrent
                    ? 'border-indigo-400/80 shadow-[0_20px_50px_rgba(79,70,229,0.35)] ring-1 ring-indigo-300/40'
                    : 'border-slate-700/80 shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Image Surface */}
                {!imgErrors[item.id] ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-indigo-400">
                    <Sparkles className="w-10 h-10" />
                  </div>
                )}

                {/* Laser scan line effect when active & scanning */}
                {isCurrent && isScanning && (
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/25 via-sky-400/30 to-transparent animate-pulse" />
                )}

                {/* 3D Glass Surface Reflections */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-semibold bg-slate-950/75 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
                    {item.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-300 bg-slate-950/70 backdrop-blur-md">
                    {item.aspect} · {item.renderTime}
                  </span>
                </div>

                {/* Bottom Scrim & Card Metadata */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-transparent p-4 sm:p-5 text-left">
                  <div className="flex items-center justify-between text-[11px] text-indigo-300 font-mono mb-1">
                    <span>{item.category}</span>
                    <span>{item.resolution}</span>
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-white drop-shadow-sm truncate">
                    {lang === 'bn' ? item.titleBn : item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating 3D Navigation Arrow Buttons */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous 3D Slide"
          className="absolute left-1 sm:left-4 z-40 w-11 h-11 rounded-2xl bg-slate-900/80 hover:bg-indigo-600 text-white border border-slate-700/80 hover:border-indigo-400 flex items-center justify-center backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next 3D Slide"
          className="absolute right-1 sm:right-4 z-40 w-11 h-11 rounded-2xl bg-slate-900/80 hover:bg-indigo-600 text-white border border-slate-700/80 hover:border-indigo-400 flex items-center justify-center backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Dot Indicators & Progress Bar */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-3 pt-2">
        <div className="flex items-center gap-2">
          {SLIDER_3D_ITEMS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 bg-gradient-to-r from-indigo-500 to-sky-400 shadow-[0_0_12px_rgba(99,102,241,0.7)]'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ACTIVE CARD PROMPT & AI MODEL INSPECTOR DRAWER */}
      <div className="relative z-20 mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-8 text-left space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-indigo-400 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'সক্রিয় জেনারেশন প্রম্পট' : 'Active Generation Prompt'}
            </span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {activeSlide.model}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl font-mono leading-relaxed select-all">
            “{lang === 'bn' ? activeSlide.promptBn : activeSlide.prompt}”
          </p>
        </div>

        {/* Action Controls */}
        <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-2.5 justify-end">
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="flex-1 lg:w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'bn' ? 'প্রম্পট কপি হয়েছে!' : 'Prompt Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{lang === 'bn' ? 'প্রম্পট কপি করুন' : 'Copy Prompt'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onOpenModal({ mode: 'studio', tool: 'image' })}
            className="flex-1 lg:w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? '৩ডি স্টুডিওতে তৈরি করুন' : 'Open in 3D Studio'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
