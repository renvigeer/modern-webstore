"use client";

import { Truck, ShieldCheck, RotateCcw, Headphones, Zap } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders over $50" },
  { icon: ShieldCheck, title: "Secure Payment", subtitle: "100% secure checkout" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "30-day return policy" },
  { icon: Headphones, title: "24/7 Support", subtitle: "Dedicated support team" },
  { icon: Zap, title: "Fast Delivery", subtitle: "2-4 business days" },
];

export default function FeaturesBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,160,23,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.06),transparent_50%)]" />
        <div className="relative grid grid-cols-2 md:grid-cols-5 divide-x divide-white/5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center py-6 sm:py-8 lg:py-10 px-4 gap-2.5 group hover:bg-white/5 transition-all duration-500 relative"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-primary/30 animate-pulse-slow group-hover:animate-none" />
                  <Icon size={18} className="sm:w-5 sm:h-5 text-gold relative z-10" />
                </div>
                <span className="text-white font-semibold text-xs sm:text-sm text-center">
                  {feature.title}
                </span>
                <span className="text-slate-400 text-[10px] sm:text-xs text-center">
                  {feature.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
