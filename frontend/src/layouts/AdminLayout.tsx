import { useState } from "react";
import { Box, Drawer, useTheme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/common/AdminSidebar";
import AdminHeader from "../components/admin/common/AdminHeader";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarWidth = collapsed ? 80 : 260;

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#09090b" }}>
      {/* 1. Sidebar - Permanent on Desktop */}
      {!isMobile && (
        <AdminSidebar
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      )}

      {/* 2. Sidebar - Drawer on Mobile/Tablet */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 260,
              borderRight: "none",
            },
          }}
        >
          <AdminSidebar
            isMobile={true}
            onCloseMobile={handleDrawerToggle}
          />
        </Drawer>
      )}

      {/* 3. Main Work Container */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: isMobile ? "100%" : `calc(100% - ${sidebarWidth}px)`,
          height: "100%",
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        {/* Top Header */}
        <AdminHeader onOpenMobileSidebar={handleDrawerToggle} />

        {/* Content Outlet scroll area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: { xs: 2, md: 3 },
            backgroundColor: "#09090b",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
