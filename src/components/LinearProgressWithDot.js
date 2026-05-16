import React, { useEffect, useRef, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { motion, useInView } from "framer-motion";

const dotFadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function LinearProgressWithDot({
  value,
  duration = 1200,
  delay = 0,
  animateOnView = true,
  once = true,
}) {
  const hostRef = useRef(null);
  const inView = useInView(hostRef, { amount: 0.3, margin: "0px", once: false });

  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  const target = Math.max(0, Math.min(100, value));

  useEffect(() => {
    const shouldStart = animateOnView ? inView : true;
    if (!shouldStart) {
      if (!once) startedRef.current = false;
      return;
    }
    if (once && startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now() + delay;
    const from = 0;
    const to = target;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.max(0, Math.min(1, (now - startTime) / duration));
      const current = from + (to - from) * easeOutCubic(t);
      setProgress(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setProgress(to);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [inView, animateOnView, once, target, duration, delay]);

  const dotPosition = progress * 0.98;

  return (
    <Box ref={hostRef} sx={{ position: "relative", width: "100%", overflow: "visible" }}>
      <Box sx={{ position: "relative", width: "100%", px: `0px`, overflow: "visible" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: { xs: 7.5, lg: 10 },
            borderRadius: { xs: 3, lg: 5 },
            backgroundColor: "#EDECEC",
            "& .MuiLinearProgress-bar": {
              borderRadius: { xs: 3, lg: 5 },
              transition: "transform 160ms linear",
            },
          }}
        />
        <Box
          component={motion.div}
          variants={dotFadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount: 0.3 }}
          sx={{
            position: "absolute",
            top: "50%",
            left: `${dotPosition}%`,
            transform: "translate(-50%, -50%)",
            width: { xs: 20, lg: 23 },
            height: { xs: 20, lg: 23 },
            borderRadius: "50%",
            backgroundColor: "white",
            border: { xs: "2px solid #f57c00", lg: "3px solid #f57c00" },
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "left 80ms linear",
            willChange: "left, opacity",
          }}
        />
      </Box>
    </Box>
  );
}
