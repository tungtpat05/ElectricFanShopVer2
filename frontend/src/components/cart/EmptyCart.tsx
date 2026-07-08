import { Box, Typography, Button } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 12 },
        px: 3,
        textAlign: "center",
        backgroundColor: "#121214",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "28px",
        maxWidth: "680px",
        mx: "auto",
        my: 4,
      }}
    >
      {/* Gold Circular Icon Cover */}
      <Box
        sx={{
          backgroundColor: "rgba(226, 138, 58, 0.08)",
          border: "1px solid rgba(226, 138, 58, 0.15)",
          borderRadius: "50%",
          width: 96,
          height: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4.5,
          boxShadow: "0 10px 30px rgba(226, 138, 58, 0.05)",
        }}
      >
        <ShoppingBagOutlinedIcon sx={{ fontSize: "2.8rem", color: "#e28a3a" }} />
      </Box>

      {/* Message Title */}
      <Typography
        variant="h4"
        sx={{
          color: "#ffffff",
          fontWeight: 800,
          mb: 2,
          fontFamily: "'Outfit', sans-serif",
          fontSize: { xs: "1.8rem", md: "2.2rem" },
        }}
      >
        Your Cart is Empty
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          color: "rgba(255, 255, 255, 0.45)",
          maxWidth: "460px",
          mx: "auto",
          lineHeight: 1.6,
          mb: 5,
          fontSize: { xs: "0.95rem", md: "1.05rem" },
        }}
      >
        Explore our curated collection of premium motorcycles and find your next ride. Simple financing and nationwide delivery available.
      </Typography>

      {/* Action CTA */}
      <Button
        component={Link}
        to="/products"
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{
          backgroundColor: "#e28a3a",
          color: "#000000",
          fontWeight: 800,
          borderRadius: "100px",
          px: 5,
          py: 1.8,
          fontSize: "1rem",
          textTransform: "none",
          boxShadow: "0 10px 20px rgba(226, 138, 58, 0.2)",
          "&:hover": {
            backgroundColor: "#f0a256",
          },
        }}
      >
        Browse Motorcycles
      </Button>
    </Box>
  );
};

export default EmptyCart;
