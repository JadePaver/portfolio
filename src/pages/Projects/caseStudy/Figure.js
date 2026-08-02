import { useState } from "react";
import { Box } from "@mui/material";
import Img from "../../../components/Img";
import { useCaseTheme } from "./context";
import { accentFor, EASE_CSS, font, ink, paper } from "./tokens";

/**
 * How wide a figure is drawn: the full column inside the 1240px shell, which
 * is 22px of padding either side of it.
 */
const FIGURE_SIZES = "(min-width: 1240px) 1196px, calc(100vw - 44px)";

/**
 * Placeholder shown when an asset is missing.
 *
 * The case-study art is dropped into `public/images/<case>/` separately, so a
 * figure has to hold its ratio and name the file it wants rather than
 * collapsing the layout into a broken-image icon.
 */
export function MissingAsset({ file, ratio, tone = "ink", sx }) {
  const theme = useCaseTheme();
  const line = tone === "paper" ? paper.line : ink.line;

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: ratio,
        display: "grid",
        placeItems: "center",
        gap: "10px",
        p: "18px",
        textAlign: "center",
        bgcolor: tone === "paper" ? "rgba(0,0,0,.03)" : "rgba(255,255,255,.02)",
        backgroundImage: `repeating-linear-gradient(135deg, transparent 0 11px, ${line} 11px 12px)`,
        ...sx,
      }}
    >
      <Box
        sx={{
          fontFamily: font.mono,
          fontSize: "9.5px",
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: tone === "paper" ? paper.muted : ink.faint,
          lineHeight: 2,
        }}
      >
        <Box component="span" sx={{ color: accentFor(tone), display: "block" }}>
          Artwork pending
        </Box>
        images/{theme?.dir}/{file}
      </Box>
    </Box>
  );
}

/**
 * A bordered, click-to-enlarge image.
 *
 * `ratio` is always set so the page does not reflow as art loads in — the
 * chapter figures are the tallest things on the page and a late shift would be
 * felt all the way down.
 */
export default function Figure({
  figure,
  tone = "ink",
  onZoom,
  eager = false,
  children,
  sx,
}) {
  const [failed, setFailed] = useState(false);
  const zoomable = !failed && typeof onZoom === "function";

  return (
    <Box
      component="figure"
      // The element goes up with the figure so the lightbox can grow out of it.
      onClick={zoomable ? (e) => onZoom(figure, e.currentTarget) : undefined}
      sx={{
        m: 0,
        border: `1px solid ${tone === "paper" ? paper.line : "rgba(255,255,255,.12)"}`,
        overflow: "hidden",
        cursor: zoomable ? "zoom-in" : "default",
        bgcolor: tone === "paper" ? paper.card : ink.bg,
        "&:hover img": zoomable ? { transform: "scale(1.012)" } : undefined,
        ...sx,
      }}
    >
      {failed ? (
        <MissingAsset file={figure.file} ratio={figure.ratio} tone={tone} />
      ) : (
        <Img
          src={figure.src}
          alt={figure.alt}
          sizes={FIGURE_SIZES}
          priority={eager}
          placeholder
          onError={() => setFailed(true)}
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            aspectRatio: figure.ratio,
            objectFit: "cover",
            transition: `transform 1.2s ${EASE_CSS}`,
          }}
        />
      )}
      {children}
    </Box>
  );
}

/** The mono strip some figures carry under the image. */
export function FigureCaption({ code, text, tone = "ink" }) {
  return (
    <Box
      component="figcaption"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        p: "12px 14px",
        borderTop: `1px solid ${tone === "paper" ? paper.lineSoft : "rgba(255,255,255,.1)"}`,
        fontFamily: font.mono,
        fontSize: "9px",
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: tone === "paper" ? paper.body : ink.dim,
      }}
    >
      <Box component="span" sx={{ color: accentFor(tone) }}>
        {code}
      </Box>
      <span>{text}</span>
    </Box>
  );
}
