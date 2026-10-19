/**
 * SEO + GEO helpers for web search and LLM/AI answer engines.
 * Targets: AI engineer jobs, GenAI/RAG projects, software roles.
 */

const DEFAULT_SITE_URL = "https://gaurav26lnct.netlify.app";

export const SITE_NAME = "Gaurav Singh | Software Engineer & GenAI Engineer";

export const DEFAULT_DESCRIPTION =
  "Gaurav Singh is a Software Engineer specializing in Generative AI, Agentic AI, RAG systems, Python, FastAPI, and scalable backend engineering.";

export const DEFAULT_KEYWORDS = [
  "Gaurav Singh",
  "AI Engineer",
  "Generative AI Engineer",
  "Software Engineer",
  "Agentic AI",
  "RAG",
  "LangChain",
  "LangGraph",
  "Python Developer",
  "FastAPI Developer",
  "Backend Engineer",
].join(", ");

export function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (fromEnv && String(fromEnv).trim()) {
    return String(fromEnv).replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return DEFAULT_SITE_URL;
}

export function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export function upsertJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function buildPersonSchema(profile, siteUrl) {
  const name = profile?.name || "Gaurav Singh";
  const title = profile?.title || "Software Engineer";
  const sameAs = [profile?.github_url, profile?.linkedin_url].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name,
    url: siteUrl,
    image: profile?.profile_image_url || `${siteUrl}/assets/images/profile.png`,
    jobTitle: title,
    description: profile?.bio || DEFAULT_DESCRIPTION,
    email: profile?.email || undefined,
    telephone: profile?.phone || undefined,
    address: profile?.location
      ? {
          "@type": "PostalAddress",
          addressLocality: profile.location,
          addressCountry: "IN",
        }
      : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Lakshmi Narain College of Technology, Bhopal",
    },
    knowsAbout: [
      "Generative AI",
      "Agentic AI",
      "Retrieval-Augmented Generation",
      "Large Language Models",
      "LangChain",
      "LangGraph",
      "Model Context Protocol",
      "Python",
      "FastAPI",
      "Node.js",
      "Backend Engineering",
      "System Design",
      "PostgreSQL",
      "Redis",
    ],
    knowsLanguage: ["English", "Hindi"],
  };
}

export function buildWebsiteSchema(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE_NAME,
    url: siteUrl,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#person` },
  };
}

export function applySeo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  type = "website",
  noindex = false,
} = {}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const fullTitle = title?.includes("Gaurav") ? title : title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const ogImage = image || `${siteUrl}/assets/images/profile.png`;

  document.title = fullTitle;
  setCanonical(url);
  setMetaTag("name", "description", description);
  setMetaTag("name", "keywords", DEFAULT_KEYWORDS);
  setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");
  setMetaTag("name", "author", "Gaurav Singh");
  setMetaTag("name", "googlebot", noindex ? "noindex" : "index, follow");
  setMetaTag("property", "og:type", type);
  setMetaTag("property", "og:site_name", SITE_NAME);
  setMetaTag("property", "og:title", fullTitle);
  setMetaTag("property", "og:description", description);
  setMetaTag("property", "og:url", url);
  setMetaTag("property", "og:image", ogImage);
  setMetaTag("property", "og:locale", "en_IN");
  setMetaTag("name", "twitter:card", "summary_large_image");
  setMetaTag("name", "twitter:title", fullTitle);
  setMetaTag("name", "twitter:description", description);
  setMetaTag("name", "twitter:image", ogImage);
}
