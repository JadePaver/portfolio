import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import Img from "../Img";
import { color, font, EASE_CSS } from "./tokens";

/** The stage is `min(100%, 470px)`, and the cut-out fills it. */
const PORTRAIT_SIZES = "(max-width: 470px) 100vw, 470px";

const SEAL_PHRASE = "JADE N. PAVER · SOFTWARE DEVELOPER · WEB · MOBILE · UI/UX · ";

/** Answers to the questions people ask first, one card at a time. */
const FACTS = [
  { label: "Role", value: "Software developer building web and mobile products end to end." },
  { label: "Based in", value: "Philippines, GMT+8. Working remote with teams in any timezone." },
  { label: "Current stack", value: "Flutter and Dart, Laravel and PHP, React and TypeScript, MySQL." },
  { label: "Experience", value: "Six years shipping, 20+ projects delivered across three platforms." },
  { label: "Availability", value: "Open to roles and freelance work. I reply within a day." },
];

/**
 * The hero photo and everything orbiting it: a rotating type seal, two counter
 * spinning dots that pass in front of and behind the cut-out, a dial of tick
 * marks, an arc that swings in on approach, a breathing glow, scroll parallax,
 * and a pointer-driven depth shift.
 *
 * The one interactive part is the portrait itself — clicking it turns over the
 * fact card and throws a ring off the head. Everything else is decoration, so
 * it is pointer-events:none, and the whole effect collapses to a plain image
 * under reduced motion or on touch.
 */
export default function HeroPortrait({ src, alt }) {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const boxRef = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [rings, setRings] = useState([]);
  const [cuePop, setCuePop] = useState(false);
  const [pressed, setPressed] = useState(false);
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const animate = isDesktop && !reduceMotion;

  // One <span> per character, each rotated by its share of the circle.
  const sealChars = useMemo(() => {
    if (!animate) return [];
    const chars = (SEAL_PHRASE + SEAL_PHRASE).split("");
    return chars.map((ch, i) => ({
      key: `${i}-${ch}`,
      ch: ch === " " ? " " : ch,
      rotation: (i * 360) / chars.length,
      isDot: ch === "·",
    }));
  }, [animate]);

  // Scroll parallax: the portrait drifts up slower than the copy beside it.
  useEffect(() => {
    if (!animate) return undefined;
    let raf = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      const y = window.scrollY || window.pageYOffset || 0;
      const el = wrapRef.current;
      if (el) el.style.transform = `translate3d(0, ${(-y * 0.05).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [animate]);

  // How far the pointer sits from the head, in units of the head's radius.
  // 1 is the edge of the halo; the rings all centre on 65.2% for the same reason.
  const headDistance = useCallback((e) => {
    const box = boxRef.current;
    if (!box) return Infinity;
    const b = box.getBoundingClientRect();
    const cx = b.left + b.width / 2;
    const cy = b.top + b.height * 0.652;
    const radius = b.width * 0.493;
    return Math.hypot(e.clientX - cx, e.clientY - cy) / radius;
  }, []);

  // Pointer depth: layers shift by their own data-depth multiplier, so the
  // orbits separate from the photo instead of sliding with it.
  const handleStageMove = useCallback(
    (e) => {
      const stage = stageRef.current;
      if (!stage || !animate) return;
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      stage.querySelectorAll("[data-depth]").forEach((d) => {
        const k = parseFloat(d.getAttribute("data-depth")) || 0;
        d.style.transform = `translate3d(${(nx * k * 8).toFixed(1)}px, ${(
          ny * k * 6
        ).toFixed(1)}px, 0)`;
      });

      // Hysteresis: the effect arms closer in than it disarms, so a pointer
      // resting on the boundary does not flicker the whole stage.
      const d = headDistance(e);
      if (!hovered && d <= 1.06) setHovered(true);
      else if (hovered && d > 1.16) setHovered(false);
    },
    [animate, headDistance, hovered]
  );

  const handleStageLeave = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.querySelectorAll("[data-depth]").forEach((d) => {
      d.style.transform = "translate3d(0, 0, 0)";
    });
    setHovered(false);
  }, []);

  // Clicking the head turns the fact card over. Clicks elsewhere in the column
  // are ignored — the card says "click the portrait", so only that should work.
  const handleClick = useCallback(
    (e) => {
      if (headDistance(e) > 1.06) return;
      setFactIndex((i) => (i + 1) % FACTS.length);

      if (reduceMotion) return;
      const id = Date.now() + Math.random();
      setRings((prev) => [...prev, id]);
      setTimeout(() => setRings((prev) => prev.filter((r) => r !== id)), 1100);
      setCuePop(true);
      setTimeout(() => setCuePop(false), 420);
      setPressed(true);
      setTimeout(() => setPressed(false), 260);
    },
    [headDistance, reduceMotion]
  );

  const on = animate && hovered;
  const fact = FACTS[factIndex];

  // Shared geometry for the concentric rings. They all centre on the head
  // rather than the box, which is why top sits at 65.2%.
  const ring = (widthPct) => ({
    position: "absolute",
    left: "50%",
    top: "65.2%",
    width: `${widthPct}%`,
    aspectRatio: "1",
    ml: `${-widthPct / 2}%`,
    mt: `${-widthPct / 2}%`,
    pointerEvents: "none",
  });

  return (
    <Box
      ref={stageRef}
      onMouseMove={animate ? handleStageMove : undefined}
      onMouseLeave={animate ? handleStageLeave : undefined}
      onClick={handleClick}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        minHeight: "min(78vh, 620px)",
        cursor: on ? "pointer" : "default",
      }}
    >
      <Box
        ref={(node) => {
          wrapRef.current = node;
          boxRef.current = node;
        }}
        sx={{
          position: "relative",
          zIndex: 2,
          width: "min(100%, 470px)",
          aspectRatio: "1138 / 1450",
        }}
      >
        {/* Glow */}
        <Box
          aria-hidden
          sx={{
            ...ring(96),
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,106,26,.34), rgba(255,106,26,.06) 58%, transparent 72%)",
            filter: "blur(30px)",
            animation: reduceMotion ? "none" : "jp-breathe 8s ease-in-out infinite",
            zIndex: 0,
          }}
        />

        {/* Host for the rings thrown off by a click */}
        <Box aria-hidden sx={{ ...ring(99), zIndex: 1 }}>
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

        {/* Arc — swings round and brightens as you approach */}
        <Box
          aria-hidden
          sx={{
            ...ring(110),
            zIndex: 1,
            border: "2px solid transparent",
            borderTopColor: color.accent,
            borderLeftColor: color.accent,
            borderRadius: "50%",
            opacity: on ? 0.62 : 0,
            transform: on ? "rotate(14deg) scale(1)" : "rotate(-38deg) scale(.97)",
            transition: `opacity .8s ${EASE_CSS}, transform .8s ${EASE_CSS}`,
          }}
        />

        {/* Rotating type seal */}
        {sealChars.length > 0 && (
          <Box aria-hidden data-depth="1.5" sx={{ ...ring(118), zIndex: 1 }}>
            <Box
              sx={{
                transform: on ? "scale(1.045)" : "scale(1)",
                transition: `transform 1s ${EASE_CSS}`,
                position: "absolute",
                inset: 0,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  animation: "jp-spin 78s linear infinite",
                  animationDuration: on ? "34s" : "78s",
                  opacity: on ? 1 : 0.8,
                  transition: "opacity .5s ease",
                }}
              >
                {sealChars.map(({ key, ch, rotation, isDot }) => (
                  <Box
                    key={key}
                    component="span"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      transform: `rotate(${rotation.toFixed(3)}deg)`,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontFamily: font.mono,
                        fontSize: "11px",
                        fontWeight: 500,
                        color: isDot ? color.accent : "#7A7C81",
                        whiteSpace: "pre",
                        lineHeight: 1,
                      }}
                    >
                      {ch}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {/* Dial — twelve ticks, every third one major */}
        <Box aria-hidden data-depth="0.8" sx={{ ...ring(101), zIndex: 1 }}>
          {Array.from({ length: 12 }, (_, i) => {
            const major = i % 3 === 0;
            return (
              <Box key={i} component="span" sx={{ position: "absolute", inset: 0, transform: `rotate(${i * 30}deg)` }}>
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    top: major ? "-7px" : "-4px",
                    left: "50%",
                    width: major ? "2px" : "1px",
                    height: major ? "14px" : "8px",
                    ml: major ? "-1px" : "-.5px",
                    bgcolor: major ? "rgba(255,106,26,.55)" : "rgba(255,255,255,.18)",
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Grey dot, orbiting behind the cut-out */}
        <Box aria-hidden data-depth="2.6" sx={{ ...ring(105), zIndex: 1 }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              animation: reduceMotion ? "none" : "jp-spin 29s linear infinite",
            }}
          >
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
                bgcolor: on ? "#A6A8AB" : "#6C6E73",
                transform: on ? "scale(1.25)" : "scale(1)",
                transition: `background .7s ${EASE_CSS}, transform .7s ${EASE_CSS}`,
              }}
            />
          </Box>
        </Box>

        <Img
          src={src}
          alt={alt}
          sizes={PORTRAIT_SIZES}
          // The first thing on the page worth looking at, so it is fetched
          // ahead of everything else rather than waiting its turn.
          priority
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom center",
            transform: pressed ? "translateY(-4px)" : on ? "translateY(-12px)" : "translateY(0)",
            filter: on
              ? "drop-shadow(0 46px 76px rgba(0,0,0,.64))"
              : "drop-shadow(0 30px 56px rgba(0,0,0,.55))",
            transition: `transform ${pressed ? ".19s cubic-bezier(.4,0,.2,1)" : `.85s ${EASE_CSS}`}, filter .85s ${EASE_CSS}`,
          }}
        />

        {/* Accent dot, swinging back and forth in front of the cut-out */}
        <Box aria-hidden data-depth="-3.2" sx={{ ...ring(105), zIndex: 3 }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              animation: reduceMotion ? "none" : "jp-arcswing 21s ease-in-out infinite",
            }}
          >
            <Box
              component="span"
              sx={{
                position: "absolute",
                top: "-6px",
                left: "50%",
                width: 12,
                height: 12,
                ml: "-6px",
                borderRadius: "50%",
                bgcolor: color.accent,
                boxShadow: on
                  ? "0 0 0 10px rgba(255,106,26,.18)"
                  : "0 0 0 5px rgba(255,106,26,.14)",
                transform: on ? "scale(1.15)" : "scale(1)",
                transition: `box-shadow .7s ${EASE_CSS}, transform .7s ${EASE_CSS}`,
              }}
            />
          </Box>
        </Box>

        {/* Fact card */}
        <Box
          data-depth="-2.2"
          sx={{
            position: "absolute",
            zIndex: 4,
            left: "-8%",
            bottom: "4%",
            width: "min(66%, 218px)",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              bgcolor: "rgba(14,16,19,.95)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: "12px",
              p: "13px 15px",
              boxShadow: "0 20px 44px rgba(0,0,0,.55)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
              <Box
                component="span"
                sx={{
                  fontFamily: font.mono,
                  fontSize: "9px",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: color.accent,
                }}
              >
                {fact.label}
              </Box>
              <Box
                component="span"
                sx={{ fontFamily: font.mono, fontSize: "9px", letterSpacing: ".14em", color: color.faint }}
              >
                {String(factIndex + 1).padStart(2, "0")}/{String(FACTS.length).padStart(2, "0")}
              </Box>
            </Box>

            <Box sx={{ mt: "8px", fontSize: "13.5px", lineHeight: 1.5, color: "#E4E1DC", textWrap: "pretty" }}>
              {fact.value}
            </Box>

            <Box
              sx={{
                mt: "10px",
                pt: "9px",
                borderTop: `1px solid ${color.line}`,
                display: "flex",
                alignItems: "center",
                gap: "7px",
                fontFamily: font.mono,
                fontSize: "9px",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: color.faint,
              }}
            >
              <Box
                component="span"
                aria-hidden
                sx={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  bgcolor: color.accent,
                  transform: cuePop ? "scale(2.4)" : "scale(1)",
                  transition: `transform .5s ${EASE_CSS}`,
                }}
              />
              Click the portrait
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
