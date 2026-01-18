
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const JoinUs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
      <h2 className="text-6xl md:text-[8rem] font-bebas text-[#2D1B14] leading-[0.9] mb-8">
        JOIN OUR <span className="text-white">COMMUNITY</span> OF COFFEE LOVERS
      </h2>
      <p className="text-[#2D1B14] text-lg font-medium max-w-2xl mx-auto mb-12 italic">
        Our subscription service will keep you up-to-date on new roasts, special offers, and brewing tips that we have to offer.
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <button className="bg-[#2D1B14] text-white px-10 py-5 rounded-full text-xl font-bold flex items-center space-x-3 hover:bg-black transition-colors group">
          <span>Join Now</span>
          <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default JoinUs;
