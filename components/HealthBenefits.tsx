
import React from 'react';
import { Heart, Zap, Shield, Brain } from 'lucide-react';

const HealthBenefits: React.FC = () => {
  const benefits = [
    { icon: <Zap />, title: "SUSTAINED ENERGY", desc: "Our 24-hour slow infusion process extracts cleaner caffeine for 6 hours of focus." },
    { icon: <Shield />, title: "IMMUNITY BOOSTER", desc: "Loaded with chlorogenic acids and polyphenols that fight oxidative stress." },
    { icon: <Heart />, title: "GUT FRIENDLY", desc: "67% less acidic than heated coffee. Safe for sensitive stomachs." },
    { icon: <Brain />, title: "COGNITIVE EDGE", desc: "Roasted to preserve terpenes that enhance mental clarity." }
  ];

  return (
    <div className="h-full w-full bg-[#2D1B14] flex flex-col justify-center px-6 relative overflow-hidden py-20">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-400/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full z-10 overflow-y-auto no-scrollbar">
        <div className="text-center mb-12 md:mb-24 animate-fade-in">
          <span className="text-yellow-400 text-[10px] md:text-xs font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase mb-3 block">Bio-Active Coffee</span>
          <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bebas leading-[0.9] md:leading-[0.8] mb-6 md:mb-8">BETTER FOR <br /><span className="text-yellow-400">YOU.</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto italic text-sm md:text-lg leading-relaxed">A scientific approach to performance. No chemicals, just nature refined to perfection.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="p-6 md:p-10 border border-white/5 bg-white/[0.02] rounded-[30px] md:rounded-[50px] hover:bg-yellow-400 hover:text-black transition-all duration-500 group cursor-default relative overflow-hidden">
              <div className="mb-6 md:mb-10 text-yellow-400 group-hover:text-black transition-colors transform group-hover:scale-110 duration-500 origin-left">
                {React.cloneElement(b.icon as React.ReactElement<any>, { size: window.innerWidth < 768 ? 24 : 40 })}
              </div>
              <h3 className="text-xl md:text-3xl font-bebas tracking-widest mb-4 md:mb-6">{b.title}</h3>
              <p className="text-[11px] md:text-sm opacity-40 group-hover:opacity-100 italic leading-snug md:leading-relaxed transition-opacity">
                {b.desc}
              </p>
              
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 text-7xl md:text-9xl font-bebas opacity-[0.02] group-hover:opacity-10 transition-opacity">0{i+1}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-24 p-8 md:p-12 bg-white/5 border border-white/10 rounded-[35px] md:rounded-[60px] flex flex-col sm:flex-row items-center justify-between gap-8 md:gap-10">
           <div className="text-center sm:text-left">
              <h4 className="text-2xl md:text-4xl font-bebas leading-none mb-2 md:mb-3 italic">READY TO EVOLVE?</h4>
              <p className="font-bold opacity-30 tracking-widest text-[8px] md:text-[10px] uppercase">Join the BrewLab performance protocol.</p>
           </div>
           <button 
             onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
             className="w-full sm:w-auto bg-yellow-400 text-black px-10 md:px-12 py-4 md:py-5 rounded-full font-bebas tracking-[0.2em] text-lg md:text-xl hover:scale-105 transition-transform shadow-lg"
           >
              GET THE BOX
           </button>
        </div>
      </div>
    </div>
  );
};

export default HealthBenefits;
