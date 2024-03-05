import React from "react";
import { VisibilityOff, Visibility, Email, } from "@mui/icons-material"
import { Grid, Container, IconButton, Typography, TextField, InputAdornment, Button, Paper, Link } from "@mui/material"
import { FormEvent, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import toast, { Toaster } from "react-hot-toast";
import { authHeaderStyle, authLinkStyle, authSubmitButton, formAuthStyle, gridAuthStyle, gridStyle, paperStyle } from "../../../utils/styleAuthPages";
import Cookies from 'js-cookie';


export const SignupComponent = () => {
    const [password, setPassword] = useState('');
    const [cpassword, setConfirmPassword] = useState('');
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (submit: FormEvent<HTMLFormElement>) => {
        submit.preventDefault()
        if (!/^(?=.*\d.*\d)[a-zA-Z0-9]+$/.test(username)) {
            toast.error('Username should be alphanumeric and contain atleast 2 numbers');
            return;
        }
        if (password !== cpassword) {
            toast.error('Passwords do not match');
            return;
        } else if (password.length < 8 || cpassword.length < 8) {
            toast.error('Password should have a minimum of 8 characters')
            return;
        }

        const formData = { username, email, password }
        console.log(formData, 'fd')
        try {
            const response = await fetch('/api/v1/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
         console.log(Cookies.set('user', JSON.stringify(formData)), 'cookieUser');
            
            console.log(localStorage, 'reg')
            console.log(response.json, "data");
            toast.success('User Created Successfully', { position: 'top-center' })
            // alert('User Created Successfully')
            // window.location.href = "/login";
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container sx={gridStyle}>
            <Toaster />
            <Paper elevation={4} sx={{...paperStyle, 
            '@media (min-width: 601px) and (max-width: 960px)': {
                height: '45vh',
            }}}>
                <form onSubmit={handleSubmit} action="#"
                    style={formAuthStyle}>
                    <Container sx={{ marginTop: '10px' }}>
                        <Typography fontWeight={600} my={1} sx={authHeaderStyle}>
                            Create An Account
                        </Typography>
                        <Grid container mt={2} sx={gridAuthStyle}>
                            <Grid item xs={12} md={8} mb={2}  >
                                <TextField required name="username" fullWidth placeholder="Username"
                                    onChange={(e) => setUserName(e.target.value)}
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={8} mb={2}  >
                                <TextField required name="mail" fullWidth placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={8} mb={2} >
                                <TextField
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    name="pass"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Password"
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={8} mb={2} >
                                <TextField
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    name="cpass"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Confirm Password"
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={8} mt={3}>
                                <Button type="submit" sx={authSubmitButton} size="small" variant="contained" >Sign Up
                                </Button>
                            </Grid>

                        </Grid>
                    </Container>
                </form>
                <Link href="/login" underline="none" sx={authLinkStyle}
                > Already have an Account? Sign In <ArrowForwardIcon sx={{ marginLeft: "10px" }} /></Link>
            </Paper >


        </Grid >
    )
}