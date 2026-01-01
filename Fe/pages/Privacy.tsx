
import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const Privacy: React.FC = () => {
  const { t, lang } = useTranslation();

  const sections = [
    {
      icon: Eye,
      title: lang === 'en' ? "Information We Collect" : "Informasi yang Kami Kumpulkan",
      content: lang === 'en' 
        ? "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support. This may include your name, email, shipping address, and payment information."
        : "Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, seperti saat Anda membuat akun, melakukan pembelian, atau menghubungi dukungan. Ini mungkin termasuk nama, email, alamat pengiriman, dan informasi pembayaran Anda."
    },
    {
      icon: Shield,
      title: lang === 'en' ? "How We Use Data" : "Bagaimana Kami Menggunakan Data",
      content: lang === 'en'
        ? "Your data is used to process orders, improve our premium shopping experience, and communicate with you about your account or our luxury collections."
        : "Data Anda digunakan untuk memproses pesanan, meningkatkan pengalaman belanja premium kami, dan berkomunikasi dengan Anda tentang akun Anda atau koleksi mewah kami."
    },
    {
      icon: Lock,
      title: lang === 'en' ? "Data Security" : "Keamanan Data",
      content: lang === 'en'
        ? "We implement advanced encryption and security protocols to ensure your sensitive information remains confidential and protected from unauthorized access."
        : "Kami menerapkan enkripsi canggih dan protokol keamanan untuk memastikan informasi sensitif Anda tetap rahasia dan terlindungi dari akses yang tidak sah."
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <section className="bg-slate-900 py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Shield className="w-3 h-3" /> {t.common.legal}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.nav.privacy}</h1>
          <p className="text-slate-400 text-lg font-light">{t.common.last_updated}: October 20, 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="space-y-16">
          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed font-light mb-12">
              {lang === 'en'
                ? "At Nexus Elite, your privacy is our highest priority. This policy outlines our commitment to protecting the personal data of our discerning global clientele."
                : "Di Nexus Elite, privasi Anda adalah prioritas tertinggi kami. Kebijakan ini menguraikan komitmen kami untuk melindungi data pribadi klien global kami yang cerdas."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900">{section.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            <hr className="border-slate-100 my-16" />

            <div className="space-y-8 text-slate-600">
              <h2 className="text-2xl font-bold text-slate-900">{lang === 'en' ? "1. Cookies & Tracking" : "1. Cookie & Pelacakan"}</h2>
              <p>
                {lang === 'en'
                  ? "We use high-performance tracking technologies to personalize your experience and analyze our traffic. You can manage your preferences through your browser settings."
                  : "Kami menggunakan teknologi pelacakan berkinerja tinggi untuk mempersonalisasi pengalaman Anda dan menganalisis lalu lintas kami. Anda dapat mengelola preferensi Anda melalui pengaturan browser Anda."}
              </p>

              <h2 className="text-2xl font-bold text-slate-900">{lang === 'en' ? "2. Third-Party Sharing" : "2. Berbagi Pihak Ketiga"}</h2>
              <p>
                {lang === 'en'
                  ? "We do not sell your personal data. We only share information with trusted partners necessary to provide our services, such as logistics providers for express worldwide shipping."
                  : "Kami tidak menjual data pribadi Anda. Kami hanya berbagi informasi dengan mitra tepercaya yang diperlukan untuk menyediakan layanan kami, seperti penyedia logistik untuk pengiriman internasional ekspres."}
              </p>

              <h2 className="text-2xl font-bold text-slate-900">{lang === 'en' ? "3. Your Rights" : "3. Hak-Hak Anda"}</h2>
              <p>
                {lang === 'en'
                  ? "You have the right to access, correct, or delete your personal data at any time. Please contact our concierge team for any data-related inquiries."
                  : "Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda kapan saja. Silakan hubungi tim concierge kami untuk pertanyaan terkait data."}
              </p>
            </div>

            <div className="mt-20 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-900">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{lang === 'en' ? "Need help?" : "Butuh bantuan?"}</h4>
                <p className="text-sm text-slate-500">{lang === 'en' ? "Contact our legal concierge at legal@nexuselite.com" : "Hubungi concierge hukum kami di legal@nexuselite.com"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
