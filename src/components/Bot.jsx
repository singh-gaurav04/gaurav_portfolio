import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import hiAnimation from "/public/chatbot.json";
import boxAnimation from "/public/AIchatbot.json";

export default function Bot({ isOpen: controlledIsOpen, setIsOpen: setControlledIsOpen }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const isOpen = controlledIsOpen ?? internalOpen;
  const setIsOpen = setControlledIsOpen ?? setInternalOpen;
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
  const panelVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 240, damping: 24 } },
    exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.2 } },
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
    const userHistory = { role: "user", content: message };
    const updatedConversation = [...conversation, userHistory];
    setConversation(updatedConversation);
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://mychatbot-app.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message, conversation: updatedConversation }),
      });
      const data = await res.json();
      const aiHistory = { role: "assistant", content: data.response };
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "ai",
        timestamp: new Date(),
      };
      setConversation((prev) => [...prev, aiHistory]);
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
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-50 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-300/40 bg-slate-900/85 shadow-[0_0_30px_rgba(16,185,129,0.22)] backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(16,185,129,0.35)]"
          aria-label="Open assistant chat"
        >
          <Lottie className="scale-[1.35]" animationData={hiAnimation} loop />
        </button>
      )}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-6 right-4 z-[100] flex h-[72vh] w-[92%] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-emerald-300/30 bg-slate-950/95 shadow-[0_0_40px_rgba(15,23,42,0.8)] backdrop-blur-xl sm:right-6"
            >
              <div className="relative border-b border-slate-700/70 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-violet-500/15 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/40 bg-slate-900/80">
                    <Lottie className="scale-[1.15]" animationData={hiAnimation} loop />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-slate-100">Gaurav AI Assistant</div>
                    <div className="flex items-center gap-2 text-xs text-emerald-300">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />
                      Online now
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-lg text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
                  aria-label="Close assistant chat"
                >
                  ×
                </button>
              </div>
              <div className="flex min-h-0 flex-1 flex-col space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_45%)] p-4">
                {messages.length === 0 && !loading ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <Lottie className="w-44" animationData={boxAnimation} loop />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-100">Ask me anything about Gaurav&apos;s work</p>
                      <p className="text-xs text-slate-400">Projects, skills, resume, achievements and more.</p>
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.sender === "ai" && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/30 bg-slate-900/90 text-xs font-semibold text-emerald-300">
                          AI
                        </div>
                      )}
                      <div className={`max-w-[80%] rounded-2xl border px-4 py-2.5 text-sm shadow-lg ${msg.sender === "user" ? "border-cyan-400/35 bg-cyan-500/15 text-cyan-50" : "border-slate-600 bg-slate-900/85 text-slate-100"}`}>
                        <div>{msg.text}</div>
                        <div className="mt-1 text-[10px] opacity-70">
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      {msg.sender === "user" && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/40 bg-slate-900/90 text-xs font-semibold text-cyan-200">
                          You
                        </div>
                      )}
                    </div>
                  ))
                )}
                {loading && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/30 bg-slate-900/90 text-xs font-semibold text-emerald-300">
                      AI
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl border border-slate-600 bg-slate-900/85 px-3 py-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 [animation-delay:120ms]" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 [animation-delay:240ms]" />
                    </div>
                  </div>
                )}
                {error && <div className="rounded-xl border border-red-400/40 bg-red-500/15 px-3 py-2 text-sm text-red-200">{error}</div>}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-slate-700/70 bg-slate-950/90 p-3">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 p-2">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about projects, skills, or resume..."
                    disabled={loading}
                    className="h-10 flex-1 bg-transparent px-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !message.trim()}
                    className="rounded-xl border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-200 transition-all hover:bg-emerald-400/25 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
