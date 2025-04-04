
import { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { Typography, Box, Card, CardContent } from "@mui/material";

import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import InfoCard from "./infocard";
import { ScreenWidthContext } from "../dashboard";

const AboutSection = ({ scrollY, ref }) => {
    const screenWidth = useContext(ScreenWidthContext);

    useEffect(() => {
        console.log("scrollY:", scrollY)
    }, [scrollY])

    const cardVariants = {
        left: (delay = 0) => ({
            hidden: { opacity: 0, x: -100 },
            visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut", delay }
            },
        }),
        right: (delay = 0) => ({
            hidden: { opacity: 0, x: 100 },
            visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut", delay }
            },
        }),
        bottom: (delay = 0) => ({
            hidden: { opacity: 0, y: 100 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay }
            },
        }),
        top: (delay = 0) => ({
            hidden: { opacity: 0, y: -100 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay }
            },
        }),
    };

    const getLineWidth = (minScroll, maxScroll) => {
        const scrollY = window.scrollY;
        if (scrollY < minScroll) return 0;
        if (scrollY > maxScroll) return 5; // Max value is now 5
        return ((scrollY - minScroll) / (maxScroll - minScroll)) * 5;
    };

    return (
        <Grid
            ref={ref}
            container
            size={{ md: 12 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                p: "2.5% 5%",
            }}
        >
            {/* Title */}
            <Grid size={{ md: 12 }} display="flex"
                alignItems="center"
                justifyContent="center" sx={{ mt: "5%" }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={cardVariants.top(0.5)} // ✅ Add delay only when needed
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <Box
                        sx={{
                            p: "1rem",
                            border: "4px solid",
                            borderColor: "primary.main",
                            width: "fit-content",
                        }}
                    >
                        <Typography
                            fontWeight="bold"
                            letterSpacing="0.5rem"
                            color="primary.main"
                            textTransform="uppercase"
                        >
                            ABOUT ME
                        </Typography>
                    </Box>
                </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ m: "5rem 0" }}
            >
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        "&::before, &::after": {
                            content: '""',
                            position: "absolute",
                            width: `${getLineWidth(466, 1100)}rem`,
                            height: "3px",
                            bgcolor: "currentColor",
                            borderRadius: "9999px",
                            transition: "width 0.2s ease-in-out",
                        },
                        "&::before": { left: "-1rem", transform: "translateX(-100%)" },
                        "&::after": { right: "-1rem", transform: "translateX(100%)" },
                    }}
                >
                    <CodeRoundedIcon sx={{ fontSize: "2rem", transition: "color 0.3s" }} />
                </Box>
            </Grid>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants.top(0.5)}
            >
                <Grid size={{ md: 12 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        variant="body1"
                        sx={{
                            maxWidth: {sm:"",md:"50%"}, textAlign: "center",
                            lineHeight: 1.6,
                            letterSpacing: "0.5px",
                        }}
                    >
                        Nulla in velit a metus rhoncus tempus. Nulla congue nulla vel sem varius finibus. Sed ornare sit amet
                        lorem sed viverra. In vel urna quis libero viverra facilisis ut ac est.
                    </Typography>
                </Grid>
            </motion.div>
            <Grid
                container
                size={{ md: 12 }}
                sx={{
                    m: { sm: "5% 0%", md: "5% 10%" },
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Grid size={{ md: 6 }}>
                    <motion.div initial="hidden" whileInView="visible" variants={cardVariants.left(0.5)} viewport={{ once: true }}>
                        <InfoCard
                            title="Design"
                            description="I can design the site based on your needs and suggestions. I can also design the site from scratch and consult you during the job."
                            icon={DesignServicesIcon}
                        />
                    </motion.div>
                </Grid>
                <Grid size={{ md: 6 }} >
                    <motion.div initial="hidden" whileInView="visible" variants={cardVariants.right(0.5)} viewport={{ once: true }}>
                        <InfoCard
                            title="Design"
                            description="I can design the site based on your needs and suggestions. I can also design the site from scratch and consult you during the job."
                            icon={DesignServicesIcon}
                        />
                    </motion.div>
                </Grid>
                <Grid size={{ md: 6 }} >
                    <motion.div initial="hidden" whileInView="visible" variants={cardVariants.bottom(0.5)} viewport={{ once: true }}>
                        <InfoCard
                            title="Design"
                            description="I can design the site based on your needs and suggestions. I can also design the site from scratch and consult you during the job."
                            icon={DesignServicesIcon}
                        />
                    </motion.div>
                </Grid>
                <Grid size={{ md: 12 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ m: "5rem 0" }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            "&::before, &::after": {
                                content: '""',
                                position: "absolute",
                                width: `${getLineWidth(900, 1400)}rem`,
                                height: "3px",
                                bgcolor: "currentColor",
                                borderRadius: "9999px",
                                transition: "width 0.2s ease-in-out",
                            },
                            "&::before": { left: "-1rem", transform: "translateX(-100%)" },
                            "&::after": { right: "-1rem", transform: "translateX(100%)" },
                        }}
                    >
                        <CodeRoundedIcon sx={{ fontSize: "2rem", transition: "color 0.3s" }} />
                    </Box>
                </Grid>
            </Grid>
        </Grid>

    );
};

export default AboutSection;
