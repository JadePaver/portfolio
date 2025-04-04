import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

// Hover animations for both the image and text
const hoverAnimations = {
    left: { rotate: -5, scale: 1.1 },
    right: { rotate: 5, scale: 1.1 },
};

// Shake animation (for odd indexes)
const shakeAnimation = {
    rotate: [-5, 5, -5, 5, -5, 5, 0],
    transition: { type: "tween", duration: 0.8, repeat: 2, repeatDelay: 0.1 },
};

// Bounce animation (for even indexes)
const bounceVariants = {
    bounce: {
        y: [-10, 0],
        transition: { type: "spring", stiffness: 1000, damping: 10 }
    },
};

// **NEW** Viewport-triggered animation
const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start off-screen
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay }
    }),
};

const SvgLabel = ({ src, label, index }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 1000);
    };

    const hoverEffect = index % 2 === 0 ? hoverAnimations.left : hoverAnimations.right;
    const clickAnimation = isClicked ? (index % 2 === 0 ? bounceVariants.bounce : shakeAnimation) : {};

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            custom={index * 0.2}
            variants={cardVariants}
            viewport={{ once: true, amount: 0.5 }}
        >
            <motion.div animate={clickAnimation} onClick={handleClick}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <motion.div
                        whileHover={hoverEffect}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <motion.img
                            src={src}
                            alt={label}
                            style={{
                                width: "auto",
                                height: "75px",
                                padding: "8px",
                                borderRadius: "4px",
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ mt: 1, letterSpacing: "0.1rem" }}
                            component={motion.p} // Allow motion props on Typography
                            whileHover={hoverEffect} // Apply hover effect to text
                            transition={{ duration: 0.2 }}
                        >
                            {label}
                        </Typography>
                    </motion.div>
                </Box>
            </motion.div>
        </motion.div>
    );
};

export default SvgLabel;
