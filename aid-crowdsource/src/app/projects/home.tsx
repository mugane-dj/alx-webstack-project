import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, TextField, Typography } from "@mui/material"
import mainTheme from "../../theme";
import { ArrowForward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Project } from "../../../pages/interfaces/IProject";
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import path from "path";


const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ProjectsComponent = () => {
    const [open, setOpen] = React.useState(false);
    const [projects, setProjects] = useState<Project[]>([])
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleOpen = () => { setOpen(true) };
    const closeModal = () => { setOpen(false) };



    useEffect(() => {
        getAllProjects()
    }, [])

    const getAllProjects = async () => {
        try {
            const response = await fetch('/api/v1/projects', {
                method: 'GET'
            });
            const data = await response.json();            // console.log(data, 'projects response data');
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
            alert('project sucessfully deleted')
            console.log(data, 'deleteProjectsData');
            // alert('project sucessfully deleted')
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
        const fd = new FormData(formSubmit.currentTarget);
        var object: any = {};
        fd.forEach(function (value, key) {
            object[key] = value;
        });
        console.log(JSON.stringify(object), 'donationObject')
        try {
            const response = await fetch(`api/v1/payments/createPayment?projectId=${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object),
            });
            const res = await response.json();
            console.log(res, 'create donation response')
            if (res.status === 200) {
                const data = await response.json();
                console.log(data, 'success')
            }
        } catch (error) {
            console.log(error, 'donation error');
        }
    
    }


    return <Grid container spacing={1} mt={2} sx={{ display: "flex", flexDirection: "row" }}>
        {projects.map((project, i) => {
            const filePath = project.image;
            // console.log(filePath, 'filePath')
            let ffilePath = filePath.split(path.sep);
            let pathy = "Path = " + ffilePath;
            let setPath = pathy.replace(/^.*[\\\/]/, '');
            // console.log(setPath, 'stPath')

            // console.log(pathy.replace(/^.*[\\\/]/, ''), 'pathy');


            return (
                <Grid item xs={12} md={6} key={i}>
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '45%' }}
                            loading="lazy"
                            src={`/Images/${setPath}`}             
                            alt="Project photo"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 0 }}>
                            <CardContent sx={{}}>
                                <Stack direction={'row'} sx={{justifyContent: 'space-between'}}>
                                    <Typography sx={{marginBottom: '15px'}}
                                    component={'div'} textTransform={'capitalize'}  variant={'h6'} color={mainTheme.palette.primary.contrastText}>
                                        {project.title}
                                    </Typography>
                                    <Button sx={{width: '70px', height: '30px', textTransform: 'none'}}
                                    variant={'contained'} onClick={() => deleteAproject(project._id)}>Delete</Button>
                                </Stack>
                                <Typography sx={{lineHeight: '20px', marginBottom: '15px'}}
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
                                    <Stack direction={'column'}>
                                        <Button onClick={handleOpen}>Donate Now<ArrowForward sx={{ marginLeft: '7px' }} />
                                        </Button>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Box>
                    </Card>
                    <Dialog open={open} onClose={closeModal}>
                    <Typography variant={'h6'} marginTop={2} marginBottom={1} color={mainTheme.palette.primary.main} textAlign={'center'}>Make A Donation Form</Typography>
                        <form onSubmit={makeADonation(project._id)}>
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
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                                <Button onClick={closeModal}>Close</Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </Grid>
            );
        })}
    </Grid>
}

