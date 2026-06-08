"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  User,
  ArrowLeft,
  Package,
  CreditCard,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors text-lg font-medium">
            <ArrowLeft size={20} />
            Back to Store
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{session?.user?.name}</h3>
                  <p className="text-slate-500 text-sm">{session?.user?.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "overview", label: "Overview", icon: LayoutDashboard },
                  { id: "orders", label: "My Orders", icon: ShoppingBag },
                  { id: "wishlist", label: "Wishlist", icon: Heart },
                  { id: "addresses", label: "Addresses", icon: MapPin },
                  { id: "payment", label: "Payment Methods", icon: CreditCard },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-primary/10 to-orange-600/10 text-primary font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}

                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition-all mt-4"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-orange-600/10 rounded-xl flex items-center justify-center mb-4">
                      <ShoppingBag className="text-primary" size={24} />
                    </div>
                    <p className="text-slate-500 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold text-slate-900">0</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mb-4">
                      <Heart className="text-pink-600" size={24} />
                    </div>
                    <p className="text-slate-500 text-sm">Wishlist Items</p>
                    <p className="text-3xl font-bold text-slate-900">0</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
                      <Star className="text-green-600" size={24} />
                    </div>
                    <p className="text-slate-500 text-sm">Reviews</p>
                    <p className="text-3xl font-bold text-slate-900">0</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
                  <div className="text-center py-12 text-slate-500">
                    <Package size={48} className="mx-auto mb-4 text-slate-300" />
                    <p className="text-lg">No recent activity</p>
                    <p className="text-sm">Your activity will appear here</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">My Orders</h2>
                <div className="text-center py-12 text-slate-500">
                  <ShoppingBag size={48} className="mx-auto mb-4 text-slate-300" />
                  <p className="text-lg">No orders yet</p>
                  <Link
                    href="/"
                    className="inline-block mt-4 bg-gradient-to-r from-primary to-orange-600 text-white font-semibold px-8 py-3 rounded-full hover:from-primary-dark hover:to-orange-700 transition-all"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">My Wishlist</h2>
                <div className="text-center py-12 text-slate-500">
                  <Heart size={48} className="mx-auto mb-4 text-slate-300" />
                  <p className="text-lg">Your wishlist is empty</p>
                  <Link
                    href="/"
                    className="inline-block mt-4 bg-gradient-to-r from-primary to-orange-600 text-white font-semibold px-8 py-3 rounded-full hover:from-primary-dark hover:to-orange-700 transition-all"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={session?.user?.name || ""}
                      disabled
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={session?.user?.email || ""}
                      disabled
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 text-slate-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
