import React, { useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material'
import mainTheme from '../src/theme'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';


export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <ThemeProvider theme={mainTheme}>
      <Grid container sx={{ display: "flex", flexDirection: 'row', height: '100%', width: '100%' }}>
        <Grid item xs={12}
          sx={{
            width: '100%',
            display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end',
          }}>
          <Button href='/login' variant='contained' sx={{
            backgroundColor: mainTheme.palette.primary.main,
            textTransform: 'none', marginRight: '10px',
            borderRadius: '30px',
            width: '90px',
            boxShadow: 'none',
            color: 'white',
            '&: hover': {
              transform: 'scale(1.05)',
              backgroundColor: mainTheme.palette.primary.main,

            }
          }}>Login
          </Button>
          <Button href='/signup' variant='outlined' sx={{
            boxShadow: 'none',
            color: mainTheme.palette.primary.main,
            textTransform: 'none',
            border: `1px solid ${mainTheme.palette.primary.main}`,
            borderRadius: '30px',
            width: '100px',
            '&: hover': {
              boxShadow: 'none',
              color: 'white',
              backgroundColor: mainTheme.palette.primary.main,
              border: 'transparent'
            }

          }}>Sign Up</Button>

        </Grid>
        <Grid item xs={12}
          sx={{
            padding: '80px 20px 0 20px',
            width: '100%',
            display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: 'flex-start',
            height: '90%',
          }}>
          <Typography component={'div'} variant={'h2'}
            sx={{ color: mainTheme.palette.primary.main, textAlign: 'center', }}
          >Donate to your favorite aid
            projects seamlessly</Typography>
          <Typography variant={'h3'} sx={{ color: mainTheme.palette.primary.contrastText, textAlign: 'center', marginTop: '30px', marginBottom: "30px" }}>
            How It Works
          </Typography>
          <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px' }}>
                <HowToRegIcon fontSize='large' sx={{ color: mainTheme.palette.primary.main }} />
                <Typography variant={'h6'}> Create An Account. </Typography>
                <Typography variant={'body1'}>To get started, click on the &quot;Sign Up&quot; button and provide your basic information.
                  After creating your account, you&apos;ll have access to your personalized dashboard where you can manage your pledges and contributions.
                  Having an account allows you to track the projects you support and receive updates on their progress</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px' }}>
                <WysiwygIcon fontSize='large' sx={{ color: mainTheme.palette.primary.main }} />
                <Typography variant={'h6'}> Create A Project. </Typography>
                <Typography variant={'body1'}>Begin by clicking the &quot;Create a Project&quot; button on your dashboard.
                  Fill out the project details, including the project&apos;s name, description, fundraising goal, and a compelling story to attract potential donors.
                  You can also upload images or videos to make your project more appealing.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px' }}>
                <CreditCardIcon fontSize='large' sx={{ color: mainTheme.palette.primary.main }} />
                <Typography variant={'h6'}> Await Donations. </Typography>
                <Typography variant={'body1'}>
                  After creating a project,
                  Donors can browse the available projects and make contributions to those they support.
                  The platform ensures secure and efficient handling of donations, and you can track the progress of your fundraising campaign in real-time.
                  When your project reaches its funding goal, you can start implementing it and making a positive impact.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </ThemeProvider>
  )
}