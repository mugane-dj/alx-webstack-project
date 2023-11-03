'use client'
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import ResponsiveAppBar from "../src/components/navbar";
import { ProjectsComponent } from "../src/app/projects/home";
import { Grid, ThemeProvider} from "@mui/material";
import mainTheme from "../src/theme";
import MobileBottomNavigation from "../src/components/mobilenavigation";

const HomePage: NextPage = () => {
    const [isloaded, setIsloaded] = useState(false);
    const isSmallScreen =  mainTheme.breakpoints.down('sm');


    useEffect(() => {
        setIsloaded(true)
    }, [])
    return <>
         <ThemeProvider theme={mainTheme}>
            <ResponsiveAppBar />
            <Grid container>
                <ProjectsComponent />
                {isSmallScreen ? <MobileBottomNavigation /> : null}
            </Grid>
        </ThemeProvider>
    </>


}


export default HomePage;