import { Box, Typography } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SettingsIcon from "@mui/icons-material/Settings";
import ConstructionIcon from "@mui/icons-material/Construction";
import ScaleIcon from "@mui/icons-material/Scale";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import BoltIcon from "@mui/icons-material/Bolt";
import { Product } from "@/types/product.ts";

interface SpecStripProps {
  product: Product;
}

const SpecStrip = ({ product }: SpecStripProps) => {
  const ccVal = product.engineCapacity || 649;
  const hpVal = Math.round(ccVal * 0.146) || 95;
  const torqueVal = Math.round(ccVal * 0.098) || 64;
  
  const isElectric = product.category?.categoryName?.toLowerCase() === "electric";
  const transVal = isElectric ? "Automatic" : (ccVal > 900 ? "6-speed DCT" : "6-speed Manual");
  
  const weightKg = product.weightGram ? Math.round(product.weightGram / 1000) : 202;
  const fuelL = isElectric ? "N/A" : "15.4 L";
  const seatMm = product.heightCm ? Math.round(product.heightCm * 10) : 810;
  const topSpeed = Math.round(ccVal * 0.32 + 50) || 212;

  const specs = [
    {
      icon: <SpeedIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />,
      value: isElectric ? "Electric Motor" : `${ccVal}cc Inline-4`,
      label: "ENGINE",
    },
    {
      icon: <FlashOnIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />,
      value: `${hpVal} HP`,
      label: "POWER",
    },
    {
      icon: <SettingsIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />,
      value: `${torqueVal} Nm`,
      label: "TORQUE",
    },
    {
      icon: <ConstructionIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />,
      value: transVal,
      label: "TRANSMISSION",
    },
    {
      icon: <ScaleIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />,
      value: `${weightKg} kg`,
      label: "WET WEIGHT",
    },
    {
      icon: <LocalGasStationIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />,
      value: fuelL,
      label: "FUEL TANK",
    },
    {
      icon: <SwapCallsIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />,
      value: `${seatMm} mm`,
      label: "SEAT HEIGHT",
    },
    {
      icon: <BoltIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />,
      value: `${topSpeed} km/h`,
      label: "TOP SPEED",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#0d0d0f",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        py: 4,
        px: { xs: 2, md: 6 },
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(4, 1fr)",
          lg: "repeat(8, 1fr)",
        },
        gap: { xs: 4, lg: 2 },
      }}
    >
      {specs.map((spec, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1.5,
            borderRight: {
              xs: "none",
              sm: index % 4 !== 3 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
              lg: index !== 7 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
            },
            pr: {
              xs: 0,
              sm: index % 4 !== 3 ? 2 : 0,
              lg: index !== 7 ? 2 : 0,
            },
          }}
        >
          {spec.icon}
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 800,
                color: "white",
                fontSize: "0.95rem",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {spec.value}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em",
                fontSize: "0.65rem",
                display: "block",
                mt: 0.5,
              }}
            >
              {spec.label}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SpecStrip;
