
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Added RefreshCcw to lucide-react imports below
import { ShieldCheck, CreditCard, Truck, ChevronLeft, CheckCircle2, RefreshCcw } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  total: number;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, total }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const shipping = total > 500 ? 0 : 25;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment logic
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Order Confirmed!</h1>
          <p className="text-slate-500 text-lg">Thank you for choosing Nexus Elite. Your order #NX-88219 is being processed.</p>
        </div>
        <div className="bg-slate-50 rounded-3xl p-8 max-w-sm mx-auto space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Receipt sent to</span>
            <span className="font-bold">user@example.com</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Delivery expected</span>
            <span className="font-bold">Oct 24 - Oct 26</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-12 font-medium"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Cart
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Forms */}
        <div className="space-y-12">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Shipping Information
            </h2>
            <form className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">First Name</label>
                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Last Name</label>
                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Street Address</label>
                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">City</label>
                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Postal Code</label>
                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Payment Details
            </h2>
            <div className="p-8 bg-slate-900 rounded-3xl text-white space-y-6">
              <div className="flex justify-between items-center">
                <CreditCard className="w-8 h-8 text-emerald-500" />
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-slate-800 rounded"></div>
                  <div className="w-8 h-5 bg-slate-800 rounded"></div>
                </div>
              </div>
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-800 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-slate-800 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">CVC</label>
                    <input type="text" placeholder="123" className="w-full bg-slate-800 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500" required />
                  </div>
                </div>
                <button 
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20"
                >
                  {isProcessing ? (
                    <RefreshCcw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Pay ${grandTotal.toFixed(2)}</>
                  )}
                </button>
              </form>
            </div>
            <div className="flex items-center gap-3 justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Encryption Active
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-32 h-fit bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-100">
          <h3 className="text-xl font-bold mb-8">Order Summary</h3>
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-400 uppercase font-bold mt-1">QTY: {item.quantity}</p>
                  <p className="text-sm font-bold text-slate-900 mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-slate-100">
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-slate-900 pt-4 border-t border-slate-50">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Complimentary Priority Delivery</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Estimated arrival in 2-3 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
