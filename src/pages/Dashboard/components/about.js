
import { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import { Typography, Box, Card, CardContent } from "@mui/material";

import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
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
                            maxWidth: { sm: "", md: "50%" }, textAlign: "center",
                            lineHeight: 1.6,
                            letterSpacing: "1px",
                        }}
                    >
                        I specialize in designing, developing, and managing digital solutions that cater to modern user needs. With a decent foundation in UI/UX, full-stack development, and project management, I ensure seamless and functional applications that meet industry standards. My expertise spans across front-end and back-end technologies, delivering innovative and efficient web and mobile applications.
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
                            description="I create intuitive and visually appealing user interfaces by leveraging UI/UX principles, wireframing, and prototyping tools like Figma. My designs focus on responsiveness, and accessibility, ensuring a seamless user experience across all devices."
                            icon={DesignServicesIcon}
                        />
                    </motion.div>
                </Grid>
                <Grid size={{ md: 6 }} >
                    <motion.div initial="hidden" whileInView="visible" variants={cardVariants.right(0.5)} viewport={{ once: true }}>
                        <InfoCard
                            title="Development"
                            description="I develop dynamic and scalable applications using JavaScript, React, and Node.js for web development, while also utilizing Flutter for mobile applications. My expertise includes API integration, backend development with Express.js and MySQL, and cloud deployment to optimize application performance."
                            icon={CodeRoundedIcon}
                        />
                    </motion.div>
                </Grid>
                <Grid size={{ md: 6 }} >
                    <motion.div initial="hidden" whileInView="visible" variants={cardVariants.bottom(0.5)} viewport={{ once: true }}>
                        <InfoCard
                            title="Management"
                            description="I lead projects efficiently using agile methodologies, ensuring smooth execution through sprint planning, daily stand-ups, and milestone tracking. By collaborating with cross-functional teams and overseeing product development, I help bring innovative ideas to life while maintaining clear communication with stakeholders."
                            icon={SupervisorAccountIcon}
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
