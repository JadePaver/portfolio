import { useState } from "react";
import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Facebook, LinkedIn, Instagram, Email, KeyboardArrowUpRounded } from "@mui/icons-material";
import { motion } from "framer-motion";

const Footer = () => {
    const [hovered, setHovered] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            size={{ xs: 12, sm: 12, md: 12 }}
            sx={{
                bgcolor: "primary.main",
                mt: {md:"15rem", xs:"7.5rem"},
                color: "secondary.main",
                textAlign: "center",
                py: { xs: 1, md: 0 },
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
                    sx={{ p: { xs: 1, md: 0 } }}
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
                            "&:hover": { backgroundColor: "transparent" }
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
                            <Typography variant="body2" fontWeight="bold" textTransform="uppercase" sx={{mb:"0.5rem"}}>
                                Back to Top
                            </Typography>
                        </Stack>
                    </Button>
                </Box>
            </Grid>

            {/* Social Icons */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton sx={{ color: "white" }}>
                        <Facebook />
                    </IconButton>
                    <IconButton sx={{ color: "white" }}>
                        <LinkedIn />
                    </IconButton>
                    <IconButton sx={{ color: "white" }}>
                        <Instagram />
                    </IconButton>
                    <IconButton
                        sx={{ color: "white" }}
                        onClick={() => window.open("mailto:paver.jade09@gmail.com", "_blank")}
                    >
                        <Email />
                    </IconButton>
                </Box>
            </Grid>

            {/* Copyright Section */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="body2">
                        <strong>@2024 Jade Paver</strong> All Rights Reserved.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Footer;
