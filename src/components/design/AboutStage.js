import { useCallback, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import Img from "../Img";
import { color, font, EASE_CSS } from "./tokens";

/** The stage is `min(100%, 430px)`, and the cut-out fills it. */
const PORTRAIT_SIZES = "(max-width: 430px) 100vw, 430px";

/**
 * The About portrait and the exhibit built around it: a tilted dot-grid plate,
 * a breathing glow, two rings, an orbiting dot, the surname set in outline
 * behind the cut-out, and four cards that drift outward on approach.
 *
 * The whole thing is one control. Clicking the portrait advances the chapter,
 * which swaps the copy underneath and moves the highlight to whichever card
 * belongs to that chapter — so the picture and the story stay in step.
 */

/** Where each card drifts to when the stage wakes up: [x, y] in px. */
const CHIP_OUT = { degree: [-13, -9], scope: [13, -11], place: [-15, 4], years: [15, 7], chapter: [0, 10] };

const CHIP_ORDER = ["degree", "scope", "place", "years", "chapter"];

export default function AboutStage({
  src,
  alt,
  activeId,
  chapterLabel,
  chapterYear,
  chapterIndex,
  onAdvance,
  degree = { title: "BS Computer Technology", sub: "Class of 2024" },
  years = "6+",
  location = "Philippines · GMT+8",
}) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const animate = isDesktop && !reduceMotion;

  const stageRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [rings, setRings] = useState([]);
  const [pressed, setPressed] = useState(false);

  const on = animate && hovered;

  // Pointer depth: each layer shifts by its own multiplier, so the cards and
  // the rings separate from the photo rather than sliding with it.
  const handleMove = useCallback(
    (e) => {
      const stage = stageRef.current;
      if (!stage || !animate) return;
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      stage.querySelectorAll("[data-adepth]").forEach((d) => {
        const k = parseFloat(d.getAttribute("data-adepth")) || 0;
        d.style.transform = `translate3d(${(nx * k * 7).toFixed(1)}px, ${(ny * k * 5).toFixed(1)}px, 0)`;
      });
    },
    [animate]
  );

  const handleLeave = useCallback(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.querySelectorAll("[data-adepth]").forEach((d) => {
        d.style.transform = "translate3d(0, 0, 0)";
      });
    }
    setHovered(false);
  }, []);

  const handleClick = () => {
    onAdvance?.();
    if (reduceMotion) return;
    const id = Date.now() + Math.random();
    setRings((prev) => [...prev, id]);
    setTimeout(() => setRings((prev) => prev.filter((r) => r !== id)), 1100);
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
  };

  const ring = (widthPct, top = "63%") => ({
    position: "absolute",
    left: "50%",
    top,
    width: `${widthPct}%`,
    aspectRatio: "1",
    ml: `${-widthPct / 2}%`,
    mt: `${-widthPct / 2}%`,
    pointerEvents: "none",
  });

  // Cards leave in order and return in reverse, so the stage folds itself up.
  const chip = (key, extra = {}) => {
    const [ox, oy] = CHIP_OUT[key];
    const i = CHIP_ORDER.indexOf(key);
    return {
      bgcolor: "rgba(13,15,18,.94)",
      border: `1px solid ${on ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.12)"}`,
      borderRadius: "13px",
      p: "13px 15px",
      boxShadow: "0 18px 40px rgba(0,0,0,.5)",
      transform: on ? `translate3d(${ox}px, ${oy}px, 0)` : "translate3d(0,0,0)",
      opacity: on ? 1 : 0.94,
      transition: `transform .6s ${EASE_CSS}, opacity .5s ease, border-color .5s ease, box-shadow .45s ease, outline-color .35s ease`,
      transitionDelay: `${on ? i * 42 : (CHIP_ORDER.length - 1 - i) * 30}ms`,
      ...extra,
    };
  };

  // The card belonging to the open chapter wears the accent.
  const pinned = (id) => ({
    outline: `1px solid ${activeId === id ? color.accent : "transparent"}`,
    boxShadow:
      activeId === id
        ? "0 18px 40px rgba(0,0,0,.5), 0 0 0 5px rgba(255,106,26,.1)"
        : "0 18px 40px rgba(0,0,0,.5)",
  });

  const connector = (side) => ({
    position: "absolute",
    [side === "right" ? "right" : "left"]: side === "right" ? "-30px" : "-28px",
    top: "50%",
    width: side === "right" ? "30px" : "28px",
    height: "1px",
    background: `linear-gradient(${side === "right" ? "90deg" : "270deg"}, rgba(255,106,26,.75), transparent)`,
    transform: `scaleX(${on ? 1 : 0})`,
    transformOrigin: side === "right" ? "0 50%" : "100% 50%",
    transition: `transform .55s ${EASE_CSS}`,
  });

  const chipEyebrow = {
    fontFamily: font.mono,
    fontSize: "9px",
    letterSpacing: ".2em",
    textTransform: "uppercase",
    color: color.accent,
  };

  return (
    <Box
      ref={stageRef}
      onMouseMove={animate ? handleMove : undefined}
      onMouseEnter={animate ? () => setHovered(true) : undefined}
      onMouseLeave={animate ? handleLeave : undefined}
      sx={{
        position: "relative",
        zIndex: 2,
        width: "min(100%, 430px)",
        aspectRatio: "1138 / 1492",
        m: "0 auto 34px",
      }}
    >
      {/* Plate — a dot grid on a dark card, kicked off-axis */}
      <Box data-adepth="-1.4" aria-hidden sx={{ position: "absolute", inset: "5% 3% 9% 3%", zIndex: 0, pointerEvents: "none" }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "20px",
            background:
              "radial-gradient(rgba(255,255,255,.09) 1px, transparent 1px) 0 0/16px 16px, linear-gradient(168deg,#13161A 0%,#0C0E11 76%)",
            border: `1px solid ${on ? "rgba(255,106,26,.32)" : "rgba(255,255,255,.09)"}`,
            boxShadow: on ? "0 40px 90px rgba(0,0,0,.6)" : "0 30px 70px rgba(0,0,0,.5)",
            transform: on ? "rotate(-1.2deg) scale(1.028)" : "rotate(-3.6deg) scale(1)",
            transition: `transform .85s ${EASE_CSS}, border-color .55s ease, box-shadow .55s ease`,
          }}
        />
      </Box>

      {/* Glow */}
      <Box
        aria-hidden
        sx={{
          ...ring(96),
          zIndex: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,106,26,.3), rgba(255,106,26,.05) 58%, transparent 72%)",
          filter: "blur(28px)",
          animation: reduceMotion ? "none" : "jp-breathe 9s ease-in-out infinite",
        }}
      />

      {/* Rings */}
      <Box data-adepth="1.8" aria-hidden sx={{ ...ring(105), zIndex: 1 }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            border: "1px solid rgba(255,106,26,.34)",
            borderRadius: "50%",
            transform: on ? "scale(1.03)" : "scale(1)",
            opacity: on ? 1 : 0.7,
            transition: `transform .8s ${EASE_CSS}, opacity .6s ease`,
          }}
        />
      </Box>
      <Box data-adepth="2.8" aria-hidden sx={{ ...ring(113), zIndex: 1 }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            border: "1px dashed rgba(255,255,255,.14)",
            borderRadius: "50%",
            transform: on ? "scale(1.042)" : "scale(1)",
            opacity: on ? 1 : 0.7,
            transition: `transform .8s ${EASE_CSS}, opacity .6s ease`,
          }}
        />
      </Box>

      {/* Orbiting dot */}
      <Box data-adepth="3.4" aria-hidden sx={{ ...ring(113), zIndex: 1 }}>
        <Box sx={{ position: "absolute", inset: 0, animation: reduceMotion ? "none" : "jp-spin 44s linear infinite" }}>
          <Box
            component="span"
            sx={{
              position: "absolute",
              top: "-5px",
              left: "50%",
              width: 10,
              height: 10,
              ml: "-5px",
              borderRadius: "50%",
              bgcolor: color.accent,
              boxShadow: "0 0 0 5px rgba(255,106,26,.12)",
            }}
          />
        </Box>
      </Box>

      {/* Surname, set in outline behind the cut-out */}
      <Box
        data-adepth="-2.4"
        aria-hidden
        sx={{ position: "absolute", left: 0, right: 0, bottom: "15%", zIndex: 1, pointerEvents: "none", textAlign: "center" }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-block",
            fontFamily: font.sans,
            fontSize: "clamp(62px, 13vw, 108px)",
            fontWeight: 900,
            letterSpacing: "-.055em",
            lineHeight: 0.8,
            color: "transparent",
            WebkitTextStroke: "1.4px rgba(255,255,255,.28)",
            whiteSpace: "nowrap",
            opacity: on ? 1 : 0.62,
            transform: on ? "translateY(-10px) scale(1.045)" : "translateY(0) scale(1)",
            transition: `transform .85s ${EASE_CSS}, opacity .6s ease`,
          }}
        >
          PAVER
        </Box>
      </Box>

      {/* Rings thrown off by a click */}
      <Box aria-hidden sx={{ ...ring(99), zIndex: 2 }}>
        {rings.map((id) => (
          <Box
            key={id}
            sx={{
              position: "absolute",
              inset: 0,
              border: `2px solid ${color.accent}`,
              borderRadius: "50%",
              animation: `jp-pulsering 1.05s ${EASE_CSS} forwards`,
            }}
          />
        ))}
      </Box>

      <Box
        component="button"
        type="button"
        onClick={handleClick}
        aria-label={`${chapterLabel} — show the next chapter`}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          p: 0,
          border: 0,
          background: "transparent",
          cursor: "pointer",
          "&:focus-visible": { outline: `3px solid ${color.accent}`, outlineOffset: "4px" },
        }}
      >
        <Img
          src={src}
          alt={alt}
          sizes={PORTRAIT_SIZES}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            transform: pressed
              ? `translateY(${on ? -8 : 5}px) scale(.99)`
              : on
              ? "translateY(-13px) scale(1.018)"
              : "translateY(0) scale(1)",
            filter: on
              ? "drop-shadow(0 46px 74px rgba(0,0,0,.66))"
              : "drop-shadow(0 28px 52px rgba(0,0,0,.55))",
            transition: `transform ${pressed ? ".19s cubic-bezier(.4,0,.2,1)" : `.85s ${EASE_CSS}`}, filter .85s ${EASE_CSS}`,
          }}
        />
      </Box>

      {/* ---- Cards ---------------------------------------------------------- */}

      <Box data-adepth="-4.2" sx={{ position: "absolute", left: "1%", top: "30%", width: "min(42%, 158px)", zIndex: 5, pointerEvents: "none" }}>
        <Box sx={{ ...chip("degree", { position: "relative" }), ...pinned("degree") }}>
          <Box sx={chipEyebrow}>Degree</Box>
          <Box sx={{ mt: "7px", fontSize: "14px", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-.015em", color: color.title }}>
            {degree.title}
          </Box>
          <Box sx={{ mt: "6px", fontFamily: font.mono, fontSize: "9.5px", letterSpacing: ".14em", textTransform: "uppercase", color: color.faint }}>
            {degree.sub}
          </Box>
          <Box aria-hidden sx={connector("right")} />
        </Box>
      </Box>

      <Box data-adepth="-3.6" sx={{ position: "absolute", right: "1%", top: "13%", width: "min(37%, 146px)", zIndex: 5, pointerEvents: "none" }}>
        <Box sx={{ ...chip("scope", { p: "12px 14px", position: "relative" }), ...pinned("start") }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <Box component="span" sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: color.accent, flex: "0 0 auto" }} />
            <Box component="span" sx={{ fontFamily: font.mono, fontSize: "9px", letterSpacing: ".18em", textTransform: "uppercase", color: color.dim }}>
              Scope
            </Box>
          </Box>
          <Box sx={{ mt: "8px", fontSize: "20px", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1, color: color.title }}>
            End&#8209;to&#8209;end
          </Box>
          <Box sx={{ mt: "6px", fontFamily: font.mono, fontSize: "9px", letterSpacing: ".14em", textTransform: "uppercase", color: color.faint, lineHeight: 1.5 }}>
            Schema · API
            <br />
            Web · Mobile
          </Box>
        </Box>
      </Box>

      <Box data-adepth="-5" sx={{ position: "absolute", left: "1%", top: "62%", zIndex: 5, pointerEvents: "none" }}>
        <Box
          sx={chip("place", {
            display: "flex",
            alignItems: "center",
            gap: "9px",
            borderRadius: "999px",
            p: "9px 14px",
            boxShadow: "0 14px 32px rgba(0,0,0,.45)",
          })}
        >
          <Box
            component="span"
            sx={{ fontFamily: font.mono, fontSize: "9.5px", letterSpacing: ".16em", textTransform: "uppercase", color: "#C9C6C2", whiteSpace: "nowrap" }}
          >
            {location}
          </Box>
        </Box>
      </Box>

      <Box data-adepth="-4.6" sx={{ position: "absolute", right: "1%", top: "70%", width: "min(35%, 132px)", zIndex: 5, pointerEvents: "none" }}>
        <Box sx={{ ...chip("years", { p: "13px 14px", position: "relative" }), ...pinned("now") }}>
          <Box sx={{ fontSize: "26px", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1, color: color.accent }}>{years}</Box>
          <Box sx={{ mt: "7px", fontFamily: font.mono, fontSize: "9px", letterSpacing: ".16em", textTransform: "uppercase", color: color.dim, lineHeight: 1.5 }}>
            Years
            <br />
            shipping
          </Box>
          <Box aria-hidden sx={connector("left")} />
        </Box>
      </Box>

      {/* Chapter capsule */}
      <Box sx={{ position: "absolute", left: "50%", bottom: "-2%", transform: "translateX(-50%)", zIndex: 5, pointerEvents: "none" }}>
        <Box
          sx={chip("chapter", {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            bgcolor: "rgba(13,15,18,.96)",
            borderRadius: "999px",
            p: "10px 16px",
            boxShadow: "0 16px 36px rgba(0,0,0,.5)",
          })}
        >
          <Box
            component="span"
            aria-hidden
            sx={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: color.accent,
              flex: "0 0 auto",
              animation: reduceMotion ? "none" : "jp-pulse 2.4s infinite",
            }}
          />
          <Box component="span" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Box
              component="span"
              sx={{ fontFamily: font.mono, fontSize: "9.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "#C9C6C2", whiteSpace: "nowrap" }}
            >
              {chapterLabel}
            </Box>
            <Box component="span" sx={{ width: "1px", height: 12, bgcolor: "rgba(255,255,255,.16)" }} />
            <Box
              component="span"
              sx={{ fontFamily: font.mono, fontSize: "9.5px", letterSpacing: ".18em", textTransform: "uppercase", color: color.accent, whiteSpace: "nowrap" }}
            >
              {chapterYear}
            </Box>
          </Box>
          <Box
            component="span"
            sx={{ fontFamily: font.mono, fontSize: "9px", letterSpacing: ".14em", color: color.ghost, whiteSpace: "nowrap" }}
          >
            {chapterIndex}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
