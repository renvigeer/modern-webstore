"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        router.push("/dashboard");
      } else {
        setError(data.message || "Error creating account");
        setLoading(false);
      }
    } catch (err) {
      setError("Server error");
      setLoading(false);
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
          <h2 className="mt-6 text-3xl font-bold text-slate-900">Create your account</h2>
          <p className="mt-2 text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:text-primary-dark transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium border border-red-200">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none rounded-2xl relative block w-full pl-12 pr-4 py-4 border border-slate-200 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:z-10 sm:text-lg transition-all"
                  placeholder="Full Name"
                />
              </div>
            </div>
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
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-2xl relative block w-full pl-12 pr-12 py-4 border border-slate-200 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:z-10 sm:text-lg transition-all"
                  placeholder="Password (min 6 characters)"
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
              {loading ? "Creating account..." : "Create Account"}
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
