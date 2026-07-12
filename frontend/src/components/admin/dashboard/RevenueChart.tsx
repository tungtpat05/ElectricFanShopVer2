import { Box, Typography } from "@mui/material";
import SectionCard from "../common/SectionCard";

const RevenueChart = () => {
  return (
    <SectionCard
      title="Revenue Overview"
      subtitle="Full year 2024"
      headerAction={
        <Box
          sx={{
            backgroundColor: "rgba(34, 197, 94, 0.08)",
            color: "#22c55e",
            px: 1.5,
            py: 0.5,
            borderRadius: 1.5,
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          +18.2% YoY
        </Box>
      }
      sx={{ height: "100%" }}
    >
      <Box sx={{ width: "100%", height: 260, position: "relative", mt: 1 }}>
        {/* Y Axis Labels on the extreme left */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 30,
            width: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            pr: 1,
            zIndex: 1,
          }}
        >
          {["$600k", "$450k", "$300k", "$150k", "$0k"].map((val) => (
            <Typography
              key={val}
              variant="caption"
              sx={{ color: "#71717a", fontSize: "0.7rem", fontWeight: 500 }}
            >
              {val}
            </Typography>
          ))}
        </Box>

        {/* Chart Canvas */}
        <Box
          sx={{
            position: "absolute",
            left: 45,
            right: 10,
            top: 5,
            bottom: 30,
          }}
        >
          {/* Custom SVG Spline Graphic */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 220"
            preserveAspectRatio="none"
            style={{ display: "block", overflow: "visible" }}
          >
            <defs>
              {/* Spline area glow gradient */}
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e28a3a" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#e28a3a" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="0" x2="600" y2="0" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="3" />
            <line x1="0" y1="55" x2="600" y2="55" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="3" />
            <line x1="0" y1="110" x2="600" y2="110" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="3" />
            <line x1="0" y1="165" x2="600" y2="165" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="3" />
            <line x1="0" y1="220" x2="600" y2="220" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />

            {/* Area Path */}
            <path
              d="M 0 160 C 50 140, 70 150, 100 135 C 130 120, 170 120, 200 110 C 230 100, 270 125, 300 110 C 330 95, 370 85, 400 115 C 430 145, 470 120, 500 110 C 530 100, 550 90, 600 80 L 600 220 L 0 220 Z"
              fill="url(#chartGradient)"
            />

            {/* Line Path */}
            <path
              d="M 0 160 C 50 140, 70 150, 100 135 C 130 120, 170 120, 200 110 C 230 100, 270 125, 300 110 C 330 95, 370 85, 400 115 C 430 145, 470 120, 500 110 C 530 100, 550 90, 600 80"
              fill="none"
              stroke="#e28a3a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Glowing Pointer Hover Dot */}
            <circle cx="600" cy="80" r="5" fill="#e28a3a" />
            <circle cx="600" cy="80" r="10" fill="#e28a3a" fillOpacity="0.3" />
          </svg>
        </Box>

        {/* X Axis Labels under canvas */}
        <Box
          sx={{
            position: "absolute",
            left: 45,
            right: 10,
            bottom: 0,
            height: 25,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
            <Typography
              key={month}
              variant="caption"
              sx={{ color: "#71717a", fontSize: "0.7rem", fontWeight: 500 }}
            >
              {month}
            </Typography>
          ))}
        </Box>
      </Box>
    </SectionCard>
  );
};

export default RevenueChart;
