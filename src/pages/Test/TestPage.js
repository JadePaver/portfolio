import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
    Stack,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    duration
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion, useCycle } from "framer-motion";

import MoodBadRoundedIcon from "@mui/icons-material/MoodBadRounded";
import { Opacity } from "@mui/icons-material";
import { type } from "@testing-library/user-event/dist/type";

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionGrid = motion(Grid);



const buttonVariants = {
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 8px white",
        boxShadow: "0px 0px 8px white",
        transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.6
        }
    }
}

const containerVariants = {
    hidden: {
        x: '100vw',
    },
    visible: {
        x: 0,
        // opacity: 1,
        transition: { delay: 1.5, duration: 1.5 }
    },
    exit: {
        x: '-100vw',
        transition: { ease: 'easeInOut' }
    }
};

const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const nextVariant = {
    hidden: {
        x: '-100vw'
    },
    visible: {
        x: 0,
        transition: { type: 'string', stiffness: 120, delay: 5, when: "beforeChildren" }
    }

}

const svgVariants = {
    hidden: {
        rotate: -180
    },
    visible: {
        rotate: 0,
        transition: { duration: 1 }
    }
}

const pathVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: { duration: 2, ease: "easeInOut" }
    }
}

const loaderVariants = {
    animationOne: {
        x: [-20, 20],
        y: [0, -30],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.5,
            },
            y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.25,
            }
        }
    },
    animationTwo: {
        y: [0, -40],
        x: 0,
        transition: {
            y: {
                repeat: Infinity,
                duration: 0.25,
                repeatType: "reverse",
                ease: 'easeInOut',
            }
        }
    }
}



const TestPage = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo")

    return (<>
        <MotionGrid
            container
            rowGap={0}
            columnGap={0}
            sx={{
                width: "100vw",
                py: "auto"
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <MotionTypography
                variant="h3"
                sx={{ textAlign: "center" }}
                variants={childVariants}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
            >
                THIS IS A TEST PAGE
            </MotionTypography>
            <MotionTypography
                variant="h3"
                sx={{ textAlign: "center" }}
                variants={childVariants}
            >
                THIS IS A TEST PAGE
            </MotionTypography><MotionTypography
                variant="h3"
                sx={{ textAlign: "center" }}
                variants={childVariants}
            >
                THIS IS A TEST PAGE
            </MotionTypography>

            <MotionButton
                variant='contained'
                variants={buttonVariants}
                whileHover="hover"
                onClick={cycleAnimation}
            >
                TEST CLICK
            </MotionButton>
            <AnimatePresence>
                {isOpen && (
                    <MotionTypography
                        initial={{ x: -100, opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                type: "spring",
                                stiffness: 120,
                                damping: 20,
                            },
                        }}
                        exit={{
                            x: -1000,
                            opacity: 0,
                            transition: { duration: 0.4, ease: "easeInOut" }
                        }}
                    >
                        APPLES
                    </MotionTypography>)}
            </AnimatePresence>
            {/* <AnimatePresence onExitComplete={() => setIsOpen(false)}>
                {isOpen && (<motion.div
                    key="box"
                    initial={{ x: '-100vw' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100vw' }}
                >
                    <h1>ASagasgsagsa</h1>
                </motion.div>)}

            </AnimatePresence>
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 120"
                width="200"
                height="200"
                variants={svgVariants}
                initial="hidden"
                animate="visible"
            >
                <circle cx="60" cy="60" r="50" fill="red" />

                <motion.path
                    d="M50 30 L50 -10 C50 -10 90 -10 90 30 Z"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    transform="translate(10, -10)"
                    variants={pathVariants}
                />
            </motion.svg> */}

        </MotionGrid>
        <MotionGrid
            container
        >
            <motion.div variants={loaderVariants} animate={animation}>
                <MoodBadRoundedIcon sx={{ fontSize: 100 }} />
            </motion.div>
        </MotionGrid>
    </>);
};

export default TestPage;
