import { Card, Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  diff: string;
  isPositive: boolean;
  icon: ReactNode;
}

const MetricCard = ({ title, value, diff, isPositive, icon }: MetricCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "#18181b",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: 3,
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#71717a",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontSize: "0.75rem",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a1a1aa",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {icon}
        </Box>
      </Box>

      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#ffffff",
            mb: 0.75,
            fontSize: { xs: "1.75rem", md: "2.1rem" },
          }}
        >
          {value}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {isPositive ? (
            <ArrowUpwardIcon sx={{ color: "#22c55e", fontSize: "0.85rem" }} />
          ) : (
            <ArrowDownwardIcon sx={{ color: "#ef4444", fontSize: "0.85rem" }} />
          )}
          <Typography
            variant="caption"
            sx={{
              color: isPositive ? "#22c55e" : "#ef4444",
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            {diff}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default MetricCard;
