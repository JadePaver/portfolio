import { Box } from "@mui/material";
import Reveal from "../../../components/design/Reveal";
import {
  ACCENT_SOFT,
  accentFor,
  chapterLead,
  chapterTitle,
  font,
  hairlineGrid,
  ink,
  paper,
} from "./tokens";

/** `NN ——— Section name`, the rule that opens every chapter. */
export function Eyebrow({ num, children, tone = "ink" }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <Box
        component="span"
        sx={{
          fontFamily: font.mono,
          fontSize: "11px",
          letterSpacing: ".24em",
          color: accentFor(tone),
        }}
      >
        {num}
      </Box>
      <Box
        aria-hidden
        component="span"
        sx={{
          height: "1px",
          width: "44px",
          bgcolor: tone === "paper" ? paper.rule : ink.lineStrong,
        }}
      />
      <Box
        component="span"
        sx={{
          fontFamily: font.mono,
          fontSize: "11px",
          letterSpacing: ".24em",
          textTransform: "uppercase",
          color: tone === "paper" ? paper.muted : ink.dim,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/**
 * Chapter lead paragraph.
 *
 * Some leads pivot on an italic serif clause, so the copy can arrive either as
 * a plain string or as `{ before, em, after }`.
 */
export function Lead({ text, tone = "ink", sx }) {
  const emphasis = {
    fontFamily: font.serif,
    fontStyle: "italic",
    color: tone === "paper" ? paper.ink : ink.text,
  };

  return (
    <Box component="p" sx={{ ...chapterLead(tone), ...sx }}>
      {typeof text === "string" ? (
        text
      ) : (
        <>
          {text.before}
          <Box component="em" sx={emphasis}>
            {text.em}
          </Box>
          {text.after}
        </>
      )}
    </Box>
  );
}

/**
 * Chapter h2.
 *
 * Takes the same `{ before, em, after }` shape as `Lead`, for the chapters
 * whose title turns on one word. The emphasis is the soft accent rather than
 * the ink `Lead` uses: at heading size a near-white italic reads as a slip,
 * where the accent reads as the deliberate stress it is.
 */
function Title({ text, tone = "ink", sx }) {
  return (
    <Box component="h2" sx={{ ...chapterTitle(tone), ...sx }}>
      {typeof text === "string" ? (
        text
      ) : (
        <>
          {text.before}
          <Box
            component="em"
            sx={{
              fontFamily: font.serif,
              fontStyle: "italic",
              fontWeight: 400,
              color: ACCENT_SOFT,
            }}
          >
            {text.em}
          </Box>
          {text.after}
        </>
      )}
    </Box>
  );
}

/** Title on the left, lead paragraph on the right — the head of each chapter. */
export function ChapterHead({ num, kicker, title, lead, tone = "ink", titleSx }) {
  return (
    <>
      <Reveal duration={0.8}>
        <Eyebrow num={num} tone={tone}>
          {kicker}
        </Eyebrow>
      </Reveal>

      <Reveal delay={0.06} duration={0.85}>
        <Box
          sx={{
            mt: "18px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px 40px",
          }}
        >
          <Title text={title} tone={tone} sx={titleSx} />
          {lead && <Lead text={lead} tone={tone} />}
        </Box>
      </Reveal>
    </>
  );
}

/** The numbered four-up that closes each chapter. */
export function FeatureGrid({ cards, tone = "ink", delay = 0.12 }) {
  return (
    <Reveal delay={delay} duration={0.85} y={20} sx={{ mt: "clamp(22px, 3vw, 34px)" }}>
      <Box sx={hairlineGrid(tone)}>
        {cards.map((card) => (
          <Box
            key={card.num}
            sx={{ bgcolor: tone === "paper" ? paper.card : ink.card, p: "20px 22px" }}
          >
            <Box
              sx={{
                fontFamily: font.mono,
                fontSize: "9px",
                letterSpacing: ".2em",
                color: accentFor(tone),
              }}
            >
              {card.num}
            </Box>
            <Box
              component="h3"
              sx={{
                m: "9px 0 0",
                fontFamily: font.sans,
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: tone === "paper" ? paper.ink : ink.title,
              }}
            >
              {card.title}
            </Box>
            <Box
              component="p"
              sx={{
                m: "7px 0 0",
                fontFamily: font.sans,
                fontSize: "13.5px",
                lineHeight: 1.65,
                color: tone === "paper" ? paper.body : ink.muted,
                textWrap: "pretty",
              }}
            >
              {card.body}
            </Box>
          </Box>
        ))}
      </Box>
    </Reveal>
  );
}
