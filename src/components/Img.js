import { forwardRef } from "react";
import { Box } from "@mui/material";
import manifest from "../generated/imageManifest.json";

/**
 * Every image on the site, in whatever format and size the browser asked for.
 *
 * `public/` holds full-resolution masters — a 2.4 MB PNG is normal in there —
 * and `scripts/optimize-images.mjs` re-encodes each one into AVIF and WebP
 * across a ladder of widths before every build. This is the other half of that
 * arrangement: it looks the source up in the generated manifest and hands the
 * browser a `<picture>` with both formats and the whole width ladder, so a
 * phone downloads a 400px AVIF where a retina desktop downloads a 2000px one.
 *
 * The original `src` stays on the `<img>` as the last fallback, so a source
 * that was never optimised (a hand-written SVG, a remote URL) still renders —
 * it simply renders unchanged.
 */

const BASE = process.env.PUBLIC_URL ?? "";

/** The manifest key for a src, which may or may not carry the public path. */
function keyFor(src) {
  if (typeof src !== "string" || /^(https?:|data:|blob:)/.test(src)) return null;
  const withoutBase = BASE && src.startsWith(BASE) ? src.slice(BASE.length) : src;
  return withoutBase.replace(/^\/+/, "");
}

/** What the optimiser knows about a source: `{ w, h, widths, color }`. */
export function imageMeta(src) {
  const key = keyFor(src);
  return (key && manifest[key]) || null;
}

const srcSet = (stem, widths, ext) =>
  widths.map((w) => `${BASE}/images-opt/${stem}-${w}.${ext} ${w}w`).join(", ");

/**
 * Wraps an image element in its AVIF/WebP sources.
 *
 * For the images that carry their own animation or ref plumbing — a
 * `motion.img`, a cover that fades itself in — where `<Img>` below can't own
 * the element.
 *
 * `sizes` is how wide the image will actually be drawn; without it the browser
 * assumes the full viewport and over-fetches every time. The wrapper is
 * `display: contents` so it adds no box of its own and the layout around the
 * image is untouched.
 */
export function Picture({ src, sizes = "100vw", children }) {
  const meta = imageMeta(src);
  if (!meta) return children;

  const stem = keyFor(src).replace(/\.[^.]+$/, "");
  return (
    <Box component="picture" sx={{ display: "contents" }}>
      <source type="image/avif" srcSet={srcSet(stem, meta.widths, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(stem, meta.widths, "webp")} sizes={sizes} />
      {children}
    </Box>
  );
}

/**
 * A responsive `<img>`.
 *
 * `priority` marks the one image that is on screen at first paint — it opts out
 * of lazy loading and asks the browser to fetch it ahead of the rest. Everything
 * else stays lazy, which is what keeps a case study's twenty screenshots off the
 * critical path.
 *
 * `placeholder` paints the source's own dominant colour underneath while the
 * bytes are in flight. Only for opaque art: anything with transparency would
 * keep the tint for good.
 */
const Img = forwardRef(function Img(
  { src, alt, sizes = "100vw", sx, priority = false, loading, placeholder = false, ...rest },
  ref
) {
  const meta = imageMeta(src);

  return (
    <Picture src={src} sizes={sizes}>
      <Box
        component="img"
        ref={ref}
        src={src}
        alt={alt}
        // The intrinsic size reserves the right box before the image lands, so
        // nothing below it moves as the page fills in.
        width={meta?.w}
        height={meta?.h}
        loading={loading ?? (priority ? "eager" : "lazy")}
        decoding={priority ? "auto" : "async"}
        fetchPriority={priority ? "high" : undefined}
        sx={{
          ...(placeholder && meta ? { backgroundColor: meta.color } : null),
          ...sx,
        }}
        {...rest}
      />
    </Picture>
  );
});

export default Img;
