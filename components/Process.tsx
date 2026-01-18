
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
    <div className="h-full w-full bg-white text-[#2D1B14] flex items-center px-6 overflow-hidden relative pt-10">
      <div className="absolute right-0 top-0 h-full w-1/4 bg-[#f8f5f2] -z-0"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center z-10 w-full overflow-y-auto max-h-screen no-scrollbar">
        <div className="space-y-8 md:space-y-12">
          <div>
            <span className="text-yellow-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">Our DNA</span>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bebas leading-[0.85] mb-6 uppercase">
              {content.title} <br />
              <span className="text-yellow-600">{content.subtitle}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-10">
            {content.items.map((item, i) => (
              <div key={i} className="flex items-start gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#fdfaf7] border border-yellow-100 flex items-center justify-center shrink-0 group-hover:bg-yellow-600 group-hover:text-white transition-all">
                  {/* Fixed: Cast the element to React.ReactElement<any> to allow 'className' prop in cloneElement */}
                  {icons[i % icons.length] && React.cloneElement(icons[i % icons.length] as React.ReactElement<any>, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h4 className="font-bebas text-xl md:text-2xl tracking-widest mb-1 uppercase">{item.title}</h4>
                  <p className="text-gray-400 text-xs md:text-sm italic">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden md:block">
          <img src={content.img} alt="Process" className="rounded-[60px] shadow-2xl relative z-10 border-[12px] border-[#f8f5f2] transform rotate-2 w-full h-[500px] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Process;
