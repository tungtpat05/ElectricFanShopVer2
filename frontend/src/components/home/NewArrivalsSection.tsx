import { Box, Typography, Button, IconButton, CircularProgress, Container } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";

const TRUST_BADGES = [
  "Secure Payments",
  "Verified Listings",
  "Title Guarantee",
  "Inspection Reports",
  "Price Match Promise",
];

const getArrivalBadge = (index: number) => {
  switch (index % 5) {
    case 0:
      return { text: "JUST IN", bgColor: "#e28a3a", textColor: "#000" };
    case 1:
      return { text: "NEW", bgColor: "rgba(255,255,255,0.15)", textColor: "#fff" };
    case 2:
      return { text: "HOT", bgColor: "#e28a3a", textColor: "#000" };
    case 3:
      return { text: "NEW", bgColor: "rgba(255,255,255,0.15)", textColor: "#fff" };
    case 4:
    default:
      return { text: "ELECTRIC", bgColor: "#60a5fa", textColor: "#000" };
  }
};

const NewArrivalsSection = () => {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

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

  // Display products from index 4 onwards for New Arrivals
  const arrivals = products.slice(4, 9).length >= 3 ? products.slice(4, 9) : products.slice(0, 5);

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: "#09090b" }}>
      {/* 1. Trust Badges Row */}
      <Box
        sx={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          pb: 6,
          mb: 8,
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "space-between" },
              alignItems: "center",
              flexWrap: "wrap",
              gap: { xs: 2, md: 4 },
              overflowX: "auto",
              py: 1,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {TRUST_BADGES.map((badge) => (
              <Box
                key={badge}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                }}
              >
                <CheckIcon sx={{ color: "#e28a3a", fontSize: "1.1rem" }} />
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {badge}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 2. New Arrivals Header */}
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
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
              View all
            </Button>
          </Box>
        </Box>

        {/* 3. Arrivals Compact Cards scroller */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 2,
            pt: 1,
            width: "100%",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {arrivals.map((product, index) => {
            const badge = getArrivalBadge(index);
            const year = product.createdAt ? new Date(product.createdAt).getFullYear() : 2024;
            
            return (
              <Box
                key={product.id}
                sx={{
                  flexShrink: 0,
                  width: { xs: "280px", sm: "320px", md: "340px" },
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "rgba(226, 138, 58, 0.25)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
                  },
                }}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {/* Image Container */}
                <Box
                  sx={{
                    position: "relative",
                    height: "200px",
                    backgroundColor: "#17171a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2.5,
                  }}
                >
                  {/* Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      backgroundColor: badge.bgColor,
                      color: badge.textColor,
                      px: 1.2,
                      py: 0.5,
                      borderRadius: "4px",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                      zIndex: 3,
                    }}
                  >
                    {badge.text}
                  </Box>

                  {/* Product Image */}
                  <Box
                    component="img"
                    src={product.thumbnail || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400"}
                    alt={product.productName}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />

                  {/* Year badge bottom-right */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 14,
                      right: 14,
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "#ffffff",
                      px: 1,
                      py: 0.2,
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    {year}
                  </Box>
                </Box>

                {/* Details Container */}
                <Box sx={{ p: 2.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#e28a3a",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontSize: "0.7rem",
                      mb: 0.5,
                      display: "block",
                    }}
                  >
                    {product.brand?.brandName || "Honda"}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      color: "#ffffff",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      mb: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {product.productName}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: "#ffffff", fontSize: "1.15rem" }}>
                      ${(product.discountPrice || product.basePrice).toLocaleString()}
                    </Typography>

                    <Box
                      sx={{
                        color: "#e28a3a",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      Details <ArrowForwardIcon sx={{ fontSize: "0.9rem" }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default NewArrivalsSection;
