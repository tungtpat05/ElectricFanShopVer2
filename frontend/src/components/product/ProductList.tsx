import { useState, useMemo, useEffect } from "react";
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
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ProductItem from "./ProductItem.tsx";
import FilterSidebar from "./FilterSidebar.tsx";
import { Product } from "@/types/product.ts";

interface ProductListProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 8;

const ProductList = ({ products }: ProductListProps) => {
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever sorting or products list changes
  useEffect(() => {
    setPage(1);
  }, [products.length, sortBy]);

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "price-low") {
      list.sort((a, b) => (a.discountPrice || a.basePrice) - (b.discountPrice || b.basePrice));
    } else if (sortBy === "price-high") {
      list.sort((a, b) => (b.discountPrice || b.basePrice) - (a.discountPrice || a.basePrice));
    } else if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }
    return list;
  }, [products, sortBy]);

  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Ensure current page is always within valid bounds
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  };

  // Helper to generate pagination page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

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
                {totalItems > 0 ? startIndex + 1 : 0}–{endIndex}
              </Box>{" "}
              of{" "}
              <Box component="span" sx={{ fontWeight: 800, color: "white" }}>
                {totalItems}
              </Box>{" "}
              products
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
                </Select>
              </FormControl>
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
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
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
                  No products found
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)" }}>
                  Try adjusting your filters or search terms.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Custom Styled Pagination bar */}
          {totalPages > 1 && (
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
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "30px",
                  px: 3.5,
                  py: 1.2,
                  fontSize: "0.85rem",
                  "&.Mui-disabled": {
                    color: "rgba(255,255,255,0.2)",
                    borderColor: "rgba(255,255,255,0.05)",
                  },
                  "&:hover": {
                    borderColor: "#e28a3a",
                    color: "#e28a3a",
                    backgroundColor: "rgba(226, 138, 58, 0.05)",
                  },
                }}
              >
                Previous
              </Button>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {getPageNumbers().map((p, index) =>
                  typeof p === "number" ? (
                    <IconButton
                      key={p}
                      onClick={() => handlePageChange(p)}
                      sx={{
                        width: "42px",
                        height: "42px",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: currentPage === p ? "#000" : "white",
                        backgroundColor: currentPage === p ? "#e28a3a" : "transparent",
                        border: currentPage === p ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                        "&:hover": {
                          backgroundColor: currentPage === p ? "#f0a256" : "rgba(255,255,255,0.08)",
                          borderColor: currentPage === p ? "none" : "rgba(255,255,255,0.2)",
                        },
                      }}
                    >
                      {p}
                    </IconButton>
                  ) : (
                    <Typography
                      key={`ellipsis-${index}`}
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.4)",
                        px: 1,
                      }}
                    >
                      {p}
                    </Typography>
                  )
                )}
              </Box>

              <Button
                variant="outlined"
                endIcon={<KeyboardArrowRightIcon />}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "30px",
                  px: 3.5,
                  py: 1.2,
                  fontSize: "0.85rem",
                  "&.Mui-disabled": {
                    color: "rgba(255,255,255,0.2)",
                    borderColor: "rgba(255,255,255,0.05)",
                  },
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
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductList;

