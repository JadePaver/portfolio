import { createContext, useContext } from "react";

/**
 * The active case study's theme.
 *
 * Only for the handful of values that cannot travel as a CSS custom property —
 * the asset folder, the signature mark, the cream. Colour reaches the
 * components through `var(--case-accent)` instead.
 */
export const CaseThemeContext = createContext(null);

export const useCaseTheme = () => useContext(CaseThemeContext);
