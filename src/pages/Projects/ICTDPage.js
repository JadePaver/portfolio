import CaseStudy from "./caseStudy/CaseStudy";
import { ICTD_THEME } from "./caseStudy/themes";
import content from "./ictd/content";

/**
 * Case study N°04.
 *
 * The whole running order lives in the shared template; everything specific to
 * the ICTD App is its content module and its green colourway.
 */
export default function ICTDPage() {
  return <CaseStudy theme={ICTD_THEME} content={content} />;
}
