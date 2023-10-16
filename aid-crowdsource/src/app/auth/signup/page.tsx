import { VisibilityOff, Visibility, Email,  } from "@mui/icons-material"
import { Grid, Container, IconButton, Typography, TextField, InputAdornment, Button, Paper, useMediaQuery, useTheme, Link } from "@mui/material"
import mainTheme from "../../../theme"
import React from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { mulishFont } from "../../../utils/font";
import PersonIcon from '@mui/icons-material/Person';

export const SignupComponent = () => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Grid container sx={{
            padding: '0',
            height: '100vh',
            background: 'linear-gradient(to right, #d00000, #ffc837)', display: "flex", justifyContent: 'center'
        }}>
            <Paper elevation={4} sx={{
                margin: isSmallScreen ? '20px' : '100px',
                height: '75vh',
                width: '50%'
            }}>
                <Grid item xs={12} sx={{
                    padding: '20px 0',
                    margin: 0, alignItems: "center", width: '100%'
                }}>
                    <form style={{ display: 'flex', flexDirection: 'column', marginBottom: 0, width: '100%' }}>
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
                                    <TextField required name="username" fullWidth  placeholder="Username"
                                        size="small" sx={{fontFamily: mulishFont}}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <PersonIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                         />
                                </Grid>
                                <Grid item xs={8} mb={2}  >
                                    <TextField required name="mail" fullWidth  placeholder="Email"
                                        size="small" sx={{fontFamily: mulishFont}}
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
                                        required
                                        name="pass"
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        id="outlined-basic"
                                        variant="outlined"
                                        placeholder="Password"
                                        size="small"
                                        sx={{fontFamily: mulishFont}}
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
                                        name="cpass"
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        id="outlined-basic"
                                        variant="outlined"
                                        placeholder="Confirm Password"
                                        size="small"
                                        sx={{fontFamily: mulishFont}}
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
                                        fontFamily: mulishFont,
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
                    <Link href="/login"  underline="none" sx={{
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