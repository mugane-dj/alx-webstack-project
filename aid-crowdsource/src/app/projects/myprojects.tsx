/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, TextField, Typography } from "@mui/material"
import mainTheme from "../../theme";
import { ArrowForward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Project, ProjectFrontend } from "../../interfaces/IProject";
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { UserFrontend } from "../../interfaces/IUser";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";



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


export const MyProjectsComponent = () => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState<UserFrontend>()
    const [projects, setProjects] = useState<Project[]>([])
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectProject, setSelectProject] = useState<ProjectFrontend>();

    const loggedInUser = JSON.parse(localStorage.getItem('user')!) as UserFrontend;
    console.log(loggedInUser, 'myprojects');



    const handleOpen = (projectId: any) => {
        setOpen(true);
        getProjectById(projectId)
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handleRefresh = () => {
        router.reload();
    };

    useEffect(() => {
        loggedInUser;
        getAllProjects()
        getUserDetails(loggedInUser.id)
    }, [])

    async function getUserDetails(userId: string) {
        try {
            const response = await fetch(`/api/v1/users?userId=${userId}`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data, 'userdata');
            setUser(data);

            // Now, save the updated user data to localStorage
            try {
                localStorage.setItem('user', JSON.stringify(data));
                console.log('User data saved to localStorage');
                console.log(user, 'loguser')
            } catch (localStorageError) {
                console.log('Error saving user data to localStorage:', localStorageError);
            }
            return data;

        } catch (error) {
            console.log('error getting user data', error);
        }

    }

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
            const response = await fetch(`/api/v1/projects`, {
                method: 'GET'
            });
            const data = await response.json();
            setProjects(data as Project[]);
            // console.log(userProjs, 'us')
            console.log(data, 'islogged')
        } catch (error) {
            console.log('error fetching projects', error);
        }
    }

    const userProjs = projects.filter(project => user?.projects.includes(project._id));
    console.log(userProjs, 'userProjs');

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
            toast.error('Error Making A Donation')
            console.log(error, 'donation error');;
        }

    }


    return <Grid container spacing={1} mt={2} sx={{ display: "flex", flexDirection: "row" }}>
        <Toaster />
        {userProjs.map((userproject, i) => {
            const imageLocation = userproject.image;
            return (
                <Grid item xs={12} md={6} key={i}>
                    <Card sx={{
                        display: 'flex',
                        '@media (max-width: 600px)': {
                            flexDirection: 'column',
                        },
                    }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: '40%', height: '100%', padding: '10px',
                                '@media (max-width: 600px)': {
                                    width: '100%',
                                },
                            }}
                            loading="lazy"
                            src={`${imageLocation}`}
                            alt="Project photo" />
                        <Box sx={{
                            display: 'flex', flexDirection: 'column', width: '60%', paddingTop: 0,
                            '@media (max-width: 600px)': {
                                width: '100%',
                            },
                        }}>
                            <CardContent sx={{}}>
                                <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                                    <Typography sx={{ marginBottom: '15px' }}
                                        component={'div'} textTransform={'capitalize'} variant={'h6'} color={mainTheme.palette.primary.contrastText}>
                                        {userproject.title}
                                    </Typography>
                                    <Button sx={{
                                        width: '70px', height: '30px', textTransform: 'none', backgroundColor: mainTheme.palette.primary.light, color: 'white',
                                        '&:hover': {
                                            backgroundColor: mainTheme.palette.primary.main,
                                            boxShadow: 'none'
                                        }
                                    }}
                                        variant={'contained'} onClick={() => deleteAproject(userproject._id)}>Delete</Button>
                                </Stack>
                                <Typography sx={{ lineHeight: '20px', marginBottom: '15px' }}
                                    variant={'subtitle1'} color="text.secondary" component={'div'}>
                                    {capitalizeFirstLetter(userproject.description)}
                                </Typography>
                                <Stack direction={'row'} sx={{ mt: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Stack direction={'column'} marginRight={2}>
                                        <Typography variant={'subtitle2'} component={'div'} color={mainTheme.palette.primary.contrastText}>
                                            Goal Amount: Ksh {userproject.goalAmount}
                                        </Typography>
                                        <Typography variant={'body2'} component={'div'}>
                                            Amount Raised: Ksh {userproject.amountRaised}
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'}>
                                        <Button sx={{ color: 'blue' }}
                                            onClick={() => handleOpen(userproject._id)}>Donate Now<ArrowForward sx={{ marginLeft: '5px' }} />
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
                                <Button sx={{
                                    backgroundColor: 'blue', color: 'white', '&:hover': {
                                        backgroundColor: 'blue', color: 'white', transform: 'scale(1.05)'
                                    }
                                }} variant="contained" type="submit">
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

