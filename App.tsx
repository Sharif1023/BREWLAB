
import React, { useState, useEffect } from 'react';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Process from './components/Process';
import HealthBenefits from './components/HealthBenefits';
import Shop from './components/Shop';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminPanel from './components/AdminPanel';

// Supabase Configuration using provided credentials as defaults
const supabaseUrl = process.env.SUPABASE_URL || 'https://wdnsmagblzjtbtztwjwm.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbnNtYWdibHpqdGJ0enR3andtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NDAzMzQsImV4cCI6MjA4NDMxNjMzNH0.CtnCFA-jtTCorpasSwvRfGLqsQTPxpsl5bTHhGLttdw';

// Initialize Supabase
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  img: string;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
}

export interface SiteContent {
  hero: {
    badge: string;
    titleMain: string;
    titleSub: string;
    img: string;
    priceTag: string;
  };
  process: {
    title: string;
    subtitle: string;
    img: string;
    items: { title: string; desc: string }[];
  };
}

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "Award Winning Brew 2025",
    titleMain: "BREWED FOR",
    titleSub: "LEGENDS",
    img: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?q=80&w=800",
    priceTag: "$18"
  },
  process: {
    title: "EXCLUSIVE",
    subtitle: "ELEMENTS",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800",
    items: [
      { title: "VOLCANIC BEANS", desc: "Single-origin Arabica sourced from 2,100m altitude volcanic soil." },
      { title: "PURE ALKALINE WATER", desc: "Ph-balanced spring water treated through reverse osmosis." },
      { title: "COLD-FILTERED (4°C)", desc: "Slow steeped for 24 hours at exact temperatures." },
      { title: "NITRO CHARGED", desc: "Infused with molecular nitrogen for a creamy texture." }
    ]
  }
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(localStorage.getItem('brewlab_admin_session') === 'true');
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setConfigError("Supabase Configuration Missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch Products
        const { data: prodData, error: prodError } = await supabase.from('products').select('*');
        if (!prodError && prodData) setProducts(prodData);

        // Fetch Site Settings
        const { data: settingsData, error: settingsError } = await supabase.from('site_settings').select('*').eq('id', 'main').single();
        if (!settingsError && settingsData) {
          setSiteContent({
            hero: settingsData.hero,
            process: settingsData.process
          });
        }

        // Load Cart from LocalStorage
        const savedCart = localStorage.getItem('brewlab_cart');
        if (savedCart) setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error fetching database:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('brewlab_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleCheckoutSuccess = async (customerData: any) => {
    if (!supabase) return;
    
    const orderData = {
      customer: customerData,
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    const { error } = await supabase.from('orders').insert([orderData]);
    
    if (error) {
      alert("Error placing order. Please check if your 'orders' table exists in Supabase.");
    } else {
      setCart([]);
      setIsCheckoutOpen(false);
      alert("Order placed successfully! Transaction synced with Supabase.");
    }
  };

  const handleAdminStatusChange = (status: boolean) => {
    setIsAdminAuthenticated(status);
    if (!status) {
      localStorage.removeItem('brewlab_admin_session');
    }
  };

  if (configError) {
    return (
      <div className="h-screen w-full bg-[#1A0F0B] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-yellow-400 font-bebas text-4xl mb-4 tracking-widest uppercase">CONNECTION ERROR</h2>
        <p className="text-white/60 italic">{configError}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#1A0F0B] flex items-center justify-center">
        <div className="text-yellow-400 font-bebas text-4xl animate-pulse tracking-[0.3em]">CONNECTING TO VAULT...</div>
      </div>
    );
  }

  if (isAdminMode) {
    return (
      <AdminPanel 
        onClose={() => setIsAdminMode(false)} 
        onLogout={() => handleAdminStatusChange(false)}
        onLoginSuccess={() => handleAdminStatusChange(true)}
        content={siteContent}
        onUpdateContent={setSiteContent}
        products={products}
        onUpdateProducts={setProducts}
        supabase={supabase}
      />
    );
  }

  return (
    <div className="h-screen w-full bg-[#1A0F0B] text-white selection:bg-yellow-400 selection:text-black flex flex-col overflow-hidden">
      <Navbar 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={() => setIsAdminMode(true)}
        showAdminBadge={isAdminAuthenticated}
      />
      
      <div className="snap-container flex-1">
        <section className="snap-section" id="home">
          <Hero 
            content={siteContent.hero}
            onOrderClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} 
          />
        </section>

        <section className="snap-section" id="process">
          <Process content={siteContent.process} />
        </section>

        <section className="snap-section" id="benefits">
          <HealthBenefits />
        </section>

        <section className="snap-section flex flex-col" id="shop">
          <div className="flex-1 overflow-y-auto no-scrollbar pt-20">
            <Shop products={products} onAddToCart={addToCart} />
            <Footer />
          </div>
        </section>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={(id) => setCart(prev => prev.filter(i => i.id !== id))}
        onUpdateQty={(id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
        total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
      />

      {isCheckoutOpen && (
        <CheckoutModal 
          total={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} 
          onClose={() => setIsCheckoutOpen(false)} 
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </div>
  );
};

export default App;
