import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Zap } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, loginDemo, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black text-white pt-16">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="inline-flex size-12 rounded-2xl bg-white/10 border border-white/15 items-center justify-center mb-3 shadow-sm">
              <MessageSquare className="size-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">Sign in to your Hidden Leaf account</p>
          </div>

          {/* Quick Demo Access Button */}
          <div className="p-3.5 rounded-2xl border border-white/15 bg-zinc-900/80 backdrop-blur-xl text-center space-y-2 shadow-xl">
            <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-300 font-medium">
              <Zap className="size-3.5 text-amber-400 fill-amber-400" />
              <span>Instant Portfolio Preview</span>
            </div>
            <button
              type="button"
              onClick={() => loginDemo("naruto")}
              className="w-full py-2 px-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              ⚡ Explore as Naruto Uzumaki (Demo)
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-black px-3 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Or with Credentials
            </span>
            <div className="border-t border-white/10 w-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-300">Email Address</label>
              <div className="relative">
                <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-300">Password</label>
              <div className="relative">
                <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 border border-white/15 text-white font-semibold text-sm hover:bg-zinc-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg mt-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Switch link */}
          <div className="text-center text-xs text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-white hover:underline font-medium">
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Geometric Pattern */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your shinobi communications across the Hidden Leaf Village."
      />
    </div>
  );
};

export default LoginPage;
