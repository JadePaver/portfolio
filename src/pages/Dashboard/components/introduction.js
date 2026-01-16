import { useState } from "react";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid2";
import { Typography, Button, Collapse, Box } from "@mui/material";

import itBerries from "../../../assests/itBerries.svg";


const IntroductionSection = ({ scrollY }) => {
    const [showMore, setShowMore] = useState(false);

    const textVariants = {
        hidden: {
            opacity: 0,
            clipPath: "inset(0 100% 0 0)"
        },
        visible: (delay) => ({
            opacity: 1,
            clipPath: "inset(0 0 0 0)",
            transition: {
                opacity: { duration: 0.8, ease: "easeOut", delay },
                clipPath: { duration: 1.2, ease: "easeInOut", delay: delay + 0.1 }
            }
        })
    };

    return (<>
        <Grid
            container
            size={{ md: 12 }}
            sx={{ bgcolor: "primary.main", p: "2.5% 5%", transition: "height 0.5s ease-in-out", width: "100%", position: "relative", overflow: "hidden" }}
        >
            <Box
                component="img"
                src={itBerries}
                sx={{
                    position: "absolute",
                    top: { xs: "0px", md: "-70px" },
                    right: { xs: "", md: "10px" },
                    width: { xs: "auto", md: "auto" },
                    height: { xs: "134vw", md: "20rem" },
                    transform: { xs: "", md: "rotate(24deg)" },
                }}
            />

            <Grid size={{ md: 12 }}>
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate={scrollY >= 233 ? "visible" : "hidden"}
                    variants={textVariants}
                >
                    <Typography variant="h4" fontWeight={600} color="secondary.main">
                        Introduction
                    </Typography>
                </motion.div>
                <motion.div
                    custom={0.2}
                    initial="hidden"
                    animate={scrollY >= 233 ? "visible" : "hidden"}
                    variants={textVariants}
                >
                    <Typography
                        variant="body1"
                        color="secondary.main"
                        sx={{
                            mt: "2rem",
                            letterSpacing: "1px",
                            lineHeight: "1.6",
                        }}>
                        With over five years of experience as a Computer Programmer, my journey began during my academic years, where I was first introduced to C# and Arduino for Internet of Things (IoT) development. Driven by curiosity and passion, I taught myself how to build software applications with intuitive user interfaces tailored for IoT systems. My dedication led me to a four months internship at Spring Valley, where I further sharpened my skills in real-world projects. Today, I serve as a Software Developer and Project Manager for government agencies, where I’ve successfully led the development of 11 web applications and 4 mobile applications. I take pride in creating impactful digital solutions that bridge technology and usability.
                    </Typography>
                </motion.div>
            </Grid>

            {/* Collapsible Sections */}
            <Collapse in={showMore} timeout={700} unmountOnExit>
                <Grid size={{ md: 12 }}>
                    <motion.div
                        custom={0.3}
                        initial="hidden"
                        animate={scrollY >= 233 ? "visible" : "hidden"}
                        variants={textVariants}
                    >
                        <Typography variant="h4" fontWeight={600} color="secondary.main" sx={{ mt: "2rem" }}>
                            Technological University of the Philippines
                        </Typography>
                    </motion.div>
                    <motion.div
                        custom={0.5}
                        initial="hidden"
                        animate={scrollY >= 233 ? "visible" : "hidden"}
                        variants={textVariants}
                    >
                        <Typography
                            variant="body1"
                            color="secondary.main"
                            sx={{ mt: "2rem", letterSpacing: "1px", lineHeight: "1.6" }}
                        >
                            During my time at the university, I pursued a Bachelor of Science degree majoring in Computer Technology. I also served as the Club President of the Technological Society, a student organization composed of four sections focused on exposing fellow students to modern technology. As part of this role, I led a collaborative program with a private company aimed at enhancing our members' knowledge of industry-relevant technologies.
                        </Typography>

                        <Typography
                            variant="body1"
                            color="secondary.main"
                            sx={{ mt: "1.5rem", letterSpacing: "1px", lineHeight: "1.6" }}
                        >
                            In my academic years, I developed a user interface for a dehydrator machine, integrating sensor data using an ESP32 Wi-Fi module to monitor temperature and usage via the internet and a mobile app. I also worked on various IoT projects, including a garbage-collecting boat, a self-aligning solar panel, a bookshelf organizer, and a tracker with a software application for inventory and book borrowing.
                        </Typography>

                        <Typography
                            variant="body1"
                            color="secondary.main"
                            sx={{ mt: "1.5rem", letterSpacing: "1px", lineHeight: "1.6" }}
                        >
                            For our thesis project, my team of seven developed an automated facial recognition system for the university's parking lot. The system detects registered employee faces, opens the barrier for entry, and automatically logs their daily time records — all without requiring them to leave their vehicles.
                        </Typography>
                    </motion.div>

                </Grid>
                <Grid size={{ md: 12 }}>
                    <motion.div
                        custom={0.7}
                        initial="hidden"
                        animate={scrollY >= 233 ? "visible" : "hidden"}
                        variants={textVariants}
                    >
                        <Typography variant="h4" fontWeight={600} color="secondary.main" sx={{ mt: "2rem" }}>
                            Spring Valley Tech Corp
                        </Typography>
                    </motion.div>
                    <motion.div
                        custom={0.9}
                        initial="hidden"
                        animate={scrollY >= 233 ? "visible" : "hidden"}
                        variants={textVariants}
                    >
                        <Typography variant="body1" color="secondary.main" sx={{ mt: "1.5rem", letterSpacing: "1px", lineHeight: "1.6" }}>
                            At Spring Valley, I honed my skills in full-stack development by working closely with a team of professionals on innovative solutions for real client needs. Before being assigned to actual projects, we underwent intensive training in AngularJS and the Flutter framework. These technologies were later applied to real-world products such as PASABAY, a food delivery app, and Spring Valley - PERSONA, a human resource management system.
                        </Typography>
                        <Typography variant="body1" color="secondary.main" sx={{ mt: "1.5rem", letterSpacing: "1px", lineHeight: "1.6" }}>
                            This internship not only helped me grow into a disciplined developer but also gave me the opportunity to lead as a project manager. Through weekly project pitching and daily stand-up meetings, I guided my team using agile practices like sprint planning to ensure smooth progress and successful project outcomes.
                        </Typography>

                    </motion.div>
                </Grid>
            </Collapse>

            {/* READ MORE Button (Always at Bottom) */}
            <Grid size={{ xs: 12, md: 12 }} sx={{ mt: 3 }}>
                <Button variant="more" onClick={() => setShowMore(!showMore)}>
                    {showMore ? "SHOW LESS" : "READ MORE"}
                </Button>
            </Grid>
        </Grid>
    </>);
};

export default IntroductionSection;
