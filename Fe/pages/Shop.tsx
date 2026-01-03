
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid3X3, List, ChevronDown, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { useProduct } from '@/context/ProductContext';
import { formatRupiah } from '@/helpers/Formatings';

// Custom hook untuk debouncing
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(200000);
  const debouncedMaxPrice = useDebounce(localMaxPrice, 500); // 500ms delay
  const { 
    products, 
    loading, 
    error, 
    sort, 
    setSort, 
    Category: selectedCategory, 
    setCategory,
    setMinPrice,
    setMaxPrice
  } = useProduct();

  // Efek untuk memperbarui filter harga pada perubahan nilai yang di-debounce
  useEffect(() => {
    setMinPrice(0);
    setMaxPrice(debouncedMaxPrice);
  }, [debouncedMaxPrice, setMinPrice, setMaxPrice]);

  const ProductSkeleton: React.FC<{ viewMode: 'grid' | 'list' }> = ({ viewMode }) => {
    if (viewMode === 'list') {
      return (
        <div className="group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col sm:flex-row gap-4 md:gap-8 animate-pulse">
          <div className="w-full sm:w-48 md:w-64 h-48 md:h-64 flex-shrink-0 bg-slate-200"></div>
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center space-y-4">
            <div className="h-3 bg-slate-200 rounded w-1/4"></div>
            <div className="h-5 bg-slate-200 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/2 mt-2"></div>
            <div className="flex items-center gap-3 md:gap-4 mt-4">
              <div className="flex-1 h-12 bg-slate-200 rounded-xl"></div>
              <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="group flex flex-col animate-pulse">
        <div className="relative aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden bg-slate-200"></div>
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-5 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  };

  const allCategories = [...new Set(products.map(p => p.category.name.toUpperCase()))].sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Catalog</h1>
          <p className="text-slate-500 mt-1 md:mt-2 text-sm md:text-base">Showing {!loading ? products.length : '...'} premium selections</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <div className="relative group flex-1 sm:flex-none">
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="appearance-none bg-white border border-slate-200 px-4 md:px-6 py-2.5 md:py-3 pr-10 md:pr-12 rounded-xl text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer w-full"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 md:p-3 ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
            >
              <Grid3X3 className="w-4 h-4 md:w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 md:p-3 ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
            >
              <List className="w-4 h-4 md:w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-8 md:space-y-10">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-900">Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              {['all', ...allCategories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat as any)}
                  className={`block w-full text-left px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-medium transition-all ${
                    selectedCategory === cat 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-900">Price Range</h3>
            <div className="px-2">
              <input 
                type="range" 
                className="w-full accent-emerald-600" 
                min="0" 
                max="200000" 
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
              />
              <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-bold">
                <span>Rp 0</span>
                <span>{formatRupiah(localMaxPrice)}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-[2rem] text-white space-y-3 md:space-y-4 hidden lg:block">
            <ShoppingBag className="w-8 h-8 text-emerald-500" />
            <h4 className="font-bold text-sm md:text-base">Need assistance?</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">Our AI shopping assistant can help you find exactly what you're looking for.</p>
            <button className="w-full bg-white text-slate-900 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold hover:bg-emerald-500 hover:text-white transition-colors">
              Chat with AI
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading && (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6 md:gap-8`}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} viewMode={viewMode} />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-24 text-red-500">Error: {error}</div>
          )}

          {!loading && !error && (
            <>
              {products.length > 0 ? (
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6 md:gap-8`}>
                  {products.map(product => (
                    <div key={product.id} className={`group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${viewMode === 'list' ? 'flex flex-col sm:flex-row gap-4 md:gap-8' : ''}`}>
                      <Link 
                        to={`/product/${product.id}`} 
                        className={`block relative overflow-hidden bg-slate-50 ${viewMode === 'list' ? 'w-full sm:w-48 md:w-64 h-48 md:h-64 flex-shrink-0' : 'aspect-square'}`}
                      >
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        {product.featured && (
                          <div className="absolute top-4 left-4 bg-slate-900 text-white text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                            Premium Choice
                          </div>
                        )}
                      </Link>

                      <div className={`p-6 md:p-8 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                        <div className="mb-4">
                          <p className="text-[9px] md:text-[10px] text-emerald-600 font-bold uppercase mb-1">{product.category?.name ?? '-'}</p>
                          <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {product.name}
                          </h3>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-slate-900 mb-5 md:mb-6">{formatRupiah(product.price)}</p>
                        <div className="flex items-center gap-3 md:gap-4">
                          <button 
                            onClick={() => onAddToCart(product)}
                            className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 md:w-4 h-4" /> Add to Cart
                          </button>
                          <button className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                            <Heart className="w-4 h-4 md:w-5 h-5 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 space-y-4 col-span-full">
                  <p className="text-slate-400 text-base md:text-lg">No products found matching your criteria.</p>
                  <button 
                    onClick={() => setCategory('all' as any)}
                    className="text-emerald-600 font-bold hover:underline text-sm md:text-base"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
