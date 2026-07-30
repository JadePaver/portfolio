import React from "react";
import { Box } from "@mui/material";
import { motion, LayoutGroup, useReducedMotion } from "framer-motion";

export default function ProjectCategoryButtons({
  value,
  onChange,
  options = ["All", "UI/UX", "Web Development", "Mobile App", "Project Management"],
  counts,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <LayoutGroup>
      {/* On phones the row scrolls sideways instead of stacking into three
          ragged lines; from md up it behaves like a normal centered pill bar. */}
      <Box
        sx={{
          maxWidth: "100%",
          overflowX: { xs: "auto", md: "visible" },
          overflowY: "hidden",
          px: { xs: 2, md: 0 },
          py: 0.5,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          role="group"
          aria-label="Filter projects by category"
          sx={{
            display: "inline-flex",
            flexWrap: { xs: "nowrap", md: "wrap" },
            justifyContent: "center",
            gap: 0.4,
            p: "5px",
            borderRadius: "999px",
            // Clip the selected pill's orange glow to the rounded bar so it
            // can't smear onto the page outside the curve.
            overflow: "hidden",
            // Frosted glass so the bar belongs to the warm backdrop behind it
            // rather than sitting on it as a grey slab.
            bgcolor: "rgba(255,255,255,0.58)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.75)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {options.map((opt) => {
            const isSelected = opt === value;
            const count = counts?.[opt];
            const isEmpty = count === 0;

            return (
              <Box
                key={opt}
                component={motion.button}
                type="button"
                onClick={() => onChange(opt)}
                aria-pressed={isSelected}
                whileHover={reduceMotion || isSelected ? undefined : { y: -1.5 }}
                whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                transition={{ type: "spring", stiffness: 480, damping: 28 }}
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.7,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  appearance: "none",
                  background: "transparent",
                  border: "none",
                  borderRadius: "999px",
                  px: { xs: 2, md: 2.6 },
                  py: { xs: 1, md: 0.95 },
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: isSelected ? 600 : 500,
                  fontSize: { xs: 13, md: 14 },
                  lineHeight: 1.3,
                  letterSpacing: 0.2,
                  color: isSelected ? "#fff" : isEmpty ? "#B0A9A2" : "#3A322C",
                  transition: "color 240ms ease",
                  "&:hover": { color: isSelected ? "#fff" : "#111" },
                  "&:focus-visible": {
                    outline: "2px solid #FD6F00",
                    outlineOffset: "3px",
                  },
                }}
              >
                {isSelected && (
                  <Box
                    component={motion.span}
                    layoutId="category-pill"
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "999px",
                      zIndex: 0,
                      background: "linear-gradient(135deg, #FD6F00 0%, #FF3D6E 100%)",
                      boxShadow:
                        "0 8px 22px rgba(253,111,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}

                <Box component="span" sx={{ position: "relative", zIndex: 1 }}>
                  {opt}
                </Box>

                {typeof count === "number" && (
                  <Box
                    component="span"
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      minWidth: 18,
                      px: 0.55,
                      py: 0.05,
                      borderRadius: "999px",
                      fontSize: 10.5,
                      fontWeight: 700,
                      lineHeight: 1.6,
                      textAlign: "center",
                      color: isSelected ? "#fff" : "rgba(0,0,0,0.5)",
                      bgcolor: isSelected ? "rgba(255,255,255,0.24)" : "rgba(0,0,0,0.05)",
                      transition: "background-color 240ms ease, color 240ms ease",
                    }}
                  >
                    {count}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </LayoutGroup>
  );
}
