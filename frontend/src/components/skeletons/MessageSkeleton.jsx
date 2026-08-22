const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => {
        const isEnd = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`flex items-end gap-3 ${
              isEnd ? "justify-end" : "justify-start"
            } animate-pulse`}
          >
            {!isEnd && (
              <div className="size-9 rounded-xl bg-zinc-800 border border-white/10 flex-shrink-0" />
            )}
            <div className="space-y-1.5 max-w-[65%]">
              <div
                className={`h-10 rounded-2xl ${
                  isEnd
                    ? "bg-zinc-800 rounded-br-sm w-44 sm:w-56"
                    : "bg-zinc-900 border border-white/5 rounded-bl-sm w-36 sm:w-48"
                }`}
              />
              <div
                className={`h-2 bg-zinc-800/60 rounded w-12 ${
                  isEnd ? "ml-auto" : ""
                }`}
              />
            </div>
            {isEnd && (
              <div className="size-9 rounded-xl bg-zinc-800 border border-white/10 flex-shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
