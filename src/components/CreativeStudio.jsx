import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Clapperboard,
  FileText,
  ArrowUpRight,
  Play,
  Pause,
  ArrowRight,
  Check,
  Sparkles,
} from 'lucide-react';
import Modern3DSlider from './Modern3DSlider';
import { CREATIVE_STUDIO_TOOLS, IMAGES, UI_COPY } from '../data/platformData';

const CONTENT_SAMPLES = {
  'Blog Posts': {
    title: '5 Marketing Tips to Grow Your Business with Autonomous AI',
    body: 'Discover how modern teams combine bilingual conversational agents with automated lead qualification to double conversion rates without expanding headcount.',
    meta: 'SEO Score 97/100 · 4 min read · English & বাংলা ready',
  },
  'Social Media': {
    title: 'Launch Campaign: Autumn Dining Collection',
    body: 'Experience wood-fired culinary craftsmanship in the heart of Gulshan. Reply "TABLE" in comments or DM our AI concierge for instant window seating.',
    meta: 'Instagram & Facebook · High-Engagement Hook',
  },
  'Ad Copy': {
    title: 'Zero-Wait Customer Support in English & বাংলা',
    body: 'Stop losing high-intent buyers to slow response times. Deploy a pre-trained Kolpo AI agent on your website and WhatsApp in 5 minutes.',
    meta: 'CTR Forecast +3.8% · Conversion Optimized',
  },
  Emails: {
    title: 'Subject: Your MS in Data Science Scholarship Eligibility',
    body: 'Hi Tahmid, based on your 3.65 CGPA, you pre-qualify for our 40% Dean Merit Fellowship. Click below to finalize your Fall intake slot before Friday.',
    meta: 'Open Rate Benchmark 64% · Personalized Merge',
  },
  'Product Descriptions': {
    title: 'CloudRunner Pro — Carbon-Infused Knit Trainer',
    body: 'Engineered with dual-density nitrogen foam and breathable monsoon-grade mesh for effortless all-day urban movement.',
    meta: 'E-commerce SKU Ready · Auto-tagged Attributes',
  },
};

export default function CreativeStudio({ lang, onOpenModal }) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('Blog Posts');
  const [imgErrors, setImgErrors] = useState({});

  const t = UI_COPY[lang].creativeStudioSection;
  const imageTool = CREATIVE_STUDIO_TOOLS[0];
  const videoTool = CREATIVE_STUDIO_TOOLS[1];
  const contentTool = CREATIVE_STUDIO_TOOLS[2];

  const activeCopy = CONTENT_SAMPLES[selectedFormat] || CONTENT_SAMPLES['Blog Posts'];

  return (
    <section
      id="creative-studio"
      className="py-20 sm:py-28 bg-gradient-to-b from-[#F4F6FB] via-[#EEF2FF]/45 to-[#F8FAFC] relative overflow-hidden"
    >
      {/* Subtle Ambient Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 w-[480px] h-[480px] bg-indigo-500/6 rounded-full blur-3xl"
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>{t.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1120]">
              {t.title}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenModal({ mode: 'studio' })}
            className="self-start lg:self-auto inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B1120] bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-indigo-300 rounded-xl shadow-xs transition-all duration-150 cursor-pointer whitespace-nowrap"
          >
            <span>{t.exploreCta}</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

        {/* 1. SPOTLIGHT: MODERN 3D AUTO SLIDER FOR IMAGE GENERATION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[#0B1120]">
                  {lang === 'bn' ? imageTool.titleBn : imageTool.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {imageTool.subtitle}
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span>Modern 3D Auto Slider</span>
            </span>
          </div>

          {/* THE 3D SLIDER COMPONENT */}
          <Modern3DSlider lang={lang} onOpenModal={onOpenModal} />
        </div>

        {/* 2. DUAL CARDS: VIDEO GENERATION & CONTENT GENERATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {/* Card: Video Generation */}
          <div className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200/85 p-6 sm:p-8 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.06)] hover:border-indigo-400/70 transition-all duration-200">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                    <Clapperboard className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1120]">
                      {lang === 'bn' ? videoTool.titleBn : videoTool.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {videoTool.badge}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenModal({ mode: 'studio', tool: 'video' })}
                  aria-label="Open Video Generation Studio"
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-indigo-600 text-slate-500 hover:text-white border border-slate-200/80 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-semibold text-slate-800 mb-1.5">
                {videoTool.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {videoTool.description}
              </p>
            </div>

            {/* Interactive Video Storyboard Preview */}
            <div className="space-y-3 pt-2">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 group">
                {!imgErrors.videoPoster ? (
                  <img
                    src={
                      activeSceneIdx === 0
                        ? IMAGES.university
                        : activeSceneIdx === 1
                        ? IMAGES.ecommerce
                        : IMAGES.healthcare
                    }
                    alt="Video generation scene preview"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, videoPoster: true }))
                    }
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isPlayingVideo ? 'scale-110' : 'scale-100'
                    }`}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-sky-400">
                    <Clapperboard className="w-8 h-8" />
                  </div>
                )}

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider text-white/90">
                      {videoTool.videoPreview.headline}
                    </span>
                    <span className="font-mono tabular-nums text-[11px] text-sky-300 bg-slate-950/70 px-2 py-0.5 rounded">
                      {isPlayingVideo ? 'PLAYING · 24FPS' : '0:28'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white">
                        {videoTool.videoPreview.scenes[activeSceneIdx]}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        {videoTool.videoPreview.subtext}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      aria-label={isPlayingVideo ? 'Pause preview' : 'Play preview'}
                      className="w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#0B1120] flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer shrink-0"
                    >
                      {isPlayingVideo ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 fill-[#0B1120] ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Scene Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {videoTool.videoPreview.scenes.map((scene, idx) => (
                  <button
                    key={scene}
                    type="button"
                    onClick={() => {
                      setActiveSceneIdx(idx);
                      setIsPlayingVideo(true);
                    }}
                    className={`px-2.5 py-2 rounded-lg text-[11px] font-medium text-left truncate border transition-colors cursor-pointer ${
                      activeSceneIdx === idx
                        ? 'bg-sky-50/90 border-sky-300 text-sky-900 font-semibold'
                        : 'bg-slate-50 border-slate-200/70 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {scene}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card: Content Generation */}
          <div className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200/85 p-6 sm:p-8 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.06)] hover:border-indigo-400/70 transition-all duration-200">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1120]">
                      {lang === 'bn' ? contentTool.titleBn : contentTool.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {contentTool.badge}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenModal({ mode: 'studio', tool: 'content' })}
                  aria-label="Open Content Generation Studio"
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-indigo-600 text-slate-500 hover:text-white border border-slate-200/80 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-semibold text-slate-800 mb-1.5">
                {contentTool.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {contentTool.description}
              </p>
            </div>

            {/* Interactive Content Format Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {contentTool.formats.map((format) => (
                  <button
                    key={format}
                    type="button"
                    onClick={() => setSelectedFormat(format)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      selectedFormat === format
                        ? 'bg-[#0B1120] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/75 hover:text-slate-900'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>

              {/* Generated Copy Preview */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 text-left space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-rose-600">{selectedFormat}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                    <Check className="w-3 h-3" />
                    Brand Voice Calibrated
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0B1120] leading-snug">
                  {activeCopy.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeCopy.body}
                </p>
                <div className="pt-1 text-[11px] font-mono tabular-nums text-slate-400">
                  {activeCopy.meta}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
