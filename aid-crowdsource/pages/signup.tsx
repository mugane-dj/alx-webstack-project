'use client'
import { NextPage } from "next";
import { useState, useEffect } from 'react'
import { SignupComponent } from "../src/app/auth/signup/page";

const SignupPage: NextPage = () => {
  const [isloaded, setIsloaded] = useState(false)
  useEffect(() => {
    setIsloaded(true)
  }, [])
  return <SignupComponent  />
  

}


export default SignupPage;