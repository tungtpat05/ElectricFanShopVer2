import { Box, Grid, Typography } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import HeroSection from "../components/product/HeroSection.tsx";
import FeaturedBrands from "../components/product/FeaturedBrands.tsx";
import ProductList from "../components/product/ProductList.tsx";

const ProductPage = () => {
  const { products, loading, error } = useProducts();

  // Premium loading skeletons matching the actual layout
  if (loading) {
    return (
      <Box sx={{ mt: "-64px", backgroundColor: "#09090b", minHeight: "100vh" }}>
        <HeroSection />
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <FeaturedBrands />
        </Box>
        <Box sx={{ py: 6, px: { xs: 2, md: 6 } }}>
          <Grid container spacing={4}>
            {/* Filter Sidebar Skeleton */}
            <Grid size={{ xs: 12, lg: 3 }}>
              <Box
                sx={{
                  backgroundColor: "#121214",
                  height: "550px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  animation: "pulse 1.8s infinite ease-in-out",
                  "@keyframes pulse": {
                    "0%, 100%": { opacity: 0.6 },
                    "50%": { opacity: 0.35 },
                  },
                }}
              />
            </Grid>
            {/* Product Items Skeletons */}
            <Grid size={{ xs: 12, lg: 9 }}>
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
                {[...Array(8)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      backgroundColor: "#121214",
                      height: "460px",
                      borderRadius: "16px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      animation: "pulse 1.8s infinite ease-in-out",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }

  // Handle Fetch Errors gracefully
  if (error) {
    return (
      <Box sx={{ mt: "-64px", backgroundColor: "#09090b", minHeight: "100vh" }}>
        <HeroSection />
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <FeaturedBrands />
        </Box>
        <Box sx={{ py: 12, textAlign: "center", color: "white" }}>
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              p: 5,
              borderRadius: "16px",
              backgroundColor: "#121214",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              maxWidth: "500px",
              mx: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#f87171" }}>
              Error Retrieving Products
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 3 }}>
              {error || "We encountered an issue connecting to the product service. Please verify server connection and try again."}
            </Typography>
            <Box
              component="button"
              onClick={() => window.location.reload()}
              sx={{
                cursor: "pointer",
                backgroundColor: "#e28a3a",
                color: "black",
                border: "none",
                fontWeight: 700,
                borderRadius: "8px",
                px: 4,
                py: 1.5,
                transition: "background-color 0.2s",
                "&:hover": { backgroundColor: "#f0a256" },
              }}
            >
              Try Again
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: "-64px", backgroundColor: "#09090b", minHeight: "100vh" }}>
      {/* 1. Hero / Search section */}
      <HeroSection />

      {/* 2. Featured Brand Logo Grid Section */}
      <Box sx={{ px: { xs: 2, md: 6 } }}>
        <FeaturedBrands />
      </Box>

      {/* 3. Sidebar Filters & Product Catalog Cards Layout */}
      <ProductList products={products} />
    </Box>
  );
};

export default ProductPage;
