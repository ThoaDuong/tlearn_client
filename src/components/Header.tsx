import React, { useState, MouseEvent } from "react"
import { AppBar, Avatar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material"
import { AutoStories, Logout, Login, Person, SportsEsports, Style } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink } from 'react-router-dom'

const navList = [
    { id: 1, title: 'Vocabulary', slug: "/", icon: <Style /> },
    { id: 4, title: 'Memorize Vocabulary', slug: "game", icon: <SportsEsports /> },
];
const settingList = [
    { id: 1, title: 'My Profile', icon: <Person /> },
    { id: 2, title: 'Logout', icon: <Logout /> },
]

export const Header = ( props: any ) => {
    // nav & user menu variable
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);



    //handle click nav & user menu 
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickSetting = (title: string) => {
        handleCloseUserMenu();

        if (title === 'Logout') {
            const serverUrl = import.meta.env.VITE_SERVER_URL || "";
            window.open(`${serverUrl}/logout`, "_self");
        }
    }


    return (
        <React.Fragment>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        {/* Display Logo + Brand | Laptop */}
                        <Link color="white" underline="none" component={RouterLink} to="/"
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            <AutoStories />
                            <Typography variant="h6" noWrap sx={{
                                mx: 2,
                                letterSpacing: '0.2rem',
                                fontWeight: 700,
                            }}>
                                TLearn
                            </Typography>
                        </Link>

                        {/* Display menu icon + menu item | Vertical | Mobile */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" onClick={handleOpenNavMenu}>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                            >
                                {navList.map(item => (
                                    <MenuItem component={RouterLink} to={item.slug} key={item.id} onClick={handleCloseNavMenu}>
                                        <Box sx={{ pl: 2, pr: 1, mt: 0.3 }}>
                                            {item.icon}
                                        </Box>
                                        <Typography variant="body1" sx={{ pr: 2 }}>
                                            {item.title}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* Display Logo + Brand | Mobile */}
                        <Link color="white" underline="none" component={RouterLink} to="/"
                            sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}
                        >
                            <AutoStories />
                            <Typography variant="h6" noWrap sx={{
                                mx: 2,
                                letterSpacing: '0.2rem',
                                fontWeight: 700,
                            }}>
                                TLearn
                            </Typography>
                        </Link>

                        {/* Display menu item | Horizontal | Laptop */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {navList.map(item => (
                                <Button startIcon={item.icon} key={item.id} onClick={handleCloseNavMenu} sx={{
                                    color: 'white',
                                    my: 2,
                                    px: 3
                                }}>

                                    <Link color="white" underline="none" component={RouterLink} to={`${item.slug}`}> {item.title} </Link>
                                </Button>
                            ))}
                        </Box>

                        {
                            props.userStore.id ?
                                // Display user setting 
                                <Box sx={{ flexGrow: 0 }}>

                                    {/* Display user avatar */}
                                    <Tooltip title="Open setting">
                                        <IconButton onClick={handleOpenUserMenu}>
                                            <Avatar alt="google avatar" src={props.userStore.photo} />
                                        </IconButton>
                                    </Tooltip>

                                    {/* Display list setting | Vertical */}
                                    <Menu anchorEl={anchorElUser}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem>
                                            <Avatar alt="google avatar" src={props.userStore.photo} />
                                            <Stack sx={{ pl: 3 }}>
                                                <Typography variant="h6"> {props.userStore.username} </Typography>
                                                <Typography> {props.userStore.email} </Typography>
                                            </Stack>

                                        </MenuItem>
                                        {settingList.map(item => (
                                            <MenuItem key={item.id} onClick={() => handleClickSetting(item.title)}>
                                                <Box sx={{ pl: 2, pr: 1, mt: 0.3 }}>
                                                    {item.icon}
                                                </Box>
                                                <Typography variant="body1" sx={{ pr: 2 }}>
                                                    {item.title}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                                :
                                // Display login button
                                <Box>
                                    <Button startIcon={<Login/>} sx={{
                                        color: 'white',
                                        my: 2,
                                        px: 3
                                    }}>
                                        <Link color="white" underline="none" component={RouterLink} to="login">
                                            Login
                                        </Link>
                                    </Button>
                                </Box>
                        }

                    </Toolbar>
                </Container>
            </AppBar>

        </React.Fragment>
    )
}