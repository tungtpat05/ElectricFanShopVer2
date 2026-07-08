import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Breadcrumbs,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useProductDetail } from "@/hooks/useProductDetail";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SpecStrip from "@/components/product/SpecStrip";
import TabbedDetails from "@/components/product/TabbedDetails";
import CustomerReviews from "@/components/product/CustomerReviews";
import RelatedProducts from "@/components/product/RelatedProducts";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProductDetail(id);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#e28a3a" }} />
        <Typography variant="body1" sx={{ color: "white", fontWeight: 700 }}>
          Loading motorcycle details...
        </Typography>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          gap: 3,
        }}
      >
        <Typography variant="h5" sx={{ color: "#ef4444", fontWeight: 800 }}>
          Error Loading Details
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
          {error || "Motorcycle model detail could not be found."}
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{
            backgroundColor: "#e28a3a",
            color: "#000000",
            fontWeight: 800,
            textTransform: "none",
            "&:hover": { backgroundColor: "#f0a256" },
          }}
        >
          Return to Catalog
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#09090b", minHeight: "100vh", pb: 10 }}>
      {/* Top Navigation & Breadcrumbs Bar */}
      <Box sx={{ py: 3, px: { xs: 2, md: 6 } }}>
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.2)" }} />}
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 700 }}>
              Home
            </Typography>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 700 }}>
              Products
            </Typography>
          </Link>
          <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 700 }}>
            {product.brand?.brandName || "Honda"}
          </Typography>
          <Typography variant="caption" sx={{ color: "#e28a3a", fontWeight: 800 }}>
            {product.slug || product.productName}
          </Typography>
        </Breadcrumbs>

        {/* Back Link */}
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "rgba(255, 255, 255, 0.5)",
              transition: "color 0.15s",
              "&:hover": { color: "white" },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Back to listing
            </Typography>
          </Box>
        </Link>
      </Box>

      {/* Main Showroom Section */}
      <Box sx={{ px: { xs: 2, md: 6 }, mb: 6 }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Left Column: Image Showroom */}
          <Grid size={{ xs: 12, md: 6.5 }}>
            <ProductGallery thumbnailUrl={product.thumbnail} productName={product.productName} />
          </Grid>

          {/* Right Column: Information Panel */}
          <Grid size={{ xs: 12, md: 5.5 }}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>
      </Box>

      {/* Quick Specifications Strip */}
      <SpecStrip product={product} />

      {/* Detailed specs, features and description block */}
      <Box sx={{ px: { xs: 2, md: 6 } }}>
        <TabbedDetails product={product} />
        
        {/* Customer Reviews Section */}
        <CustomerReviews />

        {/* Similar models recommendation grid */}
        <RelatedProducts currentProductId={product.id} />
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
