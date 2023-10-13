import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Inter } from "next/font/google"

const interFont = Inter({ subsets: ["latin"] })


const mainTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        }
    },

    typography: {
        body2: {
            fontSize: 12,
            lineHeight: '20px',
            fontWeight: 400,
        },
        body1: {
            fontSize: 14,
            lineHeight: '22px',
            fontWeight: 400
        },
        subtitle2: {
            fontSize: 16,
            lineHeight: '22px',
            fontWeight: 400
        },
        subtitle1: {
            fontSize: 16,
            lineHeight: '24px',
            fontWeight: 600
        },
        caption: {
            fontSize: 16,
            color: '#727580'
        },
        allVariants: {
            fontFamily: interFont.style.fontFamily,
        },
        h4: {
            fontSize: 20,
            lineHeight: '25px'
        },
        h5: {
            fontWeight: 600,
            fontSize: 16,
            lineheight: '20px',
        },
        h3: {
            fontSize: 20,
            fontWeight: 600,
            lineHeight: '28px'
        },

    },
    palette: {
        primary: {
            main: "#d00000",
            light: '#dc2f02',
            dark: '#9d0208',
            contrastText: '#03071e'

        },
        secondary: {
            main: "#faa307",
            light: '#ffba08',
            dark: '#f48c06',
            contrastText: '#fff'
        },
        warning: {
            main: "#ffb74d",
            light: '#ffe97d',
            dark: '#c88719',
            contrastText: '#000'
        },
        error: {
            main: "#ff5722",
            light: '#ff8a50',
            dark: '#c41c00',
            contrastText: '#000'
        }
        ,
        success: {
            main: "#4caf50",
            light: '#80e27e',
            dark: '#087f23',
            contrastText: '#fff'
        }
        ,
        info: {
            main: "#3D405B",
            light: '#fff',
            dark: '#8d8d8d',
            contrastText: '#000'
        },

        // info:
    },

});

export default mainTheme;
