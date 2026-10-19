import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePortfolio } from "../hooks/usePortfolio";
import {
  applySeo,
  buildPersonSchema,
  buildWebsiteSchema,
  getSiteUrl,
  upsertJsonLd,
  DEFAULT_DESCRIPTION,
} from "../lib/seo";

/**
 * Applies page meta + JSON-LD for Google/Bing and LLM answer engines.
 * Place once near the root of each page.
 */
export default function SeoHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image,
  type = "website",
  noindex = false,
} = {}) {
  const location = useLocation();
  const { data } = usePortfolio();
  const profile = data?.profile;

  useEffect(() => {
    const siteUrl = getSiteUrl();

    applySeo({
      title,
      description,
      path: path || location.pathname || "/",
      image: image || profile?.profile_image_url,
      type,
      noindex,
    });

    if (noindex) return;

    upsertJsonLd("seo-jsonld-person", buildPersonSchema(profile, siteUrl));
    upsertJsonLd("seo-jsonld-website", buildWebsiteSchema(siteUrl));
  }, [title, description, path, image, type, noindex, location.pathname, profile]);

  return null;
}
