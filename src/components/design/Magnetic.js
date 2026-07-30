import { useCallback, useRef } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { EASE_CSS } from "./tokens";

const DESKTOP_MIN_WIDTH = 900;

/**
 * Nudges a control a few pixels toward the pointer while it is over it.
 *
 * Pointer-only by design: on a touch screen there is no hover to lead into the
 * effect, so below 900px (and under reduced motion) it renders as a plain box.
 */
export default function Magnetic({
  children,
  strength = 9,
  component = "div",
  sx,
  ...rest
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const enabled = !reduceMotion;

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el || !enabled || window.innerWidth < DESKTOP_MIN_WIDTH) return;
      const r = el.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width - 0.5) * strength;
      const dy = ((e.clientY - r.top) / r.height - 0.5) * strength;
      el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
    },
    [enabled, strength]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  }, []);

  return (
    <Box
      ref={ref}
      component={component}
      onMouseMove={enabled ? handleMove : undefined}
      onMouseLeave={enabled ? handleLeave : undefined}
      sx={{ transition: `transform .18s ${EASE_CSS}`, ...sx }}
      {...rest}
    >
      {children}
    </Box>
  );
}
