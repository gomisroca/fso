import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#171717',
    textSecondary: '#f5f5f5',
    primary: '#f5f5f5',
    secondary: '#24292e',
    muted: '#78716c',
    accent: '#0366d6'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: Platform.select({
    ios: 'Arial',
    android: 'Roboto',
    default: 'System',
  }),
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;