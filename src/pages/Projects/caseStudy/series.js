/**
 * The case-study series, in reading order.
 *
 * Every case study already announces a number — in its hero kicker, its header
 * label, its footer label and its route-transition skin. What was missing was
 * anything that made "the next one" mean *a position in that sequence*. Each
 * page hand-wrote its own sibling link instead, and those were authored when
 * the series was a pair, then never revisited as it grew to five: N°02 pointed
 * backwards at N°01, N°03 and N°05 both pointed at N°01, and N°04 pointed back
 * at N°03. Only N°01 was still telling the truth.
 *
 * So the order lives here, once, and prev/next are positions in it. A case
 * study can no longer contradict the sequence because it no longer says
 * anything about it — adding a sixth is one entry in this array.
 *
 * Looked up by `theme.key`, which every case study already hands the template,
 * so a page still declares nothing beyond its own content and its own
 * colourway.
 */

import {
  ASPENTECH_THEME,
  ICTD_THEME,
  LEDGER_THEME,
  LMS_THEME,
  PASABAY_THEME,
} from "./themes";

/**
 * `name` is the case study's own wordmark rather than the grid card's title —
 * the grid says "Ledger App", the page's <h1> says "Ledger", and a link should
 * promise the heading the reader actually lands on. It is the same string the
 * transition skin flies onto that heading.
 *
 * `tagline` is the page's own, so a link can preview the case study in its
 * words rather than in a summary written twice.
 */
export const CASE_SERIES = [
  {
    key: "ledger",
    path: "/projects/ledger",
    name: "Ledger",
    tagline: "Every peso, accounted for.",
    theme: LEDGER_THEME,
  },
  {
    key: "pasabay",
    path: "/projects/pasabay",
    name: "PasaBay",
    tagline: "Home-cooked Filipino food, sent your way.",
    theme: PASABAY_THEME,
  },
  {
    key: "aspentech",
    path: "/projects/aspentech",
    name: "Aspentech",
    tagline: "See it before you build it.",
    theme: ASPENTECH_THEME,
  },
  {
    key: "ictd",
    path: "/projects/ictd",
    name: "ICTD App",
    tagline: "Asset & custody management.",
    theme: ICTD_THEME,
  },
  {
    key: "lms",
    path: "/projects/lms",
    name: "LMS",
    tagline: "Learn to code, one line at a time.",
    theme: LMS_THEME,
  },
];

const TOTAL = CASE_SERIES.length;

/** `N°03` — a case study's number is its position in the array, nothing else. */
export const caseNumber = (index) => `N°${String(index + 1).padStart(2, "0")}`;

/** The entry at a position, wrapping at both ends, with its number attached. */
const entryAt = (index) => {
  const i = ((index % TOTAL) + TOTAL) % TOTAL;
  return { ...CASE_SERIES[i], index: i, number: caseNumber(i) };
};

/**
 * A link to one of the neighbours.
 *
 * The wording is resolved here rather than at each call site so the header, the
 * footer and the curtain caption cannot drift apart the way the links
 * themselves did. `wraps` is what keeps it honest at the ends: the case study
 * after the last one is the first one, and calling that "Next" would promise a
 * sixth that does not exist.
 */
const link = (entry, wraps, [word, wrapWord]) => {
  const verb = wraps ? wrapWord : word;
  return { ...entry, wraps, word: verb, label: `${verb} — ${entry.name}` };
};

/**
 * Where a case study sits in the series, and what lies either side of it.
 *
 * Both ends wrap rather than dead-ending. A reader who finishes the last case
 * study is offered the first one instead of a disabled control, and the series
 * stays walkable in either direction from anywhere in it.
 *
 * Returns `null` for a key that is not in the series, so a page built on the
 * template but deliberately outside the numbered run renders without the
 * sequence navigation rather than crashing on it.
 */
export function seriesFor(key) {
  const index = CASE_SERIES.findIndex((entry) => entry.key === key);
  if (index < 0) return null;

  return {
    ...entryAt(index),
    total: TOTAL,
    next: link(entryAt(index + 1), index === TOTAL - 1, ["Next", "First"]),
    prev: link(entryAt(index - 1), index === 0, ["Prev", "Last"]),
  };
}
