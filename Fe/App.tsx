
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  User, 
  Heart, 
  Globe,
  ChevronRight,
  Mail,
  Phone,
  Instagram,
  Twitter
} from 'lucide-react';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/Admin/Dashboard';
import { CartItem, Product } from './types';
import { useTranslation } from './context/LanguageContext';

// Helper component to scroll to top on route change with smooth behavior
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  
  return null;
};

const AppContent: React.FC = () => {
  const { lang, setLang, t } = useTranslation();
  const location = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/', desc: 'Welcome' },
    { name: 'Shop', path: '/shop', desc: 'Catalog' },
    { name: t.nav?.collections || 'Collections', path: '/collections', desc: 'Curated' },
    { name: t.nav?.about || 'About', path: '/about', desc: 'Story' },
    { name: t.nav?.contact || 'Contact', path: '/contact', desc: 'Support' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled || isMenuOpen ? 'bg-white py-3 shadow-md border-b border-slate-100' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group relative z-[110]">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-bold transition-all duration-300 ${
                scrolled || isMenuOpen ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
              }`}>
                N
              </div>
              <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled || isMenuOpen ? 'text-slate-900' : 'text-white'
              }`}>
                NEXUS<span className="text-emerald-500">ELITE</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8 text-[13px] font-semibold uppercase tracking-widest">
              {menuItems.slice(0, 4).map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`transition-colors hover:text-emerald-500 ${
                    scrolled ? 'text-slate-600' : 'text-white/90'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 md:space-x-3 relative z-[110]">
              <button className={`p-2 transition-colors ${scrolled || isMenuOpen ? 'text-slate-500' : 'text-white'}`}>
                <Search className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setIsAdmin(!isAdmin)} 
                className={`p-2 transition-colors ${isAdmin ? 'text-emerald-500' : (scrolled || isMenuOpen ? 'text-slate-500' : 'text-white')}`}
              >
                <User className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)} 
                className={`p-2 transition-colors relative ${scrolled || isMenuOpen ? 'text-slate-500' : 'text-white'}`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-emerald-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold ring-1 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button 
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                  isMenuOpen ? 'bg-slate-900 text-white' : (scrolled ? 'bg-slate-100 text-slate-600' : 'bg-white/20 text-white')
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeMenu} />
         <div className={`absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
              <div className="space-y-1 mb-10">
                {menuItems.map((link, idx) => (
                  <Link 
                    key={idx}
                    to={link.path} 
                    onClick={closeMenu}
                    className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                  >
                    <div className="space-y-0.5">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-emerald-500 transition-colors">{link.name}</h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{link.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setLang('en')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>English</button>
                  <button onClick={() => setLang('id')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${lang === 'id' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Indonesia</button>
                </div>
                <div className="flex justify-center gap-6 pt-4 border-t border-slate-100">
                  <Instagram className="w-5 h-5 text-slate-300" />
                  <Twitter className="w-5 h-5 text-slate-300" />
                  <Globe className="w-5 h-5 text-slate-300" />
                </div>
              </div>
            </div>
         </div>
      </div>

      <main className="flex-1 flex flex-col relative">
        {isAdmin ? (
          <div className="pt-20">
            <AdminDashboard onExit={() => setIsAdmin(false)} />
          </div>
        ) : (
          /* KEY is critical here to trigger animation on route change */
          <div key={location.pathname} className="page-transition-wrapper flex-1 flex flex-col">
            <Routes location={location}>
              <Route path="/" element={<Home onAddToCart={addToCart} />} />
              <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
              <Route path="/checkout" element={<Checkout cart={cart} total={cartTotal} />} />
            </Routes>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                {t.common.cart} 
                <span className="px-2 py-0.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">{cartCount}</span>
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2.5 hover:bg-slate-100 rounded-full transition-all hover:rotate-90">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{t.common.empty_cart}</h3>
                  <Link to="/shop" onClick={() => setIsCartOpen(false)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm">Shop Now</Link>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-28 h-28 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 py-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">${item.price} <span className="text-slate-300 font-medium">x{item.quantity}</span></span>
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-slate-100 bg-slate-50/50 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{t.common.total}</span>
                  <span className="text-2xl font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                </div>
                <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full bg-slate-900 text-white text-center py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10">
                  {t.common.checkout}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="bg-slate-900 text-slate-400 py-16 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-900 font-bold">N</div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">Nexus Elite</span>
            </Link>
            <p className="text-sm leading-relaxed font-light">
              {lang === 'en' ? "Defining the standard of modern luxury e-commerce." : "Menentukan standar e-commerce mewah modern."}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/shop" className="hover:text-emerald-500 transition-colors">Catalog</Link></li>
              <li><Link to="/collections" className="hover:text-emerald-500 transition-colors">{t.nav.collections}</Link></li>
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">{t.nav.about}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/faq" className="hover:text-emerald-500 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">{t.nav.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/privacy" className="hover:text-emerald-500 transition-colors">{t.nav.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-500 transition-colors">{t.nav.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">© 2024 Nexus Elite Global</p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
