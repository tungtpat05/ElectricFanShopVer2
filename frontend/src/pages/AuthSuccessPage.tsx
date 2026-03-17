import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    CircularProgress,
    Typography,
    Button,
    Paper,
    Container
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useAuth } from "../context";

const AuthSuccessPage = () => {
    const navigate = useNavigate();
    const { isLogin, user, loading } = useAuth();

    useEffect(() => {
        if (!loading && isLogin && user) {
            const timer = setTimeout(() => {
                navigate("/", { replace: true });
            }, 1500);
            return () => clearTimeout(timer);
        }

    }, [loading, isLogin, user, navigate]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        textAlign: "center",
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    {loading && (
                        <>
                            <CircularProgress size={48} thickness={4} sx={{ mb: 2 }} />
                            <Typography variant="h6" fontWeight="600">
                                Verifying...
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Please wait a moment.
                            </Typography>
                        </>
                    )}

                    {(!loading && !isLogin) && (
                        <>
                            <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main", mb: 1 }} />
                            <Typography variant="h6" fontWeight="600" color="error.main">
                                Login error
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                An error occurred during the authentication process.
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate("/login")}
                                sx={{ borderRadius: 2, py: 1.2 }}
                            >
                                Back to Login
                            </Button>
                        </>
                    )}

                    {!loading && isLogin && user && (
                        <>
                            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main", mb: 1 }} />
                            <Typography variant="h6" fontWeight="600" color="success.main">
                                Login successful
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Redirecting to homepage...
                            </Typography>
                        </>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default AuthSuccessPage;