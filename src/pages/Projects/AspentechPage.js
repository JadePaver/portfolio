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

export default function AspentechPage() {
  return (
    <ProjectLayout title="Aspentech">
      {/* Hero Image */}
      <SlideInImage
        eager
        src={`${process.env.PUBLIC_URL}/images/client_demo1.png`}
        alt="Aspentech Solutions landing page"
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
        Aspentech
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
          <TechIconTooltip label="React" iconFile="react.svg" alt="react" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="TypeScript" iconFile="typescript.svg" alt="typescript" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="MUI" iconFile="mui.svg" alt="mui" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="Laravel" iconFile="laravel.svg" alt="laravel" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
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
        text={`Aspentech Solutions is a showcase site I designed and built for an agency that sells enterprise and government systems. A buyer lands on it, browses the twelve systems the team has already shipped, opens the one closest to their need, and repaints it with their own colors, layout, and modules while the preview updates in front of them. The proposal they send at the end carries that exact setup with it.`}
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
        <TypewriterText startBullet text={`The agency was pitching with slide decks and old screenshots. A client had to picture their own branding on a system built for somebody else, and that gap is where most deals stalled.`} sx={{ pt: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Government and enterprise buyers ask the same things early on. What will it look like, which modules are included, and has this team done it before. Those answers were scattered across email threads and PDFs.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`A plain contact form throws away context. By the time a lead reached the team, nobody knew which system the client had been looking at, so the first call always started from zero.`} sx={{ pb: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
      </Box>

      {/* Image 2: template catalog */}
      <Box sx={{ mt: 6 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/client_demo4.png`}
          alt="Aspentech system templates catalog"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
        />
      </Box>
      <TypewriterText
        text={`Nothing on the site starts from a blank page. Twelve systems sit in the catalog, from budget management and HR to inventory and technical requests, each one grouped under Finance and Government, Operations, or Governance. A card states the scope up front, lists the modules it ships with, and gives two ways in: explore the full system or jump straight into customizing it.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 3: live customizer */}
      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/client_demo2.png`}
          alt="Aspentech live customizer panel"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
        />
      </Box>
      <TypewriterText
        text={`The customizer is the part clients actually play with. Pick a brand and accent color, switch the navigation between a sidebar, a top bar, or a rail, drag the corner radius until it feels right, then toggle modules like analytics, role based access, reporting, and audit logs. Every change redraws the preview on the spot, and what shows up there is what the team builds.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 4: full showcase */}
      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/client_demo3.png`}
          alt="Aspentech showcase overview"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
        />
      </Box>
      <TypewriterText
        text={`The rest of the site backs that up. Detail pages go deep on a single system, the track record stays visible throughout with 120 systems delivered, 45 enterprise and government clients, and eleven years behind it, and the proposal form arrives already carrying the configuration the client just built. The agency stopped explaining what it could make and started handing people a working version of it.`}
        sx={{ pt: 3, pb: 10, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />
    </ProjectLayout>
  );
}
