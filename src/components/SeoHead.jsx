import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePortfolio } from "../hooks/usePortfolio";
import {
  applySeo,
  buildFaqSchema,
  buildPersonSchema,
  buildProfessionalServiceSchema,
  buildWebsiteSchema,
  getSiteUrl,
  upsertJsonLd,
  DEFAULT_DESCRIPTION,
} from "../lib/seo";

/**
 * Applies page meta + JSON-LD for Google/Bing and LLM answer engines.
 * Place once near the root of public routes (not admin).
 */
export default function SeoHead({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
  includeHomeSchemas = false,
} = {}) {
  const location = useLocation();
  const { data } = usePortfolio();
  const profile = data?.profile;
  const services = data?.services || [];
  const faqs = data?.faqs || [];

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const resolvedPath = path || location.pathname || "/";
    const resolvedTitle =
      title ||
      (profile?.title
        ? `${profile.name || "Gaurav Singh"} — ${profile.title} | Hire for AI & Software Roles`
        : undefined);
    const resolvedDescription =
      description ||
      (profile?.bio
        ? `${profile.bio.slice(0, 155)}${profile.bio.length > 155 ? "…" : ""}`
        : DEFAULT_DESCRIPTION);

    applySeo({
      title: resolvedTitle,
      description: resolvedDescription,
      path: resolvedPath,
      image: image || profile?.profile_image_url,
      type,
      noindex,
    });

    if (noindex) return;

    upsertJsonLd("seo-jsonld-person", buildPersonSchema(profile, siteUrl));
    upsertJsonLd("seo-jsonld-website", buildWebsiteSchema(siteUrl));

    if (includeHomeSchemas || resolvedPath === "/") {
      upsertJsonLd(
        "seo-jsonld-services",
        buildProfessionalServiceSchema(profile, services, siteUrl)
      );
      upsertJsonLd("seo-jsonld-faq", buildFaqSchema(siteUrl, faqs));
    }
  }, [
    title,
    description,
    path,
    image,
    type,
    noindex,
    includeHomeSchemas,
    location.pathname,
    profile,
    services,
    faqs,
  ]);

  return null;
}
