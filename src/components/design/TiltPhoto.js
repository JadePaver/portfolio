import { useCallback, useRef } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { color, font, EASE_CSS } from "./tokens";

const DESKTOP_MIN_WIDTH = 900;

/**
 * The About photo, mounted like a print in a paper frame that tilts toward the
 * pointer. The image scales up a touch at the same time so it stays bled to the
 * edges of the window as the frame turns.
 */
export default function TiltPhoto({ src, alt, caption, tag, ratio = "1138 / 1492" }) {
  const frameRef = useRef(null);
  const imgRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleMove = useCallback(
    (e) => {
      if (reduceMotion || window.innerWidth < DESKTOP_MIN_WIDTH) return;
      const host = e.currentTarget;
      const r = host.getBoundingClientRect();
      const rx = (0.5 - (e.clientY - r.top) / r.height) * 7;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
      if (frameRef.current) {
        frameRef.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(
          2
        )}deg) translateZ(10px)`;
      }
      if (imgRef.current) imgRef.current.style.transform = "scale(1.05)";
    },
    [reduceMotion]
  );

  const handleLeave = useCallback(() => {
    if (frameRef.current) {
      frameRef.current.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
    if (imgRef.current) imgRef.current.style.transform = "scale(1.01)";
  }, []);

  return (
    <Box
      onMouseMove={reduceMotion ? undefined : handleMove}
      onMouseLeave={reduceMotion ? undefined : handleLeave}
      sx={{ position: "relative", zIndex: 2, maxWidth: 400, perspective: "1100px" }}
    >
      <Box
        ref={frameRef}
        sx={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: `transform .55s ${EASE_CSS}`,
          bgcolor: color.paper,
          borderRadius: "14px",
          p: "14px 14px 0",
          boxShadow: "0 26px 56px rgba(0,0,0,.5)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            bgcolor: "#E7E0D6",
            aspectRatio: ratio,
          }}
        >
          <Box
            ref={imgRef}
            component="img"
            src={src}
            alt={alt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
              transform: "scale(1.01)",
              transition: `transform .7s ${EASE_CSS}`,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            p: "13px 2px 15px",
            fontFamily: font.mono,
            fontSize: "10px",
            letterSpacing: ".16em",
            textTransform: "uppercase",
          }}
        >
          <Box component="span" sx={{ color: "#6B655C" }}>
            {caption}
          </Box>
          <Box component="span" sx={{ color: color.accent }}>
            {tag}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
