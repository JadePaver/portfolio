import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoodBadRoundedIcon from "@mui/icons-material/MoodBadRounded";
import { motion } from "framer-motion";

// Motion components
const MotionTypography = motion(Typography);
const MotionIcon = motion(MoodBadRoundedIcon);

// Animation variants
const rollInIcon = {
    hidden: { x: "100vw", rotate: -180, opacity: 0 },
    visible: {
        x: 0,
        rotate: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 1,
        },
    },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.3,
            duration: 0.8,
            ease: "easeOut",
        },
    }),
};

const slideInRight = {
    hidden: { x: '100vw' },
    visible: (custom = 1) => ({
        x: 0,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 23,
        },
    }),
};


const Page404 = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (<>
        <Grid
            container
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
            }}
        >
            <Grid size={{ xs: 12, md: 12 }} >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                >
                    <MotionIcon
                        variants={rollInIcon}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        sx={{ fontSize: { xs: "7rem", md: "20rem" } }}
                        color="primary"
                    />
                    <MotionTypography
                        variants={slideInRight}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        color="primary"
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: { xs: "3rem", md: "10rem" },
                            fontWeight: 600,
                            lineHeight: 1,
                            ml: { xs: 0, md: 2 },
                        }}
                    >
                        404 PAGE
                    </MotionTypography>
                </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 12 }} sx={{ textAlign: "center", height: "fit-content" }}>
                <MotionTypography
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    variant="h5"
                    color="primary">
                    We’re Sorry! The Page Took a Detour
                </MotionTypography>
            </Grid>

            <Grid size={{ xs: 12, md: 12 }} sx={{ textAlign: "center", height: "fit-content" }}>
                <MotionTypography
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    color="primary">
                    (Unless you were looking for a page with a sentiment dissatisfied face and a 404 number.
                    If that’s the case, it definitely exists and you definitely found it.)
                </MotionTypography>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: '2rem' }}>
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                >
                    <Button
                        variant="contained"
                        disableElevation
                        autoFocus
                        onClick={() => navigate("/")}
                        sx={{
                            color: "white",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 700,
                            textTransform: "none",
                            borderRadius: "50px",
                            px: "1.6rem",
                            py: "0.6rem",
                            background: "linear-gradient(135deg, #FD6F00 0%, #ff3d6e 100%)",
                            "&:hover": { background: "linear-gradient(135deg, #FD6F00 0%, #ff3d6e 100%)" },
                        }}
                    >
                        Take Me Home
                    </Button>
                </motion.div>
            </Grid>
        </Grid>
    </>
    );
};

export default Page404;

