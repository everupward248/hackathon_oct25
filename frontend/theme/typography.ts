import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '3rem',         // 48px
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
    fontFamily: '"Poppins", "Inter", sans-serif',
  },
  h2: {
    fontSize: '2.5rem',       // 40px
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.00833em',
    fontFamily: '"Poppins", "Inter", sans-serif',
  },
  h3: {
    fontSize: '2rem',         // 32px
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily: '"Poppins", "Inter", sans-serif',
  },
  h4: {
    fontSize: '1.5rem',       // 24px
    fontWeight: 600,
    lineHeight: 1.5,
    fontFamily: '"Poppins", "Inter", sans-serif',
  },
  h5: {
    fontSize: '1.25rem',      // 20px
    fontWeight: 500,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem',         // 16px
    fontWeight: 500,
    lineHeight: 1.6,
  },
  body1: {
    fontSize: '1rem',         // 16px
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',     // 14px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: '1rem',         // 16px
    fontWeight: 500,
    lineHeight: 1.75,
  },
  subtitle2: {
    fontSize: '0.875rem',     // 14px
    fontWeight: 500,
    lineHeight: 1.57,
  },
  caption: {
    fontSize: '0.75rem',      // 12px
    fontWeight: 400,
    lineHeight: 1.66,
  },
  overline: {
    fontSize: '0.75rem',      // 12px
    fontWeight: 500,
    lineHeight: 2.66,
    textTransform: 'uppercase',
    letterSpacing: '0.08333em',
  },
  button: {
    textTransform: 'none',    // Don't uppercase buttons by default
    fontWeight: 500,
  },
};
