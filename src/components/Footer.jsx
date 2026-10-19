import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { NAV_ITEMS } from "../lib/motion";
import { usePortfolio } from "../hooks/usePortfolio";

export default function Footer() {
  const { data } = usePortfolio();
  const profile = data.profile;

  return (
    <footer className="border-t border-[#E7E8EF] bg-[#F7F7FC] px-4 py-20">
      <div className="container mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div>
          <p className="editorial-label">{profile?.name || "Gaurav Singh"}</p>
          <h3 className="mt-3 max-w-sm text-3xl font-semibold leading-tight text-[#111525]">
            LET&apos;S BUILD
            <br />
            SOMETHING INTELLIGENT.
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[#596174]">{profile?.title}</p>
          <div className="mt-5 flex gap-3">
            {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-xl border border-[#E7E8EF] bg-white p-2.5 text-[#596174] hover:text-[#111525]"><Github className="h-4 w-4" /></a>}
            {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-xl border border-[#E7E8EF] bg-white p-2.5 text-[#596174] hover:text-[#111525]"><Linkedin className="h-4 w-4" /></a>}
            {profile?.email && <a href={`mailto:${profile.email}`} className="rounded-xl border border-[#E7E8EF] bg-white p-2.5 text-[#596174] hover:text-[#111525]"><Mail className="h-4 w-4" /></a>}
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-medium text-[#111525]">Navigate</h4>
          <ul className="space-y-2 text-sm text-[#596174]">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="hover:text-[#111525]">{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm text-[#596174]">
          {profile?.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {profile.email}</p>}
          {profile?.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {profile.phone}</p>}
          {profile?.location && <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {profile.location}</p>}
        </div>
      </div>
      <p className="mt-12 text-center text-xs text-[#596174]">
        © {new Date().getFullYear()} {profile?.name || "Gaurav Singh"}
      </p>
    </footer>
  );
}
