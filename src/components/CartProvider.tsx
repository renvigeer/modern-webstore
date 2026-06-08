"use client";

import { CartProvider as Provider } from "@/context/CartContext";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
