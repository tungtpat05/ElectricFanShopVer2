import { Box } from "@mui/material";
import BrandItem from "./BrandItem.tsx";
import { Brand } from "@/types/brand";

interface BrandListProps {
  brands: Brand[];
}

const BrandList = ({ brands }: BrandListProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        pb: 2,
        pt: 1,
        px: 1,
        width: "100%",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {brands.map((brand) => (
        <Box key={brand.id} sx={{ flexShrink: 0 }}>
          <BrandItem brand={brand} />
        </Box>
      ))}
    </Box>
  );
};

export default BrandList;
