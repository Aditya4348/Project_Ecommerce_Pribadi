
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Zap, Globe, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { useProduct } from '@/context/ProductContext';
import { formatRupiah } from '@/helpers/Formatings';
import { useAuth } from '@/context/AuthContext';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const { t } = useTranslation();
  const { user } = useAuth(); 
  const { products, toggleFavorite } = useProduct();

  console.log('user', user);

  const featured = products
  .filter(p => p.featured === true)
  .slice(0, 4);
  const newArrivals = products.slice(0, 4);

  // const images = JSON.parse(featured.images || newArrivals.images);

  const handleToggleFavorite = (productSlug: string) => {
    console.log("productSlug", productSlug);
    toggleFavorite(productSlug);
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] md:h-[85vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Retail" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20  flex justify-center items-center">
          <div className="max-w-4xl space-y-4">

            <h1 className="text-3xl sm:text-5xl text-center md:text-6x lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              {t.hero.title}
            </h1>
            <p className="text-sm md:text-lg text-slate-300 text-center leading-relaxed font-light">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4 justify-center">
              <Link 
                to="/shop" 
                className="px-6 md:px-10 py-3.5 md:py-5 bg-white text-slate-900 rounded-xl font-bold text-xs md:text-base hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
              >
                {t.hero.explore}
              </Link>
              <Link 
                to="/collections" 
                className="group flex items-center gap-2 text-white font-semibold text-xs md:text-base hover:text-emerald-400 transition-colors"
              >
                {t.hero.lookbook} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 md:mb-16">
            <div>
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-[9px] md:text-xs">{t.home.curated}</span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2 text-slate-900 tracking-tight">{t.home.featured}</h2>
            </div>
            <Link to="/shop" className="text-slate-500 font-bold hover:text-emerald-600 flex items-center gap-2 group transition-colors text-xs md:text-base">
              {t.home.browse_all} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map(product => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] rounded-2xl md:rounded-[2rem] overflow-hidden bg-slate-50 shadow-sm transition-all duration-500 hover:shadow-xl">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                  </Link>
                  <button onClick={() => handleToggleFavorite(product.slug)} className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-emerald-600 shadow-lg">
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-[10px] md:text-xs hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3 h-3 md:w-4 h-4" /> {t.common.add_to_cart}
                    </button>
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{product.category?.name ?? '-'}</p>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base group-hover:text-emerald-600 transition-colors truncate">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="font-bold text-sm md:text-lg">{formatRupiah(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30" 
            alt="Heritage Background" 
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6 md:space-y-8">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-emerald-600/20 rounded-full mx-auto flex items-center justify-center ring-1 ring-emerald-500/30">
            <Star className="w-5 h-5 md:w-8 md:h-8 text-emerald-400 fill-emerald-400/20" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.home.heritage.title}
          </h2>
          <p className="text-xs md:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            {t.home.heritage.subtitle}
          </p>
          <div className="pt-4">
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 px-6 md:px-10 py-3 md:py-4 bg-white text-slate-900 rounded-full font-bold text-xs md:text-base hover:bg-emerald-600 hover:text-white transition-all group"
            >
              {t.home.heritage.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 md:mb-16">
            <div>
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-[9px] md:text-xs">Recently Added</span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2 text-slate-900 tracking-tight">{t.home.new_arrivals}</h2>
            </div>
            <Link to="/shop" className="text-slate-500 font-bold hover:text-emerald-600 flex items-center gap-2 group transition-colors text-xs md:text-base">
              {t.home.discover_more} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map(product => (
              <div key={product.id} className="bg-white rounded-2xl md:rounded-[2.5rem] p-3 md:p-5 group transition-all duration-500 hover:shadow-xl border border-slate-100">
                <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-slate-50 mb-4 md:mb-6">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </Link>
                </div>
                <div className="px-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest truncate">{product.category?.name ?? '-'}</p>
                      <h3 className="font-bold text-slate-900 text-xs md:text-base truncate">
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                    </div>
                    <p className="font-bold text-slate-900 ml-2 text-xs md:text-base">{formatRupiah(product.price)}</p>
                  </div>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2.5 border border-slate-900 rounded-xl font-bold text-[10px] md:text-xs hover:bg-slate-900 hover:text-white transition-all"
                  >
                    {t.common.add_to_cart}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-12 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {[
            { icon: ShieldCheck, title: t.home.trust.auth, desc: t.home.trust.auth_desc },
            { icon: Globe, title: t.home.trust.shipping, desc: t.home.trust.shipping_desc },
            { icon: Zap, title: t.home.trust.support, desc: t.home.trust.support_desc },
            { icon: ArrowRight, title: t.home.trust.returns, desc: t.home.trust.returns_desc }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-900">
                <item.icon className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xs md:text-base">{item.title}</h3>
                <p className="text-[10px] md:text-sm text-slate-500 max-w-[140px] md:max-w-[200px] mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
