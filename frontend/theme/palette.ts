import { PaletteOptions } from '@mui/material/styles';

export const palette: PaletteOptions = {
  primary: {
    main: '#0277BD',      // Deep Caribbean Blue
    light: '#58A5F0',     // Light Sky Blue
    dark: '#01579B',      // Deep Ocean
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FF6F00',      // Sunset Orange
    light: '#FFA040',     // Warm Sand
    dark: '#C43E00',      // Deep Sunset
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#2E7D32',      // Caribbean Green
    light: '#60AD5E',     // Light Green
    dark: '#005005',      // Deep Green
  },
  warning: {
    main: '#F57C00',      // Tropical Mango
    light: '#FFB74D',     // Light Orange
    dark: '#E65100',      // Deep Orange
  },
  error: {
    main: '#D32F2F',      // Coral Red
    light: '#EF5350',     // Light Red
    dark: '#C62828',      // Deep Red
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
  },
};
