'use client'
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import ResponsiveAppBar from "../src/components/navbar";
import { Grid } from "@mui/material";
import { User } from "../src/interfaces/IUser";
import { MyProjectsComponent } from "../src/app/projects/myprojects";

const MyprojectsPage: NextPage = () => {
    const [isloaded, setIsloaded] = useState(false);
    const [isLoggedInUser, setIsLoggedInUser] = useState<User>();

    useEffect(() => {
        setIsloaded(true)
        //    setIsLoggedInUser(localStorage.getItem('user'))
    }, [])
    return <>
        <ResponsiveAppBar />
        <Grid container>
            <MyProjectsComponent />
        </Grid>
    </>


}


export default MyprojectsPage;