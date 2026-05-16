import { Typography, IconButton, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import aesImage from "../../assests/images/aes.png";
import aesImage1 from "../../assests/images/aes1.png";
import aesImage2 from "../../assests/images/aes2.png";
import aesImage3 from "../../assests/images/aes3.png";
import aesImage4 from "../../assests/images/aes4.png";
import Footer from "../Dashboard/components/footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const boxVariant = {
    hidden: {
        opacity: 0,
        x: 100,
        transition: {
            type: "spring",
            stiffness: 250,
            damping: 7,
            duration: 1,
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 250,
            damping: 7,
            duration: 1,
        },
    },
    exit: {
        opacity: 1,
        x: 100,
        transition: {
            type: "spring",
            stiffness: 250,
            damping: 7,
            duration: 1,
        },
    },
};

const fadeInUpVariant = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};



const AesPage = () => {
    const navigate = useNavigate();

    const animationSettings = {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        transition: {
            type: "spring",
            stiffness: 250,  // Increased stiffness for a stronger bounce
            damping: 5,     // Lower damping for a bouncier effect
            duration: 1,     // Duration of the animation
        }
    };

    const MotionIconButton = motion(IconButton);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Grid container size={{ md: 12 }} sx={{ p: "4vh 10vw" }}>
                <Grid size={{ md: 1 }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: 56,
                            height: 56,
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: 2,
                            bgcolor: "primary.main",
                            transition: "box-shadow 0.3s ease",
                            "&:hover": {
                                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                            },
                        }}
                    >
                        <motion.div
                            whileHover={{ x: -4, y: -4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            <MotionIconButton
                                color="primary"
                                onClick={() => navigate(-1)}
                                sx={{
                                    color: "secondary.main",
                                    fontSize: 40,
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 2,
                                    backgroundColor: "primary.main",
                                    "&:hover": {
                                        backgroundColor: "primary.dark",
                                    },
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 2,
                                }}
                            >
                                <ArrowBackIcon />
                            </MotionIconButton>
                        </motion.div>
                    </Box>
                </Grid>
                <Grid container size={{ md: 11 }}>
                    {/* Image wrapped in Box with lazy load */}
                    <Grid size={{ md: 12 }} sx={{ mb: 2 }}>
                        <MotionBox
                            variants={boxVariant}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true }}
                            component="img"
                            src={aesImage}
                            alt="AES"
                            loading="lazy" // Enable lazy loading for the image
                            sx={{
                                width: "100%",
                                maxHeight: "600px",
                                objectFit: "cover", // Ensures image covers the box
                                boxShadow: 2, // Optional: adds shadow for better visuals
                            }}
                        />
                    </Grid>
                    <Grid size={{ md: 2 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="body1"
                            fontWeight={1}
                            color="primary.main"
                        >
                            January 16, 2025
                        </MotionTypography>
                    </Grid>
                    <Grid size={{ md: 10 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="body1"
                            fontWeight={1}
                            color="primary.main"
                        >
                            React,Express,MUI
                        </MotionTypography>
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 2 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="h3"
                            fontWeight={900}
                        >Advance Educational Smart System (AESS)</MotionTypography>
                    </Grid>

                    <Grid size={{ md: 12 }} sx={{ mt: 1 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="body1"
                        >
                            An adaptive learning system for the university that was developed during the pandemic lockdown and other situations where students or teachers were unable to go to the university. This system was designed to provide flexible and personalized learning experiences, ensuring that education continued seamlessly despite restrictions on in-person classes. It leverages advanced technology to support remote learning, enhance student engagement, and offer real-time feedback, making it a vital tool for both students and educators in adapting to unforeseen circumstances and changing learning environments.
                        </MotionTypography>
                    </Grid>
                    <Grid container size={{ md: 12 }} sx={{ mt: 6 }} spacing={2}>
                        <Grid size={{ md: 6 }} >
                            <MotionBox
                                variants={boxVariant}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true }}
                                component="img"
                                src={aesImage1}
                                alt="AES"
                                loading="lazy"
                                sx={{
                                    width: "100%",
                                    maxHeight: "100%",
                                    objectFit: "cover",
                                    boxShadow: 2,
                                }}
                            />
                        </Grid>
                        <Grid size={{ md: 6 }} >
                            <MotionBox
                                variants={boxVariant}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true }}
                                component="img"
                                src={aesImage2}
                                alt="AES"
                                loading="lazy"
                                sx={{
                                    width: "100%",
                                    maxHeight: "100%",
                                    objectFit: "cover",
                                    boxShadow: 2,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="h6"
                            fontWeight="bold"
                        >Managing Classrooms</MotionTypography></Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 4 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="body1">
                            It enables the management of a classroom by organizing students, creating subjects for enrollment, developing modules, and even setting up assessments. Additionally, it allows for easy tracking of student scores and provides insights into specific mistakes made by individual students.It also allows guardians to create accounts and track the academic performance of their ward within the system.
                        </MotionTypography>
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                        <MotionBox
                            variants={boxVariant}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true }}
                            component="img"
                            src={aesImage3}
                            alt="AES"
                            loading="lazy"
                            sx={{
                                width: "auto",
                                maxHeight: "600px",
                                objectFit: "cover",
                                boxShadow: 2,
                            }}
                        />
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                        <MotionBox
                            variants={boxVariant}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true }}
                            component="img"
                            src={aesImage4}
                            alt="AES"
                            loading="lazy"
                            sx={{
                                width: "auto",
                                maxHeight: "1000px",
                                objectFit: "cover",
                                boxShadow: 2,
                            }}
                        />
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="h6"
                            fontWeight="bold"
                        >Data Records</MotionTypography></Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="body1"
                        >
                            With all the data integrated into the system, scores and overall averages are now easily tracked and reported, benefiting both students and university staff for personal and academic use.
                        </MotionTypography>
                    </Grid>
                    <Grid size={{ md: 12 }} sx={{ mt: 6 }}>
                        <MotionTypography
                            variants={fadeInUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variant="body1"
                        >That's all, thank you.</MotionTypography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Footer />
            </Grid>
        </>
    );
};

export default AesPage;

