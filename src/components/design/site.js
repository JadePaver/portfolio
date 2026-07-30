/** Single source of truth for the details the header, hero, contact and footer all repeat. */

export const site = {
  name: "Jade N. Paver",
  role: "Software Developer",
  email: "paver.jade09@gmail.com",
  cvHref: `${process.env.PUBLIC_URL}/paver_cv.pdf`,
  openToWork: true,
};

export const socials = [
  { label: "GitHub", url: "https://github.com/JadePaver" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/jade-paver-a6073a280/" },
  { label: "X", url: "https://x.com/Zakkur29" },
  { label: "Facebook", url: "https://www.facebook.com/jade.paver.5" },
  { label: "Instagram", url: "https://www.instagram.com/lincolns729" },
];

/** The condensed header strip that slides out once you are past the hero. */
export const dailyStack = ["Flutter", "Dart", "Laravel", "PHP", "React", "TypeScript", "MySQL"];

/** Order matters — the rail and the scroll spy both walk this top to bottom. */
export const sections = [
  { id: "top", label: "Intro", nav: null },
  { id: "about", label: "About", nav: "About" },
  { id: "services", label: "Services", nav: "Services" },
  { id: "work", label: "Work", nav: "Work" },
  { id: "process", label: "Process", nav: "Process" },
  { id: "contact", label: "Contact", nav: "Contact" },
];

export const navItems = sections.filter((s) => s.nav);
