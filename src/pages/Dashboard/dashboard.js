import { createContext, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid2";
import { Typography, Stack, Box, Button } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import Navbar from "./components/navbar";
import IntroductionSection from "./components/introduction";
import AboutSection from "./components/about";
import PortfolioSection from "./components/portfolio";
import SkillsSection from "./components/skill";
import Footer from "./components/footer";

const textVariants = {
    hidden: { opacity: 0, y: -50 }, // Start above and invisible
    visible: (custom) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay: custom }
    }),
};

export const ScreenWidthContext = createContext();

const DashboardPage = () => {
    const navigate = useNavigate();
    const introRef = useRef(null);
    const portfolioRef = useRef(null);
    const skillsRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);

    // ✅ Handle scroll and update state
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // ✅ Handle window resize and update state
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scrollToIntroduction = () => {
        introRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const scrollToPortfolio = () => {
        portfolioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const scrollToSkills = () => {
        skillsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return <ScreenWidthContext.Provider value={width}>
        <div style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
            <div
                style={{
                    position: "fixed", // Keeps it behind but allows scrolling
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100vh", // Ensures it covers the full viewport
                    backgroundImage: `url("/mountain_bg.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: -1, // Moves it behind the content
                }}
            />
            <Navbar
                scrollToIntroduction={scrollToIntroduction}
                scrollToPortfolio={scrollToPortfolio}
                scrollToSkills={scrollToSkills}
            />

            <Grid container>
                <Grid container size={{ md: 12 }}>
                    <Grid
                        container
                        size={{ xs: 5, md: 5 }}
                        sx={{
                            height: "100vh",
                        }}
                    >
                        <Grid
                            container
                            size={{ md: 12 }}
                            sx={{
                                p: { md: "50% 5% 50% 40%", xs: "50% 5% 25% 15%" },
                                textAlign: "left",
                            }}>
                            <Grid size={{ md: 12 }}>
                                <motion.div custom={1} initial="hidden" animate="visible" variants={textVariants}>
                                    <Typography
                                        color="primary.main"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: { md: "3rem", xs: "2rem" },
                                            mb: { md: "3rem", xs: "1rem" }
                                        }}
                                    >     Hi, I am
                                    </Typography>
                                </motion.div>

                                <motion.div custom={2} initial="hidden" animate="visible" variants={textVariants}>
                                    <Typography
                                        fontWeight={600}
                                        color="primary.main"
                                        sx={{
                                            fontSize: { md: "3rem", xs: "2rem" }, // ✅ Same scaling as the first Typography
                                            mb: { md: "2rem", xs: "1rem" }
                                        }}
                                    >
                                        Jade Paver
                                    </Typography>
                                </motion.div>

                                <motion.div custom={2} initial="hidden" animate="visible" variants={textVariants}>
                                    <Typography
                                        fontWeight={600}
                                        color="primary.main"
                                        sx={{
                                            fontSize: { md: "1.5rem", xs: "1rem" }, // ✅ Scale down for xs
                                            // opacity: 0.6
                                        }}
                                    >       Software Developer / Project Manager
                                    </Typography>
                                </motion.div>
                            </Grid>

                            <Grid container size={{ xs: 12, md: 12 }} sx={{ mt: 3, height:"fit-content" }} spacing={2} justifyContent="left" >
                                <motion.div custom={3} initial="hidden" animate="visible" variants={textVariants}>
                                    <Grid size={{ xs: 6, md: 6 }}>
                                        <motion.div
                                            whileHover={{ scale: 1.2, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            onClick={() => window.open("https://www.facebook.com/jade.paver.5", "_blank")}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: "secondary.main",
                                                    padding: "10px",
                                                    boxShadow: 3,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            >
                                                <FacebookIcon sx={{ color: "primary.main", fontSize: 30 }} />
                                            </Box>
                                        </motion.div>
                                    </Grid>
                                </motion.div>
                                <motion.div custom={3.2} initial="hidden" animate="visible" variants={textVariants}>

                                    <Grid size={{ xs: 6, md: 6 }}>
                                        <motion.div
                                            whileHover={{ scale: 1.2, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            onClick={() => window.open("https://github.com/JadePaver", "_blank")}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: "secondary.main",
                                                    padding: "10px",
                                                    boxShadow: 3,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            >
                                                <GitHubIcon sx={{ color: "primary.main", fontSize: 30 }} />
                                            </Box>
                                        </motion.div>
                                    </Grid>
                                </motion.div>
                                <motion.div custom={3.4} initial="hidden" animate="visible" variants={textVariants}>
                                    <Grid size={{ xs: 6, md: 6 }}>
                                        <motion.div
                                            whileHover={{ scale: 1.2, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            onClick={() => window.open("https://www.linkedin.com/in/jade-paver-a6073a280/", "_blank")}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: "secondary.main",
                                                    padding: "10px",
                                                    boxShadow: 3,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            >
                                                <LinkedInIcon sx={{ color: "primary.main", fontSize: 30 }} />
                                            </Box>
                                        </motion.div>
                                    </Grid>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        size={{ xs: 7, md: 7 }}
                        sx={{
                            height: "100vh",
                            bgcolor: "primary.main",
                            clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                        }}
                    ><motion.div
                        initial={{ opacity: 0, y: 20 }} // Start invisible and slightly below
                        animate={{ opacity: 1, y: 0 }}  // Fade in and move to normal position
                        transition={{ duration: 1.4, ease: "easeOut", delay: 2 }} // Smooth transition
                    >
                            <Box
                                component="img"
                                src="/profile.png" // ✅ Replace with your image path
                                alt="Portfolio Image"
                                sx={{
                                    width: { xs: "100%", md: "85%" },
                                    height: { xs: "100%", md: "80%" }, // 45% on xs screens, 80% on md and above
                                    objectFit: "cover", // ✅ Ensures proper scaling
                                }}
                            />
                        </motion.div>
                    </Grid>
                </Grid>
                <Grid container size={{ md: 12 }} >
                    <IntroductionSection scrollY={scrollY} />
                    <Grid
                        container
                        size={{ md: 12 }}
                        sx={(theme) => ({
                            background: `radial-gradient(circle, ${theme.palette.accent.main} 30%, ${theme.palette.secondary.main} 100%)`,
                            p: "2.5% 5%",
                        })}
                    >
                        <AboutSection scrollY={scrollY} ref={introRef} />
                        <SkillsSection ref={skillsRef} />
                    </Grid>
                    <PortfolioSection ref={portfolioRef} />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <Footer scrollY={scrollY} />
                </Grid>
            </Grid>
        </div>
    </ScreenWidthContext.Provider >
}

export default DashboardPage; 
