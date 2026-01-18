
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D1B14] pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-8xl font-bebas tracking-[0.2em] mb-12">BREWLAB</h2>
            <div className="max-w-md">
              <p className="text-gray-400 mb-8 italic">
                Get the latest brewing tips and news delivered directly to your inbox. Stay connected with the coffee culture.
              </p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="your email" 
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-yellow-400 transition-colors"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 font-bold uppercase tracking-widest text-sm hover:text-yellow-400 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-500 mb-8 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              {['About Us', 'Benefits', 'Shop', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-yellow-400 transition-colors inline-block">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-500 mb-8 uppercase tracking-widest text-xs">Socials</h4>
            <ul className="space-y-4">
              {['Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'Facebook'].map((link) => (
                <li key={link}>
                  <a href="#" className="flex items-center space-x-2 group">
                    <span className="group-hover:text-yellow-400 transition-colors">{link}</span>
                    <ArrowUpRight className="w-3 h-3 text-gray-600 group-hover:text-yellow-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 tracking-widest">
          <p>© 2024 BREWLAB COFFEE CO. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
