import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  Twitter,
} from "lucide-react";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/Admin/Dashboard";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import VerifyOtpPage from "./pages/Auth/OTPVerify";
import { CartItem, Product } from "./types";
import { useTranslation } from "./context/LanguageContext";
import { QueryClient } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Menu/Navbar";
import MenuMobile from "./components/Menu/MenuMobile";
import Footer from "./components/Footer";
import { ProductProvider } from "./context/ProductContext";
import AdminRoute from "./pages/Admin/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";

// Helper component to scroll to top on route change with smooth behavior
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
    { name: "Home", path: "/", desc: "Welcome" },
    { name: "Shop", path: "/shop", desc: "Catalog" },
    {
      name: t.nav?.collections || "Collections",
      path: "/collections",
      desc: "Curated",
    },
    { name: t.nav?.about || "About", path: "/about", desc: "Story" },
    { name: t.nav?.contact || "Contact", path: "/contact", desc: "Support" },
  ];


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {/* Navigation Bar */}
      <Navbar
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        closeMenu={closeMenu}
        setIsCartOpen={setIsCartOpen}
        cartCount={cartCount}
        menuItems={menuItems}
      />

      {/* Mobile Menu */}
      <MenuMobile
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        menuItems={menuItems}
        lang={lang}
        setLang={setLang}
      />

      <main className="flex-1 flex flex-col relative">
        
          
          {/* KEY is critical here to trigger animation on route change  */}
          <div
            key={location.pathname}
            className="page-transition-wrapper flex-1 flex flex-col"
          >
            <Routes location={location}>
              <Route path="/" element={<Home onAddToCart={addToCart} />} />
              <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route
                path="/product/:slug"
                element={<ProductDetail onAddToCart={addToCart} />}
              />
              <Route
                path="/checkout"
                element={<Checkout cart={cart} total={cartTotal} />}
              />
            </Routes>
          </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                {t.common.cart}
                <span className="px-2 py-0.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">
                  {cartCount}
                </span>
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2.5 hover:bg-slate-100 rounded-full transition-all hover:rotate-90"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {t.common.empty_cart}
                  </h3>
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-28 h-28 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 py-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">
                          {item.category}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          ${item.price}{" "}
                          <span className="text-slate-300 font-medium">
                            x{item.quantity}
                          </span>
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-slate-100 bg-slate-50/50 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">
                    {t.common.total}
                  </span>
                  <span className="text-2xl font-bold text-slate-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full bg-slate-900 text-white text-center py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10"
                >
                  {t.common.checkout}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            {/* Rute otentikasi tanpa layout utama */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />

            {/* Semua rute lain akan menggunakan AppContent sebagai layout */}
            <Route path="/*" element={<AppContent />} />

            {/* Admin Route */}
            <Route 
                path="/admin/dashboard" 
                element={
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
              }/>
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
