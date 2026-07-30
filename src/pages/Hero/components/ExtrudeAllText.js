import { Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionTypography = motion(Typography);

export function ExtrudeAllText({
  text,
  variant = "h5",
  fontWeight = 700,
  fontSize,
  color = "inherit",
  sx,
  lift = 3.5,
  tiltX = 10,
  tiltY = -10,
  baseColor,
  enterDuration = 0.18,
  exitDuration = 0.6,
}) {
  const theme = useTheme();

  const resolvedBaseColor =
    baseColor ??
    (color === "primary.main" ? theme.palette.primary.dark : "#C84E00");

  const container = { rest: {}, hover: {} };

  const faceChar = {
    rest: { y: 0, rotateX: "0deg", rotateY: "0deg" },
    hover: {
      y: -lift,
      rotateX: `${tiltX}deg`,
      rotateY: `${tiltY}deg`,
      transition: { duration: enterDuration, ease: "easeOut" },
    },
  };

  const baseChar = {
    rest: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.08, ease: "linear" } },
  };

  const words = text.split(" ");

  return (
    <MotionTypography
      variant={variant}
      fontSize={fontSize}
      sx={{ color, fontWeight, display: "inline-block", ...sx }}
      variants={container}
      initial="rest"
      animate="rest"
      whileHover="hover"
      transition={{ duration: exitDuration, ease: [0.16, 1, 0.3, 1] }}
    >
      {words.map((word, wi) => (
        <span key={`w-${wi}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {Array.from(word).map((ch, i) => (
            <span
              key={`${wi}-${i}`}
              style={{ position: "relative", display: "inline-block" }}
            >
              <motion.span
                aria-hidden
                variants={baseChar}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  color: resolvedBaseColor,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                {ch}
              </motion.span>
              <motion.span
                variants={faceChar}
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "inline-block",
                  willChange: "transform",
                  transformOrigin: "left bottom",
                }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </MotionTypography>
  );
}
