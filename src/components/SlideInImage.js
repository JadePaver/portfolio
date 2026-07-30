import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ZoomOutMapRoundedIcon from "@mui/icons-material/ZoomOutMapRounded";

const EASE_OUT = [0.22, 1, 0.36, 1];

const ENTER_OFFSET = {
  up: { x: 0, y: 44 },
  left: { x: -56, y: 0 },
  right: { x: 56, y: 0 },
};

export function SlideInImage({
  src,
  alt,
  containerSx,
  imgSx,
  direction = "up",
  caption,
  zoomable = true,
  parallax = true,
  eager = false,
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-1.8%", "1.8%"]);

  // Cached images can finish loading before onLoad is wired up.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

  const closeZoom = useCallback(() => setZoomed(false), []);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoomed(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomed]);

  const offset = ENTER_OFFSET[direction] ?? ENTER_OFFSET.up;

  const openZoom = () => {
    if (zoomable) setZoomed(true);
  };

  const interactiveProps = zoomable
    ? {
        role: "button",
        tabIndex: 0,
        "aria-label": `Enlarge image: ${alt}`,
        onClick: openZoom,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openZoom();
          }
        },
      }
    : {};

  return (
    <>
      <Box
        ref={containerRef}
        component={motion.div}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97, ...offset }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
        transition={{ type: "spring", stiffness: 190, damping: 24, mass: 0.9 }}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        whileTap={reduceMotion || !zoomable ? undefined : { scale: 0.99 }}
        {...interactiveProps}
        sx={{
          position: "relative",
          mb: 2,
          bgcolor: "grey.100",
          borderRadius: 2,
          p: 2,
          overflow: "hidden",
          minHeight: loaded ? undefined : 200,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          cursor: zoomable ? "zoom-in" : "default",
          willChange: "transform, opacity",
          transition:
            "box-shadow 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.45s ease",
          "&:hover": {
            boxShadow: "0 18px 46px rgba(0,0,0,0.16)",
            borderColor: "rgba(253,111,0,0.3)",
          },
          "&:hover .sii-img": { transform: "scale(1.022)" },
          "&:hover .sii-sheen": { transform: "translateX(120%)" },
          "&:hover .sii-hint": { opacity: 1, transform: "translateY(0)" },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: 3,
          },
          ...containerSx,
        }}
      >
        {/* Parallax layer — drifts a hair slower than the page for depth */}
        <Box
          component={motion.div}
          style={parallax && !reduceMotion ? { y: parallaxY } : undefined}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Box
            component="img"
            ref={imgRef}
            className="sii-img"
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            onLoad={() => setLoaded(true)}
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              mx: "auto",
              borderRadius: 1.5,
              opacity: loaded ? 1 : 0,
              transformOrigin: "center",
              transition:
                "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
              ...imgSx,
            }}
          />
        </Box>

        {/* Shimmer placeholder — holds the space until the image decodes */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            opacity: loaded ? 0 : 1,
            transition: "opacity 0.5s ease",
            bgcolor: "grey.100",
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.03) 25%, rgba(0,0,0,0.075) 37%, rgba(0,0,0,0.03) 63%)",
            backgroundSize: "400% 100%",
            animation: loaded ? "none" : "siiShimmer 1.4s ease-in-out infinite",
            "@keyframes siiShimmer": {
              "0%": { backgroundPosition: "100% 0" },
              "100%": { backgroundPosition: "-100% 0" },
            },
          }}
        />

        {/* Light sweep on hover */}
        {!reduceMotion && (
          <Box
            aria-hidden
            className="sii-sheen"
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              pointerEvents: "none",
              transform: "translateX(-120%)",
              transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
              background:
                "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.5) 50%, transparent 62%)",
            }}
          />
        )}

        {/* Zoom affordance */}
        {zoomable && (
          <Box
            aria-hidden
            className="sii-hint"
            sx={{
              position: "absolute",
              right: 12,
              bottom: 12,
              zIndex: 4,
              display: "flex",
              alignItems: "center",
              gap: 0.6,
              px: 1,
              py: 0.5,
              borderRadius: "50px",
              bgcolor: "rgba(20,20,22,0.72)",
              color: "white",
              opacity: 0,
              transform: "translateY(6px)",
              pointerEvents: "none",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <ZoomOutMapRoundedIcon sx={{ fontSize: 14 }} />
            <Typography
              component="span"
              sx={{ fontFamily: "Poppins, sans-serif", fontSize: "0.68rem", fontWeight: 600 }}
            >
              Expand
            </Typography>
          </Box>
        )}
      </Box>

      {caption && (
        <Typography
          component={motion.figcaption}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.12 }}
          sx={{
            mt: 1.25,
            textAlign: "center",
            color: "text.secondary",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "0.72rem", lg: "0.78rem" },
          }}
        >
          {caption}
        </Typography>
      )}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {zoomed && (
              <Box
                key="sii-lightbox"
                component={motion.div}
                role="dialog"
                aria-modal="true"
                aria-label={alt}
                onClick={closeZoom}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                sx={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 2000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: { xs: 2, sm: 5 },
                  cursor: "zoom-out",
                  bgcolor: "rgba(12,12,14,0.84)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <Box
                  component={motion.img}
                  src={src}
                  alt={alt}
                  onClick={(e) => e.stopPropagation()}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: 2,
                    cursor: "default",
                    boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
                  }}
                />
                <Box
                  component="button"
                  type="button"
                  aria-label="Close image"
                  onClick={closeZoom}
                  sx={{
                    position: "absolute",
                    top: { xs: 14, sm: 22 },
                    right: { xs: 14, sm: 22 },
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.18)",
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    cursor: "pointer",
                    transition: "background-color 0.25s ease, transform 0.25s ease",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.2)", transform: "scale(1.08)" },
                  }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 22 }} />
                </Box>
              </Box>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
