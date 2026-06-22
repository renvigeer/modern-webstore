"use client";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Shield, Truck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const cartTotal = useCartStore((s) => s.cartTotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = cartTotal;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="bg-gradient-to-r from-primary to-orange-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm font-bold flex items-center justify-center gap-2">
            <span className="animate-pulse">🎉</span>
            Free Shipping on Orders Over $50!
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-black">R</span>
              </div>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent font-display">
                REXIFY
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/" className="flex items-center gap-3 text-slate-600 hover:text-primary mb-10 transition-colors font-medium text-lg">
          <ArrowLeft size={22} />
          <span>Continue Shopping</span>
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-black text-slate-900 font-display">Shopping Cart</h1>
          {cart.length > 0 && (
            <button onClick={clearCart} className="text-danger font-bold text-lg hover:text-danger/80 transition-colors flex items-center gap-2">
              <Trash2 size={20} />
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-40 h-40 bg-gradient-to-br from-primary-light to-white rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-xl">
              <ShoppingCart size={80} className="text-primary animate-bounce" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 font-display">Your cart is empty</h2>
            <p className="text-slate-600 mb-10 text-xl max-w-2xl mx-auto">Looks like you haven't added anything to your cart yet. Let's find you something amazing!</p>
            <Link href="/" className="inline-block bg-gradient-to-r from-primary to-orange-600 text-white font-black px-12 py-5 rounded-full hover:from-primary-dark hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 text-xl mx-auto">
              Start Shopping
              <ArrowRight size={22} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-8 border-b border-slate-100 last:border-0 hover:bg-primary-light/10 transition-colors">
                    <div className="flex gap-8">
                      <Link href={`/product/${item.id}`} className="w-40 h-40 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl overflow-hidden flex-shrink-0 group">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <Link href={`/product/${item.id}`}>
                            <h3 className="text-2xl font-bold text-slate-900 hover:text-primary transition-colors">{item.name}</h3>
                          </Link>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-danger transition-all duration-300 hover:scale-110">
                            <Trash2 size={24} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center border-3 border-primary/20 rounded-2xl bg-white">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-4 hover:bg-primary-light transition-all duration-300 text-primary">
                              <Minus size={20} strokeWidth={3} />
                            </button>
                            <span className="px-8 text-2xl font-black text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-4 hover:bg-primary-light transition-all duration-300 text-primary">
                              <Plus size={20} strokeWidth={3} />
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="text-3xl font-black bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">${(item.price * item.quantity).toFixed(2)}</span>
                            <p className="text-slate-500 text-sm mt-1">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-xl p-10 sticky top-32 border border-slate-100">
                <h2 className="text-3xl font-black text-slate-900 mb-8 font-display">Order Summary</h2>
                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-lg">Subtotal</span>
                    <span className="font-bold text-slate-900 text-xl">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-lg">Shipping</span>
                    <span className={`font-bold text-xl ${shipping === 0 ? "text-success" : "text-slate-900"}`}>
                      {shipping === 0 ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 size={20} />
                          FREE
                        </span>
                      ) : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-lg">Tax</span>
                    <span className="font-bold text-slate-900 text-xl">$0.00</span>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-slate-900">Total</span>
                    <span className="text-5xl font-black bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-primary to-orange-600 text-white font-black py-6 rounded-3xl hover:from-primary-dark hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl mb-8 text-xl flex items-center justify-center gap-3">
                  Proceed to Checkout
                  <ArrowRight size={22} />
                </button>
                <div className="space-y-4 bg-primary-light/30 p-6 rounded-2xl border border-primary/10">
                  <div className="flex items-center gap-4 text-slate-700">
                    <Truck className="text-primary" size={24} />
                    <span className="text-base font-medium">Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <Shield className="text-primary" size={24} />
                    <span className="text-base font-medium">Secure payment & checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-16 pb-10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm font-medium">© 2025 REXIFY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}