const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-zinc-950 p-12 border-l border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-md text-center relative z-10 space-y-8 animate-slide-up">
        {/* Animated Geometric Matrix */}
        <div className="grid grid-cols-3 gap-3.5 mx-auto max-w-[280px]">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl border border-white/10 transition-all duration-700 ${
                i % 2 === 0
                  ? "bg-white/[0.08] shadow-lg animate-pulse"
                  : "bg-white/[0.02]"
              } hover:bg-white/20 hover:scale-105`}
              style={{
                animationDelay: `${i * 150}ms`,
                animationDuration: "3s",
              }}
            />
          ))}
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
