"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Eye, Check, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  stock: number;
  isNew: boolean;
  isBestseller: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      className="group relative bg-white rounded-[20px] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-1 border border-slate-100/80 card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {product.images?.[1] && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            className={`object-cover absolute inset-0 transition-all duration-700 ${
              isHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-red-500/25 backdrop-blur-sm">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/25 backdrop-blur-sm">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-amber-500/25 backdrop-blur-sm">
              BESTSELLER
            </span>
          )}
        </div>

        <button
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-all duration-300 hover:bg-white hover:shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart size={14} className="sm:w-4 sm:h-4" />
        </button>

        <div
          className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-white/95 via-white/80 to-transparent transform transition-all duration-500 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 ${
                isAdded
                  ? "bg-emerald-500"
                  : "bg-gradient-to-r from-primary to-orange-600 hover:from-primary-dark hover:to-orange-700"
              } text-white py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95`}
            >
              {isAdded ? (
                <>
                  <Check size={14} className="sm:w-4 sm:h-4" /> Added
                </>
              ) : (
                <>
                  <ShoppingCart size={14} className="sm:w-4 sm:h-4" /> Add to Cart
                </>
              )}
            </button>
            <Link
              href={`/product/${product.id}`}
              className="p-2 sm:p-2.5 border border-slate-200 hover:border-primary/50 text-slate-500 hover:text-primary rounded-xl transition-all duration-300 hover:bg-primary-light/20"
            >
              <Eye size={14} className="sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>

      <Link href={`/product/${product.id}`}>
        <div className="p-3 sm:p-4 lg:p-5">
          <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
            {product.category}
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-1.5 sm:mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => {
                const filled = product.rating >= i + 1;
                const half = !filled && product.rating >= i + 0.5;
                return (
                  <Star
                    key={i}
                    size={10}
                    className={`sm:w-3 sm:h-3 ${
                      filled
                        ? "fill-amber-400 text-amber-400"
                        : half
                        ? "fill-amber-400/50 text-amber-400/50"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-[10px] sm:text-xs text-slate-400">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {!inStock && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-[20px]">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-xl border border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <X size={16} className="text-red-400" /> Out of Stock
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
