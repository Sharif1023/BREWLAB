
import React from 'react';
/* Added missing Coffee import */
import { ShoppingCart, Star, Heart, ArrowUpRight, Coffee } from 'lucide-react';
import { Product } from '../App';

interface ShopProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart }) => {
  return (
    <div className="min-h-screen bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="animate-fade-in">
            <span className="text-yellow-600 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Small Batch Boutique</span>
            <h2 className="text-7xl md:text-9xl font-bebas text-[#1A0F0B] leading-[0.85] uppercase">
              Curated <br />
              <span className="italic text-yellow-600 underline decoration-yellow-200">Selections</span>
            </h2>
          </div>
          <div className="flex items-center space-x-4 text-[#1A0F0B] mb-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
             <div className="flex text-yellow-500"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
             <span className="text-[10px] font-black opacity-60 tracking-[0.2em] uppercase">Voted #1 Craft Brew</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col items-center text-center">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[60px] mb-10 bg-[#FAF9F6] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.04)] group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.1)] transition-all duration-700 transform group-hover:-translate-y-4">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                
                <div className="absolute top-8 right-8 z-20">
                   <button className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 transition-all shadow-xl active:scale-90">
                      <Heart size={24} />
                   </button>
                </div>

                <div className="absolute inset-x-8 bottom-8 z-20 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                   <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full bg-[#1A0F0B] text-white py-6 rounded-3xl font-bebas text-2xl tracking-widest hover:bg-yellow-400 hover:text-[#1A0F0B] transition-all shadow-2xl flex items-center justify-center gap-3"
                    >
                      <ShoppingCart size={20} /> ACQUIRE ITEM
                    </button>
                </div>
              </div>
              
              <div className="px-6 space-y-4 max-w-sm">
                <div className="space-y-2">
                  <h3 className="text-4xl font-bebas tracking-widest text-[#1A0F0B] uppercase">{product.name}</h3>
                  <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full group-hover:w-24 transition-all duration-500"></div>
                </div>
                
                <p className="text-gray-400 text-sm italic leading-relaxed px-4">
                  {product.description}
                </p>
                
                <div className="pt-4">
                  <span className="text-4xl font-bebas text-yellow-600">${product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
          
          {products.length === 0 && (
            <div className="col-span-full py-40 text-center border-2 border-dashed border-gray-100 rounded-[60px]">
               <Coffee size={48} className="mx-auto text-gray-200 mb-6" />
               <p className="text-gray-400 font-bebas text-3xl tracking-widest uppercase">The boutique is resting.</p>
               <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-2 italic">New drops coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
