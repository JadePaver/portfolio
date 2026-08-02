import { Stack, Box, Typography, Paper, ClickAwayListener, Tooltip, Popper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useAnimationControls,
} from "framer-motion";
import { Picture } from "./Img";

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

/**
 * Several of these icons are Figma exports carrying a full-size PNG inside the
 * SVG — 130 KB to paint an 18px chip. `Picture` swaps in the 64px raster the
 * optimiser made; the SVG stays as the fallback.
 */
const ICON_SIZES = "18px";

function IconRow({ icon, index, activeIndex, isClosing }) {
  const boxControls = useAnimationControls();
  const textControls = useAnimationControls();

  const cubicEase = [0.25, 0.1, 0.25, 1];

  const rollInVariants = {
    initial: { opacity: 0, scale: 0.55, rotate: -20, x: -18 },
    enter: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      transition: { type: "spring", stiffness: 1600, damping: 15, mass: 0.4 },
    },
    exit: {
      opacity: 0,
      scale: 0.86,
      rotate: 10,
      x: -12,
      transition: { duration: 0.1, ease: cubicEase },
    },
    hover: {
      scale: 1.1,
      y: -1,
      boxShadow: "0px 6px 14px rgba(0,0,0,0.18)",
      transition: { type: "spring", stiffness: 600, damping: 24 },
    },
  };

  const imgVariants = {
    initial: { opacity: 0, scale: 0.55, rotate: -10 },
    enter: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 1500, damping: 15, mass: 0.35 },
    },
    exit: {
      opacity: 0,
      scale: 0.86,
      rotate: 6,
      transition: { duration: 0.08, ease: cubicEase },
    },
    hover: {
      scale: 1.15,
      rotate: 4,
      transition: { type: "spring", stiffness: 700, damping: 22 },
    },
  };

  const textVariants = {
    initial: { opacity: 0, x: -12 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.08, ease: cubicEase } },
    exit: { opacity: 0, x: -8, transition: { duration: 0.06, ease: cubicEase } },
    hover: { x: 2, transition: { type: "spring", stiffness: 700, damping: 30 } },
  };

  useEffect(() => {
    if (!isClosing && index <= activeIndex) {
      boxControls.start("enter");
      textControls.start("enter");
    }
  }, [activeIndex, isClosing, index, boxControls, textControls]);

  useEffect(() => {
    if (isClosing) {
      boxControls.start("exit");
      textControls.start("exit");
    }
  }, [isClosing, boxControls, textControls]);

  const handleHoverStart = () => {
    if (isClosing) return;
    boxControls.start("hover");
    textControls.start("hover");
  };

  const handleHoverEnd = () => {
    if (isClosing) return;
    boxControls.start("enter");
    textControls.start("enter");
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", willChange: "transform, opacity", cursor: "pointer", userSelect: "none" }}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <motion.div
        variants={rollInVariants}
        initial="initial"
        animate={boxControls}
        style={{
          backgroundColor: "white",
          width: 28,
          height: 28,
          borderRadius: 100,
          boxShadow: "1px 2px 6px rgba(0,0,0,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          willChange: "transform, opacity, box-shadow",
        }}
      >
        <Picture src={`${process.env.PUBLIC_URL}/icons/${icon}.svg`} sizes={ICON_SIZES}>
          <motion.img
            src={`${process.env.PUBLIC_URL}/icons/${icon}.svg`}
            width={18}
            height={18}
            alt={icon}
            initial="initial"
            animate={boxControls}
            variants={imgVariants}
            style={{ willChange: "transform, opacity" }}
          />
        </Picture>
      </motion.div>
      <motion.div
        variants={textVariants}
        initial="initial"
        animate={textControls}
        style={{ willChange: "transform, opacity" }}
      >
        <Typography fontSize={13} fontWeight={600}>{icon}</Typography>
      </motion.div>
    </Stack>
  );
}

export default function IconStackExpandable({ items }) {
  const displayed = items.slice(0, 3);
  const hiddenIcons = items.slice(3);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const closeTimer = useRef(null);
  const staggerTimerIds = useRef([]);

  const clearStaggerTimers = () => {
    staggerTimerIds.current.forEach((id) => clearTimeout(id));
    staggerTimerIds.current = [];
  };

  const handleOpen = (event) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    clearStaggerTimers();
    setIsClosing(false);
    setAnchorEl(event.currentTarget);
    setActiveIndex(0);
    scheduleStaggerForward();
  };

  const startClose = () => {
    if (!isClosing) {
      if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
      clearStaggerTimers();
      setIsClosing(true);
    }
  };

  const handleCloseDelayed = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => { startClose(); }, 120);
  };

  const handleCloseImmediately = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    startClose();
  };

  const popperOpen = Boolean(anchorEl) || isClosing;
  const cubicEase = [0.25, 0.1, 0.25, 1];

  const containerVariants = {
    hidden: { height: 0, opacity: 0, transition: { duration: 0.12, ease: cubicEase } },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.18, ease: cubicEase } },
  };

  const onPaperAnimationComplete = (definition) => {
    if (typeof definition === "string") {
      if (definition === "hidden") {
        setAnchorEl(null);
        setIsClosing(false);
        setActiveIndex(-1);
      }
    } else {
      if (isClosing) {
        setTimeout(() => {
          setAnchorEl(null);
          setIsClosing(false);
          setActiveIndex(-1);
        }, 8);
      }
    }
  };

  const scheduleStaggerForward = () => {
    clearStaggerTimers();
    const gap = 80;
    for (let i = 1; i < hiddenIcons.length; i++) {
      const tid = window.setTimeout(() => {
        setActiveIndex((prev) => Math.max(prev, i));
      }, i * gap);
      staggerTimerIds.current.push(tid);
    }
  };

  const handlePopperMouseEnter = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setIsClosing(false);
    if (anchorEl && activeIndex === -1 && hiddenIcons.length > 0) {
      setActiveIndex(0);
      scheduleStaggerForward();
    }
  };

  useEffect(() => {
    return () => {
      clearStaggerTimers();
      if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    };
  }, []);

  const visibleIconVariants = {
    rest: { scale: 1, y: 0, boxShadow: "1px 2px 6px rgba(0,0,0,0.25)" },
    hover: {
      scale: 1.08,
      y: -2,
      boxShadow: "0px 6px 14px rgba(0,0,0,0.18)",
      transition: { type: "spring", stiffness: 400, damping: 22 },
    },
  };

  const visibleImgVariants = {
    rest: { scale: 1, rotate: 0, y: 0 },
    hover: {
      scale: 1.14,
      rotate: 3,
      y: -1,
      transition: { type: "spring", stiffness: 500, damping: 22 },
    },
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        {displayed.map((icon, idx) => (
          <Tooltip
            key={idx}
            title={<Typography fontFamily="Poppins" fontSize={13}>{icon}</Typography>}
            arrow
            placement="top"
            enterDelay={150}
            leaveDelay={50}
          >
            <MotionBox
              variants={visibleIconVariants}
              initial="rest"
              animate="rest"
              whileHover="hover"
              sx={{
                bgcolor: "white",
                width: "30px",
                height: "30px",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Picture src={`${process.env.PUBLIC_URL}/icons/${icon}.svg`} sizes={ICON_SIZES}>
                <motion.img
                  variants={visibleImgVariants}
                  src={`${process.env.PUBLIC_URL}/icons/${icon}.svg`}
                  width={18}
                  height={18}
                  alt={icon}
                  style={{ willChange: "transform" }}
                />
              </Picture>
            </MotionBox>
          </Tooltip>
        ))}

        {hiddenIcons.length > 0 && (
          <Box
            onMouseEnter={handleOpen}
            onMouseLeave={handleCloseDelayed}
            sx={{
              bgcolor: "white",
              width: "30px",
              height: "30px",
              borderRadius: "100px",
              boxShadow: "1px 2px 6px rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Typography fontSize={11} fontWeight={300} sx={{ color: "#4E4E4E" }}>
              +{hiddenIcons.length}
            </Typography>
          </Box>
        )}
      </Stack>

      <Popper
        open={popperOpen}
        anchorEl={anchorEl}
        placement="bottom"
        onMouseEnter={handlePopperMouseEnter}
        onMouseLeave={handleCloseDelayed}
        modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
      >
        <ClickAwayListener onClickAway={handleCloseImmediately}>
          <AnimatePresence>
            {Boolean(anchorEl) && !isClosing && (
              <MotionPaper
                elevation={3}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
                onAnimationComplete={onPaperAnimationComplete}
                sx={{ px: 2, py: 2, borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0,0,0,0.15)", overflow: "hidden" }}
              >
                <Stack spacing={1}>
                  {hiddenIcons.map((icon, index) => (
                    <IconRow key={index} icon={icon} index={index} activeIndex={activeIndex} isClosing={isClosing} />
                  ))}
                </Stack>
              </MotionPaper>
            )}
            {isClosing && anchorEl && (
              <MotionPaper
                elevation={3}
                initial="visible"
                animate="hidden"
                exit="hidden"
                variants={containerVariants}
                onAnimationComplete={onPaperAnimationComplete}
                sx={{ px: 2, py: 1, borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0,0,0,0.15)", overflow: "hidden" }}
              >
                <Stack spacing={0.75}>
                  {hiddenIcons.map((icon, index) => (
                    <IconRow key={index} icon={icon} index={index} activeIndex={-1} isClosing={true} />
                  ))}
                </Stack>
              </MotionPaper>
            )}
          </AnimatePresence>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
