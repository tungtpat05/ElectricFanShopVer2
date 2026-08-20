import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  Button,
  Grid,
  Divider,
  Stack,
  Skeleton,
  Card,
  CardContent,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import ShieldIcon from "@mui/icons-material/Shield";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { getUser } from "../services/authService";
import { User } from "../types/user";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user: contextUser, logout } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(contextUser);
  const [loading, setLoading] = useState<boolean>(!contextUser);

  useEffect(() => {
    const fetchFreshUserData = async () => {
      try {
        const freshData = await getUser();
        setProfileUser(freshData);
      } catch (err) {
        console.error("Failed to fetch profile details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreshUserData();
  }, []);

  const displayUser = profileUser || contextUser;

  const initialLetter = displayUser?.fullName
    ? displayUser.fullName.trim().charAt(0).toUpperCase()
    : "U";

  const userRole = displayUser?.role?.toUpperCase() || "";
  const isAdmin = userRole === "ADMIN" || userRole === "ROLE_ADMIN";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (_e) {
      return dateString;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#09090b",
        pt: { xs: 2, md: 4 },
        pb: 2,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Navigation Breadcrumb / Back button */}
        <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              color: "#a1a1aa",
              "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.05)" },
            }}
          >
            Back to Store
          </Button>
        </Box>

        {/* Profile Header Hero Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            mb: 4,
            borderRadius: 4,
            backgroundColor: "#121215",
            backgroundImage: "none",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid size="auto">
              {loading ? (
                <Skeleton
                  variant="circular"
                  width={100}
                  height={100}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    bgcolor: "rgba(255, 107, 53, 0.15)",
                    color: "#ff6b35",
                    fontSize: { xs: "2.2rem", sm: "2.8rem" },
                    fontWeight: 900,
                    border: "3px solid #ff6b35",
                    boxShadow: "0 0 24px rgba(255, 107, 53, 0.4)",
                  }}
                >
                  {initialLetter}
                </Avatar>
              )}
            </Grid>

            <Grid size={{ xs: 12, sm: "grow" }}>
              {loading ? (
                <Stack spacing={1}>
                  <Skeleton width="60%" height={40} sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
                  <Skeleton width="40%" height={24} sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
                </Stack>
              ) : (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", mb: 1 }}>
                    <Typography variant="h4" component="h1" fontWeight={800} sx={{ color: "#ffffff" }}>
                      {displayUser?.fullName || "User Profile"}
                    </Typography>
                    <Chip
                      icon={isAdmin ? <AdminPanelSettingsIcon /> : <ShieldIcon />}
                      label={userRole || "CUSTOMER"}
                      sx={{
                        backgroundColor: isAdmin ? "rgba(255, 107, 53, 0.18)" : "rgba(16, 185, 129, 0.18)",
                        color: isAdmin ? "#ff6b35" : "#10b981",
                        border: `1px solid ${isAdmin ? "rgba(255, 107, 53, 0.4)" : "rgba(16, 185, 129, 0.4)"}`,
                        fontWeight: 700,
                        fontSize: "0.8rem",
                      }}
                    />
                    <Chip
                      icon={<CheckCircleIcon sx={{ fontSize: "1rem !important" }} />}
                      label="Active Account"
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: "#a1a1aa",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ color: "#a1a1aa", display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon sx={{ fontSize: 18, color: "#ff6b35" }} />
                    {displayUser?.email}
                  </Typography>
                </Box>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: "auto" }}>
              <Stack direction={{ xs: "row", sm: "row", md: "column" }} spacing={1.5}>
                {isAdmin && (
                  <Button
                    variant="contained"
                    startIcon={<AdminPanelSettingsIcon />}
                    onClick={() => navigate("/admin/dashboard")}
                    sx={{
                      backgroundColor: "#ff6b35",
                      color: "#ffffff",
                      fontWeight: 700,
                      borderRadius: 2,
                      boxShadow: "0 8px 20px rgba(255, 107, 53, 0.3)",
                      "&:hover": { backgroundColor: "#e05a2b" },
                    }}
                  >
                    Admin Dashboard
                  </Button>
                )}
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    borderColor: "rgba(239, 68, 68, 0.4)",
                    color: "#fca5a5",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: "#ef4444",
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                    },
                  }}
                >
                  Sign Out
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Detailed Information Grid */}
        <Grid container spacing={3}>
          {/* Card 1: Account Overview */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 4,
                backgroundColor: "#121215",
                backgroundImage: "none",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
                color: "#ffffff",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "rgba(255, 107, 53, 0.3)",
                  boxShadow: "0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 107, 53, 0.08)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              <CardContent sx={{ p: 3.5 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5, color: "#ff6b35", display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 0.8, borderRadius: 2, bgcolor: "rgba(255, 107, 53, 0.12)", color: "#ff6b35" }}>
                    <PersonIcon sx={{ fontSize: 20 }} />
                  </Box>
                  User Information
                </Typography>
                <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.07)" }} />

                <Stack spacing={2.5}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5 }}>
                    <Typography variant="body2" sx={{ color: "#a1a1aa", display: "flex", alignItems: "center", gap: 1.2, fontWeight: 500 }}>
                      <PersonIcon sx={{ fontSize: 18, color: "rgba(255, 255, 255, 0.35)" }} /> Full Name
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ color: "#ffffff" }}>
                      {displayUser?.fullName || "N/A"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5 }}>
                    <Typography variant="body2" sx={{ color: "#a1a1aa", display: "flex", alignItems: "center", gap: 1.2, fontWeight: 500 }}>
                      <EmailIcon sx={{ fontSize: 18, color: "rgba(255, 255, 255, 0.35)" }} /> Email Address
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ color: "#ffffff" }}>
                      {displayUser?.email || "N/A"}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2: Security & Credentials */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 4,
                backgroundColor: "#121215",
                backgroundImage: "none",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
                color: "#ffffff",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "rgba(255, 107, 53, 0.3)",
                  boxShadow: "0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 107, 53, 0.08)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              <CardContent sx={{ p: 3.5 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5, color: "#ff6b35", display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 0.8, borderRadius: 2, bgcolor: "rgba(255, 107, 53, 0.12)", color: "#ff6b35" }}>
                    <ShieldIcon sx={{ fontSize: 20 }} />
                  </Box>
                  Account Security & Role
                </Typography>
                <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.07)" }} />

                <Stack spacing={2.5}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5 }}>
                    <Typography variant="body2" sx={{ color: "#a1a1aa", display: "flex", alignItems: "center", gap: 1.2, fontWeight: 500 }}>
                      <ShieldIcon sx={{ fontSize: 18, color: "rgba(255, 255, 255, 0.35)" }} /> Access Level
                    </Typography>
                    <Typography variant="body1" fontWeight={700} sx={{ color: isAdmin ? "#ff6b35" : "#10b981" }}>
                      {userRole}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5 }}>
                    <Typography variant="body2" sx={{ color: "#a1a1aa", display: "flex", alignItems: "center", gap: 1.2, fontWeight: 500 }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: "rgba(255, 255, 255, 0.35)" }} /> Account Status
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ color: "#10b981" }}>
                      {displayUser?.isActive !== false ? "Active & Verified" : "Suspended"}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5 }}>
                    <Typography variant="body2" sx={{ color: "#a1a1aa", display: "flex", alignItems: "center", gap: 1.2, fontWeight: 500 }}>
                      <CalendarTodayIcon sx={{ fontSize: 18, color: "rgba(255, 255, 255, 0.35)" }} /> Member Since
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ color: "#ffffff" }}>
                      {formatDate(displayUser?.createdAt)}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions Bar */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3.5,
                borderRadius: 4,
                backgroundColor: "#121215",
                backgroundImage: "none",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "rgba(255, 107, 53, 0.25)",
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, color: "#ffffff" }}>
                Quick Actions
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Button
                  variant="outlined"
                  startIcon={<ShoppingBagIcon />}
                  onClick={() => navigate("/cart")}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    borderRadius: 2,
                    px: 2.5,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": { borderColor: "#ff6b35", backgroundColor: "rgba(255, 107, 53, 0.1)", color: "#ff6b35" },
                  }}
                >
                  Shopping Cart
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/products")}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    borderRadius: 2,
                    px: 2.5,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": { borderColor: "#ff6b35", backgroundColor: "rgba(255, 107, 53, 0.1)", color: "#ff6b35" },
                  }}
                >
                  Browse Products
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
