import { Box, Button, Card, CardContent, CardMedia, Grid,  Stack, TextField, Typography } from "@mui/material"
import mainTheme from "../../theme";
import { ArrowForward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Project } from "../../../pages/interfaces/IProject";
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



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
                                        <Typography variant={'body2'} component={'div'}>Amount Raised: Ksh 5,000  </Typography>
                                    </Stack>
                                    <Stack direction={'column'}>
                                        <Button onClick={handleOpen}>DonateNow<ArrowForward sx={{ marginLeft: '7px' }} />
                                        </Button>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Box>
                    </Card>
                    <Dialog open={open} onClose={closeModal}>
                        <DialogTitle>{`Sub ${project._id}`}Make a Donation Form</DialogTitle>
                        <form onSubmit={makeADonation(project._id)}>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => (setPhoneNumber(e.target.value))}
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
                                    onChange={(e) => (setAmount(e.target.value))}
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button variant="contained" type="submit">Submit</Button>
                                <Button onClick={closeModal}>Cancel</Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </Grid>


            )};

    </Grid >
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
            body: JSON.stringify(object)
        });
        const res = await response.json();
        console.log(res, 'create donation response')
        if (res.status === 200) {
            const data = await response.json();
            console.log(data, 'success')
        } 
        // else if (response.status === 400) {
        //     const errorData = await response.json();
        //     console.log('M-Pesa API Error:', errorData); // Log the error details
        //     res.status(400).json({ message: errorData.message });
        // } else {
        //     console.log('Unexpected Response:', response.status, response.statusText);
        //     res.status(response.status).json({ message: response.statusText });
        // }   
     } catch (error) {
        console.log(error, 'donation error');
        // alert('failed to send donation');
    }

}