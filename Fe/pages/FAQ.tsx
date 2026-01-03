
import React, { useState } from 'react';
import { Search, ChevronDown, Package, CreditCard, ShieldCheck, UserCheck, Headset, BookOpen, HelpCircle } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const FAQ: React.FC = () => {
  const { lang, t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      icon: Package,
      title: lang === 'en' ? "Global Logistics" : "Logistik Global",
      desc: lang === 'en' ? "Tracking, shipping times, and international customs." : "Pelacakan, waktu pengiriman, dan bea cukai internasional.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: RefreshCcw,
      title: lang === 'en' ? "Returns & Exchanges" : "Retur & Penukaran",
      desc: lang === 'en' ? "Our effortless 30-day return policy and process." : "Kebijakan dan proses pengembalian 30 hari kami yang mudah.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: ShieldCheck,
      title: lang === 'en' ? "Payments & Security" : "Pembayaran & Keamanan",
      desc: lang === 'en' ? "Secure transactions and accepted payment methods." : "Transaksi aman dan metode pembayaran yang diterima.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: UserCheck,
      title: lang === 'en' ? "Membership Elite" : "Keanggotaan Elite",
      desc: lang === 'en' ? "Exclusive benefits, tiers, and account management." : "Manfaat eksklusif, tingkatan, dan manajemen akun.",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  const faqs = [
    { 
      q: lang === 'en' ? "What is your global shipping policy?" : "Bagaimana kebijakan pengiriman global Anda?", 
      a: lang === 'en' 
        ? "We offer complimentary express shipping on all orders over $500. Delivery typically takes 2-5 business days depending on your location." 
        : "Kami menawarkan pengiriman ekspres gratis untuk semua pesanan di atas $500. Pengiriman biasanya memakan waktu 2-5 hari kerja tergantung lokasi Anda." 
    },
    { 
      q: lang === 'en' ? "How do I process a return?" : "Bagaimana cara memproses pengembalian?", 
      a: lang === 'en' 
        ? "You can initiate a return through your account portal within 30 days of delivery. Returns are free for all premium members." 
        : "Anda dapat memulai pengembalian melalui portal akun Anda dalam waktu 30 hari setelah pengiriman. Pengembalian gratis untuk semua anggota premium." 
    },
    { 
      q: lang === 'en' ? "Are your products verified for authenticity?" : "Apakah produk Anda diverifikasi keasliannya?", 
      a: lang === 'en' 
        ? "Yes, every Nexus Elite product comes with a certificate of authenticity and a unique digital identifier." 
        : "Ya, setiap produk Nexus Elite dilengkapi dengan sertifikat keaslian dan pengenal digital yang unik." 
    },
    { 
      q: lang === 'en' ? "Do you offer international warranty?" : "Apakah Anda menawarkan garansi internasional?", 
      a: lang === 'en' 
        ? "Absolutely. All electronics and luxury items carry a 2-year international limited warranty." 
        : "Tentu saja. Semua barang elektronik dan mewah memiliki garansi terbatas internasional selama 2 tahun." 
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Page Hero */}
      <section className="relative h-[70vh] flex items-center justify-center bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Support Hub" 
          />
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs">
              Knowledge Hub
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            {lang === 'en' ? "How Can We Assist?" : "Pusat Bantuan Elite"}
          </h1>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-10" />
          
          {/* Standard Search Bar */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? "Search for articles, topics, or guides..." : "Cari artikel, topik, atau panduan..."}
              className="w-full bg-white border-none rounded-[2rem] pl-16 pr-8 py-6 text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all text-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-18">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {helpCategories.map((cat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group">
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-6`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">{cat.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* FAQ Accordion */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-100 rounded-[2rem] overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
                  <button 
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <span className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">{faq.q}</span>
                    <ChevronDown className={`w-6 h-6 text-slate-300 transition-transform ${openIndex === idx ? 'rotate-180 text-emerald-500' : ''}`} />
                  </button>
                  {openIndex === idx && (
                    <div className="px-8 pb-6 text-slate-500 text-lg leading-relaxed font-light animate-in slide-in-from-top-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Concierge Sidebar */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Headset className="w-32 h-32" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Human Concierge</h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  {lang === 'en' 
                    ? "Prefer speaking with a specialist? Our global concierge team is available 24/7 for tailored assistance." 
                    : "Lebih suka berbicara dengan spesialis? Tim concierge global kami tersedia 24/7 untuk bantuan yang disesuaikan."}
                </p>
              </div>
              <div className="space-y-4">
                <button className="w-full py-4 bg-emerald-600 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
                  <Headset className="w-5 h-5" /> Live Chat Now
                </button>
                <button className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all">
                  Schedule a Call
                </button>
              </div>
              <div className="pt-4 flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Average wait: 2 mins
              </div>
            </div>

            <div className="p-10 border border-slate-100 rounded-[3rem] bg-slate-50 space-y-4">
              <h4 className="font-bold text-slate-900">Corporate Inquiries</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-light">For bulk orders, partnership opportunities, or media requests, please contact our corporate relations department.</p>
              <a href="mailto:corporate@nexuselite.com" className="text-emerald-600 font-bold hover:underline block pt-2">corporate@nexuselite.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal sub-component for consistency
const RefreshCcw = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
    <path d="M16 16h5v5"/>
  </svg>
);

export default FAQ;
