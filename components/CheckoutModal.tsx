
import React, { useState } from 'react';
import { X, CreditCard, Truck, ShieldCheck } from 'lucide-react';

interface CheckoutModalProps {
  total: number;
  onClose: () => void;
  onSuccess: (data: { name: string; address: string; phone: string }) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ total, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
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
      onSuccess(formData);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white text-[#2D1B14] w-full max-w-2xl rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl animate-fade-in my-auto">
        <div className="flex flex-col md:grid md:grid-cols-5 h-full">
          {/* Summary Section - Moves to top on mobile */}
          <div className="md:col-span-2 bg-[#2D1B14] text-white p-6 md:p-10 flex flex-col justify-between order-2 md:order-1">
            <div>
              <h2 className="text-3xl md:text-4xl font-bebas tracking-widest mb-4 md:mb-6">SUMMARY</h2>
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-10">
                <div className="flex justify-between text-xs md:text-sm opacity-60"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-xs md:text-sm opacity-60"><span>Shipping</span><span>FREE</span></div>
                <div className="flex justify-between text-base md:text-lg font-bold pt-3 md:pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-yellow-400">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 opacity-50">
               <div className="flex items-center gap-2 text-[10px] md:text-xs"><Truck size={12}/> Express Delivery</div>
               <div className="flex items-center gap-2 text-[10px] md:text-xs"><ShieldCheck size={12}/> 256-bit Secure</div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="md:col-span-3 p-6 md:p-10 order-1 md:order-2">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-3xl md:text-4xl font-bebas tracking-widest uppercase">SHIPPING</h2>
              <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20}/></button>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="space-y-1 md:space-y-2">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-gray-200 py-2 outline-none focus:border-yellow-600 transition-colors bg-transparent" 
                  placeholder="e.g. Alex Legend" 
                />
              </div>
              <div className="space-y-1 md:space-y-2">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Shipping Address</label>
                <input 
                  required 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border-b border-gray-200 py-2 outline-none focus:border-yellow-600 transition-colors bg-transparent" 
                  placeholder="Address Line 1" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-b border-gray-200 py-2 outline-none focus:border-yellow-600 transition-colors bg-transparent" 
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Payment</label>
                  <div className="flex items-center gap-2 py-2 text-xs md:text-sm font-bold text-yellow-600"><CreditCard size={14}/> Integrated Portal</div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-8 md:mt-10 py-4 md:py-5 bg-[#2D1B14] text-white rounded-full font-bebas tracking-[0.2em] text-lg md:text-xl hover:bg-black transition-all transform active:scale-95 disabled:opacity-70"
            >
              {loading ? 'PROCESSING...' : `COMMIT PAYMENT`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
