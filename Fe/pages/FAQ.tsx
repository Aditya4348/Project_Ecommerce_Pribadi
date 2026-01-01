
import React, { useState } from 'react';
import { Search, ChevronDown, Sparkles, RefreshCcw, Send, HelpCircle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { getProductAdvice } from '../services/geminiService';

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const faqs = [
    { q: "What is your global shipping policy?", a: "We offer complimentary express shipping on all orders over $500. Delivery typically takes 2-5 business days depending on your location." },
    { q: "How do I process a return?", a: "You can initiate a return through your account portal within 30 days of delivery. Returns are free for all premium members." },
    { q: "Are your products verified for authenticity?", a: "Yes, every Nexus Elite product comes with a certificate of authenticity and a unique digital identifier." },
    { q: "Do you offer international warranty?", a: "Absolutely. All electronics and luxury items carry a 2-year international limited warranty." }
  ];

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    const context = "Company policies: 30 day returns, worldwide express shipping, authentic guarantee, 24/7 concierge support.";
    const response = await getProductAdvice(query, context);
    setAiResponse(response);
    setIsLoading(false);
  };

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-50 py-24 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4" /> Support Center
          </span>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">{t.faq.title}</h1>
          <p className="text-slate-500 text-lg mb-12">{t.faq.subtitle}</p>
          
          {/* AI Search Bar */}
          <form onSubmit={handleAiSearch} className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.faq.ai_placeholder}
              className="w-full bg-white border border-slate-200 rounded-[2rem] pl-16 pr-24 py-6 shadow-xl shadow-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-lg"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-600 transition-colors flex items-center gap-2">
              {isLoading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>

          {aiResponse && (
            <div className="mt-8 bg-white p-8 rounded-3xl border border-emerald-100 shadow-lg text-left animate-in slide-in-from-top-4">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase mb-4">
                <Sparkles className="w-4 h-4" /> AI Response
              </div>
              <p className="text-slate-700 leading-relaxed">{aiResponse}</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 max-w-3xl mx-auto px-4">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="font-bold text-slate-900">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="px-8 pb-6 text-slate-500 leading-relaxed animate-in slide-in-from-top-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
