import React, { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRouteTransition } from "../transitions/RouteTransition";
import { SignatureFrame, SignatureMotif, FRAME_KINDS, MOTIF_KINDS } from "./design/WorkMarks";
import { ProjectScene, SCENE_KINDS } from "./design/ProjectScenes";
import { color, font, rgbChannels, EASE_CSS } from "./design/tokens";

const MotionBox = motion(Box);

const EASE = [0.22, 1, 0.36, 1];

// Covers are 1780x1956 posters, so the frame matches them exactly — nothing gets cropped.
const COVER_RATIO = "890 / 978";

const TILT_SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

// forwardRef so AnimatePresence's popLayout mode can measure the card on exit.
// `focused` is the shelf's spotlight — the hovered card, the arrows' sticky
// selection, or failing both the card resting at the center. It wears the
// lift shadow and tint ring like a hover, but the case-study overlay stays
// down.
const ProjectCard = forwardRef(function ProjectCard(
  { project, index = 0, activeCategory = "All", dimmed = false, focused = false, onHoverChange },
  ref
) {
  const {
    title,
    summary,
    image,
    category = [],
    tech = [],
    year,
    link,
    color: tint,
    cat,
    motif,
    frame,
    sig,
    scene,
  } = project;
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();

  const to = `/projects/${String(link ?? "").replace(/^\//, "")}`;
  const accent = useMemo(() => rgbChannels(tint), [tint]);
  const accentColor = `rgb(${accent})`;

  // Every project carries its own mark. Projects that do not name one fall back
  // to a cycle by position, so no two neighbours share a signature.
  const motifKind = motif ?? MOTIF_KINDS[index % MOTIF_KINDS.length];
  const frameKind = frame ?? FRAME_KINDS[index % FRAME_KINDS.length];
  const sigLabel = sig ?? motifKind;
  const sceneKind = scene ?? SCENE_KINDS[index % SCENE_KINDS.length];

  const { enterProject } = useRouteTransition();
  const posterRef = useRef(null);

  // Hand the cover's on-screen box to the route transition so the detail page
  // grows out of the card that was clicked. Modified clicks fall through to the
  // browser so "open in new tab" still works.
  const handleClick = (e) => {
    if (!enterProject) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const node = posterRef.current;
    if (!node) return;
    e.preventDefault();
    const r = node.getBoundingClientRect();
    enterProject({
      to,
      title,
      image,
      color: tint,
      rect: { top: r.top, left: r.left, width: r.width, height: r.height },
    });
  };

  // ---- Pointer-driven tilt + spotlight -------------------------------------
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [6.5, -6.5]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), TILT_SPRING);

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(320px circle at ${glareX} ${glareY}, rgba(255,255,255,0.30), transparent 68%)`;

  const handlePointerMove = (e) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  // A cached image can finish loading before React attaches onLoad, which would
  // leave the skeleton stuck on top of it.
  const imgRef = useCallback((node) => {
    if (node?.complete) setLoaded(true);
  }, []);

  // The meta row shows one category. Lead with the one the visitor is filtering
  // by, so the card explains why it survived the filter.
  const shownCategory = useMemo(() => {
    if (activeCategory !== "All" && category.includes(activeCategory)) return activeCategory;
    return cat ?? category[0] ?? "";
  }, [activeCategory, category, cat]);

  const stackLine = useMemo(() => tech.map((t) => t.label).join("  ·  "), [tech]);

  const setHover = (next) => () => {
    setActive(next);
    onHoverChange?.(next ? index : null);
    if (!next) {
      px.set(0.5);
      py.set(0.5);
    }
  };

  return (
    <MotionBox
      ref={ref}
      component="article"
      layout
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 46, scale: 0.94, rotate: -1.2 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      exit={{ opacity: 0, y: -12, scale: 0.94 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: EASE,
        delay: reduceMotion ? 0 : Math.min(index * 0.09, 0.45),
      }}
      sx={{ height: "100%" }}
    >
      {/* Idle breathing — phase-shifted per card so the shelf never pulses in
          unison. Also the perspective host: `perspective` only reaches direct
          children, so it has to sit on the tilting element's parent. */}
      <MotionBox
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 7.5 + (index % 3) * 1.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.7,
              }
        }
        sx={{ position: "relative", height: "100%", perspective: "1400px" }}
      >
        <MotionBox
          component={RouterLink}
          to={to}
          aria-label={`${title} — open case study`}
          animate={active ? "hover" : "rest"}
          initial="rest"
          variants={{ rest: { y: 0 }, hover: { y: reduceMotion ? 0 : -7 } }}
          whileTap={reduceMotion ? undefined : { scale: 0.985 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          style={reduceMotion ? undefined : { rotateX, rotateY }}
          onPointerEnter={setHover(true)}
          onPointerLeave={setHover(false)}
          onPointerMove={handlePointerMove}
          onClick={handleClick}
          onFocus={(e) => {
            // Only reveal the overlay for keyboard focus, not a mouse click.
            try {
              if (e.currentTarget.matches(":focus-visible")) setActive(true);
            } catch {
              setActive(true);
            }
          }}
          onBlur={setHover(false)}
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            textDecoration: "none",
            bgcolor: color.paperCard,
            border: "1px solid rgba(0,0,0,.1)",
            boxShadow:
              active || focused ? "0 28px 56px rgba(28,18,4,.16)" : "0 0 0 rgba(28,18,4,0)",
            // Dimming the unhovered cards is CSS rather than a motion value so
            // it can't collide with the entrance animation's opacity.
            opacity: dimmed ? 0.58 : 1,
            filter: dimmed ? "saturate(0.8)" : "none",
            transition: `box-shadow .42s ease, opacity .38s ease, filter .38s ease`,
            "&:focus-visible": {
              outline: `3px solid ${color.accentRaw}`,
              outlineOffset: "3px",
            },
          }}
        >
          {/* Tint ring — the project's own colour, closing around the card on hover */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              pointerEvents: "none",
              boxShadow:
                active || focused
                  ? `inset 0 0 0 1.5px ${accentColor}`
                  : "inset 0 0 0 0 rgba(0,0,0,0)",
              transition: "box-shadow .35s ease",
            }}
          />

          {/* ---------- Cover ---------- */}
          <Box
            ref={posterRef}
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: COVER_RATIO,
              overflow: "hidden",
              bgcolor: color.paperWell,
            }}
          >
            {/* Skeleton — the covers are ~1MB each, so the wait is visible */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: 0,
                opacity: loaded ? 0 : 1,
                transition: "opacity 400ms ease",
                pointerEvents: "none",
                background: "linear-gradient(100deg, #EDE7DF 30%, #F7F3ED 50%, #EDE7DF 70%)",
                backgroundSize: "220% 100%",
                "@keyframes projectCoverShimmer": {
                  "0%": { backgroundPosition: "220% 0" },
                  "100%": { backgroundPosition: "-220% 0" },
                },
                animation: "projectCoverShimmer 1.6s linear infinite",
              }}
            />

            <MotionBox
              ref={imgRef}
              component="img"
              src={image}
              alt={`${title} cover`}
              loading="lazy"
              decoding="async"
              draggable={false}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
              variants={{ rest: { scale: 1 }, hover: { scale: reduceMotion ? 1 : 1.06 } }}
              transition={{ duration: 0.7, ease: EASE }}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                opacity: loaded ? 1 : 0,
                transition: "opacity 500ms ease",
                willChange: "transform",
              }}
            />

            {/* The project's signature frame, drawn in its own tint */}
            <SignatureFrame kind={frameKind} tint={tint} />

            {/* Cursor spotlight */}
            {!reduceMotion && (
              <MotionBox
                aria-hidden
                style={{ backgroundImage: glare }}
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  pointerEvents: "none",
                  mixBlendMode: "soft-light",
                }}
              />
            )}

            {/* Hover / focus overlay — blurs the cover back and brings the stack forward */}
            <MotionBox
              aria-hidden
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2.5,
                p: 2,
                pointerEvents: "none",
                background: "linear-gradient(180deg, rgba(8,10,12,0.52) 0%, rgba(8,10,12,0.80) 100%)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
            >
              {tech.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 0.75,
                    maxWidth: 260,
                  }}
                >
                  {tech.map((t, ti) => (
                    <MotionBox
                      key={t.label}
                      variants={{
                        rest: { opacity: 0, y: 14, scale: 0.9 },
                        hover: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 26,
                        delay: 0.05 + ti * 0.05,
                      }}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.6,
                        px: 1,
                        py: 0.45,
                        bgcolor: "rgba(255,255,255,0.13)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                      }}
                    >
                      <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/icons/${t.icon}`}
                        alt=""
                        sx={{ width: 14, height: 14, display: "block" }}
                      />
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: font.mono,
                          fontSize: 10.5,
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.92)",
                          lineHeight: 1,
                        }}
                      >
                        {t.label}
                      </Typography>
                    </MotionBox>
                  ))}
                </Box>
              )}

              <MotionBox
                variants={{
                  rest: { opacity: 0, y: 16, scale: 0.94 },
                  hover: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.12 }}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  px: 2.2,
                  py: 1,
                  bgcolor: accentColor,
                  boxShadow: `0 10px 28px rgba(${accent},0.5)`,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontFamily: font.mono,
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#0B0C0E",
                    lineHeight: 1,
                  }}
                >
                  View Case Study
                </Typography>
                <ArrowOutwardIcon sx={{ fontSize: 14, color: "#0B0C0E" }} />
              </MotionBox>
            </MotionBox>
          </Box>

          {/* ---------- Caption ---------- */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "9px",
              flex: 1,
              p: "15px 17px 17px",
              borderTop: "1px solid rgba(0,0,0,.09)",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "11px",
                fontFamily: font.mono,
                fontSize: 9.5,
                letterSpacing: ".18em",
                textTransform: "uppercase",
              }}
            >
              <Box component="span" sx={{ color: "#BDB5AA" }}>
                {String(index + 1).padStart(2, "0")}
              </Box>
              <Box component="span" sx={{ color: accentColor }}>
                {shownCategory}
              </Box>
              {year && (
                <Box component="span" sx={{ ml: "auto", color: color.paperMuted }}>
                  {year}
                </Box>
              )}
            </Box>

            <Typography
              component="h3"
              sx={{
                m: 0,
                fontFamily: font.sans,
                fontSize: "19.5px",
                fontWeight: 700,
                letterSpacing: "-.025em",
                lineHeight: 1.18,
                color: color.paperInk,
                textWrap: "balance",
              }}
            >
              {title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <SignatureMotif kind={motifKind} tint={tint} size={11} />
              <Box
                component="span"
                sx={{
                  fontFamily: font.mono,
                  fontSize: 9,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color: accentColor,
                }}
              >
                {sigLabel}
              </Box>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(0,0,0,.12)" }} />
            </Box>

            {summary && (
              <Typography
                sx={{
                  m: 0,
                  pl: "12px",
                  borderLeft: `2px solid rgba(${accent},0.35)`,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: color.paperBody,
                  textWrap: "pretty",
                }}
              >
                {summary}
              </Typography>
            )}

            {stackLine && (
              <Box
                sx={{
                  fontFamily: font.mono,
                  fontSize: 10.5,
                  lineHeight: 1.65,
                  letterSpacing: ".02em",
                  color: "#948D83",
                }}
              >
                {stackLine}
              </Box>
            )}

            <Box
              sx={{
                mt: "auto",
                pt: "13px",
                display: "flex",
                alignItems: "center",
                gap: "9px",
                fontFamily: font.mono,
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: active || focused ? accentColor : color.paperInk,
                transition: `color .28s ${EASE_CSS}`,
              }}
            >
              Open case study
              <MotionBox
                aria-hidden
                component="span"
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                sx={{ fontSize: 12, lineHeight: 1 }}
              >
                →
              </MotionBox>
            </Box>
          </Box>
        </MotionBox>

        {/* The project's diorama. Mounted OUTSIDE the link's overflow clip so
            its pieces can straddle the card edge and its travelers can lap the
            whole outline — inside and outside the card at once. It rides the
            idle breathing but not the tilt, which keeps the travelers steady
            while the card leans under them. */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 6,
            pointerEvents: "none",
            opacity: dimmed ? 0.35 : 1,
            transition: "opacity 380ms ease",
          }}
        >
          <ProjectScene kind={sceneKind} tint={tint} />
        </Box>
      </MotionBox>
    </MotionBox>
  );
});

export default ProjectCard;
