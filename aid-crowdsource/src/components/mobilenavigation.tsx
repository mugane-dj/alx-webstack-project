/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper } from '@mui/material';
import Link from 'next/link';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import mainTheme from '../theme';


export default function MobileBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const [currentLocation, setCurrentLocation] = React.useState(window.location.href.split('/')[(window.location.href.split('/').length) - 1]);

    React.useEffect(() => {
        console.log(window.location.href.split('/')[(window.location.href.split('/').length) - 1], 'split');
    }, [window.location.href])

    return (

        <Box sx={{
            width: '100%', zIndex: 10, '@media (min-width: 601px)': {
                display: 'none'
            },
        }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction value="/home" label="Home" icon={<ShoppingBagOutlinedIcon />} component={Link} href='/home'
                        sx={{
                            color: currentLocation === 'home' ? mainTheme.palette.primary.main : "grey",
                        }}
                    />
                    <BottomNavigationAction value="/myprojects" label="MyProjects" icon={<PersonOutlineOutlinedIcon />} component={Link} href='/myprojects'
                        sx={{
                            color: currentLocation === 'myprojects' ? mainTheme.palette.primary.main : "grey",
                        }}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

