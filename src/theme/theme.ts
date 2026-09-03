import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#7A1F2B',      // maroon
            light: '#9C3A46',
            dark: '#4E1319',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#6E6E6E',      // grey
            light: '#9E9E9E',
            dark: '#3E3E3E',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F5F5F5',   // light grey page background
            paper: '#FFFFFF',
        },
        text: {
            primary: '#2B2B2B',
            secondary: '#6E6E6E',
        },
    },
    shape: { borderRadius: 8 },
    typography: {
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #E0E0E0',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
            },
        },
    },
});