import { useState } from "react";
import { Box, Typography, Button, IconButton, CircularProgress, Container, Grid } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import ProductItem from "@/components/product/ProductItem";

const ITEMS_PER_PAGE = 4;

const NewArrivalsSection = () => {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(0);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Display top 8 products for New Arrivals
  const allArrivals = products.slice(0, 8);
  const totalPages = Math.ceil(allArrivals.length / ITEMS_PER_PAGE) || 1;

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const currentProducts = allArrivals.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#09090b" }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 6,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#e28a3a",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                mb: 1.5,
              }}
            >
              FRESH STOCK
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#fff",
                fontSize: { xs: "2rem", md: "2.8rem" },
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              New Arrivals
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {totalPages > 1 && (
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <IconButton
                  onClick={handlePrev}
                  aria-label="Previous products"
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    width: 48,
                    height: 48,
                    "&:hover": {
                      borderColor: "#e28a3a",
                      color: "#e28a3a",
                      backgroundColor: "rgba(226, 138, 58, 0.05)",
                    },
                  }}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  aria-label="Next products"
                  sx={{
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    width: 48,
                    height: 48,
                    "&:hover": {
                      borderColor: "#e28a3a",
                      color: "#e28a3a",
                      backgroundColor: "rgba(226, 138, 58, 0.05)",
                    },
                  }}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Box>
            )}
            <Button
              component={Link}
              to="/products"
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: "#e28a3a",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "0.95rem",
                p: 0,
                minWidth: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#f0a256",
                },
              }}
            >
              Browse all
            </Button>
          </Box>
        </Box>

        {/* 4 Cards Grid Layout */}
        <Grid container spacing={4}>
          {currentProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default NewArrivalsSection;
