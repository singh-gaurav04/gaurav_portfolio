import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ServiceBookForm from "./ServiceBookForm";

export default function ServiceBookModal({ service, onClose }) {
  useEffect(() => {
    if (!service) return undefined;

    document.body.classList.add("modal-open");
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [service, onClose]);

  if (typeof document === "undefined") return null;

  const Icon = service?.icon;

  return createPortal(
    <AnimatePresence>
      {service && (
        <motion.div
          key="service-book-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lsw-modal-overlay"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            key="service-book-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="lsw-modal-panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Book ${service.title}`}
          >
            <div
              className="flex items-start justify-between gap-4 border-b pb-4"
              style={{ borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)" }}
            >
              <div className="flex min-w-0 items-start gap-4">
                <div
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: "color-mix(in srgb, var(--lsw-warning) 14%, var(--lsw-white))",
                    color: "var(--lsw-warning)",
                  }}
                >
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                </div>
                <div className="min-w-0">
                  <p className="editorial-label">Book a service</p>
                  <h3 className="mt-1 text-2xl font-semibold" style={{ color: "var(--lsw-text)" }}>
                    {service.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2"
                style={{ color: "var(--lsw-text-muted)" }}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-5 text-sm leading-7" style={{ color: "var(--lsw-text-muted)" }}>
              {service.fullDescription}
            </p>

            <div className="mt-6">
              <ServiceBookForm serviceTitle={service.title} onSuccess={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
