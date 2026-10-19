import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendChatMessage } from "../../api/public";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatFooter from "./ChatFooter";

const AGENT_LOGO = "/assets/images/agent-logo.png";

const CHAT_CONFIG = {
  avatar_url: AGENT_LOGO,
  bot_name: "Gaurav's AI Agent",
  bot_subtitle: "Ask me about Gaurav's work",
  welcome_message:
    "Hi! I'm Gaurav's AI agent. Ask me about his projects, skills, experience, or how to get in touch.",
  privacy_policy_url: "#contact",
  privacy_policy_label: "Contact Gaurav",
  quick_actions: [],
};

function createMessage(text, sender, extra = {}) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    sender,
    timestamp: new Date(),
    ...extra,
  };
}

export default function Chatbot({ isOpen, setIsOpen }) {
  const config = CHAT_CONFIG;
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setMessages((prev) => (prev.length ? prev : [createMessage(CHAT_CONFIG.welcome_message, "bot")]));
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const sendUserMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMessage = createMessage(trimmed, "user");
      const nextConversation = [...conversation, { role: "user", content: trimmed }];

      setMessages((prev) => [...prev, userMessage]);
      setConversation(nextConversation);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const data = await sendChatMessage({ message: trimmed, conversation: nextConversation });
        const botMessage = createMessage(data.response, "bot");
        setMessages((prev) => [...prev, botMessage]);
        setConversation((prev) => [...prev, { role: "assistant", content: data.response }]);
      } catch (err) {
        const busy = /429|rate limit/i.test(err?.message || "");
        setError(
          busy
            ? "The assistant is busy right now. Please try again in a minute."
            : "Sorry, I couldn't reply just now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [conversation, loading]
  );

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            key="launcher"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[90] h-16 w-16 rounded-full sm:bottom-5 sm:right-5"
            aria-label="Open chat"
          >
            <img src={AGENT_LOGO} alt="" className="h-full w-full rounded-full" width={64} height={64} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/35 sm:bg-black/20"
              onClick={() => setIsOpen(false)}
            />
            <motion.section
              key="panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="fixed inset-0 z-[90] flex h-[100dvh] w-full flex-col overflow-hidden bg-white font-[Inter,Arial,system-ui,sans-serif] sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(630px,calc(100dvh-3rem))] sm:w-[min(428px,calc(100vw-2rem))] sm:rounded-[11px] sm:shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
              role="dialog"
              aria-label="Chat support"
            >
              <ChatHeader config={config} onClose={() => setIsOpen(false)} />
              <ChatMessages messages={messages} config={config} loading={loading} />
              {error && <p className="px-4 pb-2 text-sm text-red-600 sm:px-5">{error}</p>}
              <ChatInput
                value={input}
                onChange={setInput}
                onSend={() => sendUserMessage(input)}
                disabled={loading}
              />
              <ChatFooter config={config} />
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
