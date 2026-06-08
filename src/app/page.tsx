"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Search, Heart, ShoppingCart, Menu, X, User, ChevronRight, Star, Truck, Shield, RefreshCw, Gift, ChevronLeft, Filter, Zap, Flame, TrendingUp, Loader2, CheckCircle2, ArrowRight, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestseller: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  productCount: number;
}

const slides = [
  {
    title: "Summer Collection 2025",
    subtitle: "Up to 70% Off",
    description: "Discover the latest fashion trends for the season",
    color: "from-primary via-orange-500 to-accent",
    imagePrompt: "summer fashion collection model",
  },
  {
    title: "Tech Gadgets Sale",
    subtitle: "New Arrivals",
    description: "Premium electronics at unbeatable prices",
    color: "from-accent via-purple-500 to-primary",
    imagePrompt: "modern tech gadgets",
  },
  {
    title: "Home Essentials",
    subtitle: "Limited Stock",
    description: "Transform your living space with our decor collection",
    color: "from-success via-teal-500 to-accent",
    imagePrompt: "beautiful home interior decor",
  },
];

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders over $50" },
  { icon: Shield, title: "Secure Payment", description: "100% protected" },
  { icon: RefreshCw, title: "Easy Returns", description: "30 day policy" },
  { icon: Gift, title: "Gift Cards", description: "Available now" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [addedProductIds, setAddedProductIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, addToCart } = useCart();
  const { data: session } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts("All", 1);
  }, []);

  useEffect(() => {
    setPage(1);
    setProducts([]);
    fetchProducts(activeCategory, 1, searchQuery);
  }, [activeCategory, searchQuery]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories([{ id: "All", name: "All", icon: "🔥", subcategories: [], productCount: 2000 }, ...data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (category: string, pageNum: number, search: string = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "48"
      });
      if (category !== "All") {
        params.set("category", category);
      }
      if (search) {
        params.set("search", search);
      }
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      if (pageNum === 1) {
        setProducts(data.products);
        setNewProducts(data.products.filter((p: Product) => p.isNew).slice(0, 8));
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }
      setHasMore(data.page < data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(activeCategory, nextPage);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
    setAddedProductIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedProductIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  const filteredProducts = products;

  return (
    <div className="min-h-screen bg-background">
      <header className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/95 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-slate-100" : "bg-white shadow-xl"}`}>
        {/* Announcement Bar */}
        <div className="bg-gradient-to-r from-primary via-orange-600 via-red-500 to-accent text-white py-4 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center font-extrabold flex items-center justify-center gap-4">
            <span className="animate-bounce text-2xl">🚀</span>
            <span className="text-lg tracking-wide">
              LIMITED TIME! 50% OFF SUMMER COLLECTION + FREE SHIPPING
            </span>
            <span className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-black shadow-lg animate-pulse">
              🔥 HURRY UP!
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-22">
            <div className="flex items-center gap-8">
              {/* Mobile Menu Button */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-3 hover:bg-primary-light rounded-2xl transition-all duration-300 transform hover:scale-105">
                {isMenuOpen ? <X size={28} className="text-primary" /> : <Menu size={28} className="text-primary" />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-11 h-11 bg-gradient-to-br from-primary via-orange-600 to-accent rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                  <span className="text-white text-2xl font-black relative z-10">R</span>
                </div>
                <div>
                  <span className="text-3xl font-black bg-gradient-to-r from-primary via-orange-600 to-accent bg-clip-text text-transparent tracking-tight font-display group-hover:from-accent group-hover:via-orange-600 group-hover:to-primary transition-all duration-700">
                    REXIFY
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex gap-1 items-center">
                {[
                  { label: "Home", href: "/" },
                  { label: "Categories", href: "/categories" },
                  { label: "News", href: "#", badge: "NEW" },
                  { label: "Bestsellers", href: "#" },
                  { label: "Deals", href: "#", badge: "HOT" },
                  { label: "About", href: "#" }
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative px-4 py-2 text-slate-700 hover:text-primary font-bold text-base transition-all duration-300 rounded-xl group hover:bg-gradient-to-r from-primary-light/60 to-orange-100/60"
                  >
                    <span className="relative z-10">{item.label}</span>
                    {item.badge && (
                      <span className={`absolute -top-1 -right-0.5 ${item.badge === 'HOT' ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-accent to-purple-600'} text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-md`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gradient-to-r from-primary-light/60 to-orange-100/60 rounded-full px-6 py-3 w-[400px] border-2 border-transparent focus-within:border-primary focus-within:bg-white focus-within:shadow-xl focus-within:shadow-primary/20 transition-all duration-500">
                <Search className="text-primary" size={22} />
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 ml-4 text-base placeholder:text-slate-500"
                />
              </div>

              {/* Icons */}
              <div className="flex items-center gap-2">
                <button className="relative p-3 hover:bg-gradient-to-r from-primary-light to-orange-100 rounded-xl transition-all duration-300 group transform hover:scale-105">
                  <Heart className="text-slate-600 group-hover:text-primary transition-colors" size={22} strokeWidth={2} />
                  <span className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[10px] font-black rounded-full w-6 h-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    5
                  </span>
                </button>

                <Link href="/cart" className="relative p-3 hover:bg-gradient-to-r from-primary-light to-orange-100 rounded-xl transition-all duration-300 group transform hover:scale-105">
                  <ShoppingCart className="text-slate-600 group-hover:text-primary transition-colors" size={22} strokeWidth={2} />
                  {cartCount > 0 && (
                    <span className="absolute top-2 right-2 bg-gradient-to-r from-primary to-orange-600 text-white text-[10px] font-black rounded-full w-7 h-7 flex items-center justify-center shadow-lg animate-bounce group-hover:animate-none transition-all duration-300">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-3 hover:bg-gradient-to-r from-primary-light to-orange-100 rounded-xl transition-all duration-300 group transform hover:scale-105 flex items-center gap-2"
                  >
                    {session ? (
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white">
                        {session.user?.name?.charAt(0) || "U"}
                      </div>
                    ) : (
                      <User className="text-slate-600 group-hover:text-primary transition-colors" size={22} strokeWidth={2} />
                    )}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-5 w-72 bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgb(0,0,0,0.25)] border border-slate-100 overflow-hidden z-50 animate-slideInLeft">
                      {session ? (
                        <>
                          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-primary-light/30 to-orange-100/30">
                            <p className="text-sm text-slate-600 font-semibold mb-1">Welcome back!</p>
                            <p className="font-black text-slate-900 text-lg">{session.user?.name}</p>
                            <p className="text-sm text-slate-500 font-medium">{session.user?.email}</p>
                          </div>
                          <Link
                            href="/dashboard"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-4 px-6 py-4 text-slate-700 hover:bg-gradient-to-r from-primary-light to-orange-100 hover:text-primary transition-all duration-300 font-bold text-base"
                          >
                            <LayoutDashboard size={22} />
                            My Dashboard
                          </Link>
                          <div className="h-px bg-slate-100 my-1" />
                          <Link
                            href="/cart"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-4 px-6 py-4 text-slate-700 hover:bg-gradient-to-r from-primary-light to-orange-100 hover:text-primary transition-all duration-300 font-bold text-base"
                          >
                            <ShoppingCart size={22} />
                            My Orders
                          </Link>
                          <Link
                            href="#"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-4 px-6 py-4 text-slate-700 hover:bg-gradient-to-r from-primary-light to-orange-100 hover:text-primary transition-all duration-300 font-bold text-base"
                          >
                            <Heart size={22} />
                            Wishlist
                          </Link>
                          <div className="h-px bg-slate-100 my-1" />
                          <button
                            onClick={() => {
                              signOut();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-4 px-6 py-4 text-red-600 hover:bg-gradient-to-r from-red-50 to-rose-50 transition-all duration-300 font-extrabold text-base"
                          >
                            <LogOut size={22} />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="p-6 border-b border-slate-100">
                            <p className="text-slate-700 font-extrabold text-lg">Welcome to REXIFY!</p>
                          </div>
                          <Link
                            href="/login"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-6 py-4 text-slate-700 hover:bg-gradient-to-r from-primary-light to-orange-100 hover:text-primary transition-all duration-300 font-extrabold text-base"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/signup"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-6 py-4 bg-gradient-to-r from-primary to-orange-600 text-white font-extrabold text-base hover:from-primary-dark hover:to-orange-700 transition-all duration-300"
                          >
                            Create Free Account
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 animate-slideInLeft shadow-[0_20px_50px_-12px_rgb(0,0,0,0.15)]">
            <nav className="flex flex-col px-6 py-6 gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "Categories", href: "/categories" },
                { label: "News", href: "#", badge: "NEW" },
                { label: "Bestsellers", href: "#" },
                { label: "Deals", href: "#", badge: "HOT" },
                { label: "About", href: "#" }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-800 font-bold py-4 px-5 hover:text-primary hover:bg-gradient-to-r from-primary-light/50 to-orange-100/50 rounded-xl transition-all duration-300 text-lg flex items-center justify-between relative"
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className={`${item.badge === 'HOT' ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-accent to-purple-600'} text-white text-[9px] font-black px-1.5 py-0.5 rounded-full`}>
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight size={20} className="text-slate-400" />
                </Link>
              ))}
              <div className="md:hidden mt-4">
                <div className="flex items-center bg-gradient-to-r from-primary-light/60 to-orange-100/60 rounded-full px-6 py-4 border-2 border-primary/30">
                  <Search className="text-primary" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 ml-4 text-sm placeholder:text-slate-500"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-52">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative rounded-3xl overflow-hidden h-[550px] shadow-2xl group">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative h-full flex items-center">
                  <div className="px-12 lg:px-20 z-10 animate-slideInLeft">
                    <span className="inline-block bg-white/25 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-bold mb-5 shadow-lg">
                      {slide.subtitle}
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-black text-white mb-5 font-display leading-tight drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-white/95 text-xl mb-10 max-w-lg font-medium">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="group bg-white text-primary px-10 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex items-center gap-3 shadow-xl">
                        Shop Now
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </button>
                      <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-2">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-14 bg-white shadow-lg" : "w-6 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-4 rounded-full text-white transition-all z-10 group/btn hover:scale-110"
            >
              <ChevronLeft size={28} className="group-hover/btn:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-4 rounded-full text-white transition-all z-10 group/btn hover:scale-110"
            >
              <ChevronRight size={28} className="group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-400 group cursor-pointer border border-slate-100 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400 shadow-lg">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-800">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary-light to-white py-20 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 font-display">
                Featured Categories
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Explore our most popular categories and find exactly what you're looking for
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.slice(0, 4).map((category, index) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-10 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-400 shadow-xl">
                      <span className="text-5xl">{category.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 font-display group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-500 mb-6 font-medium">{category.productCount}+ Products</p>
                    <button className="bg-gradient-to-r from-primary to-orange-600 text-white px-8 py-3 rounded-full text-sm font-bold hover:from-primary-dark hover:to-orange-700 transition-all group-hover:scale-105 shadow-lg">
                      Shop Now
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-success to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-slate-900 font-display">New Arrivals</h2>
                <p className="text-slate-600 mt-2 text-lg">Fresh off the shelf - check out our latest products!</p>
              </div>
            </div>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory("All");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 text-success font-bold hover:gap-4 transition-all bg-success/10 px-6 py-3 rounded-full hover:bg-success/20"
            >
              View All New Arrivals <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {newProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-100"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-success text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                      <Zap size={12} />
                      NEW
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:bg-gradient-to-r from-primary to-orange-600 hover:text-white transition-all duration-300 group/heart hover:scale-110">
                      <Heart size={18} className="group-hover/heart:fill-current" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-6 group-hover:translate-y-0 flex gap-3">
                    <Link href={`/product/${product.id}`} className="flex-1 bg-white text-primary font-bold py-3.5 rounded-2xl shadow-xl hover:bg-primary-light transition-all duration-300 text-center font-semibold">
                      View
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="flex-1 bg-gradient-to-r from-primary to-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-xl hover:from-primary-dark hover:to-orange-700 transition-all duration-300 text-center flex items-center justify-center gap-2"
                    >
                      {addedProductIds.includes(product.id) ? (
                        <>
                          <CheckCircle2 size={16} />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          Add
                        </>
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-danger to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                        className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-slate-300"}
                      />
                    ))}
                    <span className="text-sm text-slate-500 ml-2 font-medium">({product.reviews})</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors text-base">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">${product.price.toFixed(2)}</span>
                    <span className="text-slate-400 line-through text-sm font-semibold">${product.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-black text-slate-900 font-display">Browse by Category</h2>
              <p className="text-slate-600 mt-3 text-lg">Discover products from all our amazing categories</p>
            </div>
            <Link
              href="/categories"
              className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all bg-primary-light/50 px-6 py-3 rounded-full hover:bg-primary-light"
            >
              View All Categories <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
            {categories.filter(cat => cat.id !== "All").map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategory(category.name);
                }}
                className="group flex flex-col items-center gap-4 p-8 rounded-3xl bg-white hover:bg-gradient-to-br from-primary to-orange-600 transition-all duration-400 hover:shadow-2xl hover:-translate-y-3 border border-slate-100 hover:border-transparent"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-100 group-hover:bg-white/30 flex items-center justify-center text-4xl group-hover:scale-125 transition-all duration-400 shadow-md">
                  {category.icon}
                </div>
                <span className="font-bold text-slate-800 group-hover:text-white text-center text-sm leading-tight">
                  {category.name}
                </span>
                <span className="text-xs text-slate-500 group-hover:text-white/90 font-medium">
                  {category.productCount}+ Products
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-black text-slate-900 font-display">{activeCategory === "All" ? "All Products" : activeCategory}</h2>
              <p className="text-slate-600 mt-3 text-lg">Discover amazing deals on our best products</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 rounded-full hover:border-primary hover:text-primary hover:bg-primary-light/50 transition-all font-semibold">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          {loading && products.length === 0 && (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="animate-spin text-primary" size={64} />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-100"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-success text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                        NEW
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-gradient-to-r from-accent to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                        BESTSELLER
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:bg-gradient-to-r from-primary to-orange-600 hover:text-white transition-all duration-300 group/heart hover:scale-110">
                      <Heart size={18} className="group-hover/heart:fill-current" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-6 group-hover:translate-y-0 flex gap-3">
                    <Link href={`/product/${product.id}`} className="flex-1 bg-white text-primary font-bold py-3.5 rounded-2xl shadow-xl hover:bg-primary-light transition-all duration-300 text-center font-semibold">
                      View
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="flex-1 bg-gradient-to-r from-primary to-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-xl hover:from-primary-dark hover:to-orange-700 transition-all duration-300 text-center flex items-center justify-center gap-2"
                    >
                      {addedProductIds.includes(product.id) ? (
                        <>
                          <CheckCircle2 size={16} />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          Add
                        </>
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-danger to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                        className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-slate-300"}
                      />
                    ))}
                    <span className="text-sm text-slate-500 ml-2 font-medium">({product.reviews})</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors text-base">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">${product.price.toFixed(2)}</span>
                    <span className="text-slate-400 line-through text-sm font-semibold">${product.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && !loading && (
            <div className="flex justify-center mt-16">
              <button
                onClick={loadMore}
                className="bg-gradient-to-r from-primary to-orange-600 text-white font-bold px-10 py-5 rounded-full hover:from-primary-dark hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" size={22} /> : "Load More Products"}
              </button>
            </div>
          )}
        </section>

        <section className="bg-gradient-to-r from-primary via-orange-600 to-accent py-20 mb-20 rounded-t-[50px] mx-4 lg:mx-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-5 font-display animate-float">
              Get 15% Off Your First Order
            </h2>
            <p className="text-white/95 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Subscribe to our newsletter and be the first to know about new arrivals and exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-8 py-5 rounded-full text-slate-800 outline-none focus:ring-4 focus:ring-white/50 transition-all text-base font-medium shadow-lg"
              />
              <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-black hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <h3 className="text-3xl font-extrabold text-white mb-5 font-display bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">REXIFY</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                Discover amazing products at unbeatable prices. Quality you can trust, service you can count on. Your one-stop shop for everything you need!
              </p>
              <div className="flex gap-4">
                {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r from-primary to-orange-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <span className="text-base font-bold">{social[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Shop</h4>
              <ul className="space-y-4">
                {["New Arrivals", "Bestsellers", "On Sale", "All Products", "Gift Cards"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-primary transition-colors font-medium text-base">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Help</h4>
              <ul className="space-y-4">
                {["FAQ", "Shipping", "Returns", "Order Tracking", "Contact Us"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-primary transition-colors font-medium text-base">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4">
                {["About Us", "Careers", "Blog", "Press", "Affiliates"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-primary transition-colors font-medium text-base">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-slate-500 text-sm font-medium">
              © 2025 REXIFY. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm text-slate-500">
              <a href="#" className="hover:text-primary transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors font-medium">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors font-medium">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
