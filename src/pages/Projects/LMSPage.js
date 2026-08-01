import CaseStudy from "./caseStudy/CaseStudy";
import { LMS_THEME } from "./caseStudy/themes";
import content from "./lms/content";

/**
 * Case study N°05.
 *
 * The whole running order lives in the shared template; everything specific to
 * LMS is its content module and its violet colourway. It is the first case
 * study to run five chapters rather than four — see the note in `content.js`
 * for how that odd count is absorbed into the template's cream/ink rhythm.
 */
export default function LMSPage() {
  return <CaseStudy theme={LMS_THEME} content={content} />;
}
