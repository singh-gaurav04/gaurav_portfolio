import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Award,
  BarChart3,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Sparkles,
  Star,
  User,
  Wrench,
  Bot,
  HelpCircle,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/profile", label: "Profile", icon: User },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/services", label: "Services", icon: Sparkles },
  { to: "/admin/skills", label: "Skills", icon: Wrench },
  { to: "/admin/experiences", label: "Experience", icon: BarChart3 },
  { to: "/admin/certifications", label: "Certifications", icon: Award },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/contacts", label: "Inbox", icon: MessageSquare },
  { to: "/admin/chatbot", label: "Chatbot", icon: Bot },
  { to: "/admin/templates", label: "Email templates", icon: Mail },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const NavItems = ({ onNavigate }) => (
    <>
      <nav className="space-y-1 p-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  isActive ? "bg-teal-400 font-medium text-slate-950" : "text-slate-300 hover:bg-white/5"
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-3">
        <button
          onClick={async () => {
            await logout();
            onNavigate?.();
            navigate("/admin/login");
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-slate-950 text-slate-100 lg:block">
          <div className="border-b border-white/10 px-5 py-6">
            <p className="text-xs uppercase tracking-[0.2em] text-teal-300">CMS</p>
            <h1 className="mt-1 text-lg font-semibold">Portfolio admin</h1>
            <p className="mt-2 truncate text-xs text-slate-400">{admin?.email}</p>
          </div>
          <NavItems />
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <p className="hidden text-sm text-slate-500 sm:block">Manage published content and incoming messages.</p>
              <p className="truncate text-sm font-medium text-slate-800 sm:hidden">Admin</p>
            </div>
            <a href="/" className="shrink-0 text-sm text-teal-700 hover:underline">
              View site
            </a>
          </header>
          <main className="p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(280px,88vw)] flex-col bg-slate-950 text-slate-100 shadow-xl">
            <div className="flex items-start justify-between border-b border-white/10 px-5 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-teal-300">CMS</p>
                <h1 className="mt-1 text-lg font-semibold">Portfolio admin</h1>
                <p className="mt-2 truncate text-xs text-slate-400">{admin?.email}</p>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-slate-300 hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <NavItems onNavigate={() => setMenuOpen(false)} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
