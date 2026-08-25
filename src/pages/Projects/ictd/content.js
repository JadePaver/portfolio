/**
 * Every string and asset the ICTD App case study renders.
 *
 * Kept out of the components so the page reads as a running order of chapters
 * and the copy can be edited without going near layout code.
 *
 * The copy is checked against the shipped app, not remembered: `ictd_app`
 * (Flutter + Supabase), `ictd_app_express` (the console's typed API) and
 * `ictd_app_react` (the console itself). Two things surprise an editor: the
 * console has no messaging module by choice, and it refetches rather than
 * subscribing, so only the phone is live.
 *
 * `hero.png` and the four `feat-*.png` are presentation slides with their own
 * headings and bullets baked into the image. A chapter's title and cards may
 * go past what its slide says (ch3 and ch4 already do) but must not
 * contradict it, because the plate renders directly under the heading.
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
    "The service desk of the Information and Communications Technology Division. An employee files a hardware or software problem from their phone, and every operator on the bench is told the same second. Requests, units booked in at the counter and the notices that follow all live on one record: worked from the field on Android, watched from the console at the desk.",
  scrollHint: "Scroll for the full story",
  meta: [
    { term: "Role", value: "Designer & developer" },
    { term: "Client", value: "ICTD — Information and Communications Technology Division" },
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
  "ASSET & CUSTODY MANAGEMENT  ✦  ICTD APP  ✦  REQUESTS · REPAIRS · ANNOUNCEMENTS · MESSAGES  ✦  FILED ON A PHONE, PUSHED TO THE BENCH  ✦  ONE RECORD, TWO FRONT DOORS  ✦";

export const brief = {
  id: "brief",
  num: "00",
  kicker: "The brief",
  title: "Where the logbook kept failing",
  lead:
    "A division that fixes everyone else's equipment was running its own queue on phone calls, group chats, and a paper logbook. The brief was to make one record everybody can read, and to make it speak up on its own.",
  panels: [
    {
      term: "The problem",
      body:
        "Requests arrived by call, by chat, or by a knock at the door, repairs were tracked on paper, and notices travelled by word of mouth. Nobody could say whether a request had even been seen, let alone “where is it, and who touched it last?”",
    },
    {
      term: "The approach",
      body:
        "One record with two roles on it: the employee who asks, and the ICTD operator who answers. An append-only activity log stands in for an editable status field, and the write itself raises the notification, so being told is not a habit anyone has to keep.",
    },
    {
      term: "The outcome",
      body:
        "Every ticket and every unit carries its own timeline, its owner, and the operator who answered. The phone is told as it happens; the console shows the division the whole board, oldest first.",
    },
  ],
  /**
   * Decisions, not inventory. A module count restates card 3.4 and a "100%"
   * dresses up a design decision as a measurement. What the brief is about is
   * how a technical division actually runs: an app in the field backed by a
   * desk console, a Postgres trigger raising the push so no client has to
   * remember to, one serial number carrying its request, its repair and its
   * custodian, and notices aimed at a department instead of sprayed at
   * everybody.
   *
   * The gold word carries the decision and leads in each, so `value` is dropped
   * throughout. Phrases stay short, because the display line is `inline-flex`
   * and does not wrap, so it overflows rather than reflows. "Push on write" is
   * thirteen characters, the longest that clears the ~276px a four-up column
   * leaves in the 1240px shell at the 42px display size. The fourth runs on the
   * accent alone: its contrast, "aimed, not blasted", is eighteen and would
   * hang out of the column, so the caption carries the rest of the thought.
   */
  stats: [
    { accent: "Phone", after: "first", spaced: true, label: "Field app leads, the console follows" },
    { accent: "Push", after: "on write", spaced: true, label: "The database raises it, not the app" },
    { accent: "Per", after: "serial", spaced: true, label: "Request, repair and custody on one unit" },
    { accent: "Aimed", label: "Pick a department or everyone, every time" },
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
        "A staff member files the problem in their own words, and every operator's phone is told the moment it lands. What comes back is not a status. It's a ",
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
          "Hardware or software, the office it came from, a ticket number and a timestamp: all on the card before you expand anything.",
      },
      {
        num: "1.3",
        title: "An activity log, not a status",
        body:
          "Created, Processing, Done. Each step keeps its author, its note, and the time it happened.",
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
      "Custody is the whole job. A unit can sit at the counter for a month, and not every one goes home; some are closed out for disposal rather than released. Either way it carries its serial number, its condition at both ends, and every hand it passed through.",
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
          "Received, repairing, ready for release, closed. Each is a row with an author and a note attached, never a field somebody overwrote.",
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
      "The same records, arranged for the people who clear them, plus the numbers nobody could see before: counts, trends, and a running feed of what just happened. Oldest first, decisions on the card, and the bench grouped by whose desk it's sitting on.",
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
          "Each column states the age of the oldest ticket in it, and accept, deny or complete are decided on the card without opening a page.",
      },
      {
        num: "3.2",
        title: "Grouped by technician",
        body:
          "The repair list stacks by whose bench it's on, with days-in-shop flagged in red.",
      },
      {
        num: "3.3",
        title: "Aimed, not blasted",
        body:
          "A broadcast switch, or a picked list of departments, with an optional time for it to go out later.",
      },
      {
        num: "3.4",
        title: "Nine modules, one shell",
        body:
          "Operations, inventory and directory in one sidebar: requests and repairs through inventory, memorandum receipts, and the custodians who sign for them.",
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
    /**
     * Chat and the notification feed share a chapter because they are the same
     * promise from two directions: the app tells you, instead of waiting to be
     * checked. Announcements are composed on the console (card 3.3) and land
     * here, under the bell, alongside request activity and replies.
     */
    kicker: "Messages & notifications",
    title: "Ask the person holding your unit",
    lead:
      "Follow-up used to live in a group chat nobody could search. Now it sits inside the app that already knows which ticket you're asking about, and everything else the account did today is waiting under the bell.",
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
        title: "Pushed, then filed",
        body:
          "The same notice arrives as a push and waits under the app-bar bell, tagged announcement, request or message, and opening the record it came from.",
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
      /**
       * Captioned by what sign-in is for, not by the buttons in the shot: the
       * app has since narrowed to a single ICTD Google account, and a caption
       * that counted the routes would date the moment it changed again.
       */
      caption: "S.02 — Sign in · the account every record is signed against",
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
      title: "Two front doors, one database",
      body:
        "Same Supabase Postgres database under both surfaces. The phone talks to it directly, under row-level security. The web console goes through a small typed API that gates every route on the operator role. Different doors, same table. Nothing in the office view is a second copy to reconcile.",
    },
    {
      code: "N.03",
      title: "The database sends the push, not the app",
      body:
        "An insert fires a trigger into an edge function into FCM. Notifying is therefore not a step a client can skip, and a request reaches the bench whether or not anyone has the app open.",
    },
    {
      code: "N.04",
      title: "Chat stayed on the phone",
      body:
        "The console does everything the app does except message. Follow-up belongs where the technician already is, and a web inbox nobody watches is worse than no web inbox at all.",
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
      "Requests, repairs, announcements and custody now share one timeline that both the field and the office can read, and the phone is told the moment any of it moves, ",
    em: "so “where is it, and who touched it last?” has an answer on the screen.",
  },
  stack: [
    "FLUTTER",
    "DART",
    "SUPABASE",
    "POSTGRES + RLS",
    "REALTIME",
    "FCM PUSH",
    "REACT · TYPESCRIPT",
    "EXPRESS",
    "FIGMA",
  ],
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
