import { Fragment, useMemo } from "react";
import { Typography, useTheme } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1];

// Short strings (headings, labels) read better letter by letter; paragraphs
// animate per word so a 90-word block is ~90 nodes instead of ~600.
const CHAR_MODE_MAX_LENGTH = 48;

export function TypewriterText({
  text,
  delay = 0,
  fontSize,
  fontWeight,
  highlightFirstWord = false,
  startBullet = false,
  mode = "auto",
  sx,
}) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();

  const perChar = mode === "char" || (mode === "auto" && text.length <= CHAR_MODE_MAX_LENGTH);
  const words = useMemo(() => text.split(" "), [text]);

  const { container, unit } = useMemo(() => {
    // Keep the reveal wave a fixed length regardless of paragraph size.
    const unitCount = perChar ? text.length : words.length;
    const stagger = Math.min(perChar ? 0.02 : 0.03, (perChar ? 0.5 : 0.85) / Math.max(unitCount, 1));

    return {
      container: {
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
      },
      unit: {
        hidden: perChar ? { opacity: 0, y: 8, filter: "blur(3px)" } : { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          ...(perChar ? { filter: "blur(0px)" } : {}),
          transition: { duration: perChar ? 0.4 : 0.55, ease: EASE_OUT },
        },
      },
    };
  }, [perChar, text.length, words.length, delay]);

  const baseSx = {
    textWrap: "pretty",
    // Hanging indent so wrapped bullet lines align past the marker.
    ...(startBullet ? { pl: "1.15em", textIndent: "-1.15em" } : {}),
    ...sx,
  };

  if (reduceMotion) {
    return (
      <Typography
        variant="body1"
        component="p"
        style={{ margin: 0 }}
        fontSize={fontSize}
        fontWeight={fontWeight}
        sx={baseSx}
      >
        {startBullet && (
          <span style={{ display: "inline-block", width: "1.15em", textIndent: 0, color: theme.palette.primary.main, fontWeight: 700 }}>{"•"}</span>
        )}
        {highlightFirstWord ? (
          <>
            <span style={{ fontWeight: 700, color: theme.palette.primary.main }}>{words[0]}</span>
            {words.length > 1 ? ` ${words.slice(1).join(" ")}` : null}
          </>
        ) : (
          text
        )}
      </Typography>
    );
  }

  const renderWord = (word, wi, extraStyle) => {
    const style = { display: "inline-block", whiteSpace: "nowrap", textIndent: 0, ...extraStyle };

    // The space sits outside the inline-block so it is never dropped as
    // trailing whitespace, and lines can still break between words.
    return (
      <Fragment key={`w-${wi}`}>
        {perChar ? (
          <span style={style}>
            {Array.from(word).map((ch, i) => (
              <motion.span key={`${wi}-${i}`} variants={unit} style={{ display: "inline-block" }}>
                {ch}
              </motion.span>
            ))}
          </span>
        ) : (
          <motion.span variants={unit} style={style}>
            {word}
          </motion.span>
        )}
        {wi < words.length - 1 ? " " : null}
      </Fragment>
    );
  };

  return (
    <Typography
      variant="body1"
      component={motion.p}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
      style={{ margin: 0 }}
      fontSize={fontSize}
      fontWeight={fontWeight}
      sx={baseSx}
    >
      {startBullet && (
        <motion.span
          aria-hidden
          variants={unit}
          style={{
            display: "inline-block",
            width: "1.15em",
            textIndent: 0,
            color: theme.palette.primary.main,
            fontWeight: 700,
          }}
        >
          {"•"}
        </motion.span>
      )}
      {words.map((word, wi) =>
        renderWord(
          word,
          wi,
          highlightFirstWord && wi === 0
            ? { fontWeight: 700, color: theme.palette.primary.main }
            : undefined
        )
      )}
    </Typography>
  );
}
