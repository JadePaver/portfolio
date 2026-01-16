import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import DashboardPage from "./pages/Dashboard";
import Page404 from "./pages/Page404";
import AesPage from "./pages/Aes";
import LedgerPage from "./pages/Ledger";
import TestPage from "./pages/Test/TestPage";
import { duration } from "@mui/material";
import UnderConstructionPage from "./pages/UnderConstruction/UnderConstructionPage";

// Fade-in/fade-out animation for Dashboard
const fadeVariants = {
    enter: {
        opacity: 0,
        x: "-50vw", // Slide in from the right by 50vw
    },
    center: {
        zIndex: 1,
        x: 0, // Center position
        opacity: 1,
    },
    exit: {
        opacity: 0,
        x: "-80vw", // Slide out to the left by 80vw
        transition: {
            x: { type: "spring", stiffness: 200, damping: 30 },
            opacity: { duration: 0.5, ease: "easeIn" },
        },
    },
};

// Slide-in/Slide-out animation for AesPage
const slideVariants = {
    enter: {
        x: "100vw", // Slide in from the right by 100vw
        opacity: 0,
    },
    center: {
        x: 0, // Center position
        opacity: 1,
        zIndex: 1,
    },
    exit: {
        x: "100vw", // Slide out to the right
        opacity: 0,
        transition: {
            x: { type: "spring", stiffness: 200, damping: 30 },
            opacity: { duration: 0.5, ease: "easeIn" },
        },
    },
};

const slideToLeftVariants = {
    enter: {
        x: "-100vw",
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
        },
    },
    center: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
        },
    },
    exit: {
        x: "-100vw",
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 22,
            mass: 0.9,
        },
    },
};


const slideToRightVariants = {
    enter: {
        x: "100vw", // Slide in from the right by 100vw
        transition: {
            duration: 0.5
        },
    },
    center: {
        x: 0, // Center position
        transition: {
            duration: 0.5
        },
    },
    exit: {
        x: "100vw", // Slide out to the right
        transition: {
            duration: 0.5
        },
    },
};

const AnimatedRoutes = () => {
    const location = useLocation();
    const [direction, setDirection] = useState(0); // Store transition direction
    const [prevLocation, setPrevLocation] = useState(location); // Keep track of previous location

    // Set the direction of the transition based on route change
    useEffect(() => {
        if (location.pathname !== prevLocation.pathname) {
            const direction = location.pathname > prevLocation.pathname ? 1 : -1;
            setDirection(direction);
            setPrevLocation(location); // Update previous location
        }

        // Set document title based on route
        switch (location.pathname) {
            case "/":
                document.title = "Home | Portfolio";
                break;
            case "/aes":
                document.title = "AES | Portfolio";
                break;
            case "/gso_ledger":
                document.title = "Ledger | Portfolio";
                break;
            default:
                document.title = "404 | Portfolio";
                break;
        }
    }, [location, prevLocation]);

    return (
        <AnimatePresence custom={direction}>
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <motion.div
                            key="dashboard"
                            variants={slideToLeftVariants}
                            initial={prevLocation.pathname === location.pathname ? {} : "enter"}
                            animate="center"
                            exit="exit"
                            style={{ width: "100vw", position: "absolute" }}
                        >
                            <DashboardPage />
                        </motion.div>
                    }
                />
                <Route
                    path="/aes"
                    element={
                        <motion.div
                            key="aes"
                            variants={slideToRightVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            style={{ width: "100vw", position: "absolute" }}
                        >
                            <AesPage />
                        </motion.div>
                    }
                />
                <Route
                    path="/gso_ledger"
                    element={
                        <motion.div
                            key="gso_ledger"
                            variants={slideToRightVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            style={{ width: "100vw", position: "absolute" }}
                        >
                            <LedgerPage />
                        </motion.div>
                    }
                />
                <Route
                    path="/parms"
                    element={
                        <motion.div
                            key="parms"
                            variants={slideToRightVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            style={{ width: "100vw", position: "absolute" }}
                        >
                            <UnderConstructionPage />
                        </motion.div>
                    }
                />
                <Route
                    path="/fpsms"
                    element={
                        <motion.div
                            key="fpsms"
                            variants={slideToRightVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            style={{ width: "100vw", position: "absolute" }}
                        >
                            <UnderConstructionPage />
                        </motion.div>
                    }
                />
                <Route
                    path="/test"
                    element={
                        <motion.div
                            key="gso_ledger"
                            variants={slideToRightVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            style={{ width: "100vw", position: "absolute" }}
                        >
                            <TestPage />
                        </motion.div>
                    }
                />
                <Route
                    path="*"
                    element={
                        <motion.div
                            key="page404"
                            variants={slideToRightVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            style={{ width: "100vw", position: "absolute" }}
                        >
                            <Page404 />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
