import { Box } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./tokens";

const MotionBox = motion(Box);

/**
 * Fades a block up into place the first time it crosses into view.
 *
 * The landing page uses this instead of per-section variants because almost
 * every block wants the same move and only differs in its stagger delay.
 * Under `prefers-reduced-motion` the block renders in its final state, which
 * matters more than usual here: everything below the hero starts at opacity 0.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 18,
  component = "div",
  sx,
  ...rest
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Box component={component} sx={sx} {...rest}>
        {children}
      </Box>
    );
  }

  return (
    <MotionBox
      component={component}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06, margin: "0px 0px -6% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      sx={sx}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}
