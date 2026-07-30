/**
 * Per-project dioramas for the work cards.
 *
 * Each scene stages the project itself around its card: the Ledger runs a
 * full money cycle on a single choreographed clock (see LedgerScene); the
 * Pasabay card plays one day of a home kitchen — an order docks into the
 * batch chip, the serving count ticks down, the delivery rides the card
 * edge to the drop-off pin, and the daily menu reset re-arms the batch;
 * the Aspentech card plays a buyer's customizer session — a swatch pick
 * repaints the cover with a wash of light, the nav chrome flows around
 * the card's corner, and a SENT seal stamps the proposal on its way out;
 * the ICTD card books a faulted asset in and out of the department — its
 * telemetry flatlines amber, the custody tag changes slots, and the repair
 * sends the rail light home green; the LMS holds the entire card inside a
 * pair of giant braces.
 *
 * The layer mounts OUTSIDE the card's overflow clip (see ProjectCard), so
 * elements straddle the card boundary — chips sit half on / half off the
 * edge, and the perimeter travelers ride the outline itself, inside and
 * outside at once. Everything is decorative: aria-hidden, pointer-events
 * none, and frozen (or removed, for elements that only exist mid-flight)
 * under prefers-reduced-motion.
 *
 * Generic keyframes (jp-sc-*) live in index.css; tinted styling is inline.
 */

import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { font, rgbChannels } from "./tokens";

export const SCENE_KINDS = ["finance", "delivery", "customizer", "servicedesk", "code"];

// The shared glass chip — same language as the hero's fact card.
const chip = {
  position: "absolute",
  bgcolor: "rgba(13,15,18,.92)",
  border: "1px solid rgba(255,255,255,.16)",
  borderRadius: "10px",
  boxShadow: "0 14px 30px rgba(0,0,0,.5)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};

const label = {
  fontFamily: font.mono,
  fontSize: 8,
  letterSpacing: ".18em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,.6)",
  lineHeight: 1,
};

/**
 * Sends its child on laps of the card outline. A negative delay starts the
 * lap mid-route, so multiple cards don't tour in sync. Nothing to show when
 * frozen — a parked traveler is just clutter.
 */
function Tourer({ duration = 16, delay = 0, reverse = false, still, children }) {
  if (still) return null;
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        animation: `jp-sc-tour ${duration}s linear ${delay}s infinite ${reverse ? "reverse" : "normal"}`,
      }}
    >
      <Box sx={{ transform: "translate(-50%,-50%)" }}>{children}</Box>
    </Box>
  );
}

/* ---------------------------------------------------------------- Ledger */

/**
 * The Ledger machine.
 *
 * The card's border is the ledger's rail. Money never flies over the cover
 * as an object — it flows along the edge as a streak of light: out of the
 * payday pill, around the corner and down into the balance chip; then, on
 * the debit beat, around the bottom of the card and up into the bill chip.
 * One 12s clock (LEDGER_BEAT) drives the streak, the digit rolls, the chip
 * swells and the status flips, so the scene plays as cause and effect —
 * ₱250 in, ₱250 out, ending the cycle exactly where it began.
 *
 * The beat percentages live with the jp-led-* keyframes in index.css. The
 * rail is traced counter-clockwise from the payday pill with pathLength
 * 100; stations sit at path units 0 (payday), 23 (balance), 79 (bill) —
 * move a chip and those constants move with it.
 *
 * Everything is tuned to the Ledger cover: near-black glass, the app's own
 * mint (#12B48F via the project tint) in every border and accent, amber
 * only for the "due" state — the same trio the cover itself uses.
 */
const LEDGER_BEAT = 12;

// Counter-clockwise from the payday pill at 62% of the top edge.
const LEDGER_RAIL = "M 62 0 L 0 0 L 0 100 L 100 100 L 100 0 L 62 0";

function LedgerScene({ c, t, anim, still }) {
  const beat = (name, timing = "ease") => anim(`${name} ${LEDGER_BEAT}s ${timing} infinite`);

  // Dark glass tuned to the cover art, with the app's mint in the border.
  const glass = {
    position: "absolute",
    background: "linear-gradient(180deg, rgba(10,17,14,.96), rgba(7,12,10,.92))",
    border: `1px solid rgba(${c},.28)`,
    borderRadius: "12px",
    boxShadow: "0 16px 34px rgba(0,0,0,.55)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  const mintLabel = {
    fontFamily: font.mono,
    fontSize: 7.5,
    letterSpacing: ".2em",
    textTransform: "uppercase",
    color: `rgba(${c},.85)`,
    lineHeight: 1,
  };

  const tag = {
    position: "absolute",
    px: "8px",
    py: "4px",
    borderRadius: "999px",
    background: "linear-gradient(180deg, rgba(10,17,14,.96), rgba(7,12,10,.92))",
    fontFamily: font.mono,
    fontSize: 9,
    lineHeight: 1.3,
    whiteSpace: "nowrap",
    opacity: 0,
  };

  const rollRow = {
    height: 15,
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontFamily: font.mono,
    fontSize: 10,
    lineHeight: "15px",
  };

  const streakProps = {
    d: LEDGER_RAIL,
    pathLength: 100,
    vectorEffect: "non-scaling-stroke",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: "6 94",
  };

  return (
    <>
      {/* The rail: the card outline as a faint circuit, plus the light that
          runs it. Halo underneath, bright core on top, same choreography. */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        <path
          d={LEDGER_RAIL}
          pathLength={100}
          vectorEffect="non-scaling-stroke"
          fill="none"
          stroke={`rgba(${c},.16)`}
          strokeWidth="1"
        />
        {!still && (
          <>
            <Box
              component="path"
              {...streakProps}
              sx={{
                stroke: `rgba(${c},.4)`,
                strokeWidth: 5,
                opacity: 0,
                filter: "blur(3px)",
                animation: `jp-led-streak ${LEDGER_BEAT}s ease-in-out infinite`,
              }}
            />
            <Box
              component="path"
              {...streakProps}
              sx={{
                stroke: t,
                strokeWidth: 2,
                opacity: 0,
                filter: `drop-shadow(0 0 5px rgba(${c},.9))`,
                animation: `jp-led-streak ${LEDGER_BEAT}s ease-in-out infinite`,
              }}
            />
          </>
        )}
      </Box>

      {/* Payday, seated on the top edge where the rail begins */}
      <Box
        sx={{
          ...glass,
          left: "58%",
          top: -11,
          p: "7px 10px",
          borderRadius: "999px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          animation: beat("jp-led-payday"),
        }}
      >
        <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: t, flex: "0 0 auto", boxShadow: `0 0 6px rgba(${c},.8)` }} />
        <Box
          sx={{
            fontFamily: font.mono,
            fontSize: 8,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.8)",
            lineHeight: 1,
          }}
        >
          Payday · 15th
        </Box>
      </Box>

      {/* Net balance, half off the left edge in the cover's empty margin,
          seated at rail unit 23 — where the income streak lands */}
      <Box
        sx={{
          ...glass,
          left: -14,
          top: "31%",
          p: "10px 12px",
          transformOrigin: "20% 50%",
          animation: beat("jp-led-balance-pop"),
        }}
      >
        <Box sx={mintLabel}>Net balance</Box>
        <Box
          sx={{
            mt: "6px",
            display: "flex",
            alignItems: "center",
            fontFamily: font.mono,
            fontSize: 15,
            fontWeight: 600,
            color: "#F3EFEA",
          }}
        >
          <Box component="span" sx={{ lineHeight: "16px" }}>
            ₱ 12,
          </Box>
          <Box sx={{ height: 16, overflow: "hidden" }}>
            <Box sx={{ animation: beat("jp-led-roll", "cubic-bezier(.7,0,.3,1)") }}>
              {["480", "730", "480"].map((digits, i) => (
                <Box key={i} sx={{ height: 16, lineHeight: "16px" }}>
                  {digits}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* The month so far: soft area chart with a live tick */}
        <Box sx={{ position: "relative", mt: "8px" }}>
          <Box component="svg" width="100" height="26" viewBox="0 0 100 26" sx={{ display: "block" }}>
            <defs>
              <linearGradient id="jpLedSparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t} stopOpacity="0.3" />
                <stop offset="100%" stopColor={t} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M2 20 C 16 17, 26 19, 38 14 S 60 12, 72 9 S 90 6, 98 9 L 98 26 L 2 26 Z"
              fill="url(#jpLedSparkFill)"
            />
            <path
              d="M2 20 C 16 17, 26 19, 38 14 S 60 12, 72 9 S 90 6, 98 9"
              fill="none"
              stroke={t}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 6,
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: t,
              boxShadow: `0 0 8px rgba(${c},.8)`,
              animation: beat("jp-led-spark-dot"),
            }}
          />
        </Box>
      </Box>

      {/* The credit landing and the payment leaving, popped off the balance */}
      {!still && (
        <>
          <Box
            sx={{
              ...tag,
              left: "9%",
              top: "27%",
              border: `1px solid rgba(${c},.55)`,
              color: "#3BE0B0",
              animation: `jp-led-tag-in ${LEDGER_BEAT}s ease infinite`,
            }}
          >
            + ₱250
          </Box>
          <Box
            sx={{
              ...tag,
              left: "9%",
              top: "45%",
              border: "1px solid rgba(255,255,255,.22)",
              color: "rgba(255,255,255,.75)",
              animation: `jp-led-tag-out ${LEDGER_BEAT}s ease infinite`,
            }}
          >
            − ₱250
          </Box>
        </>
      )}

      {/* The bill, half off the right edge at rail unit 79 — settled once
          per cycle when the payment streak climbs to it */}
      <Box sx={{ ...glass, right: -14, top: "44%", p: "9px 11px", animation: beat("jp-led-bill-flash") }}>
        <Box sx={mintLabel}>Internet bill</Box>
        <Box sx={{ mt: "6px", height: 15, overflow: "hidden" }}>
          <Box sx={{ animation: beat("jp-led-bill-roll", "cubic-bezier(.7,0,.3,1)") }}>
            <Box sx={{ ...rollRow, color: "rgba(255,255,255,.85)" }}>
              <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#E09A22", flex: "0 0 auto" }} />
              ₱250 due
            </Box>
            <Box sx={{ ...rollRow, color: "#3BE0B0" }}>
              <Box component="span" sx={{ fontSize: 11, lineHeight: 1 }}>
                ✓
              </Box>
              Paid
            </Box>
            <Box sx={{ ...rollRow, color: "rgba(255,255,255,.85)" }}>
              <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#E09A22", flex: "0 0 auto" }} />
              ₱250 due
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

/* --------------------------------------------------------------- Pasabay */

/**
 * The Pasabay machine — one day of a home kitchen on a single 12s clock.
 *
 * The card's border is the delivery route, and nothing here rolls digits
 * or flips status text — the batch is physical inventory. An order ticket
 * slides in along the top edge and docks against the batch chip (the
 * projects shelf clips a few px above the cards, so the choreography
 * stays parallel to the edge rather than crossing it from above); one
 * serving cell drains hollow; the meal leaves as a streak of light — down
 * the left edge, across the bottom, up the right — while the drop-off
 * chip's mini-map inks the same route in step, ending at a map target
 * that ripples on arrival, confirmed by a checkmark drawing itself. The
 * daily reset then slides the cover's own amber underline from TODAY to
 * TMRW, the cells refill in a cascade, and the underline comes home —
 * the cycle ends exactly where it began.
 *
 * The beat percentages live with the jp-pas-* keyframes in index.css. The
 * rail is traced counter-clockwise from the batch chip with pathLength
 * 100; stations sit at path units 0 (batch) and 83 (drop-off) — move a
 * chip and those constants move with it.
 *
 * Everything is tuned to the Pasabay cover: warm near-black glass, the
 * app's golden amber (#F5A814 via the project tint) in every border and
 * accent, tab row and sliding underline borrowed from the cover's own
 * "Today's Menu / Tomorrow" card.
 */
const PASABAY_BEAT = 12;

// Counter-clockwise from the batch chip at 54% of the top edge.
const PASABAY_RAIL = "M 54 0 L 0 0 L 0 100 L 100 100 L 100 0 L 54 0";

function PasabayScene({ c, t, anim, still }) {
  const beat = (name, timing = "ease") => anim(`${name} ${PASABAY_BEAT}s ${timing} infinite`);

  // Warm near-black glass against the cover's white, amber in the border.
  const glass = {
    position: "absolute",
    background: "linear-gradient(180deg, rgba(24,18,9,.95), rgba(16,12,6,.92))",
    border: `1px solid rgba(${c},.28)`,
    borderRadius: "12px",
    boxShadow: "0 16px 34px rgba(0,0,0,.45)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  const amberLabel = {
    fontFamily: font.mono,
    fontSize: 7.5,
    letterSpacing: ".2em",
    textTransform: "uppercase",
    color: `rgba(${c},.9)`,
    lineHeight: 1,
  };

  // One serving of the day's batch: solid amber when cooked and available,
  // hollow once ordered. The keyframes drain/refill by overriding these.
  const cell = {
    width: 9,
    height: 9,
    borderRadius: "2.5px",
    bgcolor: t,
    border: `1px solid rgba(${c},.9)`,
    boxShadow: `0 0 6px rgba(${c},.5)`,
  };

  const streakProps = {
    d: PASABAY_RAIL,
    pathLength: 100,
    vectorEffect: "non-scaling-stroke",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: "7 93",
  };

  return (
    <>
      {/* The route: the card outline as a faint rail, plus the delivery that
          runs it. Halo underneath, bright core on top, same choreography. */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        <path
          d={PASABAY_RAIL}
          pathLength={100}
          vectorEffect="non-scaling-stroke"
          fill="none"
          stroke={`rgba(${c},.16)`}
          strokeWidth="1"
        />
        {!still && (
          <>
            <Box
              component="path"
              {...streakProps}
              sx={{
                stroke: `rgba(${c},.4)`,
                strokeWidth: 5,
                opacity: 0,
                filter: "blur(3px)",
                animation: `jp-pas-streak ${PASABAY_BEAT}s ease-in-out infinite`,
              }}
            />
            <Box
              component="path"
              {...streakProps}
              sx={{
                stroke: t,
                strokeWidth: 2,
                opacity: 0,
                filter: `drop-shadow(0 0 5px rgba(${c},.9))`,
                animation: `jp-pas-streak ${PASABAY_BEAT}s ease-in-out infinite`,
              }}
            />
          </>
        )}
      </Box>

      {/* Today's batch, seated on the top edge where the rail begins. The
          cover's own tab row — TODAY / TMRW with a sliding amber underline —
          over the day's servings as a tray of cells: what's cooked is solid,
          what's ordered is hollow. */}
      <Box
        sx={{
          ...glass,
          left: "36%",
          top: -12,
          p: "9px 11px",
          animation: beat("jp-pas-batch-pulse"),
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            gap: "9px",
            pb: "5px",
            fontFamily: font.mono,
            fontSize: 7,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.6)",
            lineHeight: 1,
          }}
        >
          <Box component="span">Today</Box>
          <Box component="span">Tmrw</Box>
          <Box
            sx={{
              position: "absolute",
              left: 0,
              bottom: 0,
              height: 2,
              width: 26,
              borderRadius: "1px",
              bgcolor: t,
              boxShadow: `0 0 6px rgba(${c},.7)`,
              animation: beat("jp-pas-tab", "cubic-bezier(.7,0,.3,1)"),
            }}
          />
        </Box>
        <Box sx={{ mt: "7px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Box sx={{ display: "flex", gap: "4px" }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{ ...cell, animation: anim(`jp-pas-cell-pulse ${PASABAY_BEAT}s ease ${(i * 0.18).toFixed(2)}s infinite`) }}
              />
            ))}
            <Box sx={{ ...cell, animation: beat("jp-pas-cell-drain") }} />
          </Box>
          <Box
            sx={{
              fontFamily: font.mono,
              fontSize: 6.5,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.45)",
              lineHeight: 1,
            }}
          >
            Servings
          </Box>
        </Box>

        {/* The order ticket, sliding in along the card's top edge to dock
            against the chip's side. Anchored to the chip so the docked
            position tracks its real width at any card size, and so it rides
            the chip's acknowledgement pulse. Only exists mid-flight. */}
        {!still && (
          <Box
            sx={{
              position: "absolute",
              left: "100%",
              ml: "6px",
              top: 5,
              px: "8px",
              py: "4px",
              borderRadius: "999px",
              background: "linear-gradient(180deg, rgba(24,18,9,.95), rgba(16,12,6,.92))",
              border: `1px solid rgba(${c},.55)`,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: font.mono,
              fontSize: 8.5,
              lineHeight: 1.3,
              color: "rgba(255,255,255,.85)",
              whiteSpace: "nowrap",
              opacity: 0,
              animation: `jp-pas-ticket ${PASABAY_BEAT}s ease infinite`,
            }}
          >
            <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: t, flex: "0 0 auto", boxShadow: `0 0 5px rgba(${c},.8)` }} />
            Sisig ×1
          </Box>
        )}
      </Box>

      {/* The drop-off, half off the right edge at rail unit 83 — the buyer's
          tracking view. The mini-map inks the delivery route in step with
          the rail light, lands on a surveyor's target, and the checkmark
          draws itself when the meal arrives. */}
      <Box sx={{ ...glass, right: -14, top: "17%", p: "8px 10px", animation: beat("jp-pas-dropoff-flash") }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Box sx={amberLabel}>Drop-off · Pin</Box>
          <Box component="svg" width="10" height="10" viewBox="0 0 10 10" sx={{ display: "block", ml: "auto", flex: "0 0 auto" }}>
            <Box
              component="path"
              d="M 1.5 5.5 l 2.6 2.6 l 4.4 -5.6"
              pathLength={20}
              sx={{
                fill: "none",
                stroke: t,
                strokeWidth: 1.8,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeDasharray: 20,
                strokeDashoffset: 0,
                filter: `drop-shadow(0 0 3px rgba(${c},.7))`,
                animation: beat("jp-pas-check"),
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            mt: "7px",
            width: 74,
            height: 34,
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,.12)",
            bgcolor: "rgba(255,255,255,.05)",
          }}
        >
          <Box component="svg" width="74" height="34" viewBox="0 0 74 34" sx={{ display: "block" }}>
            {/* The landmarks people navigate by here — blocks, not addresses */}
            <rect x="12" y="6" width="5" height="5" rx="1" fill="rgba(255,255,255,.22)" />
            <rect x="30" y="22" width="4" height="4" rx="1" fill="rgba(255,255,255,.18)" />
            <circle cx="47" cy="6" r="1.5" fill="rgba(255,255,255,.25)" />
            {/* The route, inking itself in sync with the rail streak */}
            <Box
              component="path"
              d="M 3 28 C 14 28, 18 12, 32 15 S 52 22, 58 12"
              pathLength={100}
              sx={{
                fill: "none",
                stroke: t,
                strokeWidth: 1.6,
                strokeLinecap: "round",
                strokeDasharray: 100,
                strokeDashoffset: 0,
                animation: beat("jp-pas-route", "ease-in-out"),
              }}
            />
            {/* The pin as map infrastructure: a surveyor's target */}
            <circle cx="58" cy="12" r="4.6" fill="none" stroke={`rgba(${c},.8)`} strokeWidth="1.5" />
            <circle cx="58" cy="12" r="1.8" fill={t} />
          </Box>
          {!still && (
            <Box
              sx={{
                position: "absolute",
                left: "calc(78.4% - 8px)",
                top: "calc(35.3% - 8px)",
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: `1.5px solid rgba(${c},.7)`,
                opacity: 0,
                animation: `jp-pas-ping ${PASABAY_BEAT}s ease-out infinite`,
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

/* -------------------------------------------------------------- Aspentech */

/**
 * The Aspentech machine — one buyer's customizer session on a single 12s
 * clock. The card itself is the live preview.
 *
 * A Customize panel floats in the cover's empty top-right corner. The
 * selection ring hops from the brand blue swatch to the teal one, and the
 * preview repaints: a wash of teal light sweeps the whole cover left to
 * right — screen-blended, so it lights the navy ground and leaves the
 * white mockup untouched — and the sidebar chrome riding the card's left
 * edge drinks the new color as the wash passes it. The buyer then switches
 * layout: TOP press-dips and fills, the sidebar chrome retracts up into
 * the top-left corner and a top-bar chrome extends out of the same corner
 * along the top edge — the nav flows around the card. With the config set,
 * a SENT seal stamps the proposal row in the picked teal, and the rail
 * streak departs down the right edge, laps the card, and sails off along
 * the top: the proposal leaving with that exact setup. The demo then
 * re-arms for the next buyer — a blue wash sweeps back right-to-left while
 * ring, buttons and chrome cascade home — so 100% = 0%, seamless.
 *
 * The beat percentages live with the jp-asp-* keyframes in index.css. The
 * rail is traced clockwise from beneath the panel chip with pathLength
 * 100; the panel sits over rail unit 0 (right edge, y 12) — move the chip
 * and that constant moves with it. The ring's 15px hop in jp-asp-ring is
 * one swatch step (9px swatch + 6px gap) — keep the two in step.
 *
 * Everything is tuned to the Aspentech cover: deep-navy glass, the site's
 * own blue (#2F6FED via the project tint) as the default theme, its teal
 * (#17C39A) as the picked one — the two ends of the cover's own
 * corner-radius slider gradient.
 */
const ASPEN_BEAT = 12;

// Clockwise from just below the Customize panel on the right edge.
const ASPEN_RAIL = "M 100 12 L 100 100 L 0 100 L 0 0 L 100 0 L 100 12";

// The picked accent — the teal end of the cover's slider gradient.
const ASPEN_TEAL = "#17C39A";

function AspentechScene({ c, t, anim, still }) {
  const beat = (name, timing = "ease") => anim(`${name} ${ASPEN_BEAT}s ${timing} infinite`);

  // Deep-navy glass against the cover's dark ground, blue in the border.
  const glass = {
    position: "absolute",
    background: "linear-gradient(180deg, rgba(10,16,26,.96), rgba(6,10,17,.93))",
    border: `1px solid rgba(${c},.3)`,
    borderRadius: "12px",
    boxShadow: "0 16px 34px rgba(0,0,0,.55)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  // The cover's own swatch rows: blue first, because blue is the default.
  const swatches = [t, ASPEN_TEAL, "#7C3AED", "#E8467C"];

  const layoutBtn = {
    px: "4px",
    py: "3px",
    borderRadius: "4px",
    fontFamily: font.mono,
    fontSize: 6,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };

  // Resolved (default) states — the keyframes leave and return to these.
  const btnOn = { bgcolor: t, border: `1px solid rgba(${c},.95)`, color: "#06121C" };
  const btnOff = {
    bgcolor: "transparent",
    border: "1px solid rgba(255,255,255,.18)",
    color: "rgba(255,255,255,.5)",
  };

  const washBand = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "55%",
    mixBlendMode: "screen",
  };

  const streakProps = {
    d: ASPEN_RAIL,
    pathLength: 100,
    vectorEffect: "non-scaling-stroke",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: "6 94",
  };

  return (
    <>
      {/* The live preview repainting. The container matches the cover box
          exactly (same aspect ratio, pinned to the card top) so the light
          never spills onto the caption. Screen blending keeps the cover's
          white mockup untouched while the navy ground takes the color.
          Both washes only exist mid-flight. */}
      {!still && (
        <Box sx={{ position: "absolute", left: 0, right: 0, top: 0, aspectRatio: "890 / 978", overflow: "hidden" }}>
          <Box
            sx={{
              ...washBand,
              background:
                "linear-gradient(90deg, rgba(23,195,154,0) 0%, rgba(23,195,154,.8) 50%, rgba(23,195,154,0) 100%)",
              transform: "translateX(-100%)",
              animation: `jp-asp-wash-teal ${ASPEN_BEAT}s ease-in-out infinite`,
            }}
          />
          <Box
            sx={{
              ...washBand,
              background:
                "linear-gradient(90deg, rgba(47,111,237,0) 0%, rgba(47,111,237,.8) 50%, rgba(47,111,237,0) 100%)",
              transform: "translateX(330%)",
              animation: `jp-asp-wash-blue ${ASPEN_BEAT}s ease-in-out infinite`,
            }}
          />
        </Box>
      )}

      {/* The rail: the card outline as a faint circuit, plus the proposal
          that departs on it. Halo underneath, bright core on top — both in
          the picked teal, because the proposal carries the chosen theme. */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        <path
          d={ASPEN_RAIL}
          pathLength={100}
          vectorEffect="non-scaling-stroke"
          fill="none"
          stroke={`rgba(${c},.16)`}
          strokeWidth="1"
        />
        {!still && (
          <>
            <Box
              component="path"
              {...streakProps}
              sx={{
                stroke: "rgba(23,195,154,.4)",
                strokeWidth: 5,
                opacity: 0,
                filter: "blur(3px)",
                animation: `jp-asp-streak ${ASPEN_BEAT}s ease-in-out infinite`,
              }}
            />
            <Box
              component="path"
              {...streakProps}
              sx={{
                stroke: ASPEN_TEAL,
                strokeWidth: 2,
                opacity: 0,
                filter: "drop-shadow(0 0 5px rgba(23,195,154,.9))",
                animation: `jp-asp-streak ${ASPEN_BEAT}s ease-in-out infinite`,
              }}
            />
          </>
        )}
      </Box>

      {/* The preview's nav chrome, mounted on the card's own edges. The
          sidebar rides the left edge by default; when the buyer picks TOP
          it retracts up into the corner and the top bar extends out of it.
          The top bar only exists mid-cycle, so it goes entirely when
          frozen; the sidebar's base state is the resolved one. */}
      <Box
        sx={{
          position: "absolute",
          left: -1.75,
          top: "5%",
          width: 3.5,
          height: "17%",
          borderRadius: "2px",
          bgcolor: t,
          boxShadow: `0 0 10px rgba(${c},.7)`,
          transformOrigin: "50% 0%",
          animation: beat("jp-asp-side"),
        }}
      />
      {!still && (
        <Box
          sx={{
            position: "absolute",
            top: -1.75,
            left: "4%",
            width: "20%",
            height: 3.5,
            borderRadius: "2px",
            bgcolor: ASPEN_TEAL,
            boxShadow: "0 0 10px rgba(23,195,154,.7)",
            transformOrigin: "0% 50%",
            transform: "scaleX(0)",
            animation: `jp-asp-top ${ASPEN_BEAT}s ease infinite`,
          }}
        />
      )}

      {/* The Customize panel, half off the right edge in the cover's empty
          top-right corner — the cover's own panel, miniaturized. It holds
          still; its controls do the acting. */}
      <Box sx={{ ...glass, right: -14, top: "3%", p: "8px 10px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Box
            sx={{
              fontFamily: font.mono,
              fontSize: 7.5,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: `rgba(${c},.9)`,
              lineHeight: 1,
            }}
          >
            Customize
          </Box>
          {/* The cover's Live badge, reduced to its dot */}
          <Box
            sx={{
              ml: "auto",
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: "#2BD9A5",
              flex: "0 0 auto",
              boxShadow: "0 0 6px rgba(43,217,165,.8)",
            }}
          />
        </Box>

        {/* Brand color row: the selection ring hops blue -> teal and back */}
        <Box sx={{ position: "relative", mt: "8px", display: "flex", gap: "6px" }}>
          {swatches.map((swatch) => (
            <Box
              key={swatch}
              sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: swatch, flex: "0 0 auto" }}
            />
          ))}
          <Box
            sx={{
              position: "absolute",
              left: -2.5,
              top: -2.5,
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,.92)",
              boxShadow: "0 0 7px rgba(255,255,255,.5)",
              animation: beat("jp-asp-ring", "cubic-bezier(.7,0,.3,1)"),
            }}
          />
        </Box>

        {/* Layout row: SIDE is the default; TOP takes over mid-cycle */}
        <Box sx={{ mt: "8px", display: "flex", gap: "4px" }}>
          <Box sx={{ ...layoutBtn, ...btnOn, animation: beat("jp-asp-btn-side") }}>Side</Box>
          <Box sx={{ ...layoutBtn, ...btnOff, animation: beat("jp-asp-btn-top") }}>Top</Box>
          <Box sx={{ ...layoutBtn, ...btnOff }}>Rail</Box>
        </Box>

        {/* Proposal row: where the session resolves. The seal presses on in
            the picked teal — the proposal carries the exact setup — and
            only exists mid-cycle. */}
        <Box
          sx={{
            position: "relative",
            mt: "9px",
            pt: "7px",
            borderTop: "1px solid rgba(255,255,255,.1)",
            display: "flex",
            alignItems: "center",
            minHeight: 15,
          }}
        >
          <Box
            sx={{
              fontFamily: font.mono,
              fontSize: 6.5,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.45)",
              lineHeight: 1,
            }}
          >
            Proposal →
          </Box>
          {!still && (
            <Box
              sx={{
                position: "absolute",
                right: -3,
                top: "50%",
                mt: "-6px",
                px: "4px",
                py: "3px",
                borderRadius: "3px",
                border: `1.5px solid ${ASPEN_TEAL}`,
                color: ASPEN_TEAL,
                fontFamily: font.mono,
                fontSize: 6.5,
                fontWeight: 700,
                letterSpacing: ".16em",
                lineHeight: 1,
                boxShadow: "0 0 10px rgba(23,195,154,.35)",
                opacity: 0,
                transform: "rotate(-8deg) scale(1.7)",
                animation: `jp-asp-stamp ${ASPEN_BEAT}s ease infinite`,
              }}
            >
              SENT
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

/* ------------------------------------------------------------------ ICTD */

/**
 * The ICTD machine — one repair item's book-in / book-out lifecycle on a
 * single 12s clock.
 *
 * The left chip is the asset's live telemetry: a heartbeat trace that
 * never stops scrolling. The right chip is the custody log — the cover's
 * own "Asset & Custody" language made physical: two slots, OWNER and
 * ICTD, with the asset's tag seated in one. The fault cuts the trace to
 * an amber flatline; the item books in — an amber light runs the card's
 * border down to the custody desk and the tag slides across, clamped by
 * the ICTD slot; the bench works (the LED blinks); the repair lands and
 * the trace snaps back to life; the item books out — the tag slides home
 * and the same light, green now, finishes the lap back to the telemetry
 * chip. The rail streak is the one piece of shared scene infrastructure
 * here, and it is used as a custody chain: one lap per cycle, departing
 * amber (faulted) and arriving green (repaired), so the light itself
 * carries the repair state rather than just marking a route.
 *
 * The beat percentages live with the jp-ictd-* keyframes in index.css.
 * The rail is traced counter-clockwise from the telemetry chip with
 * pathLength 100; stations sit at path units 0 (telemetry, left edge at
 * y 22) and 64.5 (custody, right edge at y 20) — move a chip and those
 * constants move with it. The tag's 32px slide in jp-ictd-tag is one
 * slot step (26px slot + 6px gap), and the trace ribbon is sixteen 15px
 * heartbeats scrolled −165px (eleven beats, ≈55bpm) per cycle, which
 * keeps the 66px window covered at both ends so the loop has no seam —
 * keep all three in step.
 *
 * Everything is tuned to the ICTD cover: green-black glass, the cover's
 * deep green (#1E8050 via the project tint) in borders and the tag, its
 * OPERATIONAL signal green (#28C840) for everything live, and its
 * traffic-light amber (deepened to #F2B94B for dark glass) only for the
 * fault.
 */
const ICTD_BEAT = 12;

// Counter-clockwise from the telemetry chip at 22% of the left edge.
const ICTD_RAIL = "M 0 22 L 0 100 L 100 100 L 100 0 L 0 0 L 0 22";

// The cover's OPERATIONAL dot green, and its traffic-light amber
// deepened so it holds up on dark glass.
const ICTD_SIGNAL = "#28C840";
const ICTD_AMBER = "#F2B94B";

// The tint lifted for small type on the dark glass, as the Ledger does
// with its mint (#3BE0B0) and Pasabay with its amber (#FFC94A).
const ICTD_LABEL = "#57C287";

// One heartbeat: a 15px-wide QRS complex on a baseline of y 15. Sixteen
// make a 240px ribbon, which stays wider than the 66px window across the
// whole −165px scroll, so the crawl never runs out of trace.
const ICTD_EKG_BEAT = "h 3 l 1 1.5 l 1.5 -8 l 1.5 9 l 1 -2.5 h 2 q 2.5 -3.5 4 0 h 1";
const ICTD_EKG_PATH = `M 0 15 ${Array(16).fill(ICTD_EKG_BEAT).join(" ")}`;

function ICTDScene({ c, t, anim, still }) {
  const beat = (name, timing = "ease") => anim(`${name} ${ICTD_BEAT}s ${timing} infinite`);

  // Green-black glass against the cover's light sage ground.
  const glass = {
    position: "absolute",
    background: "linear-gradient(180deg, rgba(9,16,12,.95), rgba(6,11,8,.92))",
    border: `1px solid rgba(${c},.3)`,
    borderRadius: "12px",
    boxShadow: "0 16px 34px rgba(0,0,0,.45)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  const greenLabel = {
    fontFamily: font.mono,
    fontSize: 7.5,
    letterSpacing: ".2em",
    textTransform: "uppercase",
    color: ICTD_LABEL,
    lineHeight: 1,
  };

  // A custody slot: open by default; the keyframes clamp it green around
  // the tag when the asset is booked into it.
  const slot = {
    width: 26,
    height: 14,
    borderRadius: "4px",
    border: "1px solid rgba(255,255,255,.16)",
    flex: "0 0 auto",
  };

  const slotLabel = {
    width: 26,
    fontFamily: font.mono,
    fontSize: 6,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,.45)",
    textAlign: "center",
    lineHeight: 1,
  };

  const streakProps = {
    d: ICTD_RAIL,
    pathLength: 100,
    vectorEffect: "non-scaling-stroke",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: "6 94",
  };

  return (
    <>
      {/* The corridor: the card outline as a faint rail, plus the repair
          run that travels it — out amber with the fault, back green with
          the fix. Halo underneath, bright core on top, same choreography;
          both swap color while invisible at the custody desk. */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        <path
          d={ICTD_RAIL}
          pathLength={100}
          vectorEffect="non-scaling-stroke"
          fill="none"
          stroke={`rgba(${c},.16)`}
          strokeWidth="1"
        />
        {!still && (
          <>
            <Box
              component="path"
              {...streakProps}
              sx={{
                stroke: "rgba(242,185,75,.4)",
                strokeWidth: 5,
                opacity: 0,
                filter: "blur(3px)",
                animation: `jp-ictd-streak-halo ${ICTD_BEAT}s ease-in-out infinite`,
              }}
            />
            {/* No drop-shadow on the core the way the other rails have one:
                this streak changes colour mid-cycle, and a fixed shadow
                would sit amber under the green return. The recolouring halo
                above is the glow instead. */}
            <Box
              component="path"
              {...streakProps}
              sx={{
                stroke: ICTD_AMBER,
                strokeWidth: 2,
                opacity: 0,
                animation: `jp-ictd-streak-core ${ICTD_BEAT}s ease-in-out infinite`,
              }}
            />
          </>
        )}
      </Box>

      {/* The asset's telemetry, half off the left edge in the cover's empty
          margin, seated at rail unit 0: its id, a status LED, and the
          heartbeat trace. The trace scrolls forever; the fault cuts it to
          an amber flatline and the repair snaps it back with a flare. */}
      <Box sx={{ ...glass, left: -14, top: "22%", p: "9px 11px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box sx={greenLabel}>LPT-114</Box>
          <Box
            sx={{
              ml: "auto",
              width: 6,
              height: 6,
              borderRadius: "50%",
              flex: "0 0 auto",
              bgcolor: ICTD_SIGNAL,
              boxShadow: "0 0 6px rgba(40,200,64,.7)",
              animation: beat("jp-ictd-led"),
            }}
          />
        </Box>
        <Box
          sx={{
            mt: "7px",
            width: 66,
            height: 24,
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,.12)",
            bgcolor: "rgba(255,255,255,.05)",
            overflow: "hidden",
          }}
        >
          <Box component="svg" width="66" height="24" viewBox="0 0 66 24" sx={{ display: "block" }}>
            <Box component="g" sx={{ animation: beat("jp-ictd-ekg-scroll", "linear") }}>
              <Box
                component="path"
                d={ICTD_EKG_PATH}
                sx={{
                  fill: "none",
                  stroke: ICTD_SIGNAL,
                  strokeWidth: 1.6,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  opacity: 1,
                  filter: "drop-shadow(0 0 2px rgba(40,200,64,.6))",
                  animation: beat("jp-ictd-ekg-pulse"),
                }}
              />
            </Box>
            {/* The flatline only exists while the asset is down */}
            {!still && (
              <Box
                component="line"
                x1="0"
                y1="15"
                x2="66"
                y2="15"
                sx={{
                  stroke: ICTD_AMBER,
                  strokeWidth: 1.6,
                  strokeLinecap: "round",
                  opacity: 0,
                  animation: beat("jp-ictd-ekg-flat"),
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* The custody log, half off the right edge at rail unit 64.5 — the
          cover's "Asset & Custody" made physical. The tag lives in OWNER;
          book-in slides it across and the ICTD slot clamps around it,
          book-out sends it home and OWNER clamps back. */}
      <Box sx={{ ...glass, right: -14, top: "20%", p: "8px 10px" }}>
        <Box sx={greenLabel}>Custody log</Box>
        <Box sx={{ position: "relative", mt: "7px", display: "flex", gap: "6px" }}>
          <Box
            sx={{
              ...slot,
              border: "1px solid rgba(40,200,64,.75)",
              boxShadow: "0 0 8px rgba(40,200,64,.28)",
              animation: beat("jp-ictd-slot-owner"),
            }}
          />
          <Box sx={{ ...slot, animation: beat("jp-ictd-slot-ictd") }} />
          {/* The asset tag: its 32px slide is one slot step */}
          <Box
            sx={{
              position: "absolute",
              left: 4,
              top: 3,
              width: 18,
              height: 8,
              borderRadius: "2px",
              bgcolor: t,
              boxShadow: `0 0 6px rgba(${c},.6)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              animation: beat("jp-ictd-tag", "cubic-bezier(.7,0,.3,1)"),
            }}
          >
            {[0, 1].map((i) => (
              <Box key={i} sx={{ width: 1.5, height: 4, bgcolor: "rgba(255,255,255,.75)" }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ mt: "4px", display: "flex", gap: "6px" }}>
          <Box sx={slotLabel}>Owner</Box>
          <Box sx={slotLabel}>ICTD</Box>
        </Box>
      </Box>
    </>
  );
}

/* ------------------------------------------------------------------- LMS */

function CodeScene({ c, t, anim, still }) {
  const lines = [
    { width: 64, color: t },
    { width: 44, color: "rgba(255,255,255,.42)" },
    { width: 76, color: "rgba(255,255,255,.30)" },
    { width: 34, color: `rgba(${c},.65)` },
  ];

  const brace = {
    position: "absolute",
    fontFamily: font.mono,
    fontSize: 54,
    fontWeight: 700,
    lineHeight: 1,
    color: t,
    textShadow: `0 0 22px rgba(${c},.45), 0 4px 10px rgba(0,0,0,.55)`,
  };

  return (
    <>
      {/* The whole card is the code block */}
      <Box sx={{ ...brace, left: -17, top: "26%", animation: anim("jp-sc-float 5.8s ease-in-out infinite") }}>{"{"}</Box>
      <Box sx={{ ...brace, right: -17, top: "32%", animation: anim("jp-sc-float 5.8s ease-in-out 2.9s infinite") }}>{"}"}</Box>

      {/* A closing tag out on patrol */}
      <Tourer duration={18} delay={-5} reverse still={still}>
        <Box
          sx={{
            fontFamily: font.mono,
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,.85)",
            textShadow: `0 0 12px rgba(${c},.6), 0 2px 6px rgba(0,0,0,.6)`,
            whiteSpace: "nowrap",
          }}
        >
          {"</>"}
        </Box>
      </Tourer>

      {/* The workspace, half above the top edge, mid-keystroke */}
      <Box sx={{ ...chip, left: "10%", top: -14, p: "9px 11px", width: 118, animation: anim("jp-sc-float 6.6s ease-in-out infinite") }}>
        <Box sx={{ display: "flex", gap: "3.5px" }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "rgba(255,255,255,.3)" }} />
          ))}
        </Box>
        <Box sx={{ mt: "8px", display: "flex", flexDirection: "column", gap: "5px" }}>
          {lines.map(({ width, color: lineColor }, i) => {
            const lastLine = i === lines.length - 1;
            const bar = (
              <Box
                key={width}
                sx={{
                  width,
                  height: 5,
                  borderRadius: "2px",
                  bgcolor: lineColor,
                  transformOrigin: "0 50%",
                  // scaleX(0) while waiting on its delay, full width when frozen.
                  transform: still ? "none" : "scaleX(0)",
                  animation: anim(`jp-sc-type 6.4s steps(12, end) ${(i * 0.5).toFixed(1)}s infinite`),
                }}
              />
            );
            if (!lastLine) return bar;
            return (
              <Box key={width} sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
                {bar}
                <Box sx={{ width: 4, height: 8, bgcolor: t, animation: anim("jp-blink 1.1s steps(1) infinite") }} />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Module tests re-running, half off the right edge */}
      <Box sx={{ ...chip, right: -12, top: "54%", p: "8px 10px", animation: anim("jp-sc-float 7.2s ease-in-out 1.2s infinite") }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Box sx={label}>Tests</Box>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: still ? "#23A26D" : "rgba(255,255,255,.22)",
                animation: anim(`jp-sc-pass 5.2s ease ${(i * 0.6).toFixed(1)}s infinite`),
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

/* ---------------------------------------------------------------- Export */

export function ProjectScene({ kind = "finance", tint }) {
  const still = useReducedMotion();
  const anim = (value) => (still ? "none" : value);
  const c = rgbChannels(tint);
  const t = `rgb(${c})`;
  const props = { c, t, anim, still };

  return (
    <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {kind === "delivery" ? (
        <PasabayScene {...props} />
      ) : kind === "customizer" ? (
        <AspentechScene {...props} />
      ) : kind === "servicedesk" ? (
        <ICTDScene {...props} />
      ) : kind === "code" ? (
        <CodeScene {...props} />
      ) : (
        <LedgerScene {...props} />
      )}
    </Box>
  );
}
