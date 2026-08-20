import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { collectCardImages } from "../utils/cardImages";

const INTERVAL_MS = 4000;

export default function CardImageCarousel({
  featured_image_url,
  gallery_images,
  alt = "",
  className = "",
  imageClassName = "h-full w-full object-cover",
  emptyLabel = "No media",
  showCounter = true,
}) {
  const images = collectCardImages({ featured_image_url, gallery_images });
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering || images.length <= 1) {
      if (!hovering) setIndex(0);
      return undefined;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [hovering, images.length]);

  if (!images.length) {
    return (
      <div
        className={`flex h-full min-h-[120px] items-center justify-center text-sm ${className}`}
        style={{ color: "var(--lsw-text-muted)" }}
      >
        {emptyLabel}
      </div>
    );
  }

  const current = images[index];

  return (
    <div
      className={`relative h-full w-full ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={current}
          alt={alt}
          className={imageClassName}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: hovering ? 1.03 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {showCounter && images.length > 1 && hovering ? (
        <div
          className="absolute bottom-3 right-3 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide"
          style={{ background: "rgba(15, 23, 42, 0.72)", color: "var(--lsw-white)" }}
        >
          {index + 1}/{images.length}
        </div>
      ) : null}
    </div>
  );
}
