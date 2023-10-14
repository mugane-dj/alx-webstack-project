'use client'
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import { LoginComponent } from "../src/app/auth/login/page";
import ResponsiveAppBar from "../src/components/navbar";
import ProjectsComponent from "../src/app/projects/home";

const LoginPage: NextPage = () => {
    const [isloaded, setIsloaded] = useState(false)
    useEffect(() => {
        setIsloaded(true)
    }, [])
    return <>
        <ResponsiveAppBar />
        <ProjectsComponent />
    </>


}


export default LoginPage;