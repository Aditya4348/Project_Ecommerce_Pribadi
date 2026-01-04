import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Github, Chrome, ArrowLeft } from "lucide-react";
import { useTranslation } from "../../context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const { lang, t } = useTranslation();
  const { login, isLoggingIn } = useAuth();
  
  // State Auth Login
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login({
      email,
      password
    })
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
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
            Welcome Back
          </h2>
          <p className="text-slate-500 mt-2 text-sm font-light">
            Enter your credentials to access your elite account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2 group">
            Sign In{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
              <span className="bg-white px-4 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all font-semibold text-xs"
            >
              <Chrome className="w-4 h-4" /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all font-semibold text-xs"
            >
              <Github className="w-4 h-4" /> Github
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          New to Nexus?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-bold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
