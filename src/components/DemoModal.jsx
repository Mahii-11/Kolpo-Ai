import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  Globe2,
  ArrowRight,
} from 'lucide-react';
import { INDUSTRIES } from '../data/platformData';

export default function DemoModal({
  modalState,
  onClose,
  lang,
  setLang,
}) {
  const [activeIndustryId, setActiveIndustryId] = useState(
    modalState?.industryId || 'university'
  );
  const [customInput, setCustomInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (modalState?.industryId) {
      setActiveIndustryId(modalState.industryId);
    }
    setFormSubmitted(false);
    setFormError('');
  }, [modalState]);

  const activeIndustry =
    INDUSTRIES.find((i) => i.id === activeIndustryId) || INDUSTRIES[0];

  useEffect(() => {
    setMessages([
      {
        role: 'user',
        text:
          lang === 'bn'
            ? activeIndustry.sampleChat.userBn
            : activeIndustry.sampleChat.userEn,
      },
      {
        role: 'agent',
        text:
          lang === 'bn'
            ? activeIndustry.sampleChat.agentBn
            : activeIndustry.sampleChat.agentEn,
        action: activeIndustry.sampleChat.actionTaken,
      },
    ]);
  }, [activeIndustry, lang]);

  if (!modalState) return null;

  const isAuthOrStudio =
    modalState.mode === 'login' ||
    modalState.mode === 'signup' ||
    modalState.mode === 'studio';

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const userMsg = customInput.trim();
    setCustomInput('');

    const replyText =
      lang === 'bn'
        ? `আপনার "${userMsg}" অনুসন্ধানের জন্য ধন্যবাদ। আমাদের ${activeIndustry.titleBn} এআই এজেন্ট তাৎক্ষণিকভাবে নলেজবেস যাচাই করে আপনার অনুরোধ প্রসেস করেছে।`
        : `I have processed your request regarding "${userMsg}" against our ${activeIndustry.title} knowledge base and updated the live workflow state.`;

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: userMsg },
      {
        role: 'agent',
        text: replyText,
        action: 'Live Workflow Triggered · 0.8s latency',
      },
    ]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid work email address.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B1120] text-white">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold">
              {modalState.mode === 'login'
                ? 'Log in to Kolpo.ai Workspace'
                : modalState.mode === 'signup'
                ? `Deploy Kolpo.ai ${
                    modalState.selectedPlan ? `— ${modalState.selectedPlan}` : ''
                  }`
                : modalState.mode === 'studio'
                ? 'Kolpo Creative AI Studio Sandbox'
                : 'Kolpo Live Industry Agent Simulator'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 cursor-pointer"
            >
              <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {isAuthOrStudio ? (
          <div className="p-6 sm:p-8">
            {formSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-[#0B1120]">
                  Workspace Provisioned Ready
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  We have sent a magic authentication link and bilingual agent onboarding kit to{' '}
                  <strong className="text-slate-900">{email}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold cursor-pointer"
                  >
                    Return to Platform Overview
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                <div>
                  <h4 className="text-lg font-bold text-[#0B1120]">
                    {modalState.mode === 'login'
                      ? 'Access your AI agent console'
                      : 'Start building autonomous AI agents in minutes'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Includes pre-trained templates for University Admissions, Restaurants, E-commerce, Healthcare, Real Estate, and Support.
                  </p>
                </div>

                {modalState.mode !== 'login' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Organization / Brand Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Dhaka Metropolitan University or Aura Retail"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
                  />
                  {formError && (
                    <p className="mt-1.5 text-xs font-medium text-rose-600">
                      {formError}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm cursor-pointer"
                  >
                    <span>
                      {modalState.mode === 'login'
                        ? 'Continue to Console'
                        : 'Launch Free Workspace'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Interactive Live Industry Agent Simulator */
          <div className="p-6 space-y-5">
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-100">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setActiveIndustryId(ind.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    activeIndustryId === ind.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/75'
                  }`}
                >
                  {lang === 'bn' ? ind.titleBn : ind.title}
                </button>
              ))}
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-slate-900 text-white'
                        : 'bg-indigo-50/90 text-slate-900 border border-indigo-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.action && (
                    <span className="mt-1 text-[11px] font-mono text-emerald-600 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {msg.action}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'একটি প্রশ্ন লিখুন (যেমন: ফি কত বা অর্ডার ট্র্যাকিং)...'
                    : `Ask the ${activeIndustry.title} agent a question...`
                }
                className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold cursor-pointer shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
