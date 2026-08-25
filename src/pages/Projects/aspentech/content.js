/**
 * Every string and asset the Aspentech case study renders.
 *
 * Kept out of the components so the page reads as a running order of chapters
 * and the copy can be edited without going near layout code.
 *
 * ---------------------------------------------------------------------------
 * ASSETS: the eleven PNGs below are expected in `public/images/aspentech/`.
 * Until they are dropped in, every figure falls back to a labelled placeholder
 * of the right aspect ratio, so the layout holds either way.
 *
 *   hero.png              templates.png         why.png
 *   customizer-hero.png   customizer-panel.png  customizer-phones.png
 *   customizer-promo.png  detail-hero.png       detail-overview.png
 *   detail-impact.png     process.png
 *
 * Unlike the app case studies these are wide page captures, so the ratios are
 * the source files' own rather than a shared 16/9 — a page screenshot cropped
 * to a nominal ratio loses either the header or the fold.
 * ---------------------------------------------------------------------------
 */

const asset = (file) => `${process.env.PUBLIC_URL}/images/aspentech/${file}`;

export const hero = {
  kicker: "CASE STUDY — 03",
  discipline: "Web platform · Enterprise software sales",
  year: "2026",
  title: "Aspentech",
  /**
   * Nine characters against Ledger's six, so the design steps the wordmark
   * down from the template's default to keep it on one line at every width.
   * Only the size moves — the leading has to stay put, because the route
   * transition's wordmark lands on this heading and takes its scale from it.
   */
  titleSx: { fontSize: "clamp(48px, 8.6vw, 112px)" },
  tagline: "See it before you build it.",
  lead:
    "Enterprise software is sold on slide decks and hope. Aspentech Solutions sells it with a live product instead: six production-ready systems a buyer can browse, re-skin, and re-scope in the browser, then send back as the proposal request.",
  scrollHint: "Scroll for the full story",
  meta: [
    { term: "Role", value: "Designer & front-end developer" },
    { term: "Client", value: "Aspentech Solutions" },
    { term: "Platform", value: "Responsive web" },
    { term: "Scope", value: "Marketing site + live customizer" },
  ],
  figure: {
    src: asset("hero.png"),
    file: "hero.png",
    alt:
      "Aspentech Solutions homepage hero: see your future software system before you build it",
    caption: "Aspentech Solutions · homepage hero, 2026",
    ratio: "2514 / 1218",
    wide: true,
  },
};

export const tickerLine =
  "SEE IT BEFORE YOU BUILD IT  ✦  ASPENTECH SOLUTIONS  ✦  TEMPLATES · CUSTOMIZER · PROPOSAL  ✦  ENTERPRISE & GOVERNMENT SYSTEMS  ✦";

export const brief = {
  id: "brief",
  num: "00",
  kicker: "The brief",
  title: "Nobody buys a system they can't picture",
  lead:
    "Procurement committees sign six-figure builds off screenshots of somebody else's product. The site was scoped against one failure: the gap between what a buyer imagines and what the vendor will actually ship.",
  panels: [
    {
      term: "The problem",
      body:
        "Enterprise and government buyers were asked to approve a system from a feature list. Every scoping call restarted from zero, and the design conversation only began after the contract was signed.",
    },
    {
      term: "The approach",
      body:
        "Treat the sales site as the product. Six real systems as browsable templates, a customizer that re-skins them live (colors, layout, density, modules), and a detail page per system that states its stack, modules, and fit before anyone talks price.",
    },
    {
      term: "The outcome",
      body:
        "The proposal request now arrives with a configuration attached: chosen template, design style, layout, module set, and an indicative scope band, a shared picture on day one instead of week six.",
    },
  ],
  /**
   * Phrases, not counts. A style total and a preview count are inventory, and a
   * "0" set at display size reads as a result that didn't happen — the four
   * things worth printing here are the decisions that made the sales site a
   * product: it demos, the templates are real, the buyer holds the controls,
   * and the enquiry comes back configured.
   *
   * The gold word carries the decision, so it leads wherever the phrase allows
   * and `value` is dropped; "Six shipped" and "One config" need the count in
   * front, so there the accent lands second.
   */
  stats: [
    { accent: "Demo", after: "first", spaced: true, label: "The live product, not a slide deck" },
    { value: "Six", accent: "shipped", spaced: true, label: "Templates in production, not concepts" },
    { accent: "Buyer", after: "drives", spaced: true, label: "They re-skin and re-scope it themselves" },
    { value: "One", accent: "config", spaced: true, label: "The enquiry arrives already specified" },
  ],
};

export const chapters = [
  {
    id: "ch1",
    tone: "paper",
    num: "01",
    kicker: "Templates",
    title: "Start from something that already runs",
    lead:
      "Each card is a system in production somewhere: budget, requests, inventory, governance, people. Photography and a domain badge do the sorting, so a buyer finds their own department before reading a word of copy.",
    figure: {
      src: asset("templates.png"),
      file: "templates.png",
      alt: "Template catalog: start from a proven solution",
      caption: "01 · Templates: six production systems, browsable",
      ratio: "2515 / 1278",
      wide: true,
    },
    cards: [
      {
        num: "1.1",
        title: "Sorted by department, not feature",
        body:
          "Finance & Government, Operations, Supply Chain, Governance, People: the badge a buyer already identifies with.",
      },
      {
        num: "1.2",
        title: "Modules on the card",
        body:
          "Three named modules and a “+3 more” chip give the shape of the system without opening it.",
      },
      {
        num: "1.3",
        title: "Two exits, always",
        body:
          "Explore for the detail page, Customize to skip straight into the live preview, so readers and tinkerers are both served.",
      },
      {
        num: "1.4",
        title: "Real work, real photos",
        body:
          "Warehouses, drawings, ledgers: imagery from the job the system does, never abstract tech stock.",
      },
    ],
  },
  {
    id: "ch2",
    tone: "ink",
    num: "02",
    kicker: "Live customizer",
    title: {
      before: "The demo ",
      em: "is",
      after: " the spec",
    },
    lead:
      "One preset (Government Portal, Corporate Enterprise, Modern SaaS) transforms every surface at once. From there the controls get finer: theme mode, primary and accent color, navigation pattern, corner radius, module set.",
    figure: {
      src: asset("customizer-hero.png"),
      file: "customizer-hero.png",
      alt: "Customizer: design your system live, with quick presets",
      caption: "02 · Customizer: quick presets over a live preview",
      ratio: "2500 / 1270",
      wide: true,
    },
    cards: [
      {
        num: "2.1",
        title: "Presets first, dials second",
        body:
          "Six one-click starting points mean nobody faces an empty control panel, and swatches preview the palette before you commit.",
      },
      {
        num: "2.2",
        title: "Seven re-skins, one layout",
        body:
          "Standard through Neobrutalism, Glassmorphism, Claymorphism, Y2K: surface treatment changes, information architecture doesn't.",
      },
      {
        num: "2.3",
        title: "Showcase or single screen",
        body:
          "Review every key screen of one system, or every system at once: the same config, two ways of reading it.",
      },
      {
        num: "2.4",
        title: "Scope in the footer",
        body:
          "A sticky bar keeps template, tier, module count and an indicative timeline in view, and turns it into “Request this build”.",
      },
    ],
  },
  {
    id: "ch3",
    tone: "paper",
    num: "03",
    kicker: "System detail",
    title: "Every system makes its own case",
    lead:
      "The detail page answers the evaluation checklist in order: what it does, what it includes, what it's built on, who it suits, while a sticky panel holds the two actions that matter.",
    figure: {
      src: asset("detail-overview.png"),
      file: "detail-overview.png",
      alt: "Budget Management System detail page: overview, key benefits, modules",
      caption: "03 · System detail: overview, benefits, modules, sticky CTA",
      ratio: "2487 / 1264",
      wide: true,
    },
    cards: [
      {
        num: "3.1",
        title: "Two numbers in the hero",
        body:
          "“70% reporting time saved”, “3× faster approval cycle”: the outcome sits beside the title, not three sections down.",
      },
      {
        num: "3.2",
        title: "Modules, listed plainly",
        body:
          "Six named modules ready to configure, the same list the customizer toggles, so the pages can't contradict each other.",
      },
      {
        num: "3.3",
        title: "Stack and fit, in the rail",
        body:
          "Technology chips and an “Ideal for” list answer the IT reviewer while the decision-maker reads the left column.",
      },
      {
        num: "3.4",
        title: "Impact, labelled illustrative",
        body:
          "The post-rollout curve is captioned as representative, because credibility costs one line of honest copy.",
      },
    ],
    figureAside: {
      src: asset("detail-impact.png"),
      file: "detail-impact.png",
      alt: "Illustrative impact chart and sticky proposal rail",
      caption:
        "FIG.03 · Illustrative impact after rollout, with the sticky proposal rail",
      ratio: "2182 / 1164",
      wide: true,
      figcaption: { code: "FIG.03", text: "Illustrative impact after rollout" },
    },
  },
  {
    id: "ch4",
    tone: "ink",
    num: "04",
    kicker: "On device",
    title: "The same config, in the hand",
    lead:
      "Field teams are the reason half these systems get bought, so mobile isn't a tab you have to look for: dashboard and record detail render side by side in the same preview, under the same controls.",
    figure: {
      src: asset("customizer-phones.png"),
      file: "customizer-phones.png",
      alt:
        "Customizer mobile preview: dashboard and budget line detail on two phones",
      caption: "04 · Mobile preview: dashboard and record detail, live",
      ratio: "2434 / 1264",
      wide: true,
    },
    cards: [
      {
        num: "4.1",
        title: "Two screens, one story",
        body:
          "Dashboard next to record detail shows the whole loop: scan the numbers, open the line, read its history.",
      },
      {
        num: "4.2",
        title: "Data that reads as real",
        body:
          "Reference numbers, owners, fiscal year, deltas: plausible records, because empty states never sell a system.",
      },
      {
        num: "4.3",
        title: "Live badges, not screenshots",
        body:
          "A “Live” tag on each frame says out loud what the buyer suspects: this is the real thing responding to your choices.",
      },
      {
        num: "4.4",
        title: "Tap targets that survive gloves",
        body:
          "Bottom navigation and a persistent add button, because the mobile-first preset exists for warehouse and field crews.",
      },
    ],
  },
];

export const screens = {
  id: "shots",
  num: "05",
  kicker: "The screens",
  title: "Home to handover",
  dragHint: "Drag or",
  railLabel: "Aspentech screens",
  /** A web product, so the shots wear browser windows rather than handsets. */
  frame: "browser",
  /** Page captures anchored to their first fold. */
  ratio: "16 / 10",
  items: [
    {
      code: "S.01",
      label: "Home",
      file: "hero.png",
      src: asset("hero.png"),
      alt: "Homepage hero",
      caption: "S.01 Home · see your future system before you build it",
    },
    {
      code: "S.02",
      label: "Proof band",
      file: "customizer-promo.png",
      src: asset("customizer-promo.png"),
      alt: "Proof stats and customizer teaser section",
      caption: "S.02 Proof band + customizer teaser · don't imagine it, see it",
    },
    {
      code: "S.03",
      label: "Templates",
      file: "templates.png",
      src: asset("templates.png"),
      alt: "Template catalog grid",
      caption: "S.03 Templates · start from a proven solution",
    },
    {
      code: "S.04",
      label: "Why Aspentech",
      file: "why.png",
      src: asset("why.png"),
      alt: "Why Aspentech: four differentiator cards",
      caption:
        "S.04 Why Aspentech · enterprise-grade delivery, without the guesswork",
    },
    {
      code: "S.05",
      label: "System hero",
      file: "detail-hero.png",
      src: asset("detail-hero.png"),
      alt: "Budget Management System detail hero",
      caption: "S.05 System hero · Budget Management System",
    },
    {
      code: "S.06",
      label: "Overview",
      file: "detail-overview.png",
      src: asset("detail-overview.png"),
      alt: "System overview with key benefits and modules",
      caption: "S.06 Overview · benefits, modules, sticky proposal rail",
    },
    {
      code: "S.07",
      label: "Impact",
      file: "detail-impact.png",
      src: asset("detail-impact.png"),
      alt: "Illustrative impact chart",
      caption: "S.07 Impact · illustrative gains after rollout",
    },
    {
      code: "S.08",
      label: "Customizer",
      file: "customizer-hero.png",
      src: asset("customizer-hero.png"),
      alt: "Customizer landing with quick presets",
      caption: "S.08 Customizer · design your system, live",
    },
    {
      code: "S.09",
      label: "Controls",
      file: "customizer-panel.png",
      src: asset("customizer-panel.png"),
      alt: "Customizer control panel with design styles and palette",
      caption: "S.09 Controls · design style, theme mode, palette, modules",
    },
    {
      code: "S.10",
      label: "Mobile preview",
      file: "customizer-phones.png",
      src: asset("customizer-phones.png"),
      alt: "Mobile preview inside the customizer",
      caption: "S.10 Mobile preview · dashboard and record detail",
    },
    {
      code: "S.11",
      label: "Process",
      file: "process.png",
      src: asset("process.png"),
      alt: "Delivery process cards from discovery to support",
      caption: "S.11 Process · seven phases, each with named deliverables",
    },
  ],
};

export const notes = {
  id: "notes",
  num: "06",
  kicker: "Design notes",
  title: "Decisions under the paint",
  items: [
    {
      code: "N.01",
      title: "One theme layer, seven skins",
      body:
        "Every design style is a token set (surface, border, radius, shadow, type weight) applied over one component library. Neobrutalism and Neumorphism are the same screens with different variables, which is why the preview can switch instantly and why the build estimate doesn't move.",
    },
    {
      code: "N.02",
      title: "Configuration is a shareable object",
      body:
        "Template, style, palette, layout, radius and module set serialize into a link. A buyer sends it to their committee; the proposal request arrives carrying the same object, so no “which version did you mean?”",
    },
    {
      code: "N.03",
      title: "Honest numbers, labelled",
      body:
        "Impact curves say “representative”, scope bands say “indicative, refined in your tailored proposal”. Enterprise buyers punish overclaiming harder than they punish caution, so the caveat is part of the design, not a footnote.",
    },
    {
      code: "N.04",
      title: "The process is a section, not a PDF",
      body:
        "Seven phases, each naming its deliverables: requirements brief, clickable prototype, UAT sign-off, go-live runbook. Procurement teams look for exactly these words; putting them on the page answers the RFP before it's written.",
    },
  ],
  poster: {
    src: asset("process.png"),
    file: "process.png",
    alt: "Seven-phase delivery process cards",
    caption: "FIG.06 · Delivery process, seven phases with named deliverables",
    ratio: "2194 / 1078",
    figcaption: { code: "FIG.06", text: "Delivery process" },
  },
  posterAside: {
    src: asset("why.png"),
    file: "why.png",
    alt: "Why Aspentech section with four numbered claim cards",
    caption: "FIG.07 · Why Aspentech, four claims with numbered cards",
    ratio: "2491 / 1030",
    figcaption: { code: "FIG.07", text: "Four claims, numbered" },
  },
};

export const outcome = {
  id: "outcome",
  num: "07",
  kicker: "Outcome",
  headline: "The pitch became a product",
  body: {
    before:
      "Aspentech stopped describing systems and started handing them over to be played with. Every enquiry now arrives with a template, a design style, a module list and a scope band already agreed, so ",
    em: "the first meeting starts at the second question.",
  },
  stack: [
    "HOMEPAGE",
    "TEMPLATE CATALOG",
    "SYSTEM DETAIL",
    "LIVE CUSTOMIZER",
    "PROCESS & PROPOSAL",
  ],
};

/** Order matters — the rail and the scroll spy both walk this top to bottom. */
export const chapterNav = [
  { id: "brief", label: "Brief" },
  { id: "ch1", label: "Templates" },
  { id: "ch2", label: "Customizer" },
  { id: "ch3", label: "Detail" },
  { id: "ch4", label: "Mobile" },
  { id: "shots", label: "Screens" },
  { id: "notes", label: "Notes" },
  { id: "outcome", label: "Outcome" },
];

export const caseLabel = "Aspentech Solutions — Case study N°03";
export const footerLabel = "Case study N°03 — Aspentech Solutions";

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
