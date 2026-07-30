import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { color, font, EASE_CSS } from "./tokens";

/**
 * The header's primary call to action.
 *
 * It asks for attention on a timer rather than continuously: a light sweeps
 * across it and a ring expands out of it six times, spaced far enough apart to
 * read as a heartbeat instead of a loop. Hovering spends the remaining beats at
 * once and stops the timer, because at that point it has your attention.
 */
export default function HeaderCta({ href, rest = "Let's talk", hover = "Hire me" }) {
  const reduceMotion = useReducedMotion();
  const [on, setOn] = useState(false);
  const sheenRef = useRef(null);
  const ringRef = useRef(null);
  const beatsRef = useRef(0);

  const sweep = () => {
    const el = sheenRef.current;
    if (!el || reduceMotion || typeof el.animate !== "function") return;
    el.animate(
      [
        { transform: "translateX(0) skewX(-18deg)", opacity: 0 },
        { transform: "translateX(36px) skewX(-18deg)", opacity: 1, offset: 0.18 },
        { transform: "translateX(235px) skewX(-18deg)", opacity: 0 },
      ],
      { duration: 780, easing: "cubic-bezier(.35,0,.25,1)" }
    );
  };

  useEffect(() => {
    if (reduceMotion) return undefined;
    let interval = 0;

    const pulse = () => {
      if (document.hidden || beatsRef.current >= 6) return;
      beatsRef.current += 1;
      sweep();
      const ring = ringRef.current;
      if (ring && typeof ring.animate === "function") {
        ring.animate(
          [
            { transform: "scale(1)", opacity: 0.6 },
            { transform: "scale(1.3)", opacity: 0 },
          ],
          { duration: 1150, easing: "cubic-bezier(.2,.7,.3,1)" }
        );
      }
    };

    const start = setTimeout(() => {
      pulse();
      interval = setInterval(pulse, 8500);
    }, 4200);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const enter = () => {
    setOn(true);
    beatsRef.current = 99; // spend the budget; the timer stops asking
    sweep();
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <Box
        ref={ringRef}
        aria-hidden
        sx={{
          position: "absolute",
          inset: "-3px",
          border: `1px solid ${color.accent}`,
          borderRadius: "11px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <Box
        component="a"
        href={href}
        onMouseEnter={enter}
        onMouseLeave={() => setOn(false)}
        onFocus={enter}
        onBlur={() => setOn(false)}
        sx={{
          position: "relative",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          gap: "9px",
          fontFamily: font.mono,
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: color.bg,
          bgcolor: color.accent,
          borderRadius: "8px",
          p: "10px 15px",
          whiteSpace: "nowrap",
          textDecoration: "none",
          boxShadow: on ? "0 10px 30px rgba(255,106,26,.42)" : "none",
          transition: "box-shadow .32s ease",
          "&:hover": { color: color.bg },
          "&:focus-visible": { outline: `2px solid ${color.accent}`, outlineOffset: 3 },
        }}
      >
        <Box
          ref={sheenRef}
          aria-hidden
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "-56px",
            width: "42px",
            background:
              "linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,.6), rgba(255,255,255,0))",
            transform: "skewX(-18deg)",
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        <Box
          aria-hidden
          sx={{
            display: "block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            flex: "0 0 auto",
            bgcolor: on ? "#0B0C0E" : "rgba(11,12,14,.5)",
            transform: on ? "scale(1.7)" : "scale(1)",
            transition: `transform .3s ${EASE_CSS}, background .3s ease`,
          }}
        />

        {/* Both labels live in one 12px window; hover slides the second up. */}
        <Box component="span" sx={{ position: "relative", display: "block", height: "12px", overflow: "hidden" }}>
          <Box
            component="span"
            sx={{
              display: "block",
              transform: on ? "translateY(-12px)" : "translateY(0)",
              transition: `transform .38s ${EASE_CSS}`,
            }}
          >
            <Box component="span" sx={{ display: "block", height: "12px", lineHeight: "12px" }}>
              {rest}
            </Box>
            <Box component="span" sx={{ display: "block", height: "12px", lineHeight: "12px" }}>
              {hover}
            </Box>
          </Box>
        </Box>

        <Box
          aria-hidden
          component="span"
          sx={{
            display: "block",
            fontSize: "12px",
            lineHeight: 1,
            transform: on ? "translate(3px,-3px)" : "none",
            transition: `transform .34s ${EASE_CSS}`,
          }}
        >
          ↗
        </Box>
      </Box>
    </Box>
  );
}
