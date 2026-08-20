import { motion } from "framer-motion";
import MessageContent from "./MessageContent";

function formatTimestamp(date) {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).toLowerCase();
  if (isToday) return `Today, ${time}`;
  return `${date.toLocaleDateString([], { month: "short", day: "numeric" })}, ${time}`;
}

export default function ChatMessage({ message, showTimestamp = false, botAvatarUrl, botName }) {
  const isUser = message.sender === "user";
  const initials = (botName || "W").slice(0, 1).toUpperCase();

  return (
    <>
      {showTimestamp && (
        <p className="my-5 text-center text-[14px] text-[#7A8088]">{formatTimestamp(message.timestamp)}</p>
      )}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`mb-5 flex ${isUser ? "justify-end" : "justify-start gap-2.5"}`}
      >
        {!isUser &&
          (botAvatarUrl ? (
            <img src={botAvatarUrl} alt="" className="mt-1 h-7 w-7 shrink-0 rounded-full object-cover" />
          ) : (
            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EAED] text-[11px] font-semibold text-[#4B5563]">
              {initials}
            </div>
          ))}
        <div
          className={`max-w-[min(320px,85%)] text-[16px] leading-[1.5] ${
            isUser
              ? "max-w-[200px] rounded-[10px] bg-[linear-gradient(135deg,#5B2EFF,#315BFF)] px-4 py-3 text-white"
              : "rounded-[12px] border border-[#E7E8EF] bg-[#F7F7FC] px-4 py-3.5 text-[#1A1F36] sm:px-5 sm:py-[18px]"
          }`}
        >
          <MessageContent text={message.text} isUser={isUser} />
        </div>
      </motion.div>
    </>
  );
}

export { formatTimestamp };
