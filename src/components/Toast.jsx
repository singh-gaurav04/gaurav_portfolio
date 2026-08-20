import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    window.setTimeout(() => setToast(null), 4200);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {toast ? (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="fixed bottom-6 right-6 z-[120] flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg"
                style={{
                  borderColor:
                    toast.type === "error"
                      ? "color-mix(in srgb, var(--lsw-error) 35%, transparent)"
                      : "color-mix(in srgb, var(--lsw-success) 35%, transparent)",
                  background: "var(--lsw-white)",
                  color: "var(--lsw-text)",
                }}
                role="status"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: toast.type === "error" ? "var(--lsw-error)" : "var(--lsw-success)" }}
                />
                <p className="flex-1 text-sm leading-6">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="rounded-lg p-1"
                  style={{ color: "var(--lsw-text-muted)" }}
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
