import { useTranslation } from "@/context/LanguageContext";
import { ChevronRight, Globe, Instagram, Twitter} from "lucide-react";
import { Link } from "react-router-dom";

const MenuMobile = ({ isMenuOpen, closeMenu, menuItems, lang, setLang }) => {

    return (
        <div
        className={`fixed inset-0 z-[90] lg:hidden transition-opacity duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={closeMenu}
        />
        <div
          className={`absolute inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
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
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-emerald-500 transition-colors">
                      {link.name}
                    </h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {link.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setLang("en")}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    lang === "en"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang("id")}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    lang === "id"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400"
                  }`}
                >
                  Indonesia
                </button>
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
    )
}

export default MenuMobile;