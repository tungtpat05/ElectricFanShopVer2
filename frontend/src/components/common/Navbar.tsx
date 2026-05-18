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
import { useNavigate } from 'react-router-dom';
import logo from "@/assets/images/icons8-react.png";
import { useAuth } from '../../context';

const navItems = [
    {name: 'Product', path: '/products'},
    {name: 'Support', path: '/support'},
];
const settings = [
    {name: 'Profile', path: '/profile'},
    {name: 'Order', path: '/order'},
    {name: 'Sign Out', action: 'logout'},
];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { isLogin, user, logout, loading } = useAuth();
    const navigate = useNavigate();

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

    const handleSettingClick = async (setting: typeof settings[0]) => {
        handleCloseUserMenu();
        if (setting.action === 'logout') {
            await logout();
            navigate('/login');
        } else if (setting.action !== 'logout' && 'path' in setting) {
            const settingWithPath = setting as { name: string; path: string };
            navigate(settingWithPath.path);
        }
    };

    const renderUserMenu = (
        <Box sx={{flexGrow: 0}}>
            {isLogin && user ? (
                <>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt={user.fullName} src="/static/images/avatar/2.jpg"/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
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
                        {settings.map((setting) => (
                            <MenuItem key={setting.name} onClick={() => handleSettingClick(setting)}>
                                <Typography sx={{textAlign: 'center'}}>{setting.name}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            ) : (
                <Button color="inherit" href="/login">Sign In</Button>
            )}
        </Box>
    );

    if (loading) {
        return (
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "rgba(14, 14, 14, 0.8)",
                    backdropFilter: "blur(20px)",
                    zIndex: 1100,
                }}
            >
                <Container maxWidth={false} sx={{px: {xs: 2, md: 3}}}>
                    <Toolbar disableGutters>
                        <Typography>Loading...</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }

    return (
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "rgba(14, 14, 14, 0.8)",
                    backdropFilter: "blur(20px)",
                    zIndex: 1100
                }}
            >
            <Container maxWidth={false} sx={{px: {xs: 2, md: 3}}}>
                <Toolbar disableGutters>

                    {/*Mobile layout: left menu, center logo, right user*/}
                    <Box sx={{display: {xs: 'flex', md: 'none'}, alignItems: 'center', width: '100%'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', flex: '0 0 auto'}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
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
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                {navItems.map((navItem) => (
                                    <MenuItem key={navItem.name} onClick={handleCloseNavMenu} component="a"
                                              href={navItem.path}>
                                        <Typography sx={{textAlign: 'center'}}>{navItem.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center'}}>
                            <img src={logo} alt="Logo" style={{width: '40px', height: '40px', marginRight: '8px'}}/>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                TORQUEX
                            </Typography>
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'center', flex: '0 0 auto'}}>
                            {renderUserMenu}
                        </Box>
                    </Box>

                    {/*Desktop layout: left logo, center nav, right user*/}
                    <Box sx={{display: {xs: 'none', md: 'flex'}, alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', flex: '0 0 auto'}}>
                            <img src={logo} alt="Logo" style={{width: '40px', height: '40px', marginRight: '8px'}}/>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                TORQUEX
                            </Typography>
                        </Box>

                        <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
                            {navItems.map((navItem) => (
                                <Button
                                    key={navItem.name}
                                    href={navItem.path}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {navItem.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{display: 'flex', alignItems: 'center', flex: '0 0 auto'}}>
                            {renderUserMenu}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
