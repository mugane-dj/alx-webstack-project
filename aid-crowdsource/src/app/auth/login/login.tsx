import React from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { Grid, Container, IconButton, Typography, TextField, InputAdornment, Button, Paper, Link, useMediaQuery } from "@mui/material"
import { FormEvent, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from "next/router";
import PersonIcon from '@mui/icons-material/Person';
import { UserFrontend } from "../../../interfaces/IUser";
import toast, { Toaster } from "react-hot-toast";
import { authHeaderStyle, authLinkStyle, authSubmitButton, containerStyle, formAuthStyle, gridAuthStyle, gridStyle, paperStyle } from "../../../utils/style";



const LoginComponent = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [user, setUser] = useState<UserFrontend>()


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
                // console.log(user, 'loguser')
            } catch (localStorageError) {
                console.log('Error saving user data to localStorage:', localStorageError);
            }

            return data;

        } catch (error) {
            console.log('error getting user data', error);
        }

    }

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        var object: any = {};
        fd.forEach(function (value, key) {
            object[key] = value;
        });
        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object)
            });
            const data = await response.json();
            console.log(data, 'login response data');

            // Convert the data to a string using JSON.stringify
            const dataString = JSON.stringify(data);
            const userIdMatch = dataString.match(/userId: ([a-f0-9]+)/i);

            if (userIdMatch) {
                const userIdWithPrefix = userIdMatch[1];

                console.log("User ID:", userIdWithPrefix);
                const userId = userIdWithPrefix.replace('User ID: ', '');

                console.log(userId);
                getUserDetails(userId);
                toast.success('Login Successful')
                router.push('/home')
            } else {
                toast.error('Invalid Username or Password')
                console.log("User ID not found in the log message.");
            }
        } catch (error) {
            toast.error('User Not Found')
            console.log(error, 'logintsx error');
        }
    }

    return (
        <Grid container sx={gridStyle}>
            <Toaster />
            <Paper elevation={4} sx={paperStyle}>
                <form onSubmit={handleLogin}
                    style={formAuthStyle}>
                    <Container sx={containerStyle}>
                        <Typography fontWeight={600} my={1} sx={authHeaderStyle}>
                            Login
                        </Typography>
                        <Grid container mt={2} sx={gridAuthStyle}>
                            <Grid item xs={12} md={8} mb={2}  >
                                <TextField required name="username" fullWidth placeholder="Username"
                                    onChange={(e) => (setUserName(e.target.value))}
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
                            <Grid item xs={12} md={8} mb={2} >
                                <TextField
                                    required
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    id="outlined-basic"
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
                                    onChange={(e) => (setPassword(e.target.value))}
                                />
                            </Grid>

                            <Grid item xs={12} md={8} mt={3}>
                                <Button type="submit" sx={authSubmitButton} size="small" variant="contained" >Sign In
                                </Button>
                            </Grid>

                        </Grid>
                    </Container>
                </form>
                <Link href="/signup" underline="none" sx={authLinkStyle}
                > Create an Account <ArrowForwardIcon sx={{ marginLeft: "10px" }} /></Link>
            </Paper>
        </Grid>
    )
}

export default LoginComponent