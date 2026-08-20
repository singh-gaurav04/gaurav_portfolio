import { useQuery } from "@tanstack/react-query";
import { Award, Briefcase, Eye, Mail, Star, Users, Wrench } from "lucide-react";
import { getDashboard } from "../../api/admin";
import { AdminDashboardSkeleton } from "../../components/Skeleton";

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({ queryKey: ["admin-dashboard"], queryFn: getDashboard });

  if (isLoading) return <AdminDashboardSkeleton />;
  if (error) return <p className="text-red-600">{error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Overview</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card icon={Briefcase} label="Projects" value={data.projects?.total} hint={`${data.projects?.published || 0} published`} />
        <Card icon={Wrench} label="Skills" value={data.skills?.total} hint={`${data.skills?.active || 0} active`} />
        <Card icon={Star} label="Testimonials" value={data.testimonials?.total} hint={`${data.testimonials?.pending || 0} pending`} />
        <Card icon={Mail} label="Contacts" value={data.contacts?.total} hint={`${data.contacts?.unread || 0} unread`} />
        <Card icon={Users} label="Visits" value={data.visits?.total} />
        <Card icon={Eye} label="Experience" value={data.experiences?.total} />
        <Card icon={Award} label="Certifications" value={data.certifications?.total} />
      </div>
    </div>
  );
}

function Card({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between text-slate-500">
        <span className="text-sm">{label}</span>
        <Icon className="h-4 w-4 text-teal-600" />
      </div>
      <p className="mt-3 text-3xl font-semibold">{value ?? 0}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
