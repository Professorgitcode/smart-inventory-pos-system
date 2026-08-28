/**
 * ENTERPRISE OCEAN UI - Color System
 * Production-ready semantic color tokens for Light and Dark modes.
 */

export const colors = {
  light: {
    // Brand Colors
    primary: "#34729C",       // Primary Ocean Blue
    secondary: "#6CB1DA",     // Soft Ocean Blue
    primaryLight: "#D1ECFF",  // Very Light Blue
    primaryDark: "#1E5470",   // Deep Ocean
    accent: "#6EC1D1",        // Ocean Cyan
    accentLight: "#CDEAEC",   // Soft Ice
    shadowColor: "rgba(22,48,66,.12)",

    // Background & Surfaces
    background: "#EEF6FB",    // Main App Background
    surface: "#FFFFFF",       // Cards, Modals, Drawers
    surfaceHover: "#F7FAFC",  // Interactive surface hover state
    surfaceSecondary: "#F4F8FB",
    surfaceGlass: "rgba(255,255,255,0.72)",
    overlay: "rgba(22,48,66,0.40)",

    // Typography
    text: "#163042",          // High contrast primary text
    textMuted: "#6B8798",     // Secondary information, placeholders
    textInverse: "#FFFFFF",   // Text on primary backgrounds

    // Borders & Dividers
    border: "#D8E7F2",        // Standard borders
    borderHover: "#B9D5E8",   // Active/Hover borders
    focusRing: "rgba(108,177,218,.35)",
    disabled: "#C8D7E2",

    // Semantic Status Colors
    success: "#10B981",       // Emerald Green
    successBg: "#D1FAE5",     // Soft Green Background
    warning: "#F59E0B",       // Amber
    warningBg: "#FEF3C7",     // Soft Amber Background
    danger: "#EF4444",        // Crimson Red
    dangerBg: "#FEE2E2",      // Soft Red Background
    info: "#3B82F6",          // Royal Blue
    infoBg: "#DBEAFE",        // Soft Blue Background
  },
  
  dark: {
    // Brand Colors
    primary: "#8387C3",       // Ube (Primary accent for dark mode)
    secondary: "#959BB5",     // Cadet Grey
    primaryLight: "#8A8CAC",  // Cool Grey
    primaryDark: "#3A3E6C",   // American Blue
    accent: "#6EC1D1",        // Ocean Cyan (retained for vibrant highlights)
    accentLight: "#3A3E6C",   // Mapped to American Blue for depth
    shadowColor: "rgba(0,0,0,.45)",

    // Background & Surfaces
    background: "#0A1123",    // Chinese Black
    surface: "#121A2F",       // Elevated dark surface for cards/modals
    surfaceHover: "#1C253D",  // Interactive dark surface hover state
    surfaceSecondary: "#1B243A",
    surfaceGlass: "rgba(18,26,47,0.72)",
    overlay: "rgba(4,7,15,0.60)",

    // Typography
    text: "#F8FAFC",          // Slate 50 for pure readability
    textMuted: "#959BB5",     // Cadet Grey for secondary text
    textInverse: "#0A1123",   // Text on light/primary buttons

    // Borders & Dividers
    border: "#3A3E6C",        // American Blue for structural separation
    borderHover: "#8387C3",   // Ube for focus/hover borders
    focusRing: "rgba(131,135,195,.35)",
    disabled: "#596379",

    // Semantic Status Colors (Optimized for dark mode contrast)
    success: "#34D399",
    successBg: "rgba(16, 185, 129, 0.15)",
    warning: "#FBBF24",
    warningBg: "rgba(245, 158, 11, 0.15)",
    danger: "#F87171",
    dangerBg: "rgba(239, 68, 68, 0.15)",
    info: "#60A5FA",
    infoBg: "rgba(59, 130, 246, 0.15)",
  }
};

export default colors;