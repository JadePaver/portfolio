import { useEffect, useRef, useState } from "react";
import {
  Button,
  Drawer,
  Typography,
  Box,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import NavButton from "../components/NavButton";

const MotionStack = motion(Stack);
const MotionBox = motion(Box);

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const iconContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.4, staggerChildren: 0.15 } },
  };

  const iconItem = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.15,
      y: -2,
      transition: { type: "spring", stiffness: 500, damping: 18 },
    },
    press: {
      scale: 0.98,
      y: 0,
      transition: { type: "spring", stiffness: 600, damping: 20 },
    },
  };

  const [hideHeader, setHideHeader] = useState(false);
  const lastYRef = useRef(0);
  const pendingRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      if (pendingRef.current !== null) return;
      pendingRef.current = requestAnimationFrame(() => {
        const delta = y - lastYRef.current;
        if (delta > 4 && y > 80) {
          setHideHeader(true);
        } else if (delta < -4) {
          setHideHeader(false);
        }
        lastYRef.current = y;
        pendingRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (pendingRef.current) cancelAnimationFrame(pendingRef.current);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* HEADER */}
      <MotionBox
        animate={{ y: hideHeader ? -140 : 0, opacity: hideHeader ? 0.96 : 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        sx={{
          position: "fixed",
          top: { xs: 0, sm: 20 },
          left: 0,
          right: 0,
          zIndex: 1201,
          display: "flex",
          alignItems: "center",
          height: 64,
          willChange: "transform, opacity",
          pointerEvents: hideHeader ? "none" : "auto",
          bgcolor: "white",
          boxShadow: { xs: "0px 2px 8px rgba(0,0,0,0.08)", sm: "none" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginX: { xs: "0", sm: "10vw" },
          }}
        >
          {/* Logo — left */}
          <Box
            component={motion.button}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial="rest"
            whileHover="hover"
            sx={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/portfolio_logo.svg`}
              alt="Portfolio Logo Background"
              width={110}
              height={110}
              style={{
                position: "absolute",
                filter: "brightness(0.3) contrast(2) saturate(0)",
                zIndex: 1,
              }}
            />
            <motion.img
              src={`${process.env.PUBLIC_URL}/images/portfolio_logo.svg`}
              alt="Portfolio Logo"
              width={110}
              height={110}
              variants={{
                rest: { scale: 1, x: 0, y: 0, filter: "brightness(1) contrast(1)" },
                hover: {
                  scale: 1.02,
                  x: -2,
                  y: -3,
                  filter: "brightness(1.05) contrast(1.1)",
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
              style={{ position: "relative", zIndex: 2, transformOrigin: "center center" }}
            />
          </Box>

          {/* Desktop Navigation — absolutely centered */}
          {!isXs && (
            <>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              >
                <NavButton onClick={() => scrollTo("section-hero")}>Home</NavButton>
                <NavButton onClick={() => scrollTo("section-about")}>About Me</NavButton>
                <NavButton onClick={() => scrollTo("section-services")}>Services</NavButton>
                <NavButton onClick={() => scrollTo("section-projects")}>Projects</NavButton>
                <NavButton onClick={() => scrollTo("section-contact")}>Contact</NavButton>
              </Stack>

              {/* Download CV button — right */}
              <Box sx={{ marginLeft: "auto", zIndex: 2 }}>
                <motion.div
                  style={{ display: "flex", alignItems: "center" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 600, damping: 22 }}
                >
                  <Button
                    disableElevation
                    component="a"
                    href={`${process.env.PUBLIC_URL}/paver_cv.pdf`}
                    download
                    variant="contained"
                    sx={{
                      color: "white",
                      fontFamily: "Poppins, sans-serif",
                      p: "0.75rem 1rem",
                      letterSpacing: "2px",
                      boxShadow: "0px 6px 16px rgba(0,0,0,0.14)",
                      "&:hover": { boxShadow: "0px 10px 22px rgba(0,0,0,0.18)" },
                    }}
                  >
                    Download CV
                  </Button>
                </motion.div>
              </Box>
            </>
          )}

          {/* Mobile Menu Icon */}
          {isXs && (
            <IconButton
              onClick={toggleDrawer}
              sx={{
                color: "#FD6F00",
                bgcolor: "transparent",
                marginLeft: "auto",
                "&:hover": { bgcolor: "rgba(253, 111, 0, 0.08)" },
              }}
            >
              {open ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </IconButton>
          )}
        </Box>
      </MotionBox>

      {/* MOBILE TOP DRAWER */}
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            bgcolor: "white",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
            top: 82.5,
            height: "auto",
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
            gap: 2.5,
          }}
        >
          {[
            { label: "Home", section: "section-hero" },
            { label: "About Me", section: "section-about" },
            { label: "Services", section: "section-services" },
            { label: "Projects", section: "section-projects" },
            { label: "Contact", section: "section-contact" },
          ].map(({ label, section }) => (
            <Typography
              key={label}
              variant="h6"
              sx={{
                color: "#FD6F00",
                fontFamily: "Poppins, sans-serif",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { opacity: 0.8 },
                py: 1,
                px: 4,
                width: "100%",
                textAlign: "center",
              }}
              onClick={() => scrollTo(section)}
            >
              {label}
            </Typography>
          ))}
        </Box>

        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            disableElevation
            component="a"
            href={`${process.env.PUBLIC_URL}/paver_cv.pdf`}
            download
            variant="contained"
            sx={{
              bgcolor: "#FD6F00",
              color: "white",
              fontFamily: "Poppins, sans-serif",
              py: 2,
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "2px",
              "&:hover": { bgcolor: "#e56300" },
            }}
            onClick={() => setOpen(false)}
          >
            DOWNLOAD CV
          </Button>
        </Box>
      </Drawer>

      {/* PAGE CONTENT */}
      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 0, sm: 3 },
          mt: { xs: 12, sm: 8 },
          backgroundColor: "#ffffff",
          width: "100%",
        }}
      >
        <Outlet />
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          bgcolor: "#F8F8F8",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/portfolio_logo.svg`}
          alt="Portfolio Logo"
          sx={{
            width: { xs: 190, lg: 150 },
            height: { xs: 100, lg: 150 },
            pt: { xs: "1rem", lg: "4rem" },
            pb: { xs: "0rem", lg: "2rem" },
          }}
        />

        {/* Footer links */}
        <Stack
          direction="row"
          spacing={3}
          sx={{ pt: { xs: 2, lg: 4 }, alignItems: "center" }}
        >
          {[
            { label: "Home", section: "section-hero" },
            { label: "About Me", section: "section-about" },
            { label: "Services", section: "section-services" },
            { label: "Projects", section: "section-projects" },
            { label: "Contact", section: "section-contact" },
          ].map(({ label, section }) => (
            <Typography
              key={label}
              variant="body1"
              align="center"
              color="black"
              sx={{
                cursor: "pointer",
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
              onClick={() => scrollTo(section)}
            >
              {label}
            </Typography>
          ))}
        </Stack>

        {/* Animated social icons */}
        <MotionStack
          direction="row"
          spacing={3}
          sx={{ justifyContent: "center", my: { xs: 0, lg: 4 }, mt: { xs: 4, lg: 0 } }}
          variants={iconContainer}
          initial="hidden"
          animate="visible"
        >
          {[
            { src: `${process.env.PUBLIC_URL}/logos/facebook.svg`, url: "https://www.facebook.com/jade.paver.5" },
            { src: `${process.env.PUBLIC_URL}/logos/twitter.svg`, url: "https://www.facebook.com/jade.paver.5" },
            { src: `${process.env.PUBLIC_URL}/logos/instagram.svg`, url: "https://www.facebook.com/jade.paver.5" },
            { src: `${process.env.PUBLIC_URL}/logos/linkedin.svg`, url: "https://www.linkedin.com/in/jade-paver-a6073a280/" },
          ].map(({ src, url }) => (
            <Box
              key={src}
              component={motion.img}
              src={src}
              variants={iconItem}
              initial="initial"
              whileHover="hover"
              whileTap="press"
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
              sx={{
                display: "block",
                cursor: "pointer",
                width: { xs: 24, sm: 32 },
                height: { xs: 24, sm: 32 },
              }}
            />
          ))}
        </MotionStack>

        {/* Bottom bar */}
        <Box sx={{ width: "100%", bgcolor: "#545454", mt: 4 }}>
          <Typography variant="body2" align="center" color="white" py={2}>
            @2025 <span style={{ color: "#FD6F00" }}>Paver</span> All Right Reserved, Inc.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
