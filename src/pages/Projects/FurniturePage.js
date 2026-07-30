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

export default function FurniturePage() {
  return (
    <ProjectLayout title="ButchFurniture">
      {/* Hero Image */}
      <SlideInImage
        eager
        src={`${process.env.PUBLIC_URL}/images/furniture1.png`}
        alt="furniture image1"
        containerSx={{ borderRadius: 3, mb: 0, bgcolor: "grey.50", boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
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
        ButchFurniture
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
        text={`ButchFurniture is a point-of-sale and inventory management system built for a furniture business. It combines a customer-facing shopping experience for browsing and purchasing items with a complete admin workflow for tracking furniture stock, raw materials, and operational deliveries.`}
        sx={{ pt: 4, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Context / Problem */}
      <SectionHeading text="Context / Problem" />
      <Box sx={{ mt: 1.5, pl: 1.5, borderLeft: "3px solid rgba(253,111,0,0.22)", display: "flex", flexDirection: "column", gap: 0.5 }}>
        <TypewriterText startBullet text={`Records for furniture stock and raw materials were difficult to maintain consistently when updated manually.`} sx={{ pt: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Material consumption was hard to track because each furniture item requires specific quantities of multiple materials.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Inventory mismatches led to stock uncertainty, delayed production, and restocking happening too late.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Expected material deliveries were not tracked in a structured way, making it harder to plan replenishment and avoid shortages.`} sx={{ pb: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
      </Box>

      <Box sx={{ mt: 6 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/furniture2.png`}
          alt="furniture image2"
          containerSx={{ borderRadius: 3, mb: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        />
      </Box>
      <TypewriterText
        text={`The app includes a customer-facing shopping view where customers can browse furniture, check what is available, and place purchases. This creates a smoother buying experience while ensuring the displayed inventory reflects current stock.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/furniture3.png`}
          alt="furniture image3"
          containerSx={{ borderRadius: 3, mb: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        />
      </Box>
      <TypewriterText
        text={`The system manages both finished furniture inventory and raw material inventory in one workflow. Each furniture item is linked to its required materials and equivalent costs, so whenever furniture is added or produced, the corresponding material quantities are automatically deducted to keep stock levels accurate and updated.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/furniture4.png`}
          alt="furniture image4"
          containerSx={{ borderRadius: 3, mb: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        />
      </Box>
      <TypewriterText
        text={`A dedicated delivery module tracks expected material deliveries and their details, helping staff monitor incoming supplies and schedule replenishment. This makes restocking more predictable and reduces the risk of running out of critical materials during production.`}
        sx={{ pt: 3, pb: 10, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />
    </ProjectLayout>
  );
}
