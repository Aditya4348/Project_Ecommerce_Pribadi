
import React from 'react';
import { Gavel, Scale, Globe, Info } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const Terms: React.FC = () => {
  const { t, lang } = useTranslation();

  const articles = [
    {
      title: lang === 'en' ? "1. Acceptance of Terms" : "1. Penerimaan Ketentuan",
      content: lang === 'en'
        ? "By accessing Nexus Elite, you agree to comply with and be bound by these professional terms of service. Our platform is intended for individuals who appreciate precision and premium retail experiences."
        : "Dengan mengakses Nexus Elite, Anda setuju untuk mematuhi dan terikat oleh syarat layanan profesional ini. Platform kami ditujukan untuk individu yang menghargai presisi dan pengalaman ritel premium."
    },
    {
      title: lang === 'en' ? "2. Intellectual Property" : "2. Hak Kekayaan Intelektual",
      content: lang === 'en'
        ? "All content, designs, and luxury assets on this platform are the exclusive property of Nexus Elite Global. Unauthorized reproduction or use is strictly prohibited."
        : "Semua konten, desain, dan aset mewah di platform ini adalah milik eksklusif Nexus Elite Global. Reproduksi atau penggunaan tanpa izin sangat dilarang."
    },
    {
      title: lang === 'en' ? "3. Product Availability" : "3. Ketersediaan Produk",
      content: lang === 'en'
        ? "Our collections feature exclusive items with limited production runs. We reserve the right to modify or discontinue any product without prior notice."
        : "Koleksi kami menampilkan item eksklusif dengan produksi terbatas. Kami berhak mengubah atau menghentikan produk apa pun tanpa pemberitahuan sebelumnya."
    },
    {
      title: lang === 'en' ? "4. Limitation of Liability" : "4. Batasan Tanggung Jawab",
      content: lang === 'en'
        ? "Nexus Elite shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our premium services."
        : "Nexus Elite tidak bertanggung jawab atas kerusakan tidak langsung, insidental, atau konsekuensial yang dihasilkan dari penggunaan atau ketidakmampuan untuk menggunakan layanan premium kami."
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header */}
      <section className="bg-slate-900 py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Gavel className="w-3 h-3" /> {t.common.legal}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.nav.terms}</h1>
          <p className="text-slate-400 text-lg font-light">{t.common.last_updated}: October 20, 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 max-w-4xl mx-auto px-4">
        <div className="space-y-12">
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex items-start gap-6 mb-16">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 mb-2">{lang === 'en' ? "Professional Agreement" : "Perjanjian Profesional"}</h3>
              <p className="text-sm text-emerald-700 leading-relaxed">
                {lang === 'en'
                  ? "Please read these terms carefully before engaging with our global platform. By using our services, you confirm your understanding of these governance standards."
                  : "Harap baca ketentuan ini dengan seksama sebelum berinteraksi dengan platform global kami. Dengan menggunakan layanan kami, Anda mengonfirmasi pemahaman Anda tentang standar tata kelola ini."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {articles.map((article, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">{article.title}</h2>
                <p className="text-slate-600 leading-relaxed text-lg font-light">{article.content}</p>
              </div>
            ))}
          </div>

          <hr className="border-slate-100 my-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
              <Globe className="w-10 h-10 text-slate-900" />
              <h3 className="text-xl font-bold">{lang === 'en' ? "Governing Law" : "Hukum yang Mengatur"}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {lang === 'en'
                  ? "These terms are governed by the laws of our global financial headquarters. Any disputes shall be resolved in the competent courts of that jurisdiction."
                  : "Ketentuan ini diatur oleh hukum kantor pusat keuangan global kami. Sengketa apa pun harus diselesaikan di pengadilan yang kompeten di yurisdiksi tersebut."}
              </p>
            </div>
            <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white space-y-4">
              <Scale className="w-10 h-10 text-emerald-500" />
              <h3 className="text-xl font-bold">{lang === 'en' ? "Fair Practice" : "Praktik yang Adil"}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {lang === 'en'
                  ? "Nexus Elite operates under the highest standards of international fair commerce and ethical trade practices."
                  : "Nexus Elite beroperasi di bawah standar tertinggi perdagangan internasional yang adil dan praktik perdagangan etis."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
