import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { approveTestimonial, deleteAdmin, featureTestimonial, listAdmin, rejectTestimonial } from "../../api/admin";
import { AdminTableSkeleton } from "../../components/Skeleton";

export default function TestimonialsPage() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, error } = useQuery({ queryKey: ["admin", "testimonials"], queryFn: () => listAdmin("testimonials") });
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });
    queryClient.invalidateQueries({ queryKey: ["portfolio"] });
  };

  const act = useMutation({
    mutationFn: ({ id, action }) => action(id),
    onSuccess: invalidate,
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold">Testimonials</h2>
      {error && <p className="mt-3 text-red-600">{error.message}</p>}
      {isLoading && <AdminTableSkeleton rows={4} />}
      <div className="mt-5 space-y-3">
        {!isLoading &&
          data.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-slate-500">
                    {item.role || "—"} · {item.status}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(item.status === "PENDING" || item.status === "pending") && (
                    <>
                      <button
                        onClick={() => act.mutate({ id: item.id, action: approveTestimonial })}
                        className="rounded bg-emerald-600 px-3 py-1 text-sm text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => act.mutate({ id: item.id, action: rejectTestimonial })}
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {(item.status === "APPROVED" || item.status === "approved") && (
                    <button
                      onClick={() => act.mutate({ id: item.id, action: featureTestimonial })}
                      className="rounded border px-3 py-1 text-sm"
                    >
                      {item.is_featured ? "Unfeature" : "Feature"}
                    </button>
                  )}
                  <button
                    onClick={() => deleteAdmin("testimonials", item.id).then(invalidate)}
                    className="rounded border px-3 py-1 text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.message}</p>
            </article>
          ))}
      </div>
    </div>
  );
}
