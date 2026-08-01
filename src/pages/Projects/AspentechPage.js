import CaseStudy from "./caseStudy/CaseStudy";
import { ASPENTECH_THEME } from "./caseStudy/themes";
import content from "./aspentech/content";

/**
 * Case study N°03.
 *
 * The whole running order lives in the shared template; everything specific to
 * Aspentech is its content module and its blue colourway.
 */
export default function AspentechPage() {
  return <CaseStudy theme={ASPENTECH_THEME} content={content} />;
}
