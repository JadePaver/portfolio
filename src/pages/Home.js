import { useCallback, useMemo, useState } from "react";
import { Box } from "@mui/material";
import Reveal from "../components/design/Reveal";
import Magnetic from "../components/design/Magnetic";
import Marquee from "../components/design/Marquee";
import HeroPortrait from "../components/design/HeroPortrait";
import AboutStage from "../components/design/AboutStage";
import ToolCloud from "../components/design/ToolCloud";
import Milestones from "../components/design/Milestones";
import ProjectsGrid from "../components/ProjectsGrid";
import { color, font, shell, EASE_CSS } from "../components/design/tokens";
import { site, socials } from "../components/design/site";

const asset = (path) => `${process.env.PUBLIC_URL}${path}`;

const CATEGORIES = ["All", "UI/UX", "Web Development", "Mobile App", "Project Management"];

const PROJECTS = [
  {
    title: "Ledger App",
    // The cover art is dark emerald with mint accents — the tint has to be
    // the app's own green, not the site orange, or every mark clashes.
    color: "#12B48F",
    image: asset("/images/ledger_cover.png"),
    category: ["UI/UX", "Mobile App", "Project Management"],
    cat: "Mobile App",
    motif: "bars",
    frame: "brackets",
    sig: "Balance pulse",
    scene: "finance",
    link: "/ledger",
    year: "2025",
    role: "Designer & developer",
    platform: "Android",
    summary:
      "A multi-wallet personal finance app for Android, with an AI assistant wired into real transaction data and offline-first sync for bills, debts, and savings goals.",
    problem:
      "Most budgeting apps assume one account and one balance, so anyone juggling cash, several bank accounts, and a shared fund forces everything into a single number. Recurring bills sit outside that balance as reminders, so the app can show ₱10,000 available while ignoring rent due next week.",
    build:
      "A multi-wallet Android app with full lifecycle tracking for bills, debts, and savings goals, and an Insights tab that turns raw history into one scannable page. The AI assistant gets a snapshot of real net balance, per-wallet totals, and recent transactions before every message, and everything syncs offline-first between device and cloud.",
    outcome:
      "The balance on screen is the one that is actually spendable, and the assistant can answer “how much did I spend on groceries last month” from the user's own data instead of generic advice.",
    tech: [
      { label: "Dart", icon: "dart.svg" },
      { label: "Android Studio", icon: "android_studio.svg" },
      { label: "Supabase", icon: "supabase.svg" },
    ],
  },
  {
    title: "Pasabay",
    // The cover is clean white with the app's golden amber on the logo, the
    // Featured Kitchen bar and the headline underline — the tint has to be
    // that amber, not a violet the artwork never uses.
    color: "#F5A814",
    image: asset("/images/pasabay_cover.png"),
    category: ["Mobile App", "UI/UX", "Project Management"],
    cat: "Mobile App",
    motif: "route",
    frame: "trace",
    sig: "Match route",
    scene: "delivery",
    link: "/pasabay",
    year: "2025",
    role: "Designer & developer",
    platform: "Android",
    summary:
      "A food ordering app built around home kitchens. Every cook gets a menu that resets daily, a live serving count, and delivery that starts on a map pin instead of a street address.",
    problem:
      "Home cooks already sell lutong bahay through Facebook posts and group chats. The cook posts a menu, then spends the afternoon reading comments to work out who ordered what and who has paid, while buyers comment “available pa?” and wait. Almost nobody gives directions by street number here — an address sounds like “near LBC, across the public market”.",
    build:
      "An app built around one batch rather than an endless menu. Available Serving sits next to the price and caps the order stepper at whatever is left, a two-day tab separates today from tomorrow, and delivery starts on a map pin with the landmarks people actually navigate by kept visible.",
    outcome:
      "An order can never be placed for food that was never cooked, so no cook has to message a buyer back to cancel — and riders get a pin instead of a landmark description.",
    tech: [
      { label: "Dart", icon: "dart.svg" },
      { label: "Android Studio", icon: "android_studio.svg" },
    ],
  },
  {
    title: "Aspentech",
    color: "#2F6FED",
    image: asset("/images/client_demo_cover.png"),
    category: ["UI/UX", "Web Development", "Project Management"],
    cat: "Web Development",
    motif: "stack",
    frame: "clamp",
    sig: "Config stack",
    scene: "customizer",
    link: "/aspentech",
    year: "2025",
    role: "Designer & developer",
    platform: "Web",
    summary:
      "A showcase site for an enterprise software agency. Buyers browse twelve shipped systems, repaint one with their own colors and modules live, then send a proposal carrying that exact setup.",
    problem:
      "The agency was pitching with slide decks and old screenshots, so a client had to picture their own branding on a system built for somebody else — and that gap is where most deals stalled. A plain contact form threw the context away, so the first call always started from zero.",
    build:
      "A catalog of twelve shipped systems grouped under Finance and Government, Operations, and Governance. The customizer lets a buyer set brand and accent colors, switch navigation between a sidebar, a top bar, or a rail, drag the corner radius, and toggle modules — then send a proposal that carries the setup with it.",
    outcome:
      "Buyers reach the first call having already seen the system in their own colors, and the proposal states which modules they picked.",
    tech: [
      { label: "React", icon: "react.svg" },
      { label: "TypeScript", icon: "typescript.svg" },
      { label: "Laravel", icon: "laravel.svg" },
      { label: "MUI", icon: "mui.svg" },
    ],
  },
  {
    title: "ICTD App",
    // The cover's own deep green, sampled from its sign-in button and globe.
    // Was #0E7C5A, which leaned teal toward the Ledger's mint family.
    color: "#1E8050",
    image: asset("/images/ictd_cover.png"),
    category: ["UI/UX", "Mobile App", "Web Development", "Project Management"],
    cat: "Web & Mobile",
    motif: "sprint",
    frame: "steps",
    sig: "Ticket flow",
    scene: "servicedesk",
    link: "/ictd",
    year: "2025",
    role: "Designer & developer",
    platform: "Web + Android",
    summary:
      "A service-desk platform in two halves: a Flutter app for field operators and a React admin dashboard for staff, both reading and writing the same live Supabase data.",
    problem:
      "Requests made over chat, email, or a walk-up desk leave no record of who asked, who is handling it, or whether it was ever resolved. A laptop left for repair is just as easy to lose track of once it leaves the owner's hands, and a paper log shows neither status nor who last touched it.",
    build:
      "One workflow on two surfaces: a Flutter app for clients and field operators, a React and TypeScript dashboard for desk staff, both against the same live Supabase data. Requests and repair items share a book-in to book-out lifecycle, and tapping a requester's name opens a direct thread with that person.",
    outcome:
      "Field work and desk work each get the posture that suits them without forking the implementation, so a fix lands once instead of three times.",
    tech: [
      { label: "Dart", icon: "dart.svg" },
      { label: "React", icon: "react.svg" },
      { label: "TypeScript", icon: "typescript.svg" },
      { label: "Supabase", icon: "supabase.svg" },
    ],
  },
  {
    title: "LMS",
    // Was #6C5CE7, the violet Pasabay's card also used before both were fixed.
    // The design gives every card its own colour, so the signature marks stay
    // distinguishable.
    color: "#C0553B",
    image: asset("/images/lms_cover.png"),
    category: ["UI/UX", "Web Development", "Project Management"],
    cat: "Web Development",
    motif: "grid",
    frame: "dots",
    sig: "Cohort grid",
    scene: "code",
    link: "/lms",
    year: "2025",
    role: "Designer & developer",
    platform: "Web",
    summary:
      "A coding education platform where instructors publish modules and grade real submissions, and students write, run, and ship code against module tests in an in-browser workspace.",
    problem:
      "On most course sites the lesson and the practice live in different places: a student reads about a concept, then opens a separate tool to write and test the code. Instructors need more than somewhere to post videos — they need to publish an assessment with a starter file and a brief, then see who passed without grading every attempt by hand.",
    build:
      "Eighteen modules across six tracks, each reading like a syllabus with the lessons down the left and graded challenges on the right. Students write, run, and submit code in the same window against module tests. The instructor console leads with the review backlog and rolls every submission up into total, pending, passed, and failed.",
    outcome:
      "Reading and coding happen without leaving the page, and an instructor can filter by outcome, narrow to one assessment, and open any attempt inline.",
    tech: [
      { label: "React", icon: "react.svg" },
      { label: "TypeScript", icon: "typescript.svg" },
      { label: "Node JS", icon: "nodejs.svg" },
    ],
  },
];

const STATS = [
  { value: "6+", label: "Years building" },
  { value: "20+", label: "Projects delivered" },
  { value: "3", label: "Platforms shipped" },
  { value: "<24h", label: "Reply time" },
];

// The note rides along as a tooltip and, once a token is clicked, as the
// readout under the tool cloud in About.
const MARQUEE = [
  { name: "TypeScript", note: "Typed everything · daily driver" },
  { name: "React", note: "Web interfaces · daily driver" },
  { name: "Laravel", note: "APIs and admin · daily driver" },
  { name: "PHP", note: "Server side · six years in" },
  { name: "Flutter", note: "Cross-platform apps · daily driver" },
  { name: "Dart", note: "App logic and state · daily driver" },
  { name: "Node.js", note: "Small services · working knowledge" },
  { name: "MySQL", note: "Schemas and queries · daily driver" },
  { name: "Supabase", note: "Auth, storage and realtime data · production" },
  { name: "MUI", note: "Component system for React dashboards · production" },
  { name: "Tailwind CSS", note: "Styling systems · production" },
  { name: "Figma", note: "Specs and handoff · comfortable" },
  { name: "Git", note: "Branches and reviews · daily driver" },
  { name: "REST APIs", note: "Contracts between layers · daily driver" },
];

// One entry drives three things: the row in the timeline, the chapter panel
// beside the portrait, and which card on the portrait wears the accent.
const MILESTONES = [
  {
    id: "start",
    year: "2020",
    label: "First line of code, age 16",
    detail: "A high school computer lab, a borrowed book, and a habit that never wore off.",
    capsule: { label: "Self-directed", year: "Since 2020" },
    chapter: {
      eyebrow: "2020",
      title: "Self-directed since 2020",
      body: "Every tool I use I taught myself first and got graded on later. Hand me an unfamiliar stack or a half-written spec and you won't be managing me through it.",
      stats: [
        { label: "Building since", value: "2020" },
        { label: "Learned by", value: "Self-taught" },
        { label: "Shipping", value: "6+ years", accent: true },
      ],
    },
  },
  {
    id: "degree",
    year: "2024",
    label: "BS Information Technology",
    detail: "Graduated while already shipping paid client work on the side.",
    capsule: { label: "Graduated", year: "2024" },
    chapter: {
      eyebrow: "2024",
      title: "BS Information Technology",
      body: "Graduated in 2024, already shipping paid client work on the side. The degree confirmed what the side projects had been teaching for years.",
      stats: [
        { label: "Degree", value: "BS Info Tech" },
        { label: "Finished", value: "2024", accent: true },
        { label: "Alongside", value: "Client work" },
      ],
    },
  },
  {
    id: "now",
    year: "Today",
    label: "Six years of shipping",
    detail: "Full delivery path: schema and API design, front end, mobile releases, handover.",
    capsule: { label: "Shipping since", year: "Six years" },
    chapter: {
      eyebrow: "Today",
      title: "Six years of shipping",
      body: "Working the full delivery path: schema and API design, front-end architecture, mobile releases, and the handover documentation that outlives the project.",
      stats: [
        { label: "Years", value: "6+", accent: true },
        { label: "Projects", value: "20+" },
        { label: "Reply time", value: "<24h" },
      ],
    },
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Architecture before features",
    body: "Clear boundaries and a normalized data model, so the tenth feature costs about what the first one did.",
  },
  {
    n: "02",
    title: "Ship small, ship often",
    body: "Working increments over big reveals. You see progress every week, not a surprise at the deadline.",
  },
  {
    n: "03",
    title: "Plain language, always",
    body: "Trade-offs explained without jargon, so non-technical stakeholders can make the call with real information.",
  },
];

// tier 3 = daily driver, 2 = shipped with it, 1 = still learning. The tier
// paints the chip; the note is what shows in the readout underneath.
const STACK = [
  { name: "TypeScript", tier: 3, note: "Typed front to back, no loose ends" },
  { name: "React", tier: 3, note: "Dashboards and client-facing interfaces" },
  { name: "Laravel", tier: 3, note: "APIs, auth, admin panels, queues" },
  { name: "PHP", tier: 3, note: "Server side of every project I have shipped" },
  { name: "Flutter", tier: 3, note: "Android and iOS from one codebase" },
  { name: "Dart", tier: 3, note: "App logic, state, and platform channels" },
  { name: "MySQL", tier: 3, note: "Schema design, migrations, query tuning" },
  { name: "Git", tier: 3, note: "Small commits, readable history, no force pushes" },
  { name: "Node.js", tier: 2, note: "Small services, scripts, build tooling" },
  { name: "Supabase", tier: 2, note: "Auth, storage, and realtime data on mobile" },
  { name: "MUI", tier: 2, note: "Component system behind the React dashboards" },
  { name: "Tailwind CSS", tier: 2, note: "Design tokens straight in the markup" },
  { name: "REST APIs", tier: 2, note: "Contracts other developers build against" },
  { name: "Figma", tier: 2, note: "Design review and developer handoff" },
  { name: "PostgreSQL", tier: 1, note: "Moving my MySQL habits across" },
  { name: "Docker", tier: 1, note: "Local environments that match production" },
  { name: "CI/CD", tier: 1, note: "Automating the release steps I still do by hand" },
  { name: "GraphQL", tier: 1, note: "Schema-first queries for client apps" },
  { name: "AWS", tier: 1, note: "Past shared hosting, one service at a time" },
];

const SERVICES = [
  {
    n: "01",
    title: "Web Development",
    body: "Six years of production web apps, from marketing sites to internal dashboards. Typed, reviewed, and documented so the next developer isn't guessing.",
    stack: "React · TypeScript · Laravel · Node.js",
  },
  {
    n: "02",
    title: "Mobile Apps",
    body: "Cross-platform apps in Flutter and Dart: one codebase, native feel, offline-first data, and store releases handled end to end.",
    stack: "Flutter · Dart · Supabase · Android Studio",
  },
  {
    n: "03",
    title: "UI/UX Design",
    body: "Interfaces designed in Figma by the same person who codes them, so what gets designed is what actually ships.",
    stack: "Figma · Prototypes · Design systems",
  },
  {
    n: "04",
    title: "Project Management",
    body: "Clear, structured coordination from planning to delivery: transparent communication, smooth workflows, and on-time execution at every stage.",
    stack: "Jira · Trello · Bitbucket",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Discover",
    body: "One call to define the outcome, the constraints, and what success looks like in numbers.",
  },
  {
    n: "02",
    title: "Architect",
    body: "Data model, API contracts, and screen flows agreed before a line of feature code exists.",
  },
  {
    n: "03",
    title: "Build",
    body: "Two-week increments, each ending in something you can click, with a written changelog.",
  },
  {
    n: "04",
    title: "Ship & support",
    body: "Release, monitor, hand over documentation, and stay reachable after launch.",
    last: true,
  },
];

// ---------------------------------------------------------------------------

const sectionSx = {
  scrollMarginTop: "84px",
  position: "relative",
};

const eyebrowSx = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

function Eyebrow({ number, children, onPaper = false }) {
  return (
    <Box sx={eyebrowSx}>
      <Box
        component="span"
        sx={{ fontFamily: font.mono, fontSize: "11px", letterSpacing: ".24em", color: color.accent }}
      >
        {number}
      </Box>
      <Box
        component="span"
        sx={{
          height: "1px",
          width: "44px",
          bgcolor: onPaper ? "rgba(0,0,0,.2)" : color.lineStrong,
        }}
      />
      <Box
        component="span"
        sx={{
          fontFamily: font.mono,
          fontSize: "11px",
          letterSpacing: ".24em",
          textTransform: "uppercase",
          color: onPaper ? "#6B665F" : color.dim,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

const headingSx = {
  m: 0,
  fontFamily: font.sans,
  fontSize: "clamp(30px, 3.9vw, 52px)",
  lineHeight: 1.02,
  letterSpacing: "-.04em",
  fontWeight: 800,
  color: color.headline,
  textWrap: "balance",
};

const serifEmSx = {
  fontFamily: font.serif,
  fontStyle: "italic",
  fontWeight: 400,
  color: color.accent,
};

const bodySx = {
  m: 0,
  fontSize: "15.5px",
  lineHeight: 1.75,
  color: color.body,
  textWrap: "pretty",
};

// ---------------------------------------------------------------------------

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copied, setCopied] = useState(false);
  const [chapterId, setChapterId] = useState("now");
  const [toolFlash, setToolFlash] = useState(null);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const chapterNumber = MILESTONES.findIndex((m) => m.id === chapterId) + 1;
  const chapter = MILESTONES[chapterNumber - 1] ?? MILESTONES[MILESTONES.length - 1];

  // Clicking the portrait walks forward through the chapters and wraps.
  const advanceChapter = useCallback(() => {
    setChapterId((prev) => {
      const i = MILESTONES.findIndex((m) => m.id === prev);
      return MILESTONES[(i + 1) % MILESTONES.length].id;
    });
  }, []);

  // A token in the ticker points at its chip in the tool cloud: scroll there,
  // then light it up long enough to be found by eye.
  const jumpToTool = useCallback((name) => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setToolFlash(name);
    setTimeout(() => setToolFlash((prev) => (prev === name ? null : prev)), 2400);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1900);
  }, []);

  const availability = site.openToWork ? "Available for new work" : "Booked, planning ahead";
  const items = useMemo(() => PROJECTS, []);

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <Box component="section" id="top" sx={{ ...sectionSx, pt: "clamp(120px, 15vw, 180px)" }}>
        <Box
          sx={{
            ...shell,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(430px, 100%), 1fr))",
            gap: "clamp(36px, 5vw, 72px)",
            alignItems: "center",
          }}
        >
          <Box>
            <Reveal sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Box
                component="span"
                aria-hidden
                sx={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: color.accent,
                  animation: "jp-pulse 2.4s infinite",
                }}
              />
              <Box
                component="span"
                sx={{
                  fontFamily: font.mono,
                  fontSize: "11px",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#9A9C9F",
                }}
              >
                {site.openToWork
                  ? "Open to roles & freelance work"
                  : "Currently booked, still happy to talk"}
              </Box>
            </Reveal>

            <Reveal
              component="p"
              delay={0.06}
              sx={{
                m: "26px 0 6px",
                fontFamily: font.mono,
                fontSize: "12px",
                letterSpacing: ".26em",
                textTransform: "uppercase",
                color: color.accent,
              }}
            >
              {site.name}
            </Reveal>

            <Reveal
              component="h1"
              delay={0.12}
              duration={0.9}
              y={22}
              sx={{
                m: 0,
                fontFamily: font.sans,
                fontSize: "clamp(46px, 7.4vw, 104px)",
                lineHeight: 0.86,
                letterSpacing: "-.045em",
                fontWeight: 800,
                color: color.headline,
                textWrap: "balance",
              }}
            >
              Software
              <br />
              Developer
            </Reveal>

            <Reveal
              component="p"
              delay={0.18}
              sx={{
                m: "20px 0 0",
                fontFamily: font.serif,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(21px, 2.3vw, 30px)",
                lineHeight: 1.25,
                color: "#CFCAC4",
                letterSpacing: "-.01em",
              }}
            >
              Turning complex problems into simple, maintainable code.
            </Reveal>

            <Reveal component="p" delay={0.24} sx={{ ...bodySx, mt: "24px", maxWidth: "52ch" }}>
              I build modern, efficient, user-focused digital solutions that turn ideas into
              scalable, production-ready products. Six years of shipping web and mobile applications
              with clean architecture, reliable data flows, and interfaces people don't have to
              think about.
            </Reveal>

            <Reveal
              delay={0.3}
              sx={{ display: "flex", flexWrap: "wrap", gap: "12px", mt: "32px" }}
            >
              <Magnetic
                component="a"
                href={`mailto:${site.email}`}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  bgcolor: color.accent,
                  color: color.bg,
                  borderRadius: "10px",
                  p: "15px 22px",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  textDecoration: "none",
                  "&:hover": { filter: "brightness(1.08)" },
                }}
              >
                Hire me
                <Box component="span" sx={{ fontFamily: font.mono, fontSize: "13px" }}>
                  →
                </Box>
              </Magnetic>

              <Magnetic
                component="button"
                type="button"
                onClick={() => scrollTo("work")}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  color: color.text,
                  background: "transparent",
                  border: `1px solid ${color.lineStrong}`,
                  borderRadius: "10px",
                  p: "15px 22px",
                  fontFamily: font.sans,
                  fontWeight: 600,
                  fontSize: "14.5px",
                  cursor: "pointer",
                  "&:hover": { borderColor: color.accent, color: color.accent },
                }}
              >
                See the work
              </Magnetic>
            </Reveal>

            <Reveal
              delay={0.36}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "22px",
                mt: "34px",
                pt: "24px",
                borderTop: `1px solid ${color.lineSoft}`,
              }}
            >
              {socials.map(({ label, url }) => (
                <Box
                  key={label}
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontFamily: font.mono,
                    fontSize: "11px",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "#8A8B8F",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,.14)",
                    pb: "3px",
                    transition: "color .2s, border-color .2s",
                    "&:hover": { color: color.accent, borderColor: color.accent },
                  }}
                >
                  {label}
                </Box>
              ))}
            </Reveal>
          </Box>

          <HeroPortrait src={asset("/images/me_no_shade1.png")} alt={site.name} />
        </Box>

        {/* Stats */}
        <Box sx={{ ...shell, mt: "clamp(48px, 7vw, 96px)" }}>
          <Reveal
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              borderTop: `1px solid ${color.line}`,
            }}
          >
            {STATS.map(({ value, label }, i) => (
              <Box
                key={label}
                sx={{
                  p: "26px 22px",
                  pl: i === 0 ? 0 : "22px",
                  pr: i === STATS.length - 1 ? 0 : "22px",
                  borderRight:
                    i === STATS.length - 1 ? "none" : `1px solid ${color.line}`,
                }}
              >
                <Box
                  sx={{
                    fontSize: "clamp(30px, 3.4vw, 44px)",
                    fontWeight: 800,
                    letterSpacing: "-.04em",
                    color: color.headline,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </Box>
                <Box
                  sx={{
                    mt: "8px",
                    fontFamily: font.mono,
                    fontSize: "10.5px",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: color.dim,
                  }}
                >
                  {label}
                </Box>
              </Box>
            ))}
          </Reveal>
        </Box>
      </Box>

      <Marquee items={MARQUEE} onSelect={jumpToTool} />

      {/* --------------------------------------------------------------- ABOUT */}
      <Box component="section" id="about" sx={{ ...sectionSx, py: "clamp(80px, 11vw, 150px)" }}>
        <Box sx={shell}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))",
              gap: "clamp(40px, 6vw, 84px)",
              alignItems: "start",
            }}
          >
            <Reveal duration={0.9} y={22} sx={{ position: "relative" }}>
              <AboutStage
                src={asset("/images/me_no_shade2.png")}
                alt={`${site.name} at graduation`}
                activeId={chapterId}
                chapterLabel={chapter.capsule.label}
                chapterYear={chapter.capsule.year}
                chapterIndex={`${chapterNumber}/${MILESTONES.length}`}
                onAdvance={advanceChapter}
                degree={{ title: "BS Information Technology", sub: "Class of 2024" }}
              />

              {/* Three chapters stacked in one cell, so swapping between them
                  never reflows the column underneath. */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 3,
                  maxWidth: 430,
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  mt: "2px",
                }}
              >
                {MILESTONES.map(({ id, chapter: ch }, i) => {
                  const on = id === chapterId;
                  return (
                    <Box
                      key={id}
                      aria-hidden={!on}
                      sx={{
                        gridArea: "1/1",
                        opacity: on ? 1 : 0,
                        transform: on ? "translateY(0)" : "translateY(9px)",
                        pointerEvents: on ? "auto" : "none",
                        transition: `opacity .42s ease, transform .55s ${EASE_CSS}`,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <Box
                          component="span"
                          sx={{ fontFamily: font.mono, fontSize: "11px", letterSpacing: ".2em", color: color.accent }}
                        >
                          {ch.eyebrow}
                        </Box>
                        <Box component="span" sx={{ height: "1px", width: "32px", bgcolor: color.lineStrong }} />
                        <Box
                          component="span"
                          sx={{
                            fontFamily: font.mono,
                            fontSize: "10px",
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            color: color.faint,
                          }}
                        >
                          Chapter {i + 1} of {MILESTONES.length}
                        </Box>
                      </Box>

                      <Box
                        component="h4"
                        sx={{
                          m: "13px 0 0",
                          fontSize: "20px",
                          fontWeight: 700,
                          letterSpacing: "-.025em",
                          lineHeight: 1.2,
                          color: color.title,
                        }}
                      >
                        {ch.title}
                      </Box>

                      <Box
                        component="p"
                        sx={{ m: "9px 0 0", fontSize: "14.5px", lineHeight: 1.65, color: color.muted, textWrap: "pretty" }}
                      >
                        {ch.body}
                      </Box>

                      <Box
                        sx={{
                          mt: "16px",
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(92px, 1fr))",
                          gap: "10px 12px",
                        }}
                      >
                        {ch.stats.map(({ label, value, accent }) => (
                          <Box
                            key={label}
                            sx={{
                              borderTop: `1px solid ${accent ? color.accent : "rgba(255,255,255,.12)"}`,
                              pt: "10px",
                              transition: "border-color .3s ease, background .3s ease",
                              "&:hover": {
                                borderTopColor: color.accent,
                                bgcolor: accent ? "rgba(255,106,26,.08)" : "rgba(255,255,255,.035)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                fontFamily: font.mono,
                                fontSize: "9px",
                                letterSpacing: ".18em",
                                textTransform: "uppercase",
                                color: color.faint,
                              }}
                            >
                              {label}
                            </Box>
                            <Box sx={{ mt: "5px", fontSize: "15px", fontWeight: 700, color: color.text }}>{value}</Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{ position: "relative", zIndex: 3, mt: "26px", maxWidth: 430 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <Box
                    sx={{
                      fontFamily: font.mono,
                      fontSize: "10px",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: color.faint,
                    }}
                  >
                    How I got here
                  </Box>
                  <Box
                    sx={{
                      fontFamily: font.mono,
                      fontSize: "9px",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: color.ghost,
                    }}
                  >
                    Hover the cards · click to pin
                  </Box>
                </Box>
                <Milestones items={MILESTONES} activeId={chapterId} onSelect={setChapterId} />
              </Box>

              <Box
                sx={{
                  position: "relative",
                  zIndex: 3,
                  mt: "26px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {["Based in the Philippines", "Remote-ready"].map((tag) => (
                  <Box
                    key={tag}
                    component="span"
                    sx={{
                      fontFamily: font.mono,
                      fontSize: "10.5px",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: color.dim,
                      border: "1px solid rgba(255,255,255,.12)",
                      borderRadius: "999px",
                      p: "7px 12px",
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Reveal>

            <Box>
              <Reveal>
                <Eyebrow number="01">About me</Eyebrow>
              </Reveal>

              <Reveal component="h2" delay={0.06} duration={0.85} y={20} sx={{ ...headingSx, mt: "20px" }}>
                I started programming at{" "}
                <Box component="em" sx={serifEmSx}>
                  16
                </Box>
                , and never stopped shipping.
              </Reveal>

              <Reveal component="p" delay={0.12} sx={{ ...bodySx, mt: "22px", maxWidth: "58ch" }}>
                I started programming at 16 in high school, and ever since then I've been committed
                to staying current with the technologies teams actually deploy. My passion for the
                tech industry lets me pick up new tools quickly and be productive in an unfamiliar
                codebase fast.
              </Reveal>

              <Reveal component="p" delay={0.16} sx={{ ...bodySx, mt: "16px", maxWidth: "58ch" }}>
                Today I work across the whole delivery path: schema and API design, front-end
                architecture, mobile releases, and the coordination that keeps a small team on a
                date it can defend.
              </Reveal>

              <Reveal delay={0.2} sx={{ mt: "34px", borderTop: `1px solid ${color.line}` }}>
                {PRINCIPLES.map(({ n, title, body }, i) => (
                  <Box
                    key={n}
                    sx={{
                      display: "flex",
                      gap: "18px",
                      p: "18px 0",
                      borderBottom:
                        i === PRINCIPLES.length - 1 ? "none" : `1px solid ${color.line}`,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontFamily: font.mono,
                        fontSize: "11px",
                        color: color.accent,
                        pt: "4px",
                      }}
                    >
                      {n}
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: color.title,
                          letterSpacing: "-.01em",
                        }}
                      >
                        {title}
                      </Box>
                      <Box
                        sx={{ mt: "5px", fontSize: "14px", lineHeight: 1.6, color: color.muted }}
                      >
                        {body}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Reveal>
            </Box>
          </Box>

          {/* The stack */}
          <Reveal
            id="tools"
            duration={0.85}
            y={20}
            sx={{
              mt: "clamp(48px, 6vw, 76px)",
              pt: "clamp(28px, 4vw, 40px)",
              borderTop: `1px solid ${color.line}`,
            }}
          >
            <ToolCloud items={STACK} flash={toolFlash} />
          </Reveal>
        </Box>
      </Box>

      {/* ------------------------------------------------------------ SERVICES */}
      <Box
        component="section"
        id="services"
        sx={{
          ...sectionSx,
          py: "clamp(70px, 9vw, 120px)",
          borderTop: `1px solid ${color.lineSoft}`,
          bgcolor: color.bgAlt,
        }}
      >
        <Box sx={shell}>
          <Reveal
            duration={0.85}
            y={20}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Eyebrow number="02">Services</Eyebrow>
              <Box component="h2" sx={{ ...headingSx, mt: "18px" }}>
                What I can take off your plate
              </Box>
            </Box>
            <Box
              component="p"
              sx={{
                m: 0,
                maxWidth: "40ch",
                fontSize: "15px",
                lineHeight: 1.7,
                color: color.muted,
                textWrap: "pretty",
              }}
            >
              UI/UX design, web and mobile development, and hands-on project coordination, from
              first sketch to production release.
            </Box>
          </Reveal>

          <Box
            sx={{
              mt: "clamp(36px, 5vw, 56px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(272px, 100%), 1fr))",
              gap: "18px",
            }}
          >
            {SERVICES.map(({ n, title, body, stack }, i) => (
              <Reveal
                key={n}
                delay={i * 0.06}
                y={22}
                sx={{
                  bgcolor: color.cardWarm,
                  border: `1px solid ${color.line}`,
                  borderRadius: "16px",
                  p: "28px 24px 26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  transition: `transform .3s ${EASE_CSS}, border-color .3s, background .3s`,
                  "&:hover": {
                    borderColor: color.accent,
                    bgcolor: color.cardWarmHover,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <Box
                    component="span"
                    sx={{
                      fontFamily: font.mono,
                      fontSize: "11px",
                      letterSpacing: ".2em",
                      color: color.accent,
                    }}
                  >
                    {n}
                  </Box>
                  <Box
                    component="span"
                    aria-hidden
                    sx={{ fontFamily: font.mono, fontSize: "16px", color: "#3E4147" }}
                  >
                    →
                  </Box>
                </Box>
                <Box
                  component="h3"
                  sx={{
                    m: 0,
                    fontSize: "20px",
                    fontWeight: 700,
                    letterSpacing: "-.02em",
                    color: color.title,
                  }}
                >
                  {title}
                </Box>
                <Box
                  component="p"
                  sx={{
                    m: 0,
                    fontSize: "14.5px",
                    lineHeight: 1.65,
                    color: color.muted,
                    textWrap: "pretty",
                  }}
                >
                  {body}
                </Box>
                <Box
                  sx={{
                    mt: "auto",
                    pt: "14px",
                    borderTop: `1px solid ${color.lineSoft}`,
                    fontFamily: font.mono,
                    fontSize: "10.5px",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: color.faint,
                  }}
                >
                  {stack}
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ---------------------------------------------------------------- WORK */}
      <Box
        component="section"
        id="work"
        sx={{
          ...sectionSx,
          py: "clamp(70px, 9vw, 120px)",
          bgcolor: color.paper,
          color: color.paperInk,
        }}
      >
        <Box sx={shell}>
          <Reveal duration={0.85} y={20}>
            <Eyebrow number="03" onPaper>
              Selected work
            </Eyebrow>
            <Box
              sx={{
                mt: "18px",
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Box component="h2" sx={{ ...headingSx, color: color.paperInk }}>
                Projects, with the{" "}
                <Box component="em" sx={serifEmSx}>
                  reasoning
                </Box>{" "}
                included
              </Box>
              <Box
                component="p"
                sx={{
                  m: 0,
                  maxWidth: "38ch",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: color.paperBody,
                  textWrap: "pretty",
                }}
              >
                Every card opens into the problem, what I built, and what changed after it shipped.
                Filter by discipline.
              </Box>
            </Box>
          </Reveal>

          <Box sx={{ mt: "34px" }}>
            <ProjectsGrid
              items={items}
              categoryValue={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categoryOptions={CATEGORIES}
            />
          </Box>
        </Box>
      </Box>

      {/* ------------------------------------------------------------- PROCESS */}
      <Box
        component="section"
        id="process"
        sx={{ ...sectionSx, py: "clamp(70px, 9vw, 120px)", bgcolor: color.bg }}
      >
        <Box sx={shell}>
          <Reveal>
            <Eyebrow number="04">How I work</Eyebrow>
          </Reveal>
          <Reveal
            component="h2"
            delay={0.06}
            duration={0.85}
            y={20}
            sx={{ ...headingSx, mt: "18px", maxWidth: "22ch" }}
          >
            Four steps, no surprises
          </Reveal>

          <Box
            sx={{
              mt: "clamp(36px, 5vw, 56px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))",
              gap: "1px",
              bgcolor: color.line,
              border: `1px solid ${color.line}`,
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {PROCESS.map(({ n, title, body, last }, i) => (
              <Reveal
                key={n}
                delay={i * 0.06}
                y={20}
                sx={{
                  bgcolor: color.bgAlt,
                  p: "30px 24px",
                  minHeight: 210,
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: last ? `2px solid ${color.accent}` : "none",
                }}
              >
                <Box
                  sx={{
                    fontSize: "44px",
                    fontWeight: 800,
                    letterSpacing: "-.05em",
                    color: last ? "rgba(255,106,26,.32)" : "rgba(255,255,255,.1)",
                    lineHeight: 1,
                  }}
                >
                  {n}
                </Box>
                <Box
                  component="h3"
                  sx={{
                    m: "14px 0 0",
                    fontSize: "18px",
                    fontWeight: 700,
                    letterSpacing: "-.02em",
                    color: color.title,
                  }}
                >
                  {title}
                </Box>
                <Box
                  component="p"
                  sx={{
                    m: "8px 0 0",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: color.muted,
                    textWrap: "pretty",
                  }}
                >
                  {body}
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ------------------------------------------------------------- CONTACT */}
      <Box
        component="section"
        id="contact"
        sx={{
          ...sectionSx,
          py: "clamp(80px, 11vw, 150px)",
          borderTop: `1px solid ${color.lineSoft}`,
          background: `radial-gradient(760px 420px at 50% 0%, rgba(255,106,26,.16), transparent 68%), ${color.bg}`,
          overflow: "hidden",
        }}
      >
        <Box sx={{ ...shell, textAlign: "center" }}>
          <Reveal
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: "999px",
              p: "8px 15px",
            }}
          >
            <Box
              component="span"
              aria-hidden
              sx={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: color.accent,
                animation: "jp-pulse 2.4s infinite",
              }}
            />
            <Box
              component="span"
              sx={{
                fontFamily: font.mono,
                fontSize: "10.5px",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#C9C6C2",
              }}
            >
              {availability}
            </Box>
          </Reveal>

          <Reveal
            component="h2"
            delay={0.06}
            duration={0.9}
            y={22}
            sx={{
              m: "26px auto 0",
              maxWidth: "18ch",
              fontSize: "clamp(38px, 6vw, 88px)",
              lineHeight: 0.92,
              letterSpacing: "-.045em",
              fontWeight: 800,
              color: color.headline,
              textWrap: "balance",
            }}
          >
            Let's create{" "}
            <Box component="em" sx={serifEmSx}>
              together
            </Box>
          </Reveal>

          <Reveal
            component="p"
            delay={0.12}
            sx={{ ...bodySx, m: "22px auto 0", maxWidth: "52ch", fontSize: "16px" }}
          >
            Have an idea, an open role, or a project that stalled? Send one message with the goal
            and the deadline. I'll reply within a day with an honest read on scope and how I'd
            approach it.
          </Reveal>

          <Reveal
            delay={0.18}
            sx={{
              mt: "36px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <Magnetic
              component="a"
              href={`mailto:${site.email}`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                bgcolor: color.accent,
                color: color.bg,
                borderRadius: "12px",
                p: "18px 26px",
                fontWeight: 700,
                fontSize: "16px",
                letterSpacing: "-.01em",
                textDecoration: "none",
                "&:hover": { filter: "brightness(1.08)" },
              }}
            >
              {site.email}
              <Box component="span" sx={{ fontFamily: font.mono, fontSize: "14px" }}>
                →
              </Box>
            </Magnetic>

            <Box
              component="button"
              type="button"
              onClick={copyEmail}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "transparent",
                color: color.text,
                border: `1px solid ${color.lineStrong}`,
                borderRadius: "12px",
                p: "18px 24px",
                fontFamily: font.mono,
                fontSize: "11.5px",
                fontWeight: 500,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color .2s, color .2s",
                "&:hover": { borderColor: color.accent, color: color.accent },
              }}
            >
              {copied ? "Copied to clipboard" : "Copy email address"}
            </Box>
          </Reveal>

          <Reveal
            delay={0.24}
            sx={{
              mt: "44px",
              pt: "26px",
              borderTop: `1px solid ${color.lineSoft}`,
              display: "flex",
              flexWrap: "wrap",
              gap: "26px",
              justifyContent: "center",
            }}
          >
            {socials.map(({ label, url }) => (
              <Box
                key={label}
                component="a"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontFamily: font.mono,
                  fontSize: "11px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "#8A8B8F",
                  textDecoration: "none",
                  transition: "color .2s",
                  "&:hover": { color: color.accent },
                }}
              >
                {label}
              </Box>
            ))}
          </Reveal>
        </Box>
      </Box>
    </>
  );
}
