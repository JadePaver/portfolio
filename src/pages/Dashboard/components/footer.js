import { useState } from "react";
import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Facebook, LinkedIn, Instagram, Email, KeyboardArrowUpRounded } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";

const Footer = () => {
    const [hovered, setHovered] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const MotionIconButton = motion(IconButton);

    const iconHoverEffect = {
        scale: 1.2,
        boxShadow: "0px 0px 12px rgba(255,255,255,0.8)",
        transition: { type: "spring", stiffness: 300 },
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ width: "100%" }}
            >
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    size={{ xs: 12, sm: 12, md: 12 }}
                    sx={{
                        bgcolor: "primary.main",
                        mt: { md: "15rem", xs: "7.5rem" },
                        color: "secondary.main",
                        textAlign: "center",
                        py: { xs: 0, md: 0 },
                    }}
                >
                    {/* Back to Top */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            sx={{ p: { xs: 0, md: 0 } }}
                        >
                            <Button
                                onClick={scrollToTop}
                                sx={{
                                    color: "white",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    backgroundColor: "transparent",
                                    py: 0,
                                    "&:hover": { backgroundColor: "transparent" },
                                }}
                            >
                                <Stack alignItems="center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 25 }}
                                        animate={hovered ? { opacity: 1, y: 25 } : { opacity: 0, y: 40 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <KeyboardArrowUpRounded fontSize="large" sx={{ color: "white" }} />
                                    </motion.div>
                                    <motion.div
                                        animate={hovered ? { y: -5 } : { y: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <KeyboardArrowUpRounded fontSize="large" />
                                    </motion.div>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                        textTransform="uppercase"
                                        sx={{ mb: "0.5rem" }}
                                    >
                                        Back to Top
                                    </Typography>
                                </Stack>
                            </Button>
                        </Box>
                    </Grid>

                    {/* Social Icons */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <MotionIconButton sx={{ color: "white" }} whileHover={iconHoverEffect}>
                                <Facebook />
                            </MotionIconButton>
                            <MotionIconButton sx={{ color: "white" }} whileHover={iconHoverEffect}>
                                <LinkedIn />
                            </MotionIconButton>
                            <MotionIconButton sx={{ color: "white" }} whileHover={iconHoverEffect}>
                                <Instagram />
                            </MotionIconButton>
                            <MotionIconButton
                                sx={{ color: "white" }}
                                whileHover={iconHoverEffect}
                                onClick={() => window.open("mailto:paver.jade09@gmail.com", "_blank")}
                            >
                                <Email />
                            </MotionIconButton>
                        </Box>
                    </Grid>

                    {/* Copyright */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="body2">
                                <strong>@2024 Jade Paver</strong> All Rights Reserved.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </motion.div>
        </AnimatePresence>
    );
};

export default Footer;
