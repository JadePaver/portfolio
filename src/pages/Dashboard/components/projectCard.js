import Grid from "@mui/material/Grid2";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const ProjectCard = ({ imageSrc, category, title, description, moreLink, demoLink, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Grid container size={{ md: 4 }}>
            <motion.div
                key={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ zIndex: 10, transition: { duration: 0.2, ease: "easeIn" } }}
                style={{ width: "100%", position: "relative", zIndex: isHovered ? 10 : 1 }}
            >
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        overflow: "hidden",
                        "&:hover .image": {
                            transform: "scale(5) translate(25%, 25%)",
                            filter: "brightness(0.25) blur(10px)",
                        },
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Image */}
                    <Box
                        component="img"
                        src={imageSrc}
                        alt={title}
                        className="image"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "all 0.5s ease",
                        }}
                    />

                    {/* Overlay Text */}
                    <Box
                        className="overlayText"
                        sx={{
                            position: "absolute",
                            padding: {xs:"1rem 1rem",md:"1rem 5rem"},
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            width: "100%",
                            color: "secondary.main",
                            height: "100%",
                        }}
                    >
                        <motion.div
                            className="details"
                            initial={{ opacity: 0, x: 200 }}
                            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.6, 0, 0.1, 1] // Fast start, smooth last 0.1s
                            }}
                            style={{ textAlign: "center", width: "100%" }}
                        >

                            <Typography variant="body1" fontWeight={600} sx={{ fontStyle: "italic", mb: "1rem" }}>
                                {category}
                            </Typography>

                            <Typography variant="h5" fontWeight={800} sx={{ mb: "1rem" }}>
                                {title}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {description}
                            </Typography>

                            <Grid container spacing={2} justifyContent='center' sx={{ mt: 'auto ' }}>
                                <Grid item md={6} xs={12}>
                                    <Button variant="more" color="primary" fullWidth href={moreLink}>
                                        MORE
                                    </Button>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Button variant="more" color="secondary" fullWidth href={demoLink}>
                                        DEMO
                                    </Button>
                                </Grid>
                            </Grid>
                        </motion.div>
                    </Box>
                </Box>
            </motion.div>
        </Grid>
    );
};

export default ProjectCard;
