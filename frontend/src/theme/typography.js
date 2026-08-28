/**
 * ENTERPRISE OCEAN UI - Typography System
 * Scalable typography tokens optimized for data density and readability.
 */

export const typography = {
  // Font Families
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    monospace: "'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace",
  },

  // Font Sizes (Based on 16px root size: 1rem = 16px)
  fontSize: {
    xs: "0.75rem",    // 12px - Badges, tiny captions
    sm: "0.875rem",   // 14px - Table data, secondary text, small buttons
    base: "1rem",     // 16px - Standard body text, inputs, primary buttons
    md: "1.125rem",   // 18px - Subheadings, emphasis text
    lg: "1.25rem",    // 20px - Card titles, modal headers
    xl: "1.5rem",     // 24px - Section headers, KPIs
    xxl: "2rem",      // 32px - Page titles, large metrics
    xxxl: "2.5rem",   // 40px - Massive dashboard metrics
  },

  // Font Weights
  fontWeight: {
    regular: 400,     // Body text
    medium: 500,      // Table headers, secondary buttons
    semibold: 600,    // Primary buttons, tabs, subheadings
    bold: 700,        // Titles, KPI values
    extrabold: 800,   // Emphasized page titles
  },

  // Line Heights
  lineHeight: {
    none: 1,          // Used for icons or absolute positioning
    tight: 1.25,      // Headings and titles
    snug: 1.375,      // Subheadings
    normal: 1.5,      // Standard body text
    relaxed: 1.625,   // Large blocks of text (reports/articles)
    loose: 2,         // Very spacious text
  },

  // Letter Spacing (Tracking)
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",  // Good for uppercase labels (e.g., table headers)
    wider: "0.05em",
    widest: "0.1em",  // Badges, tiny uppercase captions
  },
};

export default typography;