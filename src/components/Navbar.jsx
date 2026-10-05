import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { UI_COPY } from '../data/platformData';

export default function Navbar({ lang, setLang, onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_COPY[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.agentic, href: '#agentic-ai' },
    { label: t.industries, href: '#industries' },
    { label: t.studio, href: '#creative-studio' },
    { label: t.pricing, href: '#pricing' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_20px_-8px_rgba(15,23,42,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B1120] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
        >
          Kolpo<span className="text-indigo-600">.ai</span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative py-1 text-slate-600 hover:text-[#0B1120] transition-colors whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Switcher + Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <div
            role="group"
            aria-label="Language switcher"
            className="flex items-center bg-slate-100/90 p-1 rounded-lg border border-slate-200/70 text-xs font-semibold"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md transition-all duration-150 whitespace-nowrap cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-[#0B1120] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={`px-2.5 py-1 rounded-md transition-all duration-150 whitespace-nowrap cursor-pointer ${
                lang === 'bn'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              বাংলা
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOpenModal({ mode: 'login' })}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#0B1120] border border-slate-200/90 hover:border-slate-300 bg-white/80 hover:bg-white rounded-xl transition-all duration-150 whitespace-nowrap cursor-pointer"
          >
            {t.login}
          </button>

          <button
            type="button"
            onClick={() => onOpenModal({ mode: 'signup' })}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-[0_6px_20px_-4px_rgba(79,70,229,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(79,70,229,0.5)] transition-all duration-150 whitespace-nowrap cursor-pointer"
          >
            <span>{t.getStarted}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-md transition-colors ${
                lang === 'en' ? 'bg-white text-[#0B1120] shadow-xs' : 'text-slate-500'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={`px-2 py-1 rounded-md transition-colors ${
                lang === 'bn' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              বাংলা
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2.5 rounded-xl text-slate-700 hover:text-[#0B1120] hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-[#0B1120] hover:bg-slate-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal({ mode: 'login' });
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors whitespace-nowrap"
            >
              {t.login}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal({ mode: 'signup' });
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors whitespace-nowrap"
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
