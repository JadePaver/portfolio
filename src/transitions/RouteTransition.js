import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { rgbChannels } from "../components/design/tokens";
import { morphBetween } from "./morph";
import { skinFor } from "./skins";

const EASE = [0.22, 1, 0.36, 1];
const HOME_SCROLL_KEY = "portfolio:home-scroll";

/**
 * The flight is one continuous move, not three that hand off by fading:
 *
 *   expand  the cover grows out of the card and fills the screen
 *   hold    the route swaps behind it; the title card is legible
 *   settle  the cover fades to the destination's backdrop, and the wordmark
 *           travels from the centre of the plate onto the heading the page
 *           opens with — same face, same size, same place
 *   fade    the colour-matched plate lifts, uncovering the real heading
 *           already sitting under the one that just landed
 *
 * The wordmark is what ties the three states together. The card names the
 * project, the plate enlarges that name, and the page's own `<h1>` is what the
 * name comes to rest as, so the eye follows a single object the whole way in
 * rather than watching three separate things appear.
 *
 * A page opts in by marking its heading `data-flight-title`. Without it the
 * plate falls back to lifting the title away, which is what every case study
 * still using ProjectLayout does.
 */
const FLIGHT = {
  expand: 0.58,
  hold: 240,
  settle: 0.32,
  /** The wordmark's journey to the page's heading. */
  titleMorph: 0.42,
  /** Fallback when the destination has no heading to land on. */
  titleLift: 0.26,
  fade: 0.32,
  // The plate only starts lifting once the cover on top of it has finished
  // settling. Overlapping the two would show the page through a half-faded
  // cover, which reads as a muddy cross-dissolve instead of a clean reveal.
  fadeDelay: 0.3,
  /**
   * How long an arriving page should wait before playing its own intro,
   * measured from its mount. Lands the cascade just as the plate starts to
   * lift, so the page's content rises into the thinning plate instead of
   * being finished and static by the time it is uncovered.
   */
  introDelay: 0.5,
};

const CURTAIN = { close: 0.52, open: 0.52, openDelay: 0.34 };

const RouteTransitionContext = createContext({
  enterProject: null,
  leaveProject: null,
  arrival: null,
  departing: false,
});

export const useRouteTransition = () => useContext(RouteTransitionContext);

/**
 * `mode="wait"` means the incoming route is not mounted yet when navigate()
 * lands, so an immediate scroll clamps against the outgoing page's height.
 * Re-apply across the window the overlay is still covering the screen.
 *
 * The reset must opt out of smooth scrolling while it does that. The
 * stylesheet sets `scroll-behavior: smooth` on <html> for the in-page jumps,
 * and `window.scrollTo(x, y)` obeys it — so a route change *animates* the page
 * from wherever the last one was left all the way up to the top, hauling every
 * reveal on the incoming page through the viewport on the way and firing all
 * of them. Since they are `once: true`, they stay fired: you arrive at a page
 * whose animations have already played. Each re-application below restarts
 * that glide, which drags it out further.
 *
 * Overriding the property is used rather than `behavior: "instant"`, which is
 * the tidier spelling but throws a TypeError on engines that predate the enum
 * value — an exception here would leave the scroll unreset entirely.
 */
function scrollTo(y) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  const restore = () => {
    root.style.scrollBehavior = previous;
  };

  const apply = () => window.scrollTo(0, y);
  apply();

  const raf = requestAnimationFrame(apply);
  const timers = [120, 350].map((ms) => setTimeout(apply, ms));
  // Outlasts the final re-application, so none of them can glide.
  const restoreTimer = setTimeout(restore, 380);

  return () => {
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout);
    clearTimeout(restoreTimer);
    restore();
  };
}

export function RouteTransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  // Entering a project: the clicked cover flies out of the grid and takes
  // over the screen as a title card.
  const [flight, setFlight] = useState(null);
  // Leaving one: a branded panel wipes up, the route swaps behind it, it wipes off.
  const [curtain, setCurtain] = useState(null);

  // ---- Scroll policy -------------------------------------------------------
  // Landing on a project starts at the top. Coming back to home returns you to
  // exactly where the grid was, so the round trip feels reversible. Keyed off a
  // stored marker so the browser's own back button gets the same treatment.
  useLayoutEffect(() => {
    let stored = null;
    try {
      stored = sessionStorage.getItem(HOME_SCROLL_KEY);
    } catch {
      stored = null;
    }

    if (location.pathname === "/" && stored !== null) {
      try {
        sessionStorage.removeItem(HOME_SCROLL_KEY);
      } catch {
        /* private mode */
      }
      return scrollTo(Number(stored) || 0);
    }
    return scrollTo(0);
  }, [location.pathname]);

  const enterProject = useCallback(
    (payload) => {
      if (!payload?.to) return;
      if (reduceMotion) {
        navigate(payload.to);
        return;
      }
      try {
        sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
      } catch {
        /* private mode */
      }
      setFlight({
        ...payload,
        phase: "expand",
        // The destination dresses the plate, so it can settle onto that page's
        // own background colour.
        skin: skinFor(payload.to),
        // Snapshot the viewport: animating px -> vw/vh units is not reliable,
        // so the target has to be plain numbers.
        vw: window.innerWidth,
        vh: window.innerHeight,
      });
    },
    [navigate, reduceMotion]
  );

  const leaveProject = useCallback(
    ({ to = "/", label = "Back to projects" } = {}) => {
      if (reduceMotion) {
        navigate(to);
        return;
      }
      // Resolved now, not at render: the curtain closes over the page being
      // left, and `location` has already moved on by the time it reopens.
      setCurtain({ to, label, phase: "in", skin: skinFor(location.pathname) });
    },
    [navigate, reduceMotion, location.pathname]
  );

  // Hold the fully-expanded cover briefly after the route swaps so the detail
  // page has a beat to paint before we dissolve away from it.
  useEffect(() => {
    if (flight?.phase !== "hold") return undefined;
    const t = setTimeout(() => {
      setFlight((f) => (f ? { ...f, phase: "out" } : null));
    }, FLIGHT.hold);
    return () => clearTimeout(t);
  }, [flight?.phase]);

  const handleFlightExpanded = () => {
    navigate(flight.to);
    setFlight((f) => (f ? { ...f, phase: "hold" } : null));
  };

  const handleCurtainClosed = () => {
    navigate(curtain.to);
    setCurtain((c) => (c ? { ...c, phase: "out" } : null));
  };

  const overlay = (
    <>
      <AnimatePresence>
        {flight && (
          <FlightOverlay
            key="route-flight"
            flight={flight}
            onExpanded={handleFlightExpanded}
            onDone={() => setFlight(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {curtain && (
          <CurtainOverlay
            key="route-curtain"
            curtain={curtain}
            onClosed={handleCurtainClosed}
            onDone={() => setCurtain(null)}
          />
        )}
      </AnimatePresence>
    </>
  );

  // An incoming page reads this on its first render to find out whether it was
  // uncovered by a plate — and so whether to hold its intro back and leave its
  // heading still for the wordmark to land on.
  //
  // Any live flight counts, not just one past "expand": the route only mounts
  // after the expand finishes, so the looser test cannot produce a false
  // positive, and it does not depend on `navigate` and the phase change being
  // batched into one commit. If they ever split, the page would otherwise
  // animate its heading out from under the wordmark flying towards it.
  const arrival = flight
    ? { via: "flight", introDelay: FLIGHT.introDelay }
    : null;

  // True while a curtain is closing over the page, so it can recede as the
  // curtain climbs rather than sitting still behind it.
  const departing = Boolean(curtain && curtain.phase === "in");

  return (
    <RouteTransitionContext.Provider
      value={{ enterProject, leaveProject, arrival, departing }}
    >
      {children}
      {typeof document !== "undefined" && createPortal(overlay, document.body)}
    </RouteTransitionContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */

function FlightOverlay({ flight, onExpanded, onDone }) {
  const { image, title, rect, phase, color, skin, vw, vh } = flight;
  // "expand" and "hold" share a target — the plate is already filling the
  // screen through the hold, it is just waiting for the route to mount.
  const settling = phase === "out";

  // Every project leads its rule with its own tint and resolves into the
  // skin's tail, so the mark is recognisably the project's even when the
  // surrounding chrome is shared.
  const tint = color || "#FD6F00";
  const filled = { top: 0, left: 0, width: vw, height: vh, borderRadius: 0 };

  const titleRef = useRef(null);
  const [morph, setMorph] = useState(null);

  // Measure once the route has mounted underneath, so the plate's wordmark can
  // be flown onto the page's own heading.
  //
  // Deliberately a rAF inside an effect rather than useLayoutEffect: the
  // provider resets scroll on navigation, and its effect runs *after* this
  // portal's. Measuring any earlier reads the heading through the outgoing
  // page's scroll offset and the wordmark lands somewhere off-screen.
  useEffect(() => {
    if (phase !== "hold") return undefined;
    const raf = requestAnimationFrame(() => {
      const from = titleRef.current;
      const to = document.querySelector("[data-flight-title]");
      if (!from || !to) return;
      const next = morphBetween(
        from.getBoundingClientRect(),
        to.getBoundingClientRect()
      );
      if (next) setMorph(next);
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const landing = settling && morph;

  return (
    <Box
      component={motion.div}
      aria-hidden
      initial={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 28,
        opacity: 1,
      }}
      animate={settling ? { ...filled, opacity: 0 } : { ...filled, opacity: 1 }}
      transition={
        settling
          ? { duration: FLIGHT.fade, delay: FLIGHT.fadeDelay, ease: "easeOut" }
          : { duration: FLIGHT.expand, ease: EASE }
      }
      onAnimationComplete={() => {
        if (phase === "expand") onExpanded();
        else if (phase === "out") onDone();
      }}
      sx={{
        position: "fixed",
        zIndex: 5000,
        overflow: "hidden",
        // Swallows stray clicks mid-transition without locking page scroll,
        // which the scroll restore below depends on staying available.
        pointerEvents: "auto",
        // The plate is already the destination's backdrop; the cover sits on
        // top of it and fades away to expose it. `background`, not `bgcolor`,
        // because a skin may carry a gradient.
        background: skin.surface,
        boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
        willChange: "top, left, width, height, opacity",
      }}
    >
      <Box
        component={motion.img}
        src={image}
        alt=""
        draggable={false}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: settling ? 0 : 1, scale: settling ? 1.03 : 1 }}
        transition={{ duration: FLIGHT.settle, ease: EASE }}
        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* Scrim, so the title has something to sit on once we fill the screen */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: settling ? 0 : 1 }}
        transition={{ duration: settling ? FLIGHT.settle : 0.5, ease: "easeOut" }}
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,10,12,0.30) 0%, rgba(8,10,12,0.72) 100%)",
        }}
      />

      {/* Bloom in the project's own colour */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: settling ? 0 : 0.5 }}
        transition={{ duration: settling ? FLIGHT.settle : 0.7, ease: "easeOut" }}
        sx={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(closest-side at 50% 62%, rgba(${rgbChannels(
            tint
          )}, 0.33), transparent 72%)`,
        }}
      />

      {/* The wordmark's frame stays put while it is flying to the page's
          heading — moving it too would compound with the morph. Only when
          there is nothing to land on does the whole block lift away instead. */}
      <Box
        component={motion.div}
        initial={false}
        animate={
          landing
            ? { opacity: 1, y: 0, scale: 1 }
            : {
                opacity: settling ? 0 : 1,
                y: settling ? -14 : 0,
                scale: settling ? 1.06 : 1,
              }
        }
        transition={{ duration: FLIGHT.titleLift, ease: EASE }}
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.6,
          px: 3,
          textAlign: "center",
        }}
      >
        {/* Rule and kicker are the plate's own furniture, not the page's, so
            they clear out early and leave the wordmark to travel alone. */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: settling ? 0 : 1, scaleX: 1, y: settling ? -10 : 0 }}
          transition={
            settling
              ? { duration: 0.2, ease: "easeOut" }
              : { duration: 0.32, ease: EASE, delay: 0.2 }
          }
          sx={{
            width: "54px",
            height: "3px",
            borderRadius: "2px",
            background: `linear-gradient(90deg, ${tint}, ${skin.ruleTail})`,
          }}
        />
        <Typography
          component={motion.h2}
          ref={titleRef}
          initial={{ opacity: 0, y: 18 }}
          animate={
            landing
              ? { opacity: 1, x: morph.x, y: morph.y, scale: morph.scale }
              : { opacity: 1, x: 0, y: 0, scale: 1 }
          }
          transition={
            landing
              ? { duration: FLIGHT.titleMorph, ease: EASE }
              : // Must finish before `expand` does. The morph is measured one
                // frame into the hold, and getBoundingClientRect reports the
                // transformed box — measuring while this is still running
                // reads a position a few pixels off its rest and lands the
                // wordmark the same few pixels off the heading.
                { duration: 0.3, ease: EASE, delay: 0.24 }
          }
          sx={{
            m: 0,
            fontFamily: skin.titleFont,
            fontWeight: 800,
            color: skin.titleInk,
            fontSize: { xs: "1.9rem", md: "3.2rem" },
            // Matched to the destination heading's leading, so the measured
            // height ratio is exactly the type-size ratio.
            lineHeight: skin.titleLeading,
            letterSpacing: skin.titleTracking,
            transformOrigin: "top left",
            // The glow would not survive the scale-up onto the page's heading.
            textShadow: landing ? "none" : "0 6px 40px rgba(0,0,0,0.5)",
          }}
        >
          {skin.title ?? title}
        </Typography>
        <Typography
          component={motion.p}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: settling ? 0 : 1, y: settling ? -10 : 0 }}
          transition={
            settling
              ? { duration: 0.2, ease: "easeOut" }
              : { duration: 0.28, ease: EASE, delay: 0.3 }
          }
          sx={{
            m: 0,
            fontFamily: skin.kickerFont,
            fontSize: { xs: "0.68rem", md: "0.78rem" },
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: skin.kickerInk,
          }}
        >
          {skin.kicker}
        </Typography>
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */

function CurtainOverlay({ curtain, onClosed, onDone }) {
  const { phase, label, skin } = curtain;
  const closing = phase === "in";

  return (
    <Box
      component={motion.div}
      aria-hidden
      initial={{ scaleY: 0 }}
      animate={{ scaleY: closing ? 1 : 0 }}
      transition={{
        duration: closing ? CURTAIN.close : CURTAIN.open,
        ease: EASE,
        // Let AnimatePresence finish swapping routes underneath before we lift.
        delay: closing ? 0 : CURTAIN.openDelay,
      }}
      onAnimationComplete={() => {
        if (phase === "in") onClosed();
        else onDone();
      }}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 5000,
        pointerEvents: "auto",
        transformOrigin: closing ? "bottom center" : "top center",
        background: skin.curtain,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.16,
          backgroundImage: `radial-gradient(circle, ${skin.curtainDots} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Same rule that opens the title card, so arriving and leaving are
          visibly the same gesture running in opposite directions. */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.4,
          px: 3,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: closing ? 1 : 0, scaleX: closing ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: closing ? 0.12 : 0 }}
          sx={{
            width: "44px",
            height: "2px",
            borderRadius: "2px",
            bgcolor: skin.curtainRule,
          }}
        />
        <Typography
          component={motion.span}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: closing ? 1 : 0, y: closing ? 0 : -8 }}
          transition={{ duration: 0.32, ease: EASE, delay: closing ? 0.18 : 0 }}
          sx={{
            fontFamily: skin.kickerFont,
            fontSize: { xs: "0.68rem", md: "0.76rem" },
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            textAlign: "center",
            color: skin.curtainInk,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}
