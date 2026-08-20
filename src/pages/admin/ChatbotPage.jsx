import { useEffect, useMemo, useState } from "react";
import { Bot, Trash2, Upload } from "lucide-react";
import {
  useChatbotAdminConfig,
  useChatbotDocuments,
  useDeleteChatbotDocument,
  useUpdateChatbotConfig,
  useUploadChatbotDocument,
} from "../../hooks/useChatbotAdmin";
import { uploadMedia } from "../../api/admin";
import { AdminChatbotSkeleton } from "../../components/Skeleton";
import { compressImageFile } from "../../utils/compressImage";

export default function ChatbotPage() {
  const { data: documents = [], isLoading } = useChatbotDocuments();
  const { data: config, isLoading: configLoading } = useChatbotAdminConfig();
  const uploadMutation = useUploadChatbotDocument();
  const deleteMutation = useDeleteChatbotDocument();
  const updateMutation = useUpdateChatbotConfig();
  const [form, setForm] = useState(null);
  const [notice, setNotice] = useState("");
  const [avatarUploading, setAvatarUploading] = useState(false);

  useEffect(() => {
    if (config) {
      setForm({
        bot_name: config.bot_name,
        bot_subtitle: config.bot_subtitle,
        avatar_url: config.avatar_url || "",
        welcome_message: config.welcome_message,
        privacy_policy_url: config.privacy_policy_url,
        privacy_policy_label: config.privacy_policy_label,
        quick_actions: config.quick_actions || [],
        llm_provider: config.llm_provider || "openai",
        llm_model: config.llm_model || "gpt-4o-mini",
        llm_temperature: config.llm_temperature ?? 0.2,
        chunk_size: config.chunk_size ?? 800,
        chunk_overlap: config.chunk_overlap ?? 120,
      });
    }
  }, [config]);

  const providers = config?.llm_providers || [];
  const selectedProvider = useMemo(
    () => providers.find((p) => p.id === form?.llm_provider) || providers[0],
    [providers, form?.llm_provider]
  );
  const models = selectedProvider?.models || [];

  useEffect(() => {
    if (!form || !models.length) return;
    const exists = models.some((m) => m.id === form.llm_model);
    if (!exists) {
      setForm((prev) => (prev ? { ...prev, llm_model: models[0].id } : prev));
    }
  }, [form?.llm_provider, models]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setNotice("");
    try {
      await uploadMutation.mutateAsync(file);
      setNotice("PDF uploaded and indexed successfully.");
    } catch (err) {
      setNotice(err.message);
    } finally {
      event.target.value = "";
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document from the knowledge base?")) return;
    await deleteMutation.mutateAsync(id);
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setNotice("");
    setAvatarUploading(true);
    try {
      const compressed = await compressImageFile(file, {
        maxWidth: 512,
        maxHeight: 512,
        quality: 0.8,
      });
      const uploaded = await uploadMedia(compressed, "/portfolio/chatbot/");
      setForm((prev) => (prev ? { ...prev, avatar_url: uploaded?.url || prev.avatar_url } : prev));
      setNotice("Avatar compressed & uploaded — click Save settings to publish.");
    } catch (err) {
      setNotice(err.message || "Avatar upload failed.");
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSaveConfig = async (event) => {
    event?.preventDefault?.();
    setNotice("");
    if (form.chunk_overlap >= form.chunk_size) {
      setNotice("Chunk overlap must be smaller than chunk size.");
      return;
    }
    try {
      await updateMutation.mutateAsync(form);
      setNotice("Chatbot settings saved.");
    } catch (err) {
      setNotice(err.message);
    }
  };

  if (isLoading || configLoading || !form) {
    return <AdminChatbotSkeleton />;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 shrink-0 text-teal-700" />
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Chatbot & RAG</h2>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Upload PDFs, pick an LLM provider/model, and configure the public chat widget.
        </p>
      </div>

      {notice && (
        <div className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">{notice}</div>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-base font-semibold sm:text-lg">LLM provider & model</h3>
        <p className="mt-1 text-sm text-slate-500">
          API keys stay in backend <code className="rounded bg-slate-100 px-1">.env</code>. Switch provider/model here anytime.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-slate-600">Provider</span>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              value={form.llm_provider}
              onChange={(e) => setForm({ ...form, llm_provider: e.target.value })}
            >
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.label}
                  {provider.configured ? "" : " (key missing)"}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-600">Model</span>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              value={form.llm_model}
              onChange={(e) => setForm({ ...form, llm_model: e.target.value })}
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block text-slate-600">
              Temperature ({Number(form.llm_temperature).toFixed(1)})
            </span>
            <input
              type="range"
              min="0"
              max="1.5"
              step="0.1"
              className="w-full"
              value={form.llm_temperature}
              onChange={(e) => setForm({ ...form, llm_temperature: Number(e.target.value) })}
            />
          </label>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`rounded-lg border px-3 py-2 text-xs sm:text-sm ${
                provider.configured
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-amber-200 bg-amber-50 text-amber-800"
              }`}
            >
              <span className="font-semibold">{provider.label}</span>
              <span className="ml-1">{provider.configured ? "· key set" : "· add API key in .env"}</span>
            </div>
          ))}
          <div
            className={`rounded-lg border px-3 py-2 text-xs sm:text-sm ${
              config?.mistral_embed_configured
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            <span className="font-semibold">Mistral embeddings</span>
            <span className="ml-1">
              {config?.mistral_embed_configured ? "· key set" : "· set MISTRAL_API_KEY in .env"}
            </span>
          </div>
          <div
            className={`rounded-lg border px-3 py-2 text-xs sm:text-sm ${
              config?.pinecone_configured
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            <span className="font-semibold">Pinecone</span>
            <span className="ml-1">
              {config?.pinecone_configured ? "· key set" : "· set PINECONE_API_KEY in .env"}
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold sm:text-lg">Knowledge base</h3>
            <p className="text-sm text-slate-500">
              PDFs are chunked, embedded with Mistral, and stored in Pinecone for retrieval.
            </p>
          </div>
          <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 sm:w-auto">
            <Upload className="h-4 w-4" />
            Upload PDF
            <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handleUpload} />
          </label>
        </div>

        <div className="mt-4 grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-slate-600">Chunk size (characters)</span>
            <input
              type="number"
              min={100}
              max={4000}
              step={50}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
              value={form.chunk_size}
              onChange={(e) => setForm({ ...form, chunk_size: Number(e.target.value) })}
            />
            <span className="mt-1 block text-xs text-slate-500">100–4000. Larger = fewer, broader chunks.</span>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-slate-600">Chunk overlap</span>
            <input
              type="number"
              min={0}
              max={2000}
              step={10}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"
              value={form.chunk_overlap}
              onChange={(e) => setForm({ ...form, chunk_overlap: Number(e.target.value) })}
            />
            <span className="mt-1 block text-xs text-slate-500">
              Must be less than chunk size. Applies to new PDF uploads only.
            </span>
          </label>
          <div className="sm:col-span-2">
            <button
              type="button"
              disabled={updateMutation.isPending}
              onClick={handleSaveConfig}
              className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
            >
              {updateMutation.isPending ? "Saving…" : "Save chunk settings"}
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-3 sm:hidden">
          {documents.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-200 px-3 py-8 text-center text-sm text-slate-500">
              No documents yet. Upload a PDF to start indexing.
            </p>
          ) : (
            documents.map((doc) => (
              <article key={doc.id} className="rounded-lg border border-slate-200 p-3">
                <p className="truncate font-medium text-slate-900">{doc.original_filename}</p>
                <p className="mt-1 text-xs capitalize text-slate-500">
                  {doc.status} · {doc.page_count} pages · {doc.chunk_count} chunks · {Math.round(doc.file_size / 1024)} KB
                </p>
                <button
                  type="button"
                  onClick={() => handleDelete(doc.id)}
                  className="mt-3 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </article>
            ))
          )}
        </div>

        <div className="mt-6 hidden overflow-x-auto sm:block">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">File</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Pages</th>
                <th className="px-3 py-2 font-medium">Chunks</th>
                <th className="px-3 py-2 font-medium">Size</th>
                <th className="px-3 py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-slate-500">
                    No documents yet. Upload a PDF to start indexing.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-slate-100">
                    <td className="px-3 py-3 font-medium text-slate-900">{doc.original_filename}</td>
                    <td className="px-3 py-3 capitalize">{doc.status}</td>
                    <td className="px-3 py-3">{doc.page_count}</td>
                    <td className="px-3 py-3">{doc.chunk_count}</td>
                    <td className="px-3 py-3">{Math.round(doc.file_size / 1024)} KB</td>
                    <td className="px-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(doc.id)}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-base font-semibold sm:text-lg">Widget settings</h3>
        <form onSubmit={handleSaveConfig} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-slate-600">Bot name</span>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              value={form.bot_name}
              onChange={(e) => setForm({ ...form, bot_name: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-slate-600">Subtitle</span>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              value={form.bot_subtitle}
              onChange={(e) => setForm({ ...form, bot_subtitle: e.target.value })}
            />
          </label>
          <div className="space-y-3 sm:col-span-2">
            <span className="block text-sm text-slate-600">Bot avatar</span>
            <div className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              {form.avatar_url ? (
                <img
                  src={form.avatar_url}
                  alt="Bot avatar"
                  className="h-16 w-16 rounded-full border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-slate-300 bg-white text-xs text-slate-500">
                  No photo
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60">
                  <Upload className="h-4 w-4" />
                  {avatarUploading ? "Uploading…" : "Upload photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={avatarUploading}
                    onChange={handleAvatarUpload}
                  />
                </label>
                {form.avatar_url ? (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, avatar_url: "" })}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <p className="w-full text-xs text-slate-500">
                Photo is compressed to ~512px JPEG before upload. Save settings after uploading.
              </p>
            </div>
          </div>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block text-slate-600">Welcome message</span>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              value={form.welcome_message}
              onChange={(e) => setForm({ ...form, welcome_message: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-slate-600">Privacy policy URL</span>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              value={form.privacy_policy_url}
              onChange={(e) => setForm({ ...form, privacy_policy_url: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-slate-600">Privacy label</span>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
              value={form.privacy_policy_label}
              onChange={(e) => setForm({ ...form, privacy_policy_label: e.target.value })}
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60 sm:w-auto"
            >
              {updateMutation.isPending ? "Saving…" : "Save settings"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
