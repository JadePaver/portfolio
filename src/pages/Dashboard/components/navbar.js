import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { AppBar, Stack, Button, Box, Drawer, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // ✅ Import Close Icon
import { AnimatePresence, motion } from "framer-motion";

import myLogo from "../../../assests/myLogo.svg";
import myCV from "../../../assests/paver-cv.pdf"


const Navbar = ({ scrollToIntroduction, scrollToPortfolio, scrollToSkills }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > lastScrollY && scrollY > 10) {
                setIsScrolled(true);
            } else if (scrollY < lastScrollY - 10) {
                setIsScrolled(false);
            }

            lastScrollY = scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -200 }}
                transition={{ duration: 0.6 }}
            >
                <AppBar
                    position="fixed"
                    sx={{
                        height: { md: isScrolled ? "7vh" : "14vh", },
                        py: { xs: "1rem", md: "0rem" },
                        top: { md: 0, xs: isScrolled ? "-12%" : 0 },
                        left: 0,
                        right: 0,
                        bgcolor: { md: isScrolled ? "primary.main" : "transparent", xs: "primary.main" },
                        transition: "all 0.2s ease-in-out",
                        boxShadow: 0,
                        display: "flex",
                        justifyContent: "center",
                        zIndex: 1301,
                        overflow: "hidden",
                    }}
                >
                    <Grid container alignItems="center" justifyContent="space-between" sx={{ p: { xs: "0rem 2rem", md: "0 2rem" }, height: "100%" }}>
                        <Grid size={{ xs: 2, md: 6 }} display="flex" alignItems="center" >
                            <Box
                                component="img"
                                src={myLogo}
                                alt="My Portfolio Logo"
                                sx={{
                                    height: { xs: "3rem", md: isScrolled ? "2.6rem" : "6rem" },
                                    width: "auto",
                                    transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in-out",
                                    cursor: "pointer",
                                    filter: { xs: "invert(1) brightness(2)", md: isScrolled ? "invert(1) brightness(2)" : "none" },
                                }}
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={10}
                            md={6}
                            container
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                display: { xs: "none", md: "flex" }, // ✅ Use "flex" instead of "block" for centering
                                height: "100%",
                            }}
                        >       <Stack flexDirection="row" gap={3} justifyContent="flex-end" width="100%" alignItems="center" >
                                <Button variant="nav" onClick={scrollToIntroduction}>About me</Button>
                                <Button variant="nav" onClick={scrollToSkills}>Skills</Button>
                                <Button variant="nav" onClick={scrollToPortfolio}>Portfolio</Button>
                                <Button
                                    variant="nav"
                                    sx={(theme) => ({
                                        bgcolor: theme.palette.secondary.main, // White background
                                        color: theme.palette.primary.main, // Maroon text
                                        transition: "all 0.3s ease-in-out",
                                        "&:hover": {
                                            boxShadow: `0px 0px 10px ${theme.palette.secondary.main}`, // Stronger shadow on hover
                                            transform: "translateX(3px) translateY(-3px)", // Slight movement
                                        },
                                    })}
                                    onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = myCV; // Path to your CV file
                                        link.download = "paver-cv.pdf"; // Desired file name
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
                                    DOWNLOAD CV
                                </Button>
                            </Stack>
                        </Grid>

                        {/* Mobile Menu Icon */}
                        <Grid size={{ xs: 10, md: 6 }} sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
                            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                                {drawerOpen ? ( // ✅ Toggle between Menu and Close icons
                                    <CloseIcon sx={{ fontSize: "2rem", color: "secondary.main" }} />
                                ) : (
                                    <MenuIcon sx={{ fontSize: "2rem", color: "secondary.main" }} />
                                )}
                            </IconButton>
                        </Grid>
                    </Grid>
                </AppBar>
            </motion.div>
            {/* Drawer with Bottom Animation */}
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        position: "fixed", // ✅ Keep drawer fixed
                        top: "9.7vh", // ✅ Align with navbar
                        left: 0,
                        right: 0,
                        width: "100vw", // ✅ Full width
                        maxWidth: "100vw", // ✅ Prevent extra space
                        bgcolor: "transparent",
                        boxShadow: "none",
                        p: 0, // ✅ Remove padding
                        overflowX: "hidden", // ✅ Prevent horizontal scrolling
                    },
                }}
            >
                <motion.div
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ width: "100%" }} // ✅ Make sure motion div covers full width
                >
                    <List sx={{ bgcolor: "rgba(128, 0, 0, 0.4)", pb: 0 }}> {/* Semi-transparent primary background */}
                        {[
                            { text: "About me", action: scrollToIntroduction },
                            { text: "Skills", action: scrollToSkills },
                            { text: "Portfolio", action: scrollToPortfolio },
                            {
                                text: "DOWNLOAD CV",
                                action: () => {
                                    const link = document.createElement("a");
                                    link.href = myCV; // Path to your CV file
                                    link.download = "paver-cv.pdf"; // Desired file name
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                },
                                special: true, // Mark this as a special item
                            },
                        ].map(({ text, action, special }) => (
                            <ListItem
                                button
                                key={text}
                                onClick={() => {
                                    action();
                                    setDrawerOpen(false);
                                }}
                                sx={{
                                    justifyContent: "center",
                                    bgcolor: special ? "secondary.main" : "transparent",
                                    "&:hover": special
                                        ? {
                                            bgcolor: "primary.main",
                                            transform: "scale(1.05)", // Slight scaling effect
                                            transition: "all 0.3s ease-in-out",
                                            "& .hover-text": { color: "secondary.main" },
                                        }
                                        : {},
                                    my: special ? 1 : 0, // Add margin for spacing
                                    py: 2 // Adjust padding
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    className="hover-text"
                                    sx={{
                                        textAlign: "center",
                                        fontWeight: special ? "bold" : "normal",
                                        textTransform: special ? "uppercase" : "none",
                                        color: special ? "primary.main" : "secondary.main",
                                    }}
                                >
                                    {text}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>



                </motion.div>
            </Drawer>



        </>
    );
};

export default Navbar;
