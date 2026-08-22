import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-3">
        <div className="size-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center animate-pulse">
          <Loader className="size-5 animate-spin text-white" />
        </div>
        <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase animate-pulse">
          Loading Chatty...
        </p>
      </div>
    );

  return (
    <div data-theme={theme} className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "0.75rem",
            fontSize: "0.875rem",
          },
        }}
      />
    </div>
  );
};

export default App;
