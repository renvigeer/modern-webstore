"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ChevronRight, Star, ShoppingCart, CheckCircle2 } from "lucide-react";
import { categories } from "@/lib/data-generator";
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

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSubcategory, setCurrentSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState<number[]>([]);
  const { addToCart } = useCart();

  const category = categories.find((c) => c.id === categoryId) || categories[0];

  useEffect(() => {
    fetchProducts();
  }, [categoryId, currentSubcategory, sortBy, currentPage, priceRange]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: category.name,
        sort: sortBy,
        page: currentPage.toString(),
        limit: "24",
      });
      if (currentSubcategory) {
        params.set("subcategory", currentSubcategory);
      }

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();

      // Apply client-side price filtering
      let filtered = data.products;
      if (priceRange[0] > 0 || priceRange[1] < 500) {
        filtered = data.products.filter(
          (p: Product) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );
      }

      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
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
        <nav className="flex items-center gap-3 text-sm text-slate-500 mb-10">
          <Link href="/" className="hover:text-primary font-medium transition-colors">
            Home
          </Link>
          <ChevronRight size={18} />
          <Link href="/categories" className="hover:text-primary font-medium transition-colors">
            Categories
          </Link>
          <ChevronRight size={18} />
          <span className="text-slate-800 font-bold">{category.name}</span>
        </nav>

        <Link
          href="/categories"
          className="flex items-center gap-3 text-slate-600 hover:text-primary mb-8 transition-colors font-medium text-lg"
        >
          <ArrowLeft size={22} />
          <span>Back to Categories</span>
        </Link>

        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-5 font-display">
            {category.name}
          </h1>
          <p className="text-slate-600 text-xl">
            Discover our amazing {category.name.toLowerCase()} collection with {category.productCount}+ products
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl mb-12 border border-slate-100">
          <h3 className="font-black text-slate-900 mb-6 text-xl">Subcategories</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setCurrentSubcategory(null)}
              className={`px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                !currentSubcategory
                  ? "bg-gradient-to-r from-primary to-orange-600 text-white shadow-lg"
                  : "bg-primary-light/30 text-slate-700 hover:bg-primary-light/50"
              }`}
            >
              All
            </button>
            {category.subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => setCurrentSubcategory(subcategory)}
                className={`px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  currentSubcategory === subcategory
                    ? "bg-gradient-to-r from-primary to-orange-600 text-white shadow-lg"
                    : "bg-primary-light/30 text-slate-700 hover:bg-primary-light/50"
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">
          <p className="text-slate-600 text-lg font-medium">
            {loading ? "Loading products..." : `${products.length} products found`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-100"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    loading="lazy"
                  />
                  <div className="absolute top-5 left-5 flex flex-col gap-3">
                    {product.isNew && (
                      <span className="bg-success text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        NEW
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-gradient-to-r from-accent to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        BESTSELLER
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-6 group-hover:translate-y-0 flex gap-3">
                    <Link
                      href={`/product/${product.id}`}
                      className="flex-1 bg-white text-primary font-bold py-4 rounded-2xl shadow-xl hover:bg-primary-light/30 transition-all duration-300 text-center"
                    >
                      View
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="flex-1 bg-gradient-to-r from-primary to-orange-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:from-primary-dark hover:to-orange-700 transition-all duration-300 text-center flex items-center justify-center gap-2"
                    >
                      {addedProductIds.includes(product.id) ? (
                        <>
                          <CheckCircle2 size={18} />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} />
                          Add
                        </>
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-5 left-5 bg-gradient-to-r from-danger to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                        className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-slate-300"}
                      />
                    ))}
                    <span className="text-sm text-slate-500 ml-3 font-medium">({product.reviews})</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-3 line-clamp-2 text-base group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-slate-400 line-through text-sm font-semibold">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gradient-to-r from-primary via-orange-600 to-accent py-20 rounded-3xl text-white text-center mx-4 lg:mx-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black mb-6 font-display">Don&apos;t Miss Out!</h2>
            <p className="text-white/95 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Get exclusive deals and updates on new {category.name.toLowerCase()} arrivals by subscribing to our
              newsletter.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-8 py-5 rounded-full text-slate-800 outline-none focus:ring-4 focus:ring-white/40 transition-all text-base font-semibold"
              />
              <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-black hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-20 pb-10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm font-medium">© 2025 REXIFY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
