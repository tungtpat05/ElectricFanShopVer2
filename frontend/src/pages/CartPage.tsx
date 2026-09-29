import { Box, Container, Typography, Grid, CircularProgress, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { useCart } from "@/context";
import CartItemCard from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import RelatedProducts from "@/components/product/RelatedProducts";

const CartPage = () => {
  const { cart, loading, increaseCartItem, decreaseCartItem, removeCartItem } = useCart();

  const cartItems = cart?.items || [];
  const totalQuantity = cart?.totalQuantity ?? cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculations
  const subtotal = cart?.totalPrice ?? cartItems.reduce((acc, item) => acc + (item.lineTotal || item.unitPrice * item.quantity), 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal > 20000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleIncrease = (variantId: number) => {
    increaseCartItem(variantId, 1);
  };

  const handleDecrease = (variantId: number) => {
    decreaseCartItem(variantId, 1);
  };

  const handleRemove = (variantId: number) => {
    removeCartItem(variantId);
  };

  if (loading && !cart) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#09090b", minHeight: "100vh", pt: 4, pb: 12 }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.25)" }} />}
          sx={{ mb: 4 }}
        >
          <Typography
            component={Link}
            to="/"
            sx={{
              color: "rgba(255, 255, 255, 0.4)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              "&:hover": { color: "#e28a3a" },
            }}
          >
            Home
          </Typography>
          <Typography sx={{ color: "#ffffff", fontSize: "0.85rem", fontWeight: 700 }}>
            Shopping Cart
          </Typography>
        </Breadcrumbs>

        {/* Cart Title */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              color: "#ffffff",
              fontWeight: 900,
              fontFamily: "'Outfit', sans-serif",
              fontSize: { xs: "2rem", md: "2.8rem" },
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            Shopping Cart
            {cartItems.length > 0 && (
              <Box
                component="span"
                sx={{
                  backgroundColor: "rgba(226, 138, 58, 0.15)",
                  color: "#e28a3a",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  px: 2,
                  py: 0.5,
                  borderRadius: "50px",
                  border: "1px solid rgba(226, 138, 58, 0.25)",
                }}
              >
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </Box>
            )}
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <Grid container spacing={5}>
            {/* Left side: List of Items */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Box>
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id || item.variantId}
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))}
              </Box>
            </Grid>

            {/* Right side: Summary Block */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <CartSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                tax={tax}
                total={total}
              />
            </Grid>
          </Grid>
        )}

        {/* You May Also Like Recommendations Block */}
        <Box sx={{ mt: 6 }}>
          <RelatedProducts currentProductId={cartItems[0]?.productId || 1} />
        </Box>
      </Container>
    </Box>
  );
};

export default CartPage;
