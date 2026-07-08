import { Box, Typography } from "@mui/material";
import { Brand } from "@/types/brand";

interface BrandItemProps {
  brand: Brand;
}

const BrandItem = ({ brand }: BrandItemProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "100px",
        px: 4,
        py: 1.8,
        cursor: "pointer",
        textAlign: "center",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: "#e28a3a",
          backgroundColor: "rgba(226, 138, 58, 0.08)",
          transform: "translateY(-2px)",
          boxShadow: "0 10px 20px rgba(226, 138, 58, 0.05)",
        },
      }}
    >
      <Typography
        sx={{
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        {brand.brandName}
      </Typography>
    </Box>
  );
};

export default BrandItem;
