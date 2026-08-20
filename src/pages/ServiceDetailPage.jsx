import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Clock3, ListChecks, Phone, Workflow } from "lucide-react";
import Navbar from "../components/Navbar";
import ImageGallery from "../components/ImageGallery";
import ServiceBookModal from "../components/ServiceBookModal";
import SeoHead from "../components/SeoHead";
import { getServiceBySlug } from "../api/public";
import { getServiceIcon, normalizeService } from "../data/services";
import { usePortfolio } from "../hooks/usePortfolio";
import { DetailPageSkeleton } from "../components/Skeleton";

function PointCard({ title, icon: Icon, items, accent = "var(--lsw-warning)" }) {
  return (
    <div
      className="rounded-[28px] border p-6"
      style={{
        borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
        background: "var(--lsw-surface)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `color-mix(in srgb, ${accent} 14%, var(--lsw-white))`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <ul className="mt-4 space-y-3">
        {(items || []).map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--lsw-text-muted)" }}>
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
            {item}
          </li>
        ))}
      </ul>
      {!items?.length && (
        <p className="mt-4 text-sm" style={{ color: "var(--lsw-text-muted)" }}>
          Details will appear here once configured in admin.
        </p>
      )}
    </div>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { data: portfolio } = usePortfolio();
  const profile = portfolio?.profile;
  const phoneHref = profile?.phone ? `tel:${String(profile.phone).replace(/\D/g, "")}` : null;
  const [bookOpen, setBookOpen] = useState(false);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service", slug],
    queryFn: async () => {
      const res = await getServiceBySlug(slug);
      return normalizeService(res?.data || res);
    },
    enabled: !!slug,
  });

  const service = data || null;

  const related = useMemo(() => {
    const all = (portfolio?.services || []).map(normalizeService).filter(Boolean);
    return all.filter((item) => item.slug !== slug).slice(0, 3);
  }, [portfolio?.services, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
        <Navbar />
        <main className="container mx-auto max-w-6xl px-4 py-28">
          <DetailPageSkeleton />
        </main>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
        <Navbar />
        <main className="container mx-auto max-w-3xl px-4 py-32 text-center">
          <h1 className="text-3xl font-semibold">Service not found</h1>
          <Link to="/#services" className="lsw-btn-primary mt-6 inline-flex px-5 py-3">
            Back to services
          </Link>
        </main>
      </div>
    );
  }

  const Icon = getServiceIcon(service.icon);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--lsw-background)", color: "var(--lsw-text)" }}>
      <SeoHead
        title={`${service.title} — AI Development Service`}
        description={
          service.short_description ||
          `Book ${service.title} with AI Engineer Gaurav Singh. GenAI, RAG, and software engineering services.`
        }
        path={`/services/${service.slug}`}
        image={service.featured_image_url}
        type="article"
      />
      <div className="site-grain" />
      <Navbar />
      <main className="relative z-10 px-0 pb-16 pt-20 sm:px-4 sm:pb-24 sm:pt-28">
        <div className="container mx-auto max-w-6xl">
          <Link
            to="/#services"
            className="mb-4 ml-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold sm:mb-8 sm:ml-0"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
              background: "var(--lsw-surface)",
              color: "var(--lsw-text-muted)",
            }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to services
          </Link>

          <div
            className="overflow-hidden border-y sm:rounded-[32px] sm:border"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)",
              background: "linear-gradient(135deg, color-mix(in srgb, var(--lsw-warning) 10%, var(--lsw-white)), var(--lsw-surface))",
            }}
          >
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-5 sm:p-8 lg:p-10">
                <p className="editorial-label">Service details</p>
                {(service.recommended || service.tag) && (
                  <div
                    className="mt-4 inline-flex w-fit max-w-full items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{
                      borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                      background: "var(--lsw-white)",
                      color: "var(--lsw-warning)",
                    }}
                  >
                    {service.recommended ? "Recommended" : service.tag}
                  </div>
                )}
                <h1 className="mt-3 break-words text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8" style={{ color: "var(--lsw-text-muted)" }}>
                  {service.short_description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
                  <button type="button" onClick={() => setBookOpen(true)} className="lsw-btn-primary px-5 py-3">
                    <CalendarDays className="h-4 w-4" /> Book this service
                  </button>
                  {phoneHref ? (
                    <a href={phoneHref} className="lsw-btn-secondary px-5 py-3">
                      <Phone className="h-4 w-4" /> Call now
                    </a>
                  ) : null}
                </div>
              </div>

              <div
                className="relative min-h-[240px] border-t p-4 sm:min-h-[260px] sm:p-4 lg:border-l lg:border-t-0"
                style={{ borderColor: "color-mix(in srgb, var(--lsw-border) 12%, transparent)" }}
              >
                {service.featured_image_url || (service.gallery_images || []).length ? (
                  <ImageGallery
                    featured_image_url={service.featured_image_url}
                    gallery_images={service.gallery_images}
                    alt={service.title}
                  />
                ) : (
                  <div className="flex h-full min-h-[260px] items-center justify-center gap-4 p-8 text-center">
                    <div
                      className="inline-flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{
                        background: "color-mix(in srgb, var(--lsw-warning) 16%, var(--lsw-white))",
                        color: "var(--lsw-warning)",
                      }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="max-w-xs text-sm" style={{ color: "var(--lsw-text-muted)" }}>
                      Professional delivery for {service.title}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4 px-3 sm:mt-10 sm:space-y-6 sm:px-0">
            <div
              className="rounded-[28px] border p-5 sm:p-6"
              style={{
                borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                background: "var(--lsw-surface)",
              }}
            >
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-8" style={{ color: "var(--lsw-text-muted)" }}>
                {service.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <PointCard title="What you get" icon={ListChecks} items={service.features} accent="var(--lsw-warning)" />
              <PointCard title="Duration" icon={Clock3} items={service.duration} accent="var(--lsw-info)" />
              <PointCard title="How it works" icon={Workflow} items={service.how_it_works} accent="var(--lsw-success)" />
              <PointCard title="Delivered" icon={CalendarDays} items={service.deliverables} accent="var(--lsw-warning)" />
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-10 px-3 sm:mt-16 sm:px-0">
              <h2 className="text-2xl font-semibold">Other services</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => {
                  const RelatedIcon = getServiceIcon(item.icon);
                  return (
                    <Link
                      key={item.slug}
                      to={`/services/${item.slug}`}
                      className="group rounded-[28px] border p-5 transition hover:-translate-y-1"
                      style={{
                        borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                        background: "var(--lsw-surface)",
                      }}
                    >
                      <RelatedIcon className="h-5 w-5" style={{ color: "var(--lsw-warning)" }} />
                      <p className="mt-3 font-semibold">{item.title}</p>
                      <p className="mt-2 text-sm leading-6" style={{ color: "var(--lsw-text-muted)" }}>
                        {item.short_description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <ServiceBookModal
        service={
          bookOpen
            ? {
                ...service,
                icon: Icon,
                fullDescription: service.description,
              }
            : null
        }
        onClose={() => setBookOpen(false)}
      />
    </div>
  );
}
