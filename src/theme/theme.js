// src/theme/theme.js
/**
 * LERNO - Professional Design System v2
 * Inspired by: Brilliant, National Geographic, Apple Design
 * High-end dark mode with sophisticated typography and visual hierarchy
 */

export const COLORS = {
  // Primary Palette - Deep, elegant dark mode
  background: {
    primary: '#0A0E27',      // Deep navy black
    secondary: '#12172F',    // Slightly lighter navy
    tertiary: '#1A2247',     // Card background
    quaternary: '#22304D',   // Deeper cards
    overlay: 'rgba(10, 14, 39, 0.6)',
  },

  // Glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.12)',
    strong: 'rgba(255, 255, 255, 0.15)',
    xstrong: 'rgba(255, 255, 255, 0.2)',
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#B8C5D6',
    tertiary: '#7D8FA3',
    accent: '#E8F0FF',
    disabled: '#5A6B7D',
  },

  // Category Colors (Vibrant, Professional)
  categories: {
    physics: {
      main: '#FF6B9D',
      light: 'rgba(255, 107, 157, 0.15)',
      dark: 'rgba(255, 107, 157, 0.8)',
      bg: 'rgba(255, 107, 157, 0.08)',
    },
    biology: {
      main: '#00D084',
      light: 'rgba(0, 208, 132, 0.15)',
      dark: 'rgba(0, 208, 132, 0.8)',
      bg: 'rgba(0, 208, 132, 0.08)',
    },
    astronomy: {
      main: '#4A9EFF',
      light: 'rgba(74, 158, 255, 0.15)',
      dark: 'rgba(74, 158, 255, 0.8)',
      bg: 'rgba(74, 158, 255, 0.08)',
    },
    chemistry: {
      main: '#FFB946',
      light: 'rgba(255, 185, 70, 0.15)',
      dark: 'rgba(255, 185, 70, 0.8)',
      bg: 'rgba(255, 185, 70, 0.08)',
    },
    nature: {
      main: '#67E8B9',
      light: 'rgba(103, 232, 185, 0.15)',
      dark: 'rgba(103, 232, 185, 0.8)',
      bg: 'rgba(103, 232, 185, 0.08)',
    },
    mathematics: {
      main: '#D49EFF',
      light: 'rgba(212, 158, 255, 0.15)',
      dark: 'rgba(212, 158, 255, 0.8)',
      bg: 'rgba(212, 158, 255, 0.08)',
    },
    geography: {
      main: '#FF9A56',
      light: 'rgba(255, 154, 86, 0.15)',
      dark: 'rgba(255, 154, 86, 0.8)',
      bg: 'rgba(255, 154, 86, 0.08)',
    },
    philosophy: {
      main: '#A78BFA',
      light: 'rgba(167, 139, 250, 0.15)',
      dark: 'rgba(167, 139, 250, 0.8)',
      bg: 'rgba(167, 139, 250, 0.08)',
    },
    technology: {
      main: '#00FFA3',
      light: 'rgba(0, 255, 163, 0.15)',
      dark: 'rgba(0, 255, 163, 0.8)',
      bg: 'rgba(0, 255, 163, 0.08)',
    },
    history: {
      main: '#FF8C42',
      light: 'rgba(255, 140, 66, 0.15)',
      dark: 'rgba(255, 140, 66, 0.8)',
      bg: 'rgba(255, 140, 66, 0.08)',
    },
  },

  // Status
  status: {
    success: '#00D084',
    warning: '#FFB946',
    error: '#FF6B9D',
    info: '#4A9EFF',
  },

  // Borders
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    dark: 'rgba(255, 255, 255, 0.2)',
  },

  // Gradients
  gradients: {
    primary: ['#0A0E27', '#12172F'],
    accent: ['#FF6B9D', '#4A9EFF'],
    glass: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
    glow: ['rgba(74, 158, 255, 0.4)', 'transparent'],
  },
};

export const TYPOGRAPHY = {
  family: {
    // System fonts (best performance on mobile)
    regular: 'System',
    // For iOS: San Francisco
    // For Android: Roboto
  },

  sizes: {
    xs: 11,
    sm: 13,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 40,
  },

  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Professional text styles
  styles: {
    // Headings - Bold, commanding presence
    h1: {
      fontSize: 40,
      fontWeight: '800',
      lineHeight: 1.1,
      letterSpacing: -1,
    },
    h2: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 1.3,
      letterSpacing: -0.3,
    },
    h4: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 1.3,
      letterSpacing: 0,
    },
    
    // Subtitles - Elegant secondary text
    subtitle1: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 1.5,
      letterSpacing: 0.2,
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 1.5,
      letterSpacing: 0.1,
    },
    
    // Body - Primary content
    body1: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.7,
      letterSpacing: 0.3,
    },
    body2: {
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 1.6,
      letterSpacing: 0.2,
    },
    
    // Labels & small text
    label: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 0.5,
    },
    caption: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 1.4,
      letterSpacing: 0.4,
    },
    
    // Overline - Ultra small, uppercase
    overline: {
      fontSize: 11,
      fontWeight: '700',
      lineHeight: 1.3,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
    },
    
    // Special styles for premium feel
    display: {
      fontSize: 48,
      fontWeight: '800',
      lineHeight: 1,
      letterSpacing: -1.5,
    },
    
    featured: {
      fontSize: 22,
      fontWeight: '600',
      lineHeight: 1.4,
      letterSpacing: 0.15,
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
  '5xl': 56,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const SHADOWS = {
  // Elevation system
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  glow: {
    shadowColor: '#4A9EFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  easing: {
    easeInOut: [0.42, 0, 0.58, 1],
    easeOut: [0.25, 0.46, 0.45, 0.94],
    easeIn: [0.42, 0, 1, 1],
  },
};

export const BREAKPOINTS = {
  small: 375,
  medium: 768,
  large: 1024,
};

/**
 * Helper: Get category color
 */
export const getCategoryColor = (category, variant = 'main') => {
  const categoryKey = category.toLowerCase();
  return COLORS.categories[categoryKey]?.[variant] || COLORS.categories.physics[variant];
};

/**
 * Helper: Get category background
 */
export const getCategoryBg = (category) => {
  return getCategoryColor(category, 'bg');
};

/**
 * Helper: Create glass style
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
  getCategoryColor,
  getCategoryBg,
  createGlassStyle,
};