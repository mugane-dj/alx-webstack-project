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
import { List, ListItem, ListItemButton, ListItemText, Modal, Stack, TextField } from '@mui/material';
import { UserFrontend } from '../interfaces/IUser';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { appBarStyle, avatarStyle, boxNavbarStyle, closeButtonStyle, createProjectButton, formBoxStyle, listItemButton, listItemStyle, listItemText, logoHeader, menuStyle, submitButtonStyle, textFieldStyle, toolbBarStyle } from '../utils/styleProjectsPages';
import Cookies from 'js-cookie';
import { useProjectsContext } from '../context/projects';




const navItems = [{ title: 'Home', link: '/home' }, { title: 'My Projects', link: '/myprojects' }];


function ResponsiveAppBar() {
    const { createAProject } = useProjectsContext();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('')
    const [file, setFile] = React.useState(null);
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
    const user = (JSON.parse(Cookies.get('user')!) as UserFrontend)
    console.log(user, 'user')

    const handleImageChange = (event: any) => {
        const image = event.target.files[0];
        setFile(image);
        setImageUrl(URL.createObjectURL(image))
    };

    const handleLogout = () => {
        Cookies.remove('user');
        toast.loading('Logging out',);
        window.location.href = '/login';
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            await createAProject(title, description, file, businessShortCode, goalAmount, user.id);
        }
    };


    return (
        <AppBar position="static" sx={appBarStyle}>
            <Toaster />
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={toolbBarStyle}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={logoHeader}
                    >
                        AIDCROWDSOURCE
                    </Typography>
                    <List sx={menuStyle}>
                        {navItems.map((item, i) => (
                            <ListItem key={i + "headerLinks"} disablePadding sx={listItemStyle}>
                                <ListItemButton onClick={() => router.push(item.link)} href="#" sx={listItemButton}>
                                    <ListItemText primary={`${item.title}`} sx={listItemText} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Stack direction={'row'} sx={{ right: 0 }} >
                        <Box>
                            <Button onClick={handleOpen} sx={createProjectButton}>
                                Create A Project
                            </Button>
                        </Box>
                        <Box sx={boxNavbarStyle}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar sx={avatarStyle}>{user.username.charAt(0).toUpperCase()}</Avatar>
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
                                <Button onClick={handleLogout} sx={{ textTransform: 'none' }}>Logout</Button>
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
                <Box mt={2} sx={formBoxStyle}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Stack direction={'column'} marginBottom={3.5}>
                            <TextField variant='outlined' name='title' value={title} label='Project Title'
                                sx={textFieldStyle}
                                onChange={(e) => setTitle(e.target.value)} />
                        </Stack>
                        <Stack direction={'column'} marginBottom={1.5}>
                            <TextField variant='outlined' name='description' label="Project Description"
                                value={description} multiline sx={textFieldStyle} onChange={(e) => setDescription(e.target.value)} />
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
                            <TextField variant='outlined' name='amount' label='Goal Amount'
                                value={goalAmount} multiline sx={textFieldStyle} onChange={(e) => setGoalAmount(e.target.value)} />
                        </Stack>
                        <Stack direction={'row'} marginTop={3} marginBottom={3} sx={{ justifyContent: 'space-between' }}>
                            <Button sx={submitButtonStyle} variant={'contained'} type='submit' >Submit</Button>
                            <Button sx={closeButtonStyle} onClick={handleClose}>Cancel</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </AppBar>
    );
}
export default ResponsiveAppBar;