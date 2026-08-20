import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAdminProfile, updateAdminProfile, uploadDocument, uploadMedia } from "../../api/admin";
import { useAuth } from "../../contexts/AuthContext";
import { AdminFormSkeleton } from "../../components/Skeleton";

const empty = {
  name: "",
  title: "",
  handle: "",
  bio: "",
  location: "",
  email: "",
  phone: "",
  graduation_year: "",
  profile_image_url: "",
  resume_url: "",
  is_placed: false,
  placement_status: "",
  placement_company: "",
  placement_role: "",
  github_url: "",
  linkedin_url: "",
  leetcode_url: "",
  response_time: "",
};

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const { admin, changePassword } = useAuth();
  const { data, isLoading, error } = useQuery({ queryKey: ["admin-profile"], queryFn: getAdminProfile });
  const [form, setForm] = useState(empty);
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [passwordNotice, setPasswordNotice] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    if (data) {
      const next = { ...empty };
      Object.keys(empty).forEach((key) => {
        next[key] = data[key] ?? empty[key];
      });
      setForm(next);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      setNotice("Profile saved");
      setTimeout(() => setNotice(""), 2500);
    },
  });

  const set = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const uploadFile = async (file, folder, field, kind = "image") => {
    if (!file) return;
    setUploading(field);
    setUploadError("");
    try {
      const uploaded = kind === "document" ? await uploadDocument(file, folder) : await uploadMedia(file, folder);
      setForm((prev) => ({ ...prev, [field]: uploaded?.url || prev[field] }));
      setNotice(`${field === "resume_url" ? "Resume" : "Image"} uploaded — click Save profile to publish.`);
      setTimeout(() => setNotice(""), 3500);
    } catch (err) {
      setUploadError(err.message || "Upload failed.");
    } finally {
      setUploading("");
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setPasswordNotice("");
    setPasswordError("");
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
    if (passwordForm.new_password.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    setPasswordSaving(true);
    try {
      await changePassword(passwordForm);
      setPasswordForm({ current_password: "", new_password: "", confirm_password: "" });
      setPasswordNotice("Password updated successfully.");
      setTimeout(() => setPasswordNotice(""), 3000);
    } catch (err) {
      setPasswordError(err.message || "Could not update password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  if (isLoading) return <AdminFormSkeleton />;
  if (error) return <p className="text-red-600">{error.message}</p>;

  return (
    <div className="max-w-3xl space-y-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate(form);
        }}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
      >
        <h2 className="text-2xl font-semibold">Public profile</h2>
        {notice && <p className="text-sm text-teal-700">{notice}</p>}
        {mutation.error && <p className="text-sm text-red-600">{mutation.error.message}</p>}
        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" value={form.name} onChange={set("name")} required />
          <Input label="Title" value={form.title} onChange={set("title")} required />
          <Input label="Handle" value={form.handle} onChange={set("handle")} />
          <Input label="Email" type="email" value={form.email} onChange={set("email")} required />
          <Input label="Phone" value={form.phone} onChange={set("phone")} />
          <Input label="Location" value={form.location} onChange={set("location")} />
          <Input label="Graduation year" value={form.graduation_year} onChange={set("graduation_year")} />
          <Input label="Response time" value={form.response_time} onChange={set("response_time")} />
        </div>

        <label className="block text-sm text-slate-600">
          Bio
          <textarea value={form.bio} onChange={set("bio")} rows={6} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">Hero / profile image</p>
            <p className="text-sm text-slate-600">
              Used on the homepage hero. Falls back to `/assets/images/profile.jpg` if empty.
            </p>
            {form.profile_image_url ? (
              <img
                src={form.profile_image_url}
                alt="Profile"
                className="h-28 w-28 rounded-2xl border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 text-xs text-slate-500">
                No image
              </div>
            )}
            <Input label="Image URL" value={form.profile_image_url} onChange={set("profile_image_url")} />
            <label className="inline-flex cursor-pointer items-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              {uploading === "profile_image_url" ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!!uploading}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  uploadFile(file, "/portfolio/profile/", "profile_image_url");
                }}
              />
            </label>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">Resume</p>
            <p className="text-sm text-slate-600">Powers the Download Resume button on the hero.</p>
            {form.resume_url ? (
              <a
                href={form.resume_url}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-sm text-teal-700 underline"
              >
                {form.resume_url}
              </a>
            ) : (
              <p className="text-sm text-slate-500">No resume uploaded.</p>
            )}
            <Input label="Resume URL" value={form.resume_url} onChange={set("resume_url")} />
            <label className="inline-flex cursor-pointer items-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              {uploading === "resume_url" ? "Uploading…" : "Upload resume"}
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf"
                className="hidden"
                disabled={!!uploading}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  uploadFile(file, "/portfolio/resume/", "resume_url", "document");
                }}
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="GitHub" value={form.github_url} onChange={set("github_url")} />
          <Input label="LinkedIn" value={form.linkedin_url} onChange={set("linkedin_url")} />
          <Input label="LeetCode" value={form.leetcode_url} onChange={set("leetcode_url")} />
          <Input label="Placement status" value={form.placement_status} onChange={set("placement_status")} />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_placed} onChange={set("is_placed")} /> Placed
        </label>

        <button disabled={mutation.isPending} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          {mutation.isPending ? "Saving…" : "Save profile"}
        </button>
      </form>

      <form onSubmit={handleChangePassword} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Account password</h2>
          <p className="mt-1 text-sm text-slate-500">
            Signed in as <span className="font-medium text-slate-700">{admin?.email}</span>. Change your login
            password here.
          </p>
        </div>
        {passwordNotice && <p className="text-sm text-teal-700">{passwordNotice}</p>}
        {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
        <div className="grid gap-4">
          <Input
            label="Current password"
            type="password"
            autoComplete="current-password"
            value={passwordForm.current_password}
            onChange={(e) => setPasswordForm((prev) => ({ ...prev, current_password: e.target.value }))}
            required
          />
          <Input
            label="New password"
            type="password"
            autoComplete="new-password"
            value={passwordForm.new_password}
            onChange={(e) => setPasswordForm((prev) => ({ ...prev, new_password: e.target.value }))}
            required
            minLength={8}
          />
          <Input
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            value={passwordForm.confirm_password}
            onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirm_password: e.target.value }))}
            required
            minLength={8}
          />
        </div>
        <button
          type="submit"
          disabled={passwordSaving}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
        >
          {passwordSaving ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block text-sm text-slate-600">
      {label}
      <input {...props} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
    </label>
  );
}
