"use client";

import { useState, useMemo } from "react";
import { ArrowRight, ChevronDown, Loader2, Trophy } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";

export default function BestsellersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({
    isBestseller: true,
    search: searchQuery || undefined,
  });

  const products = useMemo(() => data?.pages.flatMap((p) => p.products) ?? [], [data]);

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
        activeCategory="All"
        onCategoryChange={() => {}}
      />
      <main className="pt-[140px] sm:pt-[148px] lg:pt-[152px]">
        <section className="bg-gradient-to-r from-accent via-purple-600 to-indigo-800 py-16 sm:py-20 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Trophy size={16} />
              TOP RATED & MOST LOVED
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 font-display">Bestsellers</h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto">
              Our most popular products chosen by thousands of happy customers. Shop the best of the best!
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-slate-500 text-sm sm:text-base">
                {sortedProducts.length} bestseller{sortedProducts.length !== 1 ? "s" : ""} found
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

          {isLoading && products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="animate-spin text-primary" size={48} />
              <p className="text-slate-500 font-medium text-sm">Loading bestsellers...</p>
            </div>
          )}

          {!isLoading && products.length === 0 && (
            <div className="text-center py-32">
              <Trophy size={48} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">No bestsellers yet</h3>
              <p className="text-slate-500 text-sm">Check back soon for trending products</p>
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
                    Load More
                    <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
