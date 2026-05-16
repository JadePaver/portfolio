import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import IconStackExpandable from "./IconStackExpandable";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function ServiceCard({
  title,
  description,
  iconSrc = `${process.env.PUBLIC_URL}/icons/pm_icon.svg`,
  items = ["git", "github", "vscode", "laravel", "nodejs", "react", "typescript"],
  width = "265px",
  height = "320px",
  sx,
  iconHeight = 50,
  hoverExtra = 32,
  hoverBottomExtra = 16,
}) {
  const contentRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [expandedHeightPx, setExpandedHeightPx] = useState(null);

  const parsePx = (value, fallback = 320) => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const m = value.match(/^(\d+)(px)?$/);
      if (m) return Number(m[1]);
    }
    return fallback;
  };

  const collapsedHeight = parsePx(height, 320);
  const hoverExtraPx = parsePx(hoverExtra, 32);
  const hoverBottomExtraPx = parsePx(hoverBottomExtra, 16);
  const measureBuffer = 8;

  useEffect(() => {
    const measure = () => {
      if (!contentRef.current) return;
      const original = contentRef.current;
      const parent = original.parentElement;
      if (!parent) return;

      const clone = original.cloneNode(true);
      const descNodes = clone.querySelectorAll("[data-desc]");
      descNodes.forEach((node) => {
        node.style.WebkitLineClamp = "unset";
        node.style.display = "block";
        node.style.overflow = "visible";
      });

      const tempWrapper = document.createElement("div");
      tempWrapper.style.position = "absolute";
      tempWrapper.style.visibility = "hidden";
      tempWrapper.style.pointerEvents = "none";
      tempWrapper.style.left = "-9999px";
      tempWrapper.style.top = "0";
      tempWrapper.style.width = original.clientWidth + "px";
      tempWrapper.appendChild(clone);
      document.body.appendChild(tempWrapper);

      const fullContentHeight = clone.getBoundingClientRect().height;
      const computed = window.getComputedStyle(parent);
      const paddingTop = parseFloat(computed.paddingTop || "0");
      const paddingBottom = parseFloat(computed.paddingBottom || "0");
      const total = Math.ceil(fullContentHeight + paddingTop + paddingBottom + measureBuffer);
      setExpandedHeightPx(total);

      document.body.removeChild(tempWrapper);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [description, items, title, iconSrc, width, height]);

  const targetHeight =
    hovered && expandedHeightPx
      ? expandedHeightPx + hoverExtraPx + hoverBottomExtraPx
      : hovered && !expandedHeightPx
        ? collapsedHeight + hoverExtraPx + hoverBottomExtraPx
        : collapsedHeight;

  const outerShadowCollapsed = "0px 6px 14px rgba(0,0,0,0.07)";
  const outerShadowHovered = "0px 16px 32px rgba(0,0,0,0.12)";
  const innerInsetShadow = "inset 0 8px 16px rgba(0,0,0,0.03)";
  const cubicEase = [0.22, 0.1, 0.22, 1];

  return (
    <MotionBox
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        height: targetHeight,
        y: hovered ? -3 : 0,
        boxShadow: hovered ? outerShadowHovered : outerShadowCollapsed,
      }}
      transition={{
        height: { type: "tween", duration: 0.26, ease: cubicEase },
        y: { type: "spring", stiffness: 200, damping: 20 },
        boxShadow: { type: "tween", duration: 0.22, ease: cubicEase },
      }}
      sx={{
        position: "relative",
        bgcolor: "#F8F8F8",
        borderRadius: "1rem",
        width,
        height: `${collapsedHeight}px`,
        p: "3rem 1rem 1rem 1rem",
        overflow: "hidden",
        cursor: "default",
        display: "block",
        willChange: "transform, box-shadow, height",
        ...(sx || {}),
      }}
    >
      <MotionBox
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          boxShadow: innerInsetShadow,
          opacity: 0,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: cubicEase }}
      />

      <Box ref={contentRef} sx={{ display: "flow-root" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing='auto' sx={{ width: "100%" }}>
          <Box
            component="img"
            src={iconSrc.startsWith("http") || iconSrc.startsWith(process.env.PUBLIC_URL) ? iconSrc : `${process.env.PUBLIC_URL}${iconSrc}`}
            alt={`${title ?? "Service"} Icon`}
            sx={{ height: iconHeight, width: "auto", maxWidth: "100%", display: "block" }}
          />
          <Box sx={{ alignSelf: "flex-end" }}>
            <IconStackExpandable items={items} />
          </Box>
        </Stack>

        {title && (
          <MotionTypography
            fontWeight={700}
            variant="h6"
            gutterBottom
            sx={{ textAlign: "left", mt: 3, WebkitFontSmoothing: "antialiased" }}
            animate={{ y: hovered ? -1 : 0, scale: hovered ? 1.002 : 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >
            {title}
          </MotionTypography>
        )}

        {description && (
          <MotionTypography
            data-desc
            variant="body2"
            sx={{
              textAlign: "left",
              mt: 2,
              letterSpacing: "0.02em",
              lineHeight: 1.7,
              display: "-webkit-box",
              WebkitLineClamp: hovered ? "unset" : "4",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
            animate={{ y: hovered ? 0 : 4, opacity: 1 }}
            transition={{ duration: 0.28, ease: cubicEase }}
          >
            {description}
          </MotionTypography>
        )}
      </Box>
    </MotionBox>
  );
}
