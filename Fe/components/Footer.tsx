import { useTranslation } from "@/context/LanguageContext";
import { Link } from "react-router-dom"

const Footer = () => {
    const { lang, t } = useTranslation();

    return(
        <footer className="bg-slate-900 text-slate-400 py-16 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-900 font-bold">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                Nexus Elite
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-light">
              {lang === "en"
                ? "Defining the standard of modern luxury e-commerce."
                : "Menentukan standar e-commerce mewah modern."}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Catalog
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="hover:text-emerald-500 transition-colors"
                >
                  {t.nav.collections}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-emerald-500 transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/faq"
                  className="hover:text-emerald-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-emerald-500 transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-emerald-500 transition-colors"
                >
                  {t.nav.privacy}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-emerald-500 transition-colors"
                >
                  {t.nav.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
            © 2024 Nexus Elite Global
          </p>
        </div>
      </footer>
    )
}

export default Footer;