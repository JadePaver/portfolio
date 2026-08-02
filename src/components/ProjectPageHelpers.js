import { Typography, Box, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { Picture } from "./Img";
import { TypewriterText } from "./TypewriterText";

const MotionBox = motion(Box);

export function TechIconTooltip({ label, iconFile, alt, visibleIconVariants, visibleImgVariants }) {
  return (
    <Tooltip
      title={<Typography fontFamily="Poppins" fontSize={13}>{label}</Typography>}
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
          width: { xs: 32, lg: 38 },
          height: { xs: 32, lg: 38 },
          borderRadius: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Picture src={`${process.env.PUBLIC_URL}/icons/${iconFile}`} sizes="22px">
          <Box
            component={motion.img}
            variants={visibleImgVariants}
            src={`${process.env.PUBLIC_URL}/icons/${iconFile}`}
            alt={alt ?? label}
            sx={{ width: { xs: 18, lg: 22 }, height: { xs: 18, lg: 22 }, willChange: "transform" }}
          />
        </Picture>
      </MotionBox>
    </Tooltip>
  );
}

export function SectionHeading({ text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mt: 6, mb: 0.5 }}>
      <MotionBox
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          width: 4,
          height: 28,
          borderRadius: "2px",
          mt: "4px",
          flexShrink: 0,
          transformOrigin: "top center",
          background: "linear-gradient(180deg, #FD6F00 0%, #ff4422 100%)",
        }}
      />
      <TypewriterText fontWeight={800} text={text} sx={{ fontSize: { xs: "1rem", lg: "1.1rem" } }} />
    </Box>
  );
}

export const projectTechIconVariants = {
  rest: { scale: 1, y: 0, boxShadow: "1px 2px 8px rgba(0,0,0,0.12)" },
  hover: { scale: 1.08, y: -2, boxShadow: "0px 6px 14px rgba(0,0,0,0.18)", transition: { type: "spring", stiffness: 400, damping: 22 } },
};

export const projectTechImgVariants = {
  rest: { scale: 1, rotate: 0, y: 0 },
  hover: { scale: 1.14, rotate: 3, y: -1, transition: { type: "spring", stiffness: 500, damping: 22 } },
};
