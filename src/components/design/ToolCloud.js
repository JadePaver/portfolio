import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { color, font, EASE_CSS } from "./tokens";

const IDLE_READOUT = "Hover a tool to see what I use it for";

/**
 * The stack as one flat cloud rather than three boxes. Confidence is carried by
 * the chip's own treatment — accent fill for daily drivers, a plain outline for
 * things shipped with, a dashed outline for what is still being learned — and
 * the line underneath says what each one is actually for.
 *
 * `flash` names a tool to spotlight; the ticker above uses it to point here.
 */

const TIER_LEGEND = [
  { tier: 3, label: "Daily" },
  { tier: 2, label: "Shipped with it" },
  { tier: 1, label: "Learning" },
];

const tierStyle = (tier) => ({
  color: tier === 3 ? "#F3EFEA" : tier === 2 ? "#C9C6C2" : "#95979B",
  bgcolor: tier === 3 ? "rgba(255,106,26,.09)" : tier === 2 ? "rgba(255,255,255,.045)" : "transparent",
  border:
    tier === 1
      ? "1px dashed rgba(255,255,255,.15)"
      : `1px solid ${tier === 3 ? "rgba(255,106,26,.42)" : "rgba(255,255,255,.11)"}`,
});

export default function ToolCloud({ items, flash, title = "Tools I work in" }) {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef(null);
  const [shown, setShown] = useState(reduceMotion);
  const [hot, setHot] = useState(null);

  // The chips deal themselves out once, the first time the panel is reached.
  useEffect(() => {
    if (reduceMotion || shown) return undefined;
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver !== "function") {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion, shown]);

  const active = hot ?? (flash ? items.find((i) => i.name === flash) ?? null : null);
  const readout = active ? `${active.name} — ${active.note}` : IDLE_READOUT;

  return (
    <Box ref={hostRef}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "10px 20px",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="h3"
          sx={{
            m: 0,
            fontSize: "clamp(18px, 1.7vw, 22px)",
            fontWeight: 800,
            letterSpacing: "-.025em",
            color: color.headline,
          }}
        >
          {title}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 16px",
            alignItems: "center",
            fontFamily: font.mono,
            fontSize: "9.5px",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: color.faint,
          }}
        >
          {TIER_LEGEND.map(({ tier, label }) => (
            <Box key={label} component="span" sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <Box
                component="span"
                aria-hidden
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: tier === 3 ? color.accent : tier === 2 ? "rgba(255,255,255,.4)" : "transparent",
                  border: tier === 1 ? "1px dashed rgba(255,255,255,.4)" : "none",
                }}
              />
              {label}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: "16px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {items.map(({ name, tier, note }, i) => {
          const lit = flash === name;
          return (
            <Box
              key={name}
              component="span"
              title={note}
              onMouseEnter={() => setHot({ name, note })}
              onMouseLeave={() => setHot((prev) => (prev?.name === name ? null : prev))}
              sx={{
                display: "inline-block",
                fontFamily: font.mono,
                fontSize: "12px",
                letterSpacing: ".02em",
                borderRadius: "8px",
                p: "7px 11px",
                cursor: "default",
                ...tierStyle(tier),
                ...(lit && {
                  bgcolor: "rgba(255,106,26,.16)",
                  borderColor: color.accent,
                  color: "#FFFFFF",
                  boxShadow: "0 0 0 4px rgba(255,106,26,.12)",
                }),
                opacity: shown ? 1 : 0,
                transform: shown ? `translateY(${lit ? "-4px" : "0"})` : "translateY(10px)",
                transitionProperty: "transform, opacity, border-color, color, box-shadow, background-color",
                transitionDuration: ".42s, .42s, .25s, .25s, .45s, .3s",
                transitionTimingFunction: `${EASE_CSS}, ease, ease, ease, ease, ease`,
                transitionDelay: `${shown && !lit ? 22 * i : 0}ms`,
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: color.accent,
                  color: "#FFFFFF",
                  boxShadow: "0 10px 22px rgba(0,0,0,.45)",
                },
              }}
            >
              {name}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ mt: "14px", minHeight: 20, display: "flex", alignItems: "center", gap: "10px" }}>
        <Box
          component="span"
          aria-hidden
          sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: color.accent, flex: "0 0 auto", opacity: 0.75 }}
        />
        <Box
          role="status"
          aria-live="polite"
          sx={{
            fontFamily: font.mono,
            fontSize: "10.5px",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: active ? color.text : color.faint,
            transition: "color .25s ease",
          }}
        >
          {readout}
        </Box>
      </Box>
    </Box>
  );
}
