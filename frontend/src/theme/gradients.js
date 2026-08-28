/**
 * ENTERPRISE OCEAN UI - Gradient System
 * Subtle, professional gradients to add depth without feeling like a consumer app.
 */

export const gradients = {
  light: {
    // Main application background (Subtle top-left to bottom-right)
    pageBackground: "linear-gradient(135deg, #EEF6FB 0%, #E2F0F9 100%)",
    // Premium call-to-action buttons
    primaryAction: "linear-gradient(180deg, #4384B0 0%, #34729C 100%)",
    // Glassmorphism base (requires backdrop-filter: blur in CSS)
    glass: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
    // Subtle overlay for image cards or data highlights
    overlay: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(238,246,251,1) 100%)",
  },
  
  dark: {
    // Deep, rich background avoiding pure black
    pageBackground: "linear-gradient(135deg, #0A1123 0%, #111A31 100%)",
    // Dark mode primary buttons
    primaryAction: "linear-gradient(180deg, #959BB5 0%, #8387C3 100%)",
    // Glassmorphism base for dark mode
    glass: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)",
    // Overlay for dark mode elements
    overlay: "linear-gradient(180deg, rgba(10,17,35,0) 0%, rgba(10,17,35,1) 100%)",
  }
};

export default gradients;