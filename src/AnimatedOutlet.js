import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedOutlet = () => {
    const location = useLocation();
    const element = useOutlet(); // Fetch the current page element

    return (
        <AnimatePresence mode="wait" initial={true}>
            {element &&
                React.cloneElement(element, {
                    key: location.pathname, // Ensure each page has a unique key
                })}
        </AnimatePresence>
    );
};

export default AnimatedOutlet;
