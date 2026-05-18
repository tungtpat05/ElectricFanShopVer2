import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/common/Navbar.tsx'
import Footer from "@/components/common/Footer.tsx";

const MainLayout = () => {
  return (
    <Box>
        <Navbar />
        <Box sx={{ pt: '64px' }}>
          <Outlet />
        </Box>
        <Footer />
    </Box>
  )
}

export default MainLayout