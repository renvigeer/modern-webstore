import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { cart: state.cart.filter((i) => i.id !== id) };
          }
          return { cart: state.cart.map((i) => (i.id === id ? { ...i, quantity } : i)) };
        }),

      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),

      clearCart: () => set({ cart: [] }),

      get cartCount() {
        return get().cart.reduce((sum, i) => sum + i.quantity, 0);
      },

      get cartTotal() {
        return get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },
    }),
    {
      name: "rexify-cart",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
