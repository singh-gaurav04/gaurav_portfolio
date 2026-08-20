import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_ITEMS } from "../lib/motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [lastScroll, setLastScroll] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(latest > lastScroll && latest > 80);
    setLastScroll(latest);
  });

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-50 flex w-full justify-center"
    >
      <div className="mt-4 flex w-[92%] max-w-[1400px] items-center justify-between rounded-[28px] border border-[#E7E8EF] bg-white/90 px-5 py-3 shadow-[0_12px_40px_rgba(17,21,37,0.06)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="font-serif text-xl font-semibold tracking-wide text-[#111525]"
          >
            GS
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-[#DDEBDD] bg-[#F3FBF4] px-3 py-1.5 text-sm text-[#196B3A] sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16A34A]" />
            </span>
            <span>Available for work</span>
          </div>
        </div>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ y: -1 }}
              onClick={() => scrollToSection(item.href.slice(1))}
              className="text-sm text-[#596174] transition hover:text-[#111525]"
            >
              {item.name}
            </motion.button>
          ))}
          <button type="button" onClick={() => scrollToSection("contact")} className="lsw-btn-primary px-5 py-2.5">
            Hire Me <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="text-[#111525] md:hidden" aria-label="Menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 w-[92%] rounded-[24px] border border-[#E7E8EF] bg-white p-4 shadow-[0_16px_40px_rgba(17,21,37,0.08)] md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href.slice(1))}
              className="block w-full py-2 text-left text-[#596174]"
            >
              {item.name}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
