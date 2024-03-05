import React from "react";
import mainTheme from "../theme";
import { interFont } from "./font";


export const formStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
}


export const gridStyle = {
    padding: '0',
    height: '100vh',
    background: 'white',
    display: "flex", justifyContent: 'center',
    '@media (max-width: 600px)': {
        alignItems: 'center',
        height: '80vh'
    },
    '@media (min-width: 601px) and (max-width: 960px)': {
        height: '80vh',
    }
}


export const paperStyle = {
    margin: '100px',
    height: '65vh',
    width: '50%',
    '@media (max-width: 600px)': {
        margin: '10px',
        width: '80%',
        height: '50vh'
    },
    '@media (min-width: 601px) and (max-width: 960px)': {
        height: '35vh',
    }
}


export const containerStyle = {
    marginTop: '10px',
    '@media (max-width: 600px)': {
        marginTop: '20px',
    },
}


export const formAuthStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 0,
    width: '100%'
}

export const authHeaderStyle = {
    textAlign: 'center',
    fontSize: 30,
    lineHeight: '38px',
    fontWeight: 600

}


export const gridAuthStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
}


export const authSubmitButton = {
    width: '100%',
    borderRadius: '40px',
    textTransform: "none",
    fontSize: "16px",
    boxShadow: 'none',
    backgroundColor: mainTheme.palette.primary.main,
    "&:hover": {
        transform: 'scale(1.05)',
        backgroundColor: mainTheme.palette.primary.main,

    }
}


export const authLinkStyle = {
    marginTop: '20px',
    fontFamily: interFont,
    color: mainTheme.palette.primary.contrastText,
    fontSize: '18px',
    textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '10px',
    '&: hover': {
        color: mainTheme.palette.primary.main,
    }
}
