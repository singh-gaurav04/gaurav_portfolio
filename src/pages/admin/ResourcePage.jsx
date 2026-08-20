import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createAdmin,
  deleteAdmin,
  deleteProjectGalleryImage,
  deleteServiceGalleryImage,
  listAdmin,
  toggleProjectFeature,
  toggleProjectPublish,
  updateAdmin,
  uploadMedia,
  uploadProjectFeaturedImage,
  uploadProjectGalleryImage,
  uploadServiceFeaturedImage,
  uploadServiceGalleryImage,
} from "../../api/admin";
import { AdminTableSkeleton } from "../../components/Skeleton";

const LIST_FIELDS = ["features", "duration", "how_it_works", "deliverables", "achievements"];
const COMMA_FIELDS = ["technologies"];

const SCHEMAS = {
  projects: {
    title: "Projects",
    fields: [
      ["title", "Title"],
      ["slug", "Slug"],
      ["short_description", "Short description"],
      ["description", "Description", "textarea"],
      ["github_url", "GitHub URL"],
      ["live_url", "Live URL"],
      ["category", "Category"],
      ["technologies", "Technologies (comma separated)"],
      ["display_order", "Order", "number"],
      ["featured", "Featured", "checkbox"],
      ["is_real_project", "Real project", "checkbox"],
      ["is_published", "Published", "checkbox"],
    ],
    empty: {
      title: "", slug: "", short_description: "", description: "", github_url: "", live_url: "",
      category: "AI",
      technologies: "",
      display_order: 0,
      featured: false,
      is_real_project: false,
      is_published: true,
      featured_image_url: null,
      imagekit_file_id: null,
      gallery_images: [],
    },
    label: (item) => item.title,
  },
  services: {
    title: "Services",
    fields: [
      ["title", "Title"],
      ["slug", "Slug"],
      ["short_description", "Short description"],
      ["description", "Full description", "textarea"],
      ["features", "Features / What you get (one per line)", "textarea"],
      ["duration", "Duration points (one per line)", "textarea"],
      ["how_it_works", "How it works (one per line)", "textarea"],
      ["deliverables", "Delivered / Deliverables (one per line)", "textarea"],
      ["tag", "Tag"],
      ["icon", "Icon name (optional)"],
      ["display_order", "Order", "number"],
      ["recommended", "Recommended", "checkbox"],
      ["is_published", "Published", "checkbox"],
    ],
    empty: {
      title: "",
      slug: "",
      short_description: "",
      description: "",
      features: "",
      duration: "",
      how_it_works: "",
      deliverables: "",
      tag: "",
      icon: "",
      display_order: 0,
      recommended: false,
      is_published: true,
      featured_image_url: null,
      imagekit_file_id: null,
      gallery_images: [],
    },
    label: (item) => `${item.title}${item.recommended ? " · Recommended" : ""}`,
  },
  skills: {
    title: "Skills",
    fields: [
      ["name", "Name"],
      ["category", "Category"],
      ["icon", "Icon"],
      ["description", "Description", "textarea"],
      ["proficiency", "Proficiency", "number"],
      ["display_order", "Order", "number"],
      ["is_active", "Active", "checkbox"],
    ],
    empty: { name: "", category: "programming", icon: "", description: "", proficiency: 80, display_order: 0, is_active: true },
    label: (item) => `${item.name} · ${item.category}`,
  },
  experiences: {
    title: "Experience",
    fields: [
      ["title", "Title"],
      ["company", "Company"],
      ["location", "Location"],
      ["period", "Period"],
      ["type", "Type"],
      ["description", "Description", "textarea"],
      ["achievements", "Achievements (one per line)", "textarea"],
      ["technologies", "Technologies (comma separated)"],
      ["link", "Link"],
      ["display_order", "Order", "number"],
      ["is_published", "Published", "checkbox"],
    ],
    empty: {
      title: "", company: "", location: "", period: "", type: "Experience", description: "",
      achievements: "", technologies: "", link: "", display_order: 0, is_published: true,
    },
    label: (item) => `${item.title} — ${item.company}`,
  },
  certifications: {
    title: "Certifications",
    fields: [
      ["title", "Title"],
      ["issuer", "Issuer"],
      ["date", "Date"],
      ["description", "Description", "textarea"],
      ["credential_id", "Credential ID"],
      ["link", "Link"],
      ["icon", "Icon"],
      ["display_order", "Order", "number"],
      ["is_published", "Published", "checkbox"],
    ],
    empty: { title: "", issuer: "", date: "", description: "", credential_id: "", link: "", icon: "", display_order: 0, is_published: true },
    label: (item) => item.title,
  },
  faqs: {
    title: "FAQs",
    fields: [
      ["question", "Question"],
      ["answer", "Answer", "textarea"],
      ["display_order", "Order", "number"],
      ["is_active", "Active", "checkbox"],
    ],
    empty: { question: "", answer: "", display_order: 0, is_active: true },
    label: (item) => item.question,
  },
};

function toForm(resource, item) {
  const schema = SCHEMAS[resource];
  if (!item) return { ...schema.empty };
  const form = { ...schema.empty, ...item };
  COMMA_FIELDS.forEach((key) => {
    if (Array.isArray(item[key])) form[key] = item[key].join(", ");
  });
  LIST_FIELDS.forEach((key) => {
    if (Array.isArray(item[key])) form[key] = item[key].join("\n");
  });
  return form;
}

function toPayload(resource, form) {
  const payload = { ...form };
  delete payload.id;
  delete payload.created_at;
  delete payload.updated_at;
  if (resource !== "projects" && resource !== "services") {
    delete payload.featured_image_url;
    delete payload.imagekit_file_id;
    delete payload.gallery_images;
  } else if (!Array.isArray(payload.gallery_images)) {
    payload.gallery_images = [];
  }
  COMMA_FIELDS.forEach((key) => {
    if (key in payload) {
      payload[key] = String(payload[key] || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  });
  LIST_FIELDS.forEach((key) => {
    if (key in payload) {
      payload[key] = String(payload[key] || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  });
  ["display_order", "proficiency"].forEach((key) => {
    if (key in payload) payload[key] = Number(payload[key] || 0);
  });
  ["github_url", "live_url", "link", "slug", "tag", "icon"].forEach((key) => {
    if (payload[key] === "") payload[key] = null;
  });

  if ("featured_image_url" in payload && payload.featured_image_url === "") payload.featured_image_url = null;
  if ("imagekit_file_id" in payload && payload.imagekit_file_id === "") payload.imagekit_file_id = null;
  return payload;
}

export default function ResourcePage({ resource }) {
  const schema = SCHEMAS[resource];
  const queryClient = useQueryClient();
  const { data = [], isLoading, error } = useQuery({ queryKey: ["admin", resource], queryFn: () => listAdmin(resource) });
  const [selectedId, setSelectedId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(schema.empty);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const selected = data.find((item) => item.id === selectedId);
  const supportsImage = resource === "projects" || resource === "services";

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", resource] });
    queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
  };

  const saveMutation = useMutation({
    mutationFn: (payload) => (selectedId ? updateAdmin(resource, selectedId, payload) : createAdmin(resource, payload)),
    onSuccess: () => {
      invalidate();
      setCreating(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAdmin(resource, id),
    onSuccess: () => {
      setSelectedId(null);
      invalidate();
    },
  });

  const open = (item) => {
    setCreating(false);
    setSelectedId(item.id);
    setForm(toForm(resource, item));
    setUploadError("");
  };

  const openCreate = () => {
    setSelectedId(null);
    setCreating(true);
    setForm({ ...schema.empty });
    setUploadError("");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setUploadError("");

    try {
      if (selectedId && resource === "projects") {
        const updated = await uploadProjectFeaturedImage(selectedId, file);
        setForm((prev) => ({
          ...prev,
          featured_image_url: updated?.featured_image_url || null,
          imagekit_file_id: updated?.imagekit_file_id || null,
          gallery_images: updated?.gallery_images || prev.gallery_images || [],
        }));
        invalidate();
      } else if (selectedId && resource === "services") {
        const updated = await uploadServiceFeaturedImage(selectedId, file);
        setForm((prev) => ({
          ...prev,
          featured_image_url: updated?.featured_image_url || null,
          imagekit_file_id: updated?.imagekit_file_id || null,
          gallery_images: updated?.gallery_images || prev.gallery_images || [],
        }));
        invalidate();
      } else {
        const folder = resource === "services" ? "/portfolio/services/" : "/portfolio/projects/";
        const uploaded = await uploadMedia(file, folder);
        setForm((prev) => ({
          ...prev,
          featured_image_url: uploaded?.url || null,
          imagekit_file_id: uploaded?.file_id || null,
        }));
      }
      event.target.value = "";
    } catch (err) {
      setUploadError(err.message || "Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGalleryUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length || !selectedId) return;
    setUploadingImage(true);
    setUploadError("");

    try {
      let updated = null;
      for (const file of files) {
        updated =
          resource === "services"
            ? await uploadServiceGalleryImage(selectedId, file)
            : await uploadProjectGalleryImage(selectedId, file);
      }
      if (updated) {
        setForm((prev) => ({
          ...prev,
          featured_image_url: updated.featured_image_url || prev.featured_image_url,
          imagekit_file_id: updated.imagekit_file_id || prev.imagekit_file_id,
          gallery_images: updated.gallery_images || [],
        }));
      }
      invalidate();
      event.target.value = "";
    } catch (err) {
      setUploadError(err.message || "Gallery upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGalleryRemove = async (fileId) => {
    if (!selectedId || !fileId) return;
    setUploadingImage(true);
    setUploadError("");
    try {
      const updated =
        resource === "services"
          ? await deleteServiceGalleryImage(selectedId, fileId)
          : await deleteProjectGalleryImage(selectedId, fileId);
      setForm((prev) => ({
        ...prev,
        featured_image_url: updated?.featured_image_url ?? prev.featured_image_url,
        imagekit_file_id: updated?.imagekit_file_id ?? prev.imagekit_file_id,
        gallery_images: updated?.gallery_images || [],
      }));
      invalidate();
    } catch (err) {
      setUploadError(err.message || "Could not remove image.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{schema.title}</h2>
        <button onClick={openCreate} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Add</button>
      </div>
      {error && <p className="mb-4 text-red-600">{error.message}</p>}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border border-slate-200 bg-white">
          {isLoading && <AdminTableSkeleton rows={6} />}
          {!isLoading && (data || []).map((item) => (
            <button
              key={item.id}
              onClick={() => open(item)}
              className={`block w-full border-b border-slate-100 px-4 py-3 text-left text-sm last:border-0 ${selectedId === item.id ? "bg-teal-50" : "hover:bg-slate-50"}`}
            >
              {schema.label(item)}
            </button>
          ))}
        </div>
        {(creating || selected) && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              saveMutation.mutate(toPayload(resource, form));
            }}
            className="space-y-3 rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{creating ? "New item" : "Edit"}</h3>
              {selectedId && (
                <button type="button" onClick={() => deleteMutation.mutate(selectedId)} className="text-sm text-red-600">
                  Delete
                </button>
              )}
            </div>
            {schema.fields.map(([key, label, type]) => (
              <label key={key} className="block text-sm text-slate-600">
                {label}
                {type === "textarea" ? (
                  <textarea value={form[key] ?? ""} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} rows={4} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
                ) : type === "checkbox" ? (
                  <input type="checkbox" checked={!!form[key]} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.checked }))} className="ml-2" />
                ) : (
                  <input type={type || "text"} value={form[key] ?? ""} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
                )}
              </label>
            ))}
            {supportsImage && (creating || selectedId) && (
              <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Cover image</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Used on cards and as the primary detail image.
                      {selectedId ? " Saved immediately." : " Save the item after uploading."}
                    </p>
                  </div>
                  {form.featured_image_url ? (
                    <img
                      src={form.featured_image_url}
                      alt={resource}
                      className="h-16 w-16 flex-none rounded-xl border border-slate-200 bg-white object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-16 w-16 flex-none items-center justify-center rounded-xl border border-slate-200 bg-white text-xs text-slate-500">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="inline-flex cursor-pointer items-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                    {uploadingImage ? "Uploading…" : "Upload cover"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                  </label>
                  {uploadError ? (
                    <p className="text-sm text-red-600">{uploadError}</p>
                  ) : (
                    <p className="text-sm text-slate-600">PNG/JPG/WebP recommended.</p>
                  )}
                </div>

                {selectedId ? (
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">Gallery images</p>
                        <p className="mt-1 text-sm text-slate-600">Add multiple images shown on the detail page.</p>
                      </div>
                      <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100">
                        {uploadingImage ? "Uploading…" : "Add images"}
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleGalleryUpload}
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>

                    {(form.gallery_images || []).length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(form.gallery_images || []).map((item) => (
                          <div key={item.file_id || item.url} className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <img src={item.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                            <button
                              type="button"
                              onClick={() => handleGalleryRemove(item.file_id)}
                              className="absolute right-0.5 top-0.5 rounded bg-black/70 px-1 text-[10px] font-semibold text-white"
                              disabled={uploadingImage}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-slate-500">No gallery images yet.</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Save the item first to upload multiple gallery images.</p>
                )}
              </div>
            )}

            {resource === "projects" && selectedId && (
              <div className="flex gap-2">
                <button type="button" onClick={() => toggleProjectPublish(selectedId).then(invalidate)} className="rounded border px-3 py-1 text-sm">Toggle publish</button>
                <button type="button" onClick={() => toggleProjectFeature(selectedId).then(invalidate)} className="rounded border px-3 py-1 text-sm">Toggle featured</button>
              </div>
            )}
            {saveMutation.error && <p className="text-sm text-red-600">{saveMutation.error.message}</p>}
            <button disabled={saveMutation.isPending} className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
              {saveMutation.isPending ? "Saving…" : "Save"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
