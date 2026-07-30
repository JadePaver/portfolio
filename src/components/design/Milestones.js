import { useState } from "react";
import { Box } from "@mui/material";
import { color, font, EASE_CSS } from "./tokens";

/**
 * Single-open timeline, controlled from above so the row, the chapter copy and
 * the highlighted card on the portrait all read from one value.
 *
 * Hovering a row previews it — the rule brightens and the row steps in — but
 * only a click actually opens it, which is what the hint above the list says.
 */
export default function Milestones({ items, activeId, onSelect }) {
  const [hoverId, setHoverId] = useState(null);

  return (
    <Box sx={{ mt: "14px", display: "flex", flexDirection: "column" }}>
      {items.map((m) => {
        const on = m.id === activeId;
        const hov = m.id === hoverId && !on;
        return (
          <Box
            key={m.id}
            component="button"
            type="button"
            onClick={() => onSelect?.(m.id)}
            onMouseEnter={() => setHoverId(m.id)}
            onMouseLeave={() => setHoverId((prev) => (prev === m.id ? null : prev))}
            aria-expanded={on}
            sx={{
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
              textAlign: "left",
              cursor: "pointer",
              background: hov ? "rgba(255,255,255,.032)" : "transparent",
              border: 0,
              borderLeft: `1px solid ${
                on ? color.accent : hov ? "rgba(255,255,255,.34)" : "rgba(255,255,255,.12)"
              }`,
              borderRadius: "0 8px 8px 0",
              p: `12px 0 14px ${on || hov ? "20px" : "16px"}`,
              width: "100%",
              transition: `border-color .3s ease, background .3s ease, padding-left .35s ${EASE_CSS}`,
              "&:focus-visible": { outline: `2px solid ${color.accent}`, outlineOffset: 2 },
            }}
          >
            <Box
              component="span"
              aria-hidden
              sx={{
                flex: "0 0 auto",
                width: 7,
                height: 7,
                borderRadius: "50%",
                mt: "6px",
                bgcolor: on ? color.accent : hov ? "rgba(255,255,255,.48)" : "rgba(255,255,255,.22)",
                transform: hov ? "scale(1.3)" : "scale(1)",
                boxShadow: on ? "0 0 0 4px rgba(255,106,26,.16)" : "none",
                transition: "all .3s ease",
              }}
            />
            <Box component="span" sx={{ display: "flex", flexDirection: "column", gap: "4px", textAlign: "left" }}>
              <Box
                component="span"
                sx={{
                  fontFamily: font.mono,
                  fontSize: "11.5px",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: on ? color.title : hov ? "#C9C6C2" : color.muted,
                  transition: "color .3s ease",
                }}
              >
                {m.year} <Box component="span" sx={{ color: color.ghost }}>·</Box> {m.label}
              </Box>
              <Box
                component="span"
                sx={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: color.muted,
                  maxHeight: on ? "80px" : 0,
                  opacity: on ? 1 : 0,
                  overflow: "hidden",
                  transition: `max-height .45s ${EASE_CSS}, opacity .35s ease`,
                }}
              >
                {m.detail}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
