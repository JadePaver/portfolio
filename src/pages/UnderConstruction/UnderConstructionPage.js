import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded"; // background
import HardwareRoundedIcon from "@mui/icons-material/HardwareRounded"; // hammer
import { motion } from "framer-motion";

// Motion components
const MotionTypography = motion(Typography);
const MotionHammerIcon = motion(HardwareRoundedIcon);

// Animations
const hammerSwing = {
    animate: {
        rotate: [0, 45, 0],
        transition: {
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
};

const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: (custom = 1) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: custom * 0.2,
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    }),
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const UnderConstruction = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <Grid
            container
            rowGap={0}
            columnGap={0}
            size={{ xs: 12, md: 12 }}
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                px: 2,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background Icon */}
            <HandymanRoundedIcon
                sx={{
                    position: "absolute",
                    fontSize: { xs: "40rem", md: "60rem" },
                    opacity: 0.04,
                    color: "primary.main",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />

            {/* Foreground Content */}
            <Grid size={{ xs: 12, md: 12 }} sx={{ zIndex: 1 }}>
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="center">
                    <MotionHammerIcon
                        variants={hammerSwing}
                        animate="animate"
                        sx={{ fontSize: { xs: "18rem", md: "12rem" } }}
                        color="primary"
                    />
                    <MotionTypography
                        variants={slideInRight}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        color="primary"
                        sx={{
                            fontSize: { xs: "4rem", md: "8rem" },
                            fontWeight: 700,
                            ml: 2,
                        }}
                    >
                        Coming Soon
                    </MotionTypography>
                </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 12 }} sx={{ mt: 2, zIndex: 1 }}>
                <MotionTypography
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    variant="h6"
                    color="text.secondary"
                >
                    Our site is currently under construction.
                </MotionTypography>
            </Grid>

            <Grid size={{ xs: 12, md: 12 }} sx={{ mt: 1, zIndex: 1 }}>
                <MotionTypography
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    color="text.secondary"
                >
                    We’re hammering away to improve your experience.
                    <br />
                    Check back again soon!
                </MotionTypography>
            </Grid>

            <Grid
                size={{ xs: 12, md: 12 }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: "2rem",
                    zIndex: 1,
                }}
            >
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                >
                    <Button variant="outlined" onClick={() => navigate("/")}>
                        Go to Homepage
                    </Button>
                </motion.div>
            </Grid>
        </Grid>
    );
};

export default UnderConstruction;
