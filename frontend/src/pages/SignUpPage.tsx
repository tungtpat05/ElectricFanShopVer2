import {
    Container, Box, Paper, Typography, TextField,
    Button, Stack, Link, Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import { useState } from 'react';
import { register } from '../services/authService';
import * as React from "react";

const SignUpPage = () => {
    const [fullName, setFullName] = useState('');
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
            await register(email, password, fullName);
            // Redirect to home page after successful registration
            navigate('/', { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign up. Please try again.');
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
                        Welcome new user, please sign up to continue
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/*Sign Up Form*/}
                    <Stack spacing={4} component="form" noValidate onSubmit={handleSubmit}>
                        <TextField
                            required
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={loading}
                        />
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
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </Stack>

                    {/*Sign In and Back to Home*/}
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        {/*Sign In*/}
                        <Typography variant="body2" align="center">
                            You already have an account?{' '}
                            <Link
                                component={RouterLink}
                                to="/login"
                                underline="hover"
                                sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Sign In
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

export default SignUpPage;