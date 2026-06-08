"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Star, Filter, ArrowRight } from "lucide-react";
import { categories } from "@/lib/data-generator";

interface CategoryType {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  productCount: number;
}

const categoryColors = {
  fashion: "from-pink-500 to-rose-500",
  electronics: "from-blue-500 to-indigo-500",
  home: "from-green-500 to-emerald-500",
  beauty: "from-purple-500 to-violet-500",
  sports: "from-orange-500 to-amber-500",
  toys: "from-yellow-500 to-lime-500",
  automotive: "from-gray-600 to-slate-600",
  pets: "from-teal-500 to-cyan-500"
};

export default function CategoriesPage() {
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategoriesData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoriesData(categories);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  }

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
          <Link href="/" className="hover:text-primary font-medium transition-colors">Home</Link>
          <ChevronRight size={18} />
          <span className="text-slate-800 font-bold">All Categories</span>
        </nav>

        <div className="mb-16 text-center">
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 font-display">
            Browse by Category
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto">
            Explore our extensive collection of products organized by category. Find exactly what you're looking for.
          </p>
        </div>

        {selectedCategory ? (
          <section>
            <div className="flex items-center gap-4 mb-12">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors font-medium text-lg"
              >
                <ArrowLeft size={22} />
                <span>Back to Categories</span>
              </button>
              <h2 className="text-4xl font-black text-slate-900 font-display">
                {categoriesData.find(c => c.id === selectedCategory)?.name}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categoriesData
                .find(c => c.id === selectedCategory)
                ?.subcategories.map((subcategory, index) => (
                  <Link
                    key={index}
                    href={`/categories/${selectedCategory}/${encodeURIComponent(subcategory)}`}
                    className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-primary/30 transform hover:-translate-y-2"
                  >
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                      {subcategory}
                    </h3>
                    <div className="flex items-center gap-3 text-slate-500 group-hover:text-slate-700 font-medium text-lg">
                      <span>View Products</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {categoriesData.map((category, index) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-r ${categoryColors[category.id as keyof typeof categoryColors] || "from-primary to-orange-500"} rounded-3xl p-1.5 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1`}>
                  <div className="bg-white rounded-[24px] p-10">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-light to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                          <span className="text-5xl">{category.icon}</span>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-3 font-display group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-slate-600 text-lg font-medium">{category.productCount}+ Products</p>
                      </div>
                      <div className="bg-gradient-to-r from-primary-light to-white p-5 rounded-2xl group-hover:from-primary group-hover:to-orange-600 group-hover:text-white transition-all duration-300 shadow-lg">
                        <ChevronRight size={28} className="text-primary group-hover:text-white" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {category.subcategories.slice(0, 4).map((subcategory, index) => (
                        <div
                          key={index}
                          className="bg-slate-50 group-hover:bg-primary-light/30 px-6 py-4 rounded-xl text-base text-slate-700 group-hover:text-primary font-medium transition-colors"
                        >
                          {subcategory}
                        </div>
                      ))}
                      {category.subcategories.length > 4 && (
                        <div className="bg-slate-100 px-6 py-4 rounded-xl text-base text-slate-600 text-center font-medium">
                          +{category.subcategories.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <section className="mt-20 bg-gradient-to-br from-primary-light/30 to-white py-16 rounded-3xl border border-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-slate-900 font-display">Popular Categories</h2>
              <Link
                href="/"
                className="text-primary font-bold text-lg flex items-center gap-2 hover:gap-3 transition-all"
              >
                View All <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categoriesData.slice(0, 6).map((category, index) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category.id);
                  }}
                  className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 text-center transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-white rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-all duration-300">
                    <span className="text-4xl">{category.icon}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors text-lg mb-2">
                    {category.name}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium">{category.productCount} items</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-20 pb-10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm font-medium">© 2025 REXIFY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}