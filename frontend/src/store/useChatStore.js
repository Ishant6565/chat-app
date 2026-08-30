import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

const MOCK_SHINOBI_USERS = [
  {
    _id: "ninja-1",
    fullName: "Sasuke Uchiha",
    email: "sasuke@hiddenleaf.ninja",
    profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    isOnline: true,
  },
  {
    _id: "ninja-2",
    fullName: "Kakashi Hatake",
    email: "kakashi@hiddenleaf.ninja",
    profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    isOnline: true,
  },
  {
    _id: "ninja-3",
    fullName: "Sakura Haruno",
    email: "sakura@hiddenleaf.ninja",
    profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    isOnline: false,
  },
  {
    _id: "ninja-4",
    fullName: "Itachi Uchiha",
    email: "itachi@akatsuki.ninja",
    profilePic: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    isOnline: true,
  },
];

const MOCK_MESSAGES_MAP = {
  "ninja-1": [
    { _id: "m1", senderId: "ninja-1", text: "Naruto, the mission report is ready.", createdAt: new Date(Date.now() - 3600000).toISOString() },
    { _id: "m2", senderId: "demo-user-101", text: "Got it Sasuke! Let's regroup at the Hokage monument.", createdAt: new Date(Date.now() - 1800000).toISOString() },
    { _id: "m3", senderId: "ninja-1", text: "Understood. Don't be late.", createdAt: new Date(Date.now() - 600000).toISOString() },
  ],
  "ninja-2": [
    { _id: "m4", senderId: "ninja-2", text: "Team 7, tomorrow's training starts at 5:00 AM.", createdAt: new Date(Date.now() - 7200000).toISOString() },
    { _id: "m5", senderId: "demo-user-101", text: "Kakashi-sensei, you're going to be late anyway! 😂", createdAt: new Date(Date.now() - 3600000).toISOString() },
  ],
  "ninja-3": [
    { _id: "m6", senderId: "ninja-3", text: "Naruto, Lady Tsunade asked for medical division assistance.", createdAt: new Date(Date.now() - 10000000).toISOString() },
  ],
  "ninja-4": [
    { _id: "m7", senderId: "ninja-4", text: "Protect the Hidden Leaf Village always.", createdAt: new Date(Date.now() - 86400000).toISOString() },
  ],
};

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const isDemo = useAuthStore.getState().authUser?._id?.startsWith("demo-");
      if (isDemo) {
        set({ users: MOCK_SHINOBI_USERS });
        return;
      }
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data && res.data.length > 0 ? res.data : MOCK_SHINOBI_USERS });
    } catch (error) {
      console.warn("Using fallback shinobi contacts:", error?.message);
      set({ users: MOCK_SHINOBI_USERS });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const isDemo = useAuthStore.getState().authUser?._id?.startsWith("demo-");
      if (isDemo || !userId) {
        set({ messages: MOCK_MESSAGES_MAP[userId] || [] });
        return;
      }
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data || [] });
    } catch (error) {
      console.warn("Using fallback messages:", error?.message);
      set({ messages: MOCK_MESSAGES_MAP[userId] || [] });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    const isDemo = useAuthStore.getState().authUser?._id?.startsWith("demo-");
    if (isDemo) {
      const newMsg = {
        _id: "demo-msg-" + Date.now(),
        senderId: useAuthStore.getState().authUser._id,
        text: messageData.text,
        image: messageData.image,
        createdAt: new Date().toISOString(),
      };
      set({ messages: [...messages, newMsg] });

      // Simulated realistic reply after 1.2 seconds
      setTimeout(() => {
        const replyMsg = {
          _id: "reply-" + Date.now(),
          senderId: selectedUser._id,
          text: `[${selectedUser.fullName.split(" ")[0]}]: Received your chakra transmission! 🍃`,
          createdAt: new Date().toISOString(),
        };
        set({ messages: [...get().messages, replyMsg] });
      }, 1200);
      return;
    }

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to send message";
      toast.error(msg);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    try {
      socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;

        set({
          messages: [...get().messages, newMessage],
        });
      });
    } catch (e) {
      console.warn("Socket subscribe skipped:", e);
    }
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },
}));
