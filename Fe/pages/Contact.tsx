
import React from 'react';
import { Mail, Phone, MapPin, Globe, Send } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-900 py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-6">{t.contact.title}</h1>
          <p className="text-slate-400 text-lg font-light">{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-6">{t.contact.info_title}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 rounded-xl text-slate-900">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Nexus Tower</p>
                    <p className="text-slate-500 text-sm">Level 42, Elite Plaza<br />Financial District, NYC</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 rounded-xl text-slate-900">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">+1 (800) NEXUS-ELITE</p>
                    <p className="text-slate-500 text-sm">Mon - Sun, 24/7 Priority Line</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 rounded-xl text-slate-900">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">concierge@nexuselite.com</p>
                    <p className="text-slate-500 text-sm">General Support & Feedback</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <Globe className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="font-bold mb-2">Global Presence</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Local support available in Singapore, London, Dubai, and Jakarta.</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <form className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-50 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t.contact.form_name}</label>
                  <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t.contact.form_email}</label>
                  <input type="email" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t.contact.form_msg}</label>
                <textarea rows={5} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 transition-all resize-none"></textarea>
              </div>
              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3">
                {t.contact.form_send} <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
