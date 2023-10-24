import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import mainTheme from '../theme';
import { Modal, Stack, TextField } from '@mui/material';
import { UserFrontend } from '../../pages/interfaces/IUser';



const pages = ['Home'];
const settings = ['Logout'];
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

function ResponsiveAppBar() {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('')
    const [file, setFile] = React.useState('');
    const businessShortCode = '174379';
    const [goalAmount, setGoalAmount] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
                alert('Project Created Sucessfully')
                console.log(data, 'projects response data');
            } else {
                console.error('Error creating a project:', response.status);
            }
        } catch (error) {
            console.error('Error creating a project', error);
        }
    }


    return (
        <AppBar position="static" sx={{ backgroundColor: mainTheme.palette.primary.light }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        AIDCROWDSOURCE
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        AIDCROWDSOURCE
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box>
                        <Button onClick={handleOpen} sx={{
                            backgroundColor: "white", color: mainTheme.palette.primary.light,
                            textTransform: "none", borderRadius: '30px',
                            '&: hover': {
                                backgroundColor: "white", color: mainTheme.palette.primary.light,
                                textTransform: "none", borderRadius: '30px', transform: 'scale(1.05)'
                            }
                        }}>
                            Create A Project
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ marginLeft: '10px' }}>{user.username.charAt(0).toUpperCase()}</Avatar>
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
                            <Button href='/login' sx={{textTransform: 'none'}}>Logout</Button>
                            {/* {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography  textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} >
                    <form onSubmit={createAProject} encType="multipart/form-data">
                        <Typography variant={'h6'} marginBottom={3} color={mainTheme.palette.primary.main} textAlign={'center'}>Create Project Form</Typography>
                        <Stack direction={'column'} marginBottom={1}>
                            <Typography variant={'body1'} color={mainTheme.palette.primary.contrastText}>Project Title</Typography>
                            <TextField variant='outlined' name='title' value={title} sx={{ width: '100%' }} onChange={(e) => setTitle(e.target.value)} />
                        </Stack>
                        <Stack direction={'column'} marginBottom={1}>
                            <Typography variant={'body1'} color={mainTheme.palette.primary.contrastText}>Project Description</Typography>
                            <TextField variant='outlined' name='description' value={description} multiline sx={{ width: '100%' }} onChange={(e) => setDescription(e.target.value)} />
                        </Stack>
                        <Stack direction={'column'} marginBottom={1}>
                            <Typography variant={'body1'} color={mainTheme.palette.primary.contrastText}>Image</Typography>
                            <input type='file' name='image' onChange={handleImageChange} />
                        </Stack>
                        <Stack direction={'column'} marginBottom={1}>
                            <Typography variant={'body1'} color={mainTheme.palette.primary.contrastText} mb={0.5}>Business ShortCode</Typography>
                            <input name="businessshortcode" value={businessShortCode} readOnly />
                        </Stack>
                        <Stack direction={'column'} marginBottom={1}>
                            <Typography variant={'body1'} color={mainTheme.palette.primary.contrastText}>Goal Amount</Typography>
                            <TextField variant='outlined' name='amount' value={goalAmount} multiline sx={{ width: '100%' }} onChange={(e) => setGoalAmount(e.target.value)} />
                        </Stack>
                        <Stack direction={'row'} marginTop={3} marginBottom={1} sx={{ justifyContent: 'space-between' }}>
                            <Button variant={'contained'} type='submit' >Submit</Button>
                            <Button sx={{ color: mainTheme.palette.primary.main }} onClick={handleClose}>Cancel</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </AppBar>
    );
}
export default ResponsiveAppBar;