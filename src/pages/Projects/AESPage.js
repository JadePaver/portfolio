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

export default function AESPage() {
  return (
    <ProjectLayout title="AES — Advanced Educational Smart System">
      {/* Hero Image */}
      <SlideInImage
        eager
        src={`${process.env.PUBLIC_URL}/images/aes1.png`}
        alt="aes image1"
        containerSx={{ borderRadius: 3, mb: 0, bgcolor: "grey.50", boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        imgSx={{ maxHeight: "60vh", objectFit: "contain", mx: "auto" }}
      />

      {/* Project Title */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 800,
          fontSize: { xs: "1.6rem", lg: "2.4rem" },
          lineHeight: 1.15,
          mt: 4,
          mb: 0.5,
          color: "text.primary",
        }}
      >
        AES — Advanced Educational Smart System
      </Typography>

      {/* Meta row */}
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1.5, pb: 3, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        {["UI/UX", "Web Development", "Project Management"].map((cat) => (
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
          <TechIconTooltip label="MUI" iconFile="mui.svg" alt="mui" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="React" iconFile="react.svg" alt="react" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="Node JS" iconFile="nodejs.svg" alt="nodejs" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="TypeScript" iconFile="typescript.svg" alt="typescript" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
        </Stack>
        <Typography variant="caption" sx={{ ml: "auto", color: "text.secondary", fontFamily: "Poppins, sans-serif", fontSize: { xs: "0.72rem", lg: "0.82rem" } }}>
          January 16, 2025
        </Typography>
      </Box>

      {/* Intro */}
      <TypewriterText
        highlightFirstWord
        text={`Advance Educational Smart System is an online learning platform designed for university use, supporting multiple roles such as students, teachers, administrators, and guardians. It centralizes academic content, classroom workflows, and enrollment processes into one system to make learning management more organized, accessible, and efficient.`}
        sx={{ pt: 4, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Context / Problem */}
      <SectionHeading text="Context / Problem" />
      <Box sx={{ mt: 1.5, pl: 1.5, borderLeft: "3px solid rgba(253,111,0,0.22)", display: "flex", flexDirection: "column", gap: 0.5 }}>
        <TypewriterText startBullet text={`Learning materials, modules, and assessments were not stored in a single structured platform, making access and tracking inconsistent.`} sx={{ pt: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Classroom and subject management required too much manual coordination and repeated data entry.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Enrollment workflows were time-consuming and prone to errors when handled through fragmented tools or paperwork.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Stakeholders like guardians had limited visibility into student progress and academic activities.`} sx={{ pb: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
      </Box>

      <Box sx={{ mt: 6 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/aes2.png`}
          alt="aes image2"
          containerSx={{ borderRadius: 3, mb: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        />
      </Box>
      <TypewriterText
        text={`Users can sign in based on their role as student, teacher, admin, or guardian, ensuring each user sees only the tools and information relevant to them. This improves security, simplifies navigation, and supports clear responsibilities across the university workflow.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/aes3.png`}
          alt="aes image3"
          containerSx={{ borderRadius: 3, mb: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        />
      </Box>
      <TypewriterText
        text={`The platform supports online creation and storage of lessons, modules, and assessments for teachers, while giving students easy access to learning content anytime. This enables consistent learning delivery, centralized content management, and better organization of course requirements.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/aes4.png`}
          alt="aes image4"
          containerSx={{ borderRadius: 3, mb: 0, bgcolor: "grey.50", boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
          imgSx={{ maxHeight: "55vh", objectFit: "contain", mx: "auto" }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/aes5.png`}
          alt="aes image5"
          containerSx={{ borderRadius: 3, mb: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        />
      </Box>
      <TypewriterText
        text={`The system includes a highly customizable assessment maker that allows teachers to build exams, quizzes, and activities based on their subject requirements and grading rules. Teachers can compose assessments using multiple question formats, configure points and scoring per item, set time limits and availability windows, and control retake policies and submission rules. It also supports organizing assessments by module or lesson, making it easier to align evaluations with course pacing, while keeping student submissions and results structured for faster checking and more reliable progress tracking.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/aes6.png`}
          alt="aes image6"
          containerSx={{ borderRadius: 3, mb: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        />
      </Box>
      <TypewriterText
        text={`It includes online classroom and subject management to streamline scheduling, assignments, and course structure. The enrollment system is designed to be seamless and reliable, helping students register efficiently while giving administrators better control over subjects, sections, and academic records.`}
        sx={{ pt: 3, pb: 10, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />
    </ProjectLayout>
  );
}
