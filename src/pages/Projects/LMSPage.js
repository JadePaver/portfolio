import ProjectLayout from "../../layouts/ProjectLayout";
import { Typography, Box, Stack, Chip } from "@mui/material";
import { SlideInImage } from "../../components/SlideInImage";
import { TypewriterText } from "../../components/TypewriterText";
import {
  TechIconTooltip,
  SectionHeading,
  projectTechIconVariants as visibleIconVariants,
  projectTechImgVariants as visibleImgVariants,
} from "../../components/ProjectPageHelpers";

export default function LMSPage() {
  return (
    <ProjectLayout title="LMS">
      {/* Hero Image */}
      <SlideInImage
        eager
        src={`${process.env.PUBLIC_URL}/images/lms1.png`}
        alt="LMS assessment workspace"
        containerSx={{
          borderRadius: 3,
          mb: 0,
          bgcolor: "grey.50",
          boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
        }}
        imgSx={{ maxHeight: "60vh", objectFit: "contain", mx: "auto" }}
      />

      {/* Project Title */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 800,
          fontSize: { xs: "2rem", lg: "3rem" },
          lineHeight: 1.1,
          mt: 4,
          mb: 0.5,
          color: "text.primary",
        }}
      >
        LMS
      </Typography>

      {/* Meta row: categories, tech icons, date */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          mt: 1.5,
          pb: 3,
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {["UI/UX", "Web Development", "Full Stack"].map((cat) => (
          <Chip
            key={cat}
            label={cat}
            size="small"
            sx={{
              bgcolor: "rgba(253,111,0,0.08)",
              color: "primary.main",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "0.72rem",
              border: "1px solid rgba(253,111,0,0.2)",
              height: 26,
            }}
          />
        ))}

        <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "rgba(0,0,0,0.15)", mx: 0.5 }} />

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <TechIconTooltip label="React" iconFile="react.svg" alt="react" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="TypeScript" iconFile="typescript.svg" alt="typescript" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="Node JS" iconFile="nodejs.svg" alt="nodejs" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
        </Stack>

        <Typography
          variant="caption"
          sx={{
            ml: "auto",
            color: "text.secondary",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "0.72rem", lg: "0.82rem" },
          }}
        >
          January 16, 2025
        </Typography>
      </Box>

      {/* Intro */}
      <TypewriterText
        highlightFirstWord
        text={`LMS is a coding education platform I designed and built around two roles. Instructors publish modules and grade real code submissions. Students read through the lessons, then prove what they know in the workspace shown above, where the brief, the API contract, and a starter file sit beside a live editor. They run their code against the module's tests in the browser and submit once it passes.`}
        sx={{ pt: 4, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Context / Problem */}
      <SectionHeading text="Context / Problem" />
      <Box
        sx={{
          mt: 1.5,
          pl: 1.5,
          borderLeft: "3px solid rgba(253,111,0,0.22)",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <TypewriterText startBullet text={`On most course sites the lesson and the practice live in different places. A student reads about a concept, then has to open a separate tool to actually write and test the code. I wanted the reading and the coding to happen in the same window.`} sx={{ pt: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Instructors need more than a place to post videos. They need to publish an assessment with a starter file, a clear brief, and an API reference, then see who passed without grading every attempt by hand.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Students and instructors look at the same modules but want different controls. A student browsing by track wants a clean catalog with no admin buttons. An instructor running a shelf of live modules wants to edit, publish, and open submissions without leaving the list.`} sx={{ pb: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
      </Box>

      {/* Image 2: module catalog */}
      <Box sx={{ mt: 6 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/lms2.png`}
          alt="LMS module catalog"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
        />
      </Box>
      <TypewriterText
        text={`The catalog holds eighteen modules across six tracks: React, Node.js, JavaScript, Database, ORM, and BMS. Each track filter shows its own count, and every card states its scope before a student opens it, from the number of lessons and assessments down to who wrote it.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 3: module detail */}
      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/lms3.png`}
          alt="LMS module detail with lessons and assessments"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
        />
      </Box>
      <TypewriterText
        text={`Open a module and it reads like a syllabus. The lessons run down the left in order, from the introduction to the common mistakes at the end. The graded challenges sit on the right, each tagged easy, medium, or hard, so a student can pick what to read or what to attempt next.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 4: instructor console */}
      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/lms4.png`}
          alt="LMS instructor console"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
        />
      </Box>
      <TypewriterText
        text={`The instructor console puts the review backlog at the top, so the first thing an instructor sees is how many submissions are waiting. Every module shows its publish state, its track, and its lesson and assessment counts, with manage, grade, edit, unpublish, and delete all sitting on the same row.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 5: grading & review */}
      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/lms5.png`}
          alt="LMS grading and review screen"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
        />
      </Box>
      <TypewriterText
        text={`On the review screen, every submission for a module rolls up into four counts: total, pending, passed, and failed. An instructor can filter by outcome, narrow to one assessment, and search by student name or email, then open any attempt inline to read the exact code that was turned in.`}
        sx={{ pt: 3, pb: 10, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />
    </ProjectLayout>
  );
}
