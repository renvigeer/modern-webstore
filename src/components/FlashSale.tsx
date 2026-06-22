"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Zap, ArrowRight } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3);
targetDate.setHours(23, 59, 59, 0);

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/15 shadow-lg">
        <span className="text-lg sm:text-2xl font-black text-white tabular-nums drop-shadow-md">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[9px] sm:text-xs text-white/50 mt-1.5 font-medium uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

const flashProduct = {
  name: "Premium Wireless Headphones",
  image: "/placeholder.svg?height=400&width=400",
  originalPrice: 299.99,
  price: 149.99,
  discount: 50,
};

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) return;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      <div className="relative bg-gradient-to-br from-rose-900 via-red-800 to-orange-900 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.05),transparent_40%)]" />
        <div className="absolute top-[-30%] right-[-20%] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-8 items-center p-6 sm:p-10 lg:p-14">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-white/20 shadow-lg mb-4 sm:mb-6">
              <Zap size={13} className="text-yellow-300" />
              FLASH SALE
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-3 font-display leading-tight drop-shadow-lg">
              {flashProduct.name}
            </h2>

            <p className="text-white/75 text-sm sm:text-base mb-6 sm:mb-8 max-w-md leading-relaxed">
              Limited time offer. Grab this deal before it is gone. Premium quality at an unbeatable price.
            </p>

            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <span className="text-3xl sm:text-5xl font-black text-white drop-shadow-lg">
                ${flashProduct.price.toFixed(2)}
              </span>
              <span className="text-lg sm:text-2xl text-white/40 line-through font-medium">
                ${flashProduct.originalPrice.toFixed(2)}
              </span>
              <span className="bg-white/20 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full border border-white/25">
                -{flashProduct.discount}%
              </span>
            </div>

            <Link
              href="/deals"
              className="inline-flex items-center gap-2 bg-white text-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-xl text-sm sm:text-base group"
            >
              Grab This Deal
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center gap-6">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[32px] border border-white/15" />
              <Image
                src={flashProduct.image}
                alt={flashProduct.name}
                fill
                className="object-contain p-6 sm:p-8 drop-shadow-2xl"
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
              />
            </div>

            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <Clock size={12} />
              <span className="font-medium tracking-wide">ENDS IN</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <TimeUnit value={timeLeft.days} label="Days" />
              <span className="text-white/20 text-xl sm:text-2xl font-black">:</span>
              <TimeUnit value={timeLeft.hours} label="Hrs" />
              <span className="text-white/20 text-xl sm:text-2xl font-black">:</span>
              <TimeUnit value={timeLeft.minutes} label="Min" />
              <span className="text-white/20 text-xl sm:text-2xl font-black">:</span>
              <TimeUnit value={timeLeft.seconds} label="Sec" />
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 px-6 sm:px-10 lg:px-14 py-3 sm:py-4">
          <div className="flex items-center justify-center gap-4 sm:gap-8 text-white/40 text-[10px] sm:text-xs font-medium tracking-wide">
            <span className="flex items-center gap-1.5">🔥 1,234 Sold</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">👁️ 5.6K Watching</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">⏰ Limited Stock</span>
          </div>
        </div>
      </div>
    </section>
  );
}
