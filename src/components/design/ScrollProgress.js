import { Box } from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import { color } from "./tokens";

const MotionBox = motion(Box);

/** Two-pixel read-position bar pinned above the header. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 1300,
        bgcolor: "rgba(255,255,255,.06)",
        pointerEvents: "none",
      }}
    >
      <MotionBox
        style={{ scaleX }}
        sx={{
          height: "100%",
          bgcolor: color.accent,
          transformOrigin: "0 50%",
        }}
      />
    </Box>
  );
}
