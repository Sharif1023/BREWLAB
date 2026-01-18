
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'ICED HAZELNUT LATTE',
    price: '$18.99',
    description: 'Smooth espresso blended with creamy hazelnut and chilled milk.',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400',
  },
  {
    id: 2,
    name: 'COLD BREW DELIGHT',
    price: '$16.99',
    description: 'Slow-steeped coffee with a bold aroma and silky finish.',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
  },
  {
    id: 3,
    name: 'MOCHA FUSION',
    price: '$12.99',
    description: 'Rich chocolate, fresh espresso, and whipped cream perfection.',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
  },
];

const PopularFlavors: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-5xl md:text-7xl font-bebas tracking-wider">POPULAR <span className="text-yellow-400">FLAVORS</span></h2>
        <button className="text-white border border-white/30 px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 hover:bg-white hover:text-[#2D1B14] transition-all">
          <span>View All</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl mb-6 bg-white/5 aspect-[4/5]">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="text-center">
              <span className="text-yellow-400 font-bold text-xl block mb-2">{product.price}</span>
              <h3 className="text-2xl font-bebas tracking-widest mb-3">{product.name}</h3>
              <p className="text-gray-400 text-sm italic leading-relaxed px-4">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularFlavors;
