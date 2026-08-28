/**
 * ENTERPRISE OCEAN UI - Spacing System
 * Based on an 8px baseline grid (1rem = 16px).
 * Ensures consistent whitespace and layout alignment across the suite.
 */

export const spacing = {
  none: "0",
  xxs: "0.25rem",  // 4px  - Micro adjustments, between icon and text
  xs: "0.5rem",    // 8px  - Small gaps, input padding
  sm: "0.75rem",   // 12px - Medium gaps, button padding
  md: "1rem",      // 16px - Standard component padding, list items
  lg: "1.5rem",    // 24px - Container padding, section gaps
  xl: "2rem",      // 32px - Large container padding, dashboard widgets
  xxl: "2.5rem",   // 40px - Major section dividers
  xxxl: "3rem",    // 48px - Page headers to content gap
  huge: "4rem",    // 64px - Empty states, hero sections
};

export default spacing;