import { motion } from "framer-motion";
import Grid from "@mui/material/Grid2";
import { Typography, Box, Tabs, Tab, Pagination } from "@mui/material";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import { useState, useEffect } from "react";
import ProjectCard from "./projectCard";

const PortfolioSection = ({ scrollY, ref }) => {
    const [tabValue, setTabValue] = useState(0);

    const projects = [
        { imageSrc: "/images/aes.png", category: "Coded, Designed", title: "AES", description: "Advance Educational Smart System is a React front-end and Express backend app.", moreLink: "/more", demoLink: "/demo" },
        { imageSrc: "/images/gsoLedger.png", category: "Designed", title: "XYZ", description: "A sleek design system for modern web applications.", moreLink: "/xyz-more", demoLink: "/xyz-demo" },
        { imageSrc: "/images/parms.png", category: "Coded", title: "AppX", description: "A cross-platform mobile application for task management.", moreLink: "/appx-more", demoLink: "/appx-demo" },
        { imageSrc: "/images/fpsms.png", category: "Designed, Coded", title: "FPSMS", description: "A fully integrated mobile and web-based financial system.", moreLink: "/fpsms-more", demoLink: "/fpsms-demo" },
        { imageSrc: "/images/aes.png", category: "Coded, Designed", title: "AES", description: "Advance Educational Smart System is a React front-end and Express backend app.", moreLink: "/more", demoLink: "/demo" },
        { imageSrc: "/images/gsoLedger.png", category: "Designed", title: "XYZ", description: "A sleek design system for modern web applications.", moreLink: "/xyz-more", demoLink: "/xyz-demo" },
    ];

    const filteredProjects = projects.filter((project) => {
        if (tabValue === 0) return true;
        if (tabValue === 1) return project.category.includes("Coded");
        if (tabValue === 2) return project.category.includes("Designed");
        return false;
    });

    return (
        <Grid ref={ref} container size={{ md: 12 }}>
            <Grid item size={{ xs: 12, sm: 12, md: 12 }} display="flex" justifyContent="center" alignItems="center" sx={{ m: "5rem 0" }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                        hidden: { opacity: 0, y: -50 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8, ease: "easeOut", delay: 0.5 }, // ✅ Fixed delay syntax
                        },
                    }}
                    viewport={{ once: true, amount: 0.5 }} // ✅ Corrected placement
                >
                    <Box sx={{ p: "1rem", border: "4px solid", borderColor: "primary.main", width: "fit-content", height: "fit-content" }}>
                        <Typography fontWeight="bold" letterSpacing="0.5rem" color="primary.main" textTransform="uppercase">
                            PORTFOLIO
                        </Typography>
                    </Box>
                </motion.div>

            </Grid>

            {/* Wrap the entire section with motion.div for sliding effect */}

            <Grid container size={{ md: 12 }} sx={{ bgcolor: "primary.main", pb: "2rem", }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Tabs
                        value={tabValue}
                        onChange={(event, newValue) => setTabValue(newValue)}
                        sx={{
                            "& .MuiTabs-indicator": {
                                bgcolor: "secondary.main",
                            },
                        }}
                    >
                        <Tab
                            icon={<AppsRoundedIcon />}
                            label="ALL"
                            value={0}
                            sx={{
                                "&.Mui-selected": {
                                    color: "secondary.main",
                                },
                            }}
                        />
                        <Tab
                            icon={<CodeRoundedIcon />}
                            label="CODED"
                            value={1}
                            sx={{
                                "&.Mui-selected": {
                                    color: "secondary.main",
                                },
                            }}
                        />
                        <Tab
                            icon={<BrushRoundedIcon />}
                            label="DESIGN"
                            value={2}
                            sx={{
                                "&.Mui-selected": {
                                    color: "secondary.main",
                                },
                            }}
                        />
                    </Tabs>
                </Box>

                <motion.div
                    key={tabValue} // Triggers animation on filter change
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <Grid key={tabValue} container size={{ md: 12 }}>
                        {projects.map((project, index) => (
                            <ProjectCard key={index} {...project} index={index} />
                        ))}
                    </Grid>
                </motion.div>
                <Grid size={{ xs: 12, sm: 12, md: 12 }} justifyContent="center" textAlign="center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
                            },
                        }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <Typography
                            variant="body1"
                            color="secondary.main"
                            fontWeight={600}
                            sx={{ mt: "1.4rem" }}
                        >
                            And many more to come
                        </Typography>
                    </motion.div>
                </Grid>

            </Grid>
        </Grid>
    );
};

export default PortfolioSection;
