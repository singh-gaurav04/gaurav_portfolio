import { motion } from "framer-motion";

export default function QuickActions({ actions = [], onAction, disabled }) {
  if (!actions.length) return null;

  return (
    <div className="flex shrink-0 flex-wrap gap-[6px] border-t border-[#ECEFF2] bg-white px-5 py-3">
      {actions.map((action) => (
        <motion.button
          key={action.label}
          type="button"
          disabled={disabled}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onAction(action.message)}
          className="inline-flex items-center rounded-[5px] bg-black px-3 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#111827] disabled:opacity-50"
        >
          {action.label}
        </motion.button>
      ))}
    </div>
  );
}
