
import React from 'react';

const reviews = [
  {
    text: "I'VE TRIED COFFEE FROM ALL OVER THE CITY, AND THIS PLACE IS HANDS DOWN MY FAVORITE. THE ESPRESSO IS RICH AND SMOOTH.",
    author: "Sarah Thompson",
    role: "Coffee Enthusiast",
    img: "https://picsum.photos/100/100?random=1"
  },
  {
    text: "I'VE TRIED MANY COFFEE BRANDS, BUT BREWLAB IS THE ONLY ONE I KEEP COMING BACK TO. WORTH EVERY PENNY!",
    author: "Michael Chen",
    role: "Photographer",
    img: "https://picsum.photos/100/100?random=2"
  },
  {
    text: "BREWLAB'S ATTENTION TO QUALITY IS UNMATCHED. EVERY BAG IS CONSISTENTLY EXCELLENT AND THE FRESHNESS IS REMARKABLE.",
    author: "Emma Davis",
    role: "Designer",
    img: "https://picsum.photos/100/100?random=3"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-center">
      <h2 className="text-4xl md:text-6xl font-bebas mb-16 tracking-wider">
        IT'S OUR <span className="text-yellow-400">CUSTOMERS</span> WHO LOVE US
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {reviews.map((rev, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-yellow-400 text-6xl font-serif mb-6 leading-none">“</div>
            <p className="text-lg text-gray-300 font-medium italic mb-10 leading-relaxed px-4">
              {rev.text}
            </p>
            <div className="flex items-center space-x-4">
              <img src={rev.img} alt={rev.author} className="w-12 h-12 rounded-full grayscale border border-white/20" />
              <div className="text-left">
                <h4 className="font-bold text-sm uppercase tracking-widest">{rev.author}</h4>
                <p className="text-xs text-gray-500">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
