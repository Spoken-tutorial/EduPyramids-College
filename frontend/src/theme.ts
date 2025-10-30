import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Central brand tokens — change once, updates everywhere
export const BRAND = {
  primary: '#2A3491',
  secondary: '#F9C60D',
  success: '#2e7d32',
  warning: '#ed6c02',
  error:   '#d32f2f',
  lightBg: '#ffffff',
  // lightBg: '#fafafa',
  // lightBg: '#EEEFFA',
  lightPaper: '#ffffff',
  lightBgHighlight: '#EEEFFA',
  borderColor: '#e0e0e0',

  
  darkBg: '#0b0f19',
  darkPaper: '#0f1422',
};

const pxToRem = (px: number) => `${px / 16}rem`; // MUI uses 16px = 1rem

export const getTheme = () =>
    createTheme({
        palette: {
            
            primary:   { main: BRAND.primary },
            secondary: { main: BRAND.secondary },
            success:   { main: BRAND.success },
            warning:   { main: BRAND.warning },
            error:     { main: BRAND.error },
            background: {
                default: BRAND.lightBg,
                paper:   BRAND.lightPaper,
                
            },
        },
        shape: { borderRadius: 6 },
        spacing: 8,
        typography: {
            // default family for most text
            // fontFamily: ['Inter', 'system-ui', 'Arial', 'sans-serif'].join(','),
            fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',

            // Headings — use Roboto at your sizes
            h1: { fontFamily: '"Roboto", sans-serif', fontWeight: 700, fontSize: pxToRem(36), lineHeight: 1.2 },
            h2: { fontFamily: '"Roboto", sans-serif', fontWeight: 700, fontSize: pxToRem(32), lineHeight: 1.25 },
            h3: { fontFamily: '"Roboto", sans-serif', fontWeight: 700, fontSize: pxToRem(20), lineHeight: 1.3 },
            // h1: { fontWeight: 700, fontSize: '2rem' },

            // Inter for body/labels at 12/14/16/18/20
            body2:    { fontSize: pxToRem(12) }, // Inter-12
            body1:    { fontSize: pxToRem(14) }, // Inter-14
            subtitle2:{ fontSize: pxToRem(16), fontWeight: 500 }, // Inter-16
            subtitle1:{ fontSize: pxToRem(18), fontWeight: 600 }, // Inter-18
            button:   { fontSize: pxToRem(20), textTransform: 'none', fontWeight: 600 }, // Inter-20 (or use caption/overline)
            // button: { textTransform: 'none', fontWeight: 600 },

            // Small text helpers (optional)
            caption:  { fontSize: pxToRem(12) },
            overline: { fontSize: pxToRem(12), letterSpacing: 1 },
        },
        // Global component styles (no need to pass sx everywhere)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 4,
          letterSpacing: 0.3,
        },
      },
      defaultProps: {
        variant: 'contained',
        color: 'secondary',
        size: 'small'
      },
    },
  
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider
        }),
      },
    },
  }
});

