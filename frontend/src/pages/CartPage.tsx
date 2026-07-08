import { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, CircularProgress, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import CartItemCard, { CartItem } from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import RelatedProducts from "@/components/product/RelatedProducts";

const CartPage = () => {
  const { products, loading: productsLoading } = useProducts();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load the first 2 products as mock cart items from backend
  useEffect(() => {
    if (products.length >= 2 && !initialized) {
      setCartItems([
        { id: 1, product: products[0], quantity: 1 },
        { id: 2, product: products[1], quantity: 2 },
      ]);
      setInitialized(true);
    }
  }, [products, initialized]);

  const handleIncrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.basePrice;
    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 20000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (productsLoading && !initialized) {
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
                    key={item.id}
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
          <RelatedProducts currentProductId={cartItems[0]?.product?.id || 1} />
        </Box>
      </Container>
    </Box>
  );
};

export default CartPage;
