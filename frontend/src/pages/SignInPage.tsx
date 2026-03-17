import {
    Container, Box, Paper, Typography, TextField,
    Button, Divider, Stack, Link, Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import { loginWithEmail } from '../services/authService';
import * as React from "react";

const handleGoogleLogin = () => {
    // Redirect to backend OAuth2 authorization endpoint
    // Spring Security will handle the rest of the OAuth2 flow
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
};

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await loginWithEmail(email, password);
            // Redirect to home page after successful login
            navigate('/', { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign in. Please check your email and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
            <Box sx={{width: '50%'}}>
                <Paper elevation={3} sx={{p: 4, width: '100%', borderRadius: 2}}>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        TNTFAN
                    </Typography>

                    <Typography component="h6" variant="h6" align="center" gutterBottom>
                        Welcome user, please sign in to continue
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/*Sign In*/}
                    <Stack spacing={4} component="form" noValidate onSubmit={handleSubmit}>
                        <TextField
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>

                        <Divider>OR</Divider>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon/>}
                            onClick={() => handleGoogleLogin()}
                            disabled={loading}
                        >
                            Sign In With Google
                        </Button>
                    </Stack>

                    {/*Sign Up and Back to Home*/}
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        {/*Sign Up*/}
                        <Typography variant="body2" align="center">
                            Don't have an account?{' '}
                            <Link
                                component={RouterLink}
                                to="/register"
                                underline="hover"
                                sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Sign Up
                            </Link>
                        </Typography>

                        {/*Back to Home*/}
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                startIcon={<HomeIcon />}
                                component={RouterLink}
                                to="/"
                                variant="text"
                                color="inherit"
                                size="small"
                            >
                                Back to Home
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default SignInPage;
