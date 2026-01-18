
import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../App';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  /* Fixed: Product IDs are strings in App.tsx */
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
  total: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty, onCheckout, total }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white text-[#2D1B14] z-[70] shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-4xl font-bebas tracking-widest">YOUR CART</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24}/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {items.length === 0 ? (
              <div className="text-center py-20 italic text-gray-400">Your cart is empty</div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.img} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-sm tracking-widest uppercase">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-yellow-600 font-bold mb-4">${item.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-100 rounded-full px-3 py-1 bg-gray-50">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:text-yellow-600"><Minus size={14}/></button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:text-yellow-600"><Plus size={14}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-8 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Total Amount</span>
              <span className="text-3xl font-bebas text-[#2D1B14]">${total.toFixed(2)}</span>
            </div>
            <button 
              disabled={items.length === 0}
              onClick={onCheckout}
              className="w-full py-5 bg-[#2D1B14] text-white rounded-full font-bebas tracking-[0.3em] hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
