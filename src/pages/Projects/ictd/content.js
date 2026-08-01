/**
 * Every string and asset the ICTD App case study renders.
 *
 * Kept out of the components so the page reads as a running order of chapters
 * and the copy can be edited without going near layout code.
 *
 * ---------------------------------------------------------------------------
 * ASSETS: the sixteen PNGs below are expected in `public/images/ictd/`.
 * Until they are dropped in, every figure falls back to a labelled placeholder
 * of the right aspect ratio, so the layout holds either way.
 *
 *   hero.png            feat-requests.png    feat-repairs.png
 *   poster.png          feat-admin.png       feat-messages.png
 *   admin-repairs.png
 *   scr-splash.png      scr-signin.png       scr-requests.png
 *   scr-activity.png    scr-repairs.png      scr-repair-detail.png
 *   scr-guide.png       scr-messages.png     scr-chat.png
 * ---------------------------------------------------------------------------
 */

const asset = (file) => `${process.env.PUBLIC_URL}/images/ictd/${file}`;

export const hero = {
  kicker: "CASE STUDY — 04",
  discipline: "Mobile app + web console · Government ICT",
  year: "2026",
  title: "ICTD App",
  /**
   * Eight characters against Ledger's six, so the design steps the wordmark
   * down from the template's default to keep it on one line at every width.
   * Only the size moves — the leading has to stay put, because the route
   * transition's wordmark lands on this heading and takes its scale from it.
   */
  titleSx: { fontSize: "clamp(52px, 9.4vw, 124px)" },
  tagline: "Asset & custody management.",
  lead:
    "The service desk of the Information and Communications Technology Division, Office of the Governor — technical requests, the repair bench, and equipment custody kept on one record. Staff open it from a phone in the field; the division works it from a console at the desk.",
  scrollHint: "Scroll for the full story",
  meta: [
    { term: "Role", value: "Designer & developer" },
    { term: "Client", value: "ICTD — Office of the Governor" },
    { term: "Platform", value: "Android app + web console" },
    { term: "Scope", value: "Product design + build" },
  ],
  figure: {
    src: asset("hero.png"),
    file: "hero.png",
    alt: "ICTD App hero — sign in, requests, and repairs on three phones",
    caption: "ICTD App — presentation hero, 2026",
    ratio: "16 / 9",
    wide: true,
  },
};

export const tickerLine =
  "ASSET & CUSTODY MANAGEMENT  ✦  ICTD APP  ✦  REQUESTS · REPAIRS · INVENTORY · MESSAGES  ✦  ONE RECORD, TWO FRONT DOORS  ✦";

export const brief = {
  id: "brief",
  num: "00",
  kicker: "The brief",
  title: "Where the logbook kept failing",
  lead:
    "A division that fixes everyone else's equipment was running its own queue on phone calls, group chats, and a paper logbook. The brief was to make one record everybody can read.",
  panels: [
    {
      term: "The problem",
      body:
        "Requests arrived by call and chat, repairs were tracked on paper, and custody of a unit was whatever the last person remembered. Nobody could answer “where is it, and who touched it last?”",
    },
    {
      term: "The approach",
      body:
        "One record per request and per unit, with an append-only activity log instead of an editable status field — surfaced twice: a field app for staff and technicians, and a triage console for the division.",
    },
    {
      term: "The outcome",
      body:
        "Every ticket and every unit on the bench carries its own timeline, its owner, and the technician who answered — readable from either front door, with no second copy to reconcile.",
    },
  ],
  stats: [
    /** Two clients collapsing onto one record, so the arrow needs air on both sides. */
    { value: "2", accent: "→", after: "1", spaced: true, label: "Clients, one shared record" },
    { value: "9", label: "Modules in the console" },
    { value: "4", label: "Triage states, oldest first" },
    { value: "100", accent: "%", label: "Actions written to the log" },
  ],
};

export const chapters = [
  {
    id: "ch1",
    tone: "paper",
    num: "01",
    kicker: "Technical requests",
    title: "Every request keeps its own thread",
    lead: {
      before:
        "A staff member files the problem in their own words. What comes back is not a status — it's a ",
      em: "record of who did what, and when.",
    },
    figure: {
      src: asset("feat-requests.png"),
      file: "feat-requests.png",
      alt:
        "Every request keeps its own thread — request list and activity timeline",
      caption: "01 · Technical requests — open, taken, done",
      ratio: "16 / 9",
      wide: true,
    },
    cards: [
      {
        num: "1.1",
        title: "Three tabs, no inbox",
        body:
          "Open, Taken and Done split the queue so nothing waits behind something already handled.",
      },
      {
        num: "1.2",
        title: "Filed to a department",
        body:
          "Type, office, ticket number and timestamp sit on the card before you expand anything.",
      },
      {
        num: "1.3",
        title: "An activity log, not a status",
        body:
          "Created, Processing, Done — each step keeps its author, its note, and the time it happened.",
      },
      {
        num: "1.4",
        title: "Responded by a person",
        body:
          "The technician's name is on the ticket, so follow-up always has somewhere to go.",
      },
    ],
  },
  {
    id: "ch2",
    tone: "ink",
    num: "02",
    kicker: "Repair bench",
    title: "Book it in, track it out",
    lead:
      "Custody is the whole job. Each unit on the bench carries its serial number, the condition it arrived in, the condition it left in, and every hand it passed through.",
    figure: {
      src: asset("feat-repairs.png"),
      file: "feat-repairs.png",
      alt:
        "Book it in, track it out — repair item detail and the intake form guide",
      caption: "02 · Repair bench — received, repairing, released",
      ratio: "16 / 9",
      wide: true,
    },
    cards: [
      {
        num: "2.1",
        title: "Status is an event",
        body:
          "Received → Repairing → Ready for release, each with a note attached — never a field somebody overwrote.",
      },
      {
        num: "2.2",
        title: "Condition, both ways",
        body:
          "What came in and what went back out, recorded in the owner's own words at both ends.",
      },
      {
        num: "2.3",
        title: "System user or walk-in",
        body:
          "Link the item to an account, or type a custom owner for someone without one.",
      },
      {
        num: "2.4",
        title: "The form explains itself",
        body:
          "A guide sheet defines every field, so intake reads the same from any technician.",
      },
    ],
  },
  {
    id: "ch3",
    tone: "paper",
    num: "03",
    kicker: "Admin console",
    title: "Triage from one board",
    lead:
      "The same records, arranged for the people who clear them. Oldest first, decision buttons on the card, and the bench grouped by whose desk it's sitting on.",
    figure: {
      src: asset("feat-admin.png"),
      file: "feat-admin.png",
      alt:
        "Triage from one board — the technical requests board in the admin console",
      caption: "03 · Admin console — pending, accepted, completed, denied",
      ratio: "16 / 9",
      wide: true,
    },
    cards: [
      {
        num: "3.1",
        title: "Oldest first, on purpose",
        body:
          "Each column states the age of the oldest ticket in it, so the queue can't quietly rot.",
      },
      {
        num: "3.2",
        title: "Decide from the card",
        body:
          "Accept, deny or complete without opening a detail page or losing your place.",
      },
      {
        num: "3.3",
        title: "Grouped by technician",
        body:
          "The repair list stacks by whose bench it's on, with days-in-shop flagged in red.",
      },
      {
        num: "3.4",
        title: "Nine modules, one shell",
        body:
          "Operations, inventory and directory sit in one sidebar — requests through custodians.",
      },
    ],
    figureAside: {
      src: asset("admin-repairs.png"),
      file: "admin-repairs.png",
      alt:
        "Repair items list with an item record open: owner, condition, activity log, status update",
      caption:
        "FIG.03 · Repair items — the full record, with its log and status update",
      ratio: "2536 / 1383",
      wide: true,
      figcaption: { code: "FIG.03", text: "Repair item record — console" },
    },
  },
  {
    id: "ch4",
    tone: "ink",
    num: "04",
    kicker: "Messages",
    title: "Ask the person holding your unit",
    lead:
      "Follow-up used to live in a group chat nobody could search. Now it sits inside the app that already knows which ticket you're asking about.",
    figure: {
      src: asset("feat-messages.png"),
      file: "feat-messages.png",
      alt:
        "Ask the person holding your unit — conversation list and chat thread",
      caption: "04 · Messages — one thread per technician",
      ratio: "16 / 9",
      wide: true,
    },
    cards: [
      {
        num: "4.1",
        title: "One thread per technician",
        body:
          "Unread counts sit on the conversation and on the tab, colour-coded per person.",
      },
      {
        num: "4.2",
        title: "Searchable by name",
        body:
          "Conversations are filtered from the top of the list instead of scrolled through.",
      },
      {
        num: "4.3",
        title: "Delivery you can see",
        body:
          "Sent and read states, day separators, and a timestamp on every bubble.",
      },
      {
        num: "4.4",
        title: "Three ways in",
        body:
          "Mobile number, Google, or Facebook — the same account the record is signed against.",
      },
    ],
  },
];

export const screens = {
  id: "shots",
  num: "05",
  kicker: "The screens",
  title: "Sign-in to sign-off",
  dragHint: "Drag or",
  railLabel: "ICTD App screens",
  /** The handset captures' own ratio. */
  ratio: "668 / 1484",
  items: [
    {
      code: "S.01",
      label: "Splash",
      file: "scr-splash.png",
      src: asset("scr-splash.png"),
      alt: "ICTD splash screen",
      caption: "S.01 — Splash · the division seal, on open",
    },
    {
      code: "S.02",
      label: "Sign in",
      file: "scr-signin.png",
      src: asset("scr-signin.png"),
      alt: "Sign in screen with mobile, Facebook and Google",
      caption: "S.02 — Sign in · mobile number, Google, or Facebook",
    },
    {
      code: "S.03",
      label: "Requests",
      file: "scr-requests.png",
      src: asset("scr-requests.png"),
      alt: "Technical requests list, Done tab",
      caption: "S.03 — Requests · open, taken, done",
    },
    {
      code: "S.04",
      label: "Request activity",
      file: "scr-activity.png",
      src: asset("scr-activity.png"),
      alt: "Request activity timeline expanded",
      caption: "S.04 — Request activity · created, processing, done",
    },
    {
      code: "S.05",
      label: "Repairs",
      file: "scr-repairs.png",
      src: asset("scr-repairs.png"),
      alt: "Repair items list with status chips",
      caption: "S.05 — Repairs · every unit on the bench",
    },
    {
      code: "S.06",
      label: "Repair record",
      file: "scr-repair-detail.png",
      src: asset("scr-repair-detail.png"),
      alt: "Repair item detail with condition and log",
      caption: "S.06 — Repair record · condition, log, status",
    },
    {
      code: "S.07",
      label: "Form guide",
      file: "scr-guide.png",
      src: asset("scr-guide.png"),
      alt: "Intake form guide sheet",
      caption: "S.07 — Form guide · every field, explained",
    },
    {
      code: "S.08",
      label: "Messages",
      file: "scr-messages.png",
      src: asset("scr-messages.png"),
      alt: "Conversation list",
      caption: "S.08 — Messages · one thread per technician",
    },
    {
      code: "S.09",
      label: "Chat",
      file: "scr-chat.png",
      src: asset("scr-chat.png"),
      alt: "Chat thread with a technician",
      caption: "S.09 — Chat · sent, read, timestamped",
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
      title: "Append-only, never overwritten",
      body:
        "Status changes are rows in a log, not a column on the record. Custody disputes are settled by reading the timeline instead of trusting the last edit.",
    },
    {
      code: "N.02",
      title: "Two clients, one contract",
      body:
        "The field app and the console read the same records through the same API. Nothing in the office view is a second copy that has to be reconciled later.",
    },
    {
      code: "N.03",
      title: "Queues sorted by age, not by priority",
      body:
        "Self-declared urgency always inflates. The board sorts oldest-first and prints the age of the oldest item in each column, so neglect is visible instead of arguable.",
    },
    {
      code: "N.04",
      title: "Written for the person at the counter",
      body:
        "Intake fields carry an in-app guide with examples, because the form is filled in front of an owner who is already annoyed that their unit broke.",
    },
  ],
  poster: {
    src: asset("poster.png"),
    file: "poster.png",
    alt: "ICTD App launch art — asset and custody management",
    caption: "Launch art — ICTD App, asset & custody management",
    ratio: "1780 / 1956",
    figcaption: { code: "FIG.06", text: "Launch art" },
  },
};

export const outcome = {
  id: "outcome",
  num: "07",
  kicker: "Outcome",
  headline: "The logbook became a record",
  body: {
    before:
      "Requests, repairs and custody now share one timeline that both the field and the office can read — ",
    em: "so “where is it, and who touched it last?” has an answer on the screen.",
  },
  stack: ["FLUTTER", "DART", "WEB CONSOLE", "REST API", "FIGMA"],
};

/** Order matters — the rail and the scroll spy both walk this top to bottom. */
export const chapterNav = [
  { id: "brief", label: "Brief" },
  { id: "ch1", label: "Requests" },
  { id: "ch2", label: "Repairs" },
  { id: "ch3", label: "Console" },
  { id: "ch4", label: "Messages" },
  { id: "shots", label: "Screens" },
  { id: "notes", label: "Notes" },
  { id: "outcome", label: "Outcome" },
];

export const caseLabel = "ICTD App — Case study N°04";
export const footerLabel = "Case study N°04 — ICTD App";

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
