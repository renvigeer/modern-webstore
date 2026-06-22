"use client";

import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  CreditCard,
} from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Bestsellers", href: "/bestsellers" },
      { label: "Deals", href: "/deals" },
      { label: "Categories", href: "/categories" },
      { label: "Gift Cards", href: "#" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/dashboard" },
      { label: "My Orders", href: "#" },
      { label: "Wishlist", href: "#" },
      { label: "Cart", href: "/cart" },
      { label: "Compare", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Shipping Info", href: "#" },
      { label: "Returns Policy", href: "#" },
      { label: "Size Guide", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,160,23,0.05),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.03),transparent_40%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 sm:mb-5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary via-orange-600 to-gold rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
                <span className="text-white font-black text-lg relative z-10">R</span>
              </div>
              <span className="text-xl font-black text-white font-display tracking-tight">REXIFY</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 sm:mb-6 max-w-xs">
              Premium e-commerce store for fashion, electronics, home decor, and more. Quality products, exceptional service.
            </p>
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              {["FB", "X", "IG", "YT"].map((label, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 hover:bg-gradient-to-br hover:from-primary hover:to-orange-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-transparent text-[10px] font-black tracking-tight"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="space-y-2.5 text-sm">
              {[
                { icon: Phone, text: "1-800-REXIFY" },
                { icon: Mail, text: "support@rexify.com" },
                { icon: MapPin, text: "New York, NY 10001" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-slate-400 hover:text-slate-300 transition-colors">
                  <Icon size={13} className="text-gold flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-bold text-sm mb-3 sm:mb-4 tracking-wide uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-all duration-200 hover:translate-x-0.5 inline-flex items-center gap-1.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} REXIFY. All rights reserved. Made with{" "}
            <Heart size={12} className="inline text-red-400 fill-red-400" /> for premium shopping.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg">
              <CreditCard size={14} className="text-slate-400" />
              <span className="text-slate-500 text-xs">Visa</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg">
              <CreditCard size={14} className="text-slate-400" />
              <span className="text-slate-500 text-xs">MC</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg">
              <CreditCard size={14} className="text-slate-400" />
              <span className="text-slate-500 text-xs">PP</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg">
              <CreditCard size={14} className="text-slate-400" />
              <span className="text-slate-500 text-xs">AP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
