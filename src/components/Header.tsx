"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Package,
  Gift,
  HelpCircle,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
  label: string;
  href: string;
  badge?: string;
  children?: { label: string; href: string }[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "Fashion", href: "/categories/fashion" },
      { label: "Electronics", href: "/categories/electronics" },
      { label: "Home & Garden", href: "/categories/home" },
      { label: "Sports", href: "/categories/sports" },
      { label: "Beauty", href: "/categories/beauty" },
      { label: "Books", href: "/categories/books" },
      { label: "Toys", href: "/categories/toys" },
      { label: "Automotive", href: "/categories/automotive" },
    ],
  },
  { label: "Deals", href: "/deals", badge: "HOT" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Bestsellers", href: "/bestsellers" },
];

export default function Header({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  activeCategory: string;
  onCategoryChange: (v: string) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const cartCount = useCartStore((s) => s.cartCount);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-700 ${
          scrolled
            ? "glass-strong shadow-[0_8px_40px_rgb(0,0,0,0.08)]"
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="bg-gradient-to-r from-primary via-orange-600 to-gold text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs sm:text-sm relative">
            <div className="hidden md:flex items-center gap-5 text-white/80">
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone size={12} />
                1-800-REXIFY
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={12} />
                support@rexify.com
              </span>
            </div>
            <div className="flex-1 text-center font-semibold tracking-wide flex items-center justify-center gap-2 text-xs sm:text-sm">
              <Sparkles size={14} className="text-yellow-200" />
              <span>FREE SHIPPING ON ORDERS OVER $50 &bull; 30-DAY RETURNS</span>
              <Sparkles size={14} className="text-yellow-200" />
            </div>
            <div className="hidden md:flex items-center gap-4 text-white/70 text-xs">
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">
                <HelpCircle size={12} /> Help
              </Link>
              <Link href="#" className="hover:text-white transition-colors flex items-center gap-1">
                <MapPin size={12} /> Track Order
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-4 lg:gap-8">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2.5 hover:bg-primary-light/50 rounded-xl transition-all duration-300"
                aria-label="Open menu"
              >
                <Menu size={22} className="text-slate-700" />
              </button>

              <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" onClick={closeMenus}>
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary via-orange-600 to-gold rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
                  <span className="text-white font-black text-lg sm:text-xl relative z-10 tracking-tight">R</span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-gradient font-display tracking-tight">
                  REXIFY
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`px-3 py-2 text-slate-600 hover:text-primary font-medium text-sm transition-all duration-200 rounded-lg hover:bg-primary-light/40 flex items-center gap-1 ${
                        activeCategory !== "All" && link.label === "Categories" ? "text-primary bg-primary-light/30" : ""
                      }`}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full ml-1 shadow-sm">
                          {link.badge}
                        </span>
                      )}
                      {link.children && <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200" />}
                    </Link>
                    {link.children && activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1.5 glass-strong rounded-2xl shadow-[0_20px_60px_-12px_rgb(0,0,0,0.2)] p-2 min-w-[220px] animate-scaleIn origin-top">
                        <div className="grid grid-cols-2 gap-0.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => onCategoryChange(child.label)}
                              className="px-3.5 py-2.5 text-slate-600 hover:text-primary hover:bg-primary-light/30 rounded-lg transition-all text-sm font-medium whitespace-nowrap"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />

              <div className="hidden md:flex items-center bg-slate-100/80 hover:bg-slate-100 rounded-full px-4 py-2 w-[200px] lg:w-[280px] border border-transparent focus-within:border-primary/40 focus-within:bg-white transition-all duration-300 focus-within:shadow-lg focus-within:shadow-primary/5">
                <Search size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 ml-2.5 text-sm placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => onSearchChange("")} className="text-slate-400 hover:text-slate-600 p-0.5">
                    <X size={14} />
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 hover:bg-primary-light/40 rounded-xl transition-all"
                aria-label="Search"
              >
                <Search size={18} className="text-slate-600" />
              </button>

              <button className="relative p-2 hover:bg-primary-light/40 rounded-xl transition-all group hidden sm:block" aria-label="Wishlist">
                <Heart size={18} className="text-slate-600 group-hover:text-primary transition-colors" />
                <span className="absolute top-1 right-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  0
                </span>
              </button>

              <Link
                href="/cart"
                className="relative p-2 hover:bg-primary-light/40 rounded-xl transition-all group"
                aria-label="Cart"
              >
                <ShoppingCart size={18} className="text-slate-600 group-hover:text-primary transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-primary to-orange-600 text-white text-[8px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-lg animate-scaleIn">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 hover:bg-primary-light/40 rounded-xl transition-all group flex items-center gap-2"
                  aria-label="Account"
                >
                  {session ? (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white">
                      {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  ) : (
                    <User size={18} className="text-slate-600 group-hover:text-primary transition-colors" />
                  )}
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-60 glass-strong rounded-2xl shadow-[0_25px_60px_-12px_rgb(0,0,0,0.25)] overflow-hidden z-50 animate-scaleIn origin-top-right">
                      {session ? (
                        <>
                          <div className="p-4 border-b border-slate-100/50 bg-gradient-to-r from-primary-light/20 to-orange-100/20">
                            <p className="text-xs text-slate-500 font-medium mb-0.5">Welcome back</p>
                            <p className="font-semibold text-slate-900 text-sm">{session.user?.name}</p>
                            <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                          </div>
                          <div className="p-1.5">
                            {[
                              { href: "/dashboard", icon: LayoutDashboard, label: "My Dashboard" },
                              { href: "/cart", icon: Package, label: "My Orders" },
                              { href: "#", icon: Heart, label: "Wishlist" },
                              { href: "#", icon: Gift, label: "Coupons" },
                            ].map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:text-primary hover:bg-primary-light/30 rounded-xl transition-all font-medium text-sm"
                              >
                                <item.icon size={16} className="text-slate-400" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-slate-100/50 p-1.5">
                            <button
                              onClick={() => { signOut(); setIsUserMenuOpen(false); }}
                              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium text-sm"
                            >
                              <LogOut size={16} />
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-5 text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-light to-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <User size={22} className="text-primary" />
                            </div>
                            <p className="font-semibold text-slate-900">Welcome</p>
                            <p className="text-xs text-slate-500 mt-0.5">Sign in to your account</p>
                          </div>
                          <div className="p-3 space-y-2">
                            <Link
                              href="/login"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block w-full text-center bg-gradient-to-r from-primary to-orange-600 text-white font-semibold py-2.5 rounded-xl hover:from-primary-dark hover:to-orange-700 transition-all text-sm"
                            >
                              Sign In
                            </Link>
                            <Link
                              href="/signup"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block w-full text-center text-primary font-semibold py-2.5 rounded-xl border border-primary/20 hover:bg-primary-light/30 transition-all text-sm"
                            >
                              Create Account
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden border-t border-slate-100/50 p-3 bg-white/95 backdrop-blur-xl animate-slideInLeft">
            <div className="flex items-center bg-slate-100 rounded-full px-4 py-2.5 border border-primary/20">
              <Search size={16} className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 ml-2.5 text-sm"
                autoFocus
              />
              <button onClick={() => { setIsSearchOpen(false); onSearchChange(""); }}>
                <X size={16} className="text-slate-400" />
              </button>
            </div>
          </div>
        )}
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-[280px] max-w-[80vw] bg-white shadow-2xl animate-slideInLeft overflow-y-auto">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl z-10 border-b border-slate-100 p-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={closeMenus}>
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">R</span>
                </div>
                <span className="text-lg font-black text-gradient">REXIFY</span>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="p-4 space-y-0.5">
              <div className="mb-4">
                <div className="flex items-center bg-slate-100 rounded-full px-4 py-2.5">
                  <Search size={16} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => { onSearchChange(e.target.value); closeMenus(); }}
                    className="bg-transparent border-none outline-none flex-1 ml-2.5 text-sm"
                  />
                </div>
              </div>

              {[
                { label: "Home", href: "/" },
                ...navLinks.slice(1),
              ].map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <div className="flex items-center justify-between px-3.5 py-2.5 text-slate-800 font-semibold text-sm">
                        {link.label}
                      </div>
                      <div className="ml-3 space-y-0.5 mb-1.5">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => { onCategoryChange(child.label); closeMenus(); }}
                            className="block px-3.5 py-2 text-slate-500 hover:text-primary hover:bg-primary-light/30 rounded-lg transition-all text-sm font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMenus}
                      className="flex items-center justify-between px-3.5 py-2.5 text-slate-700 hover:text-primary hover:bg-primary-light/30 rounded-lg transition-all font-semibold text-sm"
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                        {link.badge && (
                          <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </span>
                      <ChevronRight size={14} className="text-slate-300" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 p-4 space-y-3">
              <ThemeToggle />
              <div className="flex items-center gap-2.5 text-sm text-slate-500">
                <Phone size={14} className="text-primary" />
                <span>1-800-REXIFY</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-500">
                <Mail size={14} className="text-primary" />
                <span>support@rexify.com</span>
              </div>
              {!session && (
                <div className="pt-2 space-y-2">
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    className="block w-full text-center bg-gradient-to-r from-primary to-orange-600 text-white font-semibold py-2.5 rounded-xl text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMenus}
                    className="block w-full text-center text-primary font-semibold py-2.5 rounded-xl border border-primary/20 text-sm"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
