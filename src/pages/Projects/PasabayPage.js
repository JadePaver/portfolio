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

const imageContainerSx = {
  borderRadius: 3,
  mb: 0,
  bgcolor: "grey.50",
  boxShadow: "0 4px 28px rgba(0,0,0,0.08)",
};

const imageSx = { width: "100%", height: "auto", objectFit: "contain", mx: "auto" };

export default function PasabayPage() {
  return (
    <ProjectLayout title="Pasabay">
      {/* Hero Image */}
      <SlideInImage
        eager
        src={`${process.env.PUBLIC_URL}/images/pasabay1.png`}
        alt="Pasabay title slide with the app logo, the tagline home-cooked Filipino food sent your way, and three screens showing the kitchen page, home feed and address form"
        containerSx={imageContainerSx}
        imgSx={imageSx}
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
        Pasabay
      </Typography>

      {/* Meta row */}
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
        text={`Pasabay is a food ordering app for Bago City, Negros Occidental, built around home kitchens instead of restaurants. The cooks here already sell lutong bahay to their own barangay, mostly through Facebook posts and group chats. Pasabay gives them a real storefront: a menu that resets every morning, a serving count that drops as orders come in, and a delivery flow the buyer can follow without messaging anyone. I designed the flows and screens, then built the app in Flutter.`}
        sx={{ pt: 4, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Context / Problem */}
      <SectionHeading text="Context / Problem" />
      <TypewriterText
        text={`Selling ulam from your own kitchen works, but the tools around it do not:`}
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
        <TypewriterText startBullet text={`A cook posts the day's menu on Facebook, then spends the afternoon reading comments to work out who ordered what, who is picking up, and who has already paid.`} sx={{ pt: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Delivery apps assume a kitchen whose menu never runs out. A home cook makes one batch of sisig, and when it is gone the listing has to go with it until tomorrow.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Buyers comment "available pa?" and wait. The cook is at the stove, so the reply lands late and the servings are usually claimed by then.`} sx={{ fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
        <TypewriterText startBullet text={`Almost nobody gives directions by street number here. An address sounds like "near LBC, across the public market", which a plain text field has no way to hold.`} sx={{ pb: 1, fontSize: { xs: "0.85rem", lg: "0.95rem" } }} />
      </Box>

      {/* Image 2 */}
      <SectionHeading text="The first ninety seconds" />
      <Box sx={{ mt: 3 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/pasabay2.png`}
          alt="First run slide breaking down the order, schedule and eat onboarding screens and the sign in screen"
          containerSx={imageContainerSx}
          imgSx={imageSx}
        />
      </Box>
      <TypewriterText
        text={`Onboarding had one job, which was to say this is a neighborhood kitchen and not a restaurant, then get out of the way. Three illustrated screens cover order, schedule, and eat, with Skip sitting on the first one for anyone who does not want the tour. Sign in takes a mobile number, Facebook, or Google and finishes on an OTP, so nobody has to invent another password. The person opening this app is hungry on a work break, and every extra field is a reason to close it.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 3 */}
      <SectionHeading text="Selling a batch, not a menu" />
      <Box sx={{ mt: 3 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/pasabay3.png`}
          alt="Discover slide showing the home feed with its featured kitchen grid, the two day menu tabs and the available serving count on each dish"
          containerSx={imageContainerSx}
          imgSx={imageSx}
        />
      </Box>
      <TypewriterText
        text={`Available Serving is the number the whole feed hangs on. A home kitchen cooks a fixed amount, so what is left decides whether an order is even possible, which puts it next to the price rather than buried inside the dish page. The two day tabs come from the same fact. What is ready now and what has to be reserved are different purchases, and a cook taking reservations knows how much to buy at the market in the morning. Filters and sort menus were left out on purpose, since a barangay has maybe a dozen kitchens and scrolling past them beats learning a filter panel.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 4 */}
      <SectionHeading text="Ordering without the back and forth" />
      <Box sx={{ mt: 3 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/pasabay4.png`}
          alt="Order slide showing the dish sheet with its serving stepper, the add to cart and Order Now buttons, and the confirmation screen"
          containerSx={imageContainerSx}
          imgSx={imageSx}
        />
      </Box>
      <TypewriterText
        text={`Capping the serving stepper at whatever the kitchen has left is the smallest decision here and the one that removes the most work. An order can never be placed for food that was never cooked, so no cook has to message a buyer back to cancel. Add to cart and Order Now share a row because buyers arrive in two moods, still browsing the kitchen or already decided, and forcing everyone through a cart punishes the second group. The receipt stays quiet: one check, one button, and that button is Order Again, since a neighborhood kitchen runs on the same handful of regulars.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Image 5 */}
      <SectionHeading text="An address a rider can find" />
      <Box sx={{ mt: 3 }}>
        <SlideInImage
          src={`${process.env.PUBLIC_URL}/images/pasabay5.png`}
          alt="Deliver slide showing the map pin screen with nearby landmarks and the address details form with a note to driver field and saved labels"
          containerSx={imageContainerSx}
          imgSx={imageSx}
        />
      </Box>
      <TypewriterText
        text={`Delivery starts on the map rather than in a text field. The buyer drops or auto locates a pin while landmarks like the public market and LBC stay visible, because that is the vocabulary people here actually use for directions. The written part comes after and stays short, floor and unit plus a free note where "meet me at the entrance" belongs. Saving it as Home, Work, Office, or a custom label puts the address one tap away at the next checkout, and the rider ends up with a location instead of a description.`}
        sx={{ pt: 3, pb: 2, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />

      {/* Design direction */}
      <SectionHeading text="Design direction" />
      <TypewriterText
        text={`Warm gold and cream carry the interface so the food photography does the talking. Every screen commits to one primary action, the bottom bar never moves, and dishes are shown the way they actually arrive instead of as styled studio plates. What I was aiming for is the feeling of ordering from a neighbor who happens to cook well, not from a franchise.`}
        sx={{ pt: 1.5, pb: 10, lineHeight: 1.9, fontSize: { xs: "0.85rem", lg: "1rem" } }}
      />
    </ProjectLayout>
  );
}
