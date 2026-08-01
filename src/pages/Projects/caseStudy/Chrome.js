import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import { useCaseTheme } from "./context";
import { ACCENT, font, ink } from "./tokens";

const MotionBox = motion(Box);

/** Height of the fixed header, so anchored jumps clear it. */
export const HEADER_OFFSET = 92;

/** Two-pixel read-position bar pinned above the header. */
export function ReadingBar() {
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
        zIndex: 90,
        bgcolor: "rgba(255,255,255,.06)",
        pointerEvents: "none",
      }}
    >
      <MotionBox
        style={{ scaleX }}
        sx={{ height: "100%", bgcolor: ACCENT, transformOrigin: "0 50%" }}
      />
    </Box>
  );
}

/** The active case study's signature glyph. */
export function CaseMark({ size = 16 }) {
  const theme = useCaseTheme();
  const Mark = theme?.mark;
  return Mark ? <Mark size={size} /> : null;
}

const navLinkSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  background: "transparent",
  border: 0,
  p: 0,
  cursor: "pointer",
  fontFamily: font.mono,
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: ".2em",
  textTransform: "uppercase",
  color: ink.hint,
  transition: "color .25s ease",
  "&:hover": { color: ink.text },
  "&:focus-visible": { outline: `2px solid ${ACCENT}`, outlineOffset: 4 },
};

/**
 * Fixed header: back to the grid on the left, the next case study on the right.
 *
 * The header only ever offers the forward move — it is 14px of chrome that has
 * to survive down to a phone, and the way back is already the left-hand link.
 * Walking the series backwards lives in the footer, where there is room for it.
 *
 * `next` is a series entry (see `series.js`), which arrives carrying its own
 * wording: "Next — ICTD App" through the run, "First — Ledger" on the last case
 * study, where the sequence wraps and calling it next would promise a sixth.
 */
export function CaseHeader({ label, next, onBack, onNext }) {
  const isWide = useMediaQuery("(min-width:880px)");

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: "2px",
        left: 0,
        right: 0,
        zIndex: 80,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${ink.lineSoft}`,
        bgcolor: "rgba(11,12,14,.72)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          maxWidth: 1240,
          mx: "auto",
          p: "14px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <Box component="button" type="button" onClick={onBack} sx={navLinkSx}>
          <Box component="span" aria-hidden sx={{ fontSize: "13px", lineHeight: 1 }}>
            ←
          </Box>
          <span>All work</span>
        </Box>

        {isWide && (
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: "11px",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            <CaseMark />
            <Box
              component="span"
              sx={{
                fontFamily: font.mono,
                fontSize: "9.5px",
                letterSpacing: ".26em",
                textTransform: "uppercase",
                color: ink.lead,
              }}
            >
              {label}
            </Box>
          </Box>
        )}

        {next && (
          <Box component="button" type="button" onClick={onNext} sx={navLinkSx}>
            <span>{next.label}</span>
            <Box component="span" aria-hidden sx={{ fontSize: "12px", lineHeight: 1 }}>
              ↗
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

/**
 * Tracks which chapter the reader is in.
 *
 * The band is deliberately narrow — a chapter only counts as active once it
 * occupies the middle tenth of the viewport, so the rail does not flicker
 * between two sections while a figure scrolls past.
 */
export function useActiveChapter(ids) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!nodes.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: 0 }
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/**
 * Left-edge chapter rail. Only appears above 1420px, where there is room
 * beside the 1240px shell for it not to crowd the text.
 */
export function ChapterRail({ chapters, activeId, onSelect }) {
  const hasRoom = useMediaQuery("(min-width:1420px)");
  if (!hasRoom) return null;

  return (
    <Box
      component="nav"
      aria-label="Chapters"
      sx={{
        position: "fixed",
        left: "26px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 70,
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {chapters.map(({ id, label }) => {
        const on = activeId === id;
        return (
          <Box
            key={id}
            component="button"
            type="button"
            onClick={() => onSelect(id)}
            aria-current={on ? "true" : undefined}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              background: "transparent",
              border: 0,
              p: 0,
              cursor: "pointer",
              color: on ? ACCENT : ink.ghost,
              transition: "color .25s ease",
              "&:hover": { color: on ? ACCENT : ink.text },
              "&:focus-visible": { outline: `2px solid ${ACCENT}`, outlineOffset: 4 },
            }}
          >
            <Box
              component="span"
              sx={{
                display: "block",
                height: "1px",
                width: on ? "26px" : "13px",
                bgcolor: "currentColor",
                transition: "width .3s cubic-bezier(.2,.8,.2,1)",
              }}
            />
            <Box
              component="span"
              sx={{
                fontFamily: font.mono,
                fontSize: "8.5px",
                letterSpacing: ".2em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
