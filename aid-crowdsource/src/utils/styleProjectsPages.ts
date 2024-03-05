import React from "react";
import mainTheme from "../theme";


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


export const donateButton = {
    color: 'blue',
    '&:hover': {
        transform: 'scale(1.05)'
    }
}

///Navbar styling

export const appBarStyle = {
    background: mainTheme.palette.primary.main
}

export const toolbBarStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}

export const logoHeader = {
    mr: 1,
    display: 'flex',
    fontWeight: 700,
    textDecoration: 'none',
    color: 'white'

}

export const menuStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: "30%",
    paddingLeft: "auto",
    paddingRight: 0,
    marginRight: 'auto',
    '@media (max-width: 600px)': {
        display: 'none',
    },

}


export const listItemStyle = {
    "&:hover": {
        background: "transparent",
    },
}

export const listItemButton = {
    textAlign: 'center',
    padding: 0,
    "&:hover": {
        background: 'transparent',
    },
}


export const listItemText = {
    fontSize: '20px',
    "&:hover": {
        transform: 'scale(1.2)'
    },
    color: 'white',
    fontWeight: 600
}

export const createProjectButton = {
    backgroundColor: "white", color: mainTheme.palette.primary.main,
    textTransform: "none", borderRadius: '30px',
    '&: hover': {
        backgroundColor: "white", color: mainTheme.palette.primary.main,
        textTransform: "none", borderRadius: '30px', transform: 'scale(1.05)'
    },
    '@media (max-width: 600px)': {
        height: '100%', width: '100px', marginRight: '10px'
    },
}

export const boxNavbarStyle = {
    flexGrow: 0,
    '@media (max-width: 600px)': {
        right: 0, marginTop: '10px'
    },
}


export const avatarStyle = {
    marginLeft: '10px',
}

export const textFieldStyle = {
    width: '100%',
}

export const formBoxStyle = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 4,
    p: 4,
    borderRadius: '8px'
}

