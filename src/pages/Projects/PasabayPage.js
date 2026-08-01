import CaseStudy from "./caseStudy/CaseStudy";
import { PASABAY_THEME } from "./caseStudy/themes";
import content from "./pasabay/content";

/**
 * Case study N°02.
 *
 * The whole running order lives in the shared template; everything specific to
 * PasaBay is its content module and its gold colourway.
 */
export default function PasabayPage() {
  return <CaseStudy theme={PASABAY_THEME} content={content} />;
}
