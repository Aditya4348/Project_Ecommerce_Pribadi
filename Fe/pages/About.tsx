
import React from 'react';
import { Shield, Target, Award, Users, ArrowRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const About: React.FC = () => {
  const { lang } = useTranslation();

  const content = {
    en: {
      title: "Redefining Luxury E-Commerce",
      story_title: "Our Heritage",
      story_p1: "Founded in 2012, Nexus Elite began with a simple yet ambitious vision: to bridge the gap between high-end craftsmanship and digital convenience. We believe that true luxury is an experience that should be felt at every touchpoint.",
      story_p2: "Today, we stand as a global leader in premium retail, serving a community of discerning individuals who value performance as much as aesthetics.",
      values_title: "Our Core Values",
      values: [
        { icon: Shield, title: "Uncompromising Integrity", desc: "We source only from ethical partners and guarantee authenticity on every SKU." },
        { icon: Target, title: "Precision Engineering", desc: "Whether it's a timepiece or a software interface, we obsess over the details." },
        { icon: Award, title: "Exceptional Service", desc: "Our 24/7 priority support ensures you're never navigating alone." }
      ]
    },
    id: {
      title: "Mendefinisikan Ulang E-Commerce Mewah",
      story_title: "Warisan Kami",
      story_p1: "Didirikan pada tahun 2012, Nexus Elite dimulai dengan visi sederhana namun ambisius: menjembatani kesenjangan antara keahlian tingkat tinggi dan kenyamanan digital. Kami percaya bahwa kemewahan sejati adalah pengalaman yang harus dirasakan di setiap titik kontak.",
      story_p2: "Hari ini, kami berdiri sebagai pemimpin global dalam ritel premium, melayani komunitas individu cerdas yang menghargai performa sebesar estetika.",
      values_title: "Nilai-Nilai Inti Kami",
      values: [
        { icon: Shield, title: "Integritas Tanpa Kompromi", desc: "Kami hanya mengambil dari mitra etis dan menjamin keaslian pada setiap produk." },
        { icon: Target, title: "Teknik Presisi", desc: "Baik itu jam tangan atau antarmuka perangkat lunak, kami sangat memperhatikan detail." },
        { icon: Award, title: "Layanan Luar Biasa", desc: "Dukungan prioritas 24/7 kami memastikan Anda tidak pernah menavigasi sendirian." }
      ]
    }
  }[lang];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Nexus Headquarters" />
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{content.title}</h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs">{content.story_title}</span>
            <h2 className="text-4xl font-bold text-slate-900">{lang === 'en' ? "Crafting Excellence Since 2012" : "Membangun Keunggulan Sejak 2012"}</h2>
            <p className="text-slate-600 text-lg leading-relaxed">{content.story_p1}</p>
            <p className="text-slate-600 text-lg leading-relaxed">{content.story_p2}</p>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000" className="rounded-3xl shadow-2xl" alt="Our Workspace" />
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-8 rounded-2xl hidden md:block">
              <p className="text-4xl font-bold">150+</p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{content.values_title}</h2>
          <p className="text-slate-500">The pillars that define our reputation.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {content.values.map((v, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <v.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{v.title}</h3>
              <p className="text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
