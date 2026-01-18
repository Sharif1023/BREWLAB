
import React from 'react';
import { ShoppingCart, Star, Heart, Coffee } from 'lucide-react';
import { Product } from '../App';

interface ShopProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart }) => {
  return (
    <div className="min-h-screen bg-white py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-24 gap-6 md:gap-8 text-center md:text-left">
          <div className="animate-fade-in w-full">
            <span className="text-yellow-600 font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px] mb-3 md:mb-4 block">Boutique Drops</span>
            <h2 className="text-5xl md:text-9xl font-bebas text-[#1A0F0B] leading-[0.9] md:leading-[0.85] uppercase">
              Curated <br />
              <span className="italic text-yellow-600 underline decoration-yellow-200">Selections</span>
            </h2>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4 text-[#1A0F0B] mb-2 md:mb-4 bg-gray-50 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-gray-100">
             <div className="flex text-yellow-500"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
             <span className="text-[8px] md:text-[10px] font-black opacity-60 tracking-[0.1em] md:tracking-[0.2em] uppercase">Voted #1 Craft</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col items-center text-center w-full">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[30px] md:rounded-[60px] mb-6 md:mb-10 bg-[#FAF9F6] border border-gray-100 shadow-md transition-all duration-700 transform group-hover:-translate-y-2 md:group-hover:-translate-y-4">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
                   <button className="w-10 h-10 md:w-14 md:h-14 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 transition-all shadow-lg">
                      <Heart size={20} />
                   </button>
                </div>

                <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8 z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-8 lg:group-hover:translate-y-0 transition-all duration-500">
                   <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full bg-[#1A0F0B] text-white py-4 md:py-6 rounded-2xl md:rounded-3xl font-bebas text-lg md:text-2xl tracking-widest hover:bg-yellow-400 hover:text-[#1A0F0B] transition-all shadow-xl flex items-center justify-center gap-2 md:gap-3"
                    >
                      <ShoppingCart size={18} /> ACQUIRE
                    </button>
                </div>
              </div>
              
              <div className="px-2 space-y-2 md:space-y-4 max-w-sm">
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-bebas tracking-widest text-[#1A0F0B] uppercase">{product.name}</h3>
                  <div className="w-8 h-0.5 bg-yellow-400 mx-auto rounded-full group-hover:w-16 transition-all duration-500"></div>
                </div>
                
                <p className="text-gray-400 text-[11px] md:text-sm italic leading-tight md:leading-relaxed px-2">
                  {product.description}
                </p>
                
                <div className="pt-2">
                  <span className="text-3xl md:text-4xl font-bebas text-yellow-600">${product.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
          
          {products.length === 0 && (
            <div className="col-span-full py-24 md:py-40 text-center border-2 border-dashed border-gray-100 rounded-[30px] md:rounded-[60px]">
               <Coffee size={36} className="mx-auto text-gray-200 mb-4 md:mb-6" />
               <p className="text-gray-400 font-bebas text-2xl md:text-3xl tracking-widest uppercase">Vault is locked.</p>
               <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1 md:mt-2 italic">Restocking next batch...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
