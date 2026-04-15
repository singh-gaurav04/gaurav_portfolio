import { useState, useRef, useEffect } from "react";
import Lottie, { LottiePlayer } from "lottie-react";
import hiAnimation from "/public/chatbot.json";
import boxAnimation from "/public/AIchatbot.json";
import chatBubble from "/public/chatBubble.json";

export default function Bot({ isOpen: controlledIsOpen, setIsOpen: setControlledIsOpen }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const isOpen = controlledIsOpen ?? internalOpen
  const setIsOpen = setControlledIsOpen ?? setInternalOpen

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message }),
      });

      const data = await res.json();

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError("Failed to get response.");
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-24 h-24   text-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-all"
      >
        <span>
          {isOpen ? (
            <div>X</div>
          ) : (
            <div>
              <Lottie className="scale-150" animationData={hiAnimation} loop />
            </div>
          )}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Box */}
          <div className="fixed bottom-24 right-4 sm:right-6 w-[92%] sm:w-[360px] h-[70vh] bg-white border-4 border-black shadow-[10px_10px_0px_black] flex flex-col rounded-xl">
            {/* Header */}
            <div className="bg-indigo-500 text-white border-b-4 border-black p-4 text-center font-semibold text-lg">
              Gaurav's Assistant
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-white flex flex-col">
              {/* ✅ LOTTIE WELCOME FIXED */}
              {messages.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <Lottie className="" animationData={boxAnimation} loop />
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end " : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 text-sm border-2 border-black shadow-[3px_3px_0px_black] ${
                          msg.sender === "user"
                            ? "bg-zinc-900 text-white"
                            : "bg-indigo-50 text-gray-800"
                        }`}
                      >
                        {msg.text}
                        <div className="text-xs mt-1 opacity-60">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {loading && (
                <Lottie className="w-16" animationData={hiAnimation} loop />
              )}

              {error && (
                <div className="bg-red-200 border-2 border-black px-3 py-2 shadow-[3px_3px_0px_black] text-sm">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t-4 border-black flex items-center gap-2 bg-white">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                disabled={loading}
                className="flex-1 h-11 px-4 text-gray-800 text-sm font-medium border-2 border-black bg-gray-50 outline-none shadow-[2px_2px_0px_black] focus:bg-white transition-all"
              />

              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="h-11 px-5 text-sm font-semibold bg-indigo-500 text-white border-2 border-black shadow-[2px_2px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
