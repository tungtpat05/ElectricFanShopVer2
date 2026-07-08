import { Box, Typography, Button, InputBase, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";

const POPULAR_TAGS = ["Honda", "BMW GS", "Ducati", "Adventure", "Sport", "Electric"];

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
        pt: { xs: 12, md: 16 },
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
            • 2024 Collection Now Live
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            color: "#fff",
            fontSize: { xs: "3rem", sm: "4rem", md: "5.5rem" },
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            mb: 3,
          }}
        >
          Your Next{" "}
          <Box component="span" sx={{ color: "#e28a3a" }}>
            Adventure
          </Box>{" "}
          Starts Here.
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

        {/* Search Bar */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "680px",
            mx: "auto",
            backgroundColor: "rgba(18, 18, 20, 0.75)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "100px",
            pl: 3,
            pr: 1,
            py: 1,
            display: "flex",
            alignItems: "center",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            mb: 3.5,
            transition: "border-color 0.2s, box-shadow 0.2s",
            "&:focus-within": {
              borderColor: "#e28a3a",
              boxShadow: "0 20px 40px rgba(226, 138, 58, 0.15)",
            },
          }}
        >
          <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.4)", mr: 1.5 }} />
          <InputBase
            placeholder="Search by brand, model, or category..."
            sx={{
              flex: 1,
              color: "white",
              fontSize: "0.95rem",
              "& input::placeholder": {
                color: "rgba(255, 255, 255, 0.4)",
                opacity: 1,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={() => navigate("/products")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#e28a3a",
              color: "#000000",
              fontWeight: 700,
              borderRadius: "100px",
              px: 4,
              py: 1.2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f0a256",
              },
            }}
          >
            Search
          </Button>
        </Box>

        {/* Popular Tags */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 6,
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.85rem" }}>
            Popular:
          </Typography>
          {POPULAR_TAGS.map((tag) => (
            <Box
              key={tag}
              onClick={() => navigate("/products")}
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "100px",
                px: 2,
                py: 0.5,
                fontSize: "0.8rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "#e28a3a",
                  color: "#e28a3a",
                  backgroundColor: "rgba(226, 138, 58, 0.05)",
                },
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>

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
