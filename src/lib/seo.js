/**
 * SEO + GEO helpers for web search and LLM/AI answer engines.
 * Targets: AI engineer jobs, GenAI/RAG services, software roles.
 */

const DEFAULT_SITE_URL = "https://gauravsingh.dev";

export const SITE_NAME = "Gaurav Singh — AI Engineer";

export const DEFAULT_DESCRIPTION =
  "AI Engineer specializing in GenAI, RAG pipelines, LangChain/LangGraph agents, FastAPI backends, and production AI products. Available for AI engineer jobs, software engineer roles, and freelance AI development services.";

export const DEFAULT_KEYWORDS = [
  "AI Engineer",
  "GenAI Engineer",
  "Machine Learning Engineer",
  "RAG developer",
  "LangChain developer",
  "LangGraph",
  "FastAPI developer",
  "AI chatbot developer",
  "LLM engineer",
  "software engineer India",
  "hire AI engineer",
  "AI development services",
  "OpenAI developer",
  "full stack AI engineer",
  "Bengaluru AI engineer",
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
  const title = profile?.title || "AI Engineer";
  const sameAs = [profile?.github_url, profile?.linkedin_url].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name,
    url: siteUrl,
    image: profile?.profile_image_url || `${siteUrl}/assets/images/profile.png`,
    jobTitle: title,
    description:
      profile?.bio ||
      "AI Engineer building GenAI products, RAG systems, agent workflows, and FastAPI backends. Open to AI engineer and software engineer roles.",
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
    knowsAbout: [
      "Artificial Intelligence",
      "Generative AI",
      "Large Language Models",
      "Retrieval Augmented Generation",
      "LangChain",
      "LangGraph",
      "FastAPI",
      "Python",
      "React",
      "Software Engineering",
      "RAG Pipelines",
      "AI Agents",
      "OpenAI",
      "Docker",
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildProfessionalServiceSchema(profile, services, siteUrl) {
  const offers = (services || []).slice(0, 12).map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.short_description || service.description || service.title,
      provider: { "@id": `${siteUrl}/#person` },
      serviceType: service.tag || "AI Development",
      url: service.slug ? `${siteUrl}/services/${service.slug}` : `${siteUrl}/#services`,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#services`,
    name: `${profile?.name || "Gaurav Singh"} — AI Development Services`,
    description:
      "Professional AI and software services: RAG systems, AI chatbots, LangChain agents, FastAPI backends, and full-stack AI product development.",
    url: `${siteUrl}/#services`,
    provider: { "@id": `${siteUrl}/#person` },
    areaServed: ["IN", "Worldwide"],
    serviceType: [
      "AI Engineering",
      "Generative AI Development",
      "RAG System Development",
      "AI Chatbot Development",
      "Backend API Development",
      "Software Engineering Consulting",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI & Software Services",
      itemListElement: offers.length
        ? offers
        : [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "RAG & GenAI Systems",
                description: "Production RAG pipelines with LangChain, vector databases, and LLM APIs.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Chatbots & Agents",
                description: "Custom AI assistants and LangGraph agent workflows for real business use cases.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "FastAPI Backend Development",
                description: "Scalable Python APIs, auth, and integrations for AI-powered products.",
              },
            },
          ],
    },
  };
}

export function buildFaqSchema(siteUrl, faqs = []) {
  const items = (faqs || [])
    .filter((item) => item?.question && item?.answer)
    .map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }));

  if (!items.length) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: items,
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
