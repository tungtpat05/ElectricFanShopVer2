import { Box, Typography, Button, Rating, Grid, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";

interface FeaturedCardProps {
  product: Product;
  index: number;
}

const getProductBadge = (index: number) => {
  switch (index % 4) {
    case 0:
      return { text: "EDITOR'S PICK", bgColor: "#e28a3a", textColor: "#000000" };
    case 1:
      return { text: "BEST SELLER", bgColor: "#22c55e", textColor: "#000000" };
    case 2:
      return { text: "TRENDING", bgColor: "#a855f7", textColor: "#ffffff" };
    case 3:
    default:
      return { text: "PREMIUM", bgColor: "#eab308", textColor: "#000000" };
  }
};

const getCategoryColors = (catName: string) => {
  const name = catName.toLowerCase();
  if (name.includes("naked")) return { bg: "rgba(168, 85, 247, 0.15)", text: "#c084fc" };
  if (name.includes("sport")) return { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171" };
  if (name.includes("adventure")) return { bg: "rgba(234, 179, 8, 0.15)", text: "#facc15" };
  if (name.includes("enduro")) return { bg: "rgba(34, 197, 94, 0.15)", text: "#4ade80" };
  return { bg: "rgba(226, 138, 58, 0.15)", text: "#e28a3a" };
};

const FeaturedCard = ({ product, index }: FeaturedCardProps) => {
  const badge = getProductBadge(index);
  const catColors = getCategoryColors(product.category?.categoryName || "Sport");
  
  const ccVal = 650;
  const hpVal = 95;
  const year = product.createdAt ? new Date(product.createdAt).getFullYear() : 2024;

  return (
    <Box
      sx={{
        backgroundColor: "#121214",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "24px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
          borderColor: "rgba(226, 138, 58, 0.3)",
          "& .card-img": {
            transform: "scale(1.08)",
          },
        },
      }}
    >
      {/* Thumbnail Area */}
      <Box
        sx={{
          position: "relative",
          height: "240px",
          backgroundColor: "#17171a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          overflow: "hidden",
        }}
      >
        {/* Custom Promo Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            backgroundColor: badge.bgColor,
            color: badge.textColor,
            px: 1.5,
            py: 0.6,
            borderRadius: "6px",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.05em",
            zIndex: 3,
          }}
        >
          {badge.text}
        </Box>

        {/* Favorite Icon */}
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#ffffff",
            zIndex: 3,
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
            },
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: "1.15rem" }} />
        </IconButton>

        {/* Product Image */}
        <Box
          component="img"
          className="card-img"
          src={product.thumbnail || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400"}
          alt={product.productName}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Year Label */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            backgroundColor: "#0c0c0e",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            px: 1.2,
            py: 0.4,
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 800,
            zIndex: 3,
          }}
        >
          {year}
        </Box>
      </Box>

      {/* Info Content Area */}
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Brand Name */}
        <Typography
          variant="caption"
          sx={{
            color: "#e28a3a",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            mb: 0.8,
            display: "block",
          }}
        >
          {product.brand?.brandName || "MUTED BRAND"}
        </Typography>

        {/* Model Name */}
        <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            fontWeight: 800,
            fontSize: "1.3rem",
            lineHeight: 1.2,
            mb: 1.2,
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

        {/* Ratings */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3.5 }}>
          <Rating
            value={4.9}
            precision={0.1}
            readOnly
            size="small"
            sx={{
              color: "#e28a3a",
              "& .MuiRating-iconEmpty": { color: "rgba(255, 255, 255, 0.15)" },
            }}
          />
          <Typography variant="caption" sx={{ fontWeight: 800, color: "#ffffff", fontSize: "0.8rem" }}>
            4.9
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.8rem" }}>
            (128 reviews)
          </Typography>
        </Box>

        {/* Spec Pill Boxes */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6 }}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "14px",
                p: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.4)",
                  display: "block",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  mb: 0.5,
                }}
              >
                ENGINE
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 800, fontSize: "0.85rem" }}>
                {ccVal}cc
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Box
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "14px",
                p: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.4)",
                  display: "block",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  mb: 0.5,
                }}
              >
                POWER
              </Typography>
              <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: 800, fontSize: "0.85rem" }}>
                {hpVal} HP
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Pricing and Category Pill */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3.5 }}>
          <Box>
            <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", display: "block", fontSize: "0.75rem", mb: 0.2 }}>
              From
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#ffffff", fontSize: "1.3rem" }}>
              ${(product.discountPrice || product.basePrice).toLocaleString()}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: catColors.bg,
              color: catColors.text,
              px: 1.8,
              py: 0.6,
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            {(product.category?.categoryName || "Sport").toUpperCase()}
          </Box>
        </Box>

        {/* Action Button */}
        <Button
          component={Link}
          to={`/products/${product.id}`}
          variant="outlined"
          fullWidth
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderColor: "#e28a3a",
            color: "#e28a3a",
            borderRadius: "14px",
            py: 1.5,
            fontWeight: 800,
            textTransform: "none",
            fontSize: "0.9rem",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: "#f0a256",
              backgroundColor: "rgba(226, 138, 58, 0.08)",
              color: "#f0a256",
            },
          }}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
};

export default FeaturedCard;
