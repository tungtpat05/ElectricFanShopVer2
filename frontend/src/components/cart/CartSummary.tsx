import { Box, Typography, Button, InputBase, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";

interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

const PAYMENT_METHODS = ["Visa", "MasterCard", "Amex", "PayPal", "Apple Pay"];

const CartSummary = ({ subtotal, deliveryFee, tax, total }: CartSummaryProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#121214",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "24px",
        p: 3.5,
        position: "sticky",
        top: "100px",
        zIndex: 10,
        transition: "border-color 0.3s",
        "&:hover": {
          borderColor: "rgba(226, 138, 58, 0.15)",
        },
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          color: "#ffffff",
          fontWeight: 800,
          mb: 3.5,
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.35rem",
        }}
      >
        Order Summary
      </Typography>

      {/* Calculations */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.2, mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "0.9rem" }}>
            Subtotal
          </Typography>
          <Typography sx={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem" }}>
            ${subtotal.toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "0.9rem" }}>
            Delivery Fee
          </Typography>
          <Typography sx={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem" }}>
            {deliveryFee > 0 ? `$${deliveryFee.toLocaleString()}` : "Free"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "0.9rem" }}>
            Estimated Tax
          </Typography>
          <Typography sx={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem" }}>
            ${tax.toLocaleString()}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)", my: 1.5 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Typography sx={{ color: "#ffffff", fontWeight: 800, fontSize: "1.1rem" }}>
            Total
          </Typography>
          <Typography
            sx={{
              color: "#e28a3a",
              fontWeight: 900,
              fontSize: "1.45rem",
              lineHeight: 1,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            ${total.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Promo Code box */}
      <Box
        sx={{
          display: "flex",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "100px",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          pl: 2.5,
          pr: 0.8,
          py: 0.8,
          mb: 4,
          alignItems: "center",
          transition: "border-color 0.2s",
          "&:focus-within": {
            borderColor: "#e28a3a",
          },
        }}
      >
        <InputBase
          placeholder="Promo code"
          sx={{
            color: "#ffffff",
            fontSize: "0.85rem",
            flex: 1,
            "& input::placeholder": {
              color: "rgba(255, 255, 255, 0.3)",
              opacity: 1,
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.8rem",
            borderRadius: "100px",
            px: 3,
            py: 0.8,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
            },
          }}
        >
          Apply
        </Button>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4.5 }}>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: "#e28a3a",
            color: "#000000",
            fontWeight: 800,
            borderRadius: "100px",
            py: 1.6,
            fontSize: "0.95rem",
            textTransform: "none",
            boxShadow: "0 10px 20px rgba(226, 138, 58, 0.15)",
            "&:hover": {
              backgroundColor: "#f0a256",
            },
          }}
        >
          Proceed to Checkout
        </Button>
        <Button
          component={Link}
          to="/products"
          variant="text"
          startIcon={<KeyboardBackspaceIcon sx={{ fontSize: "1.1rem" }} />}
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "none",
            py: 1,
            "&:hover": {
              backgroundColor: "transparent",
              color: "#e28a3a",
            },
          }}
        >
          Continue Shopping
        </Button>
      </Box>

      {/* Trust Badges Payment */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.3)", display: "block", mb: 2, fontWeight: 600, letterSpacing: "0.02em" }}>
          WE ACCEPT SECURE PAYMENTS
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1.2, flexWrap: "wrap" }}>
          {PAYMENT_METHODS.map((method) => (
            <Box
              key={method}
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                borderRadius: "6px",
                px: 1.4,
                py: 0.5,
                fontSize: "0.68rem",
                color: "rgba(255, 255, 255, 0.5)",
                fontWeight: 700,
                letterSpacing: "0.02em",
                fontFamily: "monospace",
              }}
            >
              {method.toUpperCase()}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CartSummary;
