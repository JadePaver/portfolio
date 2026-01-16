import { Typography, IconButton, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Footer from "../Dashboard/components/footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

import ledgerImage from "../../assests/images/gsoLedger.png";
import ledgerImage1 from "../../assests/images/ledger1.png";
import ledgerImage2 from "../../assests/images/ledger2.png";
import ledgerImage3 from "../../assests/images/ledger3.png";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const boxVariant = {
    hidden: {
        opacity: 0,
        x: 100,
        transition: {
            type: "spring",
            stiffness: 250,
            damping: 7,
            duration: 1,
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 250,
            damping: 7,
            duration: 1,
        },
    },
    exit: {
        opacity: 1,
        x: 100,
        transition: {
            type: "spring",
            stiffness: 250,
            damping: 7,
            duration: 1,
        },
    },
};

const fadeInUpVariant = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const MotionIconButton = motion(IconButton);

const LedgerPage = () => {
    const navigate = useNavigate();

    // Animation settings for the fade-in effect
    const animationSettings = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: {
            type: "spring",
            stiffness: 250,  // Increased stiffness for a stronger bounce
            damping: 5,     // Lower damping for a bouncier effect
            duration: 1,     // Duration of the animation
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Grid container size={{ md: 12 }} sx={{ p: "4vh 10vw" }}>
                <Grid size={{ md: 1 }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: 56,
                            height: 56,
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: 2,
                            bgcolor: "primary.main",
                            transition: "box-shadow 0.3s ease",
                            "&:hover": {
                                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                            },
                        }}
                    >
                        <motion.div
                            whileHover={{ x: -4, y: -4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            <MotionIconButton
                                color="primary"
                                onClick={() => navigate(-1)}
                                sx={{
                                    color: "secondary.main",
                                    fontSize: 40,
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 2,
                                    backgroundColor: "primary.main",
                                    "&:hover": {
                                        backgroundColor: "primary.dark",
                                    },
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 2,
                                }}
                            >
                                <ArrowBackIcon />
                            </MotionIconButton>
                        </motion.div>
                    </Box>
                </Grid>

                <Grid container size={{ md: 11 }}>
                    {/* Animated Image */}
                    <Grid size={{ md: 12 }} sx={{ mb: 2 }}>
                        <MotionBox
                            variants={boxVariant}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true }}
                            component="img"
                            src={ledgerImage}
                            alt="ledgerImage"
                            loading="lazy" // Enable lazy loading for the image
                            sx={{
                                width: "100%",
                                maxHeight: "600px",
                                objectFit: "cover", // Ensures image covers the box
                                boxShadow: 2, // Optional: adds shadow for better visuals
                            }}
                        />
                    </Grid>
                    {/* Animated Typography 1 */}
                    <Grid size={{ md: 2 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="body1"
                            fontWeight={1}
                            color="primary.main"
                        >
                            January 16, 2025
                        </MotionTypography>
                    </Grid>
                    {/* Animated Typography 2 */}
                    <Grid size={{ md: 10 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="body1" fontWeight={1} color="primary.main">
                            React, Express, MUI
                        </MotionTypography>
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 2 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }} variant="h3" fontWeight={900}>Ledger System</MotionTypography>
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 1 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }} variant="body1">
                            The Ledger System for the Property Management Department efficiently tracks and manages landowner payments, property details, including contracts, amortization schedules, and titles, providing a comprehensive overview of property ownership and financial obligations.
                        </MotionTypography>
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                        <MotionBox
                            variants={boxVariant}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true }}
                            component="img"
                            src={ledgerImage1}
                            alt="ledger1"
                            loading="lazy"
                            sx={{
                                width: "auto",
                                maxHeight: "600px",
                                objectFit: "cover",
                                boxShadow: 2,
                            }}
                        />
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }} variant="body1">
                            I designed this system to have a modern Web3 aesthetic while ensuring it remains ergonomic, providing an intuitive and comfortable user experience for office staff, especially for the ease and efficiency of ledger personnel.
                        </MotionTypography>
                    </Grid>
                    <Grid container size={{ md: 12 }} sx={{ mt: 6 }} spacing={2}>
                        <Grid size={{ md: 6 }} >
                            <MotionBox
                                variants={boxVariant}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true }}
                                component="img"
                                src={ledgerImage2}
                                alt="ledgerImage2"
                                loading="lazy"
                                sx={{
                                    width: "100%",
                                    maxHeight: "100%",
                                    objectFit: "cover",
                                    boxShadow: 2,
                                }}
                            />
                        </Grid>
                        <Grid size={{ md: 6 }} >
                            <MotionBox
                                variants={boxVariant}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true }}
                                component="img"
                                src={ledgerImage3}
                                alt="ledgerImage3"
                                loading="lazy"
                                sx={{
                                    width: "100%",
                                    maxHeight: "100%",
                                    objectFit: "cover",
                                    boxShadow: 2,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }} variant="body1">
                            The system features dynamic fields and a flexible date range report, enabling it to easily meet the complex and varied reporting requirements of other agencies. This adaptability ensures that users can generate customized reports that align with different formats, data parameters, and timeframes, providing accurate and comprehensive insights tailored to the needs of each agency.
                        </MotionTypography>
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }} variant="body1">That's all, thank you.
                        </MotionTypography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Footer />
            </Grid>
        </>
    );
}

export default LedgerPage;
