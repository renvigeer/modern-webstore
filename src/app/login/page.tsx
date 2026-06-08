"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = () => {
    setEmail("demo@example.com");
    setPassword("demo123");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-black">R</span>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent font-display">
              REXIFY
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-slate-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-slate-600">
            Or{" "}
            <Link href="/signup" className="font-semibold text-primary hover:text-primary-dark transition-colors">
              create a new account
            </Link>
          </p>
        </div>
        <button
          onClick={handleDemoLogin}
          className="w-full bg-blue-50 text-blue-700 border border-blue-200 rounded-2xl p-4 flex items-center justify-center gap-3 font-semibold hover:bg-blue-100 transition-colors"
        >
          <User size={20} />
          Fill Demo Credentials
        </button>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm">
          <p className="text-slate-600 mb-1"><strong>Demo Email:</strong> demo@example.com</p>
          <p className="text-slate-600"><strong>Demo Password:</strong> demo123</p>
        </div>
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium border border-red-200">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-2xl relative block w-full pl-12 pr-4 py-4 border border-slate-200 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:z-10 sm:text-lg transition-all"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-2xl relative block w-full pl-12 pr-12 py-4 border border-slate-200 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:z-10 sm:text-lg transition-all"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-primary to-orange-600 hover:from-primary-dark hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-slate-600 hover:text-primary transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
