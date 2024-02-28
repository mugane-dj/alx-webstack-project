import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import mainTheme from '../theme';
import { List, ListItem, ListItemButton, ListItemText, Modal, Stack, TextField } from '@mui/material';
import { UserFrontend } from '../interfaces/IUser';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';



const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 4,
    p: 4,
    borderRadius: '8px'
};


const navItems = [{ title: 'Home', link: '/home' }, { title: 'My Projects', link: '/myprojects' }];


function ResponsiveAppBar() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('')
    const [file, setFile] = React.useState('');
    const businessShortCode = '174379';
    const [goalAmount, setGoalAmount] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const user = (JSON.parse(localStorage.getItem('user')!) as UserFrontend)
    console.log(user, user.id, 'loggedin')


    const handleImageChange = (event: any) => {
        const image = event.target.files[0];
        setFile(image);
        setImageUrl(URL.createObjectURL(image))
    };
    const createAProject = async (submit: React.FormEvent<HTMLFormElement>) => {
        submit.preventDefault()
        try {
            //Notice that when the FormData object is converted to an array, it stores a two-dimensional array.
            const formData = new FormData();
            formData.append('title', title)
            formData.append('description', description);
            formData.append('image', file);
            formData.append('businessShortCode', businessShortCode);
            formData.append('goalAmount', goalAmount);
            console.log(formData, 'fd');
            console.log(Array.from(formData), 'arrayFrom');
            console.log(user.id, 'userId');
            console.log(formData.get('image'), 'image')


            const response = await fetch(`/api/v1/projects?userId=${user.id}`, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                toast.success('Project Created Sucessfully');
                console.log(data, 'projects response data');
            } else {
                toast.error('Error Creating Project');
                console.error('Error creating a project:', response.status);
            }
        } catch (error) {
            toast.error('Error Creating Project');
            console.error('Error creating a project', error);
        }
    }


    return (
        <AppBar position="static" sx={{ background: mainTheme.palette.primary.main }}>
            <Toaster />
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 1,
                            display: 'flex',
                            // fontFamily: 'monospace',
                            fontWeight: 700,
                            // color: 'inherit',
                            textDecoration: 'none',
                            color: 'white'
                        }}
                    >
                        AIDCROWDSOURCE
                    </Typography>
                    <List sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: "30%",
                        paddingLeft: "auto",
                        paddingRight: 0,
                        marginRight: 'auto',
                        '@media (max-width: 600px)': {
                            display: 'none',
                        },

                    }}>
                        {navItems.map((item, i) => (
                            <ListItem key={i + "headerLinks"} disablePadding sx={{
                                "&:hover": {
                                    background: "transparent",
                                },
                            }}>
                                <ListItemButton onClick={() => router.push(item.link)} href="#" sx={{
                                    textAlign: 'center',
                                    padding: 0,
                                    "&:hover": {
                                        background: 'transparent',
                                    },
                                }}>
                                    <ListItemText primary={`${item.title}`} sx={{
                                        fontSize: '20px',
                                        "&:hover": {
                                            transform: 'scale(1.2)'
                                        },
                                        color: 'white',
                                        fontWeight: 600
                                    }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Stack direction={'row'} sx={{ right: 0 }} >
                        <Box>
                            <Button onClick={handleOpen} sx={{
                                backgroundColor: "white", color: mainTheme.palette.primary.light,
                                textTransform: "none", borderRadius: '30px',
                                '&: hover': {
                                    backgroundColor: "white", color: mainTheme.palette.primary.light,
                                    textTransform: "none", borderRadius: '30px', transform: 'scale(1.05)'
                                },
                                '@media (max-width: 600px)': {
                                    height: '100%', width: '100px', marginRight: '10px'
                                },
                            }}>
                                Create A Project
                            </Button>
                        </Box>
                        <Box sx={{
                            flexGrow: 0, '@media (max-width: 600px)': {
                                right: 0, marginTop: '10px'
                            },
                        }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar sx={{ marginLeft: '10px', }}>{user.username.charAt(0).toUpperCase()}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <Button href='/login' sx={{ textTransform: 'none' }}>Logout</Button>
                            </Menu>
                        </Box>
                    </Stack>
                </Toolbar>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box mt={2} sx={style}>
                    <form onSubmit={createAProject} encType="multipart/form-data">
                        <Stack direction={'column'} marginBottom={3.5}>
                            <TextField variant='outlined' name='title' value={title} label='Project Title'
                                sx={{ width: '100%', borderRadius: '40px' }}
                                onChange={(e) => setTitle(e.target.value)} />
                        </Stack>
                        <Stack direction={'column'} marginBottom={1.5}>
                            <TextField variant='outlined' name='description' label="Project Description"
                                value={description} multiline sx={{ width: '100%' }} onChange={(e) => setDescription(e.target.value)} />
                        </Stack>
                        <Stack direction={'column'} marginBottom={3.0}>
                            <Typography variant={'body1'} pb={0.5}>Image</Typography>
                            <input type='file' name='image' onChange={handleImageChange} style={{ height: '20px' }} />
                        </Stack>
                        <Stack direction={'column'} marginBottom={3.0}>
                            <TextField name="businessshortcode" label='M-Pesa Paybill' value={businessShortCode} InputProps={{
                                readOnly: true,
                            }} />
                        </Stack>
                        <Stack direction={'column'} marginBottom={3.0}>
                            {/* <Typography variant={'body1'} pb={0.5} color={mainTheme.palette.primary.contrastText}>Goal Amount</Typography> */}
                            <TextField variant='outlined' name='amount' label='Goal Amount'
                                value={goalAmount} multiline sx={{ width: '100%' }} onChange={(e) => setGoalAmount(e.target.value)} />
                        </Stack>
                        <Stack direction={'row'} marginTop={3} marginBottom={3} sx={{ justifyContent: 'space-between' }}>
                            <Button sx={{
                                borderRadius: '40px', backgroundColor: mainTheme.palette.secondary.main, color: 'white', '&:hover': {
                                    backgroundColor: mainTheme.palette.secondary.main, color: 'white', transform: 'scale(1.05)'
                                }
                            }} variant={'contained'} type='submit' >Submit</Button>
                            <Button sx={{
                                color: mainTheme.palette.primary.main,
                                borderRadius: '40px',
                                '&:hover': {
                                    backgroundColor: mainTheme.palette.primary.main, 
                                    color: 'white', transform: 'scale(1.05)', borderRadius: '40px'
                                }
                            }} onClick={handleClose}>Cancel</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </AppBar>
    );
}
export default ResponsiveAppBar;