import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExploreIcon from "@mui/icons-material/Explore";

const AdventureBanner = () => {
  return (
    <Box
      sx={{
        gridColumn: "1 / -1",
        position: "relative",
        borderRadius: "20px",
        minHeight: { xs: "320px", md: "380px" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundImage: `linear-gradient(90deg, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.8) 50%, rgba(9, 9, 11, 0.1) 100%), url("https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=1600&auto=format&fit=crop&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        px: { xs: 4, md: 8 },
        py: 6,
        my: 3,
      }}
    >
      <Box sx={{ maxWidth: { xs: "100%", md: "500px" }, zIndex: 2 }}>
        {/* Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.8,
            border: "1px solid rgba(226, 138, 58, 0.3)",
            borderRadius: "50px",
            px: 2,
            py: 0.5,
            backgroundColor: "rgba(226, 138, 58, 0.15)",
            mb: 2.5,
          }}
        >
          <ExploreIcon sx={{ fontSize: "1rem", color: "#e28a3a" }} />
          <Typography
            variant="caption"
            sx={{
              color: "#e28a3a",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Adventure Series
          </Typography>
        </Box>

        {/* Heading */}
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2,
            letterSpacing: "-0.01em",
          }}
        >
          Adventure Starts Here
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            mb: 4,
            lineHeight: 1.6,
            fontSize: { xs: "0.95rem", md: "1.05rem" },
          }}
        >
          Explore premium adventure motorcycles built for every road. From
          mountain passes to desert trails.
        </Typography>

        {/* CTA Button */}
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: "#e28a3a",
            color: "#000000",
            fontWeight: 700,
            borderRadius: "40px",
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: "#f0a256",
            },
          }}
        >
          Explore Adventure
        </Button>
      </Box>
    </Box>
  );
};

export default AdventureBanner;
