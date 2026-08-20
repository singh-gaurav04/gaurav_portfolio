import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { archiveContact, listAdmin, markContactRead, replyContact } from "../../api/admin";
import { AdminTableSkeleton } from "../../components/Skeleton";

export default function ContactsPage() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, error } = useQuery({ queryKey: ["admin", "contacts"], queryFn: () => listAdmin("contacts") });
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "contacts"] });

  const replyMutation = useMutation({
    mutationFn: () => replyContact(selected.id, reply),
    onSuccess: () => {
      setReply("");
      invalidate();
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold">Inbox</h2>
      {error && <p className="mt-3 text-red-600">{error.message}</p>}
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white">
          {isLoading && <AdminTableSkeleton rows={5} />}
          {!isLoading && data.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelected(item);
                markContactRead(item.id).then(invalidate).catch(() => {});
              }}
              className="block w-full border-b px-4 py-3 text-left last:border-0 hover:bg-slate-50"
            >
              <div className="flex justify-between gap-3">
                <p className="font-medium">{item.name}</p>
                <span className="text-xs uppercase text-slate-400">{item.status}</span>
              </div>
              <p className="text-sm text-slate-500">{item.subject}</p>
            </button>
          ))}
        </div>
        {selected && (
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold">{selected.subject}</h3>
            <p className="mt-1 text-sm text-slate-500">{selected.name} · {selected.email}</p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-6">{selected.message}</p>
            <textarea value={reply} onChange={(e) => setReply(e.target.value)} className="mt-5 w-full rounded-lg border px-3 py-2" rows={5} placeholder="Reply…" />
            {replyMutation.error && <p className="mt-2 text-sm text-red-600">{replyMutation.error.message}</p>}
            <div className="mt-3 flex gap-2">
              <button onClick={() => replyMutation.mutate()} disabled={!reply.trim()} className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-40">Send reply</button>
              <button onClick={() => archiveContact(selected.id).then(invalidate)} className="rounded-lg border px-4 py-2 text-sm">Archive</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
