import { useState } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { color, font, EASE_CSS } from "./tokens";

/**
 * The JP monogram: a P bowl in the accent, a J stem and hook in cream. The
 * three strokes draw themselves in on first paint.
 *
 * At `lg` the lockup is interactive — hovering or focusing it draws a frame
 * around the whole thing, one edge at a time, and swaps the role line for a
 * "back to top" prompt, since that is what the header logo actually does.
 */

const MARK_PATHS = [
  { d: "M16.3 6.8 H19.2 A5.5 5.5 0 0 1 19.2 17.8 H16.3", stroke: "var(--accent)", cap: "square" },
  { d: "M13.8 6.8 V20.6", stroke: "#F4F1EC", cap: "square" },
  { d: "M13.8 20.6 A6 6 0 0 1 7.8 26.6", stroke: "#F4F1EC", cap: "round" },
];

function Mark({ px, weight, on, reduceMotion }) {
  return (
    <Box
      component="svg"
      width={px}
      height={px}
      viewBox="0 0 32 32"
      aria-hidden
      focusable="false"
      sx={{
        display: "block",
        flex: "0 0 auto",
        filter: on ? "drop-shadow(0 0 10px rgba(255,106,26,.55))" : "none",
        transform: on ? "rotate(-8deg) scale(1.06)" : "none",
        transition: `filter .4s ease, transform .55s ${EASE_CSS}`,
      }}
    >
      {MARK_PATHS.map(({ d, stroke, cap }, i) => (
        <Box
          key={d}
          component="path"
          d={d}
          pathLength={1}
          sx={{
            fill: "none",
            stroke,
            strokeWidth: weight,
            strokeLinecap: cap,
            strokeDasharray: 1,
            strokeDashoffset: reduceMotion ? 0 : 1,
            animation: reduceMotion
              ? "none"
              : `jp-logo-draw .8s cubic-bezier(.62,0,.36,1) ${(0.25 + i * 0.18).toFixed(2)}s forwards`,
          }}
        />
      ))}
    </Box>
  );
}

export default function Wordmark({ size = "lg", showName = true }) {
  const reduceMotion = useReducedMotion();
  const [on, setOn] = useState(false);
  const lg = size === "lg";

  // Frame edges: top and bottom scale on X, sides on Y. The delay runs forward
  // on the way in and backwards on the way out, so it unwinds the way it drew.
  const edge = (i, extra) => ({
    position: "absolute",
    bgcolor: color.accent,
    pointerEvents: "none",
    transform: `${i % 2 === 0 ? "scaleX" : "scaleY"}(${on ? 1 : 0})`,
    transitionProperty: "transform",
    transitionDuration: ".26s",
    transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
    transitionDelay: `${((on ? i : 3 - i) * 0.07).toFixed(2)}s`,
    ...extra,
  });

  const tick = (i, extra) => ({
    position: "absolute",
    width: 4,
    height: 4,
    bgcolor: color.accent,
    pointerEvents: "none",
    opacity: on ? 1 : 0,
    transform: on ? "scale(1)" : "scale(0)",
    transition: `transform .3s ${EASE_CSS}, opacity .3s ease`,
    transitionDelay: `${on ? 0.26 + i * 0.07 : 0}s`,
    ...extra,
  });

  if (!lg) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Mark px={31} weight={3.4} on={false} reduceMotion={reduceMotion} />
        <Box
          component="span"
          aria-hidden
          sx={{ display: "block", width: "1px", height: 24, flex: "0 0 auto", bgcolor: "rgba(255,255,255,.13)" }}
        />
        {showName && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <Box
              component="span"
              sx={{
                fontFamily: font.sans,
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "-.025em",
                lineHeight: 1,
                color: color.text,
              }}
            >
              Jade N. Paver
            </Box>
            <Box
              component="span"
              sx={{
                fontFamily: font.mono,
                fontSize: "8.5px",
                fontWeight: 500,
                letterSpacing: ".22em",
                lineHeight: 1,
                color: color.faint,
              }}
            >
              SOFTWARE DEVELOPER
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "13px",
        flex: "0 0 auto",
      }}
    >
      <Box aria-hidden sx={edge(0, { left: "-12px", top: "-10px", width: "calc(100% + 24px)", height: "1px", transformOrigin: "0 50%" })} />
      <Box aria-hidden sx={edge(1, { right: "-12px", top: "-10px", width: "1px", height: "calc(100% + 20px)", transformOrigin: "50% 0" })} />
      <Box aria-hidden sx={edge(2, { left: "-12px", bottom: "-10px", width: "calc(100% + 24px)", height: "1px", transformOrigin: "100% 50%" })} />
      <Box aria-hidden sx={edge(3, { left: "-12px", top: "-10px", width: "1px", height: "calc(100% + 20px)", transformOrigin: "50% 100%" })} />
      <Box aria-hidden sx={tick(0, { left: "-14px", top: "-12px" })} />
      <Box aria-hidden sx={tick(1, { right: "-14px", bottom: "-12px" })} />

      <Mark px={36} weight={3.2} on={on} reduceMotion={reduceMotion} />

      <Box
        component="span"
        aria-hidden
        sx={{
          display: "block",
          width: "1px",
          height: on ? 34 : 27,
          flex: "0 0 auto",
          bgcolor: on ? color.accent : "rgba(255,255,255,.15)",
          transition: `background .3s ease, height .35s ${EASE_CSS}`,
        }}
      />

      {showName && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <Box
            component="span"
            sx={{
              fontFamily: font.sans,
              fontSize: "15px",
              fontWeight: 800,
              letterSpacing: "-.025em",
              lineHeight: 1,
              color: on ? "#FFFFFF" : "#F4F1EC",
              transition: "color .3s ease",
            }}
          >
            Jade N. Paver
          </Box>

          {/* Two role lines stacked in a 10px slot; only one is ever in frame. */}
          <Box component="span" sx={{ position: "relative", display: "block", height: "10px", width: "142px", overflow: "hidden" }}>
            {[
              {
                text: "SOFTWARE DEVELOPER",
                tint: color.dim,
                opacity: on ? 0 : 1,
                y: on ? "-12px" : "0px",
              },
              {
                text: "BACK TO TOP ↑",
                tint: color.accent,
                opacity: on ? 1 : 0,
                y: on ? "0px" : "11px",
              },
            ].map(({ text, tint, opacity, y }) => (
              <Box
                key={text}
                component="span"
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  fontFamily: font.mono,
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: ".235em",
                  lineHeight: 1,
                  color: tint,
                  whiteSpace: "nowrap",
                  opacity,
                  transform: `translateY(${y})`,
                  transition: `transform .34s ${EASE_CSS}, opacity .28s ease, color .28s ease`,
                }}
              >
                {text}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
