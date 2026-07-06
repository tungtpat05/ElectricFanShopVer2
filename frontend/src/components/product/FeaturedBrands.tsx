import { Box, Typography, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const BRANDS = [
  "Honda",
  "Yamaha",
  "Suzuki",
  "Kawasaki",
  "BMW",
  "Ducati",
  "Triumph",
  "Harley-Davidson",
  "Royal Enfield",
  "KTM",
  "CFMoto",
  "Benelli",
];

const FeaturedBrands = () => {
  return (
    <Box sx={{ py: 6, borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
      {/* Title + Arrows bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "white", mb: 0.5 }}
          >
            Featured Brands
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Shop by manufacturer
          </Typography>
        </Box>

        {/* Carousel arrows */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <IconButton
            sx={{
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              width: 40,
              height: 40,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              width: 40,
              height: 40,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Brand list */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.1) transparent",
        }}
      >
        {BRANDS.map((brand) => (
          <Box
            key={brand}
            sx={{
              flex: "0 0 auto",
              backgroundColor: "#18181b",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              px: 4,
              py: 2.2,
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                borderColor: "#e28a3a",
                backgroundColor: "rgba(226, 138, 58, 0.05)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: "white",
                whiteSpace: "nowrap",
              }}
            >
              {brand}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedBrands;
