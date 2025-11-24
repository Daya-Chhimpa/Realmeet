/**
 * RealMeet Color Palette
 * Purple/Violet theme - Modern dating app design
 */

export const colors = {
  // Background Colors - Purple Theme
  background: {
    primary: '#0A0014', // Deep Dark Purple/Black
    secondary: '#1A0B2E', // Dark Purple
    darker: '#000000', // Pure Black
    gradient1: '#1A0B2E', // Dark Purple for gradients
    gradient2: '#2D1B4E', // Medium Purple for gradients
    cardBg: '#2D1B4E', // Card background purple
  },

  // Text Colors
  text: {
    primary: '#FFFFFF', // White - Headlines
    secondary: '#E0D4FF', // Light Purple/White - Subheadlines
    tertiary: '#B8A8D8', // Medium Purple - Footer
    disabled: '#6B5B8C', // Disabled text
  },

  // Brand Colors - Purple Theme
  brand: {
    purple: '#7B2FFF', // Primary Purple
    purpleDark: '#6420E0', // Dark Purple
    purpleLight: '#9D5CFF', // Light Purple
    violet: '#A855F7', // Vibrant Violet
    pink: '#E879F9', // Pink accent
    magenta: '#D946EF', // Magenta
  },

  // Accent Colors
  accent: {
    lightBlue: '#60A5FA', // Links
    lightPurple: '#C084FC', // Alternative links
    green: '#4ADE80', // Success/Online
    amber: '#FBBF24', // Warning
    red: '#F87171', // Error
    cyan: '#22D3EE', // Info
  },

  // UI Colors
  ui: {
    border: '#E0D4FF', // Light borders
    borderDark: '#4A3A6B', // Dark borders
    overlay: '#FFFFFF10', // 10% white overlay
    overlayPressed: '#FFFFFF20', // 20% white overlay
    shadow: 'rgba(123, 47, 255, 0.4)', // Purple shadow
    cardOverlay: 'rgba(0, 0, 0, 0.3)', // Dark overlay for cards
    blur: 'rgba(29, 11, 46, 0.8)', // Blur background
  },

  // Gradient Colors
  gradient: {
    purple: ['#7B2FFF', '#A855F7', '#D946EF'], // Purple gradient
    dark: ['#0A0014', '#1A0B2E', '#2D1B4E'], // Dark gradient
    card: ['#2D1B4E', '#3D2B5E'], // Card gradient
  },

  // Transparent
  transparent: 'transparent',
};

export type Colors = typeof colors;
