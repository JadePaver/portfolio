import { useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { color } from "./tokens";

/**
 * Trailing ring plus a dot that tracks the pointer exactly.
 *
 * The ring lags behind on an eased follow and swells over anything clickable,
 * which is what makes the page feel responsive before you have clicked
 * anything. The native cursor is left visible — this sits on top of it.
 */
export default function CursorFx() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const hasPointer = useMediaQuery("(min-width:900px) and (pointer: fine)");
  const enabled = hasPointer && !reduceMotion;

  useEffect(() => {
    if (!enabled) return undefined;

    // Parked off-screen so nothing flashes at 0,0 before the first move.
    const cur = { x: -80, y: -80, rx: -80, ry: -80, s: 1 };
    let raf = 0;

    const onMove = (e) => {
      cur.x = e.clientX;
      cur.y = e.clientY;
    };
    const onOver = (e) => {
      const t = e.target?.closest?.("a, button, [data-cursor]");
      cur.s = t ? 2.1 : 1;
    };

    const loop = () => {
      cur.rx += (cur.x - cur.rx) * 0.16;
      cur.ry += (cur.y - cur.ry) * 0.16;
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (ring) {
        ring.style.transform = `translate3d(${cur.rx.toFixed(1)}px, ${cur.ry.toFixed(
          1
        )}px, 0) scale(${cur.s.toFixed(2)})`;
        ring.style.opacity = cur.s > 1.5 ? ".55" : ".9";
      }
      if (dot) dot.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Box aria-hidden>
      <Box
        ref={ringRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          m: "-17px 0 0 -17px",
          border: `1px solid ${color.accent}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1350,
          mixBlendMode: "screen",
          transition: "width .2s, height .2s",
        }}
      />
      <Box
        ref={dotRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          m: "-2.5px 0 0 -2.5px",
          bgcolor: color.accent,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1350,
        }}
      />
    </Box>
  );
}
