import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, TextField, Typography } from "@mui/material"
import mainTheme from "../../theme";
import { ArrowForward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Project, ProjectFrontend } from "../../interfaces/IProject";
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export const ProjectsComponent = () => {
    const [open, setOpen] = React.useState(false);
    const [projects, setProjects] = useState<Project[]>([])
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectProject, setSelectProject] = useState<ProjectFrontend>();
    const handleOpen = (projectId: any) => {
        // Update the open state for the specified project
        setOpen(true);
        getProjectById(projectId)
    };
    const closeModal = () => {
        alert('Donation Made Successfully');
        setOpen(false);

    };

    useEffect(() => {
        getAllProjects()
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


    const getAllProjects = async () => {
        try {
            const response = await fetch('/api/v1/projects', {
                method: 'GET'
            });
            const data = await response.json();
            setProjects(data as Project[]);
            console.log(data, 'allProjects')
        } catch (error) {
            console.log('error fetching projects', error);
        }
    }

    const deleteAproject = async (projectId: any) => {
        try {
            const response = await fetch(`api/v1/projects?projectId=${projectId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            alert('project sucessfully deleted');
            console.log(data, 'deleteProjectsData');
        } catch (error) {
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
            if (res.status === 200) {
                const data = await response.json();
                alert('Donation Made Successfully');
                console.log(data, 'success')
            }
        } catch (error) {
            console.log(error, 'donation error');
        }

    }


    return <Grid container spacing={1} mt={2} sx={{ display: "flex", flexDirection: "row" }}>
        {projects.map((project, i) => {
            const imageLocation = project.image;
            return (
                <Grid item xs={12} md={6} key={i}>
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '40%', height: '100%' }}
                            loading="lazy"
                            src={`${imageLocation}`}
                            alt="Project photo"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 0 }}>
                            <CardContent sx={{}}>
                                <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                                    <Typography sx={{ marginBottom: '15px' }}
                                        component={'div'} textTransform={'capitalize'} variant={'h6'} color={mainTheme.palette.primary.contrastText}>
                                        {project.title}
                                    </Typography>
                                    <Button sx={{ width: '70px', height: '30px', textTransform: 'none', backgroundColor: mainTheme.palette.primary.main }}
                                        variant={'contained'} onClick={() => deleteAproject(project._id)}>Delete</Button>
                                </Stack>
                                <Typography sx={{ lineHeight: '20px', marginBottom: '15px' }}
                                    variant={'subtitle1'} color="text.secondary" component={'div'}>
                                    {capitalizeFirstLetter(project.description)}
                                </Typography>
                                <Stack direction={'row'} sx={{ mt: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Stack direction={'column'} marginRight={2}>
                                        <Typography variant={'subtitle2'} component={'div'} color={mainTheme.palette.primary.contrastText}>
                                            Goal Amount: Ksh {project.goalAmount}
                                        </Typography>
                                        <Typography variant={'body2'} component={'div'}>
                                            Amount Raised: Ksh 5,000
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'}>
                                        <Button onClick={() => handleOpen(project._id)}>Donate Now<ArrowForward sx={{ marginLeft: '5px' }} />
                                        </Button>
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
                            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                                <Button sx={{ color: mainTheme.palette.primary.main }} onClick={closeModal}>Close</Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </Grid>
            );
        })}
    </Grid>
}

