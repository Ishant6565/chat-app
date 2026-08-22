import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-black/40 backdrop-blur-md">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-black/40 backdrop-blur-md">
      <ChatHeader />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => {
          const isSent = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex items-end gap-2.5 ${
                isSent ? "justify-end" : "justify-start"
              } animate-slide-up`}
            >
              {/* Other user's avatar */}
              {!isSent && (
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt="avatar"
                  className="size-8 object-cover rounded-lg border border-white/10 flex-shrink-0 mb-1"
                />
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] sm:max-w-[65%] flex flex-col ${
                  isSent ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed transition-all shadow-sm ${
                    isSent
                      ? "bg-white text-zinc-950 rounded-br-xs font-normal selection:bg-black selection:text-white"
                      : "bg-zinc-900 border border-white/10 text-zinc-100 rounded-bl-xs selection:bg-white selection:text-black"
                  }`}
                >
                  {message.image && (
                    <div className="mb-2 overflow-hidden rounded-xl border border-white/10">
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-h-60 w-auto object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  )}
                  {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}
                </div>

                {/* Timestamp */}
                <time
                  className={`text-[10px] mt-1 px-1 font-mono ${
                    isSent ? "text-zinc-500" : "text-zinc-500"
                  }`}
                >
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Auth user's avatar */}
              {isSent && (
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt="avatar"
                  className="size-8 object-cover rounded-lg border border-white/10 flex-shrink-0 mb-1"
                />
              )}
            </div>
          );
        })}

        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
