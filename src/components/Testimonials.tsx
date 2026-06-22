"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    avatar: "/placeholder.svg?height=60&width=60",
    content: "Absolutely love the quality and design. The shipping was incredibly fast and the customer service was top-notch. I have become a loyal customer!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tech Enthusiast",
    avatar: "/placeholder.svg?height=60&width=60",
    content: "Best online shopping experience I have ever had. Premium products at reasonable prices with excellent packaging and delivery.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Interior Designer",
    avatar: "/placeholder.svg?height=60&width=60",
    content: "The home decor collection is stunning. Every piece exceeded my expectations in quality and craftsmanship. Highly recommended!",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Verified Buyer",
    avatar: "/placeholder.svg?height=60&width=60",
    content: "I was skeptical at first but this store exceeded all expectations. The product quality matches premium brands at a fraction of the price.",
    rating: 4,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-[24px] sm:rounded-[32px] border border-slate-100 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-14">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-gold/10 to-transparent rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-1 block">
                Testimonials
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display">
                What Our Customers Say
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-primary/50 text-slate-500 hover:text-primary hover:bg-primary-light/20 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-primary/50 text-slate-500 hover:text-primary hover:bg-primary-light/20 transition-all"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {[testimonials[current], testimonials[(current + 1) % testimonials.length]].map((t, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-5 sm:p-7 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-500"
              >
                <Quote size={28} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-primary/10" />

                <div className="flex items-center gap-1.5 mb-4">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={`sm:w-4 sm:h-4 ${j < t.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                    />
                  ))}
                </div>

                <p className="text-slate-600 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed italic relative z-10">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-light to-orange-100 rounded-full flex items-center justify-center text-primary font-bold text-sm sm:text-base">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm sm:text-base">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6 sm:hidden">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current || i === (current + 1) % testimonials.length
                    ? "w-5 h-2 bg-primary"
                    : "w-2 h-2 bg-slate-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
