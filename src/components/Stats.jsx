import { Briefcase, Clock3, Globe2, Sparkles } from "lucide-react";

const defaultStats = [
  {
    value: "10+",
    label: "Projects Built",
    description: "Across AI, backend and product builds",
    icon: Briefcase,
    accent: "purple",
  },
  {
    value: "3+",
    label: "AI Systems",
    description: "Agents, RAG and assistant workflows",
    icon: Sparkles,
    accent: "blue",
  },
  {
    value: "2+",
    label: "Years Building",
    description: "Focused on practical software delivery",
    icon: Clock3,
    accent: "green",
  },
  {
    value: "100%",
    label: "Remote Ready",
    description: "Built for async and global collaboration",
    icon: Globe2,
    accent: "purple",
  },
];

const accentMap = {
  purple: "bg-[#EEE9FF] text-[#5B2EFF]",
  blue: "bg-[#EAF0FF] text-[#315BFF]",
  green: "bg-[#EAF8EF] text-[#16A34A]",
};

export default function Stats({ items = defaultStats }) {
  return (
    <section className="px-4 pb-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-4 rounded-[32px] border border-[#E7E8EF] bg-white p-6 shadow-[0_20px_60px_rgba(17,21,37,0.06)] md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl bg-[#FCFCFF] p-5">
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${accentMap[item.accent] || accentMap.purple}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-3xl font-semibold tracking-tight text-[#111525]">{item.value}</p>
                <p className="mt-2 text-sm font-medium text-[#111525]">{item.label}</p>
                <p className="mt-1 text-sm leading-6 text-[#596174]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

