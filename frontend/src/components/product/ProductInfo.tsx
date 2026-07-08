import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Rating,
  Button,
  Grid,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GppGoodIcon from "@mui/icons-material/GppGood";
import RestoreIcon from "@mui/icons-material/Restore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CheckIcon from "@mui/icons-material/Check";
import { Product } from "@/types/product.ts";

interface ProductInfoProps {
  product: Product;
}

const COLORS = [
  { id: "black", value: "#262626", name: "Graphite Black" },
  { id: "red", value: "#b22222", name: "Candy Chromosphere Red" },
  { id: "blue", value: "#6d7b8d", name: "Matte Denim Blue" },
];

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedYear, setSelectedYear] = useState("2024");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const hasDiscount = product.discountPrice && product.discountPrice < product.basePrice;
  const displayPrice = hasDiscount ? product.discountPrice : product.basePrice;
  const monthlyPayment = Math.round(displayPrice / 60);

  const categoryName = product.category?.categoryName || "Naked";

  const getTagColor = (catName: string) => {
    const name = catName.toLowerCase();
    if (name.includes("naked")) return "rgba(168, 85, 247, 0.25)"; // Purple
    if (name.includes("sport")) return "rgba(239, 68, 68, 0.25)"; // Red
    if (name.includes("adventure")) return "rgba(234, 179, 8, 0.25)"; // Yellow
    if (name.includes("electric")) return "rgba(59, 130, 246, 0.25)"; // Blue
    return "rgba(226, 138, 58, 0.25)"; // Default Gold/Orange
  };

  const getTagTextColor = (catName: string) => {
    const name = catName.toLowerCase();
    if (name.includes("naked")) return "#c084fc";
    if (name.includes("sport")) return "#f87171";
    if (name.includes("adventure")) return "#facc15";
    if (name.includes("electric")) return "#60a5fa";
    return "#e28a3a";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
      {/* Category Tag & Brand */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 800,
            color: "rgba(255, 255, 255, 0.4)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {product.brand?.brandName || "HONDA"}
        </Typography>
        <Box
          sx={{
            backgroundColor: getTagColor(categoryName),
            color: getTagTextColor(categoryName),
            px: 2,
            py: 0.5,
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {categoryName}
        </Box>
      </Box>

      {/* Product Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: "white",
          fontFamily: "'Outfit', 'Inter', sans-serif",
          fontSize: { xs: "2rem", md: "2.5rem" },
          lineHeight: 1.15,
        }}
      >
        {product.productName}
      </Typography>

      {/* Ratings and Stock State Row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Rating value={4.9} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ fontWeight: 700, color: "white", ml: 0.5 }}>
            4.9
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)" }}>
            (128 reviews)
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.25)" }}>
          •
        </Typography>
        <Chip
          label="• In Stock"
          size="small"
          sx={{
            backgroundColor: "rgba(46, 125, 50, 0.15)",
            color: "#4caf50",
            fontWeight: 700,
            fontSize: "0.75rem",
            px: 0.5,
          }}
        />
      </Box>

      {/* Pricing Information Panel */}
      <Box
        sx={{
          backgroundColor: "#121214",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "16px",
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              color: "rgba(255, 255, 255, 0.3)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              mb: 0.5,
            }}
          >
            Starting Price
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "white" }}>
            {formatPrice(displayPrice)}
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.3)" }}>
            MSRP · Excl. dealer fees
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255, 255, 255, 0.4)", display: "block" }}
          >
            Est. monthly
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#e28a3a" }}>
            ${monthlyPayment}
            <Typography component="span" variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
              /mo
            </Typography>
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.3)" }}>
            0% APR · 60 months
          </Typography>
        </Box>
      </Box>

      {/* Color Selection Picker */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Color
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "rgba(255, 255, 255, 0.7)" }}>
            {selectedColor.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {COLORS.map((col) => (
            <Box
              key={col.id}
              onClick={() => setSelectedColor(col)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: col.value,
                border: "2px solid",
                borderColor: selectedColor.id === col.id ? "white" : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s",
                boxShadow: "inset 0px 0px 4px rgba(0,0,0,0.5)",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              {selectedColor.id === col.id && (
                <CheckIcon sx={{ fontSize: 16, color: "white" }} />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Model Year Selection Picker */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 1.5,
          }}
        >
          Model Year
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {["2024", "2023"].map((year) => {
            const isActive = selectedYear === year;
            return (
              <Button
                key={year}
                variant="outlined"
                onClick={() => setSelectedYear(year)}
                sx={{
                  color: isActive ? "#e28a3a" : "rgba(255, 255, 255, 0.4)",
                  borderColor: isActive ? "#e28a3a" : "rgba(255, 255, 255, 0.15)",
                  backgroundColor: isActive ? "rgba(226, 138, 58, 0.05)" : "transparent",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  px: 3,
                  py: 1,
                  borderRadius: "20px",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#e28a3a",
                    backgroundColor: "rgba(226, 138, 58, 0.05)",
                  },
                }}
              >
                {year}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Short Summary Section with Left vertical border */}
      <Box
        sx={{
          borderLeft: "2px solid #e28a3a",
          pl: 2.5,
          py: 0.5,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
        >
          {product.summary || "No summary description available for this motorcycle model."}
        </Typography>
      </Box>

      {/* Call to action purchase buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#e28a3a",
            color: "#000000",
            py: 2,
            borderRadius: "8px",
            fontWeight: 800,
            textTransform: "none",
            fontSize: "0.95rem",
            "&:hover": {
              backgroundColor: "#f0a256",
            },
          }}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderColor: "#e28a3a",
            color: "#e28a3a",
            py: 2,
            borderRadius: "8px",
            fontWeight: 800,
            textTransform: "none",
            fontSize: "0.95rem",
            "&:hover": {
              borderColor: "#f0a256",
              backgroundColor: "rgba(226, 138, 58, 0.05)",
            },
          }}
        >
          Buy Now
        </Button>
      </Box>

      {/* Sub-actions row: Wishlist, Share, Compare */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1.5,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          pb: 3.5,
        }}
      >
        <Button
          startIcon={<FavoriteBorderIcon />}
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.85rem",
            fontWeight: 700,
            textTransform: "none",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            flexGrow: 1,
            py: 1,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "white",
            },
          }}
        >
          Wishlist
        </Button>
        <Button
          startIcon={<ShareIcon />}
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.85rem",
            fontWeight: 700,
            textTransform: "none",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            flexGrow: 1,
            py: 1,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "white",
            },
          }}
        >
          Share
        </Button>
        <Button
          startIcon={<CompareArrowsIcon />}
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.85rem",
            fontWeight: 700,
            textTransform: "none",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            flexGrow: 1,
            py: 1,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "white",
            },
          }}
        >
          Compare
        </Button>
      </Box>

      {/* Services Grid (Benefits List) */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 6 }} sx={{ display: "flex", gap: 1.5 }}>
          <LocalShippingIcon sx={{ color: "#e28a3a", mt: 0.2 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "white" }}>
              Free Delivery
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
              On new models
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }} sx={{ display: "flex", gap: 1.5 }}>
          <GppGoodIcon sx={{ color: "#e28a3a", mt: 0.2 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "white" }}>
              3-Year Warranty
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
              Brand Certified
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }} sx={{ display: "flex", gap: 1.5 }}>
          <RestoreIcon sx={{ color: "#e28a3a", mt: 0.2 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "white" }}>
              30-Day Returns
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
              No questions asked
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }} sx={{ display: "flex", gap: 1.5 }}>
          <StorefrontIcon sx={{ color: "#e28a3a", mt: 0.2 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "white" }}>
              Find a Dealer
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
              250+ locations
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductInfo;
