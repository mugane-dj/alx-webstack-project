import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material"
import mainTheme from "../../theme";
import { ArrowForward } from "@mui/icons-material";

const ProjectsComponent = () => {
    return <Grid container spacing={1} mt={2} sx={{ display: "flex", flexDirection: "row" }}>
         <Grid item xs={12} md={6}>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '45%' }}
                    image="/Images/Rectangle 6.png"
                    alt="Project photo"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 0 }}>
                    <CardContent sx={{}}>
                        <Typography component={'div'} variant={'h6'} color={mainTheme.palette.primary.contrastText}>
                            Restock of Brentwood food bank
                        </Typography>
                        <Typography variant={'subtitle2'} color="text.secondary" component={'div'}>
                            Amid the rising fears of tornado Alison,
                            we are urging the community to donate
                            towards the restocking of the Brentwood
                            food bank.
                        </Typography>
                        <Stack direction={'row'} sx={{mt: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                            <Stack direction={'column'}>
                                <Typography variant={'subtitle2'} component={'div'} color={mainTheme.palette.primary.contrastText}> 
                              Goal Amount: Ksh 50,000</Typography>
                                <Typography variant={'body2'}  component={'div'}>Amount Raised: Ksh 5,000 </Typography>

                            </Stack>
                            <Stack direction={'column'}>
                                <Typography variant="button" display="block" gutterBottom textTransform={'none'}
                                sx={{display: 'flex', flexDirection: 'row', alignItems: 'center',
                                 color: mainTheme.palette.primary.light}}>
                                    Donate Now <ArrowForward sx={{marginLeft: '7px'}}/>
                                </Typography>

                            </Stack>
                        </Stack>
                    </CardContent>
                </Box>

            </Card>
        </Grid>
        <Grid item xs={12} md={6}>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '45%' }}
                    image="/Images/Rectangle 6.png"
                    alt="Project photo"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 0 }}>
                    <CardContent sx={{}}>
                        <Typography component="div" variant="h6" color={mainTheme.palette.primary.contrastText}>
                            Restock of Brentwood food bank
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Amid the rising fears of tornado Alison,
                            we are urging the community to donate
                            towards the restocking of the Brentwood
                            food bank.
                        </Typography>
                        <Stack direction={'row'} sx={{mt: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                            <Stack direction={'column'}>
                                <Typography variant={'subtitle2'} component={'div'} color={mainTheme.palette.primary.contrastText}> 
                                Ksh 50,000</Typography>
                                <Typography variant={'body2'}  component={'div'}>Ksh 5,000 raised</Typography>

                            </Stack>
                            <Stack direction={'column'}>
                                <Typography variant="button" display="block" gutterBottom textTransform={'none'}
                                sx={{display: 'flex', flexDirection: 'row', alignItems: 'center',
                                 color: mainTheme.palette.primary.light}}>
                                    Donate Now <ArrowForward sx={{marginLeft: '7px'}}/>
                                </Typography>

                            </Stack>
                        </Stack>
                    </CardContent>
                </Box>

            </Card>
        </Grid>

    </Grid>
}


export default ProjectsComponent;