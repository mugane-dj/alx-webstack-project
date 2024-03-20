/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Box, Button, Card, CardContent, CardMedia, Grid, LinearProgress, Stack, TextField, Typography } from "@mui/material"
import mainTheme from "../../theme";
import { useEffect, useState } from "react";
import { Project, ProjectFrontend } from "../../interfaces/IProject";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import toast, { Toaster } from "react-hot-toast";
import { UserFrontend } from "../../interfaces/IUser";
import { useRouter } from 'next/router';
import { boxProjectStyle, cardMediaStyle, cardStyle, closeButtonStyle, deleteProjectButtonStyle, dialogActionsStyle, donateButton, gridStyle, projectDescription, projectInfoSection, submitButtonStyle } from "../../utils/styleProjectsPages";
import Cookies from "js-cookie";
import { useProjectsContext } from "../../context/projects";


export const ProjectsComponent = () => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectProject, setSelectProject] = useState<ProjectFrontend>();

    const loggedInUser = JSON.parse(Cookies.get('user')!) as UserFrontend;
    const {projects} = useProjectsContext();

    console.log(projects, 'allProjects context')

    const handleOpen = (projectId: any) => {
        // Update the open state for the specified project
        setOpen(true);
        getProjectById(projectId)
    };
    const closeModal = () => {
        setOpen(false);

    };

    useEffect(() => {
        // getAllProjects(),
        loggedInUser
    }, [])




    const getProjectById = async (sprojectId: any) => {
        try {
            const response = await fetch(`/api/v1/projects?projectId=${sprojectId}`, {
                method: 'GET'
            });
            const data = await response.json();
            setSelectProject(data as ProjectFrontend);
            console.log(data, 'selectedProject')
        } catch (error) {
            console.log('error fetching project by id', error);
        }
    }

    const handleRefresh = () => {
        router.reload();
    };




    const deleteAproject = async (projectId: any) => {
        try {
            const response = await fetch(`api/v1/projects?projectId=${projectId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            toast.success('Project Sucessfully Deleted');
            handleRefresh();
            console.log(data, 'deleteProjectsData');
        } catch (error) {
            toast.error('Error Deleting Project');
            console.log('error deletig projects')

        }
    }

    function capitalizeFirstLetter(sentence: string) {
        if (sentence.length === 0) {
            return sentence; // Handle empty input
        }

        const firstLetter = sentence[0].toUpperCase();
        const restOfSentence = sentence.slice(1);

        return firstLetter + restOfSentence;
    }

    const makeADonation = (projectId: any) => async (formSubmit: React.FormEvent<HTMLFormElement>) => {
        formSubmit.preventDefault();
        const fd = { phoneNumber, amount }
        console.log(projectId, phoneNumber, amount, 'query');
        try {
            const response = await fetch(`api/v1/payments/createPayment?projectId=${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fd),
            });
            const res = await response.json();
            console.log(res, 'create donation response')
            toast.success('Donation Made Successfully');

        } catch (error) {
            toast.error('Error Making a Donation')
            console.log(error, 'donation error');
        }

    }




    return (
            <Grid container spacing={1} mt={2} sx={gridStyle}>
                <Toaster />
                {projects?.map((project, i) => {
                    const imageLocation = project.image;
                    const progress = Math.round(project.amountRaised / project.goalAmount * 100);

                    return (
                        <Grid item xs={12} md={6} key={i}>
                            <Card sx={cardStyle}>
                                <CardMedia
                                    component="img"
                                    sx={cardMediaStyle}
                                    loading="lazy"
                                    src={`${imageLocation}`}
                                    alt="Project photo" />
                                <Box sx={boxProjectStyle}>
                                    <CardContent>
                                        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                                            <Typography sx={{ marginBottom: '15px' }}
                                                component={'div'} textTransform={'capitalize'} variant={'subtitle1'} color={mainTheme.palette.primary.contrastText}>
                                                {project.title}
                                            </Typography>
                                            {loggedInUser.projects.includes(project._id) && <Button sx={deleteProjectButtonStyle}
                                                variant={'contained'} onClick={() => deleteAproject(project._id)}>Delete</Button>}
                                        </Stack>
                                        <Typography sx={projectDescription}
                                            variant={'body1'} color="text.secondary" component={'div'}>
                                            {capitalizeFirstLetter(project.description)}
                                        </Typography>
                                        <Stack direction={'row'} sx={projectInfoSection}>
                                            <Stack direction={'column'} marginRight={2}>
                                                <Typography variant={'subtitle2'} component={'div'} color={mainTheme.palette.primary.contrastText}>
                                                    Goal Amount: Ksh {project.goalAmount}
                                                </Typography>
                                                <Typography variant={'body2'} pb={0.5} component={'div'}>
                                                    Amount Raised: Ksh {project.amountRaised}
                                                </Typography>
                                                <Stack direction={'row'} sx={{ alignItems: 'center' }}>
                                                    <LinearProgress variant={'determinate'} value={progress} sx={{ width: '70%' }} />
                                                    <Typography pl={1} variant={'body2'} sx={{ width: '20%' }}>{progress}%</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack direction={'row'} sx={{ right: 0, padding: 0 }}>
                                                <Button sx={donateButton}
                                                    onClick={() => handleOpen(project._id)}
                                                >Donate Now </Button>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Box>
                            </Card>
                            <Dialog open={open} onClose={closeModal} hideBackdrop // Disable the backdrop color/image
                                disableEnforceFocus // Let the user focus on elements outside the dialog
                            >
                                <Typography variant={'h6'} marginTop={2} marginBottom={1} color={mainTheme.palette.primary.main} textAlign={'center'}>Make A Donation Form</Typography>
                                <form onSubmit={makeADonation(selectProject?.id)}>
                                    <DialogContent>
                                        {/* {selectProject?.id} */}
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            name="phoneNumber"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            label="Phone Number"
                                            fullWidth
                                            variant="standard"
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            name="amount"
                                            label="Amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions sx={dialogActionsStyle}>
                                        <Button sx={submitButtonStyle}
                                            variant="contained" type="submit">
                                            Submit
                                        </Button>
                                        <Button sx={closeButtonStyle}
                                            onClick={closeModal}>Close</Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </Grid>
                    );
                })}
            </Grid>
    )
}


