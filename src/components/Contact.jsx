import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import EmailOtpModal from "./EmailOtpModal";
import { useToast } from "./Toast";
import { submitContact } from "../api/public";
import { usePortfolio } from "../hooks/usePortfolio";

export default function Contact() {
  const { data } = usePortfolio();
  const profile = data.profile;
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [otpOpen, setOtpOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const presetSubject = localStorage.getItem("contact_subject");
    if (!presetSubject) return;

    setFormData((prev) => ({ ...prev, subject: prev.subject || presetSubject }));
    localStorage.removeItem("contact_subject");
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError("");
  };

  const handleSendClick = (event) => {
    event.preventDefault();
    const form = event.currentTarget.closest("form");
    if (form && !form.reportValidity()) return;
    setSubmitError("");
    setOtpOpen(true);
  };

  const handleVerified = async (verificationToken) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await submitContact({ ...formData, verification_token: verificationToken });
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      showToast("Message sent successfully. I'll get back to you soon.");
    } catch (error) {
      setSubmitError(error.message);
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <p className="editorial-label">Contact</p>
        <h2 className="mt-2 text-4xl font-semibold sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
          Let&apos;s build something intelligent
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7" style={{ color: "var(--lsw-text-muted)" }}>
          I&apos;m interested in building impactful AI products, scalable backend systems, and Generative AI applications.
          If you&apos;re hiring, collaborating on an interesting project, or exploring AI-driven solutions, let&apos;s connect.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="lsw-btn-primary px-5 py-3">
              <Linkedin className="h-4 w-4" /> Let&apos;s Connect
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="lsw-btn-secondary px-5 py-3">
              <Mail className="h-4 w-4" /> Email Me
            </a>
          )}
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="lsw-btn-secondary px-5 py-3">
              <Github className="h-4 w-4" /> View GitHub
            </a>
          )}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            {profile?.email && <Info icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />}
            {profile?.phone && <Info icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\D/g, "")}`} />}
            {profile?.linkedin_url && (
              <Info icon={Linkedin} label="LinkedIn" value="linkedin.com/in/gaurav26lnct" href={profile.linkedin_url} external />
            )}
            {profile?.github_url && (
              <Info icon={Github} label="GitHub" value="github.com/singh-gaurav04" href={profile.github_url} external />
            )}
            {profile?.location && (
              <Info icon={MapPin} label="Location" value={profile.location} href={`https://maps.google.com/?q=${encodeURIComponent(profile.location)}`} external />
            )}
          </div>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border p-6"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
              background: "var(--lsw-surface)",
              boxShadow: "0 14px 40px rgba(6, 28, 58, 0.06)",
            }}
          >
            <div className="space-y-3">
              {submitError && (
                <p
                  className="rounded-xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: "color-mix(in srgb, var(--lsw-error) 35%, transparent)",
                    background: "color-mix(in srgb, var(--lsw-error) 10%, var(--lsw-white))",
                    color: "var(--lsw-error)",
                  }}
                >
                  {submitError}
                </p>
              )}
              <input name="website" value={formData.website} onChange={handleInputChange} className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Name" value={formData.name} onChange={handleInputChange} required minLength={2} />
                <Field name="email" label="Email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <Field name="subject" label="Subject" value={formData.subject} onChange={handleInputChange} required minLength={3} />
              <label className="block text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                Message
                <textarea
                  name="message"
                  required
                  minLength={10}
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="lsw-input mt-2"
                />
              </label>
              <button type="button" onClick={handleSendClick} disabled={isSubmitting} className="lsw-btn-primary w-full py-3">
                {isSubmitting ? "Sending…" : "Send message"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <EmailOtpModal
        open={otpOpen}
        email={formData.email}
        purpose="contact"
        title="Verify to send message"
        onClose={() => setOtpOpen(false)}
        onVerified={handleVerified}
      />
    </section>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block text-sm" style={{ color: "var(--lsw-text-muted)" }}>
      {label}
      <input {...props} className="lsw-input mt-2" />
    </label>
  );
}

function Info({ icon: Icon, label, value, href, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="flex items-center gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5"
      style={{
        borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
        background: "var(--lsw-white)",
        color: "var(--lsw-text)",
        boxShadow: "0 10px 30px rgba(6, 28, 58, 0.04)",
      }}
    >
      <Icon className="h-5 w-5" style={{ color: "var(--lsw-warning)" }} />
      <div>
        <p className="text-xs uppercase tracking-widest" style={{ color: "var(--lsw-text-muted)" }}>
          {label}
        </p>
        <p>{value}</p>
      </div>
    </a>
  );
}
