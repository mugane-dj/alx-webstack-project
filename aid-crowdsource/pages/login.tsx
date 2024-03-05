'use client'
import React from "react";
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import LoginComponent from "../src/app/auth/login/login";
import mainTheme from "../src/theme";
import { ThemeProvider } from "@mui/material";

const LoginPage: NextPage = () => {
  const [isloaded, setIsloaded] = useState(false)
  useEffect(() => {
    setIsloaded(true)
  }, [])
  return <>
    <ThemeProvider theme={mainTheme}>
      <LoginComponent />
    </ThemeProvider>
  </>


}


export default LoginPage;