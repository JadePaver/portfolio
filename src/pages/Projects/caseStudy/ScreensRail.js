import { useCallback, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import { MissingAsset } from "./Figure";
import { accentFor, EASE_CSS, font, paper } from "./tokens";

/** The rail always sits on a paper chapter, so its accent is the paper one. */
const RAIL_ACCENT = accentFor("paper");

/**
 * How wide a card is, per frame.
 *
 * A phone is read whole, so three fit across; a browser screenshot is a whole
 * page in miniature and needs the width to stay legible at a glance.
 */
const CARD_WIDTH = {
  phone: "clamp(198px, 20vw, 240px)",
  browser: "clamp(290px, 31vw, 412px)",
};

/** The card every shot sits on, whichever frame it wears. */
function ShotCard({ shot, frame, failed, onZoom, children }) {
  return (
    <Box
      component="figure"
      onClick={failed ? undefined : (e) => onZoom(shot, e.currentTarget)}
      sx={{
        m: 0,
        flex: `0 0 ${CARD_WIDTH[frame]}`,
        scrollSnapAlign: "start",
        bgcolor: paper.card,
        border: `1px solid ${paper.line}`,
        cursor: failed ? "default" : "zoom-in",
        transition: `transform .4s ${EASE_CSS}, box-shadow .4s ease`,
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 22px 44px rgba(28,18,4,.14)",
        },
      }}
    >
      {children}

      <Box
        component="figcaption"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "9px",
          p: "11px 13px",
          borderTop: `1px solid ${paper.lineSoft}`,
          fontFamily: font.mono,
          fontSize: "9px",
          letterSpacing: ".16em",
          textTransform: "uppercase",
        }}
      >
        <Box component="span" sx={{ color: RAIL_ACCENT }}>
          {shot.code}
        </Box>
        <Box component="span" sx={{ color: paper.body }}>
          {shot.label}
        </Box>
      </Box>
    </Box>
  );
}

/** One screenshot, sitting in a phone bezel on a card. */
function PhoneShot({ shot, ratio, onZoom }) {
  const [failed, setFailed] = useState(false);

  return (
    <ShotCard shot={shot} frame="phone" failed={failed} onZoom={onZoom}>
      <Box sx={{ p: "13px 13px 6px", background: paper.frame }}>
        <Box
          sx={{
            position: "relative",
            bgcolor: "#101114",
            borderRadius: "clamp(20px, 2vw, 26px)",
            p: "6px",
            boxShadow:
              "0 16px 32px rgba(20,16,8,.16), inset 0 0 0 1px rgba(255,255,255,.09)",
          }}
        >
          {failed ? (
            <MissingAsset
              file={shot.file}
              ratio={ratio}
              sx={{ borderRadius: "clamp(15px, 1.6vw, 20px)" }}
            />
          ) : (
            <Box
              component="img"
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              draggable={false}
              onError={() => setFailed(true)}
              sx={{
                display: "block",
                width: "100%",
                height: "auto",
                aspectRatio: ratio,
                objectFit: "cover",
                pointerEvents: "none",
                borderRadius: "clamp(15px, 1.6vw, 20px)",
              }}
            />
          )}

          {/* Power and volume keys */}
          {[{ top: "15%", height: "32px" }, { top: "calc(15% + 40px)", height: "18px" }].map(
            (key) => (
              <Box
                key={key.top}
                aria-hidden
                sx={{
                  position: "absolute",
                  right: "-2.5px",
                  top: key.top,
                  width: "2.5px",
                  height: key.height,
                  borderRadius: "2px",
                  bgcolor: "#3A3D44",
                }}
              />
            )
          )}
        </Box>
      </Box>
    </ShotCard>
  );
}

/**
 * One screenshot, sitting in a browser title bar on a card.
 *
 * A web product's screens are pages, so the frame is a window rather than a
 * handset. The shot is anchored to the top of its crop: these are full pages
 * scaled down, and the part worth showing is always the first fold.
 */
function BrowserShot({ shot, ratio, onZoom }) {
  const [failed, setFailed] = useState(false);

  return (
    <ShotCard shot={shot} frame="browser" failed={failed} onZoom={onZoom}>
      <Box
        aria-hidden
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          p: "9px 12px",
          borderBottom: `1px solid ${paper.lineSoft}`,
          bgcolor: paper.chrome,
        }}
      >
        {[0, 1, 2].map((dot) => (
          <Box
            key={dot}
            sx={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              bgcolor: "rgba(0,0,0,.16)",
            }}
          />
        ))}
        <Box
          sx={{
            ml: "8px",
            flex: 1,
            height: "11px",
            borderRadius: "6px",
            bgcolor: "rgba(0,0,0,.07)",
          }}
        />
      </Box>

      {failed ? (
        <MissingAsset file={shot.file} ratio={ratio} tone="paper" />
      ) : (
        <Box
          component="img"
          src={shot.src}
          alt={shot.alt}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            aspectRatio: ratio,
            objectFit: "cover",
            objectPosition: "top",
            pointerEvents: "none",
          }}
        />
      )}
    </ShotCard>
  );
}

/** Arrow button beside the section title. */
function StepButton({ onClick, label, children }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={label}
      sx={{
        display: "grid",
        placeItems: "center",
        width: "38px",
        height: "38px",
        border: `1px solid ${paper.rule}`,
        bgcolor: "transparent",
        color: paper.ink,
        fontFamily: font.mono,
        fontSize: "14px",
        cursor: "pointer",
        transition: "border-color .22s ease, color .22s ease, transform .22s ease",
        "&:hover": { borderColor: RAIL_ACCENT, color: RAIL_ACCENT },
        "&:active": { transform: "translateY(1px)" },
        "&:focus-visible": { outline: `2px solid ${RAIL_ACCENT}`, outlineOffset: 3 },
      }}
    >
      {children}
    </Box>
  );
}

/**
 * Horizontal rail of the app's screens.
 *
 * Scrolls natively — the pointer handlers only add mouse dragging on top, so
 * touch, trackpad and keyboard all keep working untouched. A drag that moved
 * more than a few pixels swallows the click, otherwise letting go of a drag
 * would open the lightbox on whichever card happened to be under the cursor.
 *
 * `frame` picks what the shots are wearing: a handset for the app case studies,
 * a browser window for the web ones.
 */
export default function ScreensRail({
  shots,
  ratio,
  label,
  onZoom,
  header,
  frame = "phone",
}) {
  const reduceMotion = useReducedMotion();
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const step = useCallback(
    (direction) => {
      const el = railRef.current;
      if (!el) return;
      el.scrollBy({
        left: direction * el.clientWidth * 0.7,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion]
  );

  // Written straight to the node: this fires on every scroll frame, and the
  // bar is the only thing that changes.
  const onScroll = (e) => {
    const el = e.currentTarget;
    const fill = fillRef.current;
    if (!fill) return;
    const max = Math.max(1, el.scrollWidth - el.clientWidth);
    fill.style.width = `${Math.min(100, (el.scrollLeft / max) * 100)}%`;
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = railRef.current;
    if (!el) return;
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false };
    el.style.cursor = "grabbing";
  };

  const onPointerMove = (e) => {
    const el = railRef.current;
    if (!drag.current.down || !el) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.left - dx;
  };

  const onPointerUp = () => {
    drag.current.down = false;
    const el = railRef.current;
    if (el) el.style.cursor = "grab";
  };

  const handleZoom = (shot, originEl) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    onZoom(shot, originEl);
  };

  return (
    <>
      {header({ step })}

      <Box
        ref={railRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        tabIndex={0}
        aria-label={label}
        sx={{
          mt: "clamp(24px, 3vw, 36px)",
          display: "flex",
          gap: "clamp(14px, 1.5vw, 20px)",
          overflowX: "auto",
          overscrollBehaviorX: "contain",
          scrollSnapType: "x proximity",
          // Bleeds to the viewport edge, but the first card still lines up
          // with the 1240px shell the rest of the page sits in.
          p: "6px max(22px, calc((100vw - 1240px) / 2 + 22px)) 14px",
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { width: 0, height: 0 },
          "&:focus-visible": { outline: `2px solid ${RAIL_ACCENT}`, outlineOffset: -2 },
        }}
      >
        {shots.map((shot) => {
          const Shot = frame === "browser" ? BrowserShot : PhoneShot;
          return <Shot key={shot.code} shot={shot} ratio={ratio} onZoom={handleZoom} />;
        })}
      </Box>

      <Box sx={{ maxWidth: 1240, mx: "auto", px: "22px", width: "100%" }}>
        <Box aria-hidden sx={{ height: "2px", bgcolor: paper.lineSoft }}>
          <Box
            ref={fillRef}
            sx={{ height: "100%", width: 0, bgcolor: paper.ink, transition: "width .25s ease" }}
          />
        </Box>
      </Box>
    </>
  );
}

export { StepButton };
