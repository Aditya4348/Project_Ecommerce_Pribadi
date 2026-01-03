import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Phone,
  MapPin,
  ArrowLeft,
} from "lucide-react";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi alur ke verifikasi OTP
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors mb-4"
        >
          <ArrowLeft size={12} />
          Kembali ke Halaman Utama
        </Link>
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
            N
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Join The Elite
          </h2>
          <p className="text-slate-500 mt-2 text-sm font-light">
            Experience the future of premium retail
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama Lengkap */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="Alexander Pierce"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="alex@nexus.com"
                />
              </div>
            </div>

            {/* Nomor Telepon */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Nomor Telepon
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="+62 812..."
                />
              </div>
            </div>

            {/* Alamat */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Alamat Lengkap
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="Jl. Sudirman No. 123, Jakarta"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="********"
                />
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="********"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <div className="mt-1">
              <input
                type="checkbox"
                className="w-4 h-4 accent-emerald-500 rounded border-slate-200 cursor-pointer"
                required
              />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Saya setuju dengan{" "}
              <Link to="/terms" className="text-slate-900 font-bold underline">
                Syarat & Ketentuan
              </Link>{" "}
              serta{" "}
              <Link
                to="/privacy"
                className="text-slate-900 font-bold underline"
              >
                Kebijakan Privasi
              </Link>{" "}
              Nexus Elite.
            </p>
          </div>

          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2 group">
            Buat Akun{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> 256-bit Secure Encryption
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Sudah memiliki akun?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-bold hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
