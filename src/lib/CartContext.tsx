import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { Product } from '../data/products';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  product: Product;
  selectedPrice: { label: string; amount: number; grams?: number };
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  cartCount: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, selectedPrice?: { label: string; amount: number; grams?: number }, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem('cannazen-cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('cannazen-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const syncToSupabase = useCallback(async (_items: CartItem[]) => {
    // Cart sync - table not yet created, using localStorage only
  }, [user]);

  const addToCart = (product: Product, selectedPrice?: { label: string; amount: number; grams?: number }, quantity = 1) => {
    const price = selectedPrice || product.prices[0];
    const id = `${product.id}-${price.label}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      let newItems;
      if (existing) {
        newItems = prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newItems = [...prev, { id, product, selectedPrice: price, quantity }];
      }
      syncToSupabase(newItems);
      return newItems;
    });
    toast.success(`${product.name} ajouté au panier`);
  };

  const removeFromCart = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    setCartItems(prev => {
      const newItems = prev.filter(i => i.id !== id);
      syncToSupabase(newItems);
      return newItems;
    });
    if (item) toast.success(`${item.product.name} retiré du panier`);
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCartItems(prev => {
      const newItems = prev.map(item => item.id === id ? { ...item, quantity: qty } : item);
      syncToSupabase(newItems);
      return newItems;
    });
  };

  const clearCart = () => { setCartItems([]); syncToSupabase([]); };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.selectedPrice.amount * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      cartCount,
      totalItems: cartCount,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
