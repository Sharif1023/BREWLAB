
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
  supabase: any; // Passed from App.tsx
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onLogout, onLoginSuccess, content, onUpdateContent, products, onUpdateProducts, supabase }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('brewlab_admin_session') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'content'>('dashboard');
  const [editContent, setEditContent] = useState<SiteContent>(content);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isSaving, setIsSaving] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ name: '', price: 0, description: '', img: '' });

  useEffect(() => {
    if (!supabase) return;

    const fetchOrders = async () => {
      const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (data) setOrders(data);
    };
    
    if (isAuthenticated) fetchOrders();

    const handleResize = () => setIsSidebarOpen(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAuthenticated, supabase]);

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

  const saveContent = async () => {
    if (!supabase) return;
    setIsSaving(true);
    const { error } = await supabase.from('site_settings').update({
      hero: editContent.hero,
      process: editContent.process,
      updated_at: new Date().toISOString()
    }).eq('id', 'main');

    if (!error) {
      onUpdateContent(editContent);
      showToast("Cloud configuration synced!", "green");
    } else {
      showToast("Sync failed!", "red");
    }
    setIsSaving(false);
  };

  const showToast = (msg: string, color: string) => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-${color}-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl z-[300] animate-fade-in flex items-center gap-3`;
    toast.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17L4 12"/></svg> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleAddProduct = async () => {
    if (!supabase) return;
    if (!newProduct.name || !newProduct.price || !newProduct.img) {
      alert("Missing details");
      return;
    }
    
    const { data, error } = await supabase.from('products').insert([
      { name: newProduct.name, price: Number(newProduct.price), description: newProduct.description, img: newProduct.img }
    ]).select();

    if (!error && data) {
      onUpdateProducts([...products, data[0]]);
      setNewProduct({ name: '', price: 0, description: '', img: '' });
      showToast("Product deployed to database!", "green");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!supabase) return;
    if (confirm("Permanently wipe this asset?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        onUpdateProducts(products.filter(p => p.id !== id));
        showToast("Asset purged.", "red");
      }
    }
  };

  const TabButton = ({ tab, icon: Icon, label, count }: { tab: typeof activeTab, icon: any, label: string, count?: number }) => (
    <button 
      onClick={() => setActiveTab(tab)} 
      className={`w-full flex items-center gap-4 px-4 py-4 rounded-[20px] transition-all relative group ${activeTab === tab ? 'bg-[#2D1B14] text-white shadow-2xl' : 'hover:bg-gray-50 text-gray-400 hover:text-[#2D1B14]'}`}
    >
      <Icon size={22} className={`${activeTab === tab ? 'text-yellow-400' : ''}`} />
      {isSidebarOpen && <span className="text-xs font-bold uppercase tracking-widest pt-0.5">{label}</span>}
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
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#FAF9F6] text-[#2D1B14] flex flex-col z-[200] overflow-hidden">
      <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-8 shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-[#2D1B14] rounded-xl flex items-center justify-center">
              <Coffee className="text-yellow-400 w-5 h-5" />
           </div>
           <h2 className="text-2xl font-bebas tracking-widest pt-1">BREWLAB <span className="text-yellow-600">CENTRAL</span></h2>
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
        </aside>

        <main className="flex-1 overflow-y-auto p-8 bg-[#FAF9F6] pb-32">
          {activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
              <h1 className="text-5xl font-bebas tracking-widest uppercase">System <span className="text-yellow-600">Pulse</span></h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[40px] border shadow-sm">
                   <TrendingUp className="text-yellow-600 mb-6" size={32} />
                   <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase block mb-1">Gross Revenue</span>
                   <span className="text-6xl font-bebas text-[#2D1B14]">${orders.reduce((s,o) => s + (Number(o.total) || 0), 0).toFixed(2)}</span>
                </div>
                <div className="bg-[#2D1B14] p-10 rounded-[40px] shadow-2xl text-white">
                   <ShoppingBag className="text-yellow-400 mb-6" size={32} />
                   <span className="text-[10px] font-bold opacity-30 tracking-widest uppercase block mb-1">Database Orders</span>
                   <span className="text-6xl font-bebas text-white">{orders.length}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="max-w-6xl mx-auto animate-fade-in space-y-10">
              <h1 className="text-5xl font-bebas tracking-widest uppercase">Boutique <span className="text-yellow-600">Manager</span></h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 bg-white p-10 rounded-[40px] shadow-sm border space-y-6">
                  <h3 className="text-3xl font-bebas tracking-widest uppercase flex items-center gap-3"><Plus className="text-yellow-600" /> New Addition</h3>
                  <div className="space-y-4">
                    <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="Title" />
                    <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bebas text-2xl" placeholder="24.00" />
                    <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-xs italic resize-none" rows={3} placeholder="Description" />
                    <input type="text" value={newProduct.img} onChange={e => setNewProduct({...newProduct, img: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none text-xs" placeholder="Image URL" />
                    <button onClick={handleAddProduct} className="w-full bg-[#2D1B14] text-white py-5 rounded-full font-bebas text-2xl tracking-[0.2em] shadow-xl">SYNC PRODUCT</button>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                   <div className="bg-white rounded-[40px] shadow-sm border overflow-hidden">
                      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                         <h3 className="font-bebas text-2xl tracking-widest uppercase">Live <span className="text-yellow-600">Inventory</span></h3>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {products.map(p => (
                          <div key={p.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-6">
                               <img src={p.img} className="w-20 h-20 object-cover rounded-2xl shadow-lg" />
                               <div>
                                  <h4 className="font-bebas text-2xl tracking-widest uppercase mb-1">{p.name}</h4>
                                  <span className="text-yellow-600 font-bold text-sm tracking-widest">${Number(p.price).toFixed(2)}</span>
                               </div>
                            </div>
                            <button onClick={() => deleteProduct(p.id)} className="p-4 text-gray-200 hover:text-red-500 rounded-2xl transition-all"><Trash2 size={20} /></button>
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
              <h1 className="text-5xl font-bebas tracking-widest uppercase">Cloud <span className="text-yellow-600">Archive</span></h1>
              <div className="bg-white rounded-[40px] border shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF9F6] border-b">
                    <tr>
                      <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-300">Identity</th>
                      <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-300">Value</th>
                      <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-300">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-gray-50">
                        <td className="px-10 py-8">
                          <p className="font-bebas text-2xl tracking-widest uppercase">{o.customer?.name || 'Guest'}</p>
                          <p className="text-[10px] font-bold text-gray-400">{o.customer?.phone || 'N/A'}</p>
                        </td>
                        <td className="px-10 py-8 font-bebas text-3xl text-yellow-600">${Number(o.total).toFixed(2)}</td>
                        <td className="px-10 py-8 text-[10px] font-bold text-gray-300">{new Date(o.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="max-w-6xl mx-auto animate-fade-in space-y-12 pb-40">
              <h1 className="text-5xl font-bebas tracking-widest uppercase">Global <span className="text-yellow-600">Config</span></h1>
              <div className="bg-white p-12 rounded-[50px] border shadow-sm space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-300 uppercase px-1 tracking-widest">Main Title</label>
                       <input type="text" value={editContent.hero.titleMain} onChange={e => setEditContent({...editContent, hero: {...editContent.hero, titleMain: e.target.value}})} className="w-full p-5 bg-gray-50 rounded-3xl font-bebas text-4xl" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-300 uppercase px-1 tracking-widest">Sub Title</label>
                       <input type="text" value={editContent.hero.titleSub} onChange={e => setEditContent({...editContent, hero: {...editContent.hero, titleSub: e.target.value}})} className="w-full p-5 bg-gray-50 rounded-3xl font-bebas text-4xl italic text-yellow-600" />
                    </div>
                 </div>
                 <button 
                  disabled={isSaving}
                  onClick={saveContent} 
                  className="flex items-center gap-4 bg-[#2D1B14] text-white px-12 py-5 rounded-full font-bebas text-2xl shadow-2xl hover:bg-black transition-all group disabled:opacity-50"
                 >
                    <Save size={20} className="text-yellow-400 group-hover:rotate-12 transition-transform" /> 
                    {isSaving ? 'SYNCING...' : 'COMMIT TO CLOUD'}
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
