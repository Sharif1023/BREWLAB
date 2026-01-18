
import React, { useState } from 'react';
import { X, CreditCard, Truck, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  total: number;
  onClose: () => void;
  // Updated onSuccess signature to accept customer data
  onSuccess: (data: { name: string; address: string; phone: string }) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ total, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  // Add state to track form inputs
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Pass the collected formData to onSuccess
      onSuccess(formData);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white text-[#2D1B14] w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          <div className="md:col-span-2 bg-[#2D1B14] text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bebas tracking-widest mb-6">SUMMARY</h2>
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-sm opacity-60"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm opacity-60"><span>Shipping</span><span>FREE</span></div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-white/10"><span>Total</span><span className="text-yellow-400">${total.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="space-y-4 opacity-50">
               <div className="flex items-center gap-3 text-xs"><Truck size={14}/> Fast Express Delivery</div>
               <div className="flex items-center gap-3 text-xs"><ShieldCheck size={14}/> Secure Payment 256-bit</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-3 p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bebas tracking-widest">SHIPPING</h2>
              <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-gray-200 py-2 outline-none focus:border-yellow-600 transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Shipping Address</label>
                <input 
                  required 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border-b border-gray-200 py-2 outline-none focus:border-yellow-600 transition-colors" 
                  placeholder="123 Coffee Lane, NY" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-b border-gray-200 py-2 outline-none focus:border-yellow-600 transition-colors" 
                    placeholder="+1 234 567" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Payment</label>
                  <div className="flex items-center gap-2 py-2 text-sm font-bold"><CreditCard size={14}/> Card / PayPal</div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-10 py-5 bg-[#2D1B14] text-white rounded-full font-bebas tracking-[0.2em] hover:bg-black transition-all transform active:scale-95 disabled:opacity-70"
            >
              {loading ? 'PROCESSING...' : `PAY $${total.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
