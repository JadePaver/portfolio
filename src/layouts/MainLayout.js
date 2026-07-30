import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import ScrollProgress from "../components/design/ScrollProgress";
import CursorFx from "../components/design/CursorFx";
import SectionRail from "../components/design/SectionRail";
import Wordmark from "../components/design/Wordmark";
import HeaderCta from "../components/design/HeaderCta";
import { color, font, shell, EASE_CSS } from "../components/design/tokens";
import { dailyStack, navItems, sections, site } from "../components/design/site";

/**
 * Dark shell for the landing page: progress bar, cursor, header, section rail
 * and footer. Case-study routes render outside this layout and keep the light
 * MUI theme, so nothing here leaks into them.
 */
export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [stripOpen, setStripOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const [hoveredId, setHoveredId] = useState(null);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, on: false });
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const navRef = useRef(null);
  const navLinkRefs = useRef({});

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // One scroll listener drives both the header's solid state and the rail's
  // current section. A section counts as current once its top passes 42% of
  // the viewport, which is where the eye actually sits while reading.
  useEffect(() => {
    let queued = false;

    const measure = () => {
      queued = false;
      const y = window.scrollY || window.pageYOffset || 0;
      setScrolled(y > 26);
      // Two more thresholds: the bar tightens once you commit to scrolling, and
      // the stack strip only unrolls once the hero is well behind you.
      setCondensed(y > 90);
      setStripOpen(y > 240);

      let current = sections[0].id;
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.42) {
          current = id;
        }
      });
      setActiveId(current);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The nav underline follows whichever link is hovered and falls back to the
  // section you are actually in. Measured rather than derived, so it survives
  // the header tightening, a font swap, or a resize.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const target = navLinkRefs.current[hoveredId ?? activeId];
    if (!isDesktop || !nav || !target) {
      setIndicator((prev) => (prev.on ? { ...prev, on: false } : prev));
      return;
    }
    const navBox = nav.getBoundingClientRect();
    const linkBox = target.getBoundingClientRect();
    setIndicator({ x: linkBox.left - navBox.left, w: linkBox.width, on: true });
  }, [activeId, hoveredId, isDesktop, condensed]);

  // A full-screen menu that stays open behind a scrolling page is a trap.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const navLinkSx = {
    fontFamily: font.sans,
    fontSize: "13.5px",
    fontWeight: 500,
    color: "#C9C6C2",
    background: "transparent",
    border: 0,
    p: 0,
    cursor: "pointer",
    transition: "color .2s ease",
    "&:hover": { color: color.accent },
    "&:focus-visible": { outline: `2px solid ${color.accent}`, outlineOffset: 4 },
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        bgcolor: color.bg,
        color: color.text,
        fontFamily: font.sans,
        background: `radial-gradient(1200px 700px at 78% -6%, rgba(255,106,26,.14), transparent 62%), ${color.bg}`,
      }}
    >
      <ScrollProgress />
      <CursorFx />

      {/* HEADER */}
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: "2px",
          left: 0,
          right: 0,
          zIndex: 80,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${scrolled ? color.lineSoft : "rgba(255,255,255,0)"}`,
          bgcolor: scrolled ? "rgba(11,12,14,.88)" : "rgba(11,12,14,0)",
          transition: "background .35s ease, border-color .35s ease",
        }}
      >
        <Box
          sx={{
            ...shell,
            py: condensed ? "8px" : "13px",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            transition: `padding .45s ${EASE_CSS}`,
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => scrollTo("top")}
            aria-label="Back to top"
            sx={{
              display: "flex",
              alignItems: "center",
              flex: "0 0 auto",
              background: "transparent",
              border: 0,
              p: 0,
              cursor: "pointer",
              "&:focus-visible": { outline: `2px solid ${color.accent}`, outlineOffset: 4 },
            }}
          >
            <Wordmark size="lg" />
          </Box>

          {isDesktop ? (
            <Box
              ref={navRef}
              component="nav"
              aria-label="Primary"
              sx={{ position: "relative", display: "flex", alignItems: "center", gap: "26px", ml: "auto" }}
            >
              {navItems.map(({ id, nav }) => (
                <Box
                  key={id}
                  ref={(node) => {
                    navLinkRefs.current[id] = node;
                  }}
                  component="button"
                  type="button"
                  onClick={() => scrollTo(id)}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId((prev) => (prev === id ? null : prev))}
                  aria-current={activeId === id ? "true" : undefined}
                  sx={{
                    ...navLinkSx,
                    color: activeId === id || hoveredId === id ? color.accent : navLinkSx.color,
                  }}
                >
                  {nav}
                </Box>
              ))}

              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: "5px",
                  height: "2px",
                  borderRadius: "2px",
                  bgcolor: color.accent,
                  pointerEvents: "none",
                  width: `${indicator.w}px`,
                  transform: `translateX(${indicator.x}px)`,
                  opacity: indicator.on ? 1 : 0,
                  transition: `transform .42s ${EASE_CSS}, width .42s ${EASE_CSS}, opacity .28s ease`,
                }}
              />

              <Box
                component="a"
                href={site.cvHref}
                download
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: font.mono,
                  fontSize: "11px",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: color.text,
                  textDecoration: "none",
                  border: `1px solid rgba(255,255,255,.16)`,
                  borderRadius: "8px",
                  p: "9px 14px",
                  whiteSpace: "nowrap",
                  transition: "border-color .25s, color .25s, background .25s",
                  "&:hover": { borderColor: color.accent, color: color.accent },
                  "&:hover [data-cv-arrow]": { transform: "translateY(3px)" },
                }}
              >
                <Box component="span">Download CV</Box>
                <Box
                  component="span"
                  data-cv-arrow
                  aria-hidden
                  sx={{
                    display: "block",
                    fontSize: "11px",
                    lineHeight: 1,
                    transition: `transform .32s ${EASE_CSS}`,
                  }}
                >
                  ↓
                </Box>
              </Box>

              <HeaderCta href={`mailto:${site.email}`} />
            </Box>
          ) : (
            <Box
              component="button"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              sx={{
                ml: "auto",
                background: "transparent",
                border: "1px solid rgba(255,255,255,.16)",
                borderRadius: "8px",
                p: "10px 13px",
                color: color.text,
                fontFamily: font.mono,
                fontSize: "11px",
                letterSpacing: ".14em",
                cursor: "pointer",
              }}
            >
              MENU
            </Box>
          )}
        </Box>

        {/* Daily stack — unrolls once the hero is behind you, so the bar keeps
            saying something useful after the headline has scrolled away. */}
        {isDesktop && (
          <Box
            aria-hidden={!stripOpen}
            sx={{
              maxHeight: stripOpen ? "46px" : 0,
              opacity: stripOpen ? 1 : 0,
              overflow: "hidden",
              borderTop: `1px solid ${stripOpen ? color.lineSoft : "rgba(255,255,255,0)"}`,
              transition: `max-height .55s ${EASE_CSS}, opacity .35s ease, border-color .35s ease`,
            }}
          >
            <Box sx={{ ...shell, py: "9px", display: "flex", alignItems: "center", gap: "14px" }}>
              <Box
                component="span"
                sx={{
                  fontFamily: font.mono,
                  fontSize: "9px",
                  letterSpacing: ".2em",
                  color: color.ghost,
                  flex: "0 0 auto",
                }}
              >
                DAILY STACK
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: "7px", overflow: "hidden" }}>
                {dailyStack.map((tool, i) => (
                  <Box
                    key={tool}
                    component="button"
                    type="button"
                    onClick={() => scrollTo("about")}
                    sx={{
                      fontFamily: font.mono,
                      fontSize: "10px",
                      letterSpacing: ".04em",
                      color: "#C9C6C2",
                      border: "1px solid rgba(255,255,255,.1)",
                      bgcolor: "rgba(255,255,255,.03)",
                      borderRadius: "6px",
                      p: "4px 8px",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      // Staggered so the row deals itself out rather than
                      // appearing all at once.
                      opacity: stripOpen ? 1 : 0,
                      transform: stripOpen ? "translateY(0)" : "translateY(8px)",
                      transitionProperty: "transform, opacity, border-color, color",
                      transitionDuration: ".45s, .4s, .25s, .25s",
                      transitionTimingFunction: `${EASE_CSS}, ease, ease, ease`,
                      transitionDelay: `${stripOpen ? i * 45 : 0}ms`,
                      "&:hover": { color: color.accent, borderColor: "rgba(255,106,26,.5)" },
                    }}
                  >
                    {tool}
                  </Box>
                ))}
              </Box>

              <Box
                component="button"
                type="button"
                onClick={() => scrollTo("contact")}
                sx={{
                  ml: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  fontFamily: font.mono,
                  fontSize: "9.5px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#9A9C9F",
                  background: "transparent",
                  border: 0,
                  p: 0,
                  flex: "0 0 auto",
                  cursor: "pointer",
                  transition: "color .25s ease",
                  "&:hover": { color: color.accent },
                }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    display: "block",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    bgcolor: color.accent,
                    animation: "jp-pulse 2.4s infinite",
                  }}
                />
                {site.openToWork
                  ? "Open to roles — start the conversation"
                  : "Booked, still planning ahead — say hello"}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* MOBILE MENU */}
      {menuOpen && (
        <Box
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 85,
            bgcolor: "rgba(11,12,14,.97)",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "32px 26px",
            gap: "6px",
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => setMenuOpen(false)}
            sx={{
              position: "absolute",
              top: "15px",
              right: "22px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,.16)",
              borderRadius: "8px",
              p: "10px 13px",
              color: color.text,
              fontFamily: font.mono,
              fontSize: "11px",
              letterSpacing: ".14em",
              cursor: "pointer",
            }}
          >
            CLOSE
          </Box>

          {navItems.map(({ id, nav }) => (
            <Box
              key={id}
              component="button"
              type="button"
              onClick={() => scrollTo(id)}
              sx={{
                fontFamily: font.sans,
                fontSize: "34px",
                fontWeight: 700,
                letterSpacing: "-.03em",
                color: id === "contact" ? color.accent : color.title,
                background: "transparent",
                border: 0,
                p: "9px 0",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {nav}
            </Box>
          ))}

          <Box
            component="a"
            href={`mailto:${site.email}`}
            sx={{
              mt: "22px",
              fontFamily: font.mono,
              fontSize: "12px",
              letterSpacing: ".14em",
              color: color.dim,
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            {site.email}
          </Box>
        </Box>
      )}

      <SectionRail sections={sections} activeId={activeId} onSelect={scrollTo} />

      <Box component="main">
        <Outlet />
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          borderTop: `1px solid ${color.lineSoft}`,
          bgcolor: color.bgAlt,
          p: "40px 0 30px",
        }}
      >
        <Box
          sx={{
            ...shell,
            display: "flex",
            flexWrap: "wrap",
            gap: "26px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => scrollTo("top")}
            aria-label="Back to top"
            sx={{
              display: "flex",
              alignItems: "center",
              background: "transparent",
              border: 0,
              p: 0,
              cursor: "pointer",
            }}
          >
            <Wordmark size="sm" />
          </Box>

          <Box component="nav" sx={{ display: "flex", flexWrap: "wrap", gap: "22px" }}>
            {navItems.map(({ id, nav }) => (
              <Box
                key={id}
                component="button"
                type="button"
                onClick={() => scrollTo(id)}
                sx={{
                  fontFamily: font.mono,
                  fontSize: "10.5px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: color.dim,
                  background: "transparent",
                  border: 0,
                  p: 0,
                  cursor: "pointer",
                  transition: "color .2s ease",
                  "&:hover": { color: color.accent },
                }}
              >
                {nav}
              </Box>
            ))}
          </Box>

          <Box
            component="p"
            sx={{
              m: 0,
              fontFamily: font.mono,
              fontSize: "10.5px",
              letterSpacing: ".14em",
              color: color.ghost,
            }}
          >
            © {new Date().getFullYear()}{" "}
            <Box component="span" sx={{ color: color.accent }}>
              JADE N. PAVER
            </Box>{" "}
            · ALL RIGHTS RESERVED
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
