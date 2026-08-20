import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import CardImageCarousel from "./CardImageCarousel";
import { animationVariants } from "../lib/motion";
import { usePortfolio } from "../hooks/usePortfolio";
import { getServiceIcon, normalizeService } from "../data/services";
import ServiceBookModal from "./ServiceBookModal";
import { CardGridSkeleton } from "./Skeleton";

const HOME_PREVIEW_LIMIT = 4;

function ServiceCard({ service, phoneHref, onBook, onOpen }) {
  const Icon = getServiceIcon(service.icon);

  return (
    <motion.article
      variants={animationVariants.card}
      whileHover={{ y: -4 }}
      className="flex cursor-pointer flex-col rounded-[28px] border p-5"
      style={{
        borderColor: "color-mix(in srgb, var(--lsw-border) 16%, transparent)",
        background: "var(--lsw-surface)",
        boxShadow: "0 14px 40px rgba(6, 28, 58, 0.06)",
      }}
      role="link"
      tabIndex={0}
      aria-label={`View ${service.title} details`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {service.featured_image_url || (service.gallery_images || []).length ? (
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border"
          style={{ borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)" }}
        >
          <CardImageCarousel
            featured_image_url={service.featured_image_url}
            gallery_images={service.gallery_images}
            alt={service.title}
            emptyLabel="No service media"
          />
        </div>
      ) : (
        <div
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            background: "color-mix(in srgb, var(--lsw-warning) 12%, var(--lsw-white))",
            color: "var(--lsw-warning)",
          }}
        >
          <Icon className="h-5 w-5" />
        </div>
      )}

      {(service.recommended || service.tag) && (
        <div
          className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
          style={{
            borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
            background: "color-mix(in srgb, var(--lsw-warning) 12%, var(--lsw-white))",
            color: "var(--lsw-warning)",
          }}
        >
          {service.recommended ? "Recommended" : service.tag}
        </div>
      )}

      <h3 className="mt-4 text-xl font-semibold" style={{ color: "var(--lsw-text)" }}>
        {service.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6" style={{ color: "var(--lsw-text-muted)" }}>
        {service.short_description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBook();
          }}
          className="lsw-btn-primary flex-1"
        >
          <CalendarDays className="h-4 w-4" /> Book
        </button>

        {phoneHref ? (
          <a href={phoneHref} onClick={(e) => e.stopPropagation()} className="lsw-btn-secondary flex-1 px-4 py-2.5">
            <Phone className="h-4 w-4" style={{ color: "var(--lsw-warning)" }} /> Call
          </a>
        ) : (
          <button
            type="button"
            disabled
            title="Phone number not configured in profile"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold opacity-60"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
              background: "var(--lsw-white)",
              color: "var(--lsw-text-muted)",
            }}
          >
            <Phone className="h-4 w-4" /> Call
          </button>
        )}
      </div>
    </motion.article>
  );
}

export default function Services({ previewLimit = HOME_PREVIEW_LIMIT, showViewAll = true } = {}) {
  const { data, isLoading } = usePortfolio();
  const profile = data?.profile;
  const phoneHref = profile?.phone ? `tel:${String(profile.phone).replace(/\D/g, "")}` : null;
  const [bookService, setBookService] = useState(null);
  const navigate = useNavigate();

  const services = useMemo(
    () => (data.services || []).map(normalizeService).filter(Boolean),
    [data.services]
  );

  const visibleServices = previewLimit ? services.slice(0, previewLimit) : services;
  const hasMore = showViewAll && previewLimit && services.length > previewLimit;

  return (
    <section id="services" className="px-4 py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="editorial-label">Services</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: "var(--lsw-text)" }}>
              What I can build for you
            </h2>
          </div>
          {previewLimit ? (
            <div
              className="rounded-2xl border px-4 py-2 text-sm font-semibold"
              style={{
                borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                background: "var(--lsw-surface)",
                color: "var(--lsw-warning)",
              }}
            >
              {services.length} available
            </div>
          ) : null}
        </div>

        {isLoading && (
          <CardGridSkeleton
            count={previewLimit ? Math.min(previewLimit, 4) : 4}
            columns="md:grid-cols-2 xl:grid-cols-4"
          />
        )}

        {!isLoading && !services.length && (
          <div
            className="rounded-3xl border border-dashed p-10 text-center"
            style={{
              borderColor: "color-mix(in srgb, var(--lsw-border) 20%, transparent)",
              color: "var(--lsw-text-muted)",
            }}
          >
            Services will appear here once published from the admin CMS.
          </div>
        )}

        {!isLoading && visibleServices.length > 0 && (
          <>
            <motion.div
              variants={animationVariants.container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              {visibleServices.map((service) => (
                <ServiceCard
                  key={service.id || service.slug}
                  service={service}
                  phoneHref={phoneHref}
                  onBook={() => setBookService(service)}
                  onOpen={() => navigate(`/services/${service.slug}`)}
                />
              ))}
            </motion.div>

            {hasMore ? (
              <div className="mt-6 flex justify-center">
                <Link to="/services" className="lsw-btn-primary px-6 py-3">
                  View all services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </>
        )}
      </div>

      <ServiceBookModal
        service={
          bookService
            ? {
                ...bookService,
                icon: getServiceIcon(bookService.icon),
                fullDescription: bookService.description,
              }
            : null
        }
        onClose={() => setBookService(null)}
      />
    </section>
  );
}
