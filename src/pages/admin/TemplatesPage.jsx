import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { listTemplates, updateTemplate } from "../../api/admin";
import { AdminFormSkeleton } from "../../components/Skeleton";

const TEMPLATE_META = {
  email_otp: {
    trigger: "Visitor requests email verification (contact or booking)",
    recipient: "The visitor",
  },
  contact_admin_notify: {
    trigger: "Someone submits the contact form",
    recipient: "You (ADMIN_EMAIL)",
  },
  contact_user_ack: {
    trigger: "Someone submits the contact form",
    recipient: "The visitor",
  },
  contact_reply: {
    trigger: "You send a reply from Admin → Inbox",
    recipient: "The contact",
  },
  feedback_admin_notify: {
    trigger: "Someone submits feedback",
    recipient: "You (ADMIN_EMAIL)",
  },
  feedback_user_ack: {
    trigger: "Someone submits feedback with an email",
    recipient: "The visitor",
  },
  service_booking_user: {
    trigger: 'Someone books a service (subject starts with "Book:")',
    recipient: "The visitor",
  },
  service_booking_admin: {
    trigger: 'Someone books a service (subject starts with "Book:")',
    recipient: "You (ADMIN_EMAIL)",
  },
};

export default function TemplatesPage() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, error } = useQuery({ queryKey: ["admin-templates"], queryFn: listTemplates });
  const [selectedId, setSelectedId] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(true);

  const selected = data.find((item) => item.id === selectedId);
  const meta = selected ? TEMPLATE_META[selected.slug] : null;

  useEffect(() => {
    if (!selectedId && data[0]) setSelectedId(data[0].id);
  }, [data, selectedId]);

  useEffect(() => {
    if (!selected) return;
    setSubject(selected.subject || "");
    setHtml(selected.html_body || "");
    setText(selected.text_body || "");
    setIsActive(selected.is_active ?? true);
  }, [selected]);

  const mutation = useMutation({
    mutationFn: () =>
      updateTemplate(selectedId, {
        subject,
        html_body: html,
        text_body: text,
        is_active: isActive,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-templates"] }),
  });

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold">Email templates</h2>
      <p className="mt-2 text-sm text-slate-500">
        Emails send automatically when visitors contact you, share feedback, or book a service. Configure SMTP in the backend
        <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5">.env</code>
        (SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD, ADMIN_EMAIL).
      </p>
      {error && <p className="mt-3 text-red-600">{error.message}</p>}
      {isLoading && <AdminFormSkeleton />}
      {!isLoading && (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
        className="mt-5 space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      >
        <label className="block text-sm">
          Template
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2">
            {data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.slug})
              </option>
            ))}
          </select>
        </label>

        {meta && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-800">When:</span> {meta.trigger}
            </p>
            <p className="mt-1">
              <span className="font-medium text-slate-800">Sent to:</span> {meta.recipient}
            </p>
            {selected?.variables?.length ? (
              <p className="mt-2">
                <span className="font-medium text-slate-800">Variables:</span>{" "}
                {selected.variables.map((v) => `{{ ${v} }}`).join(", ")}
              </p>
            ) : null}
          </div>
        )}

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          Template active
        </label>

        <label className="block text-sm">
          Subject
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </label>
        <label className="block text-sm">
          HTML body
          <textarea value={html} onChange={(e) => setHtml(e.target.value)} rows={8} className="mt-1 w-full rounded-lg border px-3 py-2 font-mono text-sm" />
        </label>
        <label className="block text-sm">
          Text body
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </label>
        {mutation.error && <p className="text-sm text-red-600">{mutation.error.message}</p>}
        {mutation.isSuccess && <p className="text-sm text-green-600">Template saved.</p>}
        <button disabled={mutation.isPending || !selectedId} className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
          Save template
        </button>
      </form>
      )}
    </div>
  );
}
