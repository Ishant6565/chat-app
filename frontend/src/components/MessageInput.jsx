import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-3 sm:p-4 w-full border-t border-white/10 bg-zinc-950/60 backdrop-blur-md">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 animate-slide-up">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-white/20 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 size-6 rounded-full bg-zinc-900 border border-white/20 text-white
              flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-md"
              type="button"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-zinc-900/90 border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-white/40 focus-within:ring-1 focus-within:ring-white/30 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none py-1"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Attachment button */}
          <button
            type="button"
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              imagePreview
                ? "text-white bg-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
            onClick={() => fileInputRef.current?.click()}
            title="Attach image"
          >
            <Image className="size-5" />
          </button>
        </div>

        {/* Send button */}
        <button
          type="submit"
          className={`size-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
            text.trim() || imagePreview
              ? "bg-white text-black hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-md"
              : "bg-white/5 border border-white/10 text-zinc-600 cursor-not-allowed"
          }`}
          disabled={!text.trim() && !imagePreview}
          title="Send message"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
