import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const EASE = [0.22, 1, 0.36, 1];
const HOME_SCROLL_KEY = "portfolio:home-scroll";

const RouteTransitionContext = createContext({
  enterProject: null,
  leaveProject: null,
});

export const useRouteTransition = () => useContext(RouteTransitionContext);

/**
 * `mode="wait"` means the incoming route is not mounted yet when navigate()
 * lands, so an immediate scroll clamps against the outgoing page's height.
 * Re-apply across the window the overlay is still covering the screen.
 */
function scrollTo(y) {
  const apply = () => window.scrollTo(0, y);
  apply();
  requestAnimationFrame(apply);
  const timers = [120, 350].map((ms) => setTimeout(apply, ms));
  return () => timers.forEach(clearTimeout);
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
      setCurtain({ to, label, phase: "in" });
    },
    [navigate, reduceMotion]
  );

  // Hold the fully-expanded cover briefly after the route swaps so the detail
  // page has a beat to paint before we dissolve away from it.
  useEffect(() => {
    if (flight?.phase !== "hold") return undefined;
    const t = setTimeout(() => {
      setFlight((f) => (f ? { ...f, phase: "out" } : null));
    }, 260);
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

  return (
    <RouteTransitionContext.Provider value={{ enterProject, leaveProject }}>
      {children}
      {typeof document !== "undefined" && createPortal(overlay, document.body)}
    </RouteTransitionContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */

function FlightOverlay({ flight, onExpanded, onDone }) {
  const { image, title, rect, phase, color, vw, vh } = flight;
  const expanding = phase === "expand" || phase === "hold";

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
        scale: 1,
      }}
      animate={
        expanding
          ? { top: 0, left: 0, width: vw, height: vh, borderRadius: 0 }
          : { opacity: 0, scale: 1.05 }
      }
      transition={{ duration: expanding ? 0.66 : 0.55, ease: EASE }}
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
        bgcolor: "#0b0e11",
        boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
        willChange: "top, left, width, height, opacity",
      }}
    >
      <Box
        component="img"
        src={image}
        alt=""
        draggable={false}
        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* Scrim, so the title has something to sit on once we fill the screen */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,10,12,0.30) 0%, rgba(8,10,12,0.72) 100%)",
        }}
      />

      {/* Bloom in the project's own colour */}
      {color && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          sx={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(closest-side at 50% 62%, ${color}55, transparent 72%)`,
          }}
        />
      )}

      <Box
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
        <Box
          component={motion.div}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.26 }}
          sx={{
            width: 54,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, #FD6F00, #FF3D6E)",
          }}
        />
        <Typography
          component={motion.h2}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
          sx={{
            m: 0,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            color: "#fff",
            fontSize: { xs: "1.9rem", md: "3.2rem" },
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            textShadow: "0 6px 40px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </Typography>
        <Typography
          component={motion.p}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
          sx={{
            m: 0,
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "0.68rem", md: "0.78rem" },
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Case Study
        </Typography>
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */

function CurtainOverlay({ curtain, onClosed, onDone }) {
  const { phase, label } = curtain;
  const closing = phase === "in";

  return (
    <Box
      component={motion.div}
      aria-hidden
      initial={{ scaleY: 0 }}
      animate={{ scaleY: closing ? 1 : 0 }}
      transition={{
        duration: 0.52,
        ease: EASE,
        // Let AnimatePresence finish swapping routes underneath before we lift.
        delay: closing ? 0 : 0.34,
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
        background: "linear-gradient(160deg, #FD6F00 0%, #FF3D6E 62%, #E2452F 100%)",
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
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Typography
        component={motion.span}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: closing ? 1 : 0, y: closing ? 0 : -8 }}
        transition={{ duration: 0.32, ease: EASE, delay: closing ? 0.18 : 0 }}
        sx={{
          position: "relative",
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "0.68rem", md: "0.76rem" },
          fontWeight: 700,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
