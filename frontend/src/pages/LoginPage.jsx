import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black text-white pt-16">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          {/* Logo & Header */}
          <div className="text-center">
            <div className="inline-flex size-12 rounded-2xl bg-white/10 border border-white/15 items-center justify-center mb-4 shadow-sm">
              <MessageSquare className="size-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">Sign in to your account</p>
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
              className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg mt-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Signing in...</span>
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
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;
