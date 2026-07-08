import { Box, Typography, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product } from "@/types/product";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartItemCardProps {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }: CartItemCardProps) => {
  const { product, quantity } = item;
  
  const ccVal = product.engineCapacity || 650;
  const hpVal = Math.round(ccVal * 0.14) || 95;
  const singlePrice = product.discountPrice || product.basePrice;
  const totalPrice = singlePrice * quantity;

  return (
    <Box
      sx={{
        backgroundColor: "#121214",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "20px",
        p: { xs: 2.5, md: 3 },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 3,
        mb: 2.5,
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "rgba(226, 138, 58, 0.2)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      {/* Product Image & Info Group */}
      <Box sx={{ display: "flex", gap: 2.5, flex: 1, width: "100%", alignItems: "center" }}>
        {/* Thumbnail Image */}
        <Box
          sx={{
            width: { xs: "100px", sm: "140px" },
            height: { xs: "80px", sm: "110px" },
            backgroundColor: "#17171a",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
            p: 1.5,
          }}
        >
          <Box
            component="img"
            src={product.thumbnail || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300"}
            alt={product.productName}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "transform 0.4s ease",
              "&:hover": { transform: "scale(1.08)" },
            }}
          />
        </Box>

        {/* Info Column */}
        <Box sx={{ flex: 1 }}>
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
              fontSize: { xs: "1rem", sm: "1.15rem" },
              mb: 0.8,
              lineHeight: 1.25,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {product.productName}
          </Typography>

          {/* Mini Specs */}
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255, 255, 255, 0.4)",
              display: "block",
              fontSize: "0.75rem",
              mb: 2,
            }}
          >
            Engine: {ccVal}cc &nbsp;•&nbsp; Power: {hpVal} HP &nbsp;•&nbsp; {(product.category?.categoryName || "Sport").toUpperCase()}
          </Typography>

          {/* Action Links */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="text"
              startIcon={<FavoriteBorderIcon sx={{ fontSize: "1rem" }} />}
              sx={{
                color: "rgba(255, 255, 255, 0.45)",
                fontSize: "0.78rem",
                fontWeight: 600,
                textTransform: "none",
                p: 0,
                minWidth: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#ffffff",
                },
              }}
            >
              Save for later
            </Button>
            <Button
              variant="text"
              onClick={() => onRemove(item.id)}
              startIcon={<DeleteOutlineIcon sx={{ fontSize: "1rem" }} />}
              sx={{
                color: "rgba(255, 255, 255, 0.45)",
                fontSize: "0.78rem",
                fontWeight: 600,
                textTransform: "none",
                p: 0,
                minWidth: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#ef4444",
                },
              }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Selector & Price Group */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: { xs: "100%", sm: "auto" },
          gap: { xs: 2, sm: 4 },
        }}
      >
        {/* Quantity selector UI */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "100px",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            p: 0.5,
          }}
        >
          <IconButton
            size="small"
            onClick={() => onDecrease(item.id)}
            disabled={quantity <= 1}
            sx={{
              color: "rgba(255,255,255,0.7)",
              "&:disabled": { color: "rgba(255,255,255,0.15)" },
            }}
          >
            <RemoveIcon sx={{ fontSize: "0.95rem" }} />
          </IconButton>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "0.88rem",
              px: 2,
              minWidth: "36px",
              textAlign: "center",
            }}
          >
            {quantity}
          </Typography>
          <IconButton size="small" onClick={() => onIncrease(item.id)} sx={{ color: "rgba(255,255,255,0.7)" }}>
            <AddIcon sx={{ fontSize: "0.95rem" }} />
          </IconButton>
        </Box>

        {/* Pricing columns */}
        <Box sx={{ textAlign: "right", minWidth: { xs: "auto", sm: "110px" } }}>
          <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 800, fontSize: "1.15rem" }}>
            ${totalPrice.toLocaleString()}
          </Typography>
          {quantity > 1 && (
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", display: "block", mt: 0.2 }}>
              (${singlePrice.toLocaleString()} each)
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CartItemCard;
