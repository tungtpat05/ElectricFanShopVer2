import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, useCart } from "@/context";
import { Product, ProductVariant } from "@/types/product.ts";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin, user } = useAuth();
  const { addItemToCart } = useCart();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleAddToCart = async () => {
    if (!isLogin || !user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (selectedVariant?.id) {
      try {
        await addItemToCart(selectedVariant.id, 1);
        setSnackbarMessage(`Added "${product.productName}" to your shopping cart!`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (err) {
        console.error("Failed to add product variant to cart:", err);
        setSnackbarMessage("Failed to add item to cart. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("The product has no variants or Out of Stock. It cannot be added to the cart.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleBuyNow = async () => {
    if (!isLogin || !user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    if (selectedVariant?.id) {
      try {
        await addItemToCart(selectedVariant.id, 1);
        navigate("/cart");
      } catch (err) {
        console.error("Failed to add product variant to cart:", err);
        setSnackbarMessage("Failed to add item to cart. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      navigate("/cart");
    }
  };

  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants.length > 0 ? variants[0] : null
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const baseOrDiscount = product.discountPrice && product.discountPrice < product.basePrice
    ? product.discountPrice
    : product.basePrice;

  const additionalPrice = selectedVariant?.additionalPrice || 0;
  const displayPrice = (baseOrDiscount || 0) + additionalPrice;

  const categoryName = product.category?.categoryName || "No data";
  const brandName = product.brand?.brandName || "No data";
  const yearText = product.createdAt ? new Date(product.createdAt).getFullYear() : "No data";

  // Total stock calculated from variants or fallback
  const totalStock = useMemo(() => {
    if (variants.length > 0) {
      return variants.reduce((acc, v) => acc + (v.stockQuantity || 0), 0);
    }
    return null;
  }, [variants]);

  const getTagColor = (catName: string) => {
    const name = catName.toLowerCase();
    if (name.includes("naked")) return "rgba(168, 85, 247, 0.25)";
    if (name.includes("sport")) return "rgba(239, 68, 68, 0.25)";
    if (name.includes("adventure")) return "rgba(234, 179, 8, 0.25)";
    if (name.includes("electric")) return "rgba(59, 130, 246, 0.25)";
    return "rgba(226, 138, 58, 0.25)";
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
          {brandName}
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
        {product.productName || "No data"}
      </Typography>

      {/* Ratings and Stock State Row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        {/* Rating line showing No data since rating endpoint doesn't exist */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
            Rating: <Box component="span" sx={{ color: "#e28a3a" }}>No data</Box>
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.25)" }}>
          •
        </Typography>

        {/* Stock Badge */}
        {totalStock !== null ? (
          totalStock > 0 ? (
            <Chip
              label={`• In Stock (${totalStock} available)`}
              size="small"
              sx={{
                backgroundColor: "rgba(46, 125, 50, 0.15)",
                color: "#4caf50",
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 0.5,
              }}
            />
          ) : (
            <Chip
              label="• Out of Stock"
              size="small"
              sx={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                color: "#ef4444",
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 0.5,
              }}
            />
          )
        ) : (
          <Chip
            label="• Stock: No data"
            size="small"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "rgba(255, 255, 255, 0.5)",
              fontWeight: 700,
              fontSize: "0.75rem",
              px: 0.5,
            }}
          />
        )}
      </Box>

      {/* Pricing Information Panel */}
      <Box
        sx={{
          backgroundColor: "#121214",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "16px",
          p: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, color: "white" }}>
          {displayPrice > 0 ? formatPrice(displayPrice) : "No data"}
        </Typography>
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
            {selectedVariant?.color?.colorName || "No data"}
          </Typography>
        </Box>

        {variants.length > 0 ? (
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            {variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id;
              const colorValue = v.color?.colorCode || "#333333";
              return (
                <Box
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: colorValue,
                    border: "2px solid",
                    borderColor: isSelected ? "#e28a3a" : "rgba(255,255,255,0.2)",
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
                  {isSelected && <CheckIcon sx={{ fontSize: 16, color: "white" }} />}
                </Box>
              );
            })}
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)", fontStyle: "italic" }}>
            No data
          </Typography>
        )}
      </Box>

      {/* Model Year Display */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            mb: 1,
          }}
        >
          Model Year
        </Typography>
        <Typography variant="body2" sx={{ color: "white", fontWeight: 700 }}>
          {yearText}
        </Typography>
      </Box>

      {/* Short Summary Section */}
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
            fontStyle: product.summary ? "italic" : "normal",
          }}
        >
          {product.summary || "No data"}
        </Typography>
      </Box>

      {/* Call to action purchase buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
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
          onClick={handleBuyNow}
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

      {/* Toast Notification for Add to Cart */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: "100%",
            fontWeight: 700,
            backgroundColor: snackbarSeverity === "success" ? "#e28a3a" : undefined,
            color: snackbarSeverity === "success" ? "#000000" : undefined,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductInfo;
