// src/theme/theme.js
/**
 * LERNO - Design System & Theme
 * High-end dark mode theme inspired by Apple Design Awards & modern UI patterns
 * All design tokens centralized here for consistency
 */

export const COLORS = {
  // Primary Palette - Deep, elegant dark mode
  background: {
    primary: '#0A0E27',      // Deep navy black
    secondary: '#12172F',    // Slightly lighter navy
    tertiary: '#1A2247',     // Card background
    overlay: 'rgba(10, 14, 39, 0.6)', // For modals/overlays
  },

  // Glassmorphism & Accent
  glass: {
    light: 'rgba(255, 255, 255, 0.08)',   // Ultra-light glass
    medium: 'rgba(255, 255, 255, 0.12)',  // Medium glass
    strong: 'rgba(255, 255, 255, 0.15)',  // Strong glass
  },

  // Text & Typography
  text: {
    primary: '#FFFFFF',         // Pure white
    secondary: '#B8C5D6',       // Muted gray-blue
    tertiary: '#7D8FA3',        // Darker gray-blue
    accent: '#E8F0FF',          // Light blue tint
  },

  // Category Colors (with glassmorphic variants)
  categories: {
    physics: {
      main: '#FF6B9D',         // Vibrant pink-red
      light: 'rgba(255, 107, 157, 0.15)',
      dark: 'rgba(255, 107, 157, 0.8)',
    },
    biology: {
      main: '#00D084',         // Emerald green
      light: 'rgba(0, 208, 132, 0.15)',
      dark: 'rgba(0, 208, 132, 0.8)',
    },
    astronomy: {
      main: '#4A9EFF',         // Cosmic blue
      light: 'rgba(74, 158, 255, 0.15)',
      dark: 'rgba(74, 158, 255, 0.8)',
    },
    chemistry: {
      main: '#FFB946',         // Warm amber
      light: 'rgba(255, 185, 70, 0.15)',
      dark: 'rgba(255, 185, 70, 0.8)',
    },
    nature: {
      main: '#67E8B9',         // Soft teal
      light: 'rgba(103, 232, 185, 0.15)',
      dark: 'rgba(103, 232, 185, 0.8)',
    },
    mathematics: {
      main: '#D49EFF',         // Soft purple
      light: 'rgba(212, 158, 255, 0.15)',
      dark: 'rgba(212, 158, 255, 0.8)',
    },
  },

  // Status & Interactive
  status: {
    success: '#00D084',
    warning: '#FFB946',
    error: '#FF6B9D',
    info: '#4A9EFF',
  },

  // Borders & Dividers
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    dark: 'rgba(255, 255, 255, 0.2)',
  },

  // Gradients (for visual depth)
  gradients: {
    primaryGradient: ['#0A0E27', '#12172F'],
    accentGradient: ['#FF6B9D', '#4A9EFF'],
    glassGradient: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
  },
};

export const TYPOGRAPHY = {
  // Font families
  family: {
    regular: 'System', // Uses platform default (San Francisco on iOS, Roboto on Android)
  },

  // Font sizes (scaled for mobile)
  sizes: {
    xs: 11,
    sm: 13,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },

  // Font weights
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Predefined text styles (for consistency)
  styles: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 1.3,
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 0,
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 1.5,
      letterSpacing: 0.2,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 1.5,
      letterSpacing: 0.1,
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.6,
      letterSpacing: 0.3,
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.6,
      letterSpacing: 0.2,
    },
    caption: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 1.4,
      letterSpacing: 0.4,
    },
    overline: {
      fontSize: 11,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const SHADOWS = {
  // Subtle elevation shadows for depth
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#4A9EFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const ANIMATION = {
  // Timing functions for smooth interactions
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  easing: {
    // Natural easing curves (inspired by iOS)
    easeInOut: [0.42, 0, 0.58, 1],
    easeOut: [0.25, 0.46, 0.45, 0.94],
    easeIn: [0.42, 0, 1, 1],
    spring: {
      damping: 0.8,
      mass: 1,
      stiffness: 100,
      overshoot: 0.5,
    },
  },
};

export const BREAKPOINTS = {
  // Responsive design breakpoints
  small: 375,
  medium: 768,
  large: 1024,
};

/**
 * Helper function to get category color by name
 * @param {string} category - Category key (e.g., 'physics', 'biology')
 * @param {string} variant - Color variant ('main', 'light', 'dark')
 * @returns {string} Color value
 */
export const getCategoryColor = (category, variant = 'main') => {
  const categoryKey = category.toLowerCase();
  return COLORS.categories[categoryKey]?.[variant] || COLORS.categories.physics[variant];
};

/**
 * Helper to create consistent glassmorphic overlay
 */
export const createGlassStyle = (intensity = 'medium') => {
  return {
    backgroundColor: COLORS.glass[intensity],
    borderColor: COLORS.border.light,
    borderWidth: 1,
  };
};

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATION,
  BREAKPOINTS,
};