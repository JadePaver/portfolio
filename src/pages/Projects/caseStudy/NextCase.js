import { Box } from "@mui/material";

import Reveal from "../../../components/design/Reveal";

import { caseVars } from "./themes";
import {
  ACCENT,
  ACCENT_SOFT,
  EASE_CSS,
  font,
  ink,
  metaLabel,
  shell,
} from "./tokens";

/**
 * The hand-off at the end of a case study.
 *
 * A case study closes on its outcome, and the reader is either done or wants
 * the next one — so the next one is given the full measure rather than a pill
 * tucked into the footer beside the mail link. It carries what a reader needs
 * to decide: the destination's number, its own glyph, its wordmark and its own
 * tagline.
 *
 * The glyph is drawn in the *destination's* accent, not this page's. The marks
 * read their fill from `--case-accent`, so the variables are republished on a
 * wrapper here — a Ledger mark rendered on the Aspentech page would otherwise
 * come out blue, which would be a straightforwardly wrong statement about which
 * case study it belongs to.
 *
 * Everything else stays in the current page's accent on purpose. The rule, the
 * arrow and the hover state lead into a curtain painted from the skin of the
 * page being *left* (see `transitions/skins.js`), so tinting the interactive
 * parts with the destination would mean hovering blue and departing green.
 */
export default function NextCase({ entry, onGo }) {
  const Mark = entry.theme.mark;

  return (
    <Box component="section" sx={{ borderTop: `1px solid ${ink.lineSoft}` }}>
      <Box sx={{ ...shell, py: "clamp(38px, 5vw, 64px)" }}>
        <Reveal duration={0.9} y={22}>
          <Box
            component="button"
            type="button"
            onClick={onGo}
            // The visible copy runs to three lines; spoken, it only needs to
            // say where the control goes. Naming it explicitly also keeps the
            // wording identical to the header link and the curtain caption.
            aria-label={`${entry.word} case — ${entry.name}`}
            sx={{
              position: "relative",
              display: "block",
              width: "100%",
              textAlign: "left",
              p: "clamp(24px, 3.2vw, 40px)",
              bgcolor: "transparent",
              border: `1px solid ${ink.line}`,
              cursor: "pointer",
              overflow: "hidden",
              transition: `background-color .32s ${EASE_CSS}, border-color .32s ${EASE_CSS}`,
              "&:hover, &:focus-visible": {
                bgcolor: ink.card,
                borderColor: "rgba(255,255,255,.2)",
              },
              "&:focus-visible": {
                outline: `2px solid ${ACCENT}`,
                outlineOffset: 3,
              },
              // Driven from the button rather than each child's own `:hover`,
              // so the whole plate reacts as one object however it is entered —
              // including from the keyboard, where there is no pointer to be
              // over any particular part of it.
              "&:hover .nc-rule, &:focus-visible .nc-rule": { transform: "scaleX(1)" },
              "&:hover .nc-arrow, &:focus-visible .nc-arrow": { transform: "translateX(9px)" },
              "&:hover .nc-name, &:focus-visible .nc-name": { color: ACCENT },
            }}
          >
            {/* Draws itself across the top edge on hover: the plate's own
                reading bar, closing as the page's opens. */}
            <Box
              aria-hidden
              className="nc-rule"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                bgcolor: ACCENT,
                transform: "scaleX(0)",
                transformOrigin: "0 50%",
                transition: `transform .5s ${EASE_CSS}`,
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: "11px" }}>
                <Box
                  aria-hidden
                  sx={{ ...caseVars(entry.theme), display: "inline-flex" }}
                >
                  <Mark size={14} />
                </Box>
                <Box component="span" sx={{ ...metaLabel, fontSize: "9.5px", color: ink.dim }}>
                  {entry.wraps ? "Back to the first case study" : "Next case study"}
                </Box>
              </Box>

              <Box
                component="span"
                sx={{
                  fontFamily: font.mono,
                  fontSize: "10px",
                  letterSpacing: ".22em",
                  color: ink.faint,
                }}
              >
                {entry.number}
              </Box>
            </Box>

            <Box
              sx={{
                mt: "clamp(18px, 2.4vw, 26px)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "14px 30px",
              }}
            >
              <Box>
                <Box
                  component="span"
                  className="nc-name"
                  sx={{
                    display: "block",
                    fontSize: "clamp(32px, 5.2vw, 62px)",
                    fontWeight: 800,
                    letterSpacing: "-.042em",
                    lineHeight: 1,
                    color: ink.headline,
                    transition: `color .3s ${EASE_CSS}`,
                  }}
                >
                  {entry.name}
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    mt: "11px",
                    fontFamily: font.serif,
                    fontStyle: "italic",
                    fontSize: "clamp(16px, 1.9vw, 22px)",
                    lineHeight: 1.25,
                    color: ACCENT_SOFT,
                  }}
                >
                  {entry.tagline}
                </Box>
              </Box>

              <Box
                aria-hidden
                className="nc-arrow"
                sx={{
                  fontSize: "clamp(22px, 2.6vw, 30px)",
                  lineHeight: 1,
                  color: ACCENT,
                  transition: `transform .38s ${EASE_CSS}`,
                }}
              >
                →
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}
