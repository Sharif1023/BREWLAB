
import React, { useState, useEffect } from 'react';
import { 
  X, LogOut, Package, Users, BarChart3, Trash2, 
  Search, Edit3, Eye, Save, TrendingUp, 
  Clock, Coffee, ShoppingBag, ArrowRight,
  LayoutDashboard, FileText, Settings as SettingsIcon,
  CheckCircle2, AlertCircle, Star, Menu, Plus, Image
} from 'lucide-react';
import { Order, SiteContent, Product } from '../App';

interface AdminPanelProps {
  onClose: () => void;
  onLogout: () => void;
  onLoginSuccess: () => void;
  content: SiteContent;
  onUpdateContent: (c: SiteContent) => void;
  products: Product[];
  onUpdateProducts: (p: Product[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onLogout, onLoginSuccess, content, onUpdateContent, products, onUpdateProducts }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('brewlab_admin_session') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'content'>('dashboard');
  const [editContent, setEditContent] = useState<SiteContent>(content);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ name: '', price: 0, description: '', img: '' });

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('brewlab_orders') || '[]');
    setOrders(savedOrders);
    
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('brewlab_admin_session', 'true');
      onLoginSuccess();
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('brewlab_admin_session');
    onLogout();
  };

  const saveContent = () => {
    onUpdateContent(editContent);
    showToast("Content updated successfully!", "green");
  };

  const showToast = (msg: string, color: string) => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-${color}-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl z-[300] animate-fade-in flex items-center gap-3`;
    toast.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17L4 12"/></svg> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.img) {
      alert("Please fill in all product details");
      return;
    }
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: Number(newProduct.price),
      description: newProduct.description || '',
      img: newProduct.img
    };
    onUpdateProducts([...products, product]);
    setNewProduct({ name: '', price: 0, description: '', img: '' });
    showToast("Product added to boutique!", "green");
  };

  const deleteProduct = (id: string) => {
    if (confirm("Permanently remove this item?")) {
      onUpdateProducts(products.filter(p => p.id !== id));
      showToast("Product removed.", "red");
    }
  };

  const TabButton = ({ tab, icon: Icon, label, count }: { tab: typeof activeTab, icon: any, label: string, count?: number }) => (
    <button 
      onClick={() => {
        setActiveTab(tab);
        if (window.innerWidth < 768) setIsMobileMenuOpen(false);
      }} 
      className={`w-full flex items-center gap-4 px-4 py-4 rounded-[20px] transition-all relative group ${activeTab === tab ? 'bg-[#2D1B14] text-white shadow-2xl' : 'hover:bg-gray-50 text-gray-400 hover:text-[#2D1B14]'}`}
    >
      <Icon size={22} className={`${activeTab === tab ? 'text-yellow-400' : ''}`} />
      {(isSidebarOpen || window.innerWidth < 768) && <span className="text-xs font-bold uppercase tracking-widest pt-0.5">{label}</span>}
      {count !== undefined && count > 0 && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-yellow-400 text-[#2D1B14] text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
          {count}
        </div>
      )}
    </button>
  );

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-[#1A0F0B] flex items-center justify-center p-4 z-[200]">
        <div className="bg-[#2D1B14] p-10 rounded-[50px] w-full max-w-md border border-white/5 shadow-2xl text-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-[25px] flex items-center justify-center mx-auto mb-8 rotate-12">
            <Coffee className="text-black w-10 h-10 -rotate-12" />
          </div>
          <h2 className="text-5xl font-bebas tracking-widest mb-2 uppercase text-white">Security Gate</h2>
          <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-10 italic">Operator Credentials Required</p>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-yellow-400" placeholder="admin" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-yellow-400" placeholder="admin" />
            <button type="submit" className="w-full bg-yellow-400 text-black py-5 rounded-2xl font-bebas text-2xl tracking-widest hover:bg-yellow-300 transition-all">UNLOCH CORE</button>
            <button type="button" onClick={onClose} className="w-full text-white/20 text-[10px] font-bold tracking-widest uppercase mt-4">Close Interface</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#FAF9F6] text-[#2D1B14] flex flex-col z-[200] overflow-hidden">
      <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-8 shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-[#2D1B14] rounded-xl flex items-center justify-center">
                <Coffee className="text-yellow-400 w-5 h-5" />
             </div>
             <h2 className="text-2xl font-bebas tracking-widest pt-1">BREWLAB <span className="text-yellow-600">CENTRAL</span></h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="flex items-center gap-3 px-6 py-3 bg-[#2D1B14] text-white rounded-full font-bebas tracking-widest text-lg hover:bg-black transition-all shadow-xl"><Eye size={16} className="text-yellow-400" /> LIVE PREVIEW</button>
          <button onClick={handleLogout} className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"><LogOut size={20} /></button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-white border-r border-gray-100 transition-all p-6 flex flex-col gap-4`}>
          <p className="text-[10px] font-bold text-gray-300 tracking-[0.4em] uppercase mb-4 px-4">{isSidebarOpen ? 'Operations' : 'Op'}</p>
          <TabButton tab="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <TabButton tab="orders" icon={ShoppingBag} label="Orders" count={orders.length} />
          <TabButton tab="products" icon={Package} label="Products" />
          <TabButton tab="content" icon={FileText} label="Site Editor" />
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mt-auto flex items-center justify-center p-4 text-gray-300 hover:text-black rounded-2xl transition-all"><TrendingUp size={20} /></button>
        </aside>

        <main className="flex-1 overflow-y-auto p-8 bg-[#FAF9F6] pb-32">
          {activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
              <h1 className="text-5xl font-bebas tracking-widest uppercase">System <span className="text-yellow-600">Pulse</span></h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[40px] border shadow-sm">
                   <TrendingUp className="text-yellow-600 mb-6" size={32} />
                   <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase block mb-1">Gross Revenue</span>
                   <span className="text-6xl font-bebas text-[#2D1B14]">${orders.reduce((s,o) => s + o.total, 0).toFixed(2)}</span>
                </div>
                <div className="bg-[#2D1B14] p-10 rounded-[40px] shadow-2xl text-white">
                   <ShoppingBag className="text-yellow-400 mb-6" size={32} />
                   <span className="text-[10px] font-bold opacity-30 tracking-widest uppercase block mb-1">Unit Sales</span>
                   <span className="text-6xl font-bebas text-white">{orders.length}</span>
                </div>
                <div className="bg-white p-10 rounded-[40px] border shadow-sm">
                   <Package className="text-blue-500 mb-6" size={32} />
                   <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase block mb-1">Active Boutique Items</span>
                   <span className="text-6xl font-bebas text-[#2D1B14]">{products.length}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="max-w-6xl mx-auto animate-fade-in space-y-10">
              <div className="flex justify-between items-end">
                <div>
                   <h1 className="text-5xl font-bebas tracking-widest uppercase">Boutique <span className="text-yellow-600">Manager</span></h1>
                   <p className="text-xs font-bold text-gray-400 uppercase italic tracking-widest">Inventory Control & curation</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 bg-white p-10 rounded-[40px] shadow-sm border space-y-6">
                  <h3 className="text-3xl font-bebas tracking-widest border-b pb-4 mb-6 uppercase flex items-center gap-3">
                    <Plus className="text-yellow-600" /> New Addition
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-300 uppercase px-1 tracking-widest">Product Title</label>
                      <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-yellow-400/20 font-bold" placeholder="E.g. GOLDEN RESERVE" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-300 uppercase px-1 tracking-widest">Market Value ($)</label>
                      <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-yellow-400/20 font-bebas text-2xl" placeholder="24.00" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-300 uppercase px-1 tracking-widest">Description</label>
                      <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-yellow-400/20 text-xs italic resize-none" rows={3} placeholder="Describe the sensory notes..." />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-300 uppercase px-1 tracking-widest">Asset URL (Unsplash)</label>
                      <input type="text" value={newProduct.img} onChange={e => setNewProduct({...newProduct, img: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-yellow-400/20 text-xs" placeholder="https://images.unsplash.com/..." />
                    </div>
                    <button onClick={handleAddProduct} className="w-full bg-[#2D1B14] text-white py-5 rounded-full font-bebas text-2xl tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-95">REGISTER PRODUCT</button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                   <div className="bg-white rounded-[40px] shadow-sm border overflow-hidden">
                      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                         <h3 className="font-bebas text-2xl tracking-widest uppercase">Active <span className="text-yellow-600">Inventory</span></h3>
                         <span className="text-[10px] font-bold text-gray-300 uppercase italic">Total: {products.length} Units</span>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {products.map(p => (
                          <div key={p.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-6">
                               <img src={p.img} className="w-20 h-20 object-cover rounded-2xl shadow-lg rotate-2 group-hover:rotate-0 transition-all" />
                               <div>
                                  <h4 className="font-bebas text-2xl tracking-widest uppercase mb-1">{p.name}</h4>
                                  <span className="text-yellow-600 font-bold text-sm tracking-widest">${p.price.toFixed(2)}</span>
                               </div>
                            </div>
                            <button onClick={() => deleteProduct(p.id)} className="p-4 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                               <Trash2 size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="max-w-6xl mx-auto animate-fade-in space-y-10">
              <h1 className="text-5xl font-bebas tracking-widest uppercase">Fulfillment <span className="text-yellow-600">Vault</span></h1>
              <div className="bg-white rounded-[40px] border shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF9F6] border-b">
                    <tr>
                      <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-300">Transaction ID</th>
                      <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-300">Identity</th>
                      <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-300">Net Value</th>
                      <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-gray-50">
                        <td className="px-10 py-8 font-mono text-xs opacity-40">{o.id}</td>
                        <td className="px-10 py-8">
                          <p className="font-bebas text-2xl tracking-widest uppercase">{o.customer.name}</p>
                          <p className="text-[10px] font-bold text-gray-400">{o.customer.phone}</p>
                        </td>
                        <td className="px-10 py-8 font-bebas text-3xl text-yellow-600">${o.total.toFixed(2)}</td>
                        <td className="px-10 py-8 italic font-bold text-[10px] text-green-500 uppercase tracking-widest">Dispatched</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="max-w-6xl mx-auto animate-fade-in space-y-12 pb-40">
              <h1 className="text-5xl font-bebas tracking-widest uppercase">Brand <span className="text-yellow-600">Architect</span></h1>
              <div className="bg-white p-12 rounded-[50px] border shadow-sm space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-300 uppercase px-1 tracking-widest">Intro Line 1</label>
                       <input type="text" value={editContent.hero.titleMain} onChange={e => setEditContent({...editContent, hero: {...editContent.hero, titleMain: e.target.value}})} className="w-full p-5 bg-gray-50 rounded-3xl font-bebas text-4xl tracking-widest" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-300 uppercase px-1 tracking-widest">Intro Line 2 (Emphasis)</label>
                       <input type="text" value={editContent.hero.titleSub} onChange={e => setEditContent({...editContent, hero: {...editContent.hero, titleSub: e.target.value}})} className="w-full p-5 bg-gray-50 rounded-3xl font-bebas text-4xl tracking-widest italic text-yellow-600" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-300 uppercase px-1 tracking-widest">DNA Image URL</label>
                    <input type="text" value={editContent.process.img} onChange={e => setEditContent({...editContent, process: {...editContent.process, img: e.target.value}})} className="w-full p-5 bg-gray-50 rounded-3xl outline-none" />
                 </div>
                 <button onClick={saveContent} className="flex items-center gap-4 bg-[#2D1B14] text-white px-12 py-5 rounded-full font-bebas text-2xl tracking-[0.2em] shadow-2xl hover:bg-black transition-all group active:scale-95">
                    <Save size={20} className="text-yellow-400 group-hover:rotate-12 transition-transform" /> Commit Changes
                 </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
