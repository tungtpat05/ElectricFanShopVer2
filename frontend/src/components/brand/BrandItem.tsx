import { Box, Typography } from "@mui/material";
import { Brand } from "@/types/brand";

interface BrandItemProps {
  brand: Brand;
}

const BrandItem = ({ brand }: BrandItemProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#18181b",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "12px",
        px: 4,
        py: 2.2,
        cursor: "pointer",
        textAlign: "center",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "#e28a3a",
          backgroundColor: "rgba(226, 138, 58, 0.05)",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
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
