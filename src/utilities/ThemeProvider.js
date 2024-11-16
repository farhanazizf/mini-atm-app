import {Colors, Typography, Spacings} from 'react-native-ui-lib';

// Configure colors
Colors.loadColors({
  primary: '#6200EE',
  secondary: '#03DAC5',
  error: '#B00020',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  textPrimary: '#212121',
  textSecondary: '#757575',
});

// Configure typography
Typography.loadTypographies({
  heading: {fontSize: 24, fontWeight: '600', lineHeight: 32},
  body: {fontSize: 16, fontWeight: '400', lineHeight: 24},
  caption: {fontSize: 12, fontWeight: '400', lineHeight: 16},
});

// Configure spacings
Spacings.loadSpacings({
  page: 20,
  card: 15,
  button: 10,
});
