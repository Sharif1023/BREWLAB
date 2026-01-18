
import React from 'react';

const FeatureItem: React.FC<{ title: string; desc: string; side: 'left' | 'right' }> = ({ title, desc, side }) => (
  <div className={`mb-12 ${side === 'right' ? 'text-right' : 'text-left'}`}>
    <h3 className="text-2xl font-bebas tracking-widest text-[#2D1B14] mb-2">{title}</h3>
    <div className={`w-12 h-1 bg-yellow-400 mb-4 ${side === 'right' ? 'ml-auto' : 'mr-auto'}`}></div>
    <p className="text-gray-600 text-sm leading-relaxed max-w-xs inline-block italic">
      {desc}
    </p>
  </div>
);

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
      <div className="relative w-full flex flex-col md:flex-row items-center justify-between">
        {/* Left Side */}
        <div className="w-full md:w-1/3 z-10">
          <FeatureItem 
            title="PREMIUM QUALITY" 
            desc="Beans that have been hand-picked from the best coffee regions around the world have been used to make this coffee." 
            side="left"
          />
          <FeatureItem 
            title="EXPERT ROASTING" 
            desc="The best way to make sure that every cup of coffee has the perfect flavor is to roast it in small batches." 
            side="left"
          />
        </div>

        {/* Center Image */}
        <div className="w-full md:w-1/3 flex justify-center mb-12 md:mb-0">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full scale-150"></div>
            <img 
              src="https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=400" 
              alt="Coffee Splash" 
              className="relative z-10 w-80 h-80 object-cover rounded-full shadow-2xl"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 z-10">
          <FeatureItem 
            title="SUSTAINABLE" 
            desc="From farms that are committed to caring for the environment, our produce is ethically sourced." 
            side="right"
          />
          <FeatureItem 
            title="FRESH ALWAYS" 
            desc="Our products are roasted to order and they are delivered within days of the roasting process." 
            side="right"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
