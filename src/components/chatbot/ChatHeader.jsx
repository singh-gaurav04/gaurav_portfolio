import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function ChatHeader({ config, onClose }) {
  const initials = (config?.bot_name || "G").slice(0, 1).toUpperCase();

  return (
    <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#E7E8EF] bg-white px-3 pt-[env(safe-area-inset-top)] sm:h-[60px] sm:rounded-t-[11px] sm:px-4 sm:pt-0">
      <div className="flex min-w-0 items-center gap-3">
        {config?.avatar_url ? (
          <img
            src={config.avatar_url}
            alt={config.bot_name}
            className="h-10 w-10 shrink-0 rounded-full border-2 border-[#DDD6FE] object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#DDD6FE] bg-[#EEE9FF] text-sm font-bold text-[#5B2EFF]">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-[16px] font-bold leading-tight text-[#111525] sm:text-[18px]">{config?.bot_name || "Gaurav's Assistant"}</p>
          <p className="truncate text-[13px] leading-tight text-[#596174] sm:text-[14px]">{config?.bot_subtitle || "Personal AI Assistant"}</p>
        </div>
      </div>
      <motion.button
        type="button"
        aria-label="Close chat"
        onClick={onClose}
        whileHover={{ rotate: 90, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className="rounded-md p-1 text-[#596174] hover:text-[#111525]"
      >
        <IoClose className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
