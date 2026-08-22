import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette, Check } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! Loving the new sleek monochrome design.", isSent: false },
  { id: 2, content: "Yes! High contrast, minimal, and super clean.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-24 pb-12 max-w-5xl text-white">
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
            <Palette className="size-3.5 text-white" />
            Theme Customization
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Theme & Appearance</h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Choose your preferred color theme for the interface
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {THEMES.map((t) => {
            const isCurrent = theme === t;

            return (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-2 p-2.5 rounded-xl border transition-all duration-200
                  ${
                    isCurrent
                      ? "bg-white/10 border-white/40 shadow-lg scale-105"
                      : "bg-zinc-950/60 border-white/10 hover:border-white/25 hover:bg-white/5"
                  }
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-8 w-full rounded-lg overflow-hidden border border-white/10" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-0.5 p-1 bg-base-100">
                    <div className="rounded-xs bg-primary"></div>
                    <div className="rounded-xs bg-secondary"></div>
                    <div className="rounded-xs bg-accent"></div>
                    <div className="rounded-xs bg-neutral"></div>
                  </div>
                  {isCurrent && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                      <Check className="size-3.5 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center text-zinc-300 group-hover:text-white">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Preview Section */}
        <div className="space-y-3 pt-4">
          <h3 className="text-base font-semibold text-white tracking-tight">Live Chat Preview</h3>
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/40 backdrop-blur-xl shadow-2xl">
            <div className="p-4 sm:p-6 bg-zinc-950/50">
              <div className="max-w-md mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-zinc-900/90 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-white/10 bg-zinc-950/60 flex items-center gap-3">
                    <div className="size-8 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center">
                      JD
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-white">John Doe</h4>
                      <p className="text-[10px] text-emerald-400 font-mono">Active now</p>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-3 min-h-[180px] bg-black/30">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed
                            ${
                              message.isSent
                                ? "bg-white text-zinc-950 rounded-br-xs font-normal"
                                : "bg-zinc-800 border border-white/10 text-zinc-100 rounded-bl-xs"
                            }
                          `}
                        >
                          <p>{message.content}</p>
                          <p
                            className={`text-[9px] mt-1 text-right font-mono ${
                              message.isSent ? "text-zinc-500" : "text-zinc-500"
                            }`}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-3 border-t border-white/10 bg-zinc-950/60 flex gap-2">
                    <input
                      type="text"
                      className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
                      placeholder="Type a message..."
                      value="This is a live preview"
                      readOnly
                    />
                    <button className="size-8 rounded-xl bg-white text-black flex items-center justify-center hover:bg-zinc-200">
                      <Send className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
