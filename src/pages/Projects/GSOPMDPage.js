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

export default function GSOPMDPage() {
  return (
    <ProjectLayout title="GSO-PMD Property Management">
      {/* Hero Image */}
      <SlideInImage
        eager
        src={`${process.env.PUBLIC_URL}/images/gso_pmd1.png`}
        alt="gso pmd image1"
        containerSx={{ borderRadius: 3, mb: 0, bgcolor: "grey.50", boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        imgSx={{ maxHeight: "60vh", objectFit: "contain", mx: "auto" }}
      />

      {/* Project Title */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 800,
          fontSize: { xs: "1.8rem", lg: "2.8rem" },
          lineHeight: 1.1,
          mt: 4,
          mb: 0.5,
          color: "text.primary",
        }}
      >
        GSO-PMD Property Management
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
        text={`Property Management System for a government program that tracks awardees (beneficiaries) who are granted subsidized lots/blocks. The system centralizes awardee profiles, property allocation records, and installment/payment monitoring to improve accuracy, reduce manual paperwork, and speed up reporting and collections.`}
        sx={{ pt: 4, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Context / Problem */}
      <SectionHeading text="Context / Problem" />
      <Box sx={{ mt: 1.5, pl: 1.5, borderLeft: "3px solid rgba(253,111,0,0.22)", display: "flex", flexDirection: "column", gap: 0.5 }}>
        <TypewriterText startBullet text={`Records and payments were managed through spreadsheets and paper forms, which isn't scalable long term.`} sx={{ pt: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Tracking ownership and monitoring each awardee's balance/status was tedious and error-prone.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Payments and reports were difficult to consolidate and generate, especially for flexible/custom date ranges.`} sx={{ pb: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
      </Box>

      <Box sx={{ mt: 6 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/gso_pmd2.png`}
          alt="gso pmd image2"
          containerSx={{ borderRadius: 3, mb: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        />
      </Box>
      <TypewriterText
        text={`The system is built around detailed Awardee tables that serve as a single source of truth for each beneficiary's complete record — personal and application details, assigned lot/block information, and a full ledger history starting from the very first payment. To keep data exploration fast and responsive, React powers a dynamic UI that supports quick filtering, searching, and real-time updates as records change. On the backend, an Express API with Prisma ORM enforces a clean, well-structured schema and enables efficient, reliable queries for ledger computation, reporting, and auditing.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/gso_pmd3.png`}
          alt="gso pmd image3"
          containerSx={{ borderRadius: 3, mb: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.08)" }}
        />
      </Box>
      <TypewriterText
        text={`A key part of the system is its ledgering module, which records every transaction and status change to provide a clear, auditable financial timeline per awardee. This enables the Accounting, Treasurer, and Property Department to accurately monitor payments, validate contract compliance, and perform audits with confidence. Each awardee account is tracked by contract status—whether it is still amortizing, title released, or cancelled—so staff can quickly determine current standing, outstanding balances, and the complete payment history that supports every decision.`}
        sx={{ pt: 3, pb: 10, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />
    </ProjectLayout>
  );
}
