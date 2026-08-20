/**
 * Compress and resize an image in the browser before upload.
 * Returns a File (JPEG) ready for multipart upload.
 */
export async function compressImageFile(file, options = {}) {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.82,
    mimeType = "image/jpeg",
  } = options;

  if (!file || !file.type?.startsWith("image/")) {
    throw new Error("Please choose a valid image file.");
  }

  const bitmap = await loadImageBitmap(file);
  try {
    const { width, height } = fitWithin(bitmap.width, bitmap.height, maxWidth, maxHeight);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Could not compress image.");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await canvasToBlob(canvas, mimeType, quality);
    if (!blob) throw new Error("Could not compress image.");

    const baseName = (file.name || "avatar").replace(/\.[^.]+$/, "") || "avatar";
    const extension = mimeType === "image/webp" ? "webp" : "jpg";
    return new File([blob], `${baseName}.${extension}`, {
      type: mimeType,
      lastModified: Date.now(),
    });
  } finally {
    if (typeof bitmap.close === "function") bitmap.close();
  }
}

function fitWithin(width, height, maxWidth, maxHeight) {
  const scale = Math.min(1, maxWidth / width, maxHeight / height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

async function loadImageBitmap(file) {
  if (typeof createImageBitmap === "function") {
    return createImageBitmap(file);
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Could not read image."));
      img.src = objectUrl;
    });
    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function canvasToBlob(canvas, mimeType, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}
