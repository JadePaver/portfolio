/**
 * Signature marks for the work cards.
 *
 * The design gives every project two hand-drawn-feeling marks in its own tint:
 * a `SignatureFrame` that sits over the cover, and a `SignatureMotif` that sits
 * beside the signature label in the caption. Both are decorative — they are
 * rendered aria-hidden and gated on prefers-reduced-motion.
 *
 * Keyframes (`jp-wk-*`) live in index.css because they loop forever and never
 * need sequencing.
 */

import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { rgbChannels } from "./tokens";

export const FRAME_KINDS = ["brackets", "trace", "dots", "wave", "clamp", "steps"];
export const MOTIF_KINDS = ["bars", "route", "grid", "wave", "stack", "sprint"];

const FRAME_WRAP = { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 };

/** An animated frame drawn over a project cover, in the project's own tint. */
export function SignatureFrame({ kind = "brackets", tint }) {
  const still = useReducedMotion();
  const anim = (value) => (still ? "none" : value);
  const c = rgbChannels(tint);
  const t = `rgb(${c})`;
  const soft = (a) => `rgba(${c},${a})`;

  if (kind === "trace") {
    // A pulse running the long edges — the card's own progress bar.
    const sweep = (delay) => (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: t,
          transform: "translateX(-115%)",
          animation: anim(`jp-wk-sweep 3.4s linear ${delay}s infinite`),
        }}
      />
    );
    return (
      <Box aria-hidden sx={FRAME_WRAP}>
        <Box sx={{ position: "absolute", left: 8, right: 8, top: 8, height: 2, overflow: "hidden", bgcolor: soft(0.12) }}>
          {sweep(0)}
        </Box>
        <Box sx={{ position: "absolute", left: 8, right: 8, bottom: 8, height: 2, overflow: "hidden", bgcolor: soft(0.12) }}>
          {sweep(1.7)}
        </Box>
        {/* "1px", not 1 — a bare number ≤1 in sx sizing means a fraction, and
            these edge hairlines at width 1 rendered as two full-cover tint
            sheets over the whole poster. */}
        <Box sx={{ position: "absolute", left: 8, top: 8, bottom: 8, width: "1px", bgcolor: soft(0.17) }} />
        <Box sx={{ position: "absolute", right: 8, top: 8, bottom: 8, width: "1px", bgcolor: soft(0.17) }} />
      </Box>
    );
  }

  if (kind === "dots") {
    const dots = {
      backgroundImage: `radial-gradient(circle, ${t} 1.4px, transparent 1.6px)`,
      backgroundSize: "9px 9px",
    };
    return (
      <Box aria-hidden sx={FRAME_WRAP}>
        <Box sx={{ position: "absolute", left: 7, right: 7, top: 7, height: 9, opacity: 0.55, ...dots, animation: anim("jp-wk-flash 2.6s ease-in-out infinite alternate") }} />
        <Box sx={{ position: "absolute", left: 7, right: 7, bottom: 7, height: 9, opacity: 0.55, ...dots, animation: anim("jp-wk-flash 2.6s ease-in-out .5s infinite alternate") }} />
        <Box sx={{ position: "absolute", left: 7, top: 16, bottom: 16, width: 9, opacity: 0.4, ...dots, animation: anim("jp-wk-flash 2.6s ease-in-out .9s infinite alternate") }} />
        <Box sx={{ position: "absolute", right: 7, top: 16, bottom: 16, width: 9, opacity: 0.4, ...dots, animation: anim("jp-wk-flash 2.6s ease-in-out .3s infinite alternate") }} />
      </Box>
    );
  }

  if (kind === "wave") {
    return (
      <Box aria-hidden sx={FRAME_WRAP}>
        <Box sx={{ position: "absolute", left: 10, right: 10, bottom: 10, height: 26, display: "flex", alignItems: "flex-end", gap: "3px" }}>
          {Array.from({ length: 11 }, (_, i) => {
            const k = Math.abs(Math.sin((i / 10) * Math.PI * 1.5));
            return (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: `${Math.max(26, Math.round(k * 100))}%`,
                  bgcolor: t,
                  opacity: 0.85,
                  transformOrigin: "50% 100%",
                  animation: anim(
                    `jp-wk-bar ${(1 + (i % 4) * 0.16).toFixed(2)}s ease-in-out ${(i * 0.07).toFixed(2)}s infinite alternate`
                  ),
                }}
              />
            );
          })}
        </Box>
        <Box sx={{ position: "absolute", left: 10, right: 10, bottom: 8, height: "1px", bgcolor: t, opacity: 0.5 }} />
      </Box>
    );
  }

  if (kind === "clamp") {
    return (
      <Box aria-hidden sx={FRAME_WRAP}>
        <Box sx={{ position: "absolute", inset: "9px", border: `1px solid ${t}`, opacity: 0.4 }} />
        <Box sx={{ position: "absolute", left: 6, top: "50%", mt: "-16px", width: 11, height: 32, bgcolor: t, animation: anim("jp-wk-nudge 1.9s ease-in-out infinite alternate") }} />
        <Box sx={{ position: "absolute", right: 6, top: "50%", mt: "-16px", width: 11, height: 32, bgcolor: t, animation: anim("jp-wk-nudge-b 1.9s ease-in-out infinite alternate") }} />
      </Box>
    );
  }

  if (kind === "steps") {
    return (
      <Box aria-hidden sx={FRAME_WRAP}>
        <Box sx={{ position: "absolute", left: 10, right: 10, bottom: 10, height: 6, display: "flex", gap: "4px" }}>
          {[0, 1, 2, 3].map((i) => (
            <Box key={i} sx={{ flex: 1, bgcolor: t, opacity: 0.28 }} />
          ))}
        </Box>
        <Box sx={{ position: "absolute", left: 10, right: 10, bottom: 10, height: 6 }}>
          <Box sx={{ position: "absolute", top: 0, width: 18, height: 6, bgcolor: t, animation: anim("jp-wk-run 4s steps(4,end) infinite alternate") }} />
        </Box>
        <Box sx={{ position: "absolute", left: 10, top: 10, width: 16, height: 2, bgcolor: t, opacity: 0.7 }} />
      </Box>
    );
  }

  // brackets — the default: two corners easing apart, two ticks holding still.
  return (
    <Box aria-hidden sx={FRAME_WRAP}>
      <Box sx={{ position: "absolute", left: 9, top: 9, width: 26, height: 26, borderLeft: `2px solid ${t}`, borderTop: `2px solid ${t}`, animation: anim("jp-wk-brk 2.2s ease-in-out infinite alternate") }} />
      <Box sx={{ position: "absolute", right: 9, bottom: 9, width: 26, height: 26, borderRight: `2px solid ${t}`, borderBottom: `2px solid ${t}`, animation: anim("jp-wk-brk-b 2.2s ease-in-out infinite alternate") }} />
      <Box sx={{ position: "absolute", right: 9, top: 9, width: 14, height: 2, bgcolor: t, opacity: 0.55 }} />
      <Box sx={{ position: "absolute", left: 9, bottom: 9, width: 14, height: 2, bgcolor: t, opacity: 0.55 }} />
    </Box>
  );
}

/** The small caption mark that names what the project actually does. */
export function SignatureMotif({ kind = "bars", tint, size = 11 }) {
  const still = useReducedMotion();
  const anim = (value) => (still ? "none" : value);
  const c = rgbChannels(tint);
  const t = `rgb(${c})`;

  const box = { position: "relative", flex: "0 0 auto", width: `${Math.round(size * 2.5)}px`, height: `${size}px` };

  if (kind === "route") {
    const waypoint = (pos, delay) => (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          width: 5,
          height: 5,
          borderRadius: "50%",
          bgcolor: t,
          opacity: 0.4,
          animation: anim(`jp-wk-flash 1.6s ease-in-out ${delay}s infinite alternate`),
          ...pos,
        }}
      />
    );
    return (
      <Box aria-hidden sx={box}>
        <Box sx={{ position: "absolute", left: 0, right: 0, top: "50%", height: "1px", bgcolor: t, opacity: 0.32 }} />
        {waypoint({ left: 0, mt: "-2.5px" }, 0)}
        {waypoint({ left: "50%", m: "-2.5px 0 0 -2.5px" }, 0.3)}
        {waypoint({ right: 0, mt: "-2.5px" }, 0.6)}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            mt: "-3.5px",
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: t,
            boxShadow: `0 0 0 3px rgba(${c},0.17)`,
            animation: anim("jp-wk-run 2.8s cubic-bezier(.45,0,.55,1) infinite alternate"),
          }}
        />
      </Box>
    );
  }

  if (kind === "grid") {
    return (
      <Box aria-hidden sx={{ ...box, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "repeat(3,1fr)", gap: "3px" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <Box
            key={i}
            sx={{
              bgcolor: t,
              opacity: 0.22,
              animation: anim(
                `jp-wk-flash 1.5s ease-in-out ${((i % 4) * 0.13 + Math.floor(i / 4) * 0.19).toFixed(2)}s infinite alternate`
              ),
            }}
          />
        ))}
      </Box>
    );
  }

  if (kind === "wave") {
    return (
      <Box aria-hidden sx={{ ...box, display: "flex", alignItems: "center", gap: "3px" }}>
        {Array.from({ length: 7 }, (_, i) => {
          const k = Math.sin((i / 6) * Math.PI);
          return (
            <Box
              key={i}
              sx={{
                flex: 1,
                height: `${Math.max(34, Math.round(k * 100))}%`,
                borderRadius: "2px",
                bgcolor: t,
                opacity: 0.8,
                animation: anim(
                  `jp-wk-bar ${(0.9 + (i % 3) * 0.18).toFixed(2)}s ease-in-out ${(i * 0.08).toFixed(2)}s infinite alternate`
                ),
              }}
            />
          );
        })}
      </Box>
    );
  }

  if (kind === "stack") {
    return (
      <Box aria-hidden sx={{ ...box, display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
        {[0, 1, 2].map((i) => (
          <Box key={i} sx={{ position: "relative", height: 4, bgcolor: "rgba(0,0,0,.08)", overflow: "hidden" }}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "42%",
                bgcolor: t,
                animation: anim(
                  `jp-wk-sweep ${(2.2 + i * 0.25).toFixed(2)}s ease-in-out ${(i * 0.28).toFixed(2)}s infinite`
                ),
              }}
            />
          </Box>
        ))}
      </Box>
    );
  }

  if (kind === "sprint") {
    return (
      <Box aria-hidden sx={box}>
        <Box sx={{ position: "absolute", inset: 0, display: "flex", gap: "4px" }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ flex: 1, border: `1px solid ${t}`, opacity: 0.3 }} />
          ))}
        </Box>
        <Box sx={{ position: "absolute", top: "50%", mt: "-4px", width: 8, height: 8, bgcolor: t, animation: anim("jp-wk-run 3s steps(3,end) infinite alternate") }} />
      </Box>
    );
  }

  // bars — the default.
  return (
    <Box aria-hidden sx={{ ...box, display: "flex", alignItems: "flex-end", gap: "3px" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Box
          key={i}
          sx={{
            flex: 1,
            height: "100%",
            bgcolor: t,
            opacity: 0.3 + i * 0.14,
            transformOrigin: "50% 100%",
            // Reduced motion still gets the staircase, just frozen.
            transform: still ? `scaleY(${(0.4 + i * 0.12).toFixed(2)})` : undefined,
            animation: anim(
              `jp-wk-bar ${(1 + i * 0.14).toFixed(2)}s ease-in-out ${(i * 0.09).toFixed(2)}s infinite alternate`
            ),
          }}
        />
      ))}
    </Box>
  );
}
