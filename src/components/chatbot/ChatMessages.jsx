import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatMessages({ messages, config, loading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chatbot-scroll flex-1 overflow-y-auto bg-white px-5 py-4">
      {messages.map((message, index) => {
        const prev = messages[index - 1];
        const showTimestamp =
          index === 0 ||
          !prev ||
          message.timestamp.getTime() - prev.timestamp.getTime() > 5 * 60 * 1000;

        return (
          <ChatMessage
            key={message.id}
            message={message}
            showTimestamp={showTimestamp}
            botAvatarUrl={config?.avatar_url}
            botName={config?.bot_name}
          />
        );
      })}

      {loading && (
        <div className="mb-4 flex items-start gap-2.5">
          <div className="mt-1 h-7 w-7 rounded-full bg-[#E8EAED]" />
          <div className="rounded-[4px] bg-[#F0F2F4] px-5 py-4">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:-0.2s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:-0.1s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#9CA3AF]" />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
