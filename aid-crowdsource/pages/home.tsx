'use client'
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import ResponsiveAppBar from "../src/components/navbar";
import { ProjectsComponent } from "../src/app/projects/home";
import { Grid } from "@mui/material";
import { User } from "../src/interfaces/IUser";

const HomePage: NextPage = () => {
    const [isloaded, setIsloaded] = useState(false);
    const [isLoggedInUser, setIsLoggedInUser] = useState<User>();

    useEffect(() => {
        setIsloaded(true)
    //    setIsLoggedInUser(localStorage.getItem('user'))
    }, [])
    return <>
        <ResponsiveAppBar />
        <Grid container>
          <ProjectsComponent />
        </Grid>
    </>


}


export default HomePage;