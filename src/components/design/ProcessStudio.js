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

/** The illustrations run on the autoplay dwell, so a reader who lets the rail
 *  walk sees each one play out exactly once before the step changes. */
const ART_BEAT = `${CYCLE_MS / 1000}s`;

/** Stagger between the three asks on the Discover sheet. A delay is safe here
 *  because the rows share one keyframe: offsetting them cascades the sheet
 *  filling in and clearing out from the same number. */
const ASK_STEP = 0.3;

/** The Discover call, as the sheet it leaves behind. Two asks land on a number;
 *  the third is a feeling, so it is struck out rather than scored. */
const ASKS = [
  { q: "What breaks", v: "6 h / wk" },
  { q: "Who it hurts", v: "40 staff" },
  { q: "Feels dated", v: "—", cut: true },
];

/** Stagger between tables drawing onto the Architect sheet. */
const TABLE_STEP = 0.22;

/** The data model, with each table on its settled slot — `left` here is where
 *  Items ends up, and jp-arc-move starts it one slot back. The percentages are
 *  the field's own grid; see the jp-arc-* block in index.css before moving one,
 *  because the wires are ruled to these edges. */
const TABLES = [
  { name: "Users", left: "0%", top: "11%" },
  { name: "Orders", left: "68%", top: "11%" },
  { name: "Items", left: "68%", top: "61%", moves: true },
];

/** The backlog behind the Build panel. `top` is the slot each item ends the
 *  loop on, not the one it starts in — the steers are what put them there, so
 *  the shipped order (Sign-in, Roles, Refunds) is not the order this list was
 *  agreed in. `ship` is the wipe that rewrites a row from queued to shipped and
 *  `move` is how it gets to its slot; both are read against the slot
 *  percentages documented with the jp-spr-* keyframes in index.css. */
const BACKLOG = [
  { name: "Sign-in", tag: "v0.1", top: "0%", ship: "jp-spr-ship-a" },
  { name: "Roles & perms", tag: "v0.2", top: "26%", ship: "jp-spr-ship-b", move: "jp-spr-jump-a" },
  { name: "Refunds", tag: "v0.3", top: "52%", ship: "jp-spr-ship-c", move: "jp-spr-jump-b" },
  { name: "CSV export", top: "78%", move: "jp-spr-defer" },
];

/** The first week of real traffic, as a percentage of the chart's height. It
 *  climbs across the week because that is what a launch that went well looks
 *  like; the days arrive in order and only once the release is live. */
const WEEK = [36, 52, 71, 58, 84, 72, 96];

/** Staggers for the two sets on the launch panel that share a keyframe — the
 *  release checks and the days of traffic. Both are deliberately small: a
 *  delayed element's reset lands that much later in the loop, and jp-lch-clear
 *  only holds the panel dark for so long. See the jp-lch-* block in index.css
 *  before widening either. */
const CHECK_STEP = 0.28;
const DAY_STEP = 0.1;

const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

/**
 * The illustration beside each step, playing out what that step's copy claims
 * rather than decorating it: the loop should be readable as the same sentence
 * the panel on the left is making. Decorative — aria-hidden, and every
 * animation is gated on prefers-reduced-motion.
 */
function StepArt({ kind }) {
  const still = useReducedMotion();
  const anim = (value) => (still ? "none" : value);
  const a = color.accent;
  const capSx = { display: "flex", justifyContent: "space-between", ...label(9, ".2em"), color: color.faint };

  if (kind === "brief") {
    // One discovery call, in one loop: three asks arrive, two of them get a
    // number against them, the one nothing can measure is struck out before it
    // reaches the estimate, and what survives is highlighted as a single
    // measurable goal. The beats live with the jp-dsc-* keyframes in index.css;
    // each element's base style here is the state its keyframe resolves to, so
    // dropping the animation leaves the finished sheet.
    return (
      <Box aria-hidden sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "13px" }}>
        {ASKS.map(({ q, v, cut }, i) => {
          const at = `${(i * ASK_STEP).toFixed(2)}s`;
          return (
            <Box
              key={q}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                animation: anim(`jp-dsc-ask ${ART_BEAT} ${STEP_EASE} ${at} infinite both`),
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  opacity: cut ? 0.34 : 1,
                  animation: cut ? anim(`jp-dsc-cut ${ART_BEAT} ease ${at} infinite both`) : "none",
                }}
              >
                <Box
                  sx={{
                    ...label(9, ".14em"),
                    flex: "0 0 auto",
                    minWidth: "78px",
                    whiteSpace: "nowrap",
                    color: color.faint,
                  }}
                >
                  {q}
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    flex: 1,
                    minWidth: "24px",
                    height: "6px",
                    borderRadius: "3px",
                    // Nothing will ever fill the unmeasurable row, so its track
                    // reads as an empty slot rather than a bar waiting to load.
                    ...(cut
                      ? { border: "1px dashed rgba(255,255,255,.18)" }
                      : { bgcolor: "rgba(255,255,255,.07)", overflow: "hidden" }),
                  }}
                >
                  {!cut && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "3px",
                        background: a,
                        opacity: 0.8,
                        transformOrigin: "0 50%",
                        animation: anim(`jp-dsc-gauge ${ART_BEAT} cubic-bezier(.4,0,.2,1) ${at} infinite both`),
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    ...label(9.5, ".1em"),
                    flex: "0 0 auto",
                    minWidth: "52px",
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    color: cut ? color.faint : a,
                    // The dash is the answer, not a result, so it arrives with
                    // the question instead of landing on a gauge.
                    animation: cut ? "none" : anim(`jp-dsc-mark ${ART_BEAT} ${STEP_EASE} ${at} infinite both`),
                  }}
                >
                  {v}
                </Box>
              </Box>
              {cut && (
                // Outside the dimming wrapper: the cut itself stays legible.
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "50%",
                    height: "1px",
                    bgcolor: "rgba(255,255,255,.45)",
                    transformOrigin: "0 50%",
                    animation: anim(`jp-dsc-strike ${ART_BEAT} cubic-bezier(.5,0,.2,1) ${at} infinite both`),
                  }}
                />
              )}
            </Box>
          );
        })}
        <Box sx={{ mt: "3px", height: "1px", bgcolor: "rgba(255,255,255,.1)" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: "9px 12px",
            borderRadius: "8px",
            background: a,
            color: color.bg,
            ...label(9.5, ".2em"),
            animation: anim(`jp-dsc-goal ${ART_BEAT} ${STEP_EASE} infinite both`),
          }}
        >
          One measurable goal
        </Box>
        <Box sx={capSx}>
          <Box component="span">Ask</Box>
          <Box component="span" sx={{ color: a }}>
            Measure
          </Box>
          <Box component="span">Quote</Box>
        </Box>
      </Box>
    );
  }

  if (kind === "blueprint") {
    // The data model, drawn on paper and then revised: three tables land on the
    // grid, their relations are ruled in a segment at a time, and then one table
    // is moved to a new slot — the run stretches to follow it, and the slot it
    // left keeps the note of what that cost. All of it is still lines on paper,
    // which is the argument the step is making. Geometry and beats live with the
    // jp-arc-* keyframes in index.css.
    const wire = { position: "absolute", background: a, opacity: 0.55 };
    const tableSx = {
      position: "absolute",
      width: "32%",
      height: "28%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "4px",
      p: "0 8px",
      overflow: "hidden",
      borderRadius: "6px",
      border: "1px solid rgba(255,255,255,.15)",
      bgcolor: "rgba(255,255,255,.045)",
    };
    const fieldSx = { height: "2px", borderRadius: "1px", bgcolor: "rgba(255,255,255,.14)" };

    return (
      <Box aria-hidden sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "150px",
            // Grid paper, sized in percentages so its rules land on the same
            // lines the tables and wires are placed against.
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
            backgroundSize: "20% 25%",
          }}
        >
          {/* Before the tables, so a table passing over its old slot covers it. */}
          <Box
            sx={{
              position: "absolute",
              left: "34%",
              top: "61%",
              width: "32%",
              height: "28%",
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
              borderRadius: "6px",
              border: "1px dashed rgba(255,255,255,.22)",
              ...label(8, ".08em"),
              color: a,
              whiteSpace: "nowrap",
              opacity: 0,
              animation: anim(`jp-arc-ghost ${ART_BEAT} ease infinite both`),
            }}
          >
            1 afternoon
          </Box>

          <Box
            sx={{
              ...wire,
              left: "32%",
              top: "25%",
              width: "36%",
              height: "1px",
              transformOrigin: "0 50%",
              animation: anim(`jp-arc-line ${ART_BEAT} ${STEP_EASE} infinite both`),
            }}
          />
          <Box
            sx={{
              ...wire,
              left: "20%",
              top: "39%",
              width: "1px",
              height: "36%",
              transformOrigin: "50% 0",
              animation: anim(`jp-arc-drop ${ART_BEAT} ${STEP_EASE} infinite both`),
            }}
          />
          {/* The segment that pays for the move: it is ruled out to the old slot
              first, then stretches the rest of the way as the table travels. */}
          <Box
            sx={{
              ...wire,
              left: "20%",
              top: "75%",
              width: "48%",
              height: "1px",
              transformOrigin: "0 50%",
              animation: anim(`jp-arc-run ${ART_BEAT} ${STEP_EASE} infinite both`),
            }}
          />

          {TABLES.map(({ name, left, top, moves }, i) => {
            const at = `${(i * TABLE_STEP).toFixed(2)}s`;
            return (
              <Box
                key={name}
                sx={{
                  ...tableSx,
                  left,
                  top,
                  // Two animations, not one: the draw-in owns transform and
                  // opacity, the move owns `left`, so neither overwrites the
                  // other. Both carry this table's stagger.
                  animation: anim(
                    `jp-arc-card ${ART_BEAT} ${STEP_EASE} ${at} infinite both` +
                      (moves ? `, jp-arc-move ${ART_BEAT} cubic-bezier(.65,0,.35,1) ${at} infinite both` : "")
                  ),
                }}
              >
                <Box sx={{ ...label(8.5, ".16em"), color: color.dim, whiteSpace: "nowrap" }}>{name}</Box>
                <Box sx={{ ...fieldSx, width: "72%" }} />
                <Box sx={{ ...fieldSx, width: "46%" }} />
              </Box>
            );
          })}
        </Box>
        <Box sx={capSx}>
          <Box component="span">Draw</Box>
          <Box component="span" sx={{ color: a }}>
            Agree
          </Box>
          <Box component="span">Then build</Box>
        </Box>
      </Box>
    );
  }

  if (kind === "sprints") {
    // Three increments off one backlog, and the beat between them that the copy
    // is actually about. An increment rewrites a row in place — a wipe carries
    // it from queued to shipped, so the fill, the changelog line and the thing
    // you can click on staging are one gesture, landing at the right-hand end
    // as the increment closes. Then the checkpoint: a queued item jumps the one
    // above it, which changes what the next increment builds. Both jumps push
    // CSV export further down, so the last frame is a record in an order the
    // backlog never had. Beats and slot geometry live with the jp-spr-*
    // keyframes in index.css; each element's base style here is the state its
    // keyframe holds, so dropping the animation leaves the finished changelog.
    const face = { position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: "10px" };
    const rule = { position: "absolute", left: 0, right: 0, bottom: 0 };
    const nameSx = { ...label(9, ".12em"), flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden" };
    // Version numbers read as version numbers, so this is the one label in the
    // studio that keeps its lowercase.
    const tagSx = {
      ...label(8.5, ".08em"),
      textTransform: "none",
      flex: "0 0 auto",
      minWidth: "30px",
      textAlign: "right",
    };

    return (
      <Box aria-hidden sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Column headers in the body's own words, not the panel's chips — the
            chips already list the deliverables. */}
        <Box sx={{ display: "flex", justifyContent: "space-between", ...label(8.5, ".22em"), color: color.ghost }}>
          <Box component="span">What changed</Box>
          <Box component="span">On staging</Box>
        </Box>

        <Box sx={{ position: "relative", width: "100%", minHeight: "140px" }}>
          {BACKLOG.map(({ name, tag, top, ship, move }) => (
            <Box
              key={name}
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top,
                height: "22%",
                // Opaque plates in the panel's own colour, so the row jumping
                // the queue passes over the one it displaces rather than
                // ghosting through it. Only the deferred row travels underneath.
                bgcolor: color.bgAlt,
                zIndex: ship ? 2 : 1,
                animation: anim(
                  `jp-spr-row ${ART_BEAT} ease infinite both` +
                    (move ? `, ${move} ${ART_BEAT} ${STEP_EASE} infinite both` : "")
                ),
              }}
            >
              {/* The item as it sits in the backlog: no version, nothing to
                  open, and a dashed rule for work that has not happened. */}
              <Box sx={face}>
                <Box sx={{ ...nameSx, color: color.ghost }}>{name}</Box>
                <Box sx={{ ...tagSx, color: color.ghost }}>—</Box>
                <Box sx={{ width: 14, height: 14, flex: "0 0 auto" }} />
                <Box sx={{ ...rule, borderTop: "1px dashed rgba(255,255,255,.15)" }} />
              </Box>

              {/* The same row, rewritten. The wipe is the increment filling: it
                  brightens the name and rules the line in as it crosses, and
                  only reaches the version and the staging build at the end. */}
              {ship && (
                <Box
                  sx={{
                    ...face,
                    bgcolor: color.bgAlt,
                    animation: anim(`${ship} ${ART_BEAT} cubic-bezier(.4,0,.2,1) infinite both`),
                  }}
                >
                  <Box sx={{ ...nameSx, color: color.text }}>{name}</Box>
                  <Box sx={{ ...tagSx, color: a }}>{tag}</Box>
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      width: 14,
                      height: 14,
                      flex: "0 0 auto",
                      borderRadius: "4px",
                      background: a,
                      color: color.bg,
                      fontFamily: font.mono,
                      fontSize: "8px",
                      lineHeight: 1,
                    }}
                  >
                    ↗
                  </Box>
                  {/* "1px" as a string — a bare 1 here would be the full row. */}
                  <Box sx={{ ...rule, height: "1px", background: a, opacity: 0.7 }} />
                </Box>
              )}
            </Box>
          ))}

          {/* The checkpoint, marking the row that just jumped at the slot it
              jumped into. Above the plates, and transient — its base state is
              the hidden one, so the still frame is the record, not the moment. */}
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "26%",
              height: "22%",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              ...label(8, ".16em"),
              color: a,
              whiteSpace: "nowrap",
              opacity: 0,
              animation: anim(`jp-spr-steer ${ART_BEAT} ease infinite both`),
            }}
          >
            ↑ Steer
          </Box>
        </Box>

        <Box sx={capSx}>
          <Box component="span">Ship</Box>
          <Box component="span" sx={{ color: a }}>
            Steer
          </Box>
          <Box component="span">Ship again</Box>
        </Box>
      </Box>
    );
  }

  // launch — the step's three phases in the order it promises them, and not a
  // frame of them overlapping: the checklist has to be complete before the
  // release is allowed to run, the week of traffic does not start until it is
  // live, and the documentation crosses to the client's team only after that.
  // Then the part that makes this panel unlike the other three — everything
  // clears except the support light, so the loop rests on the window still
  // being open rather than on an empty stage. That asymmetry is the point of
  // the step, and it is written up with the jp-lch-* keyframes in index.css
  // along with the beats.
  const microSx = { ...label(8.5, ".2em"), color: color.ghost };

  return (
    <Box aria-hidden sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Everything the launch itself puts on screen. One keyframe clears the
          lot, which is why nothing inside carries a fade of its own — each
          element only has to reset, and does it behind this. */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          animation: anim(`jp-lch-clear ${ART_BEAT} ease infinite both`),
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Box component="span" sx={{ ...microSx, mr: "1px" }}>
              Checklist
            </Box>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  position: "relative",
                  width: 11,
                  height: 11,
                  flex: "0 0 auto",
                  borderRadius: "3px",
                  border: "1px solid rgba(255,255,255,.18)",
                }}
              >
                {/* Inset past the border so a ticked box reads as filled, not
                    as a fill sitting inside an outline. */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: "-1px",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "3px",
                    background: a,
                    color: color.bg,
                    fontFamily: font.mono,
                    fontSize: "8px",
                    lineHeight: 1,
                    animation: anim(
                      `jp-lch-tick ${ART_BEAT} ${STEP_EASE} ${(i * CHECK_STEP).toFixed(2)}s infinite both`
                    ),
                  }}
                >
                  ✓
                </Box>
              </Box>
            ))}
            <Box sx={{ flex: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                animation: anim(`jp-lch-live ${ART_BEAT} ease infinite both`),
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: a,
                  boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)",
                }}
              />
              <Box component="span" sx={{ ...label(8.5, ".2em"), color: a }}>
                Live
              </Box>
            </Box>
          </Box>

          {/* The week sits on the release rail rather than on a baseline of its
              own: the traffic is standing on the thing that shipped. */}
          <Box sx={{ mt: "13px", display: "flex", alignItems: "flex-end", gap: "6px", height: "44px" }}>
            {WEEK.map((h, i) => (
              <Box
                key={h}
                sx={{
                  flex: 1,
                  height: `${h}%`,
                  background: a,
                  opacity: 0.55,
                  transformOrigin: "50% 100%",
                  animation: anim(
                    `jp-lch-day ${ART_BEAT} ${STEP_EASE} ${(i * DAY_STEP).toFixed(2)}s infinite both`
                  ),
                }}
              />
            ))}
          </Box>
          <Box sx={{ position: "relative", height: "2px", bgcolor: "rgba(255,255,255,.1)" }}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: a,
                transformOrigin: "0 50%",
                animation: anim(`jp-lch-rail ${ART_BEAT} cubic-bezier(.4,0,.2,1) infinite both`),
              }}
            />
          </Box>
          <Box
            sx={{
              mt: "7px",
              display: "flex",
              justifyContent: "space-between",
              ...label(8, ".2em"),
              color: color.ghost,
              animation: anim(`jp-lch-live ${ART_BEAT} ease infinite both`),
            }}
          >
            <Box component="span">Day 1</Box>
            <Box component="span">Day 7</Box>
          </Box>
        </Box>

        {/* The handover: the documentation crosses the panel and the slot on
            the far side stops being a placeholder. */}
        <Box
          sx={{
            position: "relative",
            height: "22px",
            animation: anim(`jp-lch-hand ${ART_BEAT} ease infinite both`),
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              borderTop: "1px dashed rgba(255,255,255,.14)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: "54%",
              top: "1px",
              bottom: "1px",
              width: 17,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "3px",
              p: "0 3px",
              borderRadius: "3px",
              border: `1px solid ${a}`,
              bgcolor: color.bgAlt,
              animation: anim(`jp-lch-docs ${ART_BEAT} ${STEP_EASE} infinite both`),
            }}
          >
            {["100%", "70%", "85%"].map((w) => (
              // "1px" as a string — a bare 1 here would fill the card.
              <Box key={w} sx={{ width: w, height: "1px", background: a, opacity: 0.6 }} />
            ))}
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "38%",
              display: "grid",
              placeItems: "center",
              borderRadius: "6px",
              border: `1px solid ${a}`,
              bgcolor: color.bgAlt,
              ...label(8, ".18em"),
              color: a,
              whiteSpace: "nowrap",
              animation: anim(`jp-lch-team ${ART_BEAT} ease infinite both`),
            }}
          >
            Your team
          </Box>
        </Box>
      </Box>

      {/* Outside the group above, and the whole reason this panel ends the way
          it does: the launch clears around it and this stays lit. */}
      <Box
        sx={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          p: "6px 11px",
          borderRadius: "999px",
          border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
          animation: anim(`jp-lch-hold ${ART_BEAT} ease infinite both`),
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            flex: "0 0 auto",
            borderRadius: "50%",
            background: a,
            boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)",
          }}
        />
        <Box component="span" sx={{ ...label(8.5, ".2em"), color: "#C9C6C2" }}>
          Still reachable
        </Box>
      </Box>

      <Box sx={capSx}>
        <Box component="span">Release</Box>
        <Box component="span" sx={{ color: a }}>
          Watch
        </Box>
        <Box component="span">Then stay</Box>
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
