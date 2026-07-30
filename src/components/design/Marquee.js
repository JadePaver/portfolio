import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { color, font } from "./tokens";

const BASE_SPEED = 54; // px per second

/**
 * Endless ticker of the stack, driven by rAF rather than a CSS keyframe so it
 * can be interacted with: hovering slows it to a crawl and dims everything
 * except the token under the pointer, dragging scrubs it and lets go with
 * inertia, and clicking a token hands the name up to the page.
 *
 * The row is repeated enough times to cover the viewport plus one full copy,
 * and the track wraps on the row's width, so the seam never shows.
 *
 * Under reduced motion it collapses to a single static row.
 */
export default function Marquee({ items, onSelect }) {
  const reduceMotion = useReducedMotion();

  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const rowRef = useRef(null);

  const [copies, setCopies] = useState(2);
  const [hot, setHot] = useState(null);

  // Everything the animation loop touches lives in a ref — re-rendering 40
  // tokens at 60fps to move one transform would be absurd.
  const mq = useRef({ x: 0, vel: -BASE_SPEED, w: 0, hover: false, drag: false, px: 0, pt: 0, pv: 0, moved: 0 });

  const tokens = items.map((item) => (typeof item === "string" ? { name: item, note: "" } : item));

  const draw = useCallback(() => {
    const s = mq.current;
    const track = trackRef.current;
    if (!track || !s.w) return;
    s.x = ((s.x % s.w) + s.w) % s.w;
    track.style.transform = `translate3d(${-s.x.toFixed(2)}px,0,0)`;
  }, []);

  // Measure the row, then repeat it enough times to cover the wrap plus a copy.
  useLayoutEffect(() => {
    if (reduceMotion) return undefined;
    const measure = () => {
      const row = rowRef.current;
      const wrap = wrapRef.current;
      if (!row || !wrap) return;
      const w = row.getBoundingClientRect().width;
      if (!w) return;
      mq.current.w = w;
      setCopies(Math.max(2, Math.ceil((wrap.getBoundingClientRect().width + w) / w)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduceMotion, tokens.length]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const s = mq.current;
      if (!s.drag) {
        const target = -BASE_SPEED * (s.hover ? 0.13 : 1);
        s.vel += (target - s.vel) * Math.min(1, dt * 3.2);
        s.x += s.vel * dt;
        draw();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, draw]);

  const onPointerDown = (e) => {
    if (reduceMotion || (e.button && e.button !== 0)) return;
    const s = mq.current;
    s.drag = true;
    s.moved = 0;
    s.px = e.clientX;
    s.pt = performance.now();
    s.pv = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture is a nicety; scrubbing still works without it */
    }
  };

  const onPointerMove = (e) => {
    const s = mq.current;
    if (!s.drag) return;
    const now = performance.now();
    const dx = e.clientX - s.px;
    const dt = Math.max(8, now - s.pt);
    s.px = e.clientX;
    s.pt = now;
    s.moved += Math.abs(dx);
    s.x -= dx;
    s.pv = (-dx / dt) * 1000;
    s.vel = s.pv;
    draw();
  };

  const release = () => {
    const s = mq.current;
    if (!s.drag) return;
    s.drag = false;
    s.vel = Math.max(-2600, Math.min(2600, s.pv));
  };

  // A drag that happens to end on a token is not a click on it.
  const handleClick = (name) => () => {
    if (mq.current.moved > 7) return;
    onSelect?.(name);
  };

  const row = (key, cloned) => (
    <Box
      key={key}
      ref={cloned ? undefined : rowRef}
      aria-hidden={cloned || undefined}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "34px",
        pr: "34px",
        fontFamily: font.mono,
        fontSize: "13px",
        letterSpacing: ".2em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {tokens.map(({ name, note }) => {
        const on = hot === name;
        return (
          <Fragment key={`${key}-${name}`}>
            <Box
              component={onSelect && !cloned ? "button" : "span"}
              type={onSelect && !cloned ? "button" : undefined}
              onMouseEnter={reduceMotion ? undefined : () => setHot(name)}
              onClick={onSelect ? handleClick(name) : undefined}
              title={note || undefined}
              sx={{
                display: "inline-block",
                font: "inherit",
                letterSpacing: "inherit",
                textTransform: "inherit",
                background: "transparent",
                border: 0,
                p: 0,
                color: on ? "#F6F3EF" : "inherit",
                cursor: onSelect ? "pointer" : "inherit",
                transform: on ? "translateY(-2px)" : "translateY(0)",
                transition: "color .25s ease, transform .3s cubic-bezier(.22,1,.36,1)",
              }}
            >
              {name}
            </Box>
            <Box component="span" sx={{ color: color.accent, opacity: 0.5 }} aria-hidden>
              ◆
            </Box>
          </Fragment>
        );
      })}
    </Box>
  );

  return (
    <Box
      ref={wrapRef}
      onMouseEnter={reduceMotion ? undefined : () => {
        mq.current.hover = true;
      }}
      onMouseLeave={reduceMotion ? undefined : () => {
        mq.current.hover = false;
        setHot(null);
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      sx={{
        position: "relative",
        mt: "clamp(56px, 8vw, 104px)",
        borderTop: `1px solid ${color.lineSoft}`,
        borderBottom: `1px solid ${color.lineSoft}`,
        bgcolor: color.bgAlt,
        overflow: "hidden",
        py: "20px",
        cursor: reduceMotion ? "default" : "grab",
        userSelect: "none",
        touchAction: "pan-y",
        "&:active": { cursor: reduceMotion ? "default" : "grabbing" },
      }}
    >
      {/* Feathered edges, so tokens fade out instead of being guillotined */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "clamp(50px, 9vw, 140px)",
          zIndex: 3,
          pointerEvents: "none",
          background: `linear-gradient(90deg, ${color.bgAlt}, rgba(14,16,19,0))`,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "clamp(50px, 9vw, 140px)",
          zIndex: 3,
          pointerEvents: "none",
          background: `linear-gradient(270deg, ${color.bgAlt}, rgba(14,16,19,0))`,
        }}
      />

      <Box
        ref={trackRef}
        sx={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
          color: hot ? "#484A4E" : color.faint,
          transition: "color .3s ease",
        }}
      >
        {row("a", false)}
        {!reduceMotion &&
          Array.from({ length: copies - 1 }, (_, i) => row(`clone-${i}`, true))}
      </Box>
    </Box>
  );
}
