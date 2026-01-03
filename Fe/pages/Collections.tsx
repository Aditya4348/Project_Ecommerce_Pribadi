
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Sparkles, Gem, Box, ShieldCheck, Heart } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const Collections: React.FC = () => {
  const { lang } = useTranslation();

  const collections = [
    {
      title: lang === 'en' ? "The Signature Heirloom" : "Pusaka Ikonik",
      desc: lang === 'en' ? "Time-defying pieces presented in hand-stitched leather trunks. For those who value legacy above all." : "Karya abadi yang disajikan dalam peti kulit jahitan tangan. Bagi mereka yang menghargai warisan di atas segalanya.",
      image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=1200",
      accent: "bg-slate-900",
      icon: Gem,
      tag: "Limited to 50 Sets"
    },
    {
      title: lang === 'en' ? "The Precision Suite" : "Rangkaian Presisi",
      desc: lang === 'en' ? "Engineering marvels for the workspace. Each tool follows the golden ratio, packed in minimalist matte cases." : "Keajaiban teknik untuk ruang kerja. Setiap alat mengikuti rasio emas, dikemas dalam kotak matte minimalis.",
      image: "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=1200",
      accent: "bg-emerald-800",
      icon: Box,
      tag: "Award-Winning Design"
    },
    {
      title: lang === 'en' ? "The Artisan Vault" : "Brankas Artisan",
      desc: lang === 'en' ? "Hand-curated treasures from Indonesia's finest masters, encased in rare mahogany and velvet lining." : "Harta karun yang dikurasi langsung dari maestro terbaik Indonesia, dibungkus mahoni langka dan lapisan beludru.",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200",
      accent: "bg-amber-900",
      icon: Sparkles,
      tag: "Pure Heritage"
    },
    {
      title: lang === 'en' ? "The Minimalist Trove" : "Koleksi Minimalis",
      desc: lang === 'en' ? "Stripped of the unnecessary. Only pure form and absolute utility, gift-wrapped in architectural paper." : "Menghilangkan yang tidak perlu. Hanya bentuk murni dan kegunaan mutlak, dibungkus kertas arsitektural.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
      accent: "bg-zinc-800",
      icon: Heart,
      tag: "Seamless Aesthetic"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Page Hero */}
      <section className="relative h-[80vh] flex items-center justify-center bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Gift Collection" 
          />
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gift className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs">
              Exclusive Gifting
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            {lang === 'en' ? "The Gift for the Perfectionist" : "Kado untuk Perfeksionis"}
          </h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-8" />
          <p className="text-slate-300 text-lg md:text-2xl font-light max-w-2xl mx-auto">
            {lang === 'en' 
              ? "Because perfection is the only standard for them. Explore our curated sets designed for those who notice everything." 
              : "Karena kesempurnaan adalah satu-satunya standar bagi mereka. Jelajahi rangkaian kurasi kami yang dirancang untuk mereka."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 gap-24 md:gap-32">
          {collections.map((col, i) => (
            <div key={i} className="group relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              {/* Image Section */}
              <div className="w-full lg:w-3/5 aspect-[16/10] md:aspect-[16/9] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl transition-all group-hover:shadow-emerald-200/50">
                <img src={col.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={col.title} />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              {/* Content Section */}
              <div className="w-full lg:w-2/5 space-y-6 md:space-y-8 p-4">
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] ${col.accent}`}>
                    {col.tag}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {/* <div className="flex items-center gap-3 text-slate-400 group-hover:text-emerald-600 transition-colors">
                    <col.icon className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{col.category}</span>
                  </div> */}
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">{col.title}</h2>
                  <p className="text-slate-500 text-sm md:text-lg font-light leading-relaxed">{col.desc}</p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                  <Link 
                    to={`/`} 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all group/btn shadow-xl shadow-slate-900/10"
                  >
                    {lang === 'en' ? "Curate This Gift" : "Kurasi Hadiah Ini"}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Insured Delivery
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-32 p-12 md:p-24 bg-slate-50 rounded-[3rem] md:rounded-[5rem] text-center space-y-8 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Sparkles className="w-64 h-64 text-slate-900" />
          </div>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Experience Unrivaled Presentation</h3>
          <p className="text-slate-500 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            {lang === 'en' 
              ? "Every gift from this collection arrives in our signature eco-luxury packaging, featuring weighted unboxing experiences and personalized calligraphy notes." 
              : "Setiap hadiah dari koleksi ini tiba dalam kemasan eco-luxury khas kami, menampilkan pengalaman unboxing yang berkesan dan catatan kaligrafi personal."}
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-10">
            {['Premium Boxing', 'Handwritten Notes', 'Worldwide Priority', 'Certificate of Origin'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
