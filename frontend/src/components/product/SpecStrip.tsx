import React from "react";
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
import { ProductSpecification } from "@/types/specDefinition.ts";

interface SpecStripProps {
  product: Product;
}

const getSpecIcon = (keyCode: string) => {
  const code = keyCode.toLowerCase();
  if (code.includes("displacement") || code.includes("cc") || code.includes("engine")) {
    return <SpeedIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />;
  }
  if (code.includes("power") || code.includes("hp")) {
    return <FlashOnIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />;
  }
  if (code.includes("torque") || code.includes("nm")) {
    return <SettingsIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />;
  }
  if (code.includes("transmission") || code.includes("gear") || code.includes("box")) {
    return <ConstructionIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />;
  }
  if (code.includes("weight") || code.includes("kg")) {
    return <ScaleIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />;
  }
  if (code.includes("fuel") || code.includes("gas") || code.includes("tank")) {
    return <LocalGasStationIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />;
  }
  if (code.includes("height") || code.includes("seat") || code.includes("mm")) {
    return <SwapCallsIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />;
  }
  return <BoltIcon sx={{ color: "#e28a3a", fontSize: "1.5rem" }} />;
};

const formatSpecValue = (spec: ProductSpecification): string => {
  if (spec.dataType === "select" && spec.optionValue) {
    return spec.optionValue;
  }
  if (spec.dataType === "number" && spec.valueNumber !== undefined && spec.valueNumber !== null) {
    const formattedNum = Number.isInteger(spec.valueNumber)
      ? String(spec.valueNumber)
      : String(Number(spec.valueNumber));
    return spec.unit ? `${formattedNum} ${spec.unit}` : formattedNum;
  }
  if (spec.value) {
    return spec.value;
  }
  return "-";
};

const SpecStrip: React.FC<SpecStripProps> = ({ product }) => {
  const specifications = product.specifications || [];

  if (specifications.length === 0) {
    return null; // Hide spec strip if no dynamic specs are provided
  }

  // Display top 8 specs
  const displaySpecs = specifications.slice(0, 8);

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
          sm: `repeat(${Math.min(4, displaySpecs.length)}, 1fr)`,
          lg: `repeat(${displaySpecs.length}, 1fr)`,
        },
        gap: { xs: 4, lg: 2 },
      }}
    >
      {displaySpecs.map((spec, index) => (
        <Box
          key={spec.id || index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1.5,
            borderRight: {
              xs: "none",
              sm: index % 4 !== 3 && index !== displaySpecs.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
              lg: index !== displaySpecs.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
            },
            pr: {
              xs: 0,
              sm: index % 4 !== 3 ? 2 : 0,
              lg: index !== displaySpecs.length - 1 ? 2 : 0,
            },
          }}
        >
          {getSpecIcon(spec.keyCode || "")}
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
              {formatSpecValue(spec)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                fontSize: "0.65rem",
                display: "block",
                mt: 0.5,
                textTransform: "uppercase",
              }}
            >
              {spec.displayName}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SpecStrip;
