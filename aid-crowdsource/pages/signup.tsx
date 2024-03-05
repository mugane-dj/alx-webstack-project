'use client'
import React from "react";
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import { SignupComponent } from "../src/app/auth/signup/signup";
import { ThemeProvider } from "@mui/material";
import mainTheme from "../src/theme";

const SignupPage: NextPage = () => {
  const [isloaded, setIsloaded] = useState(false)
  useEffect(() => {
    setIsloaded(true)
  }, [])
  return <>
    <ThemeProvider theme={mainTheme}>
      <SignupComponent />

    </ThemeProvider>
  </>


}


export default SignupPage;