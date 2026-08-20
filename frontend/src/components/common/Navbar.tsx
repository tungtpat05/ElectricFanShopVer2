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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import logo from "@/assets/images/common/logo.png";
import { useAuth } from '../../context';

const navItems = [
    {name: 'Product', path: '/products'},
    {name: 'Support', path: '/support'},
];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { isLogin, user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const userRole = user?.role?.toUpperCase() || "";
    const isAdmin = userRole === "ADMIN" || userRole === "ROLE_ADMIN";

    const userSettings = [
        ...(isAdmin ? [{ name: 'Admin Dashboard', path: '/admin/dashboard' }] : []),
        { name: 'Profile', path: '/profile' },
        { name: 'Order', path: '/order' },
        { name: 'Sign Out', action: 'logout' },
    ];

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

    const handleSettingClick = async (setting: { name: string; path?: string; action?: string }) => {
        handleCloseUserMenu();
        if (setting.action === 'logout') {
            await logout();
            navigate('/login');
        } else if (setting.path) {
            navigate(setting.path);
        }
    };

    const renderUserMenu = (
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0, gap: 1 }}>
            {isLogin && user ? (
                <>
                    <Tooltip title="View Shopping Cart">
                        <IconButton
                            onClick={() => navigate('/cart')}
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                p: 0.75,
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    color: '#ff6b35',
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                }
                            }}
                        >
                            <Badge
                                badgeContent={2}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "#ff6b35",
                                        color: "#ffffff",
                                        fontWeight: 700,
                                        fontSize: "0.65rem",
                                        height: 16,
                                        minWidth: 16,
                                        padding: "0 4px",
                                    }
                                }}
                            >
                                <ShoppingCartIcon sx={{ fontSize: '1.25rem' }} />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Open settings">
                        <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{
                                p: 0.25,
                                transition: 'all 0.2s ease-in-out',
                                borderRadius: '50%',
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                                    color: '#f4f4f5',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    width: 32,
                                    height: 32,
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        borderColor: 'rgba(255, 107, 53, 0.8)',
                                        color: '#ff6b35',
                                        bgcolor: 'rgba(255, 107, 53, 0.12)',
                                    }
                                }}
                            >
                                {user.fullName ? user.fullName.trim().charAt(0).toUpperCase() : 'U'}
                            </Avatar>
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
                        PaperProps={{
                            sx: {
                                backgroundColor: "#18181b",
                                color: "#ffffff",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                            }
                        }}
                    >
                        {userSettings.map((setting) => (
                            <MenuItem key={setting.name} onClick={() => handleSettingClick(setting)}>
                                <Typography sx={{ textAlign: 'center', fontSize: "0.9rem", fontWeight: setting.name.includes("Admin") ? 700 : 500, color: setting.name.includes("Admin") ? "#ff6b35" : "#ffffff" }}>
                                    {setting.name}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            ) : (
                <Button
                    onClick={() => navigate('/login')}
                    sx={{
                        color: '#ffffff',
                        borderColor: '#ff6b35',
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                        fontWeight: 600,
                        px: 2,
                        py: 0.75,
                        borderRadius: 1.5,
                        '&:hover': {
                            backgroundColor: '#ff6b35',
                            color: '#ffffff',
                        }
                    }}
                >
                    Sign In
                </Button>
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
                elevation={0}
                sx={{
                    backgroundColor: "rgba(9, 9, 11, 0.8)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
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
                                TORQUE<span style={{color: '#ff6b35'}}>X</span>
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
                                TORQUE<span style={{color: '#ff6b35'}}>X</span>
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
