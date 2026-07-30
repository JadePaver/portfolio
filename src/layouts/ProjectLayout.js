import { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { useRouteTransition } from "../transitions/RouteTransition";

const MotionButton = motion(Button);
const MotionBox = motion(Box);

export default function ProjectLayout({ children, title }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { leaveProject } = useRouteTransition();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowScrollTop(scrollTop > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      // The curtain covers the swap, so leaving should be quick and get out of
      // the way rather than play its own 380ms slide.
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ duration: 0.38, ease: "easeInOut" }}
      sx={{ minHeight: "100vh", bgcolor: "#FAFAFA" }}
    >

      {/* Reading progress bar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1400,
          height: 3,
          pointerEvents: "none",
          bgcolor: "rgba(0,0,0,0.05)",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #FD6F00 0%, #ff4422 100%)",
            transition: "width 0.12s linear",
          }}
        />
      </Box>

      {/* Sticky frosted header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1200,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          bgcolor: "rgba(255,255,255,0.82)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          px: { xs: 2.5, sm: 4, lg: 6 },
          py: { xs: 1.2, lg: 1.4 },
          display: "flex",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <MotionButton
          aria-label="back"
          onClick={() => (leaveProject ? leaveProject({ to: "/" }) : window.history.back())}
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileTap="tap"
          variants={{
            rest: { scale: 1, boxShadow: "0 2px 10px rgba(253,111,0,0.28)" },
            hover: { scale: 1.05, boxShadow: "0 4px 18px rgba(253,111,0,0.45)" },
            tap: { scale: 0.95 },
          }}
          transition={{ type: "spring", stiffness: 500, damping: 26 }}
          startIcon={<ArrowBackIosNewRoundedIcon sx={{ fontSize: "0.9rem !important" }} />}
          sx={{
            minWidth: 0,
            bgcolor: "primary.main",
            color: "white",
            borderRadius: "50px",
            px: { xs: "0.9rem", lg: "1.2rem" },
            py: "0.42rem",
            fontSize: { xs: "0.78rem", lg: "0.85rem" },
            fontWeight: 600,
            fontFamily: "Poppins, sans-serif",
            textTransform: "none",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Back
        </MotionButton>

        {title && (
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: { xs: "0.88rem", lg: "0.98rem" },
              color: "text.primary",
              opacity: scrollProgress > 4 ? 1 : 0,
              transform: scrollProgress > 4 ? "translateY(0)" : "translateY(5px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              letterSpacing: 0.2,
            }}
          >
            {title}
          </Typography>
        )}
      </Box>

      {/* Page content */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: "easeOut", delay: 0.12 }}
        sx={{
          maxWidth: 860,
          mx: "auto",
          px: { xs: 3, sm: 5, lg: 6 },
          py: { xs: 4, lg: 5 },
        }}
      >
        {children}
      </Box>

      {/* Scroll-to-top FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <MotionBox
            key="scroll-top"
            component="button"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            whileHover={{ scale: 1.12, boxShadow: "0 6px 26px rgba(253,111,0,0.52)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            sx={{
              position: "fixed",
              bottom: { xs: "1.5rem", lg: "2.5rem" },
              right: { xs: "1.5rem", lg: "3rem" },
              zIndex: 1100,
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FD6F00 0%, #ff4422 100%)",
              color: "white",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 18px rgba(253,111,0,0.38)",
            }}
          >
            <KeyboardArrowUpRoundedIcon sx={{ fontSize: 24 }} />
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionBox>
  );
}
