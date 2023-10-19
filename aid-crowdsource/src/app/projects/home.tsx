import { Box, Button, Card, CardContent, CardMedia, Grid, Modal, Stack, TextField, Typography } from "@mui/material"
import mainTheme from "../../theme";
import { ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import { ProjectFrontend } from "../../../pages/interfaces/IProject";
import React from "react";



const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ProjectsComponent = () => {
    const [open, setOpen] = React.useState(false);
    const [projects, setProjects] = useState<ProjectFrontend[]>([])
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                        <Typography onClick={handleOpen} variant="button" display="block" gutterBottom textTransform={'none'}
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
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} >
                            <form >
                                <Typography variant={'h6'} color={mainTheme.palette.primary.main} textAlign={'center'}>Make a donation</Typography>
                                <Stack direction={'column'} marginBottom={1}>
                                    <Typography variant={'body1'} color={mainTheme.palette.primary.contrastText}>Phone Number</Typography>
                                    <TextField variant='outlined' name='title' value={phoneNumber} sx={{ width: '100%' }} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </Stack>
                                <Stack direction={'column'} marginBottom={1}>
                                    <Typography variant={'body1'} color={mainTheme.palette.primary.contrastText}>Project Description</Typography>
                                    <TextField variant='outlined' name='description' value={amount} multiline sx={{ width: '100%' }} onChange={(e) => setAmount(e.target.value)} />
                                </Stack>
                                <Button type='submit'>Submit</Button>
                            </form>
                        </Box>
                    </Modal>
                </Grid>
            )};
    </Grid>
}