
import React from 'react';
/* Added missing ArrowRight import */
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
    <div className="h-full w-full flex flex-col justify-center items-center relative overflow-hidden bg-[#1A0F0B] pt-20 pb-10">
      {/* Dynamic Lighting Effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-yellow-400/10 blur-[200px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#4A2C2A]/20 blur-[200px] rounded-full"></div>
      </div>

      <div className="z-10 text-center px-4 max-w-7xl flex flex-col items-center">
        <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/5 px-6 py-2.5 rounded-full mb-8 animate-fade-in shadow-2xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
          <span className="text-yellow-400 text-[10px] tracking-[0.5em] font-black uppercase italic">{content.badge}</span>
        </div>
        
        <h1 className="text-7xl md:text-[12rem] lg:text-[16rem] font-bebas leading-[0.8] mb-8 tracking-tighter drop-shadow-2xl uppercase relative">
          <span className="block">{content.titleMain}</span>
          <span className="text-yellow-400 italic block mt-[-2rem] md:mt-[-4rem] opacity-90">{content.titleSub}</span>
          
          {/* Decorative Floating Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-20 hidden lg:flex">
             <span className="text-white/5 text-4xl -rotate-90 tracking-[1em] font-black uppercase">Established MCMXCI</span>
             <span className="text-white/5 text-4xl rotate-90 tracking-[1em] font-black uppercase">Small Batch Craft</span>
          </div>
        </h1>

        <div className="relative group cursor-pointer perspective-2000 mt-[-2rem] md:mt-[-4rem]">
           <div className="absolute inset-0 bg-yellow-400/20 blur-[150px] group-hover:bg-yellow-400/30 transition-all duration-1000"></div>
           <div className="relative p-4 md:p-8 bg-white/5 rounded-[60px] border border-white/10 backdrop-blur-sm transform -rotate-1 group-hover:rotate-0 transition-all duration-[2s]">
             <img 
              src={content.img} 
              alt="Signature Brew" 
              className="w-64 md:w-[450px] h-[350px] md:h-[600px] object-cover rounded-[50px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-2 border-white/5 transition-all duration-[3s] group-hover:scale-[1.05]"
            />
            <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-[30px] shadow-2xl rotate-12 flex flex-col items-center border-8 border-[#1A0F0B] group-hover:rotate-0 transition-all duration-700">
              <span className="text-[#1A0F0B] font-bebas text-5xl leading-none">{content.priceTag}</span>
              <span className="text-yellow-600 text-[10px] font-black tracking-widest uppercase mt-1 italic">Master Roast</span>
            </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-16 md:mt-24 mb-10">
          <button 
            onClick={onOrderClick} 
            className="group bg-yellow-400 text-[#1A0F0B] px-16 py-6 rounded-full text-2xl font-bebas tracking-[0.2em] hover:bg-white transition-all shadow-[0_20px_40px_rgba(234,179,8,0.2)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:-translate-y-1 flex items-center gap-4"
          >
            COMMENCE THE RITUAL
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
          
          <button className="flex items-center gap-4 text-white group relative overflow-hidden px-4 py-2">
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 group-hover:text-[#1A0F0B] transition-all duration-500">
              <Play className="fill-current w-5 h-5 ml-1" />
            </div>
            <span className="font-black tracking-[0.3em] text-[10px] uppercase opacity-40 group-hover:opacity-100 transition-all">SENSORY JOURNEY</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-3 opacity-20 hover:opacity-100 transition-all cursor-pointer group" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
        <span className="text-[10px] tracking-[0.8em] font-black uppercase pl-[0.8em]">Exploration</span>
        <ArrowDown className="w-4 h-4 group-hover:translate-y-2 transition-transform" />
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(3600deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default Hero;
