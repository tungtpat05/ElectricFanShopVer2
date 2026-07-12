import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import StatusChip from "../common/StatusChip";
import SectionCard from "../common/SectionCard";

const recentOrders = [
  { id: "ORD-4821", customer: "James Morrison", product: "Panigale V4 S", amount: "$32,995", status: "completed" },
  { id: "ORD-4820", customer: "Sarah Chen", product: "MT-09 SP", amount: "$10,299", status: "processing" },
  { id: "ORD-4819", customer: "Mike Kowalski", product: "Africa Twin AS", amount: "$16,499", status: "shipped" },
  { id: "ORD-4818", customer: "Priya Nair", product: "CB650R Neo", amount: "$9,499", status: "completed" },
  { id: "ORD-4817", customer: "Tom Bradley", product: "Ninja ZX-10R", amount: "$17,499", status: "cancelled" },
  { id: "ORD-4816", customer: "Elena Vasquez", product: "Speed Triple 1200 RS", amount: "$19,495", status: "completed" },
];

const RecentOrdersTable = () => {
  return (
    <SectionCard title="Recent Orders" headerAction={<Typography variant="caption" sx={{ color: "#ff6b35", fontWeight: 600, cursor: "pointer" }}>View all &rarr;</Typography>}>
      <TableContainer sx={{ maxHeight: 350, overflowX: "auto" }}>
        <Table stickyHeader size="medium" sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow sx={{ "& th": { backgroundColor: "#18181b", color: "#71717a", fontWeight: 600, fontSize: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", px: 1, py: 1.5 } }}>
              <TableCell>Order</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow 
                key={order.id} 
                sx={{ 
                  "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.03)", color: "#e4e4e7", px: 1, py: 1.75 }, 
                  "&:hover td": { backgroundColor: "rgba(255, 255, 255, 0.01)" } 
                }}
              >
                <TableCell sx={{ fontWeight: 500, fontSize: "0.85rem", color: "#e28a3a" }}>
                  {order.id}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                  {order.customer}
                </TableCell>
                <TableCell sx={{ fontSize: "0.85rem" }}>
                  {order.product}
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem", color: "#ffffff" }}>
                  {order.amount}
                </TableCell>
                <TableCell>
                  <StatusChip status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SectionCard>
  );
};

export default RecentOrdersTable;
