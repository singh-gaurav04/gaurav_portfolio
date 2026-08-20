export function collectCardImages({ featured_image_url, gallery_images } = {}) {
  const urls = [];
  const seen = new Set();

  const push = (url) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    urls.push(url);
  };

  push(featured_image_url);
  (gallery_images || []).forEach((item) => push(typeof item === "string" ? item : item?.url));

  return urls;
}
