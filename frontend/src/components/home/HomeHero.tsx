import { Box, Typography, Button, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
        pt: { xs: 4, md: 8 },
        pb: { xs: 8, md: 10 },
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(9, 9, 11, 0.95) 90%), url("https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1600&auto=format&fit=crop&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        {/* Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid rgba(226, 138, 58, 0.3)",
            borderRadius: "50px",
            px: 2.5,
            py: 0.5,
            backgroundColor: "rgba(226, 138, 58, 0.1)",
            mb: 4,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#e28a3a",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
            }}
          >
            • 2026 Collection Now Live
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            color: "#fff",
            fontSize: { xs: "4rem", sm: "5rem", md: "6.5rem" },
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            mb: 3,
          }}
        >
          <Box> Your Next</Box>
          <Box component="span" sx={{ color: "#e28a3a" }}>
            Adventure
          </Box>
          <Box> Starts Here.</Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: "640px",
            mx: "auto",
            mb: 5,
            fontSize: { xs: "0.95rem", md: "1.15rem" },
            lineHeight: 1.6,
          }}
        >
          Discover over 10,000 motorcycles from the world's greatest manufacturers.
          Sport, naked, adventure, touring, electric — every machine, one destination.
        </Typography>

        {/* CTA Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/products")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#e28a3a",
              color: "#000000",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "100px",
              px: 4,
              py: 1.8,
              textTransform: "none",
              boxShadow: "0 10px 20px rgba(226, 138, 58, 0.2)",
              "&:hover": {
                backgroundColor: "#f0a256",
              },
            }}
          >
            Browse Collection
          </Button>

          <Button
            variant="outlined"
            startIcon={<PlayArrowIcon />}
            sx={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "100px",
              px: 4,
              py: 1.8,
              textTransform: "none",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              "&:hover": {
                borderColor: "#ffffff",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
              },
            }}
          >
            Watch the Story
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeHero;
