/**
 * Per-case-study skins for the shared case-study template.
 *
 * The template and its components are one design in two colourways, so
 * everything that differs between Ledger and PasaBay is collected here rather
 * than being threaded through as props. The accent family reaches the
 * components as CSS custom properties (see `caseVars`), which is how the
 * source design files carry it too — the components can then keep reading a
 * module-level constant and stay unaware of which case study they are in.
 *
 * The raw hex values stay exported alongside the variables because two
 * consumers live outside the page subtree and cannot resolve a `var()`:
 * `transitions/skins.js`, which paints the flight plate before the page
 * mounts, and `PAGE_BACKDROP`, which that plate has to match exactly.
 */

import { color as base, rgbChannels } from "../../../components/design/tokens";
import { AspentechMark, ICTDMark, LedgerMark, LMSMark, PasabayMark } from "./marks";

/**
 * The page's backdrop, and the colour the route transition's plate settles to
 * before it lifts — sharing one value is what makes that hand-off land on an
 * exact match instead of a cross-fade.
 *
 * The bloom is offset in px rather than the designs' `-8%`: a percentage
 * resolves against the element, and on a case study this long `-8%` puts the
 * gradient's centre a full radius above the top edge, which cancels it out
 * almost entirely. In px it sits over the hero the way it was drawn.
 */
const backdrop = (accent) =>
  `radial-gradient(1100px 640px at 82% -80px, rgba(${rgbChannels(accent)}, .16), transparent 62%), ${base.bg}`;

/**
 * Ledger ships in its own green — the app's orange belongs to the portfolio.
 *
 * `accentPaper` matches `accent`: Ledger carries the same green onto its cream
 * chapters, and these values are what the committed page already renders.
 */
export const LEDGER_THEME = {
  key: "ledger",
  /** Folder under `public/images/` the case study's art is loaded from. */
  dir: "ledger",
  accent: "#12B48F",
  /** The design mixes the accent 55% into #EFFCF6 in oklab. Precomputed so the
   *  value is stable everywhere, including browsers without `color-mix`. */
  accentSoft: "#8ED5BC",
  accentPaper: "#12B48F",
  /** Accent knocked back into slate — the hero ticker. */
  accentTicker: "#3E9F83",
  paperBg: base.paper,
  mark: LedgerMark,
  backdrop: backdrop("#12B48F"),
};

/**
 * PasaBay's gold, on a slightly warmer cream than Ledger's.
 *
 * `accentPaper` is the one value that genuinely diverges from `accent`: the
 * gold is legible on near-black but goes soft on cream, so the design drops to
 * a darker gold for the eyebrows, card numbers and captions that sit on the
 * paper chapters.
 */
export const PASABAY_THEME = {
  key: "pasabay",
  dir: "pasabay",
  accent: "#E8A81C",
  /** color-mix(in oklab, #E8A81C 55%, #FFF8E9), precomputed. */
  accentSoft: "#F3CD8B",
  accentPaper: "#B07E0A",
  /** color-mix(in oklab, #E8A81C 72%, #6b6252), precomputed. */
  accentTicker: "#C4943C",
  paperBg: "#F6F1E6",
  mark: PasabayMark,
  backdrop: backdrop("#E8A81C"),
};

/**
 * Aspentech's blue, on the shared cream.
 *
 * The blue holds up on both surfaces, so `accentPaper` matches `accent` the way
 * Ledger's green does — the design paints the cream chapters' eyebrows, card
 * numbers and captions in the same `--at` it uses on near-black.
 */
export const ASPENTECH_THEME = {
  key: "aspentech",
  dir: "aspentech",
  accent: "#2F6BFF",
  /** color-mix(in oklab, #2F6BFF 55%, #EEF3FF), precomputed. */
  accentSoft: "#84ADFF",
  accentPaper: "#2F6BFF",
  /** color-mix(in oklab, #2F6BFF 68%, #6b7280), precomputed. */
  accentTicker: "#4471D7",
  paperBg: base.paper,
  mark: AspentechMark,
  backdrop: backdrop("#2F6BFF"),
};

/**
 * ICTD's institutional green, on the shared cream.
 *
 * The green holds its own on both surfaces, so `accentPaper` matches `accent`
 * the way Ledger's and Aspentech's do — the design paints the cream chapters'
 * eyebrows, card numbers and captions in the same `--ic` it uses on near-black.
 */
export const ICTD_THEME = {
  key: "ictd",
  dir: "ictd",
  accent: "#12A06A",
  /** color-mix(in oklab, #12A06A 55%, #EDFBF4), precomputed. */
  accentSoft: "#88C9A6",
  accentPaper: "#12A06A",
  /** color-mix(in oklab, #12A06A 72%, #5b6a64), precomputed. */
  accentTicker: "#3A9169",
  paperBg: base.paper,
  mark: ICTDMark,
  backdrop: backdrop("#12A06A"),
};

/**
 * LMS's violet, on the shared cream.
 *
 * The violet is dark enough to stay legible on cream, so `accentPaper` matches
 * `accent` the way the other three do — the design paints the cream chapters'
 * eyebrows, card numbers and captions in the same `--lm` it uses on near-black.
 */
export const LMS_THEME = {
  key: "lms",
  dir: "lms",
  accent: "#7C5CFF",
  /** color-mix(in oklab, #7C5CFF 55%, #F3EEFF), precomputed. */
  accentSoft: "#ACA3FF",
  accentPaper: "#7C5CFF",
  /** color-mix(in oklab, #7C5CFF 70%, #5f5b74), precomputed. */
  accentTicker: "#725FD4",
  paperBg: base.paper,
  mark: LMSMark,
  backdrop: backdrop("#7C5CFF"),
};

/**
 * The custom properties a case study publishes to its own subtree.
 *
 * Scoped to the page rather than set on `:root`, so that two case studies
 * briefly mounted together during a route transition cannot repaint each
 * other's accent as one of them unmounts.
 */
export const caseVars = (theme) => ({
  "--case-accent": theme.accent,
  "--case-accent-soft": theme.accentSoft,
  "--case-accent-paper": theme.accentPaper,
});
