import { CircularProgress, Typography, Box, IconButton, Container } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useBrands } from "@/hooks/useBrands";
import BrandList from "./BrandList";

const BrandSection = () => {
  const { brands, loading, error } = useBrands();

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

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        backgroundColor: "#09090b",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 5,
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
              MANUFACTURERS
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
              World's Greatest Brands
            </Typography>
          </Box>

          {/* Navigation Arrows */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <IconButton
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
        </Box>

        {/* Brand Scroller Row */}
        <Box sx={{ mb: 4 }}>
          <BrandList brands={brands} />
        </Box>

        {/* Brand Summary Subtext */}
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.35)",
            textAlign: "center",
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          {brands.length} brands available • 50+ global manufacturers
        </Typography>
      </Container>
    </Box>
  );
};

export default BrandSection;
