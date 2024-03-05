"use client"

import Head from "next/head";
import React, { useState } from "react";
import mainTheme from "../src/theme";
import { ThemeProvider } from "@mui/material";
// import ThemeProvider 


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isloaded, setIsloaded] = useState(false)

  return (
    <ThemeProvider theme={mainTheme}>
      <html lang="en">
        <Head>
          <title>Aid CrowdSource</title>
          <meta name="description" content="Donate to projects of your choice" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body style={{
          backgroundColor: 'white',
          padding: 0
        }} >
          {
            isloaded == false ? <> </> : children}</body>

      </html >
    </ThemeProvider>

  )
}