import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material"
import mainTheme from "../../theme";
import { ArrowForward } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";

import { ProjectFrontend } from "../../../pages/interfaces/IProject";




export const ProjectsComponent = () => {
    const [projects, setProjects] = useState<ProjectFrontend[]>([])



    const getAllProjects = async () => {
        try {
            const response = await fetch('/api/v1/projects', {
                method: 'GET'
            });
            const data = await response.json();            // console.log(data, 'projects response data');
            setProjects(data as ProjectFrontend[]);
        } catch (error) {
            console.log('error fetching projects', error);
        }
    }

    getAllProjects()




    return <Grid container spacing={1} mt={2} sx={{ display: "flex", flexDirection: "row" }}>
        {
            projects.map((project, i) => 
        
        <Grid item xs={12} md={6} key={i}>
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
                           {project.title}
                        </Typography>
                        <Typography variant={'subtitle2'} color="text.secondary" component={'div'}>
                         {project.description}
                        </Typography>
                        <Stack direction={'row'} sx={{ mt: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Stack direction={'column'}>
                                <Typography variant={'subtitle2'} component={'div'} color={mainTheme.palette.primary.contrastText}>
                                    Goal Amount: Ksh {project.goalAmount}</Typography>
                                <Typography variant={'body2'} component={'div'}>Amount Raised: Ksh 5,000 </Typography>

                            </Stack>
                            <Stack direction={'column'}>
                                <Typography variant="button" display="block" gutterBottom textTransform={'none'}
                                    sx={{
                                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                                        color: mainTheme.palette.primary.light
                                    }}>
                                    Donate Now <ArrowForward sx={{ marginLeft: '7px' }} />
                                </Typography>

                            </Stack>
                        </Stack>
                    </CardContent>
                </Box>

            </Card>
        </Grid>
            )};
    </Grid>
}


// export default ProjectsComponent;