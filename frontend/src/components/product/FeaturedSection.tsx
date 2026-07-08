import { Box, Typography, Button, Grid, CircularProgress, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import FeaturedCard from "./FeaturedCard";

const FeaturedSection = () => {
  const { products, loading, error } = useProducts();

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

  // Display the first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#09090b",
      }}
    >
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
              HANDPICKED
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
              Featured Motorcycles
            </Typography>
          </Box>
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

        {/* Featured Cards Grid */}
        <Grid container spacing={4}>
          {featuredProducts.map((product, index) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <FeaturedCard product={product} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedSection;
