import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { flipBetween } from "../../../transitions/morph";
import { ACCENT, EASE, font, ink } from "./tokens";

const MotionBox = motion(Box);

const ZoomContext = createContext(() => {});

/** Lets any figure on the page hand an image up to the one shared lightbox. */
export const useZoom = () => useContext(ZoomContext);

/**
 * Wraps the case study and renders the enlarged view.
 *
 * The enlarged image grows out of the thumbnail that opened it, rather than
 * appearing at full size over a fading screen. It is a FLIP: the image is laid
 * out where it belongs, inverted onto the thumbnail's box before the frame is
 * painted, then released to rest. Only `transform` and `opacity` ever animate,
 * so the whole thing stays on the compositor.
 *
 * Note there is no `backdrop-filter` here. It reads as the obvious way to get
 * a soft scrim, but animating opacity on a blurred layer makes the browser
 * re-blur the entire viewport every frame, which is what made this stutter —
 * and behind a 94% scrim there is nothing left to see through anyway.
 */
export default function ZoomProvider({ children }) {
  const reduceMotion = useReducedMotion();
  const [item, setItem] = useState(null);

  const imgRef = useRef(null);
  /** The thumbnail this was opened from, hidden while its copy stands in. */
  const sourceRef = useRef(null);
  const controls = useAnimationControls();

  const openZoom = useCallback((next, originEl) => {
    // The figure includes its caption strip, so measure the picture inside it.
    const picture = originEl?.querySelector?.("img") ?? originEl ?? null;
    const r = picture?.getBoundingClientRect?.();
    sourceRef.current = picture ?? null;
    setItem({
      ...next,
      from:
        r && r.width && r.height
          ? { top: r.top, left: r.left, width: r.width, height: r.height }
          : null,
    });
  }, []);

  const close = useCallback(() => setItem(null), []);

  // Escape closes, and the page behind must not scroll while the overlay is up.
  //
  // Removing the scrollbar widens the viewport, which shifts the whole page
  // sideways at exactly the moment the overlay animates in — the jump reads as
  // the animation stuttering. Holding the width back with padding keeps the
  // page still underneath.
  useEffect(() => {
    if (!item) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    const { body, documentElement } = document;
    const gutter = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, close]);

  // Two copies of the same picture on screen at once would show as a ghost
  // while the enlarged one flies off the thumbnail.
  useEffect(() => {
    const el = sourceRef.current;
    if (!item || !el) return undefined;
    const previous = el.style.visibility;
    el.style.visibility = "hidden";
    return () => {
      el.style.visibility = previous;
    };
  }, [item]);

  // Invert onto the thumbnail and release. In a layout effect so the inverted
  // frame is the first one painted — measuring any later and the image shows
  // full-size for a frame before jumping back down to start.
  useLayoutEffect(() => {
    if (!item) return;
    const el = imgRef.current;
    if (!el) return;

    const rest = { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 };
    if (reduceMotion) {
      controls.set(rest);
      return;
    }

    const flip = item.from ? flipBetween(item.from, el.getBoundingClientRect()) : null;
    controls.set(
      flip
        ? { ...flip, opacity: 1 }
        : // Nothing to grow from — a gentle scale-in instead of a pop.
          { x: 0, y: 0, scaleX: 0.94, scaleY: 0.94, opacity: 0 }
    );
    controls.start({
      ...rest,
      transition: { duration: flip ? 0.42 : 0.3, ease: EASE },
    });
  }, [item, controls, reduceMotion]);

  return (
    <ZoomContext.Provider value={openZoom}>
      {children}

      <AnimatePresence>
        {item && (
          <MotionBox
            key="case-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              bgcolor: "rgba(6,7,8,.94)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              p: "4vh 4vw",
              cursor: "zoom-out",
              willChange: "opacity",
            }}
          >
            <MotionBox
              component="img"
              ref={imgRef}
              src={item.src}
              alt={item.alt || "Enlarged preview"}
              initial={{ opacity: 0 }}
              animate={controls}
              onClick={(e) => e.stopPropagation()}
              sx={{
                // Wide presentation art gets the full frame; a portrait
                // screenshot blown up that far just looks soft.
                maxWidth: item.wide ? "min(1280px, 94vw)" : "min(430px, 88vw)",
                maxHeight: "82vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
                border: `1px solid ${ink.lineStrong}`,
                boxShadow: "0 40px 90px rgba(0,0,0,.55)",
                cursor: "default",
                willChange: "transform",
              }}
            />

            {item.caption && (
              <MotionBox
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: 0.18 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontFamily: font.mono,
                  fontSize: "10px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: ink.lead,
                  textAlign: "center",
                }}
              >
                <Box
                  aria-hidden
                  component="span"
                  sx={{
                    flex: "0 0 auto",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    bgcolor: ACCENT,
                  }}
                />
                <span>{item.caption}</span>
              </MotionBox>
            )}

            <MotionBox
              component="button"
              type="button"
              onClick={close}
              aria-label="Close preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.18 }}
              sx={{
                position: "absolute",
                top: "18px",
                right: "20px",
                display: "grid",
                placeItems: "center",
                width: "42px",
                height: "42px",
                border: `1px solid ${ink.lineStrong}`,
                bgcolor: "rgba(11,12,14,.6)",
                color: ink.text,
                fontSize: "17px",
                lineHeight: 1,
                cursor: "pointer",
                transition: "border-color .22s ease, color .22s ease",
                "&:hover": { borderColor: ACCENT, color: ACCENT },
              }}
            >
              ×
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </ZoomContext.Provider>
  );
}
