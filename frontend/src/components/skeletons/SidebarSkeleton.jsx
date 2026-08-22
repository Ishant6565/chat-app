import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-white/10 flex flex-col bg-zinc-950/40 backdrop-blur-md">
      {/* Header */}
      <div className="border-b border-white/10 w-full p-4 lg:p-5">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Users className="size-4 text-zinc-600" />
          </div>
          <span className="font-semibold text-sm text-zinc-400 hidden lg:block">
            Contacts
          </span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3 px-2 space-y-2">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full p-2.5 flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 animate-pulse"
          >
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="size-11 rounded-xl bg-zinc-800/80" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">
              <div className="h-3.5 bg-zinc-800/80 rounded w-28" />
              <div className="h-2.5 bg-zinc-800/40 rounded w-14" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
