<<<<<<< HEAD
import clientPromise from '../lib/mongodb'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Button, Grid, Paper, Typography } from '@mui/material'
import mainTheme from '../src/theme'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import CreditCardIcon from '@mui/icons-material/CreditCard';

=======
import Head from 'next/head'
>>>>>>> main

export default function Home() {
  return (
<<<<<<< HEAD
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
          '&: hover': {
            boxShadow: 'none',
            color: mainTheme.palette.primary.light,
            textTransform: 'none',
            border: `1px solid ${mainTheme.palette.primary.light}`,
            backgroundColor: 'transparent'
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
=======
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
>>>>>>> main
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
        <Typography variant={'h4'} sx={{ color: mainTheme.palette.primary.contrastText, textAlign: 'center', marginTop: '30px', marginBottom: "30px" }}>
          How It Works
        </Typography>
        <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px' }}>
              <HowToRegIcon fontSize='large' sx={{ color: mainTheme.palette.secondary.main }} />
              <Typography variant={'h6'}> Create An Account. </Typography>
              <Typography variant={'subtitle2'}>To get started, click on the "Sign Up" button and provide your basic information.
                After creating your account, you'll have access to your personalized dashboard where you can manage your pledges and contributions.
                Having an account allows you to track the projects you support and receive updates on their progress</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px' }}>
              <WysiwygIcon fontSize='large' sx={{ color: mainTheme.palette.secondary.main }} />
              <Typography variant={'h6'}> Create A Project. </Typography>
              <Typography variant={'subtitle2'}>Begin by clicking the "Create a Project" button on your dashboard.
                Fill out the project details, including the project's name, description, fundraising goal, and a compelling story to attract potential donors.
                You can also upload images or videos to make your project more appealing.
                Define how funds will be used and set a deadline for reaching your fundraising goal.
                Once your project is created, it will be visible to potential donors.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 10px' }}>
              <CreditCardIcon fontSize='large' sx={{ color: mainTheme.palette.secondary.main }} />
              <Typography variant={'h6'}> Await Donations. </Typography>
              <Typography variant={'subtitle2'}>
                After creating a project, 
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