import { forwardRef } from "react";
import { Box } from "@mui/material";
import BrandItem from "./BrandItem.tsx";
import { Brand } from "@/types/brand";

interface BrandListProps {
  brands: Brand[];
}

const BrandList = forwardRef<HTMLDivElement, BrandListProps>(({ brands }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        gap: 3,
        overflowX: "auto",
        scrollBehavior: "smooth",
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
});

BrandList.displayName = "BrandList";

export default BrandList;
