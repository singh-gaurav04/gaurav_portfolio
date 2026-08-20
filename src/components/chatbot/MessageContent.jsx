import { Copy, Check, Mail, Phone, ExternalLink, Linkedin, Globe } from "lucide-react";
import { useMemo, useState } from "react";

function extractEmails(text) {
  return [...new Set((text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []).map((e) => e.trim()))];
}

function looksLikePhone(raw) {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function normalizePhone(raw) {
  const digits = raw.replace(/[^\d+]/g, "");
  return looksLikePhone(digits) ? digits : null;
}

function extractPhones(text) {
  const matches = text.match(/(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,5}\)?[\s-]?)?\d{3,5}[\s-]?\d{4,6}/g) || [];
  return [
    ...new Set(
      matches
        .map((p) => p.trim().replace(/\s+/g, " "))
        .filter(looksLikePhone)
    ),
  ];
}

function extractLinkedins(text) {
  return [
    ...new Set(
      (text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s)<]+/gi) || []).map((u) =>
        u.trim().replace(/[.,;!?)]+$/, "")
      )
    ),
  ];
}

function extractUrls(text, emails) {
  return [
    ...new Set(
      (text.match(/https?:\/\/[^\s)<]+/gi) || [])
        .map((u) => u.trim().replace(/[.,;!?)]+$/, ""))
        .filter((u) => !/linkedin\.com/i.test(u) && !emails.some((e) => u.includes(e)))
    ),
  ];
}

function extractContacts(text) {
  const emails = extractEmails(text);
  const phones = extractPhones(text);
  const linkedins = extractLinkedins(text);
  const urls = extractUrls(text, emails);
  return { emails, phones, linkedins, urls };
}

function buildNarrative(text, contacts) {
  let cleaned = text;

  for (const email of contacts.emails) cleaned = cleaned.split(email).join("");
  for (const phone of contacts.phones) cleaned = cleaned.split(phone).join("");
  for (const linkedin of contacts.linkedins) cleaned = cleaned.split(linkedin).join("");
  for (const url of contacts.urls) cleaned = cleaned.split(url).join("");

  cleaned = cleaned
    .replace(/\*\*/g, "")
    .replace(/\bas\s*\*\*/gi, "")
    .replace(
      /\b(?:contact(?:\s+number)?|phone(?:\s+number)?|mobile|email|e-mail|reach(?:\s+him|\s+her)?(?:\s+via)?|call(?:\s+him|\s+her)?)\b(?:\s+is|\s+at)?\s*[:.]?\s*/gi,
      ""
    )
    .replace(/\byou can also\b/gi, "")
    .replace(/\bfor professional inquiries\.?/gi, "")
    .replace(/\bvia\b/gi, "")
    .replace(/\bat\b(?=\s*[,.])/gi, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+([,.!?])/g, "$1")
    .replace(/([.!?])\1+/g, "$1")
    .replace(/\s{2,}/g, " ")
    .replace(/^[,.\s]+|[,.\s]+$/g, "")
    .trim();

  // If narrative collapsed to fluff, keep a short lead-in + follow-up question if present
  const followUp = (text.match(/Would you like[^.?!]*[.?!]/i) || [])[0];
  if (cleaned.length < 18) {
    if (followUp) return followUp.trim();
    if (contacts.phones.length || contacts.emails.length) {
      return "Here’s how you can reach Gaurav:";
    }
  }

  if (followUp && !cleaned.toLowerCase().includes("would you like")) {
    cleaned = `${cleaned.replace(/[.!?]*$/, ".")} ${followUp}`.trim();
  }

  return cleaned;
}

function renderInline(text) {
  const nodes = [];
  const pattern =
    /(\*\*[^*]+\*\*|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,5}\)?[\s-]?)?\d{3,5}[\s-]?\d{4,6}|https?:\/\/[^\s)<]+)/g;

  let last = 0;
  let match;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<span key={`t-${key++}`}>{text.slice(last, match.index)}</span>);
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`b-${key++}`} className="font-semibold text-[#111827]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.includes("@") && extractEmails(token).length) {
      nodes.push(
        <a
          key={`e-${key++}`}
          href={`mailto:${token}`}
          className="font-medium text-[#315BFF] underline decoration-[#315BFF]/35 underline-offset-2"
        >
          {token}
        </a>
      );
    } else if (looksLikePhone(token)) {
      nodes.push(
        <a
          key={`p-${key++}`}
          href={`tel:${normalizePhone(token)}`}
          className="font-medium text-[#315BFF] underline decoration-[#315BFF]/35 underline-offset-2"
        >
          {token}
        </a>
      );
    } else if (/^https?:\/\//i.test(token)) {
      const clean = token.replace(/[.,;!?)]+$/, "");
      nodes.push(
        <a
          key={`u-${key++}`}
          href={clean}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[#315BFF] underline decoration-[#315BFF]/35 underline-offset-2"
        >
          {clean.replace(/^https?:\/\//i, "")}
        </a>
      );
    } else {
      nodes.push(<span key={`x-${key++}`}>{token}</span>);
    }

    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(<span key={`t-${key++}`}>{text.slice(last)}</span>);
  return nodes.length ? nodes : text;
}

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-medium text-[#5B6472] hover:bg-white/80 hover:text-[#111827]"
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ContactCard({ contacts }) {
  const items = [];

  for (const phone of contacts.phones) {
    items.push({
      key: `phone-${phone}`,
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${normalizePhone(phone)}`,
      action: "Call",
      copyValue: phone,
    });
  }
  for (const email of contacts.emails) {
    items.push({
      key: `email-${email}`,
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      action: "Email",
      copyValue: email,
    });
  }
  for (const linkedin of contacts.linkedins) {
    const href = linkedin.startsWith("http") ? linkedin : `https://${linkedin}`;
    items.push({
      key: `li-${linkedin}`,
      icon: Linkedin,
      label: "LinkedIn",
      value: "View profile",
      href,
      action: "Open",
    });
  }
  for (const url of contacts.urls.slice(0, 2)) {
    items.push({
      key: `url-${url}`,
      icon: Globe,
      label: "Website",
      value: url.replace(/^https?:\/\//i, "").slice(0, 36),
      href: url,
      action: "Open",
    });
  }

  if (!items.length) return null;

  return (
    <div className="mt-3 space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        const external = item.href.startsWith("http");
        return (
          <div
            key={item.key}
            className="flex items-center gap-2.5 rounded-xl border border-[#E4E7F0] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#315BFF]">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#7A8088]">{item.label}</p>
              <p className="truncate text-[13px] font-semibold text-[#111827]">{item.value}</p>
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              {item.copyValue && <CopyButton value={item.copyValue} label={item.label} />}
              <a
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="inline-flex items-center gap-1 rounded-lg bg-[#315BFF] px-2.5 py-1.5 text-[12px] font-semibold text-white hover:bg-[#2548d6]"
              >
                {item.action}
                {external && <ExternalLink className="h-3 w-3" />}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MessageContent({ text, isUser = false }) {
  const contacts = useMemo(() => (isUser ? null : extractContacts(text || "")), [text, isUser]);
  const hasContacts =
    !!contacts &&
    (contacts.emails.length > 0 ||
      contacts.phones.length > 0 ||
      contacts.linkedins.length > 0 ||
      contacts.urls.length > 0);

  if (isUser) {
    return <span className="whitespace-pre-wrap break-words">{text}</span>;
  }

  const narrative = hasContacts ? buildNarrative(text, contacts) : text;

  return (
    <div className="space-y-1">
      {narrative ? (
        <p className="whitespace-pre-wrap break-words text-[15px] leading-[1.55] text-[#1A1F36]">
          {renderInline(narrative)}
        </p>
      ) : null}
      {hasContacts && <ContactCard contacts={contacts} />}
    </div>
  );
}
