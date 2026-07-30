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

export default function LedgerPage() {
  return (
    <ProjectLayout title="Ledger App">
      {/* Hero Image */}
      <SlideInImage
        eager
        src={`${process.env.PUBLIC_URL}/images/ledger1.png`}
        alt="ledger image1"
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
        Ledger App
      </Typography>

      {/* Meta row — categories, tech icons, date */}
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
        {["UI/UX", "Mobile App", "Project Management"].map((cat) => (
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
          <TechIconTooltip label="Android Studio" iconFile="android_studio.svg" alt="android studio" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="Dart" iconFile="dart.svg" alt="dart" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="Supabase" iconFile="supabase.svg" alt="supabase" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
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
        text={`Ledger App is a full-featured personal finance app I designed and built for Android. It replaces the typical single-ledger expense tracker with a multi-wallet system, an AI assistant that's actually wired into the user's real transaction data, and full lifecycle tracking for recurring bills, debts, and savings goals, all synced offline-first between the device and the cloud.`}
        sx={{ pt: 4, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Context / Problem */}
      <SectionHeading text="Context / Problem" />
      <TypewriterText
        text={`I wanted an expense tracker that was:`}
        sx={{ pt: 1.5, color: "text.secondary", fontSize: { xs: "0.85rem", lg: "0.95rem" } }}
      />
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
        <TypewriterText startBullet text={`Most budgeting apps assume one account and one balance, so anyone juggling cash, multiple bank accounts, or a shared fund ends up either forcing everything into one number or running several apps side by side.`} sx={{ pt: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Recurring bills and debts are usually tracked as static reminders sitting outside the actual balance. An app that shows "₱10,000 available" while ignoring rent due next week isn't telling the truth about what's actually spendable.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`AI features bolted onto finance apps are rarely grounded in the user's real data, so they can't answer something as basic as "how much did I spend on groceries last month."`} sx={{ pb: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
      </Box>

      {/* Image 2 */}
      <Box sx={{ mt: 6 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/ledger2.png`}
          alt="ledger image2"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
          imgSx={{ height: "30vw", objectFit: "contain", mx: "auto" }}
        />
      </Box>
      <TypewriterText
        text={`The Insights tab turns raw transaction history into a single scannable page. A Smart Insights row surfaces rule-based observations, spending trend versus last month, bills due this week, progress toward the nearest savings goal, computed entirely on-device with no AI call involved. Below it, a summary card, an income-versus-expense chart, and a wallet-by-wallet breakdown fill out the picture in one continuous scroll.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 3 */}
      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/ledger3.png`}
          alt="ledger image3"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            bgcolor: "grey.50",
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
          imgSx={{ height: "30vw", objectFit: "contain", mx: "auto" }}
        />
      </Box>
      <TypewriterText
        text={`Underneath the dashboard sits an AI assistant that's given a compact snapshot of the user's real net balance, per-wallet totals, and recent transactions before every message, so it can answer "how much did I spend on groceries last month" instead of a generic reply. The same idea powers a rule-based Smart Insights strip on the Insights tab: spending trend versus last month, upcoming bills due this week, overdue debts, and progress toward the nearest savings goal, computed entirely on-device with no AI call involved, so it's instant and works offline.`}
        sx={{ pt: 3, pb: 10, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />
    </ProjectLayout>
  );
}
