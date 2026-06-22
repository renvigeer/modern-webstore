"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

const slides = [
  {
    title: "Summer Collection",
    subtitle: "Up to 70% Off",
    description: "Discover the latest fashion trends with premium quality fabrics and exclusive designs curated for the season ahead.",
    color: "from-primary/90 via-orange-600/90 to-amber-700/90",
    cta: "Shop Summer Sale",
    ctaLink: "/categories/fashion",
  },
  {
    title: "Tech Innovation",
    subtitle: "New Arrivals",
    description: "Premium electronics at unbeatable prices. Latest smartphones, laptops, and accessories from top brands worldwide.",
    color: "from-slate-900/95 via-blue-900/90 to-accent/80",
    cta: "Shop Electronics",
    ctaLink: "/categories/electronics",
  },
  {
    title: "Luxury Living",
    subtitle: "Limited Edition",
    description: "Transform your space with our exclusive home decor and furniture collection. Elevate every room with timeless design.",
    color: "from-emerald-900/90 via-teal-800/90 to-success/80",
    cta: "Shop Home Decor",
    ctaLink: "/categories/home",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 pt-4">
      <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden h-[400px] sm:h-[480px] lg:h-[580px] shadow-2xl group">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color}`} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.2),transparent_50%)]" />

            <div className="absolute top-1/2 -translate-y-1/2 right-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-white/5 blur-2xl" />

            <div className="relative h-full flex items-center">
              <div className="px-8 sm:px-12 lg:px-16 z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-white/20 shadow-lg">
                  <Sparkles size={13} className="text-yellow-300" />
                  {slide.subtitle}
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 sm:mb-5 font-display leading-[1.05] tracking-tight drop-shadow-lg">
                  {slide.title}
                </h2>

                <p className="text-white/85 text-sm sm:text-base lg:text-lg mb-6 sm:mb-10 max-w-lg leading-relaxed font-light">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link
                    href={slide.ctaLink}
                    className="group inline-flex items-center gap-2 bg-white text-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-xl text-sm sm:text-base"
                  >
                    {slide.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/categories"
                    className="inline-flex items-center bg-white/10 border border-white/25 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-medium hover:bg-white/20 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute top-6 sm:top-10 right-6 sm:right-10 hidden lg:block">
              <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center animate-float-slow shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl xl:text-4xl font-black text-white drop-shadow-lg tracking-tight">
                    {slide.subtitle.includes("70") ? "70%" : slide.subtitle.includes("Limited") ? "50%" : "40%"}
                  </div>
                  <div className="text-white/70 text-xs font-medium mt-0.5 tracking-widest uppercase">OFF</div>
                  <div className="w-12 h-0.5 bg-white/30 mx-auto mt-2 rounded-full" />
                  <div className="text-white/50 text-[10px] mt-1.5 font-medium uppercase tracking-wider">Limited Time</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 backdrop-blur-md p-2.5 sm:p-3 rounded-full text-white transition-all z-10 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 backdrop-blur-md p-2.5 sm:p-3 rounded-full text-white transition-all z-10 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 sm:w-10 h-2 bg-white shadow-lg"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-5 sm:bottom-6 right-5 sm:right-6 z-10">
          <span className="text-white/40 text-[10px] sm:text-xs font-mono tracking-wider">
            {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
