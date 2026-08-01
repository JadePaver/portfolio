import CaseStudy from "./caseStudy/CaseStudy";
import { LEDGER_THEME } from "./caseStudy/themes";
import content from "./ledger/content";

/**
 * Case study N°01.
 *
 * The whole running order lives in the shared template; everything specific to
 * Ledger is its content module and its green colourway.
 */
export default function LedgerPage() {
  return <CaseStudy theme={LEDGER_THEME} content={content} />;
}
