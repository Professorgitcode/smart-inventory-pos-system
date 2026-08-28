/**
 * ENTERPRISE OCEAN UI - Animation System
 * Subtle, purposeful motion design. No bouncy or overly long animations.
 * Optimized for snappy enterprise workflows.
 */

export const animations = {
  // Durations
  duration: {
    fast: "150ms",    // Hover states, color changes
    normal: "250ms",  // Modals opening, drawers sliding
    slow: "350ms",    // Complex page transitions, large layouts
  },

  // Easing Curves (Cubic Bezier)
  easing: {
    // Snappy entrance, gentle deceleration (good for slide-ins)
    easeOut: "cubic-bezier(0.16, 1, 0.3, 1)", 
    // Gentle acceleration, snappy exit (good for closing elements)
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",     
    // Smooth and symmetrical (good for opacity fades)
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Pre-configured transitions for inline styles
  transition: {
    base: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    transform: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
    colors: "color 150ms ease, background-color 150ms ease, border-color 150ms ease",
    shadow: "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Keyframes (to be injected globally or via styled components/CSS modules)
  keyframes: {
    fadeIn: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    slideUp: `
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    skeletonPulse: `
      @keyframes skeletonPulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `
  }
};

export default animations;