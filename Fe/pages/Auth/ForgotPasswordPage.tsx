
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    // After 2s go to OTP
    setTimeout(() => navigate('/verify-otp'), 3000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>

        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <RefreshCw className={`w-8 h-8 ${isSent ? 'animate-spin' : ''}`} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Recover Access</h2>
          <p className="text-slate-500 mt-2 text-sm font-light">We'll send a verification code to your registered email</p>
        </div>

        {isSent ? (
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 space-y-4 animate-in fade-in zoom-in">
            <div className="flex items-center gap-3 text-emerald-700 font-bold">
              <CheckCircle2 className="w-5 h-5" /> Code Sent Successfully
            </div>
            <p className="text-xs text-emerald-600 leading-relaxed">Please check your inbox. You will be redirected to the verification page shortly.</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required 
                  className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-emerald-500 transition-all" 
                  placeholder="recovery@nexus.com"
                />
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg">
              Send Reset Code
            </button>
          </form>
        )}
        
        <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          Nexus Security Protocol v2.4
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
