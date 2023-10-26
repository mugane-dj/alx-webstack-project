import { VisibilityOff, Visibility, Email, } from "@mui/icons-material"
import { Grid, Container, IconButton, Typography, TextField, InputAdornment, Button, Paper, Link } from "@mui/material"
import mainTheme from "../../../theme"
import React, { FormEvent, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import toast from "react-hot-toast";

export const SignupComponent = () => {
    const [password, setPassword] = useState('');
    const [cpassword, setConfirmPassword] = useState('');
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (submit: FormEvent<HTMLFormElement>) => {
        submit.preventDefault()
        if (!/^(?=.*\d.*\d)[a-zA-Z0-9]+$/.test(username)) {
            setUsernameError('Username should be alphanumeric and contain atleast 2 numbers');
            return;
        }

        if (password !== cpassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        } else if (password.length < 8 || cpassword.length < 8) {
            setConfirmPasswordError('Password should have a minimum of 8 characters')
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
            localStorage.setItem('user', JSON.stringify(formData));
            console.log(localStorage, 'reg')
            console.log(response.json, "data");
            toast.success('User Created Successfully', {  position: 'top-center'})
            alert('User Created Successfully')
            window.location.href = "/login";
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container sx={{
            padding: '0',
            height: '100vh',
            background: 'linear-gradient(to right, #d00000, #ffc837)', display: "flex", justifyContent: 'center'
        }}>
            <Paper elevation={4} sx={{
                margin: '100px',
                height: '75vh',
                width: '50%'
            }}>
                <Grid item xs={12} sx={{
                    padding: '20px 0',
                    margin: 0, alignItems: "center", width: '100%'
                }}>
                    <form onSubmit={handleSubmit} action="#"
                        style={{ display: 'flex', flexDirection: 'column', marginBottom: 0, width: '100%' }}>
                        <Container sx={{ marginTop: '10px' }}>
                            <Typography fontWeight={600} my={1} sx={{
                                textAlign: 'center', fontSize: 30, lineHeight: '38px', fontWeight: 600
                            }}>
                                Create An Account
                            </Typography>
                            <Grid container mt={2} sx={{
                                display: 'flex',
                                flexDirection: "row",
                                alignItems: 'center', justifyContent: 'center'

                            }}>
                                <Grid item xs={8} mb={2}  >
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
                                <Grid item xs={8} mb={2}  >
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
                                <Grid item xs={8} mb={2} >
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
                                <Grid item xs={8} mb={2} >
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

                                <Grid item xs={8} mt={3}>
                                    <Button type="submit" sx={{
                                        width: '100%',
                                        borderRadius: '40px',
                                        textTransform: "none",
                                        fontSize: "16px",
                                        boxShadow: 'none',
                                        backgroundColor: mainTheme.palette.primary.light,
                                        "&:hover": {
                                            backgroundColor: "white",
                                            color: mainTheme.palette.primary.light,
                                            border: `solid 1px ${mainTheme.palette.primary.light}`,
                                            boxShadow: 'none'
                                        }
                                    }} size="small" variant="contained" >Sign Up
                                    </Button>
                                </Grid>

                            </Grid>
                        </Container>
                    </form>
                    <Link href="/login" underline="none" sx={{
                        marginTop: '20px',
                        // fontFamily: interFont,
                        color: mainTheme.palette.primary.contrastText,
                        textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '10px',
                        '&: hover': {
                            color: mainTheme.palette.primary.light,
                        }
                    }}
                    > Already have an Account? Sign In <ArrowForwardIcon sx={{ marginLeft: "10px" }} /></Link>
                </Grid>
            </Paper >


        </Grid >
    )
}