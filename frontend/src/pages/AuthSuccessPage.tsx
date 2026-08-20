import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    const [searchParams] = useSearchParams();
    const { isLogin, user, loading, refetchUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("authToken", token);
            refetchUser();
        }
    }, [searchParams, refetchUser]);

    useEffect(() => {
        if (!loading && isLogin && user) {
            const timer = setTimeout(() => {
                const userRole = user.role?.toUpperCase() || "";
                const isAdmin = userRole === "ADMIN" || userRole === "ROLE_ADMIN";
                if (isAdmin) {
                    navigate("/admin/dashboard", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [loading, isLogin, user, navigate]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#09090b",
                backgroundImage: "radial-gradient(ellipse at top, rgba(255, 107, 53, 0.15), transparent 70%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={12}
                    sx={{
                        p: 4,
                        textAlign: "center",
                        borderRadius: 4,
                        backgroundColor: "rgba(24, 24, 27, 0.85)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    {loading && (
                        <>
                            <CircularProgress size={48} thickness={4} sx={{ mb: 2, color: "#ff6b35" }} />
                            <Typography variant="h6" fontWeight="700" sx={{ color: "#ffffff" }}>
                                Authenticating...
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#a1a1aa" }}>
                                Securing your session with TORQUE X.
                            </Typography>
                        </>
                    )}

                    {(!loading && !isLogin) && (
                        <>
                            <ErrorOutlineIcon sx={{ fontSize: 60, color: "#ef4444", mb: 1 }} />
                            <Typography variant="h6" fontWeight="700" sx={{ color: "#ef4444" }}>
                                Authentication Failed
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#a1a1aa", mb: 2 }}>
                                An error occurred during the login process. Please try again.
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate("/login")}
                                sx={{
                                    borderRadius: 2,
                                    py: 1.2,
                                    backgroundColor: "#ff6b35",
                                    color: "#ffffff",
                                    fontWeight: 700,
                                    "&:hover": { backgroundColor: "#e05a2b" },
                                }}
                            >
                                Back to Sign In
                            </Button>
                        </>
                    )}

                    {!loading && isLogin && user && (
                        <>
                            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "#10b981", mb: 1 }} />
                            <Typography variant="h6" fontWeight="700" sx={{ color: "#ffffff" }}>
                                Welcome back, {user.fullName}!
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#a1a1aa" }}>
                                Redirecting to your dashboard...
                            </Typography>
                        </>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default AuthSuccessPage;