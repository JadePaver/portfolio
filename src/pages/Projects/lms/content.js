/**
 * Every string and asset the LMS case study renders.
 *
 * Kept out of the components so the page reads as a running order of chapters
 * and the copy can be edited without going near layout code.
 *
 * ---------------------------------------------------------------------------
 * ASSETS: the thirteen PNGs below are expected in `public/images/lms/`.
 * Until they are dropped in, every figure falls back to a labelled placeholder
 * of the right aspect ratio, so the layout holds either way.
 *
 *   hero.png            poster.png
 *   feat-catalog.png    feat-module.png       feat-workspace.png
 *   feat-instructor.png feat-grading.png
 *   scr-signin.png      scr-catalog.png       scr-module.png
 *   scr-assess.png      scr-instructor.png    scr-submissions.png
 *
 * Like Aspentech these are wide page captures rather than handset screens, so
 * the chapter plates carry the source files' own ratio instead of a nominal
 * 16/9 — cropping a full page to one loses either the header or the fold.
 * ---------------------------------------------------------------------------
 */

const asset = (file) => `${process.env.PUBLIC_URL}/images/lms/${file}`;

/** The five chapter plates are all captures of the same wide page frame. */
const PAGE = "3404 / 2354";

export const hero = {
  kicker: "CASE STUDY — 05",
  discipline: "Web app · Code learning platform",
  year: "2026",
  title: "LMS",
  tagline: "Learn to code, one line at a time.",
  lead:
    "A learning platform for people who are learning to write code — modules to read, challenges to build, and a browser editor that runs the module's own tests before anything is submitted. Instructors get the other half: one console for publishing and one queue for review.",
  scrollHint: "Scroll for the full story",
  meta: [
    { term: "Role", value: "Solo designer & developer" },
    { term: "Timeline", value: "2026" },
    { term: "Platform", value: "Web · Desktop-first" },
    { term: "Stack", value: "React · Node · Express · MySQL" },
  ],
  figure: {
    src: asset("hero.png"),
    file: "hero.png",
    alt: "LMS hero — module catalog and the browser code editor",
    caption: "LMS — presentation hero, 2026",
    ratio: "16 / 9",
    wide: true,
  },
};

export const tickerLine =
  "LEARN TO CODE, ONE LINE AT A TIME  ✦  LMS  ✦  MODULES · EDITOR · ASSESSMENTS · REVIEW  ✦";

export const brief = {
  id: "brief",
  num: "00",
  kicker: "The brief",
  title: "Reading about code isn't writing it",
  lead:
    "Lessons live on one site, the exercise on another, and the grade in a spreadsheet. LMS was scoped to close that loop — read, build, run, submit, review — without leaving the tab.",
  panels: [
    {
      term: "The problem",
      body:
        "Learners bounce between a lesson page, a local editor and a submission form — and instructors chase files in chat threads to find out who actually finished.",
    },
    {
      term: "The approach",
      body:
        "One shell for two roles. Every module is a syllabus of lessons plus difficulty-tiered assessments, and every assessment opens as a workspace: spec on the left, editor and test runner on the right.",
    },
    {
      term: "The outcome",
      body:
        "Students practise where they read, and instructors open the day on a review queue with counts already attached — pending, passed and failed, per module.",
    },
  ],
  stats: [
    { value: "18", label: "Modules across six tracks" },
    { value: "3", label: "Difficulty tiers — easy · medium · hard" },
    { value: "1", accent: "×", label: "Submission per assessment, locked" },
    { value: "5", label: "Surfaces, two roles, one shell" },
  ],
};

/**
 * Five chapters, where the template's rhythm was drawn for four.
 *
 * Cream and near-black alternate from the brief (ink) down to the screens rail,
 * which the template always paints cream. An odd number of chapters flips that
 * parity, so exactly one pair has to double up. It doubles on ink at 04–05: two
 * cream sections meeting would merge into one long block, whereas a run of ink
 * is the page's own backdrop and already precedented by notes → outcome. It
 * also lands where the content agrees — 04 and 05 are both the instructor half
 * of the product, and reading them as one dark stretch is the honest grouping.
 */
export const chapters = [
  {
    id: "ch1",
    tone: "paper",
    num: "01",
    kicker: "Module catalog",
    title: "Eighteen modules, six tracks, one grid",
    lead: {
      before:
        "The front door for both roles. Track filters carry their own counts, and every card states its scope — ",
      em: "how long, how hard, who wrote it",
      after: " — before a student commits.",
    },
    figure: {
      src: asset("feat-catalog.png"),
      file: "feat-catalog.png",
      alt: "Module catalog — eighteen modules across six tracks",
      caption: "01 · Module catalog — track filters with live counts",
      ratio: PAGE,
      wide: true,
    },
    cards: [
      {
        num: "1.1",
        title: "Filters that count",
        body:
          "React (4), Node.js (4), JavaScript (4), Database (2), ORM (2), BMS (2) — the number is part of the filter.",
      },
      {
        num: "1.2",
        title: "Scope on the card",
        body:
          "Lesson and assessment counts sit under the description, so effort is visible from the grid.",
      },
      {
        num: "1.3",
        title: "Authored, not anonymous",
        body:
          "Every module credits its instructor — the same name a student will meet in the review queue.",
      },
      {
        num: "1.4",
        title: "One icon per track",
        body:
          "A fixed glyph and tag per track makes the grid scannable long before the titles are read.",
      },
    ],
  },
  {
    id: "ch2",
    tone: "ink",
    num: "02",
    kicker: "Module detail",
    title: "Lessons and assessments, side by side",
    lead:
      "A module opens as a syllabus: a numbered reading track on the left, graded challenges on the right, tagged easy through hard so students choose their next step instead of guessing it.",
    figure: {
      src: asset("feat-module.png"),
      file: "feat-module.png",
      alt:
        "Module detail — lessons on the left, difficulty-tiered assessments on the right",
      caption: "02 · Module detail — the ordered lesson track and its challenges",
      ratio: PAGE,
      wide: true,
    },
    cards: [
      {
        num: "2.1",
        title: "An ordered track",
        body:
          "Lessons are numbered, not a list — the sequence is the teaching, from intro to common mistakes.",
      },
      {
        num: "2.2",
        title: "Difficulty as a promise",
        body:
          "Easy, medium and hard are colour-coded once and used everywhere the assessment appears.",
      },
      {
        num: "2.3",
        title: "The brief up front",
        body:
          "What the module covers and who wrote it, above the fold — the pitch before the commitment.",
      },
      {
        num: "2.4",
        title: "Rules before the attempt",
        body:
          "One submission per assessment is stated on the syllabus, not discovered after submitting.",
      },
    ],
  },
  {
    id: "ch3",
    tone: "paper",
    num: "03",
    kicker: "Assessment workspace",
    title: "Write, run and submit in the browser",
    lead:
      "The brief, the API contract and a starter file sit beside a live editor. Students run their component against the module's tests, read the terminal, and only then lock in the one submission they get.",
    figure: {
      src: asset("feat-workspace.png"),
      file: "feat-workspace.png",
      alt: "Assessment workspace — instructions beside the code editor and terminal",
      caption: "03 · Assessment workspace — spec, editor, test runner",
      ratio: PAGE,
      wide: true,
    },
    cards: [
      {
        num: "3.1",
        title: "A spec, not a hint",
        body:
          "Endpoint, response shape and numbered requirements — the same contract the tests assert.",
      },
      {
        num: "3.2",
        title: "Starter scaffold",
        body:
          "The file opens with structure and TODOs, so the work is the logic — never the boilerplate.",
      },
      {
        num: "3.3",
        title: "Run before you submit",
        body:
          "Terminal and Tests share the bottom pane; the pass/fail line appears where the code was written.",
      },
      {
        num: "3.4",
        title: "One attempt, made obvious",
        body:
          "Once submitted, the header, the banner and the button all say the same thing.",
      },
    ],
  },
  {
    id: "ch4",
    tone: "ink",
    num: "04",
    kicker: "Instructor console",
    title: "Everything an instructor ships, in one list",
    lead:
      "The review backlog is the first thing on the page. Publish state, track tag and every row action — manage, grade, edit, unpublish, delete — stay one click away.",
    figure: {
      src: asset("feat-instructor.png"),
      file: "feat-instructor.png",
      alt: "Instructor console — my modules with publish state and row actions",
      caption: "04 · Instructor console — publish state and row actions",
      ratio: PAGE,
      wide: true,
    },
    cards: [
      {
        num: "4.1",
        title: "Backlog first",
        body:
          "“53 submissions waiting for review” sits under the title — the one number that sets the day.",
      },
      {
        num: "4.2",
        title: "Live or not, at a glance",
        body:
          "Publish state and track tag ride next to the title; unpublishing never means deleting.",
      },
      {
        num: "4.3",
        title: "Pending in the button",
        body:
          "Submissions carries both totals and an amber pending count, so triage happens on the list.",
      },
      {
        num: "4.4",
        title: "Destructive, and dressed as it",
        body:
          "Delete is the only filled red control on the page — every other action is quiet by default.",
      },
    ],
  },
  {
    id: "ch5",
    tone: "ink",
    num: "05",
    kicker: "Grading & review",
    title: "Grade with the whole picture in view",
    lead:
      "Per-module submissions roll up to total, pending, passed and failed — then filter by outcome, search a student, and open any attempt inline to read the code that was actually submitted.",
    figure: {
      src: asset("feat-grading.png"),
      file: "feat-grading.png",
      alt:
        "Grading and review — submission roll-up, outcome filters and inline review",
      caption: "05 · Grading & review — roll-up, filters, inline review",
      ratio: PAGE,
      wide: true,
    },
    cards: [
      {
        num: "5.1",
        title: "Four numbers, one row",
        body:
          "Total, pending, passed, failed — each card borrowing the colour it means everywhere else.",
      },
      {
        num: "5.2",
        title: "Filter, then find",
        body:
          "Outcome tabs, an assessment picker and a name-or-email search stack in that order.",
      },
      {
        num: "5.3",
        title: "Review without leaving",
        body:
          "Each row expands to the submitted code and a pass / fail decision, feedback optional.",
      },
      {
        num: "5.4",
        title: "Attempts keep their time",
        body:
          "Student, email, assessment and “16h ago” — enough context to grade in order.",
      },
    ],
  },
];

export const screens = {
  id: "shots",
  num: "06",
  kicker: "The screens",
  title: "Sign-in to graded, six screens",
  dragHint: "Drag or",
  railLabel: "LMS screens",
  /** A web product, so the shots wear browser windows rather than handsets. */
  frame: "browser",
  /** Page captures anchored to their first fold. */
  ratio: "16 / 10",
  items: [
    {
      code: "S.01",
      label: "Sign in",
      file: "scr-signin.png",
      src: asset("scr-signin.png"),
      alt: "Sign in screen",
      caption: "S.01 — Sign in · student or instructor",
    },
    {
      code: "S.02",
      label: "Module catalog",
      file: "scr-catalog.png",
      src: asset("scr-catalog.png"),
      alt: "Module catalog screen",
      caption: "S.02 — Module catalog · 18 modules, six tracks",
    },
    {
      code: "S.03",
      label: "Module detail",
      file: "scr-module.png",
      src: asset("scr-module.png"),
      alt: "Module detail screen",
      caption: "S.03 — Module detail · lessons and assessments",
    },
    {
      code: "S.04",
      label: "Assessment workspace",
      file: "scr-assess.png",
      src: asset("scr-assess.png"),
      alt: "Assessment workspace screen",
      caption: "S.04 — Assessment workspace · editor and test runner",
    },
    {
      code: "S.05",
      label: "Instructor console",
      file: "scr-instructor.png",
      src: asset("scr-instructor.png"),
      alt: "Instructor console screen",
      caption: "S.05 — Instructor console · my modules",
    },
    {
      code: "S.06",
      label: "Submissions",
      file: "scr-submissions.png",
      src: asset("scr-submissions.png"),
      alt: "Submissions and grading screen",
      caption: "S.06 — Submissions · inline review and grading",
    },
  ],
};

export const notes = {
  id: "notes",
  num: "07",
  kicker: "Design notes",
  title: "Decisions under the paint",
  items: [
    {
      code: "N.01",
      title: "One submission, said three times",
      body:
        "The lock appears on the syllabus, in the workspace banner and on the submit button itself. A rule that costs a student their only attempt should never be a surprise.",
    },
    {
      code: "N.02",
      title: "The scaffold is the lesson",
      body:
        "Every assessment opens with a structured file and TODO comments in the order the requirements are written, so the exercise is the logic — not remembering how to start a component.",
    },
    {
      code: "N.03",
      title: "Two roles, one shell",
      body:
        "Students and instructors share the same navigation, cards and status colours. The only difference is a badge and a Manage entry, so nothing has to be learned twice.",
    },
    {
      code: "N.04",
      title: "Counts before clicks",
      body:
        "Track filters, module rows and submission tabs all carry their own totals. Triage happens while reading the list, which is why the console needs no separate dashboard.",
    },
  ],
  poster: {
    src: asset("poster.png"),
    file: "poster.png",
    alt: "LMS poster — learn to code, one line at a time",
    caption: "Store listing art — learn to code, one line at a time",
    ratio: "1780 / 1956",
    figcaption: { code: "FIG.07", text: "Launch art" },
  },
};

export const outcome = {
  id: "outcome",
  num: "08",
  kicker: "Outcome",
  headline: "Read it, build it, submit it — one tab",
  body: {
    before:
      "Eighteen modules, three difficulty tiers and a single locked attempt per assessment, with the instructor's review queue attached to the same rows students submit into — ",
    em: "a course that grades itself into shape.",
  },
  stack: ["REACT", "NODE.JS", "EXPRESS", "MYSQL", "FIGMA"],
};

/** Order matters — the rail and the scroll spy both walk this top to bottom. */
export const chapterNav = [
  { id: "brief", label: "Brief" },
  { id: "ch1", label: "Catalog" },
  { id: "ch2", label: "Module" },
  { id: "ch3", label: "Workspace" },
  { id: "ch4", label: "Console" },
  { id: "ch5", label: "Grading" },
  { id: "shots", label: "Screens" },
  { id: "notes", label: "Notes" },
  { id: "outcome", label: "Outcome" },
];

export const caseLabel = "LMS — Case study N°05";
export const footerLabel = "Case study N°05 — LMS";

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
