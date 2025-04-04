import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import DashboardPage from "./pages/Dashboard";
import Page404 from "./pages/Page404";

// ✅ Page transition variants
const pageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
  };
  

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <motion.div
                            variants={pageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <DashboardPage />
                        </motion.div>
                    }
                />
                <Route
                    path="*"
                    element={
                        <motion.div
                            variants={pageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
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
