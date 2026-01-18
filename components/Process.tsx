
import React from 'react';
import { Layers, Droplets, Thermometer, Sparkles } from 'lucide-react';

interface ProcessProps {
  content: {
    title: string;
    subtitle: string;
    img: string;
    items: { title: string; desc: string }[];
  };
}

const Process: React.FC<ProcessProps> = ({ content }) => {
  const icons = [<Sparkles />, <Droplets />, <Thermometer />, <Layers />];

  return (
    <div className="h-full w-full bg-white text-[#2D1B14] flex items-center px-6 overflow-hidden relative">
      {/* Background Accent - Hidden on mobile for cleaner look */}
      <div className="absolute right-0 top-0 h-full w-0 md:w-1/4 bg-[#f8f5f2] -z-0 hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto w-full z-10 overflow-y-auto max-h-full no-scrollbar py-20 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Header Section */}
          <div className="text-center lg:text-left lg:col-span-1">
            <span className="text-yellow-600 text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">Our DNA</span>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-bebas leading-[0.9] lg:leading-[0.85] mb-4 md:mb-6 uppercase">
              {content.title} <br />
              <span className="text-yellow-600">{content.subtitle}</span>
            </h2>
          </div>

          {/* Image Section - Visible on all devices now */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 order-2 lg:order-none">
            <div className="relative group">
              <div className="absolute inset-0 bg-yellow-400/10 blur-[60px] rounded-full lg:hidden"></div>
              <img 
                src={content.img} 
                alt="Process Visual" 
                className="rounded-[30px] md:rounded-[60px] shadow-2xl relative z-10 border-[6px] md:border-[12px] border-[#f8f5f2] lg:rotate-1 w-full h-[220px] sm:h-[300px] md:h-[500px] object-cover transition-transform duration-700 hover:rotate-0" 
              />
              {/* Floating Badge for Mobile Image */}
              <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-black p-3 rounded-xl font-bebas text-xl md:hidden z-20 shadow-xl rotate-[-5deg]">
                PURE CRAFT
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-10 order-3 lg:order-none mt-4 lg:mt-0">
            {content.items.map((item, i) => (
              <div key={i} className="flex items-start gap-4 md:gap-6 group">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#fdfaf7] border border-yellow-100 flex items-center justify-center shrink-0 group-hover:bg-yellow-600 group-hover:text-white transition-all shadow-sm">
                  {icons[i % icons.length] && React.cloneElement(icons[i % icons.length] as React.ReactElement<any>, { className: 'w-5 h-5 md:w-6 md:h-6' })}
                </div>
                <div>
                  <h4 className="font-bebas text-lg md:text-2xl tracking-widest mb-1 uppercase group-hover:text-yellow-600 transition-colors">{item.title}</h4>
                  <p className="text-gray-400 text-[10px] md:text-sm italic leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Process;
