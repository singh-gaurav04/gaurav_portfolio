import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="mx-3 mb-[max(0.5rem,env(safe-area-inset-bottom))] shrink-0 sm:mx-5 sm:mb-2">
      <div className="relative h-[52px] sm:h-[58px]">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a message"
          disabled={disabled}
          enterKeyHint="send"
          className="h-full w-full rounded-[10px] border border-[#14FCD4] bg-white px-4 pr-12 text-[16px] text-[#1A1F36] outline-none placeholder:text-[#9CA3AF] disabled:opacity-60"
        />
        <motion.button
          type="button"
          aria-label="Send message"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0d9488] disabled:opacity-40"
        >
          <IoSend className="h-[22px] w-[22px]" />
        </motion.button>
      </div>
    </div>
  );
}
