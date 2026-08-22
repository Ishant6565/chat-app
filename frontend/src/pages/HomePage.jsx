import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-black text-white pt-16 flex flex-col items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl h-[calc(100vh-5.5rem)] rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col z-10">
        <div className="flex flex-1 h-full overflow-hidden">
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
