"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, Star, ChevronRight, Plus, Minus, Share2, Shield, Truck, RefreshCw, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  description: string;
  about: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  isNew: boolean;
  isBestseller: boolean;
  tags: string[];
  features?: string[];
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={64} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 font-display">Product Not Found</h2>
          <Link href="/" className="bg-gradient-to-r from-primary to-orange-600 text-white font-bold px-10 py-4 rounded-full hover:from-primary-dark hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm sticky top-0 z-50">
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
              <span className="text-3xl font-extrabold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent tracking-tight font-display">
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
          <Link href="/" className="hover:text-primary font-medium transition-colors">{product.category}</Link>
          <ChevronRight size={18} />
          <span className="text-slate-800 font-bold">{product.name}</span>
        </nav>

        <Link href="/" className="flex items-center gap-3 text-slate-600 hover:text-primary mb-8 transition-colors font-medium text-lg">
          <ArrowLeft size={22} />
          <span>Back to Products</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div>
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl overflow-hidden shadow-2xl mb-8 aspect-square group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {product.isNew && (
                <div className="absolute top-6 left-6">
                  <span className="bg-success text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">NEW</span>
                </div>
              )}
              {product.isBestseller && (
                <div className="absolute top-6 right-6">
                  <span className="bg-gradient-to-r from-accent to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">BESTSELLER</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-2xl overflow-hidden aspect-square border-3 transition-all duration-300 transform hover:scale-105 ${
                    selectedImage === index ? "border-primary shadow-xl ring-4 ring-primary/20" : "border-transparent hover:border-slate-300"
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                {product.isNew && (
                  <span className="bg-success/10 text-success text-xs font-bold px-4 py-1.5 rounded-full border border-success/20">New Arrival</span>
                )}
                {product.isBestseller && (
                  <span className="bg-accent/10 text-accent text-xs font-bold px-4 py-1.5 rounded-full border border-accent/20">Bestseller</span>
                )}
                <span className="bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full border border-primary/20">In Stock: {product.stock}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 font-display leading-tight">{product.name}</h1>
              <div className="flex items-center gap-5 mb-8">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={22}
                      fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                      className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-slate-300"}
                    />
                  ))}
                  <span className="ml-3 text-slate-600 font-bold text-lg">{product.rating}</span>
                </div>
                <span className="text-slate-300 text-xl">•</span>
                <span className="text-slate-600 font-medium text-lg">{product.reviews} reviews</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-10">
              <span className="text-6xl font-black bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">${product.price.toFixed(2)}</span>
              <span className="text-3xl text-slate-400 line-through font-bold">${product.originalPrice.toFixed(2)}</span>
              <span className="bg-gradient-to-r from-danger to-red-600 text-white text-sm font-black px-5 py-2.5 rounded-full shadow-lg">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>

            <p className="text-slate-600 text-xl mb-10 leading-relaxed">{product.description}</p>
            
            <div className="bg-gradient-to-br from-primary-light/30 to-orange-50 rounded-3xl p-8 border border-primary/10 mb-10">
              <h3 className="font-black text-slate-900 mb-4 text-xl flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-r from-primary to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black">!</span>
                </span>
                About This Product
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">{product.about}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="bg-primary-light/50 p-6 rounded-2xl flex items-center gap-4 border border-primary/10">
                <Truck className="text-primary" size={28} />
                <div>
                  <p className="font-bold text-slate-800 text-lg">Free Shipping</p>
                  <p className="text-sm text-slate-500">Over $50</p>
                </div>
              </div>
              <div className="bg-primary-light/50 p-6 rounded-2xl flex items-center gap-4 border border-primary/10">
                <Shield className="text-primary" size={28} />
                <div>
                  <p className="font-bold text-slate-800 text-lg">Secure Payment</p>
                  <p className="text-sm text-slate-500">100% Protected</p>
                </div>
              </div>
              <div className="bg-primary-light/50 p-6 rounded-2xl flex items-center gap-4 border border-primary/10">
                <RefreshCw className="text-primary" size={28} />
                <div>
                  <p className="font-bold text-slate-800 text-lg">Easy Returns</p>
                  <p className="text-sm text-slate-500">30 Days</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-black text-slate-900 mb-5 text-lg">Quantity</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center border-3 border-primary/20 rounded-2xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-5 hover:bg-primary-light transition-all duration-300 text-primary"
                  >
                    <Minus size={24} strokeWidth={3} />
                  </button>
                  <span className="px-8 text-2xl font-black text-slate-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-5 hover:bg-primary-light transition-all duration-300 text-primary">
                    <Plus size={24} strokeWidth={3} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-success rounded-full animate-pulse"></span>
                  <span className="text-slate-600 font-medium">Only {product.stock} left in stock!</span>
                </div>
              </div>
            </div>

            <div className="flex gap-5 mb-12">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-primary to-orange-600 text-white font-black py-6 rounded-3xl hover:from-primary-dark hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-4 text-xl"
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 size={28} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={28} />
                    Add to Cart
                  </>
                )}
              </button>
              <button className="p-6 border-3 border-slate-200 rounded-3xl hover:border-primary hover:text-primary hover:bg-primary-light/30 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Heart size={28} />
              </button>
              <button className="p-6 border-3 border-slate-200 rounded-3xl hover:border-primary hover:text-primary hover:bg-primary-light/30 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Share2 size={28} />
              </button>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
              <h3 className="font-black text-slate-900 mb-6 text-xl">Product Details</h3>
              <ul className="space-y-4">
                {product.tags.map((tag, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 text-lg font-medium">
                    <span className="w-3 h-3 bg-gradient-to-r from-primary to-orange-600 rounded-full shadow-md"></span>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-black text-slate-900 font-display">Related Products</h2>
            <Link href="/" className="text-primary font-bold text-lg flex items-center gap-2 hover:gap-3 transition-all">
              View All <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`}>
                <div
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-100"
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {item.isNew && (
                        <span className="bg-success text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                          NEW
                        </span>
                      )}
                      {item.isBestseller && (
                        <span className="bg-gradient-to-r from-accent to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                          BESTSELLER
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(item.rating) ? "#fbbf24" : "none"}
                          className={i < Math.floor(item.rating) ? "text-yellow-400" : "text-slate-300"}
                        />
                      ))}
                      <span className="text-sm text-slate-500 ml-2 font-medium">({item.reviews})</span>
                    </div>
                    <h3 className="font-bold text-slate-800 mb-3 line-clamp-2 text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-black bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">${item.price.toFixed(2)}</span>
                      <span className="text-slate-400 line-through text-sm font-semibold">${item.originalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm font-medium">© 2025 REXIFY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
