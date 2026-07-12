import { Grid, Box } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import StarIcon from "@mui/icons-material/Star";

import MetricCard from "../../components/admin/dashboard/MetricCard";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import OrdersChart from "../../components/admin/dashboard/OrdersChart";
import RecentOrdersTable from "../../components/admin/dashboard/RecentOrdersTable";
import TopProductsList from "../../components/admin/dashboard/TopProductsList";

const AdminDashboardPage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
      {/* 1. Header Metrics Grid */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard
            title="Annual Revenue"
            value="$3.4M"
            diff="+18.2% vs last year"
            isPositive={true}
            icon={<AttachMoneyIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard
            title="Monthly Orders"
            value="53"
            diff="+10.4% vs last month"
            isPositive={true}
            icon={<ShoppingCartIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard
            title="Active Products"
            value="107"
            diff="-2.1% vs last month"
            isPositive={false}
            icon={<TwoWheelerIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard
            title="Avg. Rating"
            value="4.77"
            diff="+0.3% vs last month"
            isPositive={true}
            icon={<StarIcon />}
          />
        </Grid>
      </Grid>

      {/* 2. Middle Row Charts Grid */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RevenueChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <OrdersChart />
        </Grid>
      </Grid>

      {/* 3. Bottom Row Details Grid */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentOrdersTable />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TopProductsList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardPage;
