'use client'
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import ResponsiveAppBar from "../src/components/navbar";
import { Grid } from "@mui/material";
import { MyProjectsComponent } from "../src/app/projects/myprojects";
import mainTheme from "../src/theme";
import MobileBottomNavigation from "../src/components/mobilenavigation";
import { ThemeProvider } from "@emotion/react";
import { ProjectsProvider } from "../src/context/projects";

const MyprojectsPage: NextPage = () => {
    const [isloaded, setIsloaded] = useState(false);
    const isSmallScreen = mainTheme.breakpoints.down('sm');


    useEffect(() => {
        setIsloaded(true)
    }, [])
    return <>
        <ProjectsProvider>

            <ThemeProvider theme={mainTheme}>
                <ResponsiveAppBar />
                <Grid container>
                    <MyProjectsComponent />
                    {isSmallScreen ? <MobileBottomNavigation /> : null}
                </Grid>

            </ThemeProvider>
        </ProjectsProvider>

    </>


}


export default MyprojectsPage;