import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionTypography = motion(Typography);

export function ExtrudedText({
  text,
  variant = "h1",
  fontSize = 80,
  fontWeight = "bold",
  color = "black",
  baseColor = "rgba(0, 0, 0, 0.7)",
  sx,
}) {
  const words = text.split(" ");

  return (
    <MotionTypography
      variant={variant}
      fontSize={fontSize}
      sx={{ color, fontWeight, m: 0, p: 0, userSelect: "none", display: "inline-block", ...sx }}
    >
      {words.map((word, wi) => (
        <span key={`w-${wi}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {Array.from(word).map((ch, i) => (
            <span
              key={`${wi}-${i}`}
              style={{ position: "relative", display: "inline-block", lineHeight: 1 }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  color: baseColor,
                  pointerEvents: "none",
                  zIndex: 0,
                  transform: "none",
                }}
              >
                {ch}
              </span>
              <motion.span
                initial={false}
                animate={{ y: 0, rotateX: "0deg", rotateY: "0deg" }}
                transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -8,
                  rotateX: "10deg",
                  rotateY: "-10deg",
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "inline-block",
                  color,
                  willChange: "transform",
                  transformOrigin: "left bottom",
                  cursor: "default",
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
