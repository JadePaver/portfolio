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

export default function ICTDPage() {
  return (
    <ProjectLayout title="ICTD App">
      {/* Hero Image */}
      <SlideInImage
        eager
        src={`${process.env.PUBLIC_URL}/images/ictd1.png`}
        alt="ictd image1"
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
        ICTD App
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
        {["UI/UX", "Mobile App", "Web Development", "Project Management"].map((cat) => (
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
          <TechIconTooltip label="Dart" iconFile="dart.svg" alt="dart" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="React" iconFile="react.svg" alt="react" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
          <TechIconTooltip label="TypeScript" iconFile="typescript.svg" alt="typescript" visibleIconVariants={visibleIconVariants} visibleImgVariants={visibleImgVariants} />
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
        text={`ICTD App is a service-desk platform I designed and built for an internal ICT department. It's the same requests-and-repairs workflow, available two ways: a Flutter mobile app for clients and field operators, and a React/TypeScript admin dashboard for ICTD staff at a desk. Both read and write the same Supabase-backed data, so a request accepted on a phone in the hallway shows as accepted the instant someone opens the dashboard. The phone is built for handling one thing at a time on the move. The dashboard is built for seeing everything at once, with live stats, trends, and full inventory custody that has no mobile equivalent at all.`}
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
        <TypewriterText startBullet text={`Requests made over chat, email, or a walk-up desk leave no record of who asked, who's handling it, or whether it actually got resolved.`} sx={{ pt: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`A laptop or part left for repair is easy to lose track of once it leaves the owner's hands. A paper log doesn't show current status or who last touched it.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Field work (accepting a request on the move, booking in a laptop at the counter) and desk work (triaging the whole queue, tracking who currently holds which piece of hardware) are different postures, forcing both onto a phone screen, or both into a browser tab, serves neither.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Clients, operators, and dashboard staff all need different views of the same underlying data, but three forked implementations would mean every fix lands three times instead of one.`} sx={{ pb: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
      </Box>

      {/* Image 2 */}
      <Box sx={{ mt: 6 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/ictd2.png`}
          alt="ictd image2"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
          imgSx={{ width: "90%", height: "auto", maxWidth: "100%", mx: "auto" }}
        />
      </Box>
      <TypewriterText
        text={`Both roles land on the same Requests list, but the card carries the workflow. Collapsed, it shows type, department, and a status color accent. Expanded, it shows the full description, requester, responder, activity timeline, and (for operators) accept/deny/done actions inline.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 3 */}
      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/ictd3.png`}
          alt="ictd image3"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
          imgSx={{ width: "90%", height: "auto", maxWidth: "100%", mx: "auto" }}
        />
      </Box>
      <TypewriterText
        text={`Repair items follow the same book-in to book-out lifecycle on both surfaces. Mobile uses the same expandable card: item, serial, and owner up front; expanded, condition notes and a timestamped status log, with a long-press quick-actions sheet to move an item forward without a separate edit screen. The web dashboard turns the same lifecycle into a filterable list with a book-in flow and a status-update/edit modal, built for working through a backlog rather than one item.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 4 */}
      <Box sx={{ mt: 4 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/ictd4.png`}
          alt="ictd image4"
          containerSx={{
            borderRadius: 3,
            mb: 0,
            bgcolor: "grey.50",
            boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
          }}
          imgSx={{ maxHeight: "55vh", objectFit: "contain", mx: "auto" }}
        />
      </Box>
      <TypewriterText
        text={`Messaging isn't a separate contacts app. Tapping a requester's name on a request card, or an item owner's name on a repair card, opens a direct thread with that person.`}
        sx={{ pt: 3, pb: 10, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />
    </ProjectLayout>
  );
}
