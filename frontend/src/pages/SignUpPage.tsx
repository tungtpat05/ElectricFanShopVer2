import React, { useState } from 'react';
import {
    Container, Box, Paper, Typography, TextField,
    Button, Stack, Link, Alert, IconButton, InputAdornment
} from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { useAuth } from '../context';
import { ApiErrorResponse } from '../types/apiError';
import logo from '@/assets/images/common/logo.png';

interface FieldErrors {
    fullName?: string;
    email?: string;
    password?: string;
}

interface TouchedFields {
    fullName?: boolean;
    email?: boolean;
    password?: boolean;
}

const SignUpPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [errors, setErrors] = useState<FieldErrors>({});
    const [touched, setTouched] = useState<TouchedFields>({});

    const navigate = useNavigate();
    const { loginSuccess } = useAuth();

    const validateField = (name: keyof FieldErrors, value: string): string | undefined => {
        const trimmed = value.trim();
        if (name === 'fullName') {
            if (!trimmed) return 'Full name is required';
            if (trimmed.length < 2 || trimmed.length > 100) {
                return 'Full name must be between 2 and 100 characters';
            }
        }
        if (name === 'email') {
            if (!trimmed) return 'Email is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmed)) {
                return 'Please enter a valid email address (e.g. user@example.com)';
            }
        }
        if (name === 'password') {
            if (!value) return 'Password is required';
            if (value.length < 6) {
                return 'Password must be at least 6 characters';
            }
            if (value.length > 255) {
                return 'Password must not exceed 255 characters';
            }
        }
        return undefined;
    };

    const handleBlur = (field: keyof FieldErrors) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        let val = '';
        if (field === 'fullName') val = fullName;
        if (field === 'email') val = email;
        if (field === 'password') val = password;

        const errorMsg = validateField(field, val);
        setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    };

    const handleFullNameChange = (val: string) => {
        setFullName(val);
        if (touched.fullName) {
            setErrors((prev) => ({ ...prev, fullName: validateField('fullName', val) }));
        }
    };

    const handleEmailChange = (val: string) => {
        setEmail(val);
        if (touched.email) {
            setErrors((prev) => ({ ...prev, email: validateField('email', val) }));
        }
    };

    const handlePasswordChange = (val: string) => {
        setPassword(val);
        if (touched.password) {
            setErrors((prev) => ({ ...prev, password: validateField('password', val) }));
        }
    };

    const validateForm = (): boolean => {
        const fullNameErr = validateField('fullName', fullName);
        const emailErr = validateField('email', email);
        const passwordErr = validateField('password', password);

        const newErrors: FieldErrors = {
            fullName: fullNameErr,
            email: emailErr,
            password: passwordErr,
        };

        setErrors(newErrors);
        setTouched({ fullName: true, email: true, password: true });

        return !fullNameErr && !emailErr && !passwordErr;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Perform instant client-side validation before sending backend API call
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await register(email, password, fullName);
            loginSuccess(response.user, response.token);

            const userRole = response.user?.role?.toUpperCase() || "";
            const isAdmin = userRole === "ADMIN" || userRole === "ROLE_ADMIN";

            if (isAdmin) {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        } catch (err: any) {
            console.error("Sign up error:", err);
            const apiErrorData = err?.response?.data;
            const status = err?.response?.status;

            if (apiErrorData && typeof apiErrorData === 'object') {
                const { message: apiMsg, details } = apiErrorData as ApiErrorResponse;

                // Map field-specific details from backend error response
                if (details && Object.keys(details).length > 0) {
                    setErrors((prev) => ({ ...prev, ...details }));
                }

                if (status === 409) {
                    const dupMsg = details?.email || apiMsg || 'This email address is already registered.';
                    setErrors((prev) => ({ ...prev, email: dupMsg }));
                    setError('Registration failed: This email is already in use.');
                } else if (status === 400) {
                    setError(apiMsg || 'Invalid registration information.');
                } else {
                    setError(apiMsg || 'Registration failed. Please try again.');
                }
            } else {
                setError(err?.message || 'Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#09090b',
                backgroundImage: 'radial-gradient(ellipse at top, rgba(255, 107, 53, 0.18), transparent 70%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 6,
                px: 2,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={16}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: 4,
                        backgroundColor: 'rgba(24, 24, 27, 0.85)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.7)',
                        color: '#ffffff',
                    }}
                >
                    {/* Header with Logo */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            <img src={logo} alt="TORQUE X Logo" style={{ width: 44, height: 44 }} />
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 900,
                                    letterSpacing: '.25rem',
                                    color: '#ffffff',
                                }}
                            >
                                TORQUE<span style={{ color: '#ff6b35' }}>X</span>
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#a1a1aa', fontWeight: 550, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Join The Revolution
                        </Typography>
                    </Box>

                    {/* Form */}
                    <Stack spacing={3} component="form" noValidate onSubmit={handleSubmit}>
                        <TextField
                            required
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => handleFullNameChange(e.target.value)}
                            onBlur={() => handleBlur('fullName')}
                            error={Boolean(touched.fullName && errors.fullName)}
                            helperText={
                                touched.fullName && errors.fullName
                                    ? errors.fullName
                                    : "Must be between 2 and 100 characters"
                            }
                            FormHelperTextProps={{
                                sx: {
                                    color: touched.fullName && errors.fullName ? '#ef4444' : '#a1a1aa',
                                    fontSize: '0.75rem',
                                    mt: 0.5,
                                },
                            }}
                            disabled={loading}
                            sx={{
                                '& label': { color: '#a1a1aa', fontWeight: 500 },
                                '& label.Mui-focused': { color: '#ff6b35' },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#18181b',
                                    color: '#ffffff',
                                    borderRadius: 2,
                                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                                    '&:hover fieldset': { borderColor: '#ff6b35' },
                                    '&.Mui-focused fieldset': { borderColor: '#ff6b35' },
                                },
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            onBlur={() => handleBlur('email')}
                            error={Boolean((touched.email || errors.email) && errors.email)}
                            helperText={
                                (touched.email || errors.email) && errors.email
                                    ? errors.email
                                    : "Must be a valid email (e.g. user@example.com)"
                            }
                            FormHelperTextProps={{
                                sx: {
                                    color: (touched.email || errors.email) && errors.email ? '#ef4444' : '#a1a1aa',
                                    fontSize: '0.75rem',
                                    mt: 0.5,
                                },
                            }}
                            disabled={loading}
                            sx={{
                                '& label': { color: '#a1a1aa', fontWeight: 500 },
                                '& label.Mui-focused': { color: '#ff6b35' },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#18181b',
                                    color: '#ffffff',
                                    borderRadius: 2,
                                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                                    '&:hover fieldset': { borderColor: '#ff6b35' },
                                    '&.Mui-focused fieldset': { borderColor: '#ff6b35' },
                                },
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            onBlur={() => handleBlur('password')}
                            error={Boolean(touched.password && errors.password)}
                            helperText={
                                touched.password && errors.password
                                    ? errors.password
                                    : "Must be at least 6 characters"
                            }
                            FormHelperTextProps={{
                                sx: {
                                    color: touched.password && errors.password ? '#ef4444' : '#a1a1aa',
                                    fontSize: '0.75rem',
                                    mt: 0.5,
                                },
                            }}
                            disabled={loading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((show) => !show)}
                                            edge="end"
                                            sx={{ color: '#a1a1aa' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& label': { color: '#a1a1aa', fontWeight: 500 },
                                '& label.Mui-focused': { color: '#ff6b35' },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#18181b',
                                    color: '#ffffff',
                                    borderRadius: 2,
                                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                                    '&:hover fieldset': { borderColor: '#ff6b35' },
                                    '&.Mui-focused fieldset': { borderColor: '#ff6b35' },
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                backgroundColor: '#ff6b35',
                                color: '#ffffff',
                                fontWeight: 800,
                                fontSize: '1rem',
                                borderRadius: 2,
                                textTransform: 'none',
                                boxShadow: '0 8px 20px rgba(255, 107, 53, 0.25)',
                                '&:hover': {
                                    backgroundColor: '#e05a2b',
                                    boxShadow: '0 12px 24px rgba(255, 107, 53, 0.35)',
                                },
                            }}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </Stack>

                    {/* Footer Actions */}
                    <Stack spacing={2} sx={{ mt: 4 }}>
                        <Typography variant="body2" align="center" sx={{ color: '#a1a1aa' }}>
                            Already have an account?{' '}
                            <Link
                                component={RouterLink}
                                to="/login"
                                underline="hover"
                                sx={{ color: '#ff6b35', fontWeight: 700 }}
                            >
                                Sign In
                            </Link>
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                startIcon={<HomeIcon />}
                                component={RouterLink}
                                to="/"
                                variant="text"
                                size="small"
                                sx={{ color: '#71717a', '&:hover': { color: '#ffffff' } }}
                            >
                                Back to Store
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default SignUpPage;