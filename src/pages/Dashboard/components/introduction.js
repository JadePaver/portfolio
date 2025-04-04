import { useState } from "react";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid2";
import { Typography, Button, Collapse, Box } from "@mui/material";

const IntroductionSection = ({ scrollY }) => {
    const [showMore, setShowMore] = useState(false);

    const textVariants = {
        hidden: {
            opacity: 0,
            clipPath: "inset(0 100% 0 0)" // Hide text by clipping from right
        },
        visible: (delay) => ({
            opacity: 1,
            clipPath: "inset(0 0 0 0)", // Reveal text from left to right
            transition: {
                opacity: { duration: 0.8, ease: "easeOut", delay }, // Faster opacity transition
                clipPath: { duration: 1.2, ease: "easeInOut", delay: delay + 0.1 } // Slightly faster clip-path transition
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
                src="/itBerries.svg"
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
                        Introduction1
                    </Typography>
                </motion.div>
                <motion.div
                    custom={0.2}
                    initial="hidden"
                    animate={scrollY >= 233 ? "visible" : "hidden"}
                    variants={textVariants}
                >
                    <Typography variant="body1" color="secondary.main" sx={{ mt: "2rem" }}>
                        Nulla in velit a metus rhoncus tempus. Nulla congue nulla vel sem varius finibus.
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
                        <Typography variant="h4" fontWeight={600} color="secondary.main">
                            Introduction2
                        </Typography>
                    </motion.div>
                    <motion.div
                        custom={0.5}
                        initial="hidden"
                        animate={scrollY >= 233 ? "visible" : "hidden"}
                        variants={textVariants}
                    >
                        <Typography variant="body1" color="secondary.main" sx={{ mt: "2rem" }}>
                            Sed ornare sit amet lorem sed viverra. In vel urna quis libero viverra facilisis ut ac est.Sed ornare sit amet lorem sed viverra. In vel urna quis libero viverra facilisis ut ac est.Sed ornare sit amet lorem sed viverra. In vel urna quis libero viverra facilisis ut ac est.Sed ornare sit amet lorem sed viverra. In vel urna quis libero viverra facilisis ut ac est.Sed ornare sit amet lorem sed viverra. In vel urna quis libero viverra facilisis ut ac est.Sed ornare sit amet lorem sed viverra. In vel urna quis libero viverra facilisis ut ac est.
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
                        <Typography variant="h4" fontWeight={600} color="secondary.main">
                            Introduction3
                        </Typography>
                    </motion.div>
                    <motion.div
                        custom={0.9}
                        initial="hidden"
                        animate={scrollY >= 233 ? "visible" : "hidden"}
                        variants={textVariants}
                    >
                        <Typography variant="body1" color="secondary.main" sx={{ mt: "2rem" }}>
                            Morbi commodo, eros in dignissim tempus, lacus odio rutrum augue, in semper sem magna quis tellus.
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
