import { useState } from "react";
import { collectCardImages } from "../utils/cardImages";

export default function ImageGallery({ featured_image_url, gallery_images, alt = "Gallery image", className = "" }) {
  const images = collectCardImages({ featured_image_url, gallery_images });
  const [active, setActive] = useState(0);

  if (!images.length) {
    return (
      <div
        className={`flex min-h-[260px] items-center justify-center rounded-3xl border text-sm ${className}`}
        style={{
          borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
          background: "var(--lsw-surface)",
          color: "var(--lsw-text-muted)",
        }}
      >
        No media yet
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className={className}>
      <div
        className="overflow-hidden rounded-3xl border"
        style={{ borderColor: "color-mix(in srgb, var(--lsw-border) 18%, transparent)", background: "var(--lsw-white)" }}
      >
        <img src={current} alt={alt} className="h-[340px] w-full object-cover" loading="lazy" />
      </div>

      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className="h-16 w-20 shrink-0 overflow-hidden rounded-xl border transition"
              style={{
                borderColor:
                  index === active
                    ? "var(--lsw-warning)"
                    : "color-mix(in srgb, var(--lsw-border) 18%, transparent)",
                boxShadow: index === active ? "0 0 0 2px color-mix(in srgb, var(--lsw-warning) 35%, transparent)" : "none",
              }}
              aria-label={`Show image ${index + 1}`}
            >
              <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
