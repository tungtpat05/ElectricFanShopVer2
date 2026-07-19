import { Box, IconButton, Badge, Typography, Avatar, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useLocation } from "react-router-dom";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
}

const AdminHeader = ({
  onOpenMobileSidebar,
}: AdminHeaderProps) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Determine title and subtitle based on path
  let title = "Dashboard";
  let subtitle = "Welcome back — here's what's happening";

  const path = location.pathname;

  if (path.startsWith("/admin/products/add")) {
    title = "Add Product";
    subtitle = "Manage product details and inventory";
  } else if (path.startsWith("/admin/products/edit")) {
    title = "Edit Product";
    subtitle = "Modify product details and inventory specifications";
  } else if (path.startsWith("/admin/products")) {
    title = "Products";
    subtitle = "Manage product catalog and inventory";
  } else if (path.startsWith("/admin/categories")) {
    title = "Categories";
    subtitle = "Manage product categories";
  } else if (path.startsWith("/admin/brands")) {
    title = "Brands";
    subtitle = "Manage brand manufacturers";
  }

  return (
    <Box
      sx={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 3 },
        backgroundColor: "#09090b",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        zIndex: 1000,
      }}
    >
      {/* Left side: Hamburger menu + Title description */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {isMobile && (
          <IconButton
            onClick={onOpenMobileSidebar}
            edge="start"
            sx={{ color: "#ffffff", p: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "#ffffff",
              }}
            >
              {title}
            </Typography>
            {!isMobile && subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: "#71717a",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  "&::before": {
                    content: '"—"',
                    marginRight: 1,
                    marginLeft: 1,
                  },
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {isMobile && subtitle && (
            <Typography
              variant="caption"
              sx={{ color: "#71717a", display: "block", mt: -0.25 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Right side: Global Actions (Search, Notifications, Profile, Context Button) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2.5 } }}>
        {/* Actions Row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton sx={{ color: "#a1a1aa", p: 1 }}>
            <SearchIcon fontSize="medium" />
          </IconButton>
          <IconButton sx={{ color: "#a1a1aa", p: 1 }}>
            <Badge
              variant="dot"
              color="warning"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#ff6b35",
                },
              }}
            >
              <NotificationsNoneIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </Box>

        {/* User Block (Desktop/Tablet) */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              alt="Admin User"
              src=""
              sx={{
                width: 36,
                height: 36,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "#27272a",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#ff6b35",
              }}
            >
              AD
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#ffffff", fontSize: "0.85rem" }}
              >
                Admin
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#71717a", fontSize: "0.75rem", mt: -0.25 }}
              >
                admin@torquex.com
              </Typography>
            </Box>
          </Box>
        )}

      </Box>
    </Box>
  );
};

export default AdminHeader;
