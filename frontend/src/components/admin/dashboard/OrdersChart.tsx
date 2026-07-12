import { Box, Typography } from "@mui/material";
import SectionCard from "../common/SectionCard";

const data = [
  { month: "Jul", value: 42 },
  { month: "Aug", value: 44 },
  { month: "Sep", value: 37 },
  { month: "Oct", value: 43 },
  { month: "Nov", value: 49 },
  { month: "Dec", value: 53 },
];

const OrdersChart = () => {
  const maxValue = 60;

  return (
    <SectionCard title="Orders by Month" sx={{ height: "100%" }}>
      <Box sx={{ width: "100%", height: 260, position: "relative", mt: 1 }}>
        {/* Y Axis Labels on the left */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 30,
            width: 25,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            pr: 1,
            zIndex: 1,
          }}
        >
          {["60", "45", "30", "15", "0"].map((val) => (
            <Typography
              key={val}
              variant="caption"
              sx={{ color: "#71717a", fontSize: "0.7rem", fontWeight: 500 }}
            >
              {val}
            </Typography>
          ))}
        </Box>

        {/* Chart Bars Area */}
        <Box
          sx={{
            position: "absolute",
            left: 30,
            right: 0,
            top: 5,
            bottom: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            px: { xs: 1, sm: 2 },
          }}
        >
          {/* Background grid lines */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <Box sx={{ borderBottom: "1px dashed rgba(255, 255, 255, 0.03)", height: 0 }} />
            <Box sx={{ borderBottom: "1px dashed rgba(255, 255, 255, 0.03)", height: 0 }} />
            <Box sx={{ borderBottom: "1px dashed rgba(255, 255, 255, 0.03)", height: 0 }} />
            <Box sx={{ borderBottom: "1px dashed rgba(255, 255, 255, 0.03)", height: 0 }} />
            <Box sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)", height: 0 }} />
          </Box>

          {/* Actual Bars */}
          {data.map((item) => {
            const heightPercent = (item.value / maxValue) * 100;
            return (
              <Box
                key={item.month}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "12%",
                  height: "100%",
                  justifyContent: "flex-end",
                  zIndex: 1,
                }}
              >
                {/* Visual Bar Card */}
                <Box
                  sx={{
                    width: "100%",
                    height: `${heightPercent}%`,
                    backgroundColor: "#e28a3a", // Gold matching theme primary.main in App.tsx
                    borderRadius: "4px 4px 0 0",
                    transition: "all 0.2s ease-in-out",
                    opacity: 0.85,
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 1,
                      transform: "scaleY(1.03)",
                      backgroundColor: "#ff6b35", // Hover gradient color shift
                      boxShadow: "0 0 12px rgba(226, 138, 58, 0.4)",
                    },
                  }}
                  title={`${item.value} orders`}
                />
              </Box>
            );
          })}
        </Box>

        {/* X Axis Labels under bars */}
        <Box
          sx={{
            position: "absolute",
            left: 30,
            right: 0,
            bottom: 0,
            height: 25,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1, sm: 2 },
          }}
        >
          {data.map((item) => (
            <Box
              key={item.month}
              sx={{
                width: "12%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#71717a", fontSize: "0.7rem", fontWeight: 500 }}
              >
                {item.month}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </SectionCard>
  );
};

export default OrdersChart;
