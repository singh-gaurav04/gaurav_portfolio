import { Bot, BrainCircuit, Layers3, Puzzle, ServerCog, Sparkles } from "lucide-react";

export const SERVICE_ICON_MAP = {
  BrainCircuit,
  Layers3,
  Bot,
  ServerCog,
  Sparkles,
  Puzzle,
};

export function getServiceIcon(name) {
  return SERVICE_ICON_MAP[name] || Sparkles;
}

export function normalizeService(service) {
  if (!service) return null;
  return {
    ...service,
    features: service.features || service.highlights || [],
    duration: service.duration || [],
    how_it_works: service.how_it_works || service.howItWorks || [],
    deliverables: service.deliverables || [],
    short_description: service.short_description || service.description || "",
    description: service.description || service.fullDescription || "",
    recommended: !!service.recommended,
    tag: service.tag || null,
    featured_image_url: service.featured_image_url || null,
    gallery_images: Array.isArray(service.gallery_images) ? service.gallery_images : [],
  };
}
