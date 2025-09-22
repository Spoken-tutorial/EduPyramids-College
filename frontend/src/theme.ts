import { createTheme } from '@mui/material/styles';

// Central brand tokens — change once, updates everywhere
const BRAND = {
  primary: '#2A3491',
  secondary: '#F9C60D',
  success: '#2e7d32',
  warning: '#ed6c02',
  error:   '#d32f2f',
//   lightBg: '#fafafa',
  lightBg: '#EEEFFA',
  lightPaper: '#ffffff',

  
  darkBg: '#0b0f19',
  darkPaper: '#0f1422',
};

export const getTheme = (mode: 'light' | 'dark' = 'light') =>
    createTheme({
        palette: {
            mode,
            primary:   { main: BRAND.primary },
            secondary: { main: BRAND.secondary },
            success:   { main: BRAND.success },
            warning:   { main: BRAND.warning },
            error:     { main: BRAND.error },
            background: {
                default: mode === 'light' ? BRAND.lightBg : BRAND.darkBg,
                paper:   mode === 'light' ? BRAND.lightPaper : BRAND.darkPaper,
            },
        },
        shape: { borderRadius: 12 },
        spacing: 8,
        typography: {
            fontFamily: ['Inter', 'system-ui', 'Arial', 'sans-serif'].join(','),
            h1: { fontWeight: 700, fontSize: '2rem' },
            button: { textTransform: 'none', fontWeight: 600 },
        },
        // Global component styles (no need to pass sx everywhere)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 12,
          letterSpacing: 0.3,
        },
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary',
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
