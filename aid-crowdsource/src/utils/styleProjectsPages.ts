import React from "react";
import mainTheme from "../theme";
import { interFont } from "./font";



export const gridStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row"
}

export const cardStyle = {
    display: 'flex',
    '@media (max-width: 600px)': {
        flexDirection: 'column',
    },
}


export const cardMediaStyle = {
    width: '40%',
    height: '100%',
    padding: '10px',
    '@media (max-width: 600px)': {
        width: '100%',
    },
}


export const boxProjectStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    paddingTop: 0,
    '@media (max-width: 600px)': {
        width: '100%',
    },
}

export const deleteProjectButtonStyle = {
    width: '70px', height: '30px', textTransform: 'none', backgroundColor: mainTheme.palette.primary.light, color: 'white',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: mainTheme.palette.primary.light, boxShadow: 'none',
        transform: 'scale(1.05)'

    }
}


export const projectDescription = {
    lineHeight: '20px',
    marginBottom: '15px'
}

export const projectInfoSection = {
    mt: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0
}


export const dialogActionsStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const submitButtonStyle = {
    backgroundColor: '#0C78F3',
    color: 'white',
    '&:hover': {
        backgroundColor: '#0C78F3',
        color: 'white',
        transform: 'scale(1.05)'
    }
}

export const closeButtonStyle = {
    color: mainTheme.palette.primary.main,
    border: `solid 1px ${mainTheme.palette.primary.main}`,
    '&:hover': {
        transform: 'scale(1.05)'
    }
}


