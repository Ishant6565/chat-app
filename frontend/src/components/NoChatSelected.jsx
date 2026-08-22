import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-16 bg-black/40 backdrop-blur-md">
      <div className="max-w-md text-center space-y-6 animate-slide-up">
        {/* Animated Icon Display */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 rounded-3xl bg-white/5 blur-xl animate-pulse-glow" />
            
            <div className="relative size-20 rounded-3xl bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/15 flex items-center justify-center shadow-2xl animate-float">
              <MessageSquare className="size-9 text-white stroke-[1.5]" />
            </div>

            <div className="absolute -top-1 -right-1 size-6 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center shadow-sm">
              <Sparkles className="size-3 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Welcome to Hidden Leaf Village
          </h2>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Select a shinobi from your contacts list to start secret encrypted transmissions in real-time.
          </p>
        </div>

        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-mono">
          <span className="size-1.5 rounded-full bg-white animate-ping" />
          Leaf Village Encrypted
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
