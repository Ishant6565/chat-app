import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="size-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-black text-white transition-all duration-300 shadow-sm">
                <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight text-white">
                  Hidden Leaf Village
                </span>
                <span className="text-[10px] text-zinc-400 font-mono -mt-1 tracking-widest uppercase">
                  Shinobi Network
                </span>
              </div>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/settings"
              className="btn btn-sm btn-ghost rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 text-zinc-200 gap-2 transition-all duration-200"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              <span className="hidden sm:inline text-xs font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm btn-ghost rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 text-zinc-200 gap-2 transition-all duration-200"
                >
                  <User className="size-4 text-zinc-400" />
                  <span className="hidden sm:inline text-xs font-medium">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-sm btn-ghost rounded-lg border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 text-zinc-300 hover:text-red-400 gap-2 transition-all duration-200 ml-1"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline text-xs font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
