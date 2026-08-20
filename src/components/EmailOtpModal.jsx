import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, ShieldCheck, X } from "lucide-react";
import { sendEmailOtp, verifyEmailOtp } from "../api/public";

export default function EmailOtpModal({ open, email, purpose, title, onClose, onVerified }) {
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [codeSent, setCodeSent] = useState(false);
  const sentForRef = useRef("");

  const normalizedEmail = email?.trim() || "";

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add("modal-open");
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setOtp("");
      setError("");
      setInfo("");
      setCooldown(0);
      setCodeSent(false);
      sentForRef.current = "";
      return;
    }
    const key = `${normalizedEmail}:${purpose}`;
    if (!normalizedEmail || sentForRef.current === key) return;
    sentForRef.current = key;
    sendCode();
  }, [open, normalizedEmail, purpose]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = window.setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  const sendCode = async () => {
    if (!normalizedEmail) {
      setError("Enter a valid email first.");
      return;
    }
    setSending(true);
    setError("");
    setInfo("");
    try {
      await sendEmailOtp({ email: normalizedEmail, purpose });
      setCodeSent(true);
      setInfo("Verification code sent to your email.");
      setCooldown(60);
    } catch (err) {
      setError(err.message || "Could not send verification code.");
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (event) => {
    event?.preventDefault();
    if (!otp.trim()) {
      setError("Enter the verification code.");
      return;
    }
    setVerifying(true);
    setError("");
    try {
      const data = await verifyEmailOtp({ email: normalizedEmail, purpose, otp: otp.trim() });
      onVerified?.(data?.verification_token || "");
      onClose?.();
    } catch (err) {
      setError(err.message || "Invalid verification code.");
    } finally {
      setVerifying(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="otp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lsw-modal-overlay"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            key="otp-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="lsw-modal-panel max-w-md"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Verify email"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: "color-mix(in srgb, var(--lsw-warning) 14%, var(--lsw-white))",
                    color: "var(--lsw-warning)",
                  }}
                >
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="editorial-label">Email verification</p>
                  <h3 className="mt-1 text-xl font-semibold" style={{ color: "var(--lsw-text)" }}>
                    {title || "Confirm your email"}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                    Enter the code sent to <strong style={{ color: "var(--lsw-text)" }}>{normalizedEmail}</strong>
                  </p>
                </div>
              </div>
              <button type="button" onClick={onClose} className="rounded-lg p-2" style={{ color: "var(--lsw-text-muted)" }} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleVerify} className="mt-6 space-y-4">
              {error && (
                <p
                  className="rounded-xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: "color-mix(in srgb, var(--lsw-error) 35%, transparent)",
                    background: "color-mix(in srgb, var(--lsw-error) 10%, var(--lsw-white))",
                    color: "var(--lsw-error)",
                  }}
                >
                  {error}
                </p>
              )}
              {info && (
                <p
                  className="rounded-xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: "color-mix(in srgb, var(--lsw-success) 35%, transparent)",
                    background: "color-mix(in srgb, var(--lsw-success) 10%, var(--lsw-white))",
                    color: "var(--lsw-success)",
                  }}
                >
                  {info}
                </p>
              )}

              <label className="block text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                Verification code
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={8}
                  autoFocus
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ""));
                    if (error) setError("");
                  }}
                  className="lsw-input mt-2 text-center text-lg tracking-[0.35em]"
                  placeholder="••••••"
                />
              </label>

              <button type="submit" disabled={verifying || !otp.trim()} className="lsw-btn-primary w-full py-3">
                {verifying ? "Verifying…" : "Verify & continue"}
              </button>

              <button
                type="button"
                onClick={sendCode}
                disabled={sending || cooldown > 0 || !normalizedEmail}
                className="lsw-btn-secondary w-full py-2.5 text-sm"
              >
                <Mail className="h-4 w-4" style={{ color: "var(--lsw-warning)" }} />
                {sending ? "Sending…" : cooldown > 0 ? `Resend in ${cooldown}s` : codeSent ? "Resend code" : "Send code"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
