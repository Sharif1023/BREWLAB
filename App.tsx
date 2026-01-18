
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Process from './components/Process';
import HealthBenefits from './components/HealthBenefits';
import Shop from './components/Shop';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminPanel from './components/AdminPanel';

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

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'DARK ROAST SIGNATURE',
    price: 18.00,
    description: 'Notes of dark chocolate and toasted almond. Bold and unforgettable.',
    img: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?q=80&w=800'
  },
  {
    id: '2',
    name: 'ETHIOPIAN BLOSSOM',
    price: 22.00,
    description: 'Floral aroma with a clean, fruity finish. Perfect for morning clarity.',
    img: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800'
  },
  {
    id: '3',
    name: 'NITRO CREAM PACK (4)',
    price: 34.00,
    description: 'Velvety smooth texture in a convenient can. Ready to pour and enjoy.',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800'
  }
];

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "Award Winning Brew 2024",
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
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(localStorage.getItem('brewlab_admin_session') === 'true');
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_CONTENT);

  // Load persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('brewlab_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedContent = localStorage.getItem('brewlab_content');
    if (savedContent) setSiteContent(JSON.parse(savedContent));

    const savedProducts = localStorage.getItem('brewlab_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  useEffect(() => {
    localStorage.setItem('brewlab_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('brewlab_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('brewlab_products', JSON.stringify(products));
  }, [products]);

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

  const handleCheckoutSuccess = (customerData: any) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      customer: customerData
    };

    const existingOrders = JSON.parse(localStorage.getItem('brewlab_orders') || '[]');
    localStorage.setItem('brewlab_orders', JSON.stringify([newOrder, ...existingOrders]));
    
    setCart([]);
    setIsCheckoutOpen(false);
    alert("Order placed successfully!");
  };

  const handleAdminStatusChange = (status: boolean) => {
    setIsAdminAuthenticated(status);
    if (!status) {
      localStorage.removeItem('brewlab_admin_session');
    }
  };

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
        /* Fixed: Removed redundant type assertions */
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
