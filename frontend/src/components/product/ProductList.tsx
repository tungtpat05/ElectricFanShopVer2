import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Button,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ProductItem from "./ProductItem.tsx";
import FilterSidebar from "./FilterSidebar.tsx";
import AdventureBanner from "./AdventureBanner.tsx";
import { Product } from "@/types/product.ts";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  // Fallback / mock cards if API didn't return enough products
  const displayProducts = products.length > 0 ? products : [];

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 6 }, backgroundColor: "#09090b" }}>
      <Grid container spacing={4}>
        {/* Left Column: Filter Sidebar */}
        <Grid size={{ xs: 12, lg: 3 }} sx={{ position: { lg: "sticky" }, top: { lg: "88px" }, height: "fit-content", zIndex: 10 }}>
          <FilterSidebar />
        </Grid>

        {/* Right Column: Grid and Sorting Toolbar */}
        <Grid size={{ xs: 12, lg: 9 }}>
          {/* Sorting / Status Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Showing{" "}
              <Box component="span" sx={{ fontWeight: 800, color: "white" }}>
                1–{displayProducts.length || 12}
              </Box>{" "}
              of{" "}
              <Box component="span" sx={{ fontWeight: 800, color: "white" }}>
                582
              </Box>{" "}
              motorcycles
            </Typography>

            {/* Controls right */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Sort Dropdown */}
              <FormControl size="small" variant="outlined">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    backgroundColor: "#121214",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    minWidth: "140px",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e28a3a",
                    },
                  }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="popular">Popularity</MenuItem>
                </Select>
              </FormControl>

              {/* Grid / List Toggles */}
              <Box
                sx={{
                  display: "flex",
                  borderRadius: "8px",
                  p: 0.5,
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => setViewMode("grid")}
                  sx={{
                    color: viewMode === "grid" ? "#e28a3a" : "rgba(255,255,255,0.4)",
                    backgroundColor: viewMode === "grid" ? "rgba(226, 138, 58, 0.1)" : "transparent",
                    borderRadius: "6px",
                    "&:hover": {
                      backgroundColor: viewMode === "grid" ? "rgba(226, 138, 58, 0.15)" : "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <GridViewIcon sx={{ fontSize: "1.1rem" }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setViewMode("list")}
                  sx={{
                    color: viewMode === "list" ? "#e28a3a" : "rgba(255,255,255,0.4)",
                    backgroundColor: viewMode === "list" ? "rgba(226, 138, 58, 0.1)" : "transparent",
                    borderRadius: "6px",
                    "&:hover": {
                      backgroundColor: viewMode === "list" ? "rgba(226, 138, 58, 0.15)" : "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <ViewListIcon sx={{ fontSize: "1.1rem" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Cards Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
                xl: "1fr 1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            {displayProducts.length > 0 ? (
              <>
                {/* Visual grid cards before banner */}
                {displayProducts.slice(0, 4).map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}

                {/* Promotional Adventure Banner spanning full grid */}
                <AdventureBanner />

                {/* Visual grid cards after banner */}
                {displayProducts.slice(4).map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </>
            ) : (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 12,
                  textAlign: "center",
                  border: "1px dashed rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  p: 4,
                }}
              >
                <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                  No products retrieved
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)" }}>
                  Connecting with service layer. Wait, or check availability.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Custom Styled Pagination bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 8,
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<KeyboardArrowLeftIcon />}
              sx={{
                color: "rgba(255,255,255,0.7)",
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "30px",
                px: 3.5,
                py: 1.2,
                fontSize: "0.85rem",
                "&:hover": {
                  borderColor: "#e28a3a",
                  color: "#e28a3a",
                  backgroundColor: "rgba(226, 138, 58, 0.05)",
                },
              }}
            >
              Previous
            </Button>

            <Box sx={{ display: "flex", gap: 1 }}>
              {[1, 2, 3, 4].map((page) => (
                <IconButton
                  key={page}
                  sx={{
                    width: "42px",
                    height: "42px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: page === 2 ? "#000" : "white",
                    backgroundColor: page === 2 ? "#e28a3a" : "transparent",
                    border: page === 2 ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: page === 2 ? "#f0a256" : "rgba(255,255,255,0.08)",
                      borderColor: page === 2 ? "none" : "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  {page}
                </IconButton>
              ))}

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  alignSelf: "flex-end",
                  mb: 1.5,
                  mx: 0.5,
                }}
              >
                ...
              </Typography>
            </Box>

            <Button
              variant="outlined"
              endIcon={<KeyboardArrowRightIcon />}
              sx={{
                color: "rgba(255,255,255,0.7)",
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "30px",
                px: 3.5,
                py: 1.2,
                fontSize: "0.85rem",
                "&:hover": {
                  borderColor: "#e28a3a",
                  color: "#e28a3a",
                  backgroundColor: "rgba(226, 138, 58, 0.05)",
                },
              }}
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductList;
