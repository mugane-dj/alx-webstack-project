import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Button, Grid, Link, Paper, Typography } from '@mui/material'
import mainTheme from '../src/theme'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { mulishFont } from '../src/utils/font'

console.log(mulishFont, 'mullll');

type ConnectionStatus = {
  isConnected: boolean
}

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Grid container sx={{ display: "flex", flexDirection: 'row', height: '100%', width: '100%' }}>
      <Grid item xs={12}
        sx={{
          width: '100%',
          display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end',
          // height: '10%', border: 'solid 2px black'
        }}>
        <Button href='/login' variant='contained' sx={{
          backgroundColor: mainTheme.palette.primary.main,
          textTransform: 'none', marginRight: '10px',
          borderRadius: '30px',
          width: '90px',
          '&: hover': {
            color: mainTheme.palette.primary.light,
            textTransform: 'none',
            border: `1px solid ${mainTheme.palette.primary.light}`,
            backgroundColor: 'transparent'
          }
        }}>Login
        </Button>
        <Button variant='outlined' sx={{
          color: mainTheme.palette.primary.main,
          textTransform: 'none',
          border: `1px solid ${mainTheme.palette.primary.main}`,
          borderRadius: '30px',
          width: '100px',
          '&: hover': {
            color: 'white',
            backgroundColor: mainTheme.palette.primary.light,
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
        <Typography component={'div'} variant={'h3'}
          sx={{ color: mainTheme.palette.primary.main, textAlign: 'center', }}
        >Pledge to your favorite aid
          projects seamlessly</Typography>
        <Typography variant='h4' sx={{ color: mainTheme.palette.primary.contrastText, textAlign: 'center', marginTop: '30px', marginBottom: "30px" }}>
          How It Works
        </Typography>
        <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px' }}>
              <HowToRegIcon fontSize='large' sx={{ color: mainTheme.palette.secondary.main }} />
              <Typography variant='h6'> Create An Account. </Typography>
              <Typography variant='subtitle2'>To get started, click on the "Sign Up" button and provide your basic information.
                After creating your account, you'll have access to your personalized dashboard where you can manage your pledges and contributions.
                Having an account allows you to track the projects you support and receive updates on their progress</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px' }}>
              <WysiwygIcon fontSize='large' sx={{ color: mainTheme.palette.secondary.main }} />
              <Typography variant='h6'> Create A Project. </Typography>
              <Typography variant='subtitle2'>Begin by clicking the "Create a Project" button on your dashboard.
                Fill out the project details, including the project's name, description, fundraising goal, and a compelling story to attract potential donors.
                You can also upload images or videos to make your project more appealing.
                Define how funds will be used and set a deadline for reaching your fundraising goal.
                Once your project is created, it will be visible to potential donors.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px' }}>
              <CreditCardIcon fontSize='large' sx={{ color: mainTheme.palette.secondary.main }} />
              <Typography variant='h6'> Await Donations. </Typography>
              <Typography variant='subtitle2'>
                After creating a project, share it with your network through social media, email, or other means.
                Donors can browse the available projects and make contributions to those they support.
                You'll receive notifications when someone pledges to your project, and you can thank donors personally.
                The platform ensures secure and efficient handling of donations, and you can track the progress of your fundraising campaign in real-time.
                When your project reaches its funding goal, you can start implementing it and making a positive impact.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  )
}
