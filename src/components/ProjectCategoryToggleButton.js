import React from "react";
import { Stack, Button } from "@mui/material";

export default function ProjectCategoryButtons({
  value,
  onChange,
  options = ["All", "UI/UX", "Web Development", "Mobile App", "Project Management"],
  buttonProps,
  gap = 2,
}) {
  return (
    <Stack
      direction="row"
      spacing={gap}
      sx={{
        overflowX: "auto",
        overflowY: "hidden",
        flexWrap: "nowrap",
        "&::-webkit-scrollbar": { height: 6 },
        "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "rgba(0,0,0,0.3)" },
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0,0,0,0.2) transparent",
        px: { xs: 0.5, md: 0 },
        pb: 1,
      }}
    >
      {options.map((opt) => {
        const isSelected = opt === value;
        return (
          <Button
            key={opt}
            onClick={() => onChange(opt)}
            disableRipple
            {...buttonProps}
            sx={(theme) => ({
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 300,
              fontSize: { xs: 12, md: 14 },
              borderRadius: { xs: "10px", md: "12px" },
              minWidth: "auto",
              px: { xs: 1.8, md: 2.6 },
              py: { xs: 0.5, md: 0.7 },
              lineHeight: 1.75,
              flexShrink: 0,
              bgcolor: "#F8F8F8",
              color: "black",
              border: "none",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.18)",
              ...(isSelected && {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.common.white,
                boxShadow: "none",
                "&:hover": { bgcolor: theme.palette.primary.dark },
              }),
              "&:hover": !isSelected
                ? { bgcolor: "#F0F0F0", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.22)" }
                : undefined,
              letterSpacing: 0.2,
              "&.Mui-focusVisible": {
                boxShadow: isSelected
                  ? `0 0 0 3px ${theme.palette.primary.main}40`
                  : `inset 0 0 0 1px rgba(0,0,0,0.22), 0 0 0 3px ${theme.palette.primary.main}30`,
              },
            })}
          >
            {opt}
          </Button>
        );
      })}
    </Stack>
  );
}
