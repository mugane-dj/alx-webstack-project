import { VisibilityOff, Visibility, Email } from "@mui/icons-material"
import { Grid, Container, IconButton, Typography, TextField, InputAdornment, Button, Paper, Link, useMediaQuery } from "@mui/material"
import mainTheme from "../../../theme"
import React, { FormEvent, useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { interFont, } from "../../../utils/font";
import { useRouter } from "next/router";
import PersonIcon from '@mui/icons-material/Person';
import { User, UserFrontend } from "../../../interfaces/IUser";
import toast, { Toaster } from "react-hot-toast";



export const LoginComponent = () => {
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
        <Grid container sx={{
            padding: '0',
            height: '100vh',
            background: 'linear-gradient(to right, #d00000, #ffc837)', display: "flex", justifyContent: 'center'
        }}>
            <Toaster />
            <Paper elevation={4} sx={{
                margin: '100px',
                height: '65vh',
                width: '50%'

            }}>
                <Grid item xs={12} sx={{
                    padding: '20px 0',
                    margin: 0, alignItems: "center", width: '100%'
                }}>
                    <form onSubmit={handleLogin}
                        style={{ display: 'flex', flexDirection: 'column', marginBottom: 0, width: '100%' }}>
                        <Container sx={{ marginTop: '10px' }}>
                            <Typography fontWeight={600} my={1} sx={{
                                textAlign: 'center', fontSize: 30, lineHeight: '38px', fontWeight: 600
                            }}>
                                Login
                            </Typography>
                            <Grid container mt={2} sx={{
                                display: 'flex',
                                flexDirection: "row",
                                alignItems: 'center', justifyContent: 'center'

                            }}>
                                <Grid item xs={8} mb={2}  >
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
                                <Grid item xs={8} mb={2} >
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
                                    }} size="small" variant="contained" >Sign In
                                    </Button>
                                </Grid>

                            </Grid>
                        </Container>
                    </form>
                    <Link href="/signup" underline="none" sx={{
                        marginTop: '20px',
                        fontFamily: interFont,
                        color: mainTheme.palette.primary.contrastText,
                        textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '10px',
                        '&: hover': {
                            color: mainTheme.palette.primary.light,
                        }

                    }}
                    > Create an Account <ArrowForwardIcon sx={{ marginLeft: "10px" }} /></Link>
                </Grid>
            </Paper>
        </Grid >
    )
}