import { Box } from "@mui/material";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Ambient surface that sits behind the Projects section.
 *
 * The section used to be transparent, so five fully-illustrated covers floated
 * on bare white with nothing holding them together. This gives them ground:
 * a warm tint, a dot grid, and slow-drifting brand-coloured blobs — all
 * feathered top and bottom so the band dissolves into the page instead of
 * butting against it with a seam.
 */
export default function ProjectsBackdrop({ scrollTargetRef }) {
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start end", "end start"],
  });

  // Blobs drift against the scroll direction for depth.
  const blobsY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        // Feathers the whole band into the white page above and below.
        maskImage:
          "linear-gradient(to bottom, transparent 0, #000 120px, #000 calc(100% - 140px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0, #000 120px, #000 calc(100% - 140px), transparent 100%)",
      }}
    >
      {/* Warm base wash */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #FFFDFB 0%, #FFF6EE 32%, #FFF3E8 62%, #FFFAF6 100%)",
        }}
      />

      {/* Dot grid, faded toward the edges so it never reads as a hard texture */}
      <Box
        component={motion.div}
        style={reduceMotion ? undefined : { y: gridY }}
        sx={{
          position: "absolute",
          inset: "-4% 0",
          backgroundImage:
            "radial-gradient(circle, rgba(253,111,0,0.16) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 78% 62% at 50% 45%, #000 30%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 62% at 50% 45%, #000 30%, transparent 76%)",
        }}
      />

      {/* Drifting colour blobs */}
      <Box
        component={motion.div}
        style={reduceMotion ? undefined : { y: blobsY }}
        sx={{
          position: "absolute",
          inset: 0,
          "@keyframes blobDriftA": {
            "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
            "50%": { transform: "translate3d(6%, 5%, 0) scale(1.14)" },
          },
          "@keyframes blobDriftB": {
            "0%,100%": { transform: "translate3d(0,0,0) scale(1.05)" },
            "50%": { transform: "translate3d(-7%, -4%, 0) scale(0.92)" },
          },
          "@keyframes blobDriftC": {
            "0%,100%": { transform: "translate3d(0,0,0) scale(0.96)" },
            "50%": { transform: "translate3d(4%, -6%, 0) scale(1.1)" },
          },
          "@media (prefers-reduced-motion: reduce)": {
            "& > *": { animation: "none !important" },
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-14%",
            left: "-10%",
            width: "46vw",
            height: "46vw",
            maxWidth: 720,
            maxHeight: 720,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, rgba(253,111,0,0.28) 0%, rgba(253,111,0,0.10) 45%, transparent 70%)",
            filter: "blur(48px)",
            animation: "blobDriftA 24s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "18%",
            right: "-14%",
            width: "42vw",
            height: "42vw",
            maxWidth: 660,
            maxHeight: 660,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 60% 40%, rgba(255,61,110,0.22) 0%, rgba(255,61,110,0.08) 48%, transparent 72%)",
            filter: "blur(56px)",
            animation: "blobDriftB 30s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-16%",
            left: "26%",
            width: "40vw",
            height: "40vw",
            maxWidth: 620,
            maxHeight: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,183,77,0.26) 0%, rgba(255,183,77,0.09) 46%, transparent 70%)",
            filter: "blur(52px)",
            animation: "blobDriftC 27s ease-in-out infinite",
            willChange: "transform",
          }}
        />
      </Box>

      {/* Hairline rules that mark the top and bottom of the band */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(253,111,0,0.28), transparent)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(253,111,0,0.22), transparent)",
        }}
      />
    </Box>
  );
}
