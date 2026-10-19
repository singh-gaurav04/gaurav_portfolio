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
          className="lsw-btn-primary px-3 py-2 text-[14px] disabled:opacity-50"
        >
          {action.label}
        </motion.button>
      ))}
    </div>
  );
}
