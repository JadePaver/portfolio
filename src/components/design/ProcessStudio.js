/**
 * The "How I work" studio.
 *
 * Four steps on a rail with one of them open at a time. Autoplay walks them on
 * a 6.4s cadence and draws the countdown into the active step's rule; hovering
 * the block holds the walk where it is, hovering a step previews it, and
 * clicking one — or using the arrows — pins it and stops autoplay for good.
 *
 * The countdown is written straight to each fill's transform on a 90ms timer
 * rather than run as a CSS animation, because it has to pause mid-sweep and
 * resume from the same point. The timer paints every fill on each pass, not
 * just the active one, so no bar can keep a stale width from the previous lap.
 * Everything else about a fill — colour, opacity, easing — stays in sx.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { color, font, label } from "./tokens";

/** How long a step holds before autoplay moves on. */
const CYCLE_MS = 6400;

/** How often the countdown is repainted. Paired with the fill's .13s linear
 *  transition below, which smooths the gaps between writes. */
const TICK_MS = 90;

/** Below this the rail only responds to taps — there is no pointer to preview
 *  a step with, and previewing on touch would fire on the tap itself. */
const HOVER_WIDTH = 900;

/** The studio's own curve: a firmer settle than the page's EASE, so a step
 *  change lands rather than drifts. */
const STEP_EASE = "cubic-bezier(.22,1,.36,1)";

const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

/**
 * The illustration beside each step. Decorative — aria-hidden, and every
 * animation is gated on prefers-reduced-motion.
 */
function StepArt({ kind }) {
  const still = useReducedMotion();
  const anim = (value) => (still ? "none" : value);
  const a = color.accent;
  const capSx = { display: "flex", justifyContent: "space-between", ...label(9, ".2em"), color: color.faint };

  if (kind === "brief") {
    // A brief filling in line by line, then everything collapsing to one goal.
    return (
      <Box aria-hidden sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "11px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "11px" }}>
          {[92, 64, 78, 48].map((w, i) => (
            <Box
              key={w}
              sx={{
                position: "relative",
                height: "9px",
                width: `${w}%`,
                borderRadius: "3px",
                bgcolor: "rgba(255,255,255,.07)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: a,
                  opacity: 0.7,
                  transform: "translateX(-115%)",
                  animation: anim(`jp-wk-sweep 3.8s ease-in-out ${(i * 0.42).toFixed(2)}s infinite`),
                }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: "6px", height: "1px", bgcolor: "rgba(255,255,255,.1)" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Box
            sx={{
              flex: 1,
              height: "11px",
              borderRadius: "3px",
              background: a,
              animation: anim("jp-breathe 3s ease-in-out infinite"),
            }}
          />
          <Box sx={{ ...label(9.5, ".2em"), color: a, whiteSpace: "nowrap" }}>One goal</Box>
        </Box>
      </Box>
    );
  }

  if (kind === "blueprint") {
    // A schema being laid out on grid paper, with the axes drawn last.
    return (
      <Box aria-hidden sx={{ position: "relative", width: "100%", height: "100%", minHeight: "138px" }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <Box
              key={i}
              sx={{
                border: "1px solid rgba(255,255,255,.11)",
                borderRadius: "5px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: a,
                  opacity: 0.22,
                  animation: anim(`jp-wk-flash 2.4s ease-in-out ${(i * 0.17).toFixed(2)}s infinite alternate`),
                }}
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: "14%",
            right: "14%",
            top: "50%",
            height: "1px",
            background: a,
            opacity: 0.4,
            transformOrigin: "0 50%",
            transform: "scaleX(0)",
            animation: anim("jp-proc-fill 3.4s ease-in-out infinite"),
          }}
        />
        <Box
          sx={{ position: "absolute", top: "14%", bottom: "14%", left: "50%", width: "1px", background: a, opacity: 0.28 }}
        />
      </Box>
    );
  }

  if (kind === "sprints") {
    // Three increments filling one after another, each closing on a demo.
    return (
      <Box aria-hidden sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "13px" }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: "11px" }}>
              <Box sx={{ ...label(9, ".16em"), color: color.faint, width: "22px", flex: "0 0 auto" }}>S{i + 1}</Box>
              <Box
                sx={{
                  position: "relative",
                  flex: 1,
                  height: "11px",
                  borderRadius: "3px",
                  bgcolor: "rgba(255,255,255,.07)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: a,
                    opacity: 0.8,
                    transformOrigin: "0 50%",
                    transform: "scaleX(0)",
                    animation: anim(`jp-proc-fill 3.6s cubic-bezier(.4,0,.2,1) ${(i * 0.85).toFixed(2)}s infinite`),
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: 9,
                  height: 9,
                  flex: "0 0 auto",
                  transform: "rotate(45deg)",
                  background: a,
                  opacity: 0.2,
                  animation: anim(`jp-wk-flash 3.6s ease-in-out ${(i * 0.85 + 2.1).toFixed(2)}s infinite`),
                }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={capSx}>
          <Box component="span">Plan</Box>
          <Box component="span" sx={{ color: a }}>
            Demo
          </Box>
          <Box component="span">Changelog</Box>
        </Box>
      </Box>
    );
  }

  // launch — a release running out along the track while traffic comes in.
  return (
    <Box aria-hidden sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "22px" }}>
      <Box sx={{ position: "relative", height: "2px", bgcolor: "rgba(255,255,255,.1)" }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: a,
            opacity: 0.45,
            transformOrigin: "0 50%",
            transform: "scaleX(0)",
            animation: anim("jp-proc-fill 4.2s ease-in-out infinite"),
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            mt: "-5px",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: a,
            boxShadow: "0 0 0 5px color-mix(in srgb, var(--accent) 22%, transparent)",
            animation: anim("jp-wk-run 4.2s ease-in-out infinite"),
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "46px" }}>
        {Array.from({ length: 15 }, (_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: "100%",
              background: a,
              opacity: 0.22 + (i % 5) * 0.09,
              transformOrigin: "50% 100%",
              // Reduced motion still gets a skyline, just a frozen one.
              transform: still ? "scaleY(.5)" : undefined,
              animation: anim(
                `jp-wk-bar ${(1.1 + (i % 4) * 0.17).toFixed(2)}s ease-in-out ${(i * 0.06).toFixed(2)}s infinite alternate`
              ),
            }}
          />
        ))}
      </Box>
      <Box sx={capSx}>
        <Box component="span">Release</Box>
        <Box component="span" sx={{ color: a }}>
          Monitor
        </Box>
        <Box component="span">Handover</Box>
      </Box>
    </Box>
  );
}

/** One of the two arrows under the illustration. */
function StepArrow({ title, onClick, children }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={title}
      sx={{
        display: "grid",
        placeItems: "center",
        width: 38,
        height: 38,
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,.14)",
        background: "transparent",
        color: "#C9C6C2",
        fontFamily: font.mono,
        fontSize: "14px",
        cursor: "pointer",
        transition: "border-color .22s ease, color .22s ease, transform .22s ease",
        "&:hover": { borderColor: color.accent, color: color.accent },
        "&:active": { transform: "translateY(1px)" },
        "&:focus-visible": { outline: `2px solid ${color.accent}`, outlineOffset: 2 },
      }}
    >
      {children}
    </Box>
  );
}

/**
 * @param steps  `{ n, title, hint, dur, art, lede, body, out }` per step.
 * @param title  The section heading, rendered into the row that also carries
 *               the autoplay toggle — the toggle has to sit beside it, and its
 *               state belongs here rather than up in the page.
 */
export default function ProcessStudio({ steps, title }) {
  const still = useReducedMotion();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  const hostRef = useRef(null);
  const fillRefs = useRef([]);
  const stepRef = useRef(0);
  const holdRef = useRef(false);
  const elapsedRef = useRef(0);
  const startRef = useRef(0);

  const total = steps.length;
  const running = auto && !still;

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    startRef.current = now();
    const id = setInterval(() => {
      const host = hostRef.current;
      if (!host) return;

      const t = now();
      const box = host.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Only burn the clock while the block is actually on screen, so a step
      // never expires behind the reader's back.
      const seen = box.top < vh * 0.82 && box.bottom > vh * 0.24;

      if (!running || !seen || holdRef.current) {
        // Hold: keep the start point sliding forward so elapsed stays put.
        startRef.current = t - elapsedRef.current;
      } else {
        elapsedRef.current = t - startRef.current;
        if (elapsedRef.current >= CYCLE_MS) {
          elapsedRef.current = 0;
          startRef.current = t;
          setStep((prev) => (prev + 1) % total);
          return;
        }
      }

      const p = running ? Math.min(1, elapsedRef.current / CYCLE_MS) : 1;
      fillRefs.current.forEach((el, i) => {
        if (!el) return;
        const width = i < stepRef.current ? 1 : i === stepRef.current ? p : 0;
        el.style.transform = `scaleX(${width.toFixed(4)})`;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running, total]);

  /** Restart the countdown. `pin` means the reader chose this step, which ends
   *  autoplay — a hover preview leaves it alone. */
  const pick = useCallback((i, pin) => {
    elapsedRef.current = 0;
    startRef.current = now();
    setStep(i);
    if (pin) setAuto(false);
  }, []);

  const move = useCallback(
    (dir) => {
      elapsedRef.current = 0;
      startRef.current = now();
      setStep((prev) => (((prev + dir) % total) + total) % total);
      setAuto(false);
    },
    [total]
  );

  const toggle = useCallback(() => {
    elapsedRef.current = 0;
    startRef.current = now();
    setAuto((prev) => !prev);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    }
  };

  const enter = (delay) => (still ? "none" : `jp-proc-in .52s ${STEP_EASE} ${delay}s both`);
  const current = steps[Math.min(step, total - 1)];

  return (
    <Box
      ref={hostRef}
      onMouseEnter={() => {
        holdRef.current = true;
      }}
      onMouseLeave={() => {
        holdRef.current = false;
      }}
    >
      <Reveal
        delay={0.06}
        duration={0.85}
        y={20}
        sx={{
          mt: "18px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "16px 26px",
        }}
      >
        {title}
        <Box
          component="button"
          type="button"
          onClick={toggle}
          aria-pressed={auto}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            borderRadius: "999px",
            p: "10px 16px",
            ...label(10, ".2em"),
            background: "transparent",
            cursor: "pointer",
            border: `1px solid ${auto ? "rgba(255,255,255,.14)" : "color-mix(in srgb, var(--accent) 45%, transparent)"}`,
            color: auto ? color.dim : color.accent,
            transition: "color .25s ease, border-color .25s ease",
            "&:focus-visible": { outline: `2px solid ${color.accent}`, outlineOffset: 2 },
          }}
        >
          <Box
            component="span"
            aria-hidden
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              flex: "0 0 auto",
              background: auto ? color.accent : "rgba(255,255,255,.3)",
              animation: running ? "jp-pulse 2.4s infinite" : "none",
            }}
          />
          {auto ? "Autoplay" : "Paused"}
        </Box>
      </Reveal>

      <Reveal
        delay={0.12}
        onKeyDown={onKeyDown}
        y={20}
        sx={{
          mt: "clamp(32px, 4.4vw, 50px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 45%), 1fr))",
          gap: "14px 20px",
        }}
      >
        {steps.map((s, i) => {
          const on = i === step;
          const done = i < step;
          return (
            <Box
              key={s.n}
              component="button"
              type="button"
              onClick={() => pick(i, true)}
              onMouseEnter={() => {
                if (window.innerWidth >= HOVER_WIDTH) pick(i, false);
              }}
              onFocus={() => {
                if (window.innerWidth >= HOVER_WIDTH) pick(i, false);
              }}
              aria-current={on ? "step" : undefined}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                textAlign: "left",
                background: "transparent",
                border: 0,
                p: 0,
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                "&:focus-visible": { outline: `2px solid ${color.accent}`, outlineOffset: 3 },
              }}
            >
              <Box
                component="span"
                sx={{
                  position: "relative",
                  display: "block",
                  width: "100%",
                  height: "2px",
                  borderRadius: "2px",
                  bgcolor: "rgba(255,255,255,.1)",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="span"
                  ref={(el) => {
                    fillRefs.current[i] = el;
                  }}
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    // "100%", not 1 — a bare 1 in sx sizing means a fraction of
                    // the parent for height but a hairline is what we want to
                    // avoid here, so both ends are spelled out.
                    width: "100%",
                    borderRadius: "2px",
                    background: color.accent,
                    transformOrigin: "0 50%",
                    opacity: done ? 0.5 : 1,
                    // The timer owns this transform from the first tick; the
                    // value here is only what the bar shows before then.
                    transform: `scaleX(${done || (on && !running) ? 1 : 0})`,
                    transition: on
                      ? "transform .13s linear, opacity .3s ease"
                      : `transform .4s ${STEP_EASE}, opacity .3s ease`,
                  }}
                />
              </Box>
              <Box component="span" sx={{ display: "flex", alignItems: "baseline", gap: "10px", pt: "14px" }}>
                <Box
                  component="span"
                  sx={{
                    ...label(11, ".2em"),
                    color: on ? color.accent : done ? color.dim : "rgba(255,255,255,.26)",
                    transition: "color .3s ease",
                  }}
                >
                  {s.n}
                </Box>
                <Box
                  component="span"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    letterSpacing: "-.02em",
                    color: on ? color.title : color.muted,
                    transition: "color .3s ease",
                  }}
                >
                  {s.title}
                </Box>
              </Box>
              <Box
                component="span"
                sx={{
                  pt: "7px",
                  ...label(9.5, ".18em"),
                  color: on ? color.dim : color.ghost,
                  transition: "color .3s ease",
                }}
              >
                {s.hint}
              </Box>
            </Box>
          );
        })}
      </Reveal>

      <Reveal
        delay={0.18}
        y={20}
        sx={{
          mt: "clamp(24px, 3.2vw, 36px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))",
          gap: "1px",
          bgcolor: color.line,
          border: `1px solid ${color.line}`,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ bgcolor: color.bgAlt, p: "clamp(24px, 3vw, 34px)", display: "flex", flexDirection: "column" }}>
          {/* Keyed by step so React hands the browser a fresh element: the
              entrance keyframe is identical every time and would not otherwise
              replay on a step change. */}
          <Box key={step} sx={{ animation: enter(0) }}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: "13px" }}>
              <Box
                component="span"
                aria-hidden
                sx={{
                  fontSize: "clamp(38px, 4.6vw, 58px)",
                  fontWeight: 800,
                  letterSpacing: "-.05em",
                  lineHeight: 0.9,
                  color: "rgba(255,255,255,.11)",
                }}
              >
                {current.n}
              </Box>
              <Box
                component="h3"
                sx={{
                  m: 0,
                  fontSize: "clamp(20px, 2.3vw, 26px)",
                  fontWeight: 700,
                  letterSpacing: "-.025em",
                  color: color.title,
                }}
              >
                {current.title}
              </Box>
            </Box>
            <Box component="p" sx={{ m: "18px 0 0", fontSize: "16px", lineHeight: 1.6, color: "#CFCCC7", textWrap: "pretty" }}>
              {current.lede}
            </Box>
            <Box component="p" sx={{ m: "12px 0 0", fontSize: "14px", lineHeight: 1.65, color: color.muted, textWrap: "pretty" }}>
              {current.body}
            </Box>
          </Box>

          <Box sx={{ mt: "auto", pt: "24px" }}>
            <Box sx={{ pt: "18px", borderTop: `1px solid ${color.lineSoft}`, ...label(9.5, ".2em"), color: color.faint }}>
              You get
            </Box>
            <Box key={step} sx={{ mt: "13px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {current.out.map((o, i) => (
                <Box
                  component="span"
                  key={o}
                  sx={{
                    ...label(10.5, ".12em"),
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    p: "10px 13px",
                    borderRadius: "9px",
                    color: "#C9C6C2",
                    bgcolor: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.12)",
                    animation: enter(0.06 + i * 0.07),
                  }}
                >
                  {o}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{ bgcolor: color.bg, p: "clamp(24px, 3vw, 34px)", display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Box
            sx={{
              position: "relative",
              flex: 1,
              minHeight: "186px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "24px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,.07)",
              bgcolor: color.bgAlt,
              overflow: "hidden",
            }}
          >
            <StepArt key={current.art} kind={current.art} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px 26px",
            }}
          >
            <Box>
              <Box sx={{ ...label(9.5, ".2em"), color: color.faint }}>Typical duration</Box>
              <Box sx={{ mt: "5px", fontSize: "14px", fontWeight: 600, color: color.text }}>{current.dur}</Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <StepArrow title="Previous step" onClick={() => move(-1)}>
                ←
              </StepArrow>
              <Box component="span" sx={{ ...label(10.5, ".16em"), color: color.dim }}>
                {current.n} / 0{total}
              </Box>
              <StepArrow title="Next step" onClick={() => move(1)}>
                →
              </StepArrow>
            </Box>
          </Box>
        </Box>
      </Reveal>
    </Box>
  );
}
