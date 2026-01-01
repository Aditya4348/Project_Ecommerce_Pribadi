
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Shield, Truck, RefreshCcw, ShoppingBag, Heart, Plus, Minus, Send, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { getProductAdvice } from '../services/geminiService';

interface ProductDetailProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const found = MOCK_PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  const handleAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || !product) return;

    setIsAiLoading(true);
    const context = `Product: ${product.name}, Description: ${product.description}, Price: ${product.price}, Category: ${product.category}`;
    const response = await getProductAdvice(aiQuery, context);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        {/* Gallery */}
        <div className="space-y-4 md:space-y-6">
          <div className="aspect-square bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl md:rounded-2xl bg-slate-100 overflow-hidden cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all">
                <img src={`https://picsum.photos/seed/${product.id}${i}/400/400`} alt="Detail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8 md:space-y-10">
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 md:w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">({product.reviews} Reviews)</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">{product.name}</h1>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-4 md:mt-6">${product.price}</p>
          </div>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
            {product.description}
          </p>

          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6">
              <div className="flex items-center justify-between border border-slate-200 rounded-xl px-4 py-2 sm:py-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:text-emerald-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-base md:text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:text-emerald-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-slate-900 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-base hover:bg-emerald-600 transition-all transform hover:-translate-y-1 shadow-xl shadow-slate-200"
              >
                Add to Cart
              </button>
              <button className="hidden sm:block p-4 md:p-5 border border-slate-200 rounded-xl md:rounded-2xl hover:bg-slate-50 transition-colors">
                <Heart className="w-5 h-5 md:w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            {product.stock < 10 && (
              <p className="text-red-500 text-xs md:text-sm font-bold flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 md:w-4 h-4" /> Only {product.stock} left in stock - order soon!
              </p>
            )}
          </div>

          {/* AI Assistant */}
          <div className="bg-emerald-50 rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-3 md:space-y-4 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-widest text-[10px] md:text-xs">
              <Sparkles className="w-3.5 h-3.5 md:w-4 h-4" /> Ask the AI Expert
            </div>
            <p className="text-slate-600 text-xs md:text-sm">Have questions about this item? Ask our concierge.</p>
            <form onSubmit={handleAiChat} className="flex gap-2">
              <input 
                type="text" 
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Is this good for travel?" 
                className="flex-1 bg-white border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
              />
              <button 
                disabled={isAiLoading}
                className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isAiLoading ? <RefreshCcw className="w-4 h-4 md:w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 md:w-5 h-5" />}
              </button>
            </form>
            {aiResponse && (
              <div className="bg-white p-4 rounded-xl text-xs md:text-sm text-slate-700 animate-in fade-in slide-in-from-top-2">
                {aiResponse}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-10 border-t border-slate-100">
            <div className="flex flex-col items-center text-center p-3 md:p-4">
              <Truck className="w-5 h-5 md:w-6 h-6 text-emerald-600 mb-2" />
              <span className="text-xs md:text-sm font-bold text-slate-900">Free Express Delivery</span>
              <span className="text-[9px] md:text-[10px] text-slate-500 uppercase">On orders over $500</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 md:p-4">
              <Shield className="w-5 h-5 md:w-6 h-6 text-emerald-600 mb-2" />
              <span className="text-xs md:text-sm font-bold text-slate-900">2 Year Warranty</span>
              <span className="text-[9px] md:text-[10px] text-slate-500 uppercase">Premium protection</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 md:p-4">
              <RefreshCcw className="w-5 h-5 md:w-6 h-6 text-emerald-600 mb-2" />
              <span className="text-xs md:text-sm font-bold text-slate-900">Easy Returns</span>
              <span className="text-[9px] md:text-[10px] text-slate-500 uppercase">30-day satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-24 md:mt-32">
        <div className="flex gap-6 md:gap-12 border-b border-slate-100 mb-8 md:mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-4 text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'description' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Description
            {activeTab === 'description' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('specs')}
            className={`pb-4 text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'specs' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Specifications
            {activeTab === 'specs' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'reviews' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Reviews ({product.reviews})
            {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full" />}
          </button>
        </div>

        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-2">
          {activeTab === 'description' && (
            <div className="space-y-4 md:space-y-6 text-slate-600 leading-relaxed text-base md:text-lg font-light">
              <p>Designed for those who refuse to compromise on quality, the {product.name} represents the future of {product.category.toLowerCase()}.</p>
              <p>Every element has been meticulously engineered to provide an unparalleled user experience. From the high-grade materials used in construction to the intuitive interface, this product stands as a testament to our commitment to excellence.</p>
              <ul className="space-y-3 md:space-y-4 pt-2 md:pt-4">
                <li className="flex items-start gap-3 text-sm md:text-base">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>Precision-tuned internal components for maximum efficiency.</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>Ergonomic design language tailored for comfort and durability.</span>
                </li>
              </ul>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-12 md:gap-x-20">
              {[
                { label: 'SKU', value: product.sku },
                { label: 'Weight', value: '1.2 kg' },
                { label: 'Dimensions', value: '25 x 15 x 10 cm' },
                { label: 'Material', value: 'Aerospace-grade Aluminum' },
                { label: 'Battery Life', value: 'Up to 24 hours' },
                { label: 'Connectivity', value: 'Bluetooth 5.2, USB-C' }
              ].map((spec, i) => (
                <div key={i} className="flex justify-between py-3 md:py-4 border-b border-slate-50 text-sm md:text-base">
                  <span className="text-slate-500 font-medium">{spec.label}</span>
                  <span className="text-slate-900 font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-10 md:space-y-12">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">U{i}</div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm md:text-base">User {i}</p>
                        <p className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-tighter">Verified Purchase</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-light italic text-sm md:text-base">"Exceeded all my expectations. The build quality is simply stunning and it performs flawlessly every time."</p>
                </div>
              ))}
              <button className="text-emerald-600 font-bold hover:underline text-sm md:text-base">Read All {product.reviews} Reviews</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
