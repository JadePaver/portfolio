import Grid from "@mui/material/Grid2";
import { Typography, Box } from "@mui/material";

import { motion } from "framer-motion";
import SvgLabel from "./svgLabel";

const SkillsSection = ({ scrollY, ref }) => {

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

    return (<>
        <Grid
            ref={ref}
            container
            size={{ md: 12 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                p: { xs: "0 5%", md: "0% 15%" },
            }}
        >
            <Grid
                size={{ md: 12 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
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
                            SKILLS
                        </Typography>
                    </Box>
                </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={cardVariants.left(0.3)}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ textTransform: "uppercase", letterSpacing: "1px", m: "5rem 0 1rem 0" }}
                    >
                        USING NOW:
                    </Typography>
                </motion.div>
            </Grid>
            <Grid container size={{ md: 12 }} spacing={3} sx={{ m: "2% 0" }} >
                {[
                    { src: "/logos/html.svg", label: "HTML" },
                    { src: "/logos/css.svg", label: "CSS" },
                    { src: "/logos/javascript.svg", label: "JAVASCRIPT" },
                    { src: "/logos/react.svg", label: "REACT" },
                    { src: "/logos/git.svg", label: "GIT" },
                    { src: "/logos/figma.svg", label: "FIGMA" },
                    { src: "/logos/nodejs.svg", label: "NODEJS" },
                    { src: "/logos/mysql.svg", label: "MYSQL" },
                    { src: "/logos/monggodb.svg", label: "MONGODB" },
                ].map((item, index) => (
                    <Grid item size={{ xs: 4, sm: 6, md: 3 }} key={index}>
                        <SvgLabel src={item.src} label={item.label} index={index} />
                    </Grid>
                ))}
            </Grid>
            <Grid size={{ xs: 12, md: 12 }} sx={{ mt: "2rem" }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={cardVariants.left(0.3)}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ textTransform: "uppercase", letterSpacing: "1px" }}
                    >
                        LEARNING:
                    </Typography>
                </motion.div>
            </Grid>
            <Grid container size={{ xs: 12, md: 12 }} spacing={3} sx={{ m: "5% 0" }}>
                {[
                    { src: "/logos/c.svg", label: "C" },
                    { src: "/logos/cplus.svg", label: "C++" },
                ].map((item, index) => (
                    <Grid item size={{ xs: 4, sm: 6, md: 3 }} key={index}>
                        <SvgLabel src={item.src} label={item.label} index={index} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </>)
}
export default SkillsSection;
