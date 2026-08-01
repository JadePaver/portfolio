import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { font, ink } from "./tokens";

/**
 * The tagline strip that closes the hero.
 *
 * Two identical copies scroll under a `-50%` translate, so the loop restarts
 * on a seam that lines up exactly. Under reduced motion it holds still as a
 * single static line.
 */
export default function Ticker({ text, color }) {
  const reduceMotion = useReducedMotion();

  const line = (cloned) => (
    <Box
      component="span"
      aria-hidden={cloned || undefined}
      sx={{
        display: "inline-block",
        p: "11px 0",
        fontFamily: font.mono,
        fontSize: "10px",
        letterSpacing: ".3em",
        textTransform: "uppercase",
        color,
        whiteSpace: "pre",
      }}
    >
      {text}
    </Box>
  );

  return (
    <Box
      aria-hidden
      sx={{
        mt: "clamp(34px, 4.5vw, 54px)",
        borderTop: `1px solid ${ink.lineSoft}`,
        borderBottom: `1px solid ${ink.lineSoft}`,
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          willChange: reduceMotion ? undefined : "transform",
          animation: reduceMotion ? "none" : "jp-marquee 30s linear infinite",
        }}
      >
        {line(false)}
        {!reduceMotion && line(true)}
      </Box>
    </Box>
  );
}
