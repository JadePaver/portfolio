/**
 * Every string and asset the PasaBay case study renders.
 *
 * Kept out of the components so the page reads as a running order of chapters
 * and the copy can be edited without going near layout code.
 *
 * ---------------------------------------------------------------------------
 * ASSETS: the sixteen PNGs below are expected in `public/images/pasabay/`.
 * The six presentation slides are in place. The ten phone screenshots are not
 * yet exported, and each falls back to a labelled placeholder of the right
 * aspect ratio, so the layout holds either way.
 *
 *   in place:  hero.png     ch1-firstrun.png  ch2-discover.png
 *              poster.png   ch3-order.png     ch4-deliver.png
 *
 *   pending:   scr-signin.png    scr-signup.png    scr-otp.png
 *              scr-pin.png       scr-home.png      scr-kitchens.png
 *              scr-search.png    scr-cart.png      scr-checkout.png
 *              scr-thankyou.png
 * ---------------------------------------------------------------------------
 */

const asset = (file) => `${process.env.PUBLIC_URL}/images/pasabay/${file}`;

/** The presentation slides are 16:9; the phone screenshots are 720×1600. */
const SLIDE = "16 / 9";

export const hero = {
  kicker: "CASE STUDY — 02",
  discipline: "Mobile app · Food delivery",
  year: "2024",
  title: "PasaBay",
  tagline: "Home-cooked Filipino food, sent your way.",
  lead:
    "A food-delivery app for neighborhood home kitchens. Browse what's cooking today, reserve tomorrow's menu before the servings run out, and follow the order all the way to your door.",
  scrollHint: "Scroll for the full story",
  /** Two syllables longer than "Ledger", so the display size steps down. */
  titleSx: { fontSize: "clamp(52px, 9.6vw, 124px)" },
  meta: [
    { term: "Role", value: "Designer & full-stack developer" },
    { term: "Timeline", value: "4 months, 2024" },
    { term: "Platform", value: "Android · Maps API" },
    { term: "Scope", value: "10 screens, end to end" },
  ],
  figure: {
    src: asset("hero.png"),
    file: "hero.png",
    alt:
      "PasaBay hero — three phones showing the home feed, a kitchen page and the address sheet",
    caption: "PasaBay — presentation hero, 2024",
    ratio: SLIDE,
    wide: true,
  },
};

export const tickerLine =
  "HOME-COOKED FILIPINO FOOD, SENT YOUR WAY  ✦  PASABAY  ✦  ORDER · SCHEDULE · EAT  ✦";

export const brief = {
  id: "brief",
  num: "00",
  kicker: "The brief",
  title: "A home kitchen is not a restaurant",
  lead:
    "Neighborhood cooks sell a fixed batch each day and take orders in Facebook comment threads. PasaBay was scoped around that reality instead of copying a restaurant marketplace.",
  panels: [
    {
      term: "The problem",
      body:
        "Orders lived in comment threads: no one knew how many servings were left, tomorrow's menu was posted and lost, and riders were given landmarks over the phone.",
    },
    {
      term: "The approach",
      body:
        "Put the batch first. Every dish carries a live serving count, the menu only ever shows today and tomorrow, and delivery starts from a dropped pin instead of a typed street number.",
    },
    {
      term: "The outcome",
      body:
        "One flow from browse to doorstep: sign-in without a password, two ways to buy, and a saved address label the rider can actually follow.",
    },
  ],
  stats: [
    { value: "2", accent: "days", spaced: true, label: "Menu horizon — today & tomorrow" },
    { value: "0", label: "Passwords — OTP plus a 4-digit PIN" },
    { value: "₱30", label: "Delivery fee, shown before you pay" },
    { value: "4", label: "Surfaces — home · messages · calendar · alerts" },
  ],
};

export const chapters = [
  {
    id: "ch1",
    tone: "paper",
    num: "01",
    kicker: "First run",
    title: "Three screens, then you're in",
    lead: {
      before: "Onboarding explains the whole model in one sweep — ",
      em: "order, schedule, eat",
      after: ". Sign-in never asks for a password.",
    },
    figure: {
      src: asset("ch1-firstrun.png"),
      file: "ch1-firstrun.png",
      alt: "Three onboarding screens (order, schedule, eat) beside the sign-in card",
      caption: "01 · Onboarding and passwordless sign-in",
      ratio: SLIDE,
      wide: true,
    },
    cards: [
      {
        num: "1.1",
        title: "Order",
        body: "Browse home kitchens near you and see what's cooking today.",
      },
      {
        num: "1.2",
        title: "Schedule",
        body: "Reserve from tomorrow's menu before the servings run out.",
      },
      {
        num: "1.3",
        title: "Eat",
        body: "Delivery or pick-up the moment it comes off the stove.",
      },
      {
        num: "1.4",
        title: "Sign in",
        body: "Mobile number, Facebook or Google, verified by OTP, then a 4-digit PIN.",
      },
    ],
  },
  {
    id: "ch2",
    tone: "ink",
    num: "02",
    kicker: "Discover",
    title: "What the neighborhood is cooking",
    lead:
      "The home feed is built around a single gold header, a kitchen carousel and a two-day menu. No filters to learn before the first order.",
    figure: {
      src: asset("ch2-discover.png"),
      file: "ch2-discover.png",
      alt: "Home feed with featured kitchen grid and a kitchen page with today's menu",
      caption: "02 · Home feed and kitchen page",
      ratio: SLIDE,
      wide: true,
    },
    cards: [
      {
        num: "2.1",
        title: "Featured Kitchen",
        body: "A swipeable grid of nearby home cooks, each with its barangay and rating.",
      },
      {
        num: "2.2",
        title: "Today's / Tomorrow's Menu",
        body: "One tap switches between what's ready now and what to pre-order.",
      },
      {
        num: "2.3",
        title: "Available Serving",
        body: "Live stock per dish, because home kitchens cook a fixed batch each day.",
      },
      {
        num: "2.4",
        title: "Search, then narrow",
        body: "Price, Available Now, Nearby and Free delivery sit as chips above the results.",
      },
    ],
  },
  {
    id: "ch3",
    tone: "paper",
    num: "03",
    kicker: "Order",
    title: "From dish sheet to confirmed",
    lead:
      "Every dish opens as a photo-led sheet with the kitchen, the serving count and the two ways to buy sitting on one row.",
    figure: {
      src: asset("ch3-order.png"),
      file: "ch3-order.png",
      alt:
        "Lumpiang Shanghai dish sheet with serving stepper beside the order-confirmed screen",
      caption: "03 · Dish sheet, stepper, and the receipt",
      ratio: SLIDE,
      wide: true,
    },
    cards: [
      {
        num: "3.1",
        title: "Serving stepper",
        body: "Grey minus, gold plus, capped at what the kitchen has left.",
      },
      {
        num: "3.2",
        title: "Add to cart, or Order Now",
        body: "Keep building an order across the kitchen, or skip straight to checkout.",
      },
      {
        num: "3.3",
        title: "Checked lines only",
        body: "The cart totals what you tick, so a saved dish can wait for the next order.",
      },
      {
        num: "3.4",
        title: "Confirmed, then repeat",
        body: "A quiet receipt screen whose only action is Order Again.",
      },
    ],
  },
  {
    id: "ch4",
    tone: "ink",
    num: "04",
    kicker: "Deliver",
    title: "Addresses that riders can actually find",
    lead:
      "Neighborhoods here run on landmarks, not street numbers, so the pin comes first and the written detail follows.",
    figure: {
      src: asset("ch4-deliver.png"),
      file: "ch4-deliver.png",
      alt: "Map pin screen beside the enter-address-details sheet with label chips",
      caption: "04 · Drop the pin, then the address detail",
      ratio: SLIDE,
      wide: true,
    },
    cards: [
      {
        num: "4.1",
        title: "Drop the pin",
        body: "Search or auto-locate, with nearby landmarks kept on the map.",
      },
      {
        num: "4.2",
        title: "Address details",
        body: "Floor and unit, plus a free-text note to the driver.",
      },
      {
        num: "4.3",
        title: "Save a label",
        body: "Home, Work, Office or your own, reusable at every checkout.",
      },
      {
        num: "4.4",
        title: "Pay how they already pay",
        body: "GCash or cash on delivery, chosen on the same screen as the address.",
      },
    ],
  },
];

export const screens = {
  id: "shots",
  num: "05",
  kicker: "The screens",
  title: "Sign-up to doorstep",
  dragHint: "Drag or",
  railLabel: "PasaBay screens",
  /** Portrait screenshots, shown in a phone bezel. */
  ratio: "720 / 1600",
  items: [
    {
      code: "S.01",
      label: "Sign in",
      file: "scr-signin.png",
      src: asset("scr-signin.png"),
      alt: "PasaBay sign-in screen",
      caption: "S.01 — Sign in · mobile number, Facebook or Google",
    },
    {
      code: "S.02",
      label: "Sign up",
      file: "scr-signup.png",
      src: asset("scr-signup.png"),
      alt: "Sign up form screen",
      caption: "S.02 — Sign up · name, phone, email",
    },
    {
      code: "S.03",
      label: "OTP",
      file: "scr-otp.png",
      src: asset("scr-otp.png"),
      alt: "OTP verification screen",
      caption: "S.03 — OTP verification · six digits, resend",
    },
    {
      code: "S.04",
      label: "Create PIN",
      file: "scr-pin.png",
      src: asset("scr-pin.png"),
      alt: "Create your PIN screen",
      caption: "S.04 — Create your PIN · four digits",
    },
    {
      code: "S.05",
      label: "Home",
      file: "scr-home.png",
      src: asset("scr-home.png"),
      alt: "Home feed screen",
      caption: "S.05 — Home · featured kitchens and the two-day menu",
    },
    {
      code: "S.06",
      label: "Kitchens",
      file: "scr-kitchens.png",
      src: asset("scr-kitchens.png"),
      alt: "Kitchens list screen",
      caption: "S.06 — Kitchens · every home cook nearby",
    },
    {
      code: "S.07",
      label: "Search",
      file: "scr-search.png",
      src: asset("scr-search.png"),
      alt: "Search results with filter chips",
      caption: "S.07 — Search · price, available now, nearby, free",
    },
    {
      code: "S.08",
      label: "Cart",
      file: "scr-cart.png",
      src: asset("scr-cart.png"),
      alt: "Cart screen with per-line checkboxes",
      caption: "S.08 — Cart · tick the lines you want now",
    },
    {
      code: "S.09",
      label: "Checkout",
      file: "scr-checkout.png",
      src: asset("scr-checkout.png"),
      alt: "Checkout screen with payment methods and order summary",
      caption: "S.09 — Checkout · address, note, GCash or COD",
    },
    {
      code: "S.10",
      label: "Confirmed",
      file: "scr-thankyou.png",
      src: asset("scr-thankyou.png"),
      alt: "Order confirmed thank you screen",
      caption: "S.10 — Order confirmed · Order Again",
    },
  ],
};

export const notes = {
  id: "notes",
  num: "06",
  kicker: "Design notes",
  title: "Decisions under the paint",
  items: [
    {
      code: "N.01",
      title: "The batch is the product",
      body:
        "A home cook makes ten servings, not a stocked menu. Available Serving appears on every card, sheet and cart line, and it caps the stepper: the interface never lets you order food that doesn't exist.",
    },
    {
      code: "N.02",
      title: "Two days, never a calendar",
      body:
        "Kitchens plan one day ahead, so the menu is a two-tab toggle instead of a date picker. Scheduling stays a decision about dinner, not an appointment to book.",
    },
    {
      code: "N.03",
      title: "Two ways to buy, one row",
      body:
        "Add to cart and Order Now sit side by side on the dish sheet. A single dish for tonight and a full family order are the same product, one tap apart.",
    },
    {
      code: "N.04",
      title: "Landmarks over street numbers",
      body:
        "Addresses here are given as “beside the public market.” The pin is captured first, the written detail and a note to the driver come after, and the whole thing is saved behind one reusable label.",
    },
  ],
  poster: {
    src: asset("poster.png"),
    file: "poster.png",
    alt: "PasaBay store listing poster — home-cooked meals, sent your way",
    caption: "Store listing art — home-cooked meals, sent your way",
    ratio: "890 / 978",
    figcaption: { code: "FIG.06", text: "Store listing art" },
  },
};

export const outcome = {
  id: "outcome",
  num: "07",
  kicker: "Outcome",
  headline: "The comment thread became a checkout",
  body: {
    before:
      "Ten screens carry a neighborhood order from a photo of today's ulam to a rider at the gate, with the serving count, the price and the pin agreed before anyone starts cooking. ",
    em: "Same kitchens, same food, one honest flow.",
  },
  stack: [
    "HOME KITCHENS",
    "TODAY & TOMORROW",
    "OTP SIGN-IN",
    "MAPS API",
    "GCASH · COD",
    "FIGMA",
  ],
};

/** Order matters — the rail and the scroll spy both walk this top to bottom. */
export const chapterNav = [
  { id: "brief", label: "Brief" },
  { id: "ch1", label: "First run" },
  { id: "ch2", label: "Discover" },
  { id: "ch3", label: "Order" },
  { id: "ch4", label: "Deliver" },
  { id: "shots", label: "Screens" },
  { id: "notes", label: "Notes" },
  { id: "outcome", label: "Outcome" },
];

export const caseLabel = "PasaBay — Case study N°02";
export const footerLabel = "Case study N°02 — PasaBay";

const content = {
  hero,
  tickerLine,
  brief,
  chapters,
  screens,
  notes,
  outcome,
  chapterNav,
  caseLabel,
  footerLabel,
};

export default content;
