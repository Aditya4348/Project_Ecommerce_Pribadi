
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const OTPVerify: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every(val => val !== '')) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Security Check</h2>
          <p className="text-slate-500 mt-2 text-sm font-light">We've sent a 6-digit code to your email. Enter it below to verify.</p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={el => inputRefs.current[index] = el}
                value={data}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-12 h-14 bg-slate-50 border-2 border-transparent text-center text-xl font-bold text-slate-900 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all shadow-sm"
              />
            ))}
          </div>

          <div className="space-y-4">
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2 group">
              Verify Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button type="button" className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">
              Didn't receive code? Resend
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> Identity Verification System
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
