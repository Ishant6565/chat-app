import { X, MoreVertical, Phone, Video } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3.5 sm:p-4 border-b border-white/10 bg-zinc-950/40 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-10 object-cover rounded-xl border border-white/15 bg-zinc-900 shadow-sm"
            />
            {isOnline ? (
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-emerald-500 rounded-full ring-2 ring-black" />
            ) : (
              <span className="absolute -bottom-0.5 -right-0.5 size-2 bg-zinc-600 rounded-full ring-2 ring-black opacity-60" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white tracking-tight">
              {selectedUser.fullName}
            </h3>
            <p className="text-[11px] text-zinc-400 font-mono">
              {isOnline ? (
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Active now
                </span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedUser(null)}
            className="size-8 rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200"
            title="Close chat"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
