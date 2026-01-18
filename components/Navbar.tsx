
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Settings, Coffee, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onAdminClick: () => void;
  showAdminBadge?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onAdminClick, showAdminBadge }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.snap-container');
    const handleScroll = () => {
      setIsScrolled((container?.scrollTop || 0) > 50);
    };
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 ${isScrolled ? 'bg-[#1A0F0B]/80 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center h-12">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group"
            >
              <Menu size={20} className="text-yellow-400 group-hover:scale-110 transition-transform" />
            </button>
            <div className="hidden lg:flex items-center space-x-8 text-[10px] tracking-[0.4em] font-bold uppercase text-white/40">
              <button onClick={() => scrollTo('home')} className="hover:text-yellow-400 transition-colors">Intro</button>
              <button onClick={() => scrollTo('shop')} className="hover:text-yellow-400 transition-colors">Boutique</button>
            </div>
          </div>

          <div 
            className="text-2xl md:text-3xl font-bebas tracking-[0.3em] cursor-pointer flex items-center gap-3 absolute left-1/2 -translate-x-1/2 group" 
            onClick={() => scrollTo('home')}
          >
            <div className="w-10 h-10 bg-[#2D1B14] rounded-xl flex items-center justify-center shadow-2xl border border-white/5 group-hover:bg-yellow-400 transition-all">
              <Coffee className="text-yellow-400 w-6 h-6 group-hover:text-black transition-colors" />
            </div>
            <span className="hidden sm:inline">BREWLAB</span>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4">
            <button onClick={onAdminClick} className={`relative p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all ${showAdminBadge ? 'text-yellow-400' : 'text-white/40'}`}>
              <Settings className="w-5 h-5" />
              {showAdminBadge && <ShieldCheck className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 fill-[#1A0F0B]" />}
            </button>
            
            <button onClick={onCartClick} className="relative p-3 bg-yellow-400 hover:bg-yellow-300 rounded-2xl transition-all shadow-lg group">
              <ShoppingBag className="w-5 h-5 text-[#1A0F0B]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#1A0F0B] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-xl border-2 border-yellow-400">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Exclusive Side Menubar */}
      <div className={`fixed inset-0 z-[100] transition-all duration-700 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-[#1A0F0B]/90 backdrop-blur-xl transition-opacity duration-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <aside className={`absolute top-0 left-0 h-full w-full max-w-md bg-[#2D1B14] p-12 transition-transform duration-700 ease-out flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Coffee className="text-black w-5 h-5" />
              </div>
              <span className="font-bebas text-2xl tracking-widest pt-1">BREWLAB</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-4 hover:bg-white/5 rounded-full transition-all">
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          <nav className="flex-1 space-y-8">
            <p className="text-[10px] font-bold text-gray-500 tracking-[0.5em] uppercase mb-10">Navigation</p>
            {[
              { id: 'home', label: 'THE EXPERIENCE' },
              { id: 'process', label: 'CRAFT & DNA' },
              { id: 'benefits', label: 'HEALTH PROTOCOL' },
              { id: 'shop', label: 'CURATED SHOP' }
            ].map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="flex items-center justify-between w-full group text-left"
              >
                <span className="text-4xl md:text-5xl font-bebas tracking-widest text-white/40 group-hover:text-white transition-all transform group-hover:translate-x-4">
                  {link.label}
                </span>
                <ArrowRight className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-white/5">
            <div className="flex gap-6">
              <a href="#" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">INSTAGRAM</a>
              <a href="#" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">TWITTER</a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
