import React from 'react';
import { Globe2, ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Agentic AI Engine', href: '#agentic-ai' },
    { label: 'Creative AI Studio (3D Slider)', href: '#creative-studio' },
    { label: 'Multilingual Voice & Chat', href: '#agentic-ai' },
    { label: 'Pricing & Plans', href: '#pricing' },
  ],
  Industries: [
    { label: 'University Admissions', industryId: 'university' },
    { label: 'Restaurants & Dining', industryId: 'restaurants' },
    { label: 'E-commerce & Retail', industryId: 'ecommerce' },
    { label: 'Healthcare & Clinics', industryId: 'healthcare' },
    { label: 'Real Estate & Property', industryId: 'realestate' },
    { label: 'Customer Support', industryId: 'support' },
  ],
  Resources: [
    { label: 'API Documentation', href: '#agentic-ai' },
    { label: 'Bengali NLP Benchmarks', href: '#agentic-ai' },
    { label: 'Enterprise Security & SOC2', href: '#pricing' },
    { label: 'System Architecture', href: '#industries' },
  ],
  Company: [
    { label: 'About Kolpo.ai', href: '#agentic-ai' },
    { label: 'Careers', href: '#pricing' },
    { label: 'Privacy Policy', href: '#pricing' },
    { label: 'Terms of Service', href: '#pricing' },
  ],
};

export default function Footer({ lang, setLang, onOpenDemo }) {
  const handleScrollLink = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1120] text-slate-400 border-t border-slate-800/80">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="text-2xl font-extrabold tracking-tight text-white inline-block"
            >
              Kolpo<span className="text-indigo-400">.ai</span>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Autonomous AI agents and generative creative tools engineered for modern enterprises—operating fluently in English and বাংলা around the clock.
            </p>

            {/* Language Selector */}
            <div className="pt-2 flex items-center gap-3">
              <Globe2 className="w-4 h-4 text-indigo-400" />
              <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    lang === 'bn'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  বাংলা (BN)
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.Product.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollLink(e, item.href)}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider mb-4">
              Industries
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.Industries.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onOpenDemo(item.industryId)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.Resources.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollLink(e, item.href)}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.Company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollLink(e, item.href)}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kolpo.ai Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="#agentic-ai"
              onClick={(e) => handleScrollLink(e, '#agentic-ai')}
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="#agentic-ai"
              onClick={(e) => handleScrollLink(e, '#agentic-ai')}
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <span>X (Twitter)</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="#agentic-ai"
              onClick={(e) => handleScrollLink(e, '#agentic-ai')}
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
