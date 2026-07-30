import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ProjectCategoryButtons from "./ProjectCategoryToggleButton";
import ProjectCard from "./ProjectCard";
import { font } from "./design/tokens";

const MotionBox = motion(Box);

const EASE = [0.22, 1, 0.36, 1];

// One rail step = the first card's width plus the flex gap, so autoplay and
// the position readout always advance exactly one card regardless of viewport.
const AUTOPLAY_MS = 10000;

const pad2 = (n) => String(n).padStart(2, "0");

/**
 * The work shelf: a full-bleed horizontal rail with scroll snap, drag to
 * scroll, prev/next arrows that walk a focus highlight from card to card
 * (centering whichever card holds it), a progress fill, and a gentle autoplay
 * that pauses whenever the pointer is on the shelf. Filtering stays exactly
 * as before — the rail only changes how the surviving cards are laid out.
 */
export default function ProjectsGrid({
  items = [],
  categoryValue = "All",
  onCategoryChange,
  categoryOptions = ["All", "UI/UX", "Web Development", "Mobile App", "Project Management"],
}) {
  // Hovering one card dims the rest, so the shelf reads as a single object
  // with one thing in focus instead of five competing posters.
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // Whichever card is resting nearest the middle of the viewport — it wears
  // the spotlight ring whenever nothing is hovered or arrow-focused.
  const [centerIndex, setCenterIndex] = useState(0);
  // The arrows (and arrow keys) carry a sticky focus: the focused card is
  // pulled to the middle of the viewport and takes the spotlight ring.
  const [focusedIndex, setFocusedIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  const railRef = useRef(null);
  const fillRef = useRef(null);
  const dragRef = useRef(null); // { x, left } while a drag is live
  const draggedRef = useRef(false); // set once a drag moves far enough to not be a click
  const holdRef = useRef(false); // pointer is on the shelf — autoplay waits
  const rafRef = useRef(0);

  const filteredItems = useMemo(() => {
    if (categoryValue === "All") return items;
    return items.filter((it) => (it.category ?? []).includes(categoryValue));
  }, [items, categoryValue]);

  const counts = useMemo(() => {
    const map = {};
    categoryOptions.forEach((opt) => {
      map[opt] =
        opt === "All"
          ? items.length
          : items.filter((it) => (it.category ?? []).includes(opt)).length;
    });
    return map;
  }, [items, categoryOptions]);

  const resultLabel =
    categoryValue === "All"
      ? `${filteredItems.length} project${filteredItems.length === 1 ? "" : "s"}`
      : `${filteredItems.length} of ${items.length} projects · ${categoryValue}`;

  const railStep = useCallback(() => {
    const el = railRef.current;
    const card = el?.firstElementChild;
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }, []);

  const measureRail = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 4 ? Math.max(0, Math.min(1, el.scrollLeft / max)) : 1;
    if (fillRef.current) fillRef.current.style.width = `${Math.round(p * 100)}%`;
    // The resting spotlight tracks whichever card's center is nearest the
    // middle of the viewport.
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
    let nearest = 0;
    let bestDist = Infinity;
    for (let i = 0; i < el.children.length; i += 1) {
      const r = el.children[i].getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestDist) {
        bestDist = d;
        nearest = i;
      }
    }
    setCenterIndex((prev) => (prev === nearest ? prev : nearest));
  }, []);

  const onRailScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      measureRail();
    });
  }, [measureRail]);

  // Scroll the rail so card i sits in the middle of the viewport. The side
  // padding makes every card's centered position a snap point, so the snap
  // holds it there once the scroll settles.
  const centerCard = useCallback(
    (i) => {
      const el = railRef.current;
      const card = el?.children[i];
      if (!el || !card) return;
      const railRect = el.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const target =
        el.scrollLeft + (cardRect.left - railRect.left) - (el.clientWidth - cardRect.width) / 2;
      const left = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, target));
      if (typeof el.scrollTo === "function") {
        el.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
      } else {
        el.scrollLeft = left;
      }
    },
    [reduceMotion]
  );

  // Prev/next walk the focus one card at a time, wrapping at the ends. The
  // first press starts from the card currently holding the center spotlight.
  const focusMove = useCallback(
    (dir) => {
      const count = filteredItems.length;
      if (!count) return;
      const base = focusedIndex ?? centerIndex;
      const next = (((base + dir) % count) + count) % count;
      setFocusedIndex(next);
      centerCard(next);
    },
    [filteredItems.length, focusedIndex, centerIndex, centerCard]
  );

  // Drag to scroll. Snap is lifted while dragging so the rail tracks the
  // hand 1:1, then restored on release so it settles onto a card. Touch is
  // excluded — the browser's own panning already does this better.
  const handleRailDown = (e) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    const el = railRef.current;
    if (!el) return;
    // Grabbing the shelf takes over from the arrows — the sticky focus lets
    // go, and the release handler brings the snap back.
    setFocusedIndex(null);
    dragRef.current = { x: e.clientX, left: el.scrollLeft };
    draggedRef.current = false;
    holdRef.current = true;
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  useEffect(() => {
    const onMove = (e) => {
      const drag = dragRef.current;
      const el = railRef.current;
      if (!drag || !el) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 5) draggedRef.current = true;
      el.scrollLeft = drag.left - dx;
    };
    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      holdRef.current = false;
      const el = railRef.current;
      if (el) {
        el.style.scrollSnapType = "x mandatory";
        el.style.cursor = "grab";
        el.style.userSelect = "";
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // A release at the end of a drag lands on a card link — swallow that click
  // so letting go of the shelf doesn't open a case study.
  const handleRailClickCapture = (e) => {
    if (!draggedRef.current) return;
    draggedRef.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // Autoplay: one card at a time, wrap at the end, and wait whenever the
  // visitor is reading (pointer on the shelf), navigating with the arrows
  // (a focused card stays centered), or the tab is hidden.
  useEffect(() => {
    if (reduceMotion || focusedIndex !== null) return undefined;
    const id = setInterval(() => {
      if (holdRef.current || document.hidden) return;
      const el = railRef.current;
      if (!el || !el.isConnected) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max < 8) return;
      const step = railStep() || 320;
      // The last card's centered snap position can sit a few px short of
      // max (scrollbar width), so "on the last card" is anything within
      // half a step of the end — then wrap back to the start.
      const next = max - el.scrollLeft < step / 2 ? 0 : Math.min(max, el.scrollLeft + step);
      if (typeof el.scrollTo === "function") {
        el.scrollTo({ left: next, behavior: "smooth" });
      } else {
        el.scrollLeft = next;
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduceMotion, railStep, focusedIndex]);

  // A new filter deserves a fresh shelf.
  useEffect(() => {
    setFocusedIndex(null);
    const el = railRef.current;
    if (el) {
      if (typeof el.scrollTo === "function") el.scrollTo({ left: 0 });
      else el.scrollLeft = 0;
    }
    const raf = requestAnimationFrame(measureRail);
    return () => cancelAnimationFrame(raf);
  }, [categoryValue, measureRail]);

  useEffect(() => {
    window.addEventListener("resize", onRailScroll);
    return () => window.removeEventListener("resize", onRailScroll);
  }, [onRailScroll]);

  const shownNumber =
    focusedIndex !== null
      ? focusedIndex + 1
      : Math.min(centerIndex + 1, Math.max(filteredItems.length, 1));
  const countLabel = `${pad2(shownNumber)} / ${pad2(filteredItems.length)}${
    categoryValue === "All" ? "" : ` · ${categoryValue}`
  }`;

  const arrowSx = {
    width: 46,
    height: 46,
    display: "grid",
    placeItems: "center",
    background: "transparent",
    border: "1px solid rgba(0,0,0,.2)",
    color: "#14161A",
    fontSize: 16,
    cursor: "pointer",
    transition: "background .28s ease, color .28s ease, border-color .28s ease",
    "&:hover": { bgcolor: "#14161A", borderColor: "#14161A", color: "#F4EFE8" },
    "&:focus-visible": { outline: "2px solid #FD6F00", outlineOffset: 2 },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", px: { xs: 0, sm: 2 } }}>
        <ProjectCategoryButtons
          value={categoryValue}
          onChange={(val) => onCategoryChange?.(val)}
          options={categoryOptions}
          counts={counts}
        />
      </Box>

      {/* Shelf controls: the live result counter on the left, the rail's
          position, autoplay state and arrows on the right. */}
      <Box
        sx={{
          mt: 2.5,
          display: "flex",
          flexWrap: "wrap",
          gap: "16px 22px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          role="status"
          aria-live="polite"
          aria-label={resultLabel}
          sx={{ display: "inline-flex" }}
        >
          <Box
            aria-hidden
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.9,
              px: 1.6,
              py: 0.6,
              borderRadius: "999px",
              border: "1px solid rgba(253,111,0,0.2)",
              bgcolor: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "0 2px 10px rgba(24,18,12,0.05)",
            }}
          >
            <Box
              component={motion.span}
              animate={{ scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "primary.main",
                flexShrink: 0,
              }}
            />
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "baseline",
                gap: 0.5,
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.03em",
                color: "rgba(0,0,0,0.6)",
              }}
            >
              <Box sx={{ display: "inline-block", overflow: "hidden", height: "1.25em" }}>
                <AnimatePresence mode="wait" initial={false}>
                  <Box
                    key={filteredItems.length}
                    component={motion.span}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                    sx={{
                      display: "inline-block",
                      fontWeight: 700,
                      color: "primary.main",
                      lineHeight: 1.25,
                    }}
                  >
                    {filteredItems.length}
                  </Box>
                </AnimatePresence>
              </Box>
              <Box component="span">
                {categoryValue === "All"
                  ? `project${filteredItems.length === 1 ? "" : "s"}`
                  : `of ${items.length} projects · ${categoryValue}`}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Box
            component="span"
            sx={{
              fontFamily: font.mono,
              fontSize: "10.5px",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "#918B82",
              whiteSpace: "nowrap",
            }}
          >
            {countLabel}
          </Box>

          {!reduceMotion && (
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                fontFamily: font.mono,
                fontSize: "9.5px",
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "#A39C92",
                whiteSpace: "nowrap",
              }}
            >
              <Box
                component="span"
                aria-hidden
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  bgcolor: "#FD6F00",
                  animation: "jp-pulse 2.4s infinite",
                }}
              />
              Auto
            </Box>
          )}

          <Box sx={{ display: "flex", gap: "8px" }}>
            <Box component="button" type="button" aria-label="Focus previous project" onClick={() => focusMove(-1)} sx={arrowSx}>
              ←
            </Box>
            <Box component="button" type="button" aria-label="Focus next project" onClick={() => focusMove(1)} sx={arrowSx}>
              →
            </Box>
          </Box>
        </Box>
      </Box>

      {/* The rail. Full-bleed out of the page shell, with side padding of
          half a viewport minus half a card so every card — first and last
          included — has a snap position at the exact center of the screen.
          Extra top padding gives the cards' overhanging scene chips room
          inside the scroll clip. */}
      {filteredItems.length > 0 && (
        <Box
          ref={railRef}
          onScroll={onRailScroll}
          onPointerDown={handleRailDown}
          // The cards are links, so pressing-and-moving on one starts the
          // browser's native link drag, which steals the pointer mid-gesture
          // and the shelf never scrolls. The shelf owns dragging here.
          onDragStart={(e) => e.preventDefault()}
          onPointerEnter={() => {
            holdRef.current = true;
          }}
          onPointerLeave={() => {
            if (!dragRef.current) holdRef.current = false;
            setHoveredIndex(null);
          }}
          onClickCapture={handleRailClickCapture}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              focusMove(e.key === "ArrowRight" ? 1 : -1);
            } else if (e.key === "Escape" && focusedIndex !== null) {
              setFocusedIndex(null);
            }
          }}
          tabIndex={0}
          aria-label="Projects shelf — arrow keys move focus between projects"
          sx={{
            mt: "20px",
            ml: "calc(50% - 50vw)",
            mr: "calc(50% - 50vw)",
            display: "flex",
            gap: "clamp(26px, 3vw, 46px)",
            overflowX: "auto",
            overscrollBehaviorX: "contain",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { height: 0, width: 0 },
            cursor: "grab",
            p: "22px calc(50vw - clamp(128px, 37vw, 172px)) 18px",
            "& > *": {
              flex: "0 0 clamp(256px, 74vw, 344px)",
              scrollSnapAlign: "center",
            },
            "&:focus-visible": { outline: "2px solid #FD6F00", outlineOffset: "-2px" },
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project, i) => {
              // Exactly one card wears the spotlight ring: a live hover
              // first, then the arrows' sticky focus, otherwise whichever
              // card is resting at the center. Only a hover fades the rest.
              const spotlight = hoveredIndex ?? focusedIndex ?? centerIndex;
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={i}
                  activeCategory={categoryValue}
                  dimmed={hoveredIndex !== null && hoveredIndex !== i}
                  focused={spotlight === i}
                  onHoverChange={setHoveredIndex}
                />
              );
            })}
          </AnimatePresence>
        </Box>
      )}

      {/* Scroll progress, filling as the shelf is explored */}
      {filteredItems.length > 0 && (
        <Box aria-hidden sx={{ height: "2px", bgcolor: "rgba(0,0,0,.1)" }}>
          <Box
            ref={fillRef}
            sx={{ height: "100%", width: 0, bgcolor: "#14161A", transition: "width .25s ease" }}
          />
        </Box>
      )}

      <AnimatePresence>
        {filteredItems.length === 0 && (
          <MotionBox
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              py: { xs: 6, md: 9 },
              borderRadius: 3,
              border: "1px dashed rgba(253,111,0,0.28)",
              bgcolor: "rgba(255,255,255,0.45)",
            }}
          >
            <SearchOffIcon sx={{ fontSize: 34, color: "rgba(0,0,0,0.25)" }} />
            <Typography sx={{ fontWeight: 600, color: "rgba(0,0,0,0.7)" }}>
              Nothing here yet
            </Typography>
            <Typography sx={{ fontSize: "0.82rem", color: "rgba(0,0,0,0.5)" }}>
              No projects tagged “{categoryValue}”.
            </Typography>
            <Box
              component="button"
              type="button"
              onClick={() => onCategoryChange?.("All")}
              sx={{
                mt: 1,
                px: 2,
                py: 0.8,
                borderRadius: "999px",
                border: "1px solid rgba(253,111,0,0.35)",
                bgcolor: "rgba(253,111,0,0.06)",
                color: "primary.main",
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 200ms ease",
                "&:hover": { bgcolor: "rgba(253,111,0,0.12)" },
              }}
            >
              Show all projects
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
