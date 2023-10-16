'use client'
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import { LoginComponent } from "../src/app/auth/login/page";

const LoginPage: NextPage = () => {
  const [isloaded, setIsloaded] = useState(false)
  useEffect(() => {
    setIsloaded(true)
  }, [])
  return <LoginComponent />
  

}


export default LoginPage;