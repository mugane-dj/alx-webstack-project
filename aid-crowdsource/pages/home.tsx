'use client'
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import ResponsiveAppBar from "../src/components/navbar";
import { ProjectsComponent } from "../src/app/projects/home";
import { Grid, useMediaQuery } from "@mui/material";
import mainTheme from "../src/theme";
import MobileBottomNavigation from "../src/components/mobilenavigation";

const HomePage: NextPage = () => {
    const [isloaded, setIsloaded] = useState(false);
    const isSmallScreen =  mainTheme.breakpoints.down('sm');


    useEffect(() => {
        setIsloaded(true)
    }, [])
    return <>
        <ResponsiveAppBar />
        <Grid container>
          <ProjectsComponent />
         <MobileBottomNavigation/> 
        </Grid>
    </>


}


export default HomePage;