import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SpeedIcon from "@mui/icons-material/Speed";
import BoltIcon from "@mui/icons-material/Bolt";
import SettingsIcon from "@mui/icons-material/Settings";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Product } from "@/types/product.ts";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const [imageLoading, setImageLoading] = useState(true);

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

  // Extract specs dynamically if present, else fallback to No data
  const specs = product.specifications || [];
  const findSpec = (keyword: string) => {
    const found = specs.find((s) =>
      s.keyCode?.toLowerCase().includes(keyword) || s.displayName?.toLowerCase().includes(keyword)
    );
    if (!found) return "No data";
    if (found.dataType === "select" && found.optionValue) return found.optionValue;
    if (found.dataType === "number" && found.valueNumber != null) {
      return found.unit ? `${found.valueNumber} ${found.unit}` : String(found.valueNumber);
    }
    return found.value || "No data";
  };

  const engineVal = findSpec("displacement") !== "No data" ? findSpec("displacement") : findSpec("engine");
  const powerVal = findSpec("power") !== "No data" ? findSpec("power") : findSpec("hp");
  const transVal = findSpec("transmission") !== "No data" ? findSpec("transmission") : findSpec("gear");
  const absVal = findSpec("abs");
  const yearText = product.createdAt ? new Date(product.createdAt).getFullYear() : "No data";

  const getTagColor = (catName: string) => {
    const name = catName.toLowerCase();
    if (name.includes("naked")) return "rgba(168, 85, 247, 0.2)"; // Purple
    if (name.includes("sport")) return "rgba(239, 68, 68, 0.2)"; // Red
    if (name.includes("adventure")) return "rgba(234, 179, 8, 0.2)"; // Yellow
    if (name.includes("electric")) return "rgba(59, 130, 246, 0.2)"; // Blue
    return "rgba(226, 138, 58, 0.2)"; // Orange/Gold default
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
    <Box
      className="group"
      sx={{
        backgroundColor: "#121214",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: "rgba(226, 138, 58, 0.4)",
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
        },
      }}
    >
      {/* Thumbnail Area */}
      <Box
        sx={{
          position: "relative",
          height: "220px",
          backgroundColor: "#18181b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          overflow: "hidden",
        }}
      >
        {/* Category Pill Tag */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: getTagColor(product.category?.categoryName || "No data"),
            color: getTagTextColor(product.category?.categoryName || "No data"),
            px: 1.5,
            py: 0.4,
            borderRadius: "4px",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            zIndex: 3,
          }}
        >
          {product.category?.categoryName || "No data"}
        </Box>

        {/* Favorite Heart Button */}
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.05)",
            color: "white",
            zIndex: 3,
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
            },
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: "1.1rem" }} />
        </IconButton>

        {/* Product Image */}
        {imageLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #18181b 25%, #27272a 50%, #18181b 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "-200% 0" },
                "100%": { backgroundPosition: "200% 0" },
              },
            }}
          />
        )}
        <Box
          component="img"
          src={product.thumbnail || ""}
          alt={product.productName || "Product"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.4s ease",
            ".group:hover &": {
              transform: "scale(1.08)",
            },
            opacity: imageLoading ? 0 : 1,
          }}
          onLoad={() => setImageLoading(false)}
        />

        {/* Year Label */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            backgroundColor: "rgba(9, 9, 11, 0.8)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.08)",
            px: 1.2,
            py: 0.3,
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: 700,
            zIndex: 3,
          }}
        >
          {yearText}
        </Box>
      </Box>

      {/* Details Container */}
      <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Brand Name */}
        <Typography
          variant="caption"
          sx={{
            color: "#e28a3a",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mb: 0.5,
            display: "block",
          }}
        >
          {product.brand?.brandName || "No data"}
        </Typography>

        {/* Model/Product Name */}
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 800,
            mb: 0.8,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.productName || "No data"}
        </Typography>

        {/* Rating Line showing No data */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 2.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
            Rating: <Box component="span" sx={{ color: "#e28a3a" }}>No data</Box>
          </Typography>
        </Box>

        {/* Spec Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1.5,
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            py: 2,
            mb: 2.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SpeedIcon sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)" }} />
            <Box>
              <Typography variant="caption" color="rgba(255,255,255,0.3)" display="block" sx={{ fontSize: "0.65rem", lineHeight: 1 }}>
                Engine
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "white", fontSize: "0.8rem" }}>
                {engineVal}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BoltIcon sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)" }} />
            <Box>
              <Typography variant="caption" color="rgba(255,255,255,0.3)" display="block" sx={{ fontSize: "0.65rem", lineHeight: 1 }}>
                Power
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "white", fontSize: "0.8rem" }}>
                {powerVal}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsIcon sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)" }} />
            <Box>
              <Typography variant="caption" color="rgba(255,255,255,0.3)" display="block" sx={{ fontSize: "0.65rem", lineHeight: 1 }}>
                Trans
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "white", fontSize: "0.8rem" }}>
                {transVal}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <VerifiedIcon sx={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)" }} />
            <Box>
              <Typography variant="caption" color="rgba(255,255,255,0.3)" display="block" sx={{ fontSize: "0.65rem", lineHeight: 1 }}>
                ABS
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "white", fontSize: "0.8rem" }}>
                {absVal}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Pricing / Compare Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <Box>
            <Typography variant="caption" color="rgba(255,255,255,0.3)" display="block" sx={{ fontSize: "0.7rem", lineHeight: 1 }}>
              Starting from
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "white", fontSize: "1.25rem" }}>
              {formatPrice(displayPrice)}
            </Typography>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                sx={{
                  color: "rgba(255,255,255,0.15)",
                  p: 0.5,
                  "&.Mui-checked": { color: "#e28a3a" },
                }}
              />
            }
            label="Compare"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.4)",
              },
              mr: 0,
            }}
          />
        </Box>

        {/* Action Button */}
        <Button
          component={Link}
          to={`/products/${product.id}`}
          variant="outlined"
          endIcon={<ArrowForwardIcon className="arrow-icon" />}
          fullWidth
          sx={{
            borderColor: "rgba(255, 255, 255, 0.15)",
            color: "rgba(255,255,255,0.85)",
            py: 1.4,
            fontWeight: 700,
            fontSize: "0.85rem",
            textTransform: "none",
            borderRadius: "8px",
            transition: "all 0.2s ease-in-out",
            "& .arrow-icon": {
              transition: "transform 0.2s ease",
            },
            "&:hover": {
              borderColor: "#e28a3a",
              backgroundColor: "rgba(226, 138, 58, 0.05)",
              color: "#e28a3a",
              "& .arrow-icon": {
                transform: "translateX(3px)",
              },
            },
          }}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
};

export default ProductItem;
