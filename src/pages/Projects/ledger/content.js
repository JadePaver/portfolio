/**
 * Every string and asset the Ledger case study renders.
 *
 * Kept out of the components so the page reads as a running order of chapters
 * and the copy can be edited without going near layout code.
 *
 * ---------------------------------------------------------------------------
 * ASSETS: the fifteen PNGs below are expected in `public/images/ledger/`.
 * Until they are dropped in, every figure falls back to a labelled placeholder
 * of the right aspect ratio, so the layout holds either way.
 *
 *   hero.png            feat-wallets.png   feat-insights.png
 *   poster.png          feat-goals.png     feat-ai.png
 *   scr-signin.png      scr-wallets.png    scr-edit-wallet.png
 *   scr-insights.png    scr-summary.png    scr-breakdown.png
 *   scr-goals.png       scr-debts.png      scr-ai.png
 * ---------------------------------------------------------------------------
 */

const asset = (file) => `${process.env.PUBLIC_URL}/images/ledger/${file}`;

export const hero = {
  kicker: "CASE STUDY — 01",
  discipline: "Mobile app · Personal finance",
  year: "2025",
  title: "Ledger",
  tagline: "Every peso, accounted for.",
  lead:
    "A personal finance app for the way money actually moves — cash, bank, credit, and the money between people — with an assistant that answers in plain language. Designed and built solo, from first sketch to signed build, in ten weeks.",
  scrollHint: "Scroll for the full story",
  meta: [
    { term: "Role", value: "Solo designer & developer" },
    { term: "Timeline", value: "10 weeks, 2025" },
    { term: "Platform", value: "Android · Flutter" },
    { term: "Stack", value: "Flutter · Dart · Firebase · Hive" },
  ],
  figure: {
    src: asset("hero.png"),
    file: "hero.png",
    alt: "Ledger hero — three phones showing the wallets home screen",
    caption: "Ledger — presentation hero, 2025",
    ratio: "3626 / 2040",
    wide: true,
  },
};

export const tickerLine =
  "EVERY PESO, ACCOUNTED FOR  ✦  LEDGER  ✦  PERSONAL FINANCE, SIMPLIFIED  ✦  WALLETS · INSIGHTS · GOALS · AI  ✦";

export const brief = {
  id: "brief",
  num: "00",
  kicker: "The brief",
  title: "Why budgeting apps get deleted",
  lead:
    "The pattern is always the same: logging costs too much effort, and the charts never explain anything. Ledger was scoped against those two failures — nothing else made the cut.",
  panels: [
    {
      term: "The problem",
      body:
        "People abandoned budgeting apps because logging one expense took too many taps, and the charts never explained where the money went.",
    },
    {
      term: "The approach",
      body:
        "An offline-first Flutter app with a two-tap entry flow, a local cache that syncs to Firestore when the connection returns, and insights built from pre-aggregated queries instead of client-side loops.",
    },
    {
      term: "The outcome",
      body:
        "Entry flow cut from nine taps to two; cold start under 1.4 seconds on a mid-range Android device — fast enough to log before the receipt is folded.",
    },
  ],
  stats: [
    { value: "9", accent: "→", after: "2", spaced: true, label: "Taps per entry" },
    { value: "1.4", accent: "s", label: "Cold start, mid-range device" },
    { value: "6", label: "Wallets, one running balance" },
    { value: "4", label: "Surfaces — wallets · insights · goals · AI" },
  ],
};

export const chapters = [
  {
    id: "ch1",
    tone: "paper",
    num: "01",
    kicker: "Wallets",
    title: "One glance, one number",
    lead: {
      before: "The home screen answers the only question that matters first — ",
      em: "how much is there right now?",
      after: " — then lets each wallet tell its own story.",
    },
    figure: {
      src: asset("feat-wallets.png"),
      file: "feat-wallets.png",
      alt: "Every wallet, one running balance — wallets screen and edit wallet sheet",
      caption: "01 · Wallets — every wallet, one running balance",
      ratio: "16 / 9",
      wide: true,
    },
    cards: [
      {
        num: "1.1",
        title: "Live total, always on top",
        body: "₱142,161 across six wallets, with income and expenses split out on the same card.",
      },
      {
        num: "1.2",
        title: "Cards that show the trend",
        body: "Every wallet carries its own sparkline, transaction count, and money in / money out.",
      },
      {
        num: "1.3",
        title: "Make each one yours",
        body: "24 icons and 16 colors, previewed live on the card while you edit the wallet.",
      },
      {
        num: "1.4",
        title: "Log it in two taps",
        body: "A floating button opens a new transaction from anywhere in the app.",
      },
    ],
  },
  {
    id: "ch2",
    tone: "ink",
    num: "02",
    kicker: "Insights",
    title: "Numbers that explain themselves",
    lead:
      "Filter by day, week, month, year, or a custom range — every figure on the screen recalculates, including the month-over-month deltas.",
    figure: {
      src: asset("feat-insights.png"),
      file: "feat-insights.png",
      alt: "See exactly where the money goes — insights overview and financial summary",
      caption: "02 · Insights — see exactly where the money goes",
      ratio: "16 / 9",
      wide: true,
    },
    cards: [
      {
        num: "2.1",
        title: "Any range, recomputed",
        body: "All-time to custom; the whole screen re-aggregates in place, no loading spinner.",
      },
      {
        num: "2.2",
        title: "Deltas, not just totals",
        body: "Income −31%, spending +36% — every number is read against the period before it.",
      },
      {
        num: "2.3",
        title: "Nudges before problems",
        body: "Overdue debts and spending spikes surface as smart-insight cards at the top of the feed.",
      },
      {
        num: "2.4",
        title: "Savings rate, graded",
        body: "One honest percentage with a plain-language label — 61% reads “Excellent.”",
      },
    ],
  },
  {
    id: "ch3",
    tone: "paper",
    num: "03",
    kicker: "Goals & debts",
    title: "The two missing ledgers",
    lead:
      "Most budgeting apps stop at spending. Ledger also tracks the money you're putting aside — and the money moving between people.",
    figure: {
      src: asset("feat-goals.png"),
      file: "feat-goals.png",
      alt: "Save on purpose, settle what's owed — savings goals and debt tracker",
      caption: "03 · Goals & debts — save on purpose, settle what's owed",
      ratio: "16 / 9",
      wide: true,
    },
    cards: [
      {
        num: "3.1",
        title: "Progress you can feel",
        body: "A ring, a deadline, and a one-tap top-up on every savings goal.",
      },
      {
        num: "3.2",
        title: "Goals follow you home",
        body: "Active goals surface as progress pills at the top of the wallets screen.",
      },
      {
        num: "3.3",
        title: "Both directions, netted",
        body: "They-owe-me and I-owe sit side by side, resolved into one net line.",
      },
      {
        num: "3.4",
        title: "Real-world detail",
        body: "Interest rates, categories, overdue flags, and a settled state on every debt.",
      },
    ],
  },
  {
    id: "ch4",
    tone: "ink",
    num: "04",
    kicker: "AI assistant",
    title: "Answers, not dashboards",
    lead:
      "The assistant reads real wallets and transactions — the same aggregates that power Insights — then answers in a sentence. It explains; it never invents a number.",
    figure: {
      src: asset("feat-ai.png"),
      file: "feat-ai.png",
      alt: "Ask your money a question — AI assistant chat",
      caption: "04 · AI assistant — ask your money a question",
      ratio: "16 / 9",
      wide: true,
    },
    cards: [
      {
        num: "4.1",
        title: "“How much did I spend?”",
        body: "Plain-language questions over your actual data, with suggested prompts to start.",
      },
      {
        num: "4.2",
        title: "Grounded replies",
        body: "Every answer is computed first and phrased second — never the other way around.",
      },
      {
        num: "4.3",
        title: "Always a next step",
        body: "Replies end with an offer — “Want a category breakdown?” keeps the thread useful.",
      },
      {
        num: "4.4",
        title: "Three ways in",
        body: "Google, Facebook, or phone sign-in — secure & private from the first screen.",
      },
    ],
  },
];

export const screens = {
  id: "shots",
  num: "05",
  kicker: "The screens",
  title: "End to end, on device",
  dragHint: "Drag or",
  railLabel: "Ledger screens",
  /** Portrait screenshots, shown in a phone bezel. */
  ratio: "720 / 1600",
  items: [
    {
      code: "S.01",
      label: "Get started",
      file: "scr-signin.png",
      src: asset("scr-signin.png"),
      alt: "Get started sign-in screen",
      caption: "S.01 — Get started · Google, Facebook, or phone",
    },
    {
      code: "S.02",
      label: "My Wallets",
      file: "scr-wallets.png",
      src: asset("scr-wallets.png"),
      alt: "My Wallets home screen",
      caption: "S.02 — My Wallets · the home screen",
    },
    {
      code: "S.03",
      label: "Edit wallet",
      file: "scr-edit-wallet.png",
      src: asset("scr-edit-wallet.png"),
      alt: "Edit wallet sheet with icon and color pickers",
      caption: "S.03 — Edit wallet · 24 icons, 16 colors, live preview",
    },
    {
      code: "S.04",
      label: "Insights",
      file: "scr-insights.png",
      src: asset("scr-insights.png"),
      alt: "Insights overview screen",
      caption: "S.04 — Insights · overview with smart-insight cards",
    },
    {
      code: "S.05",
      label: "Financial summary",
      file: "scr-summary.png",
      src: asset("scr-summary.png"),
      alt: "Financial summary screen",
      caption: "S.05 — Financial summary · month vs month",
    },
    {
      code: "S.06",
      label: "Wallet breakdown",
      file: "scr-breakdown.png",
      src: asset("scr-breakdown.png"),
      alt: "Wallet breakdown donut chart screen",
      caption: "S.06 — Wallet breakdown · share of total",
    },
    {
      code: "S.07",
      label: "Savings goals",
      file: "scr-goals.png",
      src: asset("scr-goals.png"),
      alt: "Savings goals screen",
      caption: "S.07 — Savings goals · rings, deadlines, top-ups",
    },
    {
      code: "S.08",
      label: "Debts",
      file: "scr-debts.png",
      src: asset("scr-debts.png"),
      alt: "Debts screen with lending and borrowing",
      caption: "S.08 — Debts · they owe me / I owe, netted",
    },
    {
      code: "S.09",
      label: "AI assistant",
      file: "scr-ai.png",
      src: asset("scr-ai.png"),
      alt: "AI assistant chat screen",
      caption: "S.09 — AI assistant · grounded answers in chat",
    },
  ],
};

export const notes = {
  id: "notes",
  num: "06",
  kicker: "Engineering notes",
  title: "Decisions under the paint",
  items: [
    {
      code: "N.01",
      title: "Offline-first, not offline-tolerant",
      body:
        "The local cache is the source of truth. Entries commit instantly and a sync job reconciles with Firestore when the connection returns — nothing in the UI ever waits on the network.",
    },
    {
      code: "N.02",
      title: "Two taps, by design",
      body:
        "The entry sheet opens pre-filled with the last wallet and most-used category. The nine-tap flow this replaced is exactly where every previous tracker lost its users.",
    },
    {
      code: "N.03",
      title: "Pre-aggregated insights",
      body:
        "Charts and digests read from running aggregates written at log time — not client-side loops over transaction history. That is what keeps cold start under 1.4 seconds.",
    },
    {
      code: "N.04",
      title: "An assistant that can't lie",
      body:
        "The AI layer only phrases numbers computed by the same query layer as Insights. If the data can't answer a question, neither will the assistant.",
    },
  ],
  poster: {
    src: asset("poster.png"),
    file: "poster.png",
    alt: "Ledger store listing poster — every peso, accounted for",
    caption: "Store listing art — every peso, accounted for",
    ratio: "1780 / 1956",
    figcaption: { code: "FIG.06", text: "Store listing art" },
  },
};

export const outcome = {
  id: "outcome",
  num: "07",
  kicker: "Outcome",
  headline: "Nine taps became two",
  body: {
    before:
      "The result is a tracker that opens in under a second and a half, works with no signal, and explains itself in plain language — ",
    em: "a ledger people actually keep.",
  },
  stack: ["FLUTTER", "DART", "FIREBASE", "RIVERPOD", "FIGMA"],
};

/** Order matters — the rail and the scroll spy both walk this top to bottom. */
export const chapterNav = [
  { id: "brief", label: "Brief" },
  { id: "ch1", label: "Wallets" },
  { id: "ch2", label: "Insights" },
  { id: "ch3", label: "Goals" },
  { id: "ch4", label: "AI" },
  { id: "shots", label: "Screens" },
  { id: "notes", label: "Notes" },
  { id: "outcome", label: "Outcome" },
];

export const caseLabel = "Ledger — Case study N°01";
export const footerLabel = "Case study N°01 — Ledger";

const content = {
  hero,
  tickerLine,
  brief,
  chapters,
  screens,
  notes,
  outcome,
  chapterNav,
  caseLabel,
  footerLabel,
};

export default content;
