/**
 * Per-route dressing for the route transitions.
 *
 * The flight overlay and the curtain are one mechanism, but a case study that
 * has its own palette should not be handed off through the portfolio's orange.
 * A skin is looked up by path: entering uses the destination's skin, leaving
 * uses the skin of the page being left, so the curtain always belongs to the
 * page it is closing over.
 *
 * Registering skins here (rather than on the project records in Home.js) keeps
 * the values next to the page that owns them — each case study's come straight
 * from its own theme, so the transition can never drift from the page.
 */

import { font } from "../components/design/tokens";
import {
  ASPENTECH_THEME,
  ICTD_THEME,
  LEDGER_THEME,
  LMS_THEME,
  PASABAY_THEME,
} from "../pages/Projects/caseStudy/themes";
import { ink } from "../pages/Projects/caseStudy/tokens";

const POPPINS = "Poppins, sans-serif";

/**
 * `surface` is the colour the flight plate settles to before it dissolves. It
 * has to match the destination page's background — that colour match is what
 * makes the page look like it emerges from the title card instead of
 * cross-fading with it.
 */
export const DEFAULT_SKIN = {
  surface: "#FAFAFA",
  /** Tail of the title-card rule; the head is always the project's own tint. */
  ruleTail: "#FF3D6E",
  /** Overrides the card's title on the flight plate when the page uses a shorter name. */
  title: null,
  titleFont: POPPINS,
  titleInk: "#FFFFFF",
  titleTracking: "-0.01em",
  /**
   * Must equal the `line-height` of the heading the wordmark flies onto. The
   * morph derives its scale from the two boxes' heights, so a mismatch here
   * shows up as the wordmark landing at the wrong size.
   */
  titleLeading: 1.05,
  kicker: "Case Study",
  kickerFont: POPPINS,
  kickerInk: "rgba(255,255,255,0.72)",
  curtain: "linear-gradient(160deg, #FD6F00 0%, #FF3D6E 62%, #E2452F 100%)",
  curtainInk: "rgba(255,255,255,0.9)",
  curtainDots: "rgba(255,255,255,0.9)",
  curtainRule: "rgba(255,255,255,0.55)",
};

/**
 * Shared shape of a case-study skin.
 *
 * Both case studies are near-black pages reached from a near-black grid, so a
 * dark curtain between them would wipe across invisibly and the route would
 * appear to jump. Filling the curtain with the accent instead is what makes the
 * move legible, and it matches each page's own accent-filled footer button.
 */
const caseSkin = ({ theme, title, kicker, curtain }) => ({
  ...DEFAULT_SKIN,
  // The case study's own backdrop, bloom and all, so the plate and the page
  // are pixel-identical at the moment the plate starts to lift.
  surface: theme.backdrop,
  ruleTail: theme.accentSoft,
  title,
  titleFont: font.sans,
  titleInk: ink.headline,
  titleTracking: "-0.045em",
  // Matches the case study's <h1>, which the wordmark lands on.
  titleLeading: 0.92,
  kicker,
  kickerFont: font.mono,
  kickerInk: theme.accentSoft,
  curtain,
  curtainInk: "rgba(11,12,14,.86)",
  curtainDots: "rgba(11,12,14,.7)",
  curtainRule: "rgba(11,12,14,.55)",
});

const SKINS = {
  "/projects/ledger": caseSkin({
    theme: LEDGER_THEME,
    // The grid card reads "Ledger App"; the case study's own wordmark is just
    // "Ledger", and the plate should hand off to the heading it becomes.
    title: "Ledger",
    kicker: "Case study N°01",
    curtain: "linear-gradient(160deg, #35D6AE 0%, #12B48F 55%, #0E8F73 100%)",
  }),
  "/projects/pasabay": caseSkin({
    theme: PASABAY_THEME,
    title: "PasaBay",
    kicker: "Case study N°02",
    curtain: "linear-gradient(160deg, #F5C450 0%, #E8A81C 55%, #B58316 100%)",
  }),
  "/projects/aspentech": caseSkin({
    theme: ASPENTECH_THEME,
    title: "Aspentech",
    kicker: "Case study N°03",
    curtain: "linear-gradient(160deg, #6C93FF 0%, #2F6BFF 55%, #1B4ACB 100%)",
  }),
  "/projects/ictd": caseSkin({
    theme: ICTD_THEME,
    title: "ICTD App",
    kicker: "Case study N°04",
    curtain: "linear-gradient(160deg, #2ECB90 0%, #12A06A 55%, #0B7B50 100%)",
  }),
  "/projects/lms": caseSkin({
    theme: LMS_THEME,
    title: "LMS",
    kicker: "Case study N°05",
    curtain: "linear-gradient(160deg, #A48EFF 0%, #7C5CFF 55%, #5232C7 100%)",
  }),
};

/** Falls back to the portfolio orange for every page that has not claimed a skin. */
export const skinFor = (pathname) => SKINS[pathname] ?? DEFAULT_SKIN;
