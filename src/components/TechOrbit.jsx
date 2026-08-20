import { motion } from "framer-motion";

const RADII = [120, 190, 260];

export default function TechOrbit({ skillCategories = [] }) {
  const flat = skillCategories.flatMap((group) =>
    group.items.map((item) => ({ item, category: group.category }))
  );
  const unique = Array.from(new Map(flat.map((entry) => [entry.item, entry])).values()).slice(0, 18);

  if (!unique.length) {
    return (
      <div
        className="mx-auto flex h-[280px] w-full max-w-xl items-center justify-center rounded-3xl border text-sm"
        style={{
          borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
          color: "var(--lsw-text-muted)",
          background: "var(--lsw-surface)",
        }}
      >
        Skills will appear here once published.
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-[380px] w-full max-w-xl items-center justify-center sm:h-[460px]">
      <div
        className="absolute flex h-28 w-28 items-center justify-center rounded-full border text-center font-mono text-[11px] tracking-wide sm:h-36 sm:w-36"
        style={{
          borderColor: "color-mix(in srgb, var(--lsw-border) 22%, transparent)",
          background: "var(--lsw-white)",
          color: "var(--lsw-text)",
        }}
      >
        AI
        <br />
        ENGINEERING
      </div>

      {[0, 1, 2].map((ringIndex) => {
        const ringItems = unique.filter((_, i) => i % 3 === ringIndex);
        if (!ringItems.length) return null;

        const radius = RADII[ringIndex] ?? 120;
        const duration = 26 + ringIndex * 10;

        return (
          <motion.div
            key={ringIndex}
            initial={true}
            className="absolute rounded-full border border-dashed"
            style={{
              width: radius * 2,
              height: radius * 2,
              borderColor: "color-mix(in srgb, var(--lsw-border) 28%, transparent)",
              transformOrigin: "center",
            }}
            animate={{ rotate: ringIndex % 2 === 0 ? [0, 360] : [0, -360] }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            {ringItems.map((entry, i) => {
              const angle = (i / ringItems.length) * Math.PI * 2;
              const x = radius + radius * Math.cos(angle);
              const y = radius + radius * Math.sin(angle);

              return (
                <motion.span
                  key={entry.item}
                  initial={false}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] sm:text-[11px]"
                  style={{
                    left: x,
                    top: y,
                    borderColor: "color-mix(in srgb, var(--lsw-border) 22%, transparent)",
                    background: "var(--lsw-surface)",
                    color: "var(--lsw-text-muted)",
                    transformOrigin: "center",
                  }}
                  animate={{ rotate: ringIndex % 2 === 0 ? [0, -360] : [0, 360] }}
                  transition={{ duration, repeat: Infinity, ease: "linear" }}
                  whileHover={{
                    borderColor: "color-mix(in srgb, var(--lsw-info) 55%, transparent)",
                    color: "var(--lsw-text)",
                  }}
                >
                  {entry.item}
                </motion.span>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
}
