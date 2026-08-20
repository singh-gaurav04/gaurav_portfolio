import { usePortfolio } from "../hooks/usePortfolio";

const FALLBACK_FAQS = [
  {
    id: "fallback-1",
    question: "What AI engineering services do you offer?",
    answer:
      "I build GenAI products including RAG systems, LangChain/LangGraph agents, AI chatbots, FastAPI backends, and full-stack AI applications for startups and teams.",
  },
  {
    id: "fallback-2",
    question: "Are you available for AI engineer or software engineer jobs?",
    answer:
      "Yes. I am open to full-time and freelance roles as an AI Engineer, GenAI Engineer, Backend Engineer, or Software Engineer focused on production AI systems.",
  },
  {
    id: "fallback-3",
    question: "Which technologies do you use for AI products?",
    answer:
      "Python, LangChain, LangGraph, OpenAI, Gemini, FastAPI, React, PostgreSQL, Pinecone/Qdrant/Weaviate, Docker, and cloud platforms like Azure, Render, and Vercel.",
  },
  {
    id: "fallback-4",
    question: "How can I hire you for an AI project?",
    answer:
      "Use the Hire Me or Book service options on this site, or reach out via email or LinkedIn. Typical work includes RAG setups, custom agents, and AI product MVPs.",
  },
];

export default function SeoFaq() {
  const { data, isLoading } = usePortfolio();
  const faqs = (data.faqs || []).length ? data.faqs : FALLBACK_FAQS;

  if (!isLoading && !(data.faqs || []).length && !FALLBACK_FAQS.length) {
    return null;
  }

  return (
    <section
      id="faq"
      className="border-t px-4 py-12"
      style={{ borderColor: "color-mix(in srgb, var(--lsw-border) 12%, transparent)" }}
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto max-w-3xl">
        <p className="editorial-label">FAQ</p>
        <h2 id="faq-heading" className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          AI services & hiring
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-500">
          Quick answers for recruiters, founders, and teams looking for AI engineering help.
        </p>
        <dl className="mt-8 space-y-5">
          {faqs.map((item) => (
            <div
              key={item.id || item.question}
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
            >
              <dt className="text-base font-semibold text-slate-900">{item.question}</dt>
              <dd className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-500">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
