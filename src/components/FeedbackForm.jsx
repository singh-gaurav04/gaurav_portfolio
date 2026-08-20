import { useEffect, useRef, useState } from "react";
import { ImagePlus, Mail, Send, User, Linkedin } from "lucide-react";
import { submitFeedback } from "../api/public";

export default function FeedbackForm({ onClose }) {
  const fileRef = useRef(null);
  const previewUrlRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", linkedin_url: "", message: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setAvatarFile(file);
    setPreview(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await submitFeedback({ ...form, avatar: avatarFile });
      setSubmitted(true);
      setForm({ name: "", email: "", linkedin_url: "", message: "" });
      setAvatarFile(null);
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err.message || "Could not submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted ? (
        <div
          className="rounded-2xl border p-6 text-center"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-success) 35%, transparent)",
            background: "color-mix(in srgb, var(--lsw-success) 10%, var(--lsw-white))",
          }}
        >
          <Send className="mx-auto mb-3 h-8 w-8" style={{ color: "var(--lsw-success)" }} />
          <p className="text-lg font-semibold" style={{ color: "var(--lsw-text)" }}>
            Thank you for your feedback.
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--lsw-text-muted)" }}>
            It will be reviewed and published shortly.
          </p>
          <button type="button" onClick={onClose} className="lsw-btn-primary mt-5 px-4">
            Close
          </button>
        </div>
      ) : (
        <>
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

          <label className="block text-sm">
            <span className="mb-2 inline-flex items-center gap-2" style={{ color: "var(--lsw-text)" }}>
              <User className="h-4 w-4" style={{ color: "var(--lsw-info)" }} /> Name
            </span>
            <input
              name="name"
              required
              minLength={2}
              value={form.name}
              onChange={handleChange}
              className="lsw-input mt-2"
              placeholder="Your name"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-2 inline-flex items-center gap-2" style={{ color: "var(--lsw-text)" }}>
              <Mail className="h-4 w-4" style={{ color: "var(--lsw-info)" }} /> Email (optional)
            </span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="lsw-input mt-2"
              placeholder="you@company.com"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-2 inline-flex items-center gap-2" style={{ color: "var(--lsw-text)" }}>
              <Linkedin className="h-4 w-4" style={{ color: "var(--lsw-info)" }} /> LinkedIn (optional)
            </span>
            <input
              name="linkedin_url"
              type="url"
              value={form.linkedin_url}
              onChange={handleChange}
              className="lsw-input mt-2"
              placeholder="https://linkedin.com/in/username"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-2 inline-flex items-center gap-2" style={{ color: "var(--lsw-text)" }}>
              <ImagePlus className="h-4 w-4" style={{ color: "var(--lsw-info)" }} /> Photo (optional)
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatar}
              className="lsw-input mt-1 file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1.5 file:font-semibold"
            />
            {preview && <img src={preview} alt="Preview" className="mt-3 h-16 w-16 rounded-full object-cover" />}
          </label>

          <label className="block text-sm">
            <span className="mb-2 block" style={{ color: "var(--lsw-text)" }}>
              Message
            </span>
            <textarea
              name="message"
              required
              minLength={5}
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="lsw-input mt-2"
              placeholder="Share your experience, collaboration, or recommendation…"
            />
          </label>

          <button type="submit" disabled={submitting} className="lsw-btn-primary w-full py-3">
            {submitting ? "Submitting…" : "Submit feedback"}
          </button>
        </>
      )}
    </form>
  );
}
