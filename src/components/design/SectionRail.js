import { Box, useMediaQuery } from "@mui/material";
import { color, font } from "./tokens";

/**
 * Right-edge progress rail. Only appears above 1480px, where there is margin to
 * spare beside the 1240px shell and it can't crowd the content.
 */
export default function SectionRail({ sections, activeId, onSelect }) {
  const hasRoom = useMediaQuery("(min-width:1480px)");
  if (!hasRoom) return null;

  return (
    <Box
      component="nav"
      aria-label="Section navigation"
      sx={{
        position: "fixed",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 70,
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        alignItems: "flex-end",
      }}
    >
      {sections.map(({ id, label }) => {
        const on = activeId === id;
        return (
          <Box
            key={id}
            component="button"
            type="button"
            onClick={() => onSelect(id)}
            aria-current={on ? "true" : undefined}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "flex-end",
              background: "transparent",
              border: 0,
              p: 0,
              cursor: "pointer",
              "&:focus-visible": { outline: `2px solid ${color.accent}`, outlineOffset: 4 },
            }}
          >
            <Box
              component="span"
              sx={{
                fontFamily: font.mono,
                fontSize: "9.5px",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: on ? color.accent : color.ghost,
                opacity: on ? 1 : 0.75,
                transition: "all .3s ease",
              }}
            >
              {label}
            </Box>
            <Box
              component="span"
              sx={{
                display: "block",
                height: "1px",
                width: on ? "26px" : "12px",
                bgcolor: on ? color.accent : "rgba(255,255,255,.22)",
                transition: "all .3s ease",
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
