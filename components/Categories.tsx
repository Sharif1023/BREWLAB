
import React from 'react';

const categories = [
  { id: 1, name: 'SHOP BUNDLES', img: 'https://images.unsplash.com/photo-1559056191-7590b82e52e4?w=400' },
  { id: 2, name: 'SHOP CAPSULES', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400' },
  { id: 3, name: 'DARK ROAST', img: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=400' },
  { id: 4, name: 'MEDIUM ROAST', img: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400' },
  { id: 5, name: 'SHOP ORGANIC', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400' },
];

const Categories: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto text-black">
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 md:w-32 md:h-32 mb-4 rounded-full overflow-hidden border-2 border-transparent group-hover:border-yellow-500 transition-all duration-300 shadow-md">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-xs font-bold tracking-widest text-gray-500 group-hover:text-black transition-colors">{cat.name}</span>
          </div>
        ))}
      </div>

      <div className="text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bebas leading-tight mb-8">
          WE BELIEVE COFFEE IS MORE THAN A DRINK IT'S A RITUAL. WE SOURCE PREMIUM BEANS, ROAST IN SMALL BATCHES, & DELIVER
        </h2>
      </div>
    </div>
  );
};

export default Categories;
