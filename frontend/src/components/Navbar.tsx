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
import logo from "../assets/images/icons8-react.png";
import { useAuth } from '../context';

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

    if (loading) {
        return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography>Loading...</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/*Logo and website name for larger screens*/}
                    <Box sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}>
                        <img src={logo} alt="Logo" style={{width: '40px', height: '40px', marginRight: '8px'}}/>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TNTFAN
                    </Typography>

                    {/*Nav Menu for smaller screens*/}
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
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

                    {/*Logo and website name for smaller screens*/}
                    <Box sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}>
                        <img src={logo} alt="Logo" style={{width: '40px', height: '40px', marginRight: '8px'}}/>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TNTFAN
                    </Typography>

                    {/*Nav Menu for larger screens*/}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
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

                    {/*User Menu*/}
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
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
