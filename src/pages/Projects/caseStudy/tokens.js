/**
 * Shared case-study palette and type scale.
 *
 * A case study alternates between the app's dark shell and paper-coloured
 * chapters, so the two surfaces are kept as separate maps rather than one flat
 * list — a card only ever needs to know which surface it is sitting on.
 *
 * Fonts, easing and the page gutter come from the landing page's tokens so the
 * whole site stays in step. The accent does not: it is per case study, and
 * arrives as a custom property published by the page (see `themes.js`).
 */

import { color as base, font, EASE, EASE_CSS, shell } from "../../../components/design/tokens";

export { font, EASE, EASE_CSS, shell };

/** The accent of whichever case study is being rendered. */
export const ACCENT = "var(--case-accent)";

/** The accent lifted towards white, for taglines and serif emphasis. */
export const ACCENT_SOFT = "var(--case-accent-soft)";

/**
 * The accent as it should appear on a given surface.
 *
 * Gold reads well on near-black and goes soft on cream, so PasaBay darkens it
 * for the paper chapters. Ledger sets both variables to the same green, which
 * makes this a no-op there.
 */
export const accentFor = (tone) =>
  tone === "paper" ? "var(--case-accent-paper)" : ACCENT;

/** Dark chapters. */
export const ink = {
  bg: base.bg,
  card: base.bgAlt,
  headline: base.headline,
  title: base.title,
  text: base.text,
  lead: "#B9B6B1",
  body: "#C6C3BE",
  muted: base.muted,
  dim: base.dim,
  faint: base.faint,
  hint: "#9A9C9F",
  ghost: "#63656B",
  fine: "#5C5E63",
  line: "rgba(255,255,255,.11)",
  lineSoft: base.lineSoft,
  lineStrong: base.lineStrong,
};

/**
 * Paper chapters.
 *
 * No `bg` here on purpose — the cream itself is per case study and comes from
 * the theme, while everything sitting on top of it is shared.
 */
export const paper = {
  card: base.paperCard,
  ink: base.paperInk,
  body: base.paperBody,
  muted: "#8B857C",
  line: "rgba(0,0,0,.12)",
  lineSoft: "rgba(0,0,0,.1)",
  rule: "rgba(0,0,0,.2)",
  /** Bezel behind a phone screenshot. */
  frame: "linear-gradient(180deg,#FBF8F3,#F1EBE2)",
  /** Title bar above a browser screenshot. */
  chrome: "#F7F4EF",
};

/** Vertical rhythm every chapter shares. */
export const sectionPad = "clamp(64px, 8vw, 108px)";

/** Chapter h2. */
export const chapterTitle = (tone) => ({
  m: 0,
  maxWidth: "15ch",
  fontFamily: font.sans,
  fontSize: "clamp(28px, 3.6vw, 46px)",
  lineHeight: 1.04,
  letterSpacing: "-.038em",
  fontWeight: 800,
  color: tone === "paper" ? paper.ink : ink.headline,
});

/** Paragraph that sits opposite a chapter title. */
export const chapterLead = (tone) => ({
  m: 0,
  maxWidth: "46ch",
  fontFamily: font.sans,
  fontSize: "15px",
  lineHeight: 1.7,
  color: tone === "paper" ? paper.body : ink.muted,
  textWrap: "pretty",
});

/**
 * Hairline grid used by the meta strip and every card row: a 1px gap over a
 * tinted background, so the dividers are the backdrop showing through.
 */
export const hairlineGrid = (tone, min = "230px") => {
  const line = tone === "paper" ? paper.line : "rgba(255,255,255,.1)";
  return {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}, 100%), 1fr))`,
    gap: "1px",
    bgcolor: line,
    border: `1px solid ${line}`,
  };
};

/** Mono label shared by the meta strip, stat captions and footer rules. */
export const metaLabel = {
  fontFamily: font.mono,
  fontSize: "9px",
  letterSpacing: ".2em",
  textTransform: "uppercase",
  color: ink.faint,
};
