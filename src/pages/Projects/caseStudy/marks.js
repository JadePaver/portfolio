/**
 * The glyph each case study signs its header and footer with.
 *
 * Both take their fill from the accent custom property rather than a prop, so
 * they can be handed to the template as a bare component reference.
 */

import { Box } from "@mui/material";
import { ACCENT, ink } from "./tokens";

const markSx = { display: "block", flex: "0 0 auto" };

/** Ledger's bar chart. */
export function LedgerMark({ size = 16 }) {
  return (
    <Box component="svg" width={size} height={size} viewBox="0 0 16 16" aria-hidden sx={markSx}>
      <rect x="0" y="0" width="16" height="16" rx="4" fill={ACCENT} />
      <rect x="4" y="7" width="2.1" height="5" rx="1" fill={ink.bg} />
      <rect x="7" y="4" width="2.1" height="8" rx="1" fill={ink.bg} />
      <rect x="10" y="5.6" width="2.1" height="6.4" rx="1" fill={ink.bg} />
    </Box>
  );
}

/** Aspentech's initial: the A drawn as a single chevron. */
export function AspentechMark({ size = 16 }) {
  return (
    <Box component="svg" width={size} height={size} viewBox="0 0 16 16" aria-hidden sx={markSx}>
      <rect x="0" y="0" width="16" height="16" rx="4.5" fill={ACCENT} />
      <path d="M4.4 12 8 4.4 11.6 12H9.9L8 7.7 6.1 12Z" fill={ink.bg} />
    </Box>
  );
}

/** ICTD's custody tag: the label a unit wears from book-in to book-out. */
export function ICTDMark({ size = 16 }) {
  return (
    <Box component="svg" width={size} height={size} viewBox="0 0 16 16" aria-hidden sx={markSx}>
      <rect x="0" y="0" width="16" height="16" rx="4" fill={ACCENT} />
      <rect x="3" y="4.4" width="7.6" height="7.2" rx="1.1" fill={ink.bg} />
      <path d="M9.4 4.4h.9l2.7 3.6-2.7 3.6h-.9z" fill={ink.bg} />
      <circle cx="5.6" cy="8" r="1.1" fill={ACCENT} />
    </Box>
  );
}

/** LMS's chevrons: the `< >` a student spends the whole course typing. */
export function LMSMark({ size = 16 }) {
  return (
    <Box component="svg" width={size} height={size} viewBox="0 0 16 16" aria-hidden sx={markSx}>
      <rect x="0" y="0" width="16" height="16" rx="4.5" fill={ACCENT} />
      <path
        d="M6.2 5.3 3.7 8l2.5 2.7M9.8 5.3 12.3 8l-2.5 2.7"
        fill="none"
        stroke={ink.bg}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  );
}

/** PasaBay's hand-off: two points and the arc between them. */
export function PasabayMark({ size = 16 }) {
  return (
    <Box component="svg" width={size} height={size} viewBox="0 0 16 16" aria-hidden sx={markSx}>
      <rect x="0" y="0" width="16" height="16" rx="4" fill={ACCENT} />
      <path
        d="M4 11.6c0-3.2 2.2-3.4 4-3.4s3.2-.5 3.2-2.3"
        fill="none"
        stroke={ink.bg}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="4" cy="11.6" r="1.5" fill={ink.bg} />
      <circle cx="11.4" cy="4.9" r="1.5" fill={ink.bg} />
    </Box>
  );
}
