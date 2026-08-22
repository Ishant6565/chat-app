import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Circle, Search } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true))
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-white/10 flex flex-col bg-zinc-950/40 backdrop-blur-md transition-all duration-300">
      {/* Header */}
      <div className="border-b border-white/10 w-full p-4 lg:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Users className="size-4 text-zinc-300" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white hidden lg:block">
              Contacts
            </span>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {Math.max(0, onlineUsers.length - 1)} online
          </span>
        </div>

        {/* Search input for desktop */}
        <div className="mt-3 hidden lg:block relative">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-zinc-900/80 border border-white/10 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-all"
          />
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2 select-none group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs rounded border-white/20 checked:border-white checked:bg-white checked:text-black"
            />
            <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
              Online only
            </span>
          </label>
        </div>
      </div>

      {/* User list */}
      <div className="overflow-y-auto w-full py-2 px-2 space-y-1">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-2.5 flex items-center gap-3 rounded-xl transition-all duration-200 text-left
                ${
                  isSelected
                    ? "bg-white/10 border border-white/15 shadow-sm text-white"
                    : "hover:bg-white/5 hover:translate-x-1 border border-transparent text-zinc-400 hover:text-zinc-200"
                }
              `}
            >
              <div className="relative mx-auto lg:mx-0 flex-shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-11 object-cover rounded-xl border border-white/10 bg-zinc-900"
                />
                {isOnline ? (
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 rounded-full ring-2 ring-black" />
                ) : (
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-zinc-600 rounded-full ring-2 ring-black opacity-60" />
                )}
              </div>

              {/* User info */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className={`font-medium text-xs truncate ${isSelected ? "text-white" : "text-zinc-200"}`}>
                    {user.fullName}
                  </div>
                </div>
                <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                  {isOnline ? (
                    <span className="text-emerald-400 font-medium">Online</span>
                  ) : (
                    <span>Offline</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-600 text-xs py-8 font-mono">
            No contacts found
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
