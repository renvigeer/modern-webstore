"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Loader2, ChevronDown } from "lucide-react";

import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import FeaturesBar from "@/components/FeaturesBar";
import ProductCard from "@/components/ProductCard";
import FlashSale from "@/components/FlashSale";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCategories, useProducts } from "@/hooks/use-products";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const { data: categoriesData, isLoading: catsLoading } = useCategories();
  const categories = categoriesData ?? [];

  const {
    data: productsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({ category: activeCategory === "All" ? undefined : activeCategory, search: searchQuery || undefined });

  const products = useMemo(() => productsData?.pages.flatMap((p) => p.products) ?? [], [productsData]);
  const newProducts = useMemo(() => products.filter((p) => p.isNew).slice(0, 8), [products]);

  const handleCategoryChange = useCallback((cat: string) => setActiveCategory(cat), []);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-asc": return sorted.sort((a, b) => a.price - b.price);
      case "price-desc": return sorted.sort((a, b) => b.price - a.price);
      case "rating": return sorted.sort((a, b) => b.rating - a.rating);
      default: return sorted;
    }
  }, [products, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="pt-[140px] sm:pt-[148px] lg:pt-[152px]">
        <HeroSlider />
        <Reveal><FeaturesBar /></Reveal>

        {!catsLoading && categories.length > 1 && (
          <Reveal>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display">Featured Categories</h2>
                    <p className="text-slate-500 text-sm sm:text-base mt-1">Shop by category to find your perfect product</p>
                  </div>
                </div>
                <Link
                  href="/categories"
                  className="hidden sm:inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all bg-primary-light/60 px-5 py-2.5 rounded-full hover:bg-primary-light"
                >
                  View All <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {categories.slice(1, 5).map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    onClick={() => handleCategoryChange(category.name)}
                    className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-400 border border-slate-100 hover:-translate-y-1"
                  >
                    <div className="p-6 sm:p-8 lg:p-10 text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-light to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-400 shadow-md">
                        <span className="text-3xl sm:text-4xl">{category.icon}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-5 font-medium">{category.productCount}+ items</p>
                      <Badge className="bg-gradient-to-r from-primary to-orange-600 text-white text-xs sm:text-sm font-bold px-5 sm:px-6 py-2 sm:py-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg border-0">
                        Shop Now
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {newProducts.length > 0 && (
          <Reveal>
            <section className="bg-gradient-to-br from-primary-light/40 to-white py-12 sm:py-16 lg:py-20 mb-16 sm:mb-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8 sm:mb-10">
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display">New Arrivals</h2>
                    <p className="text-slate-500 text-sm sm:text-base mt-1">Fresh off the shelf &mdash; check out the latest products!</p>
                  </div>
                  <Link
                    href="/categories"
                    className="hidden sm:inline-flex items-center gap-2 text-success font-bold text-sm hover:gap-3 transition-all bg-success/10 px-5 py-2.5 rounded-full hover:bg-success/20"
                  >
                    View All <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                  {newProducts.slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          </Reveal>
        )}

        <Reveal><FlashSale /></Reveal>

        {!catsLoading && categories.length > 1 && (
          <Reveal>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display">Browse by Category</h2>
                  <p className="text-slate-500 text-sm sm:text-base mt-1">Discover products from all our categories</p>
                </div>
                <Link
                  href="/categories"
                  className="hidden sm:inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all bg-primary-light/60 px-5 py-2.5 rounded-full hover:bg-primary-light"
                >
                  View All <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 sm:gap-4">
                {categories.filter((c) => c.id !== "All").map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    onClick={() => {
                      handleCategoryChange(category.name);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group flex flex-col items-center gap-3 p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white hover:bg-gradient-to-br from-primary to-orange-600 transition-all duration-400 hover:shadow-2xl hover:-translate-y-2 border border-slate-100 hover:border-transparent"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 group-hover:bg-white/20 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-all duration-400 shadow-sm">
                      {category.icon}
                    </div>
                    <span className="font-semibold text-slate-800 group-hover:text-white text-center text-[11px] sm:text-xs leading-tight">
                      {category.name}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 group-hover:text-white/80 font-medium">
                      {category.productCount}+
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        <Reveal><Testimonials /></Reveal>

        <Reveal>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display">
                  {activeCategory === "All" ? "All Products" : activeCategory}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mt-1">
                  {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 rounded-full"
                >
                  {sortBy === "default" ? "Sort" : sortBy === "price-asc" ? "Price: Low" : sortBy === "price-desc" ? "Price: High" : "Top Rated"}
                  <ChevronDown size={14} className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                </Button>
                {showSortDropdown && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-20 overflow-hidden animate-scaleIn origin-top-right">
                      {[
                        { label: "Default", value: "default" as const },
                        { label: "Price: Low to High", value: "price-asc" as const },
                        { label: "Price: High to Low", value: "price-desc" as const },
                        { label: "Top Rated", value: "rating" as const },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-all ${
                            sortBy === option.value
                              ? "text-primary bg-primary-light/50"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {isLoading && sortedProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 sm:py-32 gap-4">
                <Loader2 className="animate-spin text-primary" size={48} />
                <p className="text-slate-500 font-medium text-sm">Loading products...</p>
              </div>
            )}

            {!isLoading && sortedProducts.length === 0 && (
              <div className="text-center py-24 sm:py-32">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Zap size={36} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
                <p className="text-slate-500 text-sm mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="bg-gradient-to-r from-primary to-orange-600 text-white font-bold px-6 py-3 rounded-full hover:from-primary-dark hover:to-orange-700 transition-all"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasNextPage && !isLoading && (
              <div className="flex justify-center mt-10 sm:mt-14">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="bg-gradient-to-r from-primary to-orange-600 text-white font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:from-primary-dark hover:to-orange-700 transition-all duration-300 hover:-translate-y-1 shadow-2xl flex items-center gap-3 text-sm sm:text-base h-auto"
                >
                  {isFetchingNextPage ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      Load More Products
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </div>
            )}
          </section>
        </Reveal>

        <Reveal><Newsletter /></Reveal>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
