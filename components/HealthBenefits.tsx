
import React from 'react';
import { Heart, Zap, Shield, Brain } from 'lucide-react';

const HealthBenefits: React.FC = () => {
  const benefits = [
    { icon: <Zap />, title: "SUSTAINED ENERGY", desc: "Our 24-hour slow infusion process extracts cleaner caffeine for 6 hours of focus without the crash." },
    { icon: <Shield />, title: "IMMUNITY BOOSTER", desc: "Loaded with chlorogenic acids and polyphenols that naturally fight oxidative stress." },
    { icon: <Heart />, title: "GUT FRIENDLY", desc: "Because it's never heated, it's 67% less acidic. Safe for sensitive stomachs and tooth enamel." },
    { icon: <Brain />, title: "COGNITIVE EDGE", desc: "Specifically roasted to preserve terpenes that enhance mental clarity and flow-state." }
  ];

  return (
    <div className="h-full w-full bg-[#2D1B14] flex flex-col justify-center px-6 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="text-center mb-24 animate-fade-in">
          <span className="text-yellow-400 text-xs font-bold tracking-[0.5em] uppercase mb-4 block">Bio-Active Coffee</span>
          <h2 className="text-7xl md:text-[10rem] font-bebas leading-[0.8] mb-8">BETTER FOR <br /><span className="text-yellow-400">YOU.</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto italic text-lg leading-relaxed">Most coffee is burnt and acidic. BrewLab is a scientific approach to morning performance. No chemicals, just nature refined.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="p-10 border border-white/5 bg-white/[0.02] rounded-[50px] hover:bg-yellow-400 hover:text-black transition-all duration-700 group cursor-default relative overflow-hidden">
              <div className="mb-10 text-yellow-400 group-hover:text-black transition-colors transform group-hover:scale-125 duration-500 origin-left">
                {/* Fixed: Cast b.icon to React.ReactElement<any> to allow the 'size' prop in cloneElement */}
                {React.cloneElement(b.icon as React.ReactElement<any>, { size: 40 })}
              </div>
              <h3 className="text-3xl font-bebas tracking-widest mb-6">{b.title}</h3>
              <p className="text-sm opacity-40 group-hover:opacity-100 italic leading-relaxed transition-opacity">
                {b.desc}
              </p>
              
              <div className="absolute -bottom-6 -right-6 text-9xl font-bebas opacity-[0.02] group-hover:opacity-10 transition-opacity">0{i+1}</div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white/5 border border-white/10 rounded-[60px] flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="text-left">
              <h4 className="text-4xl font-bebas leading-none mb-3 italic">READY TO FEEL THE DIFFERENCE?</h4>
              <p className="font-bold opacity-40 tracking-widest text-[10px] uppercase">Join 50,000+ high-performers fueled by BrewLab.</p>
           </div>
           <button 
             onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
             className="bg-yellow-400 text-black px-12 py-5 rounded-full font-bebas tracking-[0.2em] text-xl hover:scale-105 transition-transform"
           >
              GET THE BOX
           </button>
        </div>
      </div>
    </div>
  );
};

export default HealthBenefits;
