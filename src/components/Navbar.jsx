import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../lib/motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [lastScroll, setLastScroll] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
    setHidden(latest > lastScroll && latest > 96);
    setLastScroll(latest);
  });

  const scrollToSection = (id) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-50 flex w-full justify-center px-3 sm:px-4"
    >
      <nav
        className={`mt-3 flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:mt-4 sm:px-5 ${
          scrolled
            ? "border-slate-200/90 bg-white/95 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "border-slate-200/70 bg-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-md"
        }`}
        aria-label="Primary"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="group flex items-center gap-2.5"
            aria-label="Go to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border bg-slate-900 text-sm font-semibold tracking-wide text-white transition group-hover:bg-slate-800">
              GS
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-slate-900 sm:inline">
              Gaurav Singh
            </span>
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 lg:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Available
          </div>
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => scrollToSection(item.href.slice(1))}
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="lsw-btn-primary hidden px-4 py-2.5 sm:inline-flex"
          >
            Contact Me <ArrowUpRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-800 lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-[4.75rem] w-[calc(100%-1.5rem)] max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.12)] lg:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => scrollToSection(item.href.slice(1))}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                {item.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="lsw-btn-primary mt-2 flex w-full px-4 py-3"
            >
              Contact Me <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
