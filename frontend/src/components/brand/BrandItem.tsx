import { Box, Typography } from "@mui/material";
import { Brand } from "@/types/brand";

interface BrandItemProps {
  brand: Brand;
}

const BrandItem = ({ brand }: BrandItemProps) => {

  return (
    <Box
      sx={{
        backgroundColor: "#0d0d0f",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        width: 180,
        height: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: "#e28a3a",
          backgroundColor: "#121215",
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(226, 138, 58, 0.1)",
          "& .brand-line": {
            width: 32,
            backgroundColor: "#e28a3a",
          }
        },
      }}
    >
      {/* Brand Logo Container */}
      <Box
        sx={{
          height: 64,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          mb: 2.5,
        }}
      >
        {brand.logoUrl ? (
          <Box
            component="img"
            src={brand.logoUrl}
            alt={brand.brandName}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              filter: brand.brandName.toLowerCase() === "kawasaki"
                ? "brightness(0) invert(1) drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
                : "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))",
            }}
          />
        ) : (
          <Box sx={{ width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        )}
      </Box>

      {/* Brand Name Text */}
      <Typography
        sx={{
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "0.02em",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {brand.brandName}
      </Typography>

      {/* Dash Line Indicator */}
      <Box
        className="brand-line"
        sx={{
          width: 16,
          height: 2.5,
          backgroundColor: "rgba(226, 138, 58, 0.4)",
          borderRadius: "4px",
          mt: 1.5,
          transition: "all 0.3s ease",
        }}
      />
    </Box>
  );
};

export default BrandItem;
