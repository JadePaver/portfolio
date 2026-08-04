import { useCallback, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Reveal from "../../../components/design/Reveal";
import { site } from "../../../components/design/site";
import { useRouteTransition } from "../../../transitions/RouteTransition";

import { ChapterHead, Eyebrow, FeatureGrid } from "./Bits";
import {
  CaseHeader,
  CaseMark,
  ChapterRail,
  HEADER_OFFSET,
  ReadingBar,
  useActiveChapter,
} from "./Chrome";
import { CaseThemeContext } from "./context";
import Figure, { FigureCaption } from "./Figure";
import ZoomProvider, { useZoom } from "./Lightbox";
import NextCase from "./NextCase";
import ScreensRail, { StepButton } from "./ScreensRail";
import { seriesFor } from "./series";
import Ticker from "./Ticker";
import { caseVars } from "./themes";
import {
  ACCENT,
  ACCENT_SOFT,
  chapterTitle,
  EASE_CSS,
  font,
  hairlineGrid,
  ink,
  metaLabel,
  paper,
  sectionPad,
  shell,
} from "./tokens";

/** The quiet pair of footer controls: back to the grid, back a case study. */
const footerLinkSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: "9px",
  fontFamily: font.mono,
  fontSize: "10.5px",
  fontWeight: 600,
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: ink.text,
  bgcolor: "transparent",
  border: "1px solid rgba(255,255,255,.16)",
  p: "12px 16px",
  cursor: "pointer",
  transition: `border-color .25s ${EASE_CSS}, color .25s ${EASE_CSS}`,
  "&:hover": { borderColor: ACCENT, color: ACCENT },
  "&:focus-visible": { outline: `2px solid ${ACCENT}`, outlineOffset: 3 },
};

const MotionBox = motion(Box);

/** Reveals its child, or hands it over already in place. */
function MaybeReveal({ reveal, children, ...rest }) {
  if (!reveal) return children;
  return <Reveal {...rest}>{children}</Reveal>;
}

/**
 * The case-study template.
 *
 * One running order — hero, brief, four chapters, the screens rail, the notes
 * and the outcome — driven entirely by a content module and a theme. Both case
 * studies are the same design in two colourways, so the layout lives here once
 * and the colourway arrives as custom properties published on the outermost
 * element (see `themes.js`).
 *
 * The variables are set out here, outside the animated root, because the
 * lightbox is deliberately a sibling of that root rather than a descendant —
 * it has to stay undimmed while the page is leaving, and it must not inherit a
 * transform that would become its containing block.
 */
export default function CaseStudy({ theme, content }) {
  return (
    <CaseThemeContext.Provider value={theme}>
      <Box sx={caseVars(theme)}>
        <ZoomProvider>
          <CaseStudyBody theme={theme} content={content} />
        </ZoomProvider>
      </Box>
    </CaseThemeContext.Provider>
  );
}

function CaseStudyBody({ theme, content }) {
  const {
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
  } = content;

  // Where this case study sits in the numbered run, and therefore what "next"
  // means on it. Derived from the colourway's key rather than declared in the
  // content module: the sequence is a property of the series, not of any one
  // page in it. `null` only for a page built on the template but kept outside
  // the run, which then renders without the sequence navigation.
  const series = seriesFor(theme.key);

  const navigate = useNavigate();
  const { leaveProject, arrival, departing } = useRouteTransition();
  const reduceMotion = useReducedMotion();
  const zoom = useZoom();

  // Held in a ref so the identity is stable: `useActiveChapter` observes on a
  // dependency of this array, and a fresh one each render would tear down and
  // rebuild the observer on every scroll-driven update.
  const chapterIds = useRef(chapterNav.map((c) => c.id)).current;
  const activeChapter = useActiveChapter(chapterIds);

  // Captured on the first render and never updated: how this page was reached
  // decides how it opens, and that must not change under it when the flight
  // finishes a few hundred milliseconds later.
  const arrivedRef = useRef(arrival);
  const viaFlight = !reduceMotion && arrivedRef.current?.via === "flight";
  // Held back so the hero rises into the lifting plate rather than being
  // finished and static by the time it is uncovered.
  const intro = viaFlight ? arrivedRef.current.introDelay : 0;

  // The page paints itself over the whole viewport, so overscroll at either
  // end should show the case study's black rather than the default white.
  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = ink.bg;
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, []);

  const goToChapter = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion]
  );

  const goBack = () =>
    leaveProject ? leaveProject({ to: "/" }) : navigate("/");

  // The curtain caption is the link's own wording, so what the reader clicked
  // is what the transition says while it covers the screen.
  const goCase = (entry) => () =>
    leaveProject
      ? leaveProject({ to: entry.path, label: entry.label })
      : navigate(entry.path);

  /** A chapter's surface: cream chapters carry this case study's own cream. */
  const surface = (tone) =>
    tone === "paper" ? { bgcolor: theme.paperBg, color: paper.ink } : null;

  return (
    // No entrance slide, deliberately: the flight plate settles onto this
    // page's exact background before it lifts, so anything moving underneath
    // would show through the dissolve as a second, competing transition. The
    // page composes itself while it is still covered and is simply revealed.
    <MotionBox
      initial={{ opacity: 0 }}
      // The dim on the way out lives here rather than on the scrolling wrapper
      // below, so the fixed chrome goes with it instead of hanging solid over a
      // page that has already left. Opacity is safe on an ancestor of fixed
      // children — it makes a stacking context, not a containing block.
      animate={{ opacity: departing ? 0.3 : 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={
        departing
          ? { duration: 0.46, ease: [0.4, 0, 0.2, 1] }
          : { duration: 0.3, ease: "easeOut" }
      }
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflowX: "clip",
        fontFamily: font.sans,
        color: ink.text,
        background: theme.backdrop,
        "& ::selection": { background: ACCENT, color: ink.bg },
      }}
    >
      <ReadingBar />
      <CaseHeader
        label={caseLabel}
        next={series?.next}
        onBack={goBack}
        onNext={series && goCase(series.next)}
      />
      <ChapterRail
        chapters={chapterNav}
        activeId={activeChapter}
        onSelect={goToChapter}
      />

      {/* Everything below scrolls, and sinks as the curtain climbs over it, so
          leaving reads as the page being pushed off rather than just covered
          up. The root above supplies the dim; this only supplies the move.

          Three constraints shape it. The fixed chrome stays outside the
          wrapper, because a transform on their ancestor would become their
          containing block and drop them out of the viewport mid-exit. Nothing
          but opacity is animated while the page is staying put, because the
          sticky poster in the notes needs a transform-free ancestor to stick
          to. And the move is a plain translate rather than a scale — this
          wrapper is the height of the whole case study, so scaling it about any
          percentage origin would drag the visible region by tens of pixels, by
          an amount that changes with scroll depth. */}
      <MotionBox
        initial={false}
        animate={departing ? { y: 18 } : { opacity: 1 }}
        transition={{ duration: 0.46, ease: [0.4, 0, 0.2, 1] }}
      >

      {/* ---------------------------------------------------------------- Hero */}
      <Box component="section" id="top" sx={{ pt: "clamp(128px, 15vw, 176px)" }}>
        <Box sx={shell}>
          <Reveal delay={intro} duration={0.8}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "13px",
              }}
            >
              <Box
                component="span"
                sx={{
                  fontFamily: font.mono,
                  fontSize: "11px",
                  letterSpacing: ".24em",
                  color: ACCENT,
                }}
              >
                {hero.kicker}
              </Box>
              <Box
                aria-hidden
                component="span"
                sx={{ height: "1px", width: "44px", bgcolor: ink.lineStrong }}
              />
              <Box
                component="span"
                sx={{
                  fontFamily: font.mono,
                  fontSize: "11px",
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: ink.dim,
                }}
              >
                {hero.discipline}
              </Box>
              <Box
                component="span"
                sx={{
                  ml: "auto",
                  fontFamily: font.mono,
                  fontSize: "11px",
                  letterSpacing: ".24em",
                  color: ink.dim,
                }}
              >
                {hero.year}
              </Box>
            </Box>
          </Reveal>

          <Box sx={{ mt: "clamp(28px, 4vw, 44px)" }}>
            {/* `data-flight-title` is the landing pad for the transition's
                wordmark. Arriving that way, the heading is rendered static and
                already in place — the plate's wordmark flies onto it and then
                dissolves, so what looks like one moving object is really the
                hand-off between the two. Animating it here would fight that,
                so it only gets its own entrance on a direct visit. */}
            <MaybeReveal
              reveal={!viaFlight}
              delay={0.08}
              duration={0.9}
              y={22}
            >
              <Box
                component="h1"
                data-flight-title
                sx={{
                  m: 0,
                  fontSize: "clamp(58px, 10.5vw, 132px)",
                  fontWeight: 800,
                  letterSpacing: "-.045em",
                  lineHeight: 0.92,
                  color: ink.headline,
                  ...hero.titleSx,
                }}
              >
                {hero.title}
              </Box>
            </MaybeReveal>

            <Reveal delay={intro + 0.2} duration={0.85} y={18}>
              <Box
                sx={{
                  mt: "10px",
                  fontFamily: font.serif,
                  fontStyle: "italic",
                  fontSize: "clamp(24px, 3.4vw, 42px)",
                  lineHeight: 1.12,
                  color: ACCENT_SOFT,
                }}
              >
                {hero.tagline}
              </Box>
            </Reveal>
          </Box>

          <Box
            sx={{
              mt: "clamp(30px, 4.5vw, 52px)",
              display: "flex",
              flexWrap: "wrap",
              gap: "26px 60px",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Reveal delay={intro + 0.28} duration={0.85}>
              <Box
                component="p"
                sx={{
                  m: 0,
                  maxWidth: "56ch",
                  fontSize: "clamp(15.5px, 1.5vw, 17.5px)",
                  lineHeight: 1.7,
                  color: ink.lead,
                  textWrap: "pretty",
                }}
              >
                {hero.lead}
              </Box>
            </Reveal>

            <Reveal delay={intro + 0.36} duration={0.85} y={14}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  ...metaLabel,
                  fontSize: "9.5px",
                }}
              >
                <Box
                  aria-hidden
                  component="span"
                  sx={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    bgcolor: ACCENT,
                  }}
                />
                <span>{hero.scrollHint}</span>
              </Box>
            </Reveal>
          </Box>

          <Reveal
            delay={intro + 0.42}
            duration={0.85}
            y={18}
            sx={{ mt: "clamp(28px, 3.6vw, 42px)" }}
          >
            <Box sx={hairlineGrid("ink", "200px")}>
              {hero.meta.map(({ term, value }) => (
                <Box key={term} sx={{ bgcolor: ink.bg, p: "18px 20px" }}>
                  <Box sx={metaLabel}>{term}</Box>
                  <Box
                    sx={{
                      mt: "7px",
                      fontSize: "14.5px",
                      fontWeight: 600,
                      color: ink.text,
                    }}
                  >
                    {value}
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Reveal delay={intro + 0.48} duration={1} y={26} sx={{ mt: "clamp(30px, 4vw, 48px)" }}>
            <Figure figure={hero.figure} eager onZoom={zoom} />
          </Reveal>
        </Box>

        <Ticker text={tickerLine} color={theme.accentTicker} />
      </Box>

      {/* --------------------------------------------------------------- Brief */}
      <Box component="section" id={brief.id} sx={{ py: sectionPad }}>
        <Box sx={shell}>
          <ChapterHead
            num={brief.num}
            kicker={brief.kicker}
            title={brief.title}
            lead={brief.lead}
            titleSx={{
              maxWidth: "16ch",
              fontSize: "clamp(30px, 3.8vw, 50px)",
              lineHeight: 1.02,
              letterSpacing: "-.04em",
            }}
          />

          <Reveal delay={0.1} duration={0.85} y={20} sx={{ mt: "clamp(26px, 3.4vw, 40px)" }}>
            <Box sx={hairlineGrid("ink", "280px")}>
              {brief.panels.map(({ term, body }) => (
                <Box
                  key={term}
                  sx={{ bgcolor: ink.card, p: "clamp(22px, 2.6vw, 30px)" }}
                >
                  <Box
                    sx={{
                      fontFamily: font.mono,
                      fontSize: "9.5px",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: ACCENT,
                    }}
                  >
                    {term}
                  </Box>
                  <Box
                    component="p"
                    sx={{
                      m: "11px 0 0",
                      fontSize: "14.5px",
                      lineHeight: 1.7,
                      color: ink.body,
                      textWrap: "pretty",
                    }}
                  >
                    {body}
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>

          <Reveal delay={0.14} duration={0.85} y={20} sx={{ mt: "clamp(26px, 3.4vw, 40px)" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))",
                gap: "22px 30px",
              }}
            >
              {brief.stats.map((stat) => (
                <Box
                  key={stat.label}
                  sx={{ borderTop: "1px solid rgba(255,255,255,.14)", pt: "15px" }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      gap: stat.spaced ? "0.28em" : 0,
                      fontSize: "clamp(30px, 3.2vw, 42px)",
                      fontWeight: 800,
                      letterSpacing: "-.04em",
                      color: ink.headline,
                    }}
                  >
                    {stat.value && <span>{stat.value}</span>}
                    {stat.accent && (
                      <Box component="span" sx={{ color: ACCENT }}>
                        {stat.accent}
                      </Box>
                    )}
                    {stat.after && <span>{stat.after}</span>}
                  </Box>
                  <Box
                    sx={{
                      mt: "6px",
                      ...metaLabel,
                      fontSize: "9.5px",
                      letterSpacing: ".18em",
                      color: ink.dim,
                    }}
                  >
                    {stat.label}
                  </Box>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>
      </Box>

      {/* ------------------------------------------------------ Chapters 01–04 */}
      {chapters.map((chapter) => (
        <Box
          key={chapter.id}
          component="section"
          id={chapter.id}
          sx={{ py: sectionPad, ...surface(chapter.tone) }}
        >
          <Box sx={shell}>
            <ChapterHead
              num={chapter.num}
              kicker={chapter.kicker}
              title={chapter.title}
              lead={chapter.lead}
              tone={chapter.tone}
            />

            <Reveal
              delay={0.08}
              duration={0.95}
              y={24}
              sx={{ mt: "clamp(24px, 3.2vw, 38px)" }}
            >
              <Figure figure={chapter.figure} tone={chapter.tone} onZoom={zoom} />
            </Reveal>

            <FeatureGrid cards={chapter.cards} tone={chapter.tone} />

            {/* A chapter can close on a second plate — the one exhibit that
                only makes sense once the four cards have been read. */}
            {chapter.figureAside && (
              <Reveal
                delay={0.16}
                duration={0.95}
                y={22}
                sx={{ mt: "clamp(22px, 3vw, 34px)" }}
              >
                <Figure
                  figure={chapter.figureAside}
                  tone={chapter.tone}
                  onZoom={zoom}
                >
                  <FigureCaption
                    code={chapter.figureAside.figcaption.code}
                    text={chapter.figureAside.figcaption.text}
                    tone={chapter.tone}
                  />
                </Figure>
              </Reveal>
            )}
          </Box>
        </Box>
      ))}

      {/* ------------------------------------------------------------- Screens */}
      <Box
        component="section"
        id={screens.id}
        sx={{ py: sectionPad, ...surface("paper") }}
      >
        <ScreensRail
          shots={screens.items}
          ratio={screens.ratio}
          frame={screens.frame}
          label={screens.railLabel}
          onZoom={zoom}
          header={({ step }) => (
            <Box sx={shell}>
              <Reveal duration={0.8}>
                <Eyebrow num={screens.num} tone="paper">
                  {screens.kicker}
                </Eyebrow>
              </Reveal>

              <Reveal delay={0.06} duration={0.85}>
                <Box
                  sx={{
                    mt: "18px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "16px 30px",
                  }}
                >
                  <Box
                    component="h2"
                    sx={{ ...chapterTitle("paper"), maxWidth: "16ch" }}
                  >
                    {screens.title}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Box
                      sx={{
                        ...metaLabel,
                        fontSize: "9.5px",
                        letterSpacing: ".18em",
                        color: paper.muted,
                      }}
                    >
                      {screens.dragHint}
                    </Box>
                    <StepButton onClick={() => step(-1)} label="Scroll screens back">
                      ←
                    </StepButton>
                    <StepButton onClick={() => step(1)} label="Scroll screens forward">
                      →
                    </StepButton>
                  </Box>
                </Box>
              </Reveal>
            </Box>
          )}
        />
      </Box>

      {/* --------------------------------------------------------------- Notes */}
      <Box component="section" id={notes.id} sx={{ py: sectionPad }}>
        <Box sx={shell}>
          <Reveal duration={0.8}>
            <Eyebrow num={notes.num}>{notes.kicker}</Eyebrow>
          </Reveal>

          <Box
            sx={{
              mt: "clamp(24px, 3.2vw, 38px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
              gap: "clamp(28px, 4vw, 64px)",
            }}
          >
            <Box>
              <Reveal duration={0.85}>
                <Box component="h2" sx={{ ...chapterTitle("ink"), maxWidth: "14ch" }}>
                  {notes.title}
                </Box>
              </Reveal>

              <Reveal
                delay={0.08}
                duration={0.85}
                y={20}
                sx={{
                  mt: "clamp(22px, 3vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {notes.items.map((note, i) => (
                  <Box
                    key={note.code}
                    sx={{
                      py: "20px",
                      display: "flex",
                      gap: "18px",
                      borderTop: `1px solid rgba(255,255,255,.12)`,
                      ...(i === notes.items.length - 1 && {
                        borderBottom: "1px solid rgba(255,255,255,.12)",
                      }),
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        flex: "0 0 38px",
                        pt: "4px",
                        fontFamily: font.mono,
                        fontSize: "10px",
                        letterSpacing: ".16em",
                        color: ACCENT,
                      }}
                    >
                      {note.code}
                    </Box>
                    <Box>
                      <Box
                        component="h3"
                        sx={{
                          m: 0,
                          fontSize: "16.5px",
                          fontWeight: 700,
                          letterSpacing: "-.02em",
                          color: ink.title,
                        }}
                      >
                        {note.title}
                      </Box>
                      <Box
                        component="p"
                        sx={{
                          m: "8px 0 0",
                          fontSize: "14px",
                          lineHeight: 1.7,
                          color: ink.muted,
                          textWrap: "pretty",
                        }}
                      >
                        {note.body}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Reveal>
            </Box>

            {/* The sticky lives on the reveal wrapper, not the figure: it has
                to be the direct child of the (full-height) grid column to have
                any room to travel against the notes beside it.

                A case study may hang a second plate here. It goes inside the
                sticky wrapper rather than below it, so the pair travels as one
                block — left in the flow it would scroll up underneath the
                stuck figure, which paints over it by virtue of being
                positioned. */}
            <Box>
              <Reveal
                delay={0.05}
                duration={0.95}
                y={22}
                sx={{ position: "sticky", top: "96px" }}
              >
                <Figure figure={notes.poster} onZoom={zoom}>
                  <FigureCaption
                    code={notes.poster.figcaption.code}
                    text={notes.poster.figcaption.text}
                  />
                </Figure>

                {notes.posterAside && (
                  <Figure
                    figure={notes.posterAside}
                    onZoom={zoom}
                    sx={{ mt: "clamp(18px, 2.4vw, 26px)" }}
                  >
                    <FigureCaption
                      code={notes.posterAside.figcaption.code}
                      text={notes.posterAside.figcaption.text}
                    />
                  </Figure>
                )}
              </Reveal>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ------------------------------------------------------------- Outcome */}
      <Box
        component="section"
        id={outcome.id}
        sx={{
          pt: sectionPad,
          pb: "clamp(50px, 6vw, 80px)",
          borderTop: `1px solid ${ink.lineSoft}`,
        }}
      >
        <Box sx={shell}>
          <Reveal duration={0.8}>
            <Eyebrow num={outcome.num}>{outcome.kicker}</Eyebrow>
          </Reveal>

          <Reveal delay={0.06} duration={0.9} y={20} sx={{ mt: "clamp(24px, 3.2vw, 38px)" }}>
            <Box
              sx={{
                maxWidth: "24ch",
                fontSize: "clamp(34px, 5vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-.04em",
                fontWeight: 800,
                color: ink.headline,
              }}
            >
              {outcome.headline}
              <Box component="span" sx={{ color: ACCENT }}>
                .
              </Box>
            </Box>

            <Box
              component="p"
              sx={{
                m: "clamp(18px, 2.4vw, 26px) 0 0",
                maxWidth: "60ch",
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.75,
                color: ink.lead,
                textWrap: "pretty",
              }}
            >
              {outcome.body.before}
              <Box
                component="span"
                sx={{
                  fontFamily: font.serif,
                  fontStyle: "italic",
                  color: ACCENT_SOFT,
                }}
              >
                {outcome.body.em}
              </Box>
            </Box>

            <Box
              sx={{
                mt: "clamp(22px, 3vw, 30px)",
                display: "flex",
                flexWrap: "wrap",
                gap: "9px",
              }}
            >
              {outcome.stack.map((tech) => (
                <Box
                  key={tech}
                  component="span"
                  sx={{
                    fontFamily: font.mono,
                    fontSize: "10px",
                    letterSpacing: ".14em",
                    color: ink.lead,
                    border: "1px solid rgba(255,255,255,.16)",
                    p: "8px 13px",
                  }}
                >
                  {tech}
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>
      </Box>

      {/* ----------------------------------------------------------- Next case */}
      {series && <NextCase entry={series.next} onGo={goCase(series.next)} />}

      {/* -------------------------------------------------------------- Footer */}
      <Box component="footer" sx={{ borderTop: `1px solid ${ink.lineSoft}` }}>
        <Box sx={{ ...shell, py: "clamp(40px, 5vw, 60px)" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "18px 30px",
            }}
          >
            <Box>
              <Box sx={{ ...metaLabel, fontSize: "9.5px" }}>
                Have a product like this in mind?
              </Box>
              <Box
                component="a"
                href={`mailto:${site.email}`}
                sx={{
                  display: "inline-block",
                  mt: "9px",
                  fontSize: "clamp(19px, 2.4vw, 27px)",
                  fontWeight: 700,
                  letterSpacing: "-.025em",
                  color: ink.headline,
                  textDecoration: "none",
                  transition: "color .25s ease",
                  "&:hover": { color: ACCENT },
                }}
              >
                {site.email} ↗
              </Box>
            </Box>

            {/* The forward move is the plate above; these two are the ways
                back, so they are the quiet pair rather than a second shout. */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Box component="button" type="button" onClick={goBack} sx={footerLinkSx}>
                <span aria-hidden>←</span>
                <span>All work</span>
              </Box>

              {series && (
                <Box
                  component="button"
                  type="button"
                  onClick={goCase(series.prev)}
                  aria-label={`${series.prev.word} case — ${series.prev.name}`}
                  sx={footerLinkSx}
                >
                  <span aria-hidden>←</span>
                  <span>{series.prev.label}</span>
                </Box>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              mt: "clamp(28px, 3.6vw, 42px)",
              pt: "18px",
              borderTop: `1px solid ${ink.lineSoft}`,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px 24px",
              ...metaLabel,
              color: ink.fine,
            }}
          >
            <span>© {new Date().getFullYear()} {site.name}</span>
            <Box
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <CaseMark size={12} />
              <span>{footerLabel}</span>
            </Box>
          </Box>
        </Box>
      </Box>
      </MotionBox>
    </MotionBox>
  );
}
