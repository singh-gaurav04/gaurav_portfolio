import { useState } from "react";
import { CalendarDays } from "lucide-react";
import EmailOtpModal from "./EmailOtpModal";
import { useToast } from "./Toast";
import { submitContact } from "../api/public";

export default function ServiceBookForm({ serviceTitle, onSuccess }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", preferred_date: "" });
  const [otpOpen, setOtpOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleBookClick = (event) => {
    event.preventDefault();
    const formEl = event.currentTarget.closest("form");
    if (formEl && !formEl.reportValidity()) return;
    setError("");
    setOtpOpen(true);
  };

  const handleVerified = async (verificationToken) => {
    setSubmitting(true);
    setError("");

    const details = [
      form.preferred_date ? `Preferred date: ${form.preferred_date}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
      form.message,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await submitContact({
        name: form.name,
        email: form.email,
        subject: `Book: ${serviceTitle}`,
        message: details,
        website: "",
        verification_token: verificationToken,
      });
      setForm({ name: "", email: "", phone: "", message: "", preferred_date: "" });
      showToast(`Booking request sent for ${serviceTitle}.`);
      onSuccess?.();
    } catch (err) {
      setError(err.message || "Could not submit booking request.");
      showToast(err.message || "Could not submit booking request.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form className="space-y-4">
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

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm" style={{ color: "var(--lsw-text-muted)" }}>
            Name
            <input name="name" required minLength={2} value={form.name} onChange={handleChange} className="lsw-input mt-2" placeholder="Your name" />
          </label>
          <label className="block text-sm" style={{ color: "var(--lsw-text-muted)" }}>
            Email
            <input name="email" type="email" required value={form.email} onChange={handleChange} className="lsw-input mt-2" placeholder="you@company.com" />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm" style={{ color: "var(--lsw-text-muted)" }}>
            Phone (optional)
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="lsw-input mt-2" placeholder="+91 …" />
          </label>
          <label className="block text-sm" style={{ color: "var(--lsw-text-muted)" }}>
            Preferred date (optional)
            <input name="preferred_date" type="date" value={form.preferred_date} onChange={handleChange} className="lsw-input mt-2" />
          </label>
        </div>

        <label className="block text-sm" style={{ color: "var(--lsw-text-muted)" }}>
          Project details
          <textarea
            name="message"
            required
            minLength={10}
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="lsw-input mt-2"
            placeholder="Tell me about your goals, timeline, and what you need built…"
          />
        </label>

        <button type="button" onClick={handleBookClick} disabled={submitting} className="lsw-btn-primary w-full py-3">
          <CalendarDays className="h-4 w-4" />
          {submitting ? "Sending…" : "Send booking request"}
        </button>
      </form>

      <EmailOtpModal
        open={otpOpen}
        email={form.email}
        purpose="booking"
        title="Verify to book this service"
        onClose={() => setOtpOpen(false)}
        onVerified={handleVerified}
      />
    </>
  );
}
