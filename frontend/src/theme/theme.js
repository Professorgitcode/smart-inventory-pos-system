/**
 * ENTERPRISE OCEAN UI - Master Theme
 * The single source of truth for the application's design system.
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { animations } from './animations';
import { gradients } from './gradients';
import { glass } from "./glass";

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  animations,
  gradients,
  glass,
  
  // Utility function to get the current mode's specific tokens easily
  getMode: (isDark) => ({
    colors: isDark ? colors.dark : colors.light,
    shadows: isDark ? shadows.dark : shadows.light,
    gradients: isDark ? gradients.dark : gradients.light,
    glass: isDark ? glass.dark : glass.light,
    
    // These remain consistent regardless of theme mode
    typography,
    spacing,
    radius,
    animations
  })
};

export default theme;