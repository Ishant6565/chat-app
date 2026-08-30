import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL 
  ? import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '') 
  : (import.meta.env.MODE === "development" ? "http://localhost:5001" : "/");

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error?.message || error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  loginDemo: (role = "naruto") => {
    const demoUser = {
      _id: "demo-user-101",
      fullName: role === "kakashi" ? "Kakashi Hatake" : "Naruto Uzumaki",
      email: role === "kakashi" ? "kakashi@hiddenleaf.ninja" : "naruto@hiddenleaf.ninja",
      profilePic: role === "kakashi"
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      createdAt: new Date().toISOString(),
    };
    set({ authUser: demoUser, isCheckingAuth: false });
    toast.success(`Welcome to Hidden Leaf Village, ${demoUser.fullName}! 🍃`);
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to connect to backend server. Try Demo Login!";
      toast.error(msg);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      const msg = error?.response?.data?.message || "Backend offline. Click 'Quick Demo Access' to explore!";
      toast.error(msg);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      if (!get().authUser?._id?.startsWith("demo-")) {
        await axiosInstance.post("/auth/logout");
      }
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      const msg = error?.response?.data?.message || "Logged out";
      set({ authUser: null });
      toast.success(msg);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      if (get().authUser?._id?.startsWith("demo-")) {
        set({ authUser: { ...get().authUser, profilePic: data.profilePic } });
        toast.success("Demo profile updated successfully!");
        return;
      }
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to update profile";
      toast.error(msg);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected || authUser._id?.startsWith("demo-")) return;

    try {
      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id,
        },
      });
      socket.connect();

      set({ socket: socket });

      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });
    } catch (e) {
      console.warn("Socket connection skipped:", e);
    }
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
