
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { Category } from '../types';

const Collections: React.FC = () => {
  const { lang } = useTranslation();

  const collections = [
    {
      title: lang === 'en' ? "The Urban Tech Series" : "Seri Teknologi Urban",
      desc: lang === 'en' ? "Cutting-edge electronics for the modern nomad." : "Elektronik mutakhir untuk pengembara modern.",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1200",
      category: Category.ELECTRONICS,
      accent: "bg-blue-600"
    },
    {
      title: lang === 'en' ? "Silk & Minimalist" : "Sutra & Minimalis",
      desc: lang === 'en' ? "Effortless elegance in every stitch." : "Kelegaan tanpa batas di setiap jahitan.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200",
      category: Category.FASHION,
      accent: "bg-emerald-600"
    },
    {
      title: lang === 'en' ? "Executive Living" : "Kehidupan Eksekutif",
      desc: lang === 'en' ? "Curated essentials for the home office." : "Kebutuhan pokok terkurasi untuk kantor rumah.",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
      category: Category.HOME,
      accent: "bg-amber-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-700">
      <div className="mb-16">
        <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4" /> Season 2024
        </span>
        <h1 className="text-5xl font-bold text-slate-900 mt-4 tracking-tight">
          {lang === 'en' ? "Curated Collections" : "Koleksi Terkurasi"}
        </h1>
        <p className="text-slate-500 mt-4 text-lg max-w-2xl font-light">
          {lang === 'en' 
            ? "Explore our thematic groupings of elite products, hand-picked for their exceptional design and utility." 
            : "Jelajahi pengelompokan tematik produk elit kami, dipilih langsung karena desain dan kegunaannya yang luar biasa."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {collections.map((col, i) => (
          <div key={i} className="group relative h-[70vh] rounded-[3rem] overflow-hidden flex items-end p-12 lg:p-20 shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="absolute inset-0 z-0">
              <img src={col.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={col.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            </div>
            
            <div className="relative z-10 max-w-2xl space-y-6">
              <div className={`inline-block px-4 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest ${col.accent}`}>
                {col.category}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{col.title}</h2>
              <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed">{col.desc}</p>
              <Link 
                to={`/shop?category=${col.category}`} 
                className="inline-flex items-center gap-4 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-500 hover:text-white transition-all group/btn"
              >
                {lang === 'en' ? "Explore Collection" : "Jelajahi Koleksi"}
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
