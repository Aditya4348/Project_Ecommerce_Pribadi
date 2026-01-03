import { useTranslation } from "@/context/LanguageContext";
import { Menu, ShoppingBag, Search, X, User} from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = ({scrolled, isMenuOpen, setIsMenuOpen, closeMenu, setIsCartOpen, cartCount, menuItems}) => {


    return(
        <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled || isMenuOpen
            ? "bg-white py-3 shadow-md border-b border-slate-100"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2 group relative z-[110]"
            >
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-bold transition-all duration-300 ${
                  scrolled || isMenuOpen
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-900"
                }`}
              >
                N
              </div>
              <span
                className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                  scrolled || isMenuOpen ? "text-slate-900" : "text-white"
                }`}
              >
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
                    scrolled ? "text-slate-600" : "text-white/90"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 md:space-x-3 relative z-[110]">
              <button
                className={`p-2 transition-colors ${
                  scrolled || isMenuOpen ? "text-slate-500" : "text-white"
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/login"
                className={`p-2 transition-colors ${
                  scrolled || isMenuOpen ? "text-slate-500" : "text-white"
                }`}
              >
                <User className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className={`p-2 transition-colors relative ${
                  scrolled || isMenuOpen ? "text-slate-500" : "text-white"
                }`}
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
                  isMenuOpen
                    ? "bg-slate-900 text-white"
                    : scrolled
                    ? "bg-slate-100 text-slate-600"
                    : "bg-white/20 text-white"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;