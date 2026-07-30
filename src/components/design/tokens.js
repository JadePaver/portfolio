/**
 * Tokens for the dark portfolio landing page.
 *
 * Scoped deliberately: the MUI theme still drives the light project case-study
 * pages (`primary.main` #FD6F00), so the landing page carries its own palette
 * rather than repainting the whole app.
 */

export const font = {
  sans: "'Archivo', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
  serif: "'Instrument Serif', Georgia, serif",
};

export const color = {
  // Dark surfaces
  bg: "#0B0C0E",
  bgAlt: "#0E1013",
  card: "#101216",
  cardWarm: "#121418",
  cardWarmHover: "#151820",
  chipBg: "rgba(255,255,255,.05)",

  // Dark-surface text
  headline: "#F6F3EF",
  title: "#F3EFEA",
  text: "#EDE9E4",
  body: "#A6A8AB",
  muted: "#8F9195",
  dim: "#83858A",
  faint: "#6F7175",
  ghost: "#5E6064",

  // Hairlines
  line: "rgba(255,255,255,.09)",
  lineSoft: "rgba(255,255,255,.08)",
  lineStrong: "rgba(255,255,255,.18)",

  // Accent
  accent: "var(--accent)",
  accentRaw: "#FF6A1A",
  accentSoft: "var(--accent-2)",

  // The Work section flips to paper
  paper: "#F4EFE8",
  paperCard: "#FFFFFF",
  paperWell: "#EDE7DF",
  paperInk: "#14161A",
  paperBody: "#5F5A54",
  paperMuted: "#A39C92",
  paperFaint: "#918B82",
  paperLine: "rgba(0,0,0,.09)",
};

/** The design's single easing curve, in both CSS and framer-motion form. */
export const EASE = [0.2, 0.8, 0.2, 1];
export const EASE_CSS = "cubic-bezier(.2,.8,.2,1)";

/** Page gutter shared by every section, so the columns line up down the page. */
export const shell = {
  maxWidth: 1240,
  mx: "auto",
  px: "22px",
  width: "100%",
};

/**
 * Accepts #RGB / #RRGGBB and returns "r, g, b" for use inside rgba().
 *
 * The design tints its work cards with 8-digit hex (`tint + '59'`). Going
 * through rgba() instead keeps 3-digit shorthands and malformed values safe.
 */
export function rgbChannels(hex, fallback = "253, 111, 0") {
  if (typeof hex !== "string") return fallback;
  const raw = hex.replace("#", "").trim();
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  if (full.length !== 6 || /[^0-9a-f]/i.test(full)) return fallback;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/** Uppercase mono label used for eyebrows, meta rows and captions. */
export const label = (size = 11, letterSpacing = ".18em") => ({
  fontFamily: font.mono,
  fontSize: `${size}px`,
  letterSpacing,
  textTransform: "uppercase",
  lineHeight: 1.4,
});
