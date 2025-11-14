import { Platform } from 'react-native';

export const fontFamily = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

if (Platform.OS === 'android') {
  fontFamily.regular = 'sans-serif';
  fontFamily.medium = 'sans-serif-medium';
  fontFamily.semiBold = 'sans-serif-medium';
  fontFamily.bold = 'sans-serif-bold';
} else if (Platform.OS === 'ios') {
  fontFamily.regular = 'System';
  fontFamily.medium = 'System';
  fontFamily.semiBold = 'System';
  fontFamily.bold = 'System';
}

export const typography = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  body1: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  body2: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  button: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
};

export default typography;
