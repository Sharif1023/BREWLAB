
import React from 'react';
import { ArrowDown, Play, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  content: {
    badge: string;
    titleMain: string;
    titleSub: string;
    img: string;
    priceTag: string;
  };
  onOrderClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ content, onOrderClick }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative overflow-hidden bg-[#1A0F0B] pt-16 md:pt-20 pb-10">
      {/* Dynamic Lighting Effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] right-[-10%] w-[100%] h-[80%] bg-yellow-400/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#4A2C2A]/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="z-10 text-center px-6 max-w-7xl flex flex-col items-center w-full">
        <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/5 px-4 md:px-6 py-2 rounded-full mb-6 md:mb-8 animate-fade-in shadow-2xl backdrop-blur-md">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 animate-spin-slow" />
          <span className="text-yellow-400 text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] font-black uppercase italic">{content.badge}</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[16rem] font-bebas leading-[0.9] md:leading-[0.8] mb-6 md:mb-8 tracking-tighter drop-shadow-2xl uppercase relative">
          <span className="block">{content.titleMain}</span>
          <span className="text-yellow-400 italic block mt-[-0.5rem] md:mt-[-4rem] opacity-90">{content.titleSub}</span>
          
          {/* Decorative Floating Text - Hidden on mobile */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-20 hidden lg:flex">
             <span className="text-white/5 text-4xl -rotate-90 tracking-[1em] font-black uppercase">Established MCMXCI</span>
             <span className="text-white/5 text-4xl rotate-90 tracking-[1em] font-black uppercase">Small Batch Craft</span>
          </div>
        </h1>

        <div className="relative group cursor-pointer perspective-2000 mt-0 md:mt-[-4rem]">
           <div className="absolute inset-0 bg-yellow-400/10 blur-[80px] md:blur-[150px] group-hover:bg-yellow-400/20 transition-all duration-1000"></div>
           <div className="relative p-2 md:p-8 bg-white/5 rounded-[40px] md:rounded-[60px] border border-white/10 backdrop-blur-sm transform -rotate-1 group-hover:rotate-0 transition-all duration-[2s]">
             <img 
              src={content.img} 
              alt="Signature Brew" 
              className="w-48 sm:w-64 md:w-[450px] h-[300px] sm:h-[350px] md:h-[600px] object-cover rounded-[35px] md:rounded-[50px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-[3s] group-hover:scale-[1.05]"
            />
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-4 md:p-6 rounded-[20px] md:rounded-[30px] shadow-2xl rotate-12 flex flex-col items-center border-4 md:border-8 border-[#1A0F0B] group-hover:rotate-0 transition-all duration-700">
              <span className="text-[#1A0F0B] font-bebas text-3xl md:text-5xl leading-none">{content.priceTag}</span>
              <span className="text-yellow-600 text-[8px] md:text-[10px] font-black tracking-widest uppercase mt-1 italic">Master Roast</span>
            </div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mt-12 md:mt-24 mb-10 w-full px-4">
          <button 
            onClick={onOrderClick} 
            className="w-full sm:w-auto group bg-yellow-400 text-[#1A0F0B] px-8 md:px-16 py-4 md:py-6 rounded-full text-xl md:text-2xl font-bebas tracking-[0.2em] hover:bg-white transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-4"
          >
            COMMENCE RITUAL
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
          
          <button className="flex items-center gap-4 text-white group relative px-4 py-2">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 group-hover:text-[#1A0F0B] transition-all duration-500">
              <Play className="fill-current w-4 h-4 md:w-5 md:h-5 ml-1" />
            </div>
            <span className="font-black tracking-[0.3em] text-[8px] md:text-[10px] uppercase opacity-40 group-hover:opacity-100 transition-all">SENSORY JOURNEY</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 flex flex-col items-center gap-2 opacity-20 hover:opacity-100 transition-all cursor-pointer group" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
        <span className="text-[8px] tracking-[0.6em] font-black uppercase pl-[0.6em]">Scroll</span>
        <ArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default Hero;
