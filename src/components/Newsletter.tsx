"use client";

import { useState } from "react";
import { Mail, Sparkles, ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  if (subscribed) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16 text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 border border-white/20 shadow-lg">
              <Check size={24} className="sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white mb-2 font-display">You&apos;re In!</h3>
            <p className="text-white/70 text-sm sm:text-base">Welcome to the REXIFY community. Check your inbox for exclusive offers.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,160,23,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.08),transparent_50%)]" />
        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-8 items-center p-6 sm:p-10 lg:p-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-white/15 shadow-lg mb-4 sm:mb-5">
              <Sparkles size={13} className="text-yellow-300" />
              Stay Updated
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-3 font-display leading-tight drop-shadow-lg">
              Join Our Newsletter
            </h2>
            <p className="text-white/65 text-sm sm:text-base max-w-md leading-relaxed">
              Subscribe to get exclusive offers, early access to new arrivals, and 15% off your first order.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-11 pr-4 py-3 sm:py-3.5 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-gold to-amber-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:from-amber-500 hover:to-gold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2 group"
              >
                Subscribe
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <p className="text-white/30 text-xs mt-3 text-center sm:text-left">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
