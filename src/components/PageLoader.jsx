export default function PageLoader() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--lsw-background)", color: "var(--lsw-text-muted)" }}
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
    </div>
  );
}
