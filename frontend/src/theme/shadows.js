/**
 * ENTERPRISE OCEAN UI - Shadow System
 * Soft, elegant shadows tinted with brand colors to avoid muddy gray shadows.
 * Includes specific shadows for glassmorphism layering.
 */

export const shadows = {
  light: {
    none: "none",
    // 5% opacity Ocean Blue
    sm: "0 1px 2px 0 rgba(52, 114, 156, 0.05)",
    // Standard component elevation (dropdowns, popovers)
    md: "0 4px 6px -1px rgba(52, 114, 156, 0.1), 0 2px 4px -1px rgba(52, 114, 156, 0.06)",
    // Floating cards, modals
    lg: "0 10px 15px -3px rgba(52, 114, 156, 0.1), 0 4px 6px -2px rgba(52, 114, 156, 0.05)",
    // Heavy elevation for drawers/dialogs
    xl: "0 20px 25px -5px rgba(52, 114, 156, 0.1), 0 10px 10px -5px rgba(52, 114, 156, 0.04)",
    // Premium glassmorphism shadow
    glass: "0 8px 32px 0 rgba(52, 114, 156, 0.12)",
    // Inset for pressed states or input fields
    inner: "inset 0 2px 4px 0 rgba(52, 114, 156, 0.06)",
  },
  
  dark: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
    glass: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)",
  }
};

export default shadows;